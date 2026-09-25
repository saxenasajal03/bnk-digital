import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Heart, 
  MessageCircle, 
  Share2, 
  TrendingUp, 
  BarChart3, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone,
  Award,
  ArrowRight,
  Flame
} from 'lucide-react';
import { playFuturisticClick } from '../utils/sound';
import { getAssetPath } from '../utils/assets';

type ServiceTab = 'reels' | 'ads' | 'political' | 'social' | 'graphics';

interface MobileHeroShowcaseProps {
  onOpenConsultation?: () => void;
  onOpenPosterModal?: () => void;
}

export const MobileHeroShowcase: React.FC<MobileHeroShowcaseProps> = ({ 
  onOpenConsultation,
  onOpenPosterModal 
}) => {
  const [activeTab, setActiveTab] = useState<ServiceTab>('reels');

  const tabs = [
    { id: 'reels', label: '🎬 4K Reel Editing', color: 'border-pink-500 text-pink-300' },
    { id: 'ads', label: '📈 Meta Ads & ROAS', color: 'border-cyan-400 text-cyan-300' },
    { id: 'political', label: '🏛️ Political Media', color: 'border-amber-400 text-amber-300' },
    { id: 'social', label: '📱 Social Growth', color: 'border-blue-400 text-blue-300' },
    { id: 'graphics', label: '🎨 Graphic & Identity', color: 'border-purple-400 text-purple-300' },
  ];

  return (
    <div className="w-full my-16 sm:my-24 relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-500/15 via-purple-600/15 to-pink-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Sub-Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-neon-cyan"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile-First Creative Engine</span>
        </motion.div>

        <motion.h3 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight"
        >
          Our Services in Action on <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-pink-500">Mobile Screens</span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs sm:text-sm text-slate-400 mt-2"
        >
          Experience the high-retention 4K vertical formats, algorithmic pacing, and full-funnel ad architectures we engineer for our partners.
        </motion.p>
      </div>

      {/* Interactive Service Switcher Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 px-4 max-w-4xl mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playFuturisticClick();
                setActiveTab(tab.id as ServiceTab);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center space-x-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan scale-105 border border-cyan-300'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Triple / Focused Mobile Screen Stage */}
      <div className="relative max-w-5xl mx-auto px-4 flex items-center justify-center">
        
        {/* Floating Badge 1 (Top Left) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:flex absolute top-12 left-4 lg:left-12 z-20 items-center space-x-2 px-3.5 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/20"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>4K Vertical Cinema Cuts</span>
        </motion.div>

        {/* Floating Badge 2 (Top Right) */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="hidden md:flex absolute top-16 right-4 lg:right-12 z-20 items-center space-x-2 px-3.5 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-pink-500/40 text-pink-300 text-xs font-semibold shadow-lg shadow-pink-500/20"
        >
          <TrendingUp className="w-4 h-4 text-pink-400" />
          <span>6.8x Average Meta ROAS</span>
        </motion.div>

        {/* Floating Badge 3 (Bottom Left) */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="hidden md:flex absolute bottom-12 left-8 lg:left-16 z-20 items-center space-x-2 px-3.5 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-semibold shadow-lg shadow-amber-500/20"
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>॥ जय बाबा नीब करोरी ॥</span>
        </motion.div>

        {/* Floating Badge 4 (Bottom Right) */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="hidden md:flex absolute bottom-14 right-8 lg:right-16 z-20 items-center space-x-2 px-3.5 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-purple-500/40 text-purple-300 text-xs font-semibold shadow-lg shadow-purple-500/20"
        >
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>100% Organic • Zero Bots</span>
        </motion.div>

        {/* Left Peripheral Mobile Screen (Tilted Perspective - Desktop only) */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute left-8 w-60 h-[480px] rounded-[40px] p-2.5 bg-gradient-to-b from-slate-700 to-slate-900 border-2 border-slate-600/40 shadow-2xl opacity-60 hover:opacity-100 transition-opacity -rotate-6 z-0"
        >
          <div className="w-full h-full rounded-[32px] bg-[#05070f] overflow-hidden flex flex-col p-3 border border-white/5 relative">
            <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2" />
            <div className="text-[10px] text-cyan-400 font-bold mb-1">REEL FEED</div>
            <div className="flex-1 rounded-2xl bg-gradient-to-br from-purple-900/40 via-slate-900 to-pink-950/40 p-3 flex flex-col justify-end relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${getAssetPath('assets/bnk_banner.png')})` }} />
              <div className="relative z-10 space-y-1">
                <span className="px-2 py-0.5 rounded-full text-[8px] bg-pink-500/30 text-pink-300 font-bold">4K Reel Cut</span>
                <p className="text-[10px] text-white font-bold leading-tight">National Campaign Narrative Cut</p>
                <div className="flex items-center space-x-2 text-[9px] text-slate-400 pt-1">
                  <span>❤️ 184K</span>
                  <span>💬 9.2K</span>
                  <span>🔄 41K</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Peripheral Mobile Screen (Tilted Perspective - Desktop only) */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="hidden lg:block absolute right-8 w-60 h-[480px] rounded-[40px] p-2.5 bg-gradient-to-b from-slate-700 to-slate-900 border-2 border-slate-600/40 shadow-2xl opacity-60 hover:opacity-100 transition-opacity rotate-6 z-0"
        >
          <div className="w-full h-full rounded-[32px] bg-[#05070f] overflow-hidden flex flex-col p-3 border border-white/5 relative">
            <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2" />
            <div className="text-[10px] text-pink-400 font-bold mb-1">META ADS CAMPAIGN</div>
            <div className="flex-1 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-blue-950/40 p-3 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded-full text-[8px] bg-cyan-500/30 text-cyan-300 font-bold">Live Metric</span>
                <div className="text-lg font-black text-white">6.8x ROAS</div>
                <div className="text-[9px] text-emerald-400 font-semibold">+240% Reach Spike</div>
              </div>
              <div className="space-y-1.5 pt-4">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-3/4 rounded-full" />
                </div>
                <div className="flex justify-between text-[8px] text-slate-400">
                  <span>Ad Spend: ₹35,000</span>
                  <span>Revenue: ₹2.38L</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primary Central Smartphone Mockup (Interactive Living Device) */}
        <motion.div
          key="primary-phone"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative w-[300px] sm:w-[330px] md:w-[350px] aspect-[9/18.5] rounded-[46px] p-3 sm:p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-black border-4 border-cyan-400/80 shadow-[0_0_50px_rgba(0,242,254,0.35)] z-10 overflow-hidden"
        >
          {/* Dynamic Island / Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-500/80" />
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Phone Speaker & Status Header */}
          <div className="absolute top-2.5 left-7 right-7 flex items-center justify-between text-[10px] text-slate-400 font-medium z-30 select-none">
            <span>09:41</span>
            <div className="flex items-center space-x-1 text-[9px]">
              <span>5G</span>
              <div className="w-4 h-2 rounded-sm border border-slate-400 p-0.5 flex items-center">
                <div className="w-2.5 h-full bg-cyan-400 rounded-xs" />
              </div>
            </div>
          </div>

          {/* Internal Screen Display with Animated Transitions */}
          <div className="w-full h-full rounded-[36px] bg-[#070a14] overflow-hidden flex flex-col relative z-20 pt-8 pb-3 px-3.5 border border-white/10 select-none">
            
            <AnimatePresence mode="wait">
              {/* Screen 1: 4K REEL & VIDEO EDITING */}
              {activeTab === 'reels' && (
                <motion.div
                  key="screen-reels"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-between relative rounded-2xl overflow-hidden bg-gradient-to-b from-purple-950/60 via-black to-slate-950 p-3"
                >
                  {/* Top Bar inside Screen */}
                  <div className="flex items-center justify-between z-10">
                    <span className="font-heading font-black text-xs text-white tracking-wider flex items-center space-x-1">
                      <Play className="w-3 h-3 text-pink-400 fill-pink-400" />
                      <span>BNK REELS 4K</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                      LIVE CUT
                    </span>
                  </div>

                  {/* Center Playing Reel Mockup */}
                  <div className="my-auto text-center space-y-2 relative">
                    <div className="w-14 h-14 rounded-full bg-pink-500/20 border-2 border-pink-400 flex items-center justify-center mx-auto text-pink-400 shadow-[0_0_20px_rgba(255,0,128,0.5)]">
                      <Play className="w-6 h-6 fill-pink-400 ml-0.5" />
                    </div>
                    <div className="text-xs font-bold text-white">4K Dynamic Vertical Grade</div>
                    <p className="text-[10px] text-slate-400 max-w-[200px] mx-auto leading-tight">
                      Fast-paced sound sync, kinetic typography &amp; viral retention hooks
                    </p>

                    {/* Animated Audio Waveform Bar */}
                    <div className="flex items-center justify-center space-x-1 py-1">
                      {[40, 70, 30, 90, 60, 100, 45, 80, 50, 75, 35].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="w-1 bg-gradient-to-t from-pink-500 to-cyan-400 rounded-full animate-pulse"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Reel Metrics & Caption */}
                  <div className="space-y-2 z-10">
                    <div className="flex items-center justify-between text-[11px] text-slate-300 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-1.5">
                        <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                        <span className="font-bold">248.5K</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
                        <span>14.2K</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Share2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>82.1K</span>
                      </div>
                    </div>

                    <div className="text-[9px] text-slate-400 flex items-center justify-between">
                      <span className="text-cyan-300 font-semibold">@bnkdigital • Lucknow HQ</span>
                      <span className="text-amber-300 font-mono">136.1 Hz Audio</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Screen 2: META ADS & ROAS */}
              {activeTab === 'ads' && (
                <motion.div
                  key="screen-ads"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-between relative rounded-2xl overflow-hidden bg-gradient-to-b from-cyan-950/60 via-slate-900 to-slate-950 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-xs text-white tracking-wider flex items-center space-x-1">
                      <BarChart3 className="w-3 h-3 text-cyan-400" />
                      <span>META CAMPAIGN HQ</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      ROAS 6.8x
                    </span>
                  </div>

                  {/* Ads Metrics Center */}
                  <div className="my-auto space-y-3">
                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-1">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Verified Campaign ROAS</div>
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                        6.84x Return
                      </div>
                      <div className="text-[10px] text-emerald-400 font-medium flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Ad Spend ₹35K &rarr; Revenue ₹2.39L</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 rounded-xl bg-slate-900 border border-white/5">
                        <div className="text-[9px] text-slate-500">Cost Per Lead</div>
                        <div className="text-sm font-bold text-white">₹14.20</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-white/5">
                        <div className="text-[9px] text-slate-500">Impressions</div>
                        <div className="text-sm font-bold text-cyan-300">1.48M</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-center">
                    <div className="text-[10px] text-cyan-300 font-bold">Targeted Lead Generation Funnel</div>
                    <div className="text-[8px] text-slate-400">Optimized for Conversion &amp; Retargeting</div>
                  </div>
                </motion.div>
              )}

              {/* Screen 3: POLITICAL MEDIA DESK */}
              {activeTab === 'political' && (
                <motion.div
                  key="screen-political"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-between relative rounded-2xl overflow-hidden bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-xs text-white tracking-wider flex items-center space-x-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>POLITICAL WAR-ROOM</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      LEADERSHIP DESK
                    </span>
                  </div>

                  <div className="my-auto space-y-2 text-center">
                    <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30 space-y-1">
                      <div className="text-[10px] text-amber-300 font-devanagari font-bold">
                        सोच डिजिटल... काम दमदार!
                      </div>
                      <div className="text-lg font-black text-white leading-tight">
                        Constituency Narrative Architecture
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Speech cuts, rally broadcasts &amp; voter sentiment shaping
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Sentiment Score:</span>
                      <span className="text-emerald-400 font-bold">96.4% Positive</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Constituency Reach:</span>
                      <span className="text-cyan-300 font-bold">5.2 Million Voters</span>
                    </div>
                  </div>

                  <div className="text-[9px] text-slate-400 text-center">
                    Supervised by Prabal Sinha • Political Communications Head
                  </div>
                </motion.div>
              )}

              {/* Screen 4: SOCIAL GROWTH */}
              {activeTab === 'social' && (
                <motion.div
                  key="screen-social"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-between relative rounded-2xl overflow-hidden bg-gradient-to-b from-blue-950/60 via-slate-900 to-slate-950 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-xs text-white tracking-wider">
                      @bnkdigital
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center space-x-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-blue-400" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Instagram Grid Layout */}
                  <div className="my-auto space-y-2">
                    <div className="flex items-center justify-around text-center py-1">
                      <div>
                        <div className="text-sm font-black text-white">480+</div>
                        <div className="text-[8px] text-slate-400">Creatives</div>
                      </div>
                      <div>
                        <div className="text-sm font-black text-cyan-300">125K</div>
                        <div className="text-[8px] text-slate-400">Followers</div>
                      </div>
                      <div>
                        <div className="text-sm font-black text-pink-400">8.4%</div>
                        <div className="text-[8px] text-slate-400">Engagement</div>
                      </div>
                    </div>

                    {/* 6 Post Grid thumbnails */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {[1, 2, 3, 4, 5, 6].map((idx) => (
                        <div
                          key={idx}
                          className="aspect-square rounded-lg bg-gradient-to-tr from-slate-800 to-cyan-950/60 border border-white/10 flex items-center justify-center text-[9px] font-bold text-slate-400 hover:text-white"
                        >
                          Post {idx}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-black/60 border border-white/5 text-[9px] text-slate-400 text-center">
                    Daily Algorithm-Paced Scheduling &amp; Brand Curation
                  </div>
                </motion.div>
              )}

              {/* Screen 5: GRAPHIC & IDENTITY DESIGN */}
              {activeTab === 'graphics' && (
                <motion.div
                  key="screen-graphics"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-between relative rounded-2xl overflow-hidden bg-gradient-to-b from-purple-950/60 via-slate-900 to-slate-950 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-xs text-white tracking-wider flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>BRAND DESIGN SUITE</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      VECTOR 4K
                    </span>
                  </div>

                  <div className="my-auto space-y-2 text-center">
                    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-pink-500/20 via-purple-600/30 to-cyan-500/20 border-2 border-dashed border-purple-400/40 flex flex-col items-center justify-center p-3 relative overflow-hidden">
                      <div className="font-heading font-black text-sm text-white tracking-tight">
                        BNK DIGITAL
                      </div>
                      <div className="text-[10px] text-cyan-300 font-devanagari mt-0.5">
                        सोच डिजिटल... काम दमदार!
                      </div>
                      <span className="mt-2 px-2.5 py-0.5 rounded-full text-[8px] bg-black/70 text-purple-300 border border-purple-400/40">
                        Brand Identity &amp; Typography
                      </span>
                    </div>

                    <div className="flex items-center justify-center space-x-2 pt-1">
                      <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-sm" />
                      <div className="w-4 h-4 rounded-full bg-pink-500 shadow-sm" />
                      <div className="w-4 h-4 rounded-full bg-amber-400 shadow-sm" />
                      <div className="w-4 h-4 rounded-full bg-purple-600 shadow-sm" />
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-black/60 border border-white/5 text-[9px] text-slate-400 text-center">
                    High-Impact Visual Assets, Logo Blueprints &amp; Cards
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Home Indicator Bar */}
            <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
          </div>
        </motion.div>

      </div>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
        <button
          onClick={() => {
            playFuturisticClick();
            if (onOpenPosterModal) onOpenPosterModal();
          }}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-cyan-400/50 text-xs font-semibold transition-all duration-300 shadow-lg"
        >
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>View Complete 8-Service Official Blueprint</span>
        </button>

        {onOpenConsultation && (
          <button
            onClick={() => {
              playFuturisticClick();
              onOpenConsultation();
            }}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600/30 to-purple-600/30 hover:from-pink-600/50 hover:to-purple-600/50 text-pink-300 hover:text-white border border-pink-500/40 hover:border-pink-400 text-xs font-semibold transition-all duration-300 shadow-neon-pink"
          >
            <span>Request Media Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
