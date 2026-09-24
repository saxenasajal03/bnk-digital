import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  RotateCcw, 
  Flame, 
  Compass, 
  Atom, 
  Zap, 
  Layers, 
  Target, 
  Video, 
  Award,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { playFuturisticClick, playSpiritualChime } from '../utils/sound';
import { getAssetPath } from '../utils/assets';

interface FloatingTag {
  id: string;
  label: string;
  icon: React.ElementType;
  initialX: number;
  initialY: number;
  color: string;
  borderColor: string;
  bgGlow: string;
}

export const AntigravityPlayground: React.FC = () => {
  const [gravityMode, setGravityMode] = useState<'zero' | 'float' | 'vortex'>('zero');
  const [activeBubble, setActiveBubble] = useState<string | null>(null);

  const tags: FloatingTag[] = [
    { id: '1', label: 'ੴ || जय बाबा नीब करोरी ||', icon: Flame, initialX: -140, initialY: -90, color: 'text-amber-300', borderColor: 'border-amber-400/50', bgGlow: 'shadow-neon-gold' },
    { id: '2', label: 'Meta Ads ROAS 5.8x', icon: Target, initialX: 130, initialY: -110, color: 'text-bnk-cyan', borderColor: 'border-bnk-cyan/50', bgGlow: 'shadow-neon-cyan' },
    { id: '3', label: 'Trident Trishul Energy', icon: Zap, initialX: -190, initialY: 30, color: 'text-bnk-magenta', borderColor: 'border-bnk-magenta/50', bgGlow: 'shadow-neon-magenta' },
    { id: '4', label: '4K Viral Reel Editing', icon: Video, initialX: 160, initialY: 40, color: 'text-purple-300', borderColor: 'border-purple-400/50', bgGlow: 'shadow-neon-cyan' },
    { id: '5', label: 'Political Campaign Mastery', icon: Award, initialX: -60, initialY: 120, color: 'text-blue-300', borderColor: 'border-blue-400/50', bgGlow: 'shadow-neon-cyan' },
    { id: '6', label: '10M+ Organic Growth', icon: TrendingUp, initialX: 100, initialY: 130, color: 'text-emerald-300', borderColor: 'border-emerald-400/50', bgGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]' },
    { id: '7', label: 'Born in Lucknow 226010', icon: Compass, initialX: 0, initialY: -160, color: 'text-slate-200', borderColor: 'border-slate-500/50', bgGlow: 'shadow-glass' },
  ];

  const handleBubbleClick = (tag: FloatingTag) => {
    playSpiritualChime();
    setActiveBubble(tag.label);
    setTimeout(() => setActiveBubble(null), 2500);
  };

  const handleModeChange = (mode: 'zero' | 'float' | 'vortex') => {
    playFuturisticClick();
    setGravityMode(mode);
  };

  return (
    <section id="playground" className="relative py-24 sm:py-32 bg-bnk-bg overflow-hidden border-y border-white/5">
      {/* Background ambient grids & glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Atom className="w-4 h-4 text-purple-400 animate-spin-slow" />
            <span>Interactive Physics Engine</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Antigravity <span className="text-gradient-cyan-magenta">Kinetic Playground</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Experience the weightless fluidity of BNK Digital. Drag, toss, and interact with our core agency pillars.
          </p>
        </div>

        {/* Physics Control Bar */}
        <div className="flex justify-center items-center gap-3 mb-10">
          <button
            onClick={() => handleModeChange('zero')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              gravityMode === 'zero'
                ? 'bg-bnk-cyan/20 border border-bnk-cyan text-bnk-cyan shadow-neon-cyan'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            Zero-G Drift
          </button>

          <button
            onClick={() => handleModeChange('float')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              gravityMode === 'float'
                ? 'bg-bnk-magenta/20 border border-bnk-magenta text-bnk-magenta shadow-neon-magenta'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            Kinetic Bounce
          </button>

          <button
            onClick={() => handleModeChange('vortex')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              gravityMode === 'vortex'
                ? 'bg-amber-500/20 border border-amber-500 text-amber-300 shadow-neon-gold'
                : 'glass-panel text-slate-400 hover:text-white'
            }`}
          >
            Cosmic Orbit
          </button>
        </div>

        {/* Interactive Physics Sandbox Area */}
        <div className="relative h-[480px] sm:h-[540px] w-full rounded-3xl glass-panel border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
          
          {/* Central Anchor / Core */}
          <div className="relative flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-bnk-cyan via-purple-600 to-bnk-magenta animate-pulse-glow flex items-center justify-center shadow-neon-trishul">
              <img
                src={getAssetPath('assets/bnk_emblem.png')}
                alt="Central Gravitational Core"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="mt-3 font-heading font-black text-white text-lg tracking-wider">
              BNK CORE
            </div>
            <div className="text-[11px] text-bnk-cyan font-mono">
              [DRAG BADGES TO TEST GRAVITY]
            </div>
          </div>

          {/* Active Bubble Flash Notice */}
          {activeBubble && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-6 px-4 py-2 rounded-full bg-slate-900/90 border border-amber-400 text-amber-300 text-xs font-bold tracking-wide shadow-neon-gold z-30"
            >
              Activated: {activeBubble}
            </motion.div>
          )}

          {/* Floating Draggable Tags */}
          {tags.map((tag, idx) => {
            const Icon = tag.icon;
            
            // Motion properties depending on gravity mode
            const floatAnim = gravityMode === 'zero' 
              ? {
                  y: [tag.initialY, tag.initialY - 18, tag.initialY],
                  x: [tag.initialX, tag.initialX + 12, tag.initialX],
                  rotate: [0, 2, -2, 0],
                }
              : gravityMode === 'float'
              ? {
                  y: [tag.initialY - 25, tag.initialY + 25, tag.initialY - 25],
                  rotate: [-4, 4, -4],
                }
              : {
                  rotate: [0, 360],
                };

            return (
              <motion.div
                key={tag.id}
                drag
                dragConstraints={{ left: -250, right: 250, top: -180, bottom: 180 }}
                dragElastic={0.4}
                whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                whileHover={{ scale: 1.08, cursor: 'grab' }}
                animate={floatAnim}
                transition={{
                  duration: 5 + idx * 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                onClick={() => handleBubbleClick(tag)}
                style={{
                  position: 'absolute',
                  transform: `translate(${tag.initialX}px, ${tag.initialY}px)`,
                }}
                className={`select-none cursor-grab px-4 py-2 rounded-full backdrop-blur-xl bg-slate-900/85 border ${tag.borderColor} ${tag.bgGlow} flex items-center space-x-2 transition-shadow duration-200 z-20`}
              >
                <Icon className={`w-4 h-4 ${tag.color}`} />
                <span className="text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                  {tag.label}
                </span>
                <Sparkles className="w-3 h-3 text-slate-500 opacity-60" />
              </motion.div>
            );
          })}

          {/* Decorative Gravitational Rings */}
          <div className="absolute inset-16 rounded-full border border-dashed border-white/5 pointer-events-none" />
          <div className="absolute inset-32 rounded-full border border-white/5 pointer-events-none" />
        </div>

        <div className="mt-4 text-center text-xs text-slate-500">
          Tip: Grab any badge and fling it across the screen to feel the damping force.
        </div>

      </div>
    </section>
  );
};
