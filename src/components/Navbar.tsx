import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PhoneCall, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Flame, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { playFuturisticClick, playSpiritualChime, toggleAmbientSound } from '../utils/sound';
import { getAssetPath } from '../utils/assets';
import { Calculator } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation?: () => void;
  onOpenCalculator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onOpenCalculator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    playFuturisticClick();
    const newState = toggleAmbientSound();
    setAmbientOn(newState);
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Our Story', href: '#heritage' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Careers', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#05070f]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#" 
            onClick={() => playFuturisticClick()} 
            className="flex items-center space-x-3 group"
          >
            <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-bnk-cyan via-purple-600 to-bnk-magenta group-hover:shadow-neon-cyan transition-all duration-300">
              <img
                src={getAssetPath('assets/bnk_emblem.png')}
                alt="BNK Digital Logo"
                className="w-full h-full object-cover rounded-full bg-bnk-bg"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-wider text-white group-hover:text-bnk-cyan transition-colors">
                BNK <span className="text-gradient-cyan-magenta">DIGITAL</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                Baba Neeb Karori Digital Agency
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => playFuturisticClick()}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200 relative group"
              >
                <span>{link.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-bnk-cyan to-bnk-magenta group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action: Ambient Audio Toggle & Contact Us Button */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={handleAudioToggle}
              className={`p-2 rounded-full border transition-all ${
                ambientOn
                  ? 'border-bnk-cyan text-bnk-cyan bg-bnk-cyan/10 shadow-neon-cyan'
                  : 'border-slate-800 text-slate-400 hover:text-white bg-slate-900/60'
              }`}
              title={ambientOn ? 'Mute Sacred Ambient Sound' : 'Play Sacred Ambient Sound'}
              aria-label="Toggle Sound"
            >
              {ambientOn ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {onOpenCalculator && (
              <button
                onClick={() => {
                  playFuturisticClick();
                  onOpenCalculator();
                }}
                className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-300 transition-all"
                title="Open Growth & ROI Calculator"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>ROI Calculator</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={() => {
                playSpiritualChime();
                if (onOpenConsultation) onOpenConsultation();
              }}
              className="px-6 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-bnk-cyan via-purple-600 to-bnk-magenta p-[1px] hover:shadow-neon-cyan transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="px-5 py-2 rounded-full bg-bnk-dark hover:bg-opacity-0 transition-colors">
                Contact Us
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={handleAudioToggle}
              className="p-2 rounded-full border border-slate-700 text-slate-400 bg-slate-900/60"
              aria-label="Toggle Sound"
            >
              {ambientOn ? <Volume2 className="w-4 h-4 text-bnk-cyan" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                playFuturisticClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-white/10 mt-3 px-6 py-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    playFuturisticClick();
                    setMobileMenuOpen(false);
                  }}
                  className="text-base font-semibold text-slate-200 hover:text-bnk-cyan"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => {
                  playSpiritualChime();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-bnk-cyan via-purple-600 to-bnk-magenta text-white font-bold text-center text-sm shadow-neon-cyan"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
