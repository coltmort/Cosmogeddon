/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.handlebars'],
  theme: {
    extend: {
      colors: { 
        orange: { // exact same hue as orange in html canvas so they match
          100: 'hsl(39, 100%, 10%)',
          200: 'hsl(39, 100%, 20%)',
          300: 'hsl(39, 100%, 30%)',
          400: 'hsl(39, 100%, 40%)',
          500: 'hsl(39, 100%, 50%)',
          600: 'hsl(39, 100%, 60%)',
          700: 'hsl(39, 100%, 70%)',
          800: 'hsl(39, 100%, 80%)',
          900: 'hsl(39, 100%, 90%)',
        },
      },
    },
  },
  plugins: [],
}
