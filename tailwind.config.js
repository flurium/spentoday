const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: colors.green,
        secondary: colors.gray
      }
    }
  },
  plugins: []
}
