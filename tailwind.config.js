module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        garamond: ['"Cormorant Garamond"'],
        mono: ['"Space Mono"'],
      },
      colors: {
        gray: {
          eee: "#EEEEEE",
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ["group-hover"],
    },
  },
  plugins: [
    require("@tailwindcss/custom-forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
