import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronDown, Compass, Flame } from 'lucide-react';
import { playFuturisticClick, playSpiritualChime } from '../utils/sound';
import { getAssetPath } from '../utils/assets';

interface HeroProps {
  onOpenConsultation?: () => void;
  onOpenPosterModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onOpenPosterModal }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Perspective Tilt calculation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 140, damping: 14 });
  const mouseYSpring = useSpring(y, { stiffness: 140, damping: 14 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Neon Flares matching the reference screenshot */}
      <div className="absolute top-12 left-0 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-8 right-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-purple-700/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Main 3-Column / Center-Emblem Composition from the user's reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          
          {/* Left Column: Headlines & CTA 1 */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Small top emblem mark */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 rounded-lg bg-bnk-cyan/10 border border-bnk-cyan/30 flex items-center justify-center text-bnk-cyan mb-4 shadow-neon-cyan"
            >
              <Sparkles className="w-4 h-4 text-bnk-cyan" />
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-[1.1]">
                BNK Digital <br />
                <span className="text-white">Solutions for a</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_25px_rgba(0,242,254,0.6)]">
                  Brighter Tomorrow
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-sm sm:text-base text-slate-300 font-medium tracking-wide"
            >
              Your Vision. Our Strategy. Real Growth.
            </motion.p>

            {/* CTA 1: Explore Our 8 Powerful Services (Glowing pink/magenta rounded pill) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8"
            >
              <a
                href="#services"
                onClick={() => playFuturisticClick()}
                className="group inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-slate-950/80 border-2 border-pink-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(255,0,128,0.5)] hover:shadow-[0_0_35px_rgba(255,0,128,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Explore Our 8 Powerful Services</span>
              </a>
            </motion.div>
          </div>

          {/* Center Column: 3D Holographic BNK Emblem with Particle Glow */}
          <div className="lg:col-span-5 flex justify-center items-center py-6">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-72 sm:w-88 md:w-96 aspect-square select-none cursor-grab active:cursor-grabbing"
            >
              {/* Outer Glowing Concentric Orbiting Rings */}
              <div className="absolute -inset-4 rounded-full border border-dashed border-bnk-cyan/40 animate-spin-slow pointer-events-none" />
              <div 
                className="absolute -inset-8 rounded-full border border-pink-500/30 pointer-events-none" 
                style={{ animation: 'spin 30s linear infinite reverse' }} 
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/25 via-purple-600/25 to-pink-500/25 blur-2xl -z-10 group-hover:blur-3xl transition-all" />

              {/* Central Glowing Emblem */}
              <div 
                style={{ transform: 'translateZ(40px)' }}
                className="w-full h-full rounded-full p-2 bg-gradient-to-b from-slate-900 to-black border border-white/20 shadow-neon-trishul flex items-center justify-center relative overflow-hidden"
              >
                <img
                  src={getAssetPath('assets/bnk_emblem.png')}
                  alt="BNK Digital Circular 3D Emblem"
                  className="w-full h-full object-contain rounded-full trishul-glow hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Ambient ground spark reflection */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-10 bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 rounded-full blur-xl opacity-70 pointer-events-none" />
            </motion.div>
          </div>

          {/* Right Column: CTA 2 (Let's Build Your Presence) */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <a
                href="#contact"
                onClick={() => {
                  playSpiritualChime();
                  if (onOpenConsultation) onOpenConsultation();
                }}
                className="group inline-flex items-center space-x-2 px-7 py-3.5 rounded-2xl bg-slate-950/80 border-2 border-cyan-400 text-white font-bold text-xs sm:text-sm tracking-wide shadow-neon-cyan hover:shadow-[0_0_35px_rgba(0,242,254,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Let's Build Your Presence</span>
              </a>
            </motion.div>
          </div>

        </div>

        {/* Baba Neeb Karori Heritage Card (From the reference UI bottom of Panel 1 / top of Panel 2) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-3xl p-6 sm:p-10 glass-panel border border-white/10 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90 shadow-2xl overflow-hidden"
        >
          {/* Subtle warm glow background */}
          <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heritage Ethos Text */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Baba Neeb Karori Heritage</span>
                </span>
                <span className="text-sm font-devanagari font-bold text-amber-300/90 drop-shadow">
                  ॥ जय बाबा नीब करोरी ॥
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Spiritual Truth Meets <span className="text-gradient-cyan-magenta">Exponential Digital Growth</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mb-4">
                Dedicated with deep reverence to Baba Neeb Karori & Kainchi Dham. BNK Digital weaves organic flow, 
                universal love, transparent ethics, and high-velocity digital technology into scalable brand dominance. 
                Zero fake bots. Zero hollow promises. Authentic compounding results.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
                <span className="flex items-center space-x-1.5 text-cyan-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Lucknow Headquarters (226010)</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-300 font-devanagari">सोच डिजिटल... काम दमदार!</span>
              </div>
            </div>

            {/* Right Column: Reverent Portrait of Baba Neeb Karori & Kainchi Dham */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl max-w-sm w-full group">
                <img
                  src={getAssetPath('assets/bnk_banner.png')}
                  alt="Baba Neeb Karori & Kainchi Dham Heritage"
                  className="w-full h-48 sm:h-56 object-cover object-right group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-amber-300">
                  Kainchi Dham Sacred Inspiration
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
