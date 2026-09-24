import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { playFuturisticClick, playSpiritualChime } from '../utils/sound';

interface ContactHubProps {
  preselectedService?: string;
}

export const ContactHub: React.FC<ContactHubProps> = ({ preselectedService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || 'Social Media Management',
    brandType: 'Business / Enterprise',
    budget: '₹25,000 - ₹50,000 / month',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = (text: string, fieldName: string) => {
    playFuturisticClick();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSpiritualChime();

    // Trigger celebratory particle explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#ff0080', '#ffd166', '#7928ca'],
    });

    setIsSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `*New Inquiry via BNK Digital Website*\n` +
      `*Name:* ${formData.name || 'Partner'}\n` +
      `*Service:* ${formData.service}\n` +
      `*Category:* ${formData.brandType}\n` +
      `*Budget:* ${formData.budget}\n` +
      `*Phone:* ${formData.phone || 'N/A'}\n` +
      `*Note:* ${formData.message || 'Looking forward to building our digital presence.'}`
    );
    return `https://wa.me/917235836153?text=${text}`;
  };

  const faqs = [
    {
      q: 'How quickly does BNK Digital initiate campaign onboarding?',
      a: 'Following our initial strategy call, campaign architectures and creative moodboards are deployed within 24 to 48 hours. For urgent political or live event mandates, same-day deployment is standard.',
    },
    {
      q: 'Does BNK Digital serve clients outside Lucknow and Uttar Pradesh?',
      a: 'Yes, absolutely. While our creative headquarters is based in Lucknow (PIN 226010), our agency manages brand and political portfolios pan-India and globally with seamless remote coordination.',
    },
    {
      q: 'What makes your Meta Ads and Reel Editing approach unique?',
      a: 'We combine cinematic narrative storytelling with aggressive data science. Rather than simple post boosting, we build full funnel architectures, split-test hook variations, and track real client acquisition costs.',
    },
    {
      q: 'How does Baba Neeb Karori’s ethos influence your daily operations?',
      a: 'We operate with uncompromised ethics, radical transparency, zero fake reporting, and authentic devotion to our clients’ genuine progress. We consider your growth our moral responsibility.',
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-bnk-darker overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-bnk-cyan/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bnk-magenta/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-bnk-cyan text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Launch Your Strategy</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Your <span className="text-gradient-cyan-magenta">Digital Presence</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Connect directly with the leadership and strategy unit of BNK Digital. 
            We are ready to turn your vision into unstoppable market momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Hub & Lucknow Office Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Contact Details Cards */}
            <div className="space-y-4">
              
              {/* Phone Card */}
              <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-bnk-cyan/50 transition-all flex items-start justify-between group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-bnk-cyan/10 border border-bnk-cyan/30 flex items-center justify-center text-bnk-cyan shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Direct Hotline / WhatsApp
                    </span>
                    <a
                      href="tel:07235836153"
                      className="block font-heading text-lg font-bold text-white group-hover:text-bnk-cyan transition-colors"
                    >
                      072358 36153
                    </a>
                    <span className="text-xs text-slate-400">Available Mon-Sat (9 AM - 9 PM)</span>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('07235836153', 'phone')}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  title="Copy Phone Number"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email Card */}
              <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-bnk-magenta/50 transition-all flex items-start justify-between group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-bnk-magenta/10 border border-bnk-magenta/30 flex items-center justify-center text-bnk-magenta shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Official Agency Desk
                    </span>
                    <a
                      href="mailto:hello.bnkdigital@gmail.com"
                      className="block font-heading text-lg font-bold text-white group-hover:text-bnk-magenta transition-colors"
                    >
                      hello.bnkdigital@gmail.com
                    </a>
                    <span className="text-xs text-slate-400">Guaranteed response within 4 hours</span>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('hello.bnkdigital@gmail.com', 'email')}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  title="Copy Email Address"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Address Card */}
              <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-bnk-gold/50 transition-all flex items-start justify-between group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Agency Headquarters
                    </span>
                    <div className="font-heading text-lg font-bold text-white">
                      Lucknow, India, 226010
                    </div>
                    <span className="text-xs text-slate-400">Uttar Pradesh, India</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                  <Flame className="w-4 h-4" />
                </div>
              </div>

            </div>

            {/* Direct Instant WhatsApp Trigger Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-lg">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Live Dispatch Available
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Need Fast Results or Urgent Campaign?
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Skip the queue. Chat directly with our campaign manager on WhatsApp right now.
              </p>
              <a
                href="https://wa.me/917235836153?text=Hello%20BNK%20Digital,%20I%20want%20to%20discuss%20an%20urgent%20digital%20campaign."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playFuturisticClick()}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Open Instant WhatsApp Desk</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 bg-gradient-to-br from-slate-900 via-bnk-dark to-slate-950 shadow-2xl relative">
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-6 shadow-neon-cyan">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                    Inquiry Received with Reverence!
                  </h3>
                  <div className="text-sm font-devanagari text-amber-300 mb-4">
                    ॥ बाबा की कृपा से आपकी प्रगति का मार्ग प्रशस्त हो ॥
                  </div>
                  <p className="text-slate-300 text-sm max-w-md mb-8">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. 
                    Our strategy team at Lucknow has logged your request for <span className="text-bnk-cyan font-semibold">{formData.service}</span>.
                    You will receive a tailored strategy draft within 4 business hours.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg hover:bg-emerald-400 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Forward to WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="py-3 px-6 rounded-xl glass-panel text-slate-300 hover:text-white font-bold text-xs"
                    >
                      Send Another Request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="text-xs font-bold uppercase tracking-wider text-bnk-cyan">
                      Free Strategy & Proposal Request
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-bnk-gold" />
                      <span>Avg. Response: &lt; 4 Hours</span>
                    </span>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-bnk-cyan focus:ring-1 focus:ring-bnk-cyan transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="rahul@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-bnk-cyan focus:ring-1 focus:ring-bnk-cyan transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone and Service Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-bnk-cyan focus:ring-1 focus:ring-bnk-cyan transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Primary Service Required *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-bnk-cyan focus:ring-1 focus:ring-bnk-cyan transition-colors"
                      >
                        <option value="Social Media Management">1. Social Media Management</option>
                        <option value="Graphic Designing">2. Graphic Designing</option>
                        <option value="Reel & Video Editing">3. Reel & Video Editing</option>
                        <option value="Content Writing">4. Content Writing</option>
                        <option value="Meta Ads & Digital Promotion">5. Meta Ads & Digital Promotion</option>
                        <option value="Political Digital Management">6. Political Digital Management</option>
                        <option value="Voice-Over & Promotional Content">7. Voice-Over & Promotional Content</option>
                        <option value="Digital Invitation & Card Design">8. Digital Invitation & Card Design</option>
                        <option value="Complete 360° Growth Suite">Full 360° Agency Retainer</option>
                      </select>
                    </div>
                  </div>

                  {/* Brand Type & Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Entity / Organization Type
                      </label>
                      <select
                        name="brandType"
                        value={formData.brandType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-bnk-cyan focus:ring-1 focus:ring-bnk-cyan transition-colors"
                      >
                        <option value="Business / Enterprise">Corporate Business / Enterprise</option>
                        <option value="Political Leader / Campaign">Political Leader / Campaign / MLA/MP</option>
                        <option value="D2C / E-commerce Brand">D2C / Retail / E-commerce Brand</option>
                        <option value="Creator / Influencer / Artist">Creator / Influencer / Artist</option>
                        <option value="Startup / Local Business">Startup / Local Lucknow Business</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Estimated Monthly Budget
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-bnk-cyan focus:ring-1 focus:ring-bnk-cyan transition-colors"
                      >
                        <option value="₹15,000 - ₹25,000 / month">₹15,000 - ₹25,000 / month</option>
                        <option value="₹25,000 - ₹50,000 / month">₹25,000 - ₹50,000 / month</option>
                        <option value="₹50,000 - ₹1,50,000 / month">₹50,000 - ₹1,50,000 / month</option>
                        <option value="₹1,50,000+ / month (Enterprise & Political)">₹1,50,000+ / month (Enterprise / Election)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Objectives & Key Requirements
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your brand goals, target audience, or current bottlenecks..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-bnk-cyan focus:ring-1 focus:ring-bnk-cyan transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-bnk-cyan via-purple-600 to-bnk-magenta shadow-neon-cyan hover:shadow-neon-magenta hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit & Request Custom Strategic Blueprint</span>
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% Confidential • Dedicated Non-Disclosure Guarantee</span>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>

        {/* FAQ Section (AEO & GEO optimized) */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-bnk-cyan" />
              <span>Frequently Addressed Queries</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Questions & Strategic Clarity
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => {
                      playFuturisticClick();
                      setActiveFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-5 text-left flex items-center justify-between font-heading font-bold text-sm sm:text-base text-white hover:text-bnk-cyan transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-bnk-cyan shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
