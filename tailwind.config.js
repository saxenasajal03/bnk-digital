/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bnk: {
          bg: '#05070f',
          darker: '#02040a',
          card: '#0c1022',
          surface: '#11172e',
          cyan: '#00f2fe',
          blue: '#4facfe',
          purple: '#7928ca',
          magenta: '#ff0080',
          orange: '#ff6b35',
          gold: '#f5a623',
          divine: '#ffd166',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Space Grotesk', 'sans-serif'],
        spiritual: ['Cinzel Decorative', 'Cinzel', 'serif'],
        devanagari: ['Tiro Devanagari Hindi', 'Rozha One', 'serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.5), 0 0 10px -2px rgba(0, 242, 254, 0.3)',
        'neon-magenta': '0 0 25px -5px rgba(255, 0, 128, 0.5), 0 0 10px -2px rgba(255, 0, 128, 0.3)',
        'neon-gold': '0 0 25px -5px rgba(245, 166, 35, 0.5), 0 0 10px -2px rgba(245, 166, 35, 0.3)',
        'neon-trishul': '0 0 35px 2px rgba(255, 0, 128, 0.4), 0 0 70px -10px rgba(0, 242, 254, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'orbit': 'orbit 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(15px) rotate(-1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(0,242,254,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(255,0,128,0.8))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(ellipse at 50% -20%, rgba(120, 119, 198, 0.25), rgba(255, 255, 255, 0))',
        'cyber-gradient': 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(255, 0, 128, 0.15) 100%)',
        'mesh-glow': 'radial-gradient(at 10% 20%, rgba(0, 242, 254, 0.12) 0px, transparent 50%), radial-gradient(at 90% 80%, rgba(255, 0, 128, 0.12) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(121, 40, 202, 0.08) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
