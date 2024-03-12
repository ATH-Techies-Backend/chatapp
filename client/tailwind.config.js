/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      vsm: '350px',
      sm: '570px',
      vmd: '769px',
      md: '993px',
      lg: '1162px'
    },
    extend: {},
  },
  plugins: [],
}