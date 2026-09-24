import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon, XTwitterIcon } from './SocialIcons';
import { playFuturisticClick, playSpiritualChime } from '../utils/sound';

export const Footer: React.FC = () => {
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSpiritualChime();

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f2fe', '#ff0080', '#ffd166'],
    });

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
            <div className="p-6 rounded-2xl bg-[#090d1c] border border-white/10 shadow-xl">
              <h4 className="font-heading font-bold text-white text-sm mb-3">
                Lead Capture Form
              </h4>

              {isSubmitted ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-xs font-bold text-white">Strategy Request Received!</div>
                  <div className="text-[11px] text-slate-400 mt-1">We will connect with you in &lt; 4 hours.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="email"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="Your Email Address"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 shadow-neon-cyan transition-all"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Tagline */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>© {new Date().getFullYear()} BNK Digital (Baba Neeb Karori Digital Media Agency). All rights reserved.</span>
          <span className="text-cyan-400 font-medium">Let's Build The Real Presence</span>
        </div>

      </div>
    </footer>
  );
};
