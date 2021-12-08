const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        garamond: ['"EB Garamond"'],
        mono: ['"Space Mono"'],
      },
      colors: {
        trueGray: colors.trueGray,
        gray: {
          eee: "#EEEEEE",
        },
        rose: colors.rose,
        pink: colors.pink,
        fuchsia: colors.fuchsia,
        purple: colors.purple,
        violet: colors.violet,
        indigo: colors.indigo,
        blue: colors.blue,
        sky: colors.sky,
        cyan: colors.cyan,
        teal: colors.teal,
        emerald: colors.emerald,
        green: colors.green,
        lime: colors.lime,
        yellow: colors.yellow,
        amber: colors.amber,
        red: colors.red,
        gray: colors.gray,
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
