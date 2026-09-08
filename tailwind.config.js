/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // primary brand color (purple)
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        pastel: {
          blue: '#e0f2fe',
          green: '#dcfce7',
          peach: '#ffedd5',
          lavender: '#f3e8ff',
          pink: '#fce7f3',
        },
        theme: {
          white: '#FFFFFF',
          lightBg: '#F7F8F7',
          textDark: '#151A1F',
          textMuted: '#747B84',
          darkSection: '#102B2D',
          purple: '#7065F5',
          purpleSec: '#8377FF',
          lime: '#C8FF55',
          mint: '#75F2AF',
          border: '#E8ECEB',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
}
