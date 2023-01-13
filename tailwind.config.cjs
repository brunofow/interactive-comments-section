/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: 'hsl(239, 57%, 85%)',
          500: 'hsl(238, 40%, 52%)'
        },
        red: {
          50: 'hsl(357, 100%, 86%)',
          400: 'hsl(358, 79%, 66%)'
        },
        gray: {
          50: 'hsl(228, 33%, 97%)',
          100: 'hsl(223, 19%, 93%)',
          500: 'hsl(211, 10%, 45%)',
          700: 'hsl(212, 24%, 26%)'
        },
        white: '#FFFFFF'
      }
    },
    fontFamily: {
      rubik: 'Rubik, sans-serif'
    }
  },
  plugins: []
}
