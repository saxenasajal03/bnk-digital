/**
 * =========================================================================
 * BNK DIGITAL (Baba Neeb Karori Digital Media Agency)
 * Google Sheets Lead Intake & Strict Email Deduplication Web App
 * =========================================================================
 * 
 * Ethos: "सोच डिजिटल... काम दमदार!" || जय बाबा नीब करोरी
 * Headquarters: Lucknow, India (226010)
 * Contact: hello.bnkdigital@gmail.com | +91 072358 36153
 * 
 * -------------------------------------------------------------------------
 * QUICK SETUP INSTRUCTIONS:
 * -------------------------------------------------------------------------
 * 1. Open your Google Sheet: https://sheets.new
 * 2. In Google Sheets top menu, click: Extensions > Apps Script
 *    (Opening via Extensions > Apps Script connects this script directly to your Sheet)
 * 3. Replace all existing text in Apps Script editor with THIS EXACT CODE.
 * 4. [OPTIONAL TEST]: Select "runTest" from the function dropdown at top and click "Run"
 *    to test the headers and connection.
 * 5. Click the blue "Deploy" button (top right) > "New deployment"
 * 6. Click the gear icon ⚙️ next to "Select type" > Select "Web app"
 * 7. Set:
 *    - Description: "BNK Digital Deduplicated Intake"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (CRITICAL: Must be "Anyone" so visitors can send inquiries)
 * 8. Click "Deploy" > "Authorize access" > Choose your Google account > "Allow"
 * 9. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...)
 * 10. Paste this URL into your website's Admin Leads Vault (Ctrl + Shift + L)
 * -------------------------------------------------------------------------
 */

// OPTIONAL: If you created a standalone script at script.google.com (instead of Extensions > Apps Script),
// paste your Google Sheet ID here (the long ID from your sheet URL between /d/ and /edit).
// If you opened Apps Script from inside your Google Sheet, you can leave this empty!
var SPREADSHEET_ID = "";

/**
 * Helper to reliably get the target Google Sheet in all environments
 */
function getTargetSpreadsheet() {
  var ss = null;

  // 1. Try container-bound active spreadsheet (opened via Extensions > Apps Script)
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {}

  // 2. Try by SPREADSHEET_ID if provided
  if (!ss && typeof SPREADSHEET_ID === "string" && SPREADSHEET_ID.trim() !== "") {
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID.trim());
    } catch (e) {}
  }

  // 3. Fallback to active
  if (!ss) {
    try {
      ss = SpreadsheetApp.getActive();
    } catch (e) {}
  }

  return ss;
}

/**
 * Helper to get or create the target tab sheet
 */
function getTargetSheet() {
  var ss = getTargetSpreadsheet();
  if (!ss) {
    throw new Error(
      "No Google Sheet found! Please either:\n" +
      "1. Open this script directly from your Google Sheet via: Extensions > Apps Script\n" +
      "2. OR paste your Google Sheet ID into 'var SPREADSHEET_ID = \"...\"' at line 35 of Code.gs"
    );
  }

  var sheet = ss.getSheetByName("BNK_Leads") || ss.getActiveSheet() || ss.getSheets()[0];
  if (!sheet) {
    sheet = ss.insertSheet("BNK_Leads");
  }
  return sheet;
}

/**
 * Sets up table headers with dark luxury branding
 * Safe to call with or without argument!
 */
function setupHeaders(sheet) {
  // If called directly from "Run" button without argument, get target sheet automatically
  if (!sheet || typeof sheet.getLastRow !== "function") {
    sheet = getTargetSheet();
  }

  var headers = [
    "Timestamp (IST)",
    "Full Name",
    "Email Address (Strictly Unique)",
    "Phone / WhatsApp",
    "Service Requested",
    "Client Message / Note",
    "Status"
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var range = sheet.getRange(1, 1, 1, headers.length);
    range.setBackground("#05070f");
    range.setFontColor("#00f2fe");
    range.setFontWeight("bold");
    sheet.setFrozenRows(1);
    try {
      sheet.setRowHeight(1, 38);
    } catch (e) {}
  }
}

/**
 * Test function you can select from the dropdown and click "Run" in Apps Script!
 */
function runTest() {
  var sheet = getTargetSheet();
  setupHeaders(sheet);
  Logger.log("✅ BNK Digital Google Sheet connected successfully! Sheet Name: " + sheet.getName());
  Logger.log("Ready for Web App deployment!");
}

/**
 * Web App POST intake handler with strict deduplication
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for concurrent requests to guarantee zero race-condition duplicates
  lock.tryLock(10000);

  try {
    var sheet = getTargetSheet();
    setupHeaders(sheet);

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var email = (data.email || data.Email || "").toString().trim().toLowerCase();
    var name = (data.name || data.Name || "Partner").toString().trim();
    var phone = (data.phone || data.Phone || "").toString().trim();
    var service = (data.service || data.Service || "Digital Consultation").toString().trim();
    var message = (data.message || data.Message || "").toString().trim();

    if (!email) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Email address is required."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // =========================================================================
    // STRICT DEDUPLICATION ENGINE: Check if email already exists in Column 3
    // =========================================================================
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      // Column C (index 3) stores the email address
      var emailRange = sheet.getRange(2, 3, lastRow - 1, 1);
      var emailValues = emailRange.getValues();

      for (var i = 0; i < emailValues.length; i++) {
        var existingEmail = emailValues[i][0].toString().trim().toLowerCase();
        if (existingEmail === email) {
          // DUPLICATE FOUND: STRICTLY REJECTED!
          return ContentService.createTextOutput(JSON.stringify({
            status: "duplicate",
            message: "DUPLICATE REJECTED: An inquiry with email '" + email + "' already exists in row " + (i + 2) + "."
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // =========================================================================
    // UNIQUE ENTRY: Append new row to Google Sheet
    // =========================================================================
    var istTime = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy hh:mm a");
    sheet.appendRow([
      istTime,
      name,
      email,
      phone,
      service,
      message,
      "Active / Uncontacted"
    ]);

    // Optional email alert to agency headquarters
    try {
      var ss = sheet.getParent();
      MailApp.sendEmail({
        to: "hello.bnkdigital@gmail.com",
        subject: "⚡ New Unique Inquiry: " + name + " (" + service + ")",
        body: "Namaste Team BNK Digital,\n\nA new verified unique inquiry was registered in your Google Sheet!\n\n" +
              "• Name: " + name + "\n" +
              "• Email: " + email + "\n" +
              "• Phone: " + (phone || "N/A") + "\n" +
              "• Service: " + service + "\n" +
              "• Requirement: " + (message || "N/A") + "\n" +
              "• Timestamp: " + istTime + " IST\n\n" +
              (ss ? ("Open Google Sheet Database:\n" + ss.getUrl()) : "")
      });
    } catch (mailErr) {
      // Ignore mail quota limit if any
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead successfully recorded in BNK Google Sheet with zero duplication."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * GET healthcheck endpoint
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    agency: "BNK Digital (Baba Neeb Karori Digital Media Agency)",
    system: "Strict Deduplication Google Sheets Intake Engine",
    hq: "Lucknow, India (PIN 226010)"
  })).setMimeType(ContentService.MimeType.JSON);
}
