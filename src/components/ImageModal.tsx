import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Sparkles } from 'lucide-react';
import { playFuturisticClick } from '../utils/sound';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  description?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-4xl w-full max-h-[90vh] glass-panel border border-white/20 rounded-3xl p-4 sm:p-6 bg-bnk-dark flex flex-col z-10 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-white flex items-center space-x-2">
                <span>{title}</span>
                <Sparkles className="w-4 h-4 text-bnk-cyan" />
              </h3>
              {description && (
                <p className="text-xs text-slate-400 mt-0.5">{description}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={imageSrc}
                download
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="Download Image"
              >
                <Download className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  playFuturisticClick();
                  onClose();
                }}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="flex-1 overflow-auto rounded-2xl flex items-center justify-center bg-black/50 p-2">
            <img
              src={imageSrc}
              alt={title}
              className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Footer note */}
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Official BNK Digital Brand Asset</span>
            <span className="text-amber-300 font-devanagari">॥ जय बाबा नीब करोरी ॥</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
