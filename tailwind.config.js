/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Timeless Crimson & Obsidian Palette (Exact Swatches: #0B0B0B, #8B0D1A, #F5F2ED)
        obsidian: {
          950: '#060606',
          900: '#0B0B0B', // Swatch: Black #0B0B0B
          850: '#120F10',
          800: '#181415',
          750: '#201A1C',
          700: '#2B2225',
          600: '#3D3035',
          500: '#524248',
        },
        crimson: {
          950: '#330509',
          900: '#52070F',
          850: '#6E0A14',
          800: '#8B0D1A', // Swatch: Crimson Red #8B0D1A
          700: '#A81423',
          600: '#C71B2F',
          500: '#E0263C',
          400: '#EC4A5D',
          300: '#F57887',
          200: '#FBAAB5',
          100: '#FDE4E7',
          50: '#FFF0F2',
        },
        offwhite: {
          50: '#FAF8F5',
          100: '#F5F2ED', // Swatch: Off White #F5F2ED
          200: '#E8E3DB',
          300: '#D5CEC3',
          400: '#B0A89B',
          500: '#8A8275',
          600: '#696256',
          700: '#4A453B',
          800: '#302C25',
          900: '#1C1915',
        },
        
        // Semantic Mappings for Universal Cohesion across Components
        navy: {
          950: '#0B0B0B', // Base Background (#0B0B0B)
          900: '#120E10', // Header & Sidebar Surface
          850: '#171315', // Card Background
          800: '#20191B', // Secondary Card / Row Surface
          750: '#281F22',
          700: '#382A2E', // Subtle Border & Dividers
          600: '#4D3A40',
          500: '#6B525A',
          400: '#8F717B',
        },
        teal: {
          950: '#330509',
          900: '#52070F',
          800: '#8B0D1A', // Primary Crimson Red (#8B0D1A)
          700: '#A81423',
          600: '#C71B2F', // Hover & Interactive
          500: '#8B0D1A', // Primary Accent
          400: '#C71B2F', // Bright Crimson Accent
          300: '#E0263C',
          100: '#FDE4E7',
          50: '#FFF0F2',
        },
        clinical: {
          bg: '#0B0B0B',
          surface: '#120E10',
          card: '#171315',
          cardLight: '#20191B',
          border: 'rgba(139, 13, 26, 0.32)',
          borderSubtle: 'rgba(245, 242, 237, 0.08)',
          text: '#F5F2ED',
          textMuted: '#D5CEC3',
          textDim: '#8A8275',
          accent: '#8B0D1A',
          rose: '#8B0D1A',
          amber: '#D97706',
          emerald: '#10B981',
        },
        royal: {
          950: '#0B0B0B',
          900: '#120E10',
          850: '#171315',
          800: '#20191B',
          700: '#382A2E',
          600: '#4D3A40',
          500: '#6B525A',
          400: '#8F717B',
        },
        aurora: {
          rose: '#8B0D1A',
          pink: '#C71B2F',
          purple: '#8B0D1A',
          violet: '#A81423',
          amber: '#D97706',
          emerald: '#10B981',
          cyan: '#C71B2F',
        },
        space: {
          950: '#0B0B0B',
          900: '#120E10',
          850: '#171315',
          800: '#20191B',
          700: '#382A2E',
        },
        electric: {
          cyan: '#C71B2F',
          teal: '#8B0D1A',
          emerald: '#10B981',
          indigo: '#20191B',
          purple: '#8B0D1A',
          amber: '#D97706',
          rose: '#8B0D1A',
        }
      },
      fontFamily: {
        bengali: ['"Hind Siliguri"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-crimson': '0 0 25px rgba(139, 13, 26, 0.35)',
        'glow-crimson-subtle': '0 0 15px rgba(139, 13, 26, 0.2)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.25)',
        'card-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.65)',
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
