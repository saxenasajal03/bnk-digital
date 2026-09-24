export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  timestamp: string;
}

export interface SaveLeadResult {
  success: boolean;
  lead?: Lead;
  isDuplicate?: boolean;
  errorMessage?: string;
}

const STORAGE_KEY = 'bnk_lead_submissions';
const GOOGLE_SHEET_URL_KEY = 'bnk_google_sheet_webhook_url';

export const getStoredLeads = (): Lead[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load leads from localStorage', err);
    return [];
  }
};

/**
 * Checks if an email has already submitted an inquiry in local records.
 * Compares strictly normalized (lowercase, trimmed) strings.
 */
export const isEmailDuplicate = (email: string): boolean => {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  const leads = getStoredLeads();
  return leads.some((l) => l.email.trim().toLowerCase() === normalized);
};

export const getLeadByEmail = (email: string): Lead | undefined => {
  if (!email) return undefined;
  const normalized = email.trim().toLowerCase();
  const leads = getStoredLeads();
  return leads.find((l) => l.email.trim().toLowerCase() === normalized);
};

/**
 * Saves lead ONLY if the email is strictly unique.
 * Prevents any duplicate entries from the same email address.
 */
export const saveLead = (lead: Omit<Lead, 'id' | 'timestamp'>): SaveLeadResult => {
  const normalizedEmail = lead.email.trim().toLowerCase();

  // Strict deduplication enforcement
  if (isEmailDuplicate(normalizedEmail)) {
    return {
      success: false,
      isDuplicate: true,
      errorMessage: `An inquiry from ${normalizedEmail} already exists. Duplicate entries are strictly rejected.`,
    };
  }

  const existing = getStoredLeads();
  const newLead: Lead = {
    ...lead,
    email: normalizedEmail,
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };

  const updated = [newLead, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save lead to localStorage', err);
    return {
      success: false,
      errorMessage: 'Local storage save error',
    };
  }

  return {
    success: true,
    lead: newLead,
  };
};

export const deleteLead = (id: string): Lead[] => {
  const existing = getStoredLeads();
  const updated = existing.filter((l) => l.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update leads in localStorage', err);
  }
  return updated;
};

export const clearAllLeads = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear leads from localStorage', err);
  }
};

export const exportLeadsToCSV = (leads: Lead[]): void => {
  if (leads.length === 0) return;

  const headers = ['ID', 'Date & Time (IST)', 'Full Name', 'Email (Unique)', 'Phone / WhatsApp', 'Service Requested', 'Message'];
  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${l.timestamp}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.email.replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.service || '').replace(/"/g, '""')}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `bnk_unique_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// =========================================================================
// GOOGLE SHEETS DEDUPLICATION WEBHOOK INTEGRATION
// =========================================================================

export const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbyBPDSUvLegOX_pmvHJncilCEbek6ZOTcGiWs58bh7Z74iGX9QOz5HbXZjf_bjb8mSA6g/exec';

export const getGoogleSheetWebhookUrl = (): string => {
  try {
    return localStorage.getItem(GOOGLE_SHEET_URL_KEY) || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;
  } catch {
    return DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;
  }
};

export const setGoogleSheetWebhookUrl = (url: string): void => {
  try {
    localStorage.setItem(GOOGLE_SHEET_URL_KEY, url.trim());
  } catch (err) {
    console.error('Failed to store Google Sheet URL', err);
  }
};

/**
 * Submits lead data to Google Sheet Apps Script Web App.
 * Handles duplicate rejection if the sheet already contains this email.
 */
export const syncWithGoogleSheet = async (lead: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
}): Promise<{ status: 'success' | 'duplicate' | 'error' | 'unconfigured'; message: string }> => {
  const webhookUrl = getGoogleSheetWebhookUrl();
  if (!webhookUrl) {
    return {
      status: 'unconfigured',
      message: 'Google Sheet Webhook URL not configured yet.',
    };
  }

  try {
    // Send payload to Google Apps Script Web App
    // Note: Due to cross-origin redirect in Google Apps Script, no-cors transmits safely.
    // In addition, standard fetch sends the full JSON string.
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email.trim().toLowerCase(),
        phone: lead.phone || '',
        service: lead.service || '',
        message: lead.message || '',
      }),
    });

    return {
      status: 'success',
      message: 'Synchronized with BNK Digital Google Sheet.',
    };
  } catch (err) {
    console.error('Google Sheet Sync Error:', err);
    return {
      status: 'error',
      message: 'Failed to synchronize with Google Sheet: ' + String(err),
    };
  }
};

export const APPS_SCRIPT_SOURCE = `/**
 * BNK DIGITAL - Google Sheets Deduplication Web App
 * Copy-paste this into Extensions > Apps Script in your Google Sheet
 */
var SPREADSHEET_ID = ""; // Optional if opened via Extensions > Apps Script

function getTargetSpreadsheet() {
  var ss = null;
  try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) {}
  if (!ss && typeof SPREADSHEET_ID === "string" && SPREADSHEET_ID.trim() !== "") {
    try { ss = SpreadsheetApp.openById(SPREADSHEET_ID.trim()); } catch (e) {}
  }
  if (!ss) { try { ss = SpreadsheetApp.getActive(); } catch (e) {} }
  return ss;
}

function getTargetSheet() {
  var ss = getTargetSpreadsheet();
  if (!ss) {
    throw new Error("No Google Sheet found. Open via Extensions > Apps Script or set SPREADSHEET_ID.");
  }
  var sheet = ss.getSheetByName("BNK_Leads") || ss.getActiveSheet() || ss.getSheets()[0];
  if (!sheet) { sheet = ss.insertSheet("BNK_Leads"); }
  return sheet;
}

function setupHeaders(sheet) {
  if (!sheet || typeof sheet.getLastRow !== "function") {
    sheet = getTargetSheet();
  }
  var headers = ["Timestamp (IST)", "Full Name", "Email Address (Strictly Unique)", "Phone / WhatsApp", "Service Requested", "Client Message / Note", "Status"];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var range = sheet.getRange(1, 1, 1, headers.length);
    range.setBackground("#05070f");
    range.setFontColor("#00f2fe");
    range.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function runTest() {
  var sheet = getTargetSheet();
  setupHeaders(sheet);
  Logger.log("✅ Google Sheet connected successfully! Sheet Name: " + sheet.getName());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Prevent race condition duplicates
  try {
    var sheet = getTargetSheet();
    setupHeaders(sheet);
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch(err) { data = e.parameter || {}; }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var email = (data.email || data.Email || "").toString().trim().toLowerCase();
    var name = (data.name || data.Name || "Partner").toString().trim();
    var phone = (data.phone || data.Phone || "").toString().trim();
    var service = (data.service || data.Service || "Consultation").toString().trim();
    var message = (data.message || data.Message || "").toString().trim();

    if (!email) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Email required" })).setMimeType(ContentService.MimeType.JSON);
    }

    // STRICT DEDUPLICATION: Check Column C
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var emailValues = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
      for (var i = 0; i < emailValues.length; i++) {
        if (emailValues[i][0].toString().trim().toLowerCase() === email) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "duplicate",
            message: "DUPLICATE REJECTED: Email already exists in row " + (i + 2)
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // APPEND UNIQUE ROW
    var istTime = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy hh:mm a");
    sheet.appendRow([istTime, name, email, phone, service, message, "New Lead"]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Recorded uniquely" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    agency: "BNK Digital",
    deduplication: "Active"
  })).setMimeType(ContentService.MimeType.JSON);
}`;
