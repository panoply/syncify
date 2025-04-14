/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/views/theme.liquid',
    './src/assets/scripts/**/*{.ts,.js}',
    './src/**/*.{liquid,json}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-slide': 'fadeSlide .3s forwards',
        'spin-reverse': 'spin ease-in-out 10s infinite',
        'tilt': 'tilt ease-in-out 10s infinite',
        'show': 'show .3s forwards'
      },
      colors: {
        primary: 'var(--primaryColor)',
        page: 'var(--pageBg)',
        accent: 'var(--accentOne)',
        accentTwo: 'var(--accentTwo)',
      },
      fontFamily: {
        chronicle: 'Chronicle Display A, Chronicle Display B',
        sweet: 'Sweet Sans, sans-serif'
      },
      keyframes: {
        fadeSlide: {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 }
        },
        show: {
          '0%': { transform: 'scale(0.85)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        spin: {
          '0%,15%,20%,45%,50%,90%,100%': { transform: 'rotate(0deg)' },
          '40%': { transform: 'rotate(360deg)' }
        },
        tilt: {
          '0%,15%,60%,66%,75%,80%,90%,100%': { transform: 'rotate(0deg)' },
          '62%': { transform: 'rotate(20deg)' },
          '64%': { transform: 'rotate(-20deg)' },
        }
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant("open-menu", ".open-menu &");
    })
  ],
}