/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Aurora Palette
        royal: {
          950: '#0C0714',
          900: '#140C20',
          850: '#1B112B',
          800: '#25173B',
          700: '#3E2F58', // Signature Royal Plum
          600: '#533F75',
          500: '#6C5396',
          400: '#8E71BF',
        },
        aurora: {
          rose: '#E94560',   // Signature Vibrant Coral Rose
          pink: '#FF5E7E',
          purple: '#8B5CF6',
          violet: '#9D4EDD',
          amber: '#F59E0B',
          emerald: '#10B981',
          cyan: '#00F0FF',
        },
        // Backwards compatibility mappings for smooth transition
        space: {
          950: '#0C0714',
          900: '#140C20',
          850: '#1B112B',
          800: '#25173B',
          700: '#3E2F58',
        },
        electric: {
          cyan: '#E94560',
          teal: '#FF5E7E',
          emerald: '#10B981',
          indigo: '#3E2F58',
          purple: '#9D4EDD',
          amber: '#F59E0B',
          rose: '#E94560',
        }
      },
      fontFamily: {
        bengali: ['"Hind Siliguri"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-aurora': '0 0 25px rgba(233, 69, 96, 0.25)',
        'glow-royal': '0 0 25px rgba(62, 47, 88, 0.4)',
        'glow-cyan': '0 0 25px rgba(233, 69, 96, 0.25)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.25)',
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
