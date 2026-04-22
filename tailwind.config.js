/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          lavender: '#EDC9F9',
          sage: '#BDD9BF',
          plum: '#4C3B4D',
          blush: '#F6E8F7',
          cream: '#FFF9F3',
        },
      },
      boxShadow: {
        soft: '0 12px 32px rgba(76, 59, 77, 0.12)',
      },
      backgroundImage: {
        glow: 'radial-gradient(circle at top right, rgba(237, 201, 249, 0.45), transparent 40%), radial-gradient(circle at bottom left, rgba(189, 217, 191, 0.35), transparent 45%)',
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
