/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "p-bg": "#cccccc",
        "s-bg": "#dddddd",
        "p-text": "#000000",
        brand: "#457ed9",
      },
    },
  },
  plugins: [],
};
