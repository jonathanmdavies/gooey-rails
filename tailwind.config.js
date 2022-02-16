const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/frontend/**/*.{js,ts,jsx,tsx}", "./app/views/**/*"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
