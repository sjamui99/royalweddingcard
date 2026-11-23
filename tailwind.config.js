/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#0c170f',
          900: '#15291b',
          850: '#1b3322',
          800: '#23442e',
          700: '#2c5439',
          600: '#386948',
        },
        gold: {
          100: '#fcf6e8',
          200: '#f7eccd',
          300: '#edd69c',
          400: '#e1be67',
          500: '#d4a43b',
          600: '#b88628',
          700: '#94661c',
          800: '#754f19',
        },
        ivory: {
          50: '#fefdfa',
          100: '#fcfaf5',
          200: '#f8f4ea',
          300: '#f2ebdb',
          400: '#e7dcbe',
          500: '#dac79e',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
