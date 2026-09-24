import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X, TrendingUp, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playFuturisticClick, playSpiritualChime } from '../utils/sound';

interface ROICalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState('Meta Ads & Digital Promotion');
  const [budget, setBudget] = useState(35000);
  const [currentReach, setCurrentReach] = useState(15000);

  if (!isOpen) return null;

  // Calculators
  const multiplier = selectedService === 'Meta Ads & Digital Promotion' ? 5.4 
    : selectedService === 'Reel & Video Editing' ? 6.8 
    : selectedService === 'Political Digital Management' ? 8.2 
    : 4.5;

  const projectedImpressions = Math.round((budget * 25) + (currentReach * multiplier));
  const projectedLeads = Math.round(projectedImpressions * 0.018);
  const estimatedROAS = (multiplier * 0.95).toFixed(1);

  const handleWhatsAppClaim = () => {
    playSpiritualChime();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00f2fe', '#ff0080', '#ffd166'],
    });

    const msg = encodeURIComponent(
      `*BNK Digital Growth Calculator Projection*\n` +
      `*Service:* ${selectedService}\n` +
      `*Monthly Budget:* ₹${budget.toLocaleString('en-IN')}\n` +
      `*Current Reach:* ${currentReach.toLocaleString('en-IN')}\n` +
      `*Projected Impressions:* ${projectedImpressions.toLocaleString('en-IN')}\n` +
      `*Estimated Inquiries/Leads:* ~${projectedLeads.toLocaleString('en-IN')}\n` +
      `*Estimated ROAS:* ${estimatedROAS}x\n\n` +
      `I would like to claim this strategy blueprint for my brand!`
    );
    window.open(`https://wa.me/917235836153?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-[#090d1c] border-2 border-cyan-400 shadow-neon-cyan overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={() => {
              playFuturisticClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Close Calculator"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                BNK Growth & ROI Calculator
              </h3>
              <p className="text-xs text-slate-400">
                Simulate your reach multiplier based on actual campaign data
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {/* Left Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Select Target Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Social Media Management">1. Social Media Management</option>
                  <option value="Meta Ads & Digital Promotion">5. Meta Ads & Digital Promotion</option>
                  <option value="Reel & Video Editing">3. Reel & Video Editing (4K)</option>
                  <option value="Political Digital Management">6. Political Digital Management</option>
                  <option value="Complete 360 Growth Suite">Full 360° Agency Retainer</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Monthly Investment:</span>
                  <span className="text-cyan-400">₹{budget.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="200000"
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>₹15K</span>
                  <span>₹1 Lakh</span>
                  <span>₹2 Lakh+</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Current Monthly Reach:</span>
                  <span className="text-pink-400">{currentReach.toLocaleString('en-IN')} views</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="2000"
                  value={currentReach}
                  onChange={(e) => setCurrentReach(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1K</span>
                  <span>50K</span>
                  <span>100K+</span>
                </div>
              </div>
            </div>

            {/* Right Projection Metrics */}
            <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/10 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-amber-300 font-devanagari flex items-center space-x-1 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>अनुमानित डिजिटल प्रगति (Projected Growth)</span>
              </span>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Projected Monthly Impressions</div>
                  <div className="font-heading font-black text-2xl text-cyan-400">
                    {projectedImpressions.toLocaleString('en-IN')}+
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-400">Target Inquiries</div>
                    <div className="font-heading font-bold text-base text-pink-400">
                      ~{projectedLeads.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-400">Projected ROAS</div>
                    <div className="font-heading font-bold text-base text-amber-300">
                      {estimatedROAS}x
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center space-x-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Based on 250+ delivered Lucknow & Pan-India campaigns</span>
              </div>
            </div>
          </div>

          {/* Action Call */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleWhatsAppClaim}
              className="flex-1 py-3 px-6 rounded-2xl font-heading font-bold text-xs bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-neon-cyan flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Claim This Blueprint on WhatsApp</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-2xl font-bold text-xs text-slate-400 hover:text-white glass-panel"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
