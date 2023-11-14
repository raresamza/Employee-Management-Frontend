/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-dropdown':'0px 2px 5px rgba(0,0,0,.1)',
      },
    },
  },
  plugins: [],
}