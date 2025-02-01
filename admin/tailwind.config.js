/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1876D2'
      },
      backgroundColor: {
        primary: '#1876D2'
      }
    },
  },
  plugins: [],
}