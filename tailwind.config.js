/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d4af37",        // Luxury gold
        "primary-dark": "#b8932a", // Darker gold on hover
        secondary: "#000000",      // Pure black
        accent: "#ffffff",         // White text
        muted: "#a0a0a0",          // Light gray for secondary text
        neutral: "#1a1a1a",        // Card background (slightly lighter black)
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};