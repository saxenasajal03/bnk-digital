import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Palette, 
  Video, 
  PenTool, 
  Target, 
  Landmark, 
  Mic2, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight,
  CheckCircle2, 
  Maximize2,
  X,
  Send,
  Zap
} from 'lucide-react';
import { playFuturisticClick, playSpiritualChime } from '../utils/sound';

export interface ServiceCardData {
  number: number;
  title: string;
  tagline: string;
  borderColor: string;
  glowColor: string;
  neonClass: string;
  iconBg: string;
  badgeColor: string;
  leftIcon: React.ElementType;
  rightIcon: React.ElementType;
  features: string[];
  description: string;
}

interface ServicesGridProps {
  onSelectServiceForContact?: (serviceName: string) => void;
  onOpenPosterModal?: () => void;
}

const servicesList: ServiceCardData[] = [
  {
    number: 1,
    title: 'Social Media Management',
    tagline: 'Build Your Brand. Engage Your Audience.',
    borderColor: 'border-cyan-400',
    glowColor: 'shadow-[0_0_25px_rgba(0,242,254,0.35)]',
    neonClass: 'hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(0,242,254,0.6)]',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/30',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40',
    leftIcon: Share2,
    rightIcon: TrendingUp,
    features: [
      'Content Strategy',
      'Post Scheduling',
      'Engagement & Growth',
      'Analytics & Reporting',
    ],
    description: 'Complete monthly stewardship of your presence across Instagram, Facebook, LinkedIn, X, and YouTube with algorithm-paced scheduling and authentic community growth.',
  },
  {
    number: 2,
    title: 'Graphic Designing',
    tagline: 'Creative Designs. Lasting Impressions.',
    borderColor: 'border-pink-500',
    glowColor: 'shadow-[0_0_25px_rgba(255,0,128,0.35)]',
    neonClass: 'hover:border-pink-400 hover:shadow-[0_0_35px_rgba(255,0,128,0.6)]',
    iconBg: 'bg-pink-500/10 text-pink-400 border border-pink-400/30',
    badgeColor: 'bg-pink-500/20 text-pink-300 border border-pink-400/40',
    leftIcon: Palette,
    rightIcon: ArrowUpRight,
    features: [
      'Posters & Flyers',
      'Social Media Graphics',
      'Branding & Logo Design',
      'Print & Digital Assets',
    ],
    description: 'High-converting graphics and brand identity systems that command instant attention in crowded feeds and offline billboards.',
  },
  {
    number: 3,
    title: 'Reel & Video Editing',
    tagline: 'Turn Moments Into Impact.',
    borderColor: 'border-cyan-400',
    glowColor: 'shadow-[0_0_25px_rgba(0,242,254,0.35)]',
    neonClass: 'hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(0,242,254,0.6)]',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/30',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40',
    leftIcon: Video,
    rightIcon: Zap,
    features: [
      'Dynamic Reels & Shorts',
      'Promos & Ads',
      'Motion Graphics',
      'Subtitles & Captions',
    ],
    description: 'Viral short-form vertical video editing with 4K color grading, kinetic sound effects, and hook-optimized retention pacing.',
  },
  {
    number: 4,
    title: 'Content Writing',
    tagline: 'Words That Connect. Content That Converts.',
    borderColor: 'border-pink-500',
    glowColor: 'shadow-[0_0_25px_rgba(255,0,128,0.35)]',
    neonClass: 'hover:border-pink-400 hover:shadow-[0_0_35px_rgba(255,0,128,0.6)]',
    iconBg: 'bg-pink-500/10 text-pink-400 border border-pink-400/30',
    badgeColor: 'bg-pink-500/20 text-pink-300 border border-pink-400/40',
    leftIcon: PenTool,
    rightIcon: Sparkles,
    features: [
      'Social Media Content',
      'Blog Posts & Articles',
      'Website Copy',
      'Product Descriptions',
    ],
    description: 'Persuasive copywriting and thought-leadership articles crafted to communicate your authentic authority and guide visitors toward conversion.',
  },
  {
    number: 5,
    title: 'Meta Ads & Digital Promotion',
    tagline: 'Targeted Reach. Better ROI.',
    borderColor: 'border-cyan-400',
    glowColor: 'shadow-[0_0_25px_rgba(0,242,254,0.35)]',
    neonClass: 'hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(0,242,254,0.6)]',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/30',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40',
    leftIcon: Target,
    rightIcon: TrendingUp,
    features: [
      'Targeted Lead Generation',
      'Campaigns with Key Metrics',
      'Performance Monitoring',
      'ROI Focused Strategy',
    ],
    description: 'Precision-targeted paid campaigns on Facebook & Instagram Ads Manager engineered for maximum Return on Ad Spend (ROAS).',
  },
  {
    number: 6,
    title: 'Political Digital Management',
    tagline: 'Stronger Presence. Greater Impact.',
    borderColor: 'border-pink-500',
    glowColor: 'shadow-[0_0_25px_rgba(255,0,128,0.35)]',
    neonClass: 'hover:border-pink-400 hover:shadow-[0_0_35px_rgba(255,0,128,0.6)]',
    iconBg: 'bg-pink-500/10 text-pink-400 border border-pink-400/30',
    badgeColor: 'bg-pink-500/20 text-pink-300 border border-pink-400/40',
    leftIcon: Landmark,
    rightIcon: ArrowUpRight,
    features: [
      'Leader Branding',
      'Full Page Management',
      'Strategic Campaigns',
      'Social Media Handling',
    ],
    description: 'Comprehensive digital strategy and narrative architecture for political representatives, electoral campaigns, and public leaders across Uttar Pradesh and India.',
  },
  {
    number: 7,
    title: 'Voice-Over & Promotional Content',
    tagline: 'Your Message. Our Voice.',
    borderColor: 'border-cyan-400',
    glowColor: 'shadow-[0_0_25px_rgba(0,242,254,0.35)]',
    neonClass: 'hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(0,242,254,0.6)]',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/30',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40',
    leftIcon: Mic2,
    rightIcon: Zap,
    features: [
      'Professional Female Voice-overs',
      'Promotional Audio for Sales & Ads',
      'Explainer Videos',
      'Brand Storytelling',
    ],
    description: 'Studio-recorded narration and audio commercials delivering clarity, charisma, and emotional depth to your video advertisements.',
  },
  {
    number: 8,
    title: 'Digital Invitation & Card Design',
    tagline: 'Beautiful Designs for Every Occasion.',
    borderColor: 'border-pink-500',
    glowColor: 'shadow-[0_0_25px_rgba(255,0,128,0.35)]',
    neonClass: 'hover:border-pink-400 hover:shadow-[0_0_35px_rgba(255,0,128,0.6)]',
    iconBg: 'bg-pink-500/10 text-pink-400 border border-pink-400/30',
    badgeColor: 'bg-pink-500/20 text-pink-300 border border-pink-400/40',
    leftIcon: Sparkles,
    rightIcon: ArrowUpRight,
    features: [
      'Wedding Invitations',
      'Birthday Cards',
      'Event Invitations',
      'Festival Greetings',
    ],
    description: 'Exquisite digital e-invites and animated greeting cards designed for high-profile weddings, corporate summits, and cultural celebrations.',
  },
];

export const ServicesGrid: React.FC<ServicesGridProps> = ({ 
  onSelectServiceForContact, 
  onOpenPosterModal 
}) => {
  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);

  const handleCardClick = (service: ServiceCardData) => {
    playSpiritualChime();
    setSelectedService(service);
  };

  const handleBookService = (serviceName: string) => {
    playFuturisticClick();
    setSelectedService(null);
    if (onSelectServiceForContact) onSelectServiceForContact(serviceName);
    const elem = document.getElementById('contact');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#05070f] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading matching reference UI */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            The 8 Powerful Digital Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Everything you need to build, scale, and command market presence online.
          </p>
        </div>

        {/* 2-Column Bento Grid matching Panel 2 from the user reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {servicesList.map((service) => {
            const LeftIcon = service.leftIcon;
            const RightIcon = service.rightIcon;

            return (
              <motion.div
                key={service.number}
                whileHover={{ y: -5 }}
                onClick={() => handleCardClick(service)}
                className={`cursor-pointer rounded-3xl p-6 sm:p-8 bg-[#090d1c]/90 border-2 ${service.borderColor} ${service.glowColor} ${service.neonClass} transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Top Row: Numbered Badge on Left & Icons */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-3">
                    {/* Number Badge [ 1 ] */}
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/20 flex items-center justify-center font-heading font-black text-lg text-white">
                      {service.number}
                    </div>
                    {/* Left Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${service.iconBg}`}>
                      <LeftIcon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Right Icon */}
                  <div className="text-slate-400">
                    <RightIcon className="w-5 h-5" />
                  </div>
                </div>

                {/* Service Title & Tagline */}
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 italic mb-4">
                    {service.tagline}
                  </p>

                  {/* Bulleted Points */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Note */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Click to view strategy details</span>
                  <span className="text-cyan-400 font-bold">Details →</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-[#0c1022] border-2 border-cyan-400 shadow-neon-cyan overflow-hidden"
            >
              <button
                onClick={() => {
                  playFuturisticClick();
                  setSelectedService(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                  SERVICE #{selectedService.number}
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white mb-1">
                {selectedService.title}
              </h3>
              <p className="text-xs text-cyan-300 font-semibold mb-4">
                {selectedService.tagline}
              </p>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {selectedService.description}
              </p>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Included Execution Deliverables:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleBookService(selectedService.title)}
                  className="flex-1 py-3 px-6 rounded-2xl font-bold text-xs bg-gradient-to-r from-cyan-400 via-purple-600 to-pink-500 text-white shadow-neon-cyan"
                >
                  Inquire For This Service
                </button>
                <a
                  href={`https://wa.me/917235836153?text=Hello%20BNK%20Digital,%20I%20am%20interested%20in%20${encodeURIComponent(selectedService.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-2xl font-bold text-xs bg-emerald-600/30 border border-emerald-500 text-emerald-300 hover:bg-emerald-600/50 flex items-center justify-center"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
