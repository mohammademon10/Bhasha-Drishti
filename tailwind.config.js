/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional Healthcare & AI Design Palette
        navy: {
          950: '#0A0F1D', // Deepest background
          900: '#101828', // Primary structural color
          850: '#142034', // Panel background
          800: '#182C47', // Secondary surfaces & cards
          700: '#233E63', // Borders & active states
          600: '#335582',
          500: '#4871A5',
          400: '#688FC0',
        },
        teal: {
          950: '#042F2E',
          900: '#0F3A3E',
          800: '#115E59',
          700: '#0F766E',
          600: '#0D9488',
          500: '#14B8A6', // Primary Action & Accent Teal
          400: '#20B6A5', // Bright Healthcare Teal
          300: '#5EEAD4',
          100: '#CCFBF1',
          50: '#E8F3F5',  // Soft Teal Background Tint
        },
        clinical: {
          bg: '#0A0F1D',
          surface: '#101828',
          card: '#142034',
          cardLight: '#1A2942',
          border: 'rgba(32, 182, 165, 0.18)',
          borderSubtle: 'rgba(255, 255, 255, 0.08)',
          text: '#F8FAFC',
          textMuted: '#94A3B8',
          textDim: '#64748B',
          accent: '#20B6A5',
          rose: '#E11D48',
          amber: '#F59E0B',
          emerald: '#10B981',
        },
        // Compatibility Aliases with Royal Aurora theme
        royal: {
          950: '#0A0F1D',
          900: '#101828',
          850: '#142034',
          800: '#182C47',
          700: '#233E63',
          600: '#335582',
          500: '#4871A5',
          400: '#688FC0',
        },
        aurora: {
          rose: '#E11D48',
          pink: '#F43F5E',
          purple: '#20B6A5',
          violet: '#0D9488',
          amber: '#F59E0B',
          emerald: '#10B981',
          cyan: '#20B6A5',
        },
        space: {
          950: '#0A0F1D',
          900: '#101828',
          850: '#142034',
          800: '#182C47',
          700: '#233E63',
        },
        electric: {
          cyan: '#20B6A5',
          teal: '#14B8A6',
          emerald: '#10B981',
          indigo: '#182C47',
          purple: '#233E63',
          amber: '#F59E0B',
          rose: '#E11D48',
        }
      },
      fontFamily: {
        bengali: ['"Hind Siliguri"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-teal': '0 0 25px rgba(32, 182, 165, 0.25)',
        'glow-navy': '0 0 25px rgba(24, 44, 71, 0.4)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.25)',
        'card-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
