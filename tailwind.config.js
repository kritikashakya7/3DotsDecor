/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#76ABAE",
        hover: "#f6f6f6",
        secondary: "#222831",
      },
      keyframes: {
        "slide-down": {
          "0%": { height: "0" },
          "100%": { height: "100%" },
        },
      },
      animation: {
        "slide-down": "slide-down 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
