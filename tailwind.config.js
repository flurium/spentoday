const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["min-h-screen", "overflow-hidden"],
  theme: {
    extend: {
      colors: {
        primary: colors.green,
        secondary: colors.zinc,
        brand: {
          pink: "#D18EF0",
          green: "#84D99B",
          violet: "#8576E1",
          dark: colors.zinc[800]
        },
        header: colors.zinc[700]
      },
      fontFamily: {
        sans: ["Play", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
