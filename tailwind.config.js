export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          light: "#C5C7BD",
          DEFAULT: "#A5A79B",
          dark: "#5F6656",
        },
        cream: {
          light: "#F8F5F0",
          DEFAULT: "#E8D2B5",
          dark: "#D5BE9E",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};