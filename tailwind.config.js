/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Press Start 2P"', 'cursive'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-out': {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.1' },
          '100%': { opacity: '0' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        'scroll-diagonal': {
          '0%': { transform: 'translateX(0%) translateY(-50%)' },
          '100%': { transform: 'translateX(-50%) translateY(0%)' }
        },
        'vote-confirmation': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-out': 'fade-in-out 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'scroll-diagonal': 'scroll-diagonal 20s linear infinite',
        'vote-confirmation': 'vote-confirmation 1s ease-out forwards'
      },
    },
  },
  plugins: [],
};