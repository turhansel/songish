const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: (theme) => ({
        "hero-banner": "url('/images/search-banner.jpg')",
        "form-bg": "url('/images/bg-sea.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
