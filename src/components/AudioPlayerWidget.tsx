import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Flame, Sparkles } from 'lucide-react';
import { 
  toggleAmbientSound, 
  isAmbientActive, 
  setAmbientVolume, 
  getAmbientVolume, 
  subscribeAudioState,
  playFuturisticClick 
} from '../utils/sound';

export const AudioPlayerWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsPlaying(isAmbientActive());
    setVolume(getAmbientVolume());

    const unsubscribe = subscribeAudioState((active) => {
      setIsPlaying(active);
    });

    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    playFuturisticClick();
    const newState = toggleAmbientSound();
    setIsPlaying(newState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setAmbientVolume(val);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center">
      <div className="relative group">
        
        {/* Main Floating Audio Pill */}
        <div className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-full bg-[#0c1022]/90 backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300 hover:border-cyan-400">
          
          {/* Play/Pause Button */}
          <button
            onClick={handleToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-gradient-to-tr from-cyan-400 to-pink-500 text-white shadow-neon-cyan'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title={isPlaying ? 'Pause Sacred Ambient Sound' : 'Play Sacred Ambient Sound (136.1 Hz Om)'}
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Equalizer Visualizer Bars & Status */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer flex items-center space-x-2 pr-1"
          >
            <div className="flex items-end space-x-0.5 h-4 w-5">
              <span className={`w-1 bg-cyan-400 rounded-full transition-all ${isPlaying ? 'h-full animate-bounce' : 'h-1.5'}`} style={{ animationDuration: '0.6s' }} />
              <span className={`w-1 bg-pink-500 rounded-full transition-all ${isPlaying ? 'h-3 animate-bounce' : 'h-2'}`} style={{ animationDuration: '0.8s', animationDelay: '0.1s' }} />
              <span className={`w-1 bg-amber-400 rounded-full transition-all ${isPlaying ? 'h-4 animate-bounce' : 'h-1'}`} style={{ animationDuration: '0.5s', animationDelay: '0.2s' }} />
            </div>

            <div className="hidden sm:flex flex-col">
              <span className="text-[11px] font-bold text-white tracking-wide">
                {isPlaying ? 'Sacred Sound' : 'Background Sound'}
              </span>
              <span className="text-[9px] text-amber-300 font-devanagari">
                136.1 Hz ॐ
              </span>
            </div>
          </div>

          {/* Expandable Volume Slider on hover/click */}
          <div className="flex items-center pl-1 border-l border-white/10">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
