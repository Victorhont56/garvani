/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",  // For Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#18D619', 
        hover: '#119812', 
        light: '#64E465',
        text: '#1F2937',
      },
      fontFamily: {
        dmSerif: ['"DM Serif Display"', 'serif'],
        satoshi: ['"Satoshi"', 'sans-serif'],
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
