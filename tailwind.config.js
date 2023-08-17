const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: colors.green,
        secondary: colors.gray
      },
      fontFamily: {
        sans: ["Play", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
