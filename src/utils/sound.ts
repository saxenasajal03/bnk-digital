// Advanced Web Audio API Engine for Spiritual & Cosmic Soundscapes

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;

// Ambient sound nodes
let omOscillator: OscillatorNode | null = null;
let harmonicOscillator1: OscillatorNode | null = null;
let harmonicOscillator2: OscillatorNode | null = null;
let lfoOscillator: OscillatorNode | null = null;
let lfoGain: GainNode | null = null;
let ambientGain: GainNode | null = null;

let isPlaying = false;
let currentVolume = 0.35;
const stateChangeListeners: ((active: boolean) => void)[] = [];

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function subscribeAudioState(callback: (active: boolean) => void) {
  stateChangeListeners.push(callback);
  return () => {
    const idx = stateChangeListeners.indexOf(callback);
    if (idx !== -1) stateChangeListeners.splice(idx, 1);
  };
}

function notifyState(active: boolean) {
  isPlaying = active;
  stateChangeListeners.forEach((cb) => cb(active));
}

export function isAmbientActive(): boolean {
  return isPlaying;
}

export function setAmbientVolume(val: number) {
  currentVolume = Math.max(0, Math.min(1, val));
  if (ambientGain && audioCtx) {
    ambientGain.gain.linearRampToValueAtTime(currentVolume * 0.05, audioCtx.currentTime + 0.1);
  }
}

export function getAmbientVolume(): number {
  return currentVolume;
}

/**
 * Generates an ethereal, multi-layered spiritual sacred soundscape:
 * - 136.1 Hz: Planetary Om frequency (Earth year tuning)
 * - 272.2 Hz: Higher harmonic for warmth
 * - 528 Hz: Solfeggio heart/transformation frequency (subtle)
 * - Low-frequency oscillation (LFO) for breathing, organic wave modulation
 */
export function startAmbientSound(): boolean {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (isPlaying) return true;

    // Master Ambient Gain
    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(currentVolume * 0.04, ctx.currentTime + 2.0);
    ambientGain.connect(ctx.destination);

    // Filter to keep the sound mellow, warm, and meditative
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(2, ctx.currentTime);
    filter.connect(ambientGain);

    // 1. Root Om frequency (136.1 Hz)
    omOscillator = ctx.createOscillator();
    omOscillator.type = 'sine';
    omOscillator.frequency.setValueAtTime(136.1, ctx.currentTime);

    // 2. Harmonic 1 (272.2 Hz)
    harmonicOscillator1 = ctx.createOscillator();
    harmonicOscillator1.type = 'sine';
    harmonicOscillator1.frequency.setValueAtTime(272.2, ctx.currentTime);

    // 3. Subtle Solfeggio Harmonic (528 Hz - gentle high aura)
    harmonicOscillator2 = ctx.createOscillator();
    harmonicOscillator2.type = 'triangle';
    harmonicOscillator2.frequency.setValueAtTime(528, ctx.currentTime);

    // Harmonic gains
    const gainRoot = ctx.createGain();
    gainRoot.gain.setValueAtTime(0.7, ctx.currentTime);
    omOscillator.connect(gainRoot);
    gainRoot.connect(filter);

    const gainH1 = ctx.createGain();
    gainH1.gain.setValueAtTime(0.35, ctx.currentTime);
    harmonicOscillator1.connect(gainH1);
    gainH1.connect(filter);

    const gainH2 = ctx.createGain();
    gainH2.gain.setValueAtTime(0.12, ctx.currentTime);
    harmonicOscillator2.connect(gainH2);
    gainH2.connect(filter);

    // LFO for breathing amplitude swell
    lfoOscillator = ctx.createOscillator();
    lfoOscillator.type = 'sine';
    lfoOscillator.frequency.setValueAtTime(0.15, ctx.currentTime); // 0.15 Hz = 6.6s breathing cycle

    lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.015, ctx.currentTime);
    lfoOscillator.connect(lfoGain);
    lfoGain.connect(ambientGain.gain);

    // Start all oscillators
    omOscillator.start();
    harmonicOscillator1.start();
    harmonicOscillator2.start();
    lfoOscillator.start();

    notifyState(true);
    return true;
  } catch (err) {
    console.debug('Failed to start ambient sound:', err);
    return false;
  }
}

export function stopAmbientSound(): boolean {
  try {
    if (!isPlaying) return false;
    const ctx = getAudioContext();
    if (ctx && ambientGain) {
      ambientGain.gain.linearRampToValueAtTime(0.00001, ctx.currentTime + 1.0);
      setTimeout(() => {
        try {
          if (omOscillator) {
            omOscillator.stop();
            omOscillator.disconnect();
          }
          if (harmonicOscillator1) {
            harmonicOscillator1.stop();
            harmonicOscillator1.disconnect();
          }
          if (harmonicOscillator2) {
            harmonicOscillator2.stop();
            harmonicOscillator2.disconnect();
          }
          if (lfoOscillator) {
            lfoOscillator.stop();
            lfoOscillator.disconnect();
          }
        } catch {
          // ignore
        }
        omOscillator = null;
        harmonicOscillator1 = null;
        harmonicOscillator2 = null;
        lfoOscillator = null;
        notifyState(false);
      }, 1000);
    } else {
      notifyState(false);
    }
    return true;
  } catch {
    notifyState(false);
    return false;
  }
}

export function toggleAmbientSound(): boolean {
  if (isPlaying) {
    stopAmbientSound();
    return false;
  } else {
    startAmbientSound();
    return true;
  }
}

export function playFuturisticClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // ignore
  }
}

export function playSpiritualChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [528, 660, 792, 1056];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);

      gain.gain.setValueAtTime(0.03 / (idx + 1), ctx.currentTime + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2 + idx * 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.04);
      osc.stop(ctx.currentTime + 1.5);
    });
  } catch {
    // ignore
  }
}
