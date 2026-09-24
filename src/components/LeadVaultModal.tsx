import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Trash2, 
  Copy, 
  Check, 
  MessageCircle, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Search,
  Database,
  ExternalLink,
  Sparkles,
  Sheet,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  getStoredLeads, 
  deleteLead, 
  clearAllLeads, 
  exportLeadsToCSV, 
  saveLead, 
  type Lead,
  getGoogleSheetWebhookUrl,
  setGoogleSheetWebhookUrl,
  APPS_SCRIPT_SOURCE,
  syncWithGoogleSheet
} from '../utils/leadStorage';
import { playFuturisticClick, playSpiritualChime } from '../utils/sound';

interface LeadVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCountChange?: (count: number) => void;
}

export const LeadVaultModal: React.FC<LeadVaultModalProps> = ({ isOpen, onClose, onLeadCountChange }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showScriptGuide, setShowScriptGuide] = useState(false);
  const [sheetUrl, setSheetUrl] = useState('');
  const [isCopiedScript, setIsCopiedScript] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const data = getStoredLeads();
      setLeads(data);
      setSheetUrl(getGoogleSheetWebhookUrl());
      onLeadCountChange?.(data.length);
    }
  }, [isOpen, onLeadCountChange]);

  if (!isOpen) return null;

  const handleSaveSheetUrl = () => {
    playFuturisticClick();
    setGoogleSheetWebhookUrl(sheetUrl);
    setActionFeedback('Google Sheet Webhook URL saved successfully!');
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleCopyScript = () => {
    playSpiritualChime();
    navigator.clipboard.writeText(APPS_SCRIPT_SOURCE);
    setIsCopiedScript(true);
    setActionFeedback('Google Apps Script copied to clipboard!');
    setTimeout(() => {
      setIsCopiedScript(false);
      setActionFeedback(null), 3000;
    }, 2500);
  };

  const handleDelete = (id: string) => {
    playFuturisticClick();
    const updated = deleteLead(id);
    setLeads(updated);
    onLeadCountChange?.(updated.length);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all stored leads? (Export to CSV first if needed!)')) {
      playFuturisticClick();
      clearAllLeads();
      setLeads([]);
      onLeadCountChange?.(0);
    }
  };

  const handleExport = () => {
    playSpiritualChime();
    exportLeadsToCSV(leads);
  };

  const handleCopyLead = (lead: Lead) => {
    playFuturisticClick();
    const details = `Name: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone || 'N/A'}\nService: ${lead.service || 'N/A'}\nTime: ${lead.timestamp}`;
    navigator.clipboard.writeText(details);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateTestLead = () => {
    playSpiritualChime();
    const testNames = ['Rajesh Sharma', 'Pooja Verma', 'Amitav Roy', 'Vikram Malhotra', 'Sneha Gupta'];
    const services = [
      'Social Media Management',
      'Reel & Video Editing',
      'Meta Ads & ROI Promotion',
      'Political Digital Management',
    ];
    const randomName = testNames[Math.floor(Math.random() * testNames.length)];
    const randomSvc = services[Math.floor(Math.random() * services.length)];
    const uniqueEmail = `${randomName.toLowerCase().replace(' ', '.')}.${Date.now().toString().slice(-4)}@example.com`;

    const res = saveLead({
      name: randomName,
      email: uniqueEmail,
      phone: '+91 98765 43210',
      service: randomSvc,
      message: 'Looking for a comprehensive digital branding campaign.',
    });

    if (res.success && res.lead) {
      syncWithGoogleSheet(res.lead);
    }

    const updated = getStoredLeads();
    setLeads(updated);
    onLeadCountChange?.(updated.length);
    setActionFeedback(`Added unique test lead: ${uniqueEmail}`);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleTestDuplicateRejection = () => {
    playFuturisticClick();
    if (leads.length === 0) {
      alert('Please add at least one test lead first before testing duplicate rejection.');
      return;
    }

    const existingLead = leads[0];
    const duplicateAttempt = saveLead({
      name: 'Imposter Duplicate',
      email: existingLead.email, // Exact duplicate email
      phone: '+91 99999 99999',
      service: 'Duplicate Test',
      message: 'This should be blocked!',
    });

    if (duplicateAttempt.isDuplicate) {
      alert(`🛡️ DEDUPLICATION ENGINE ACTIVE!\n\nAttempted Email: ${existingLead.email}\nResult: BLOCKED!\n\nReason: An entry with this email address already exists. Duplicate entries are strictly rejected.`);
    }
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.phone && l.phone.includes(searchQuery)) ||
      (l.service && l.service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#090d1c] border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#05070f]/90">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-heading font-black text-lg sm:text-xl text-white">
                    Agency Leads Vault & CRM
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                    {leads.length} Unique {leads.length === 1 ? 'Lead' : 'Leads'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Strict Zero-Duplicate Engine: One verified entry per client email
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowScriptGuide(!showScriptGuide)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5 transition-all"
              >
                <Sheet className="w-3.5 h-3.5" />
                <span>Google Sheet Setup</span>
                {showScriptGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              <button
                onClick={handleExport}
                disabled={leads.length === 0}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-neon-cyan disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={() => {
                  playFuturisticClick();
                  onClose();
                }}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all ml-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Feedback Toast */}
          {actionFeedback && (
            <div className="bg-cyan-500/20 border-b border-cyan-500/30 px-5 py-2 text-xs text-cyan-300 font-medium flex items-center justify-between">
              <span>{actionFeedback}</span>
              <button onClick={() => setActionFeedback(null)} className="text-cyan-400 hover:text-white">✕</button>
            </div>
          )}

          {/* Google Sheet Setup Accordion */}
          {showScriptGuide && (
            <div className="p-5 bg-[#05070f] border-b border-cyan-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sheet className="w-4 h-4 text-emerald-400" />
                  <span className="font-heading font-bold text-white text-xs">
                    Connect Your Real Google Sheet (30 Seconds Setup)
                  </span>
                </div>
                <button
                  onClick={handleCopyScript}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/40 flex items-center space-x-1.5 transition-all"
                >
                  {isCopiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopiedScript ? 'Copied Script!' : 'Copy Apps Script Code'}</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="font-bold text-cyan-400">Step 1: Open Sheets</div>
                  <div>Open <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline">sheets.new</a>, then click <b>Extensions &gt; Apps Script</b>.</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="font-bold text-cyan-400">Step 2: Paste &amp; Deploy</div>
                  <div>Paste the copied script code, click <b>Deploy &gt; New deployment</b>, select <b>Web app</b>, set Access to <b>"Anyone"</b>.</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="font-bold text-cyan-400">Step 3: Paste URL Below</div>
                  <div>Copy your Web app URL and paste it into the field below to sync every inquiry!</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="url"
                  placeholder="Paste your Google Apps Script Web App URL (https://script.google.com/macros/s/.../exec)"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleSaveSheetUrl}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shrink-0"
                >
                  Save URL
                </button>
              </div>

              {sheetUrl && (
                <div className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-950/30 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold">Google Sheet Intake Webhook is LIVE & Connected (Zero Duplicacy Active)</span>
                </div>
              )}
            </div>
          )}

          {/* Delivery Channels & Deduplication Shield Banner */}
          <div className="px-5 sm:px-6 py-3 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 border-b border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-white">Strict Deduplication:</span>{' '}
                <span className="text-emerald-400 font-semibold">Active (Unique emails)</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div>
                <span className="font-bold text-white">Gmail Dispatch:</span>{' '}
                <span className="text-slate-400">hello.bnkdigital@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div>
                <span className="font-bold text-white">WhatsApp Hotline:</span>{' '}
                <span className="text-slate-400">+91 072358 36153</span>
              </div>
            </div>
          </div>

          {/* Search bar & test triggers */}
          <div className="p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/5">
            <div className="relative flex-1 min-w-[240px] max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search leads by name, email, phone, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/50 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCreateTestLead}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center space-x-1.5 transition-all"
                title="Add unique sample lead"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>+ Unique Lead</span>
              </button>

              <button
                onClick={handleTestDuplicateRejection}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1.5 transition-all"
                title="Verify that submitting the same email twice gets blocked"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Test Deduplication</span>
              </button>

              {leads.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-red-400/80 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-all ml-1"
                  title="Clear all leads"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Leads List / Table */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-3">
                <Database className="w-12 h-12 text-slate-600 mx-auto" />
                <div className="text-sm font-semibold text-slate-300">
                  {leads.length === 0 ? 'No unique inquiries recorded yet' : 'No matching leads found'}
                </div>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  When a client fills out the Lead Capture Form at the bottom of the page, their details will instantly appear here, dispatch to your Google Sheet &amp; Gmail, and reject any duplicates!
                </p>
                {leads.length === 0 && (
                  <button
                    onClick={handleCreateTestLead}
                    className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 inline-flex items-center space-x-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Create a Test Unique Lead</span>
                  </button>
                )}
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const waPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
                const waUrl = `https://wa.me/${waPhone || '917235836153'}?text=${encodeURIComponent(
                  `Namaste ${lead.name}! This is Sajal / Sparsh from BNK Digital regarding your inquiry for ${lead.service || 'our digital services'}.`
                )}`;

                return (
                  <div
                    key={lead.id}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-heading font-bold text-white text-sm">
                          {lead.name}
                        </span>
                        {lead.service && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                            {lead.service}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500">
                          {lead.timestamp}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{lead.email}</span>
                        </a>

                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center space-x-1 hover:text-emerald-400 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{lead.phone}</span>
                          </a>
                        )}
                      </div>

                      {lead.message && (
                        <p className="text-xs text-slate-300 bg-white/5 p-2 rounded-lg italic">
                          "{lead.message}"
                        </p>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center space-x-2 shrink-0">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center space-x-1.5 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => handleCopyLead(lead)}
                        className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all"
                        title="Copy details"
                      >
                        {copiedId === lead.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 bg-black/60 border-t border-white/5 text-center text-[11px] text-slate-500 flex items-center justify-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              All inquiries are strictly deduplicated by email address. Shortcut: <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono text-[10px]">Ctrl + Shift + L</kbd>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
