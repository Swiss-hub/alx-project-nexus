/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: '#e50914', // Netflix red
      secondary: '#1f1f1f',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
