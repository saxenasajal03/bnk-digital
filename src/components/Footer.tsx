import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  MessageCircle, 
  Database, 
  Loader2, 
  AlertTriangle, 
  ShieldCheck 
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon, XTwitterIcon } from './SocialIcons';
import { LeadVaultModal } from './LeadVaultModal';
import { 
  getStoredLeads, 
  saveLead, 
  isEmailDuplicate, 
  getLeadByEmail, 
  syncWithGoogleSheet 
} from '../utils/leadStorage';
import { playFuturisticClick, playSpiritualChime } from '../utils/sound';

export const Footer: React.FC = () => {
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadService, setLeadService] = useState('Social Media Management');
  const [leadMessage, setLeadMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [leadCount, setLeadCount] = useState(0);

  const serviceOptions = [
    'Social Media Management',
    'Graphic Designing',
    'Reel & Video Editing',
    'Content Writing & Copy',
    'Meta Ads & ROI Promotion',
    'Political Digital Management',
    'Voice-Over & Audio Narration',
    'Digital Invitation & Card Design',
    'Full Agency Retainer',
  ];

  useEffect(() => {
    setLeadCount(getStoredLeads().length);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        playFuturisticClick();
        setIsVaultOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDuplicateWarning(null);

    const normalizedEmail = leadEmail.trim().toLowerCase();

    // =========================================================================
    // STRICT ZERO-DUPLICATE ENFORCEMENT: Reject if email already considered
    // =========================================================================
    if (isEmailDuplicate(normalizedEmail)) {
      playFuturisticClick();
      const priorLead = getLeadByEmail(normalizedEmail);
      setDuplicateWarning(
        `An inquiry from "${normalizedEmail}" was already received on ${priorLead?.timestamp || 'our database'}. To ensure authentic communication and avoid duplicacy, our system strictly considers only one unique entry per email address.`
      );
      return;
    }

    setIsSubmitting(true);
    playSpiritualChime();

    // 1. Save to local Leads Vault (Enforces strict unique email validation)
    const saveResult = saveLead({
      name: leadName.trim(),
      email: normalizedEmail,
      phone: leadPhone.trim(),
      service: leadService,
      message: leadMessage.trim(),
    });

    if (saveResult.isDuplicate || !saveResult.success) {
      setDuplicateWarning(saveResult.errorMessage || 'Duplicate email rejected.');
      setIsSubmitting(false);
      return;
    }

    setLeadCount(getStoredLeads().length);

    // 2. Synchronize to Google Sheet (Zero duplicate backend webhook)
    syncWithGoogleSheet({
      name: leadName.trim(),
      email: normalizedEmail,
      phone: leadPhone.trim(),
      service: leadService,
      message: leadMessage.trim(),
    });

    // 3. Dispatch to FormSubmit AJAX endpoint for hello.bnkdigital@gmail.com
    try {
      await fetch('https://formsubmit.co/ajax/hello.bnkdigital@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: leadName.trim(),
          Email: normalizedEmail,
          Phone: leadPhone.trim() || 'Not provided',
          Service: leadService,
          Message: leadMessage.trim() || 'Consultation request',
          Deduplication: 'Verified Unique - Strict Policy',
          _subject: `⚡ Verified Unique Lead: ${leadName} (${leadService}) - BNK Digital`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
    } catch (err) {
      console.warn('Form submission network dispatch noted:', err);
    }

    confetti({
      particleCount: 85,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#00f2fe', '#ff0080', '#ffd166', '#7928ca'],
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Our Story', href: '#heritage' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Careers', href: '#contact' },
    { label: 'Inspiration', href: '#heritage' },
  ];

  return (
    <>
      <footer id="contact" className="relative bg-[#05070f] pt-12 pb-10 text-slate-300 overflow-hidden">
        {/* Horizontal Neon Gradient Line matching reference UI */}
        <div className="w-full h-[2px] bg-gradient-to-r from-cyan-400 via-purple-600 to-pink-500 shadow-[0_0_15px_rgba(0,242,254,0.6)] mb-14" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 3 Column Layout matching Panel 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-14">
            
            {/* Column 1: Lucknow HQ Info & Social Links */}
            <div className="md:col-span-4 space-y-4">
              <div className="font-heading font-extrabold text-lg text-white">
                Lucknow, India <br />
                <span className="text-xs text-slate-400 font-normal">PIN: 226010</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Lucknow, Uttar Pradesh, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <a href="mailto:hello.bnkdigital@gmail.com" className="hover:text-cyan-400 transition-colors">
                    hello.bnkdigital@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a href="tel:07235836153" className="hover:text-cyan-400 transition-colors">
                    +91 072358 36153
                  </a>
                </div>
              </div>

              {/* Social Icons matching reference UI */}
              <div className="flex items-center space-x-2.5 pt-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-pink-500 hover:text-pink-400 flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-blue-500 hover:text-blue-400 flex items-center justify-center transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-red-500 hover:text-red-400 flex items-center justify-center transition-all"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-slate-400 hover:text-white flex items-center justify-center transition-all"
                  aria-label="X"
                >
                  <XTwitterIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => playFuturisticClick()}
                      className="hover:text-cyan-400 transition-colors block py-0.5"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Lead Capture Form matching reference UI */}
            <div className="md:col-span-5">
              <div className="p-6 rounded-2xl bg-[#090d1c] border border-white/10 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading font-bold text-white text-sm">
                    Lead Capture Form
                  </h4>
                  <span className="inline-flex items-center space-x-1 text-[10px] text-cyan-400 font-mono bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-800/40">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    <span>Zero Duplicacy Policy</span>
                  </span>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-4 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Strategy Request Received!</div>
                      <div className="text-xs text-slate-300 mt-1">
                        Your inquiry has been registered with our priority strategy desk. We will connect with you in &lt; 4 hours.
                      </div>
                    </div>

                    {/* Instant WhatsApp Copy Button */}
                    <a
                      href={`https://wa.me/917235836153?text=${encodeURIComponent(
                        `*New Strategy Request - BNK Digital*\n` +
                        `*Name:* ${leadName}\n` +
                        `*Email:* ${leadEmail}\n` +
                        `*Phone:* ${leadPhone || 'Not provided'}\n` +
                        `*Service:* ${leadService}\n` +
                        `*Note:* ${leadMessage || 'Looking forward to our digital roadmap'}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl font-heading font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-500/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Instant Copy on WhatsApp (+91 072358 36153)</span>
                    </a>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setLeadName('');
                        setLeadEmail('');
                        setLeadPhone('');
                        setLeadMessage('');
                        setDuplicateWarning(null);
                      }}
                      className="text-[11px] text-slate-400 hover:text-white underline pt-1 block mx-auto transition-colors"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    {/* Duplicate Rejection Banner */}
                    {duplicateWarning && (
                      <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs space-y-2 animate-pulse">
                        <div className="flex items-center space-x-1.5 font-bold text-amber-300">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Duplicate Entry Rejected</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-300">
                          {duplicateWarning}
                        </p>
                        <div className="pt-1 flex items-center space-x-2">
                          <a
                            href={`https://wa.me/917235836153?text=${encodeURIComponent(
                              `Namaste BNK Digital, I have already submitted an inquiry with ${leadEmail} and would like to update my campaign requirements.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-semibold inline-flex items-center space-x-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Connect on WhatsApp</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setDuplicateWarning(null);
                              setLeadEmail('');
                            }}
                            className="text-[10px] text-slate-400 hover:text-white underline"
                          >
                            Use different email
                          </button>
                        </div>
                      </div>
                    )}

                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Your Full Name *"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                    />

                    <input
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => {
                        setLeadEmail(e.target.value);
                        if (duplicateWarning) setDuplicateWarning(null);
                      }}
                      placeholder="Your Email Address (Unique) *"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                    />

                    <input
                      type="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="Phone / WhatsApp Number (e.g. +91 98765 43210)"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                    />

                    <select
                      value={leadService}
                      onChange={(e) => setLeadService(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 shadow-neon-cyan transition-all flex items-center justify-center space-x-1.5 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Verifying &amp; Transmitting...</span>
                        </>
                      ) : (
                        <span>Submit Strategy Request</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Tagline */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
            <span>© {new Date().getFullYear()} BNK Digital (Baba Neeb Karori Digital Media Agency). All rights reserved.</span>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  playFuturisticClick();
                  setIsVaultOpen(true);
                }}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 hover:text-white transition-all text-[11px]"
                title="View all unique leads, Google Sheet sync, and export to CSV (Ctrl+Shift+L)"
              >
                <Database className="w-3 h-3 text-cyan-400" />
                <span>Admin Leads Vault ({leadCount})</span>
              </button>

              <span className="text-cyan-400 font-medium">Let's Build The Real Presence</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Admin Leads Vault Modal */}
      <LeadVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onLeadCountChange={(c) => setLeadCount(c)}
      />
    </>
  );
};
