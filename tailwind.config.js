/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#060913',
          900: '#0B1120',
          850: '#10192E',
          800: '#17233F',
          700: '#23335A',
        },
        electric: {
          cyan: '#00F0FF',
          teal: '#00E5BE',
          emerald: '#10B981',
          indigo: '#6366F1',
          purple: '#8B5CF6',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        bengali: ['"Hind Siliguri"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 240, 255, 0.25)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.25)',
        'glow-indigo': '0 0 25px rgba(99, 102, 241, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'soundwave': 'soundwave 0.8s ease-in-out infinite alternate',
      },
      keyframes: {
        soundwave: {
          '0%': { height: '4px' },
          '100%': { height: '26px' }
        }
      }
    },
  },
  plugins: [],
}
