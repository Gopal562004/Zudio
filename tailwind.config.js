/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        customCream: "#fcf7f4",
        customGray: "#e7e1dd",
        customBlue: "#4f7894",
        customBrown: "#b78259",
        customGray1: "#f0efef",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        slideUp: "slideUp 2s ease-out",
        fadeIn: "fadeIn 1s ease-out",
      },
    },
  },
  plugins: [],
};
