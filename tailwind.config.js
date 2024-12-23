/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'md-905': '905px',
      'lg': '1024px',
      'xl-1920': '1920px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1536px',
      '4xl': '1600px',
      '5xl': '1900px',
      '6xl': '2050px'
    },
    extend: {
      colors: {
        primary: '#16171D',
        mediumGray: '#828282',
        success: '#43A747',
        error: '#DD2C2C',
        info: '#4383A7',
        warning: '#e3a021',
        default: '#626262'
      }
    },
  },
  plugins: [],
}
