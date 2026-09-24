import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  MapPin, 
  Sun, 
  Maximize2, 
  CheckCircle2, 
  ExternalLink,
  Flame
} from 'lucide-react';
import { playFuturisticClick, playSpiritualChime } from '../utils/sound';

interface SpiritualHeritageProps {
  onOpenBannerModal?: () => void;
}

export const SpiritualHeritage: React.FC<SpiritualHeritageProps> = ({ onOpenBannerModal }) => {
  const [selectedPillar, setSelectedPillar] = useState(0);

  const pillars = [
    {
      title: 'Ethical Digital Dharma',
      subtitle: 'Transparent Algorithms & Real Growth',
      description:
        'In an industry crowded with hollow metrics, BNK Digital operates under the sacred principle of truth. Every follower, lead, and view is engineered through authentic engagement and hyper-targeted strategy—never inflated bots.',
      badge: 'Truth & Authenticity',
      icon: Sun,
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Seva: Dedicated Service',
      subtitle: 'Treating Your Vision as Sacred Trust',
      description:
        'Inspired by Baba Neeb Karori’s timeless message: "Love everyone, serve everyone, remember God, tell the truth." We treat each partner brand, business, and political leader with unconditional dedication, 24/7 responsiveness, and holistic care.',
      badge: 'Unconditional Commitment',
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
    },
    {
      title: 'Lucknow Heritage & Global Vision',
      subtitle: 'From the City of Nawabs to the World',
      description:
        'Rooted firmly in Lucknow (PIN 226010), our creative team combines the rich cultural storytelling and eloquent poise of Awadh with high-velocity Silicon Valley digital technology, Meta ads optimization, and 4K cinema-grade reels.',
      badge: 'Lucknow Pride',
      icon: MapPin,
      color: 'from-cyan-400 to-blue-600',
    },
  ];

  return (
    <section id="heritage" className="relative py-24 sm:py-32 overflow-hidden bg-bnk-darker/60">
      {/* Decorative cosmic aura */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-bnk-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Sacred Inspiration & Heritage</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Divine Roots. <span className="text-gradient-gold">Digital Transcendence.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Dedicated with profound reverence to <span className="text-amber-300 font-semibold">Baba Neeb Karori & Kainchi Dham</span>. 
            We infuse spiritual authenticity into modern marketing science.
          </p>
        </div>

        {/* Official Wide Banner Showcase */}
        <div className="relative mb-16 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl bg-slate-900/60">
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden">
            <img
              src="/assets/bnk_banner.png"
              alt="Baba Neeb Karori Digital Media Agency Official Banner"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Ambient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bnk-darker via-transparent to-transparent opacity-80" />

            {/* Quick banner interactive trigger */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center space-x-3">
              {onOpenBannerModal && (
                <button
                  onClick={() => {
                    playFuturisticClick();
                    onOpenBannerModal();
                  }}
                  className="px-4 py-2 rounded-full glass-panel text-white text-xs font-medium hover:border-amber-400 hover:text-amber-300 transition-all flex items-center space-x-2 shadow-lg"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge Banner</span>
                </button>
              )}
            </div>

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-md">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Official Heritage Canvas
              </span>
              <p className="mt-2 text-sm sm:text-base text-white font-medium drop-shadow-md">
                "Your Vision. Our Strategy. Real Growth." — Dedicated under the eternal blessings of Baba Neeb Karori.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Spiritual & Strategic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === idx;
            return (
              <motion.div
                key={pillar.title}
                whileHover={{ y: -6 }}
                onClick={() => {
                  playSpiritualChime();
                  setSelectedPillar(idx);
                }}
                className={`cursor-pointer p-8 rounded-2xl transition-all duration-300 border ${
                  isSelected
                    ? 'glass-panel border-amber-500/50 shadow-neon-gold bg-slate-900/90'
                    : 'glass-panel border-white/10 hover:border-slate-600'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${pillar.color} p-2.5 flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                  {pillar.badge}
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {pillar.title}
                </h3>

                <h4 className="text-xs font-medium text-slate-400 mb-4">
                  {pillar.subtitle}
                </h4>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="mt-6 flex items-center space-x-2 text-xs font-semibold text-amber-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Guaranteed Ethical Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sacred Quote Card */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl border border-amber-500/25 bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-purple-900/20 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="font-devanagari text-9xl text-amber-400">ੴ</span>
          </div>

          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-amber-400 tracking-widest uppercase">
              The Guiding Light
            </span>
            <blockquote className="mt-3 text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
              "Love all, serve all, feed all, and tell the truth."
            </blockquote>
            <div className="mt-4 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center font-devanagari text-amber-300 font-bold">
                नीब
              </div>
              <div>
                <div className="font-heading font-bold text-white text-sm">
                  Baba Neeb Karori
                </div>
                <div className="text-xs text-slate-400">
                  Eternal Guiding Inspiration for BNK Digital
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
