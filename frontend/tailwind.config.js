/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'rgba(172, 126, 231, 0.12)',
          100: 'rgba(172, 126, 231, 0.18)',
          400: '#C29CF0',
          500: 'rgb(172 126 231)',
          600: '#9A65DF',
          700: '#7F49BE',
        },
        accent: {
          500: 'rgb(172 126 231)',
          600: '#9A65DF',
        },
        surface: {
          page: '#000000',
          DEFAULT: '#080808',
          subtle: '#101010',
          elevated: '#161616',
          dark: '#000000',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'Manrope',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      borderRadius: {
        button: '14px',
        field: '14px',
        card: '20px',
        dialog: '24px',
        table: '18px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 70px rgba(0, 0, 0, 0.35), 0 0 42px rgba(172,126,231,0.18)',
        cyan: '0 0 34px rgba(172,126,231,0.22)',
        soft: '0 16px 60px rgba(0,0,0,0.24)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
