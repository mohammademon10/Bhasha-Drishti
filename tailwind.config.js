/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#151f33',
          900: '#0f172a',
          950: '#070c18',
        },
        clinical: {
          bg: '#0F172A',
          card: '#1E293B',
          cardHover: '#283548',
          border: '#334155',
          emerald: '#10B981',
          teal: '#14B8A6',
          cyan: '#06B6D4',
          amber: '#F59E0B',
          rose: '#EF4444',
          text: '#F8FAFC',
          muted: '#94A3B8',
        }
      },
      fontFamily: {
        bengali: ['"Hind Siliguri"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'soundwave': 'soundwave 1s ease-in-out infinite alternate',
      },
      keyframes: {
        soundwave: {
          '0%': { height: '4px' },
          '100%': { height: '24px' }
        }
      }
    },
  },
  plugins: [],
}
