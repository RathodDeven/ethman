/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "p-bg": "#f9f9f9",
        "s-bg": "#ffffff",
        "p-text": "#000000",
        "s-text": "#6b6b6b",
        "p-border": "#e5e5e7",
        "p-btn": "#4294db",
        "p-btn-disabled": "#6b91b3",
        "p-btn-text": "#ffffff",
        pure: "#FFD700",
        view: "#00FF00",
        nonpayable: "#FFA500",
        payable: "#e6405d",
        brand: "#457ed9",
      },
    },
  },
  plugins: [],
};
