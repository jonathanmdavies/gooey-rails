const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/frontend/**/*.{js,ts,jsx,tsx}", "./app/views/**/*"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        mono: ["IBM Plex Mono", "monospace"],
      },
      keyframes: {
        move: {
          "0%": { transform: `translate(0px, 0px) scale(1)` },
          "25%": { transform: `translate(60px, 0px) scale(1.2)` },
          "50%": { transform: `translate(60px, 60px) scale(1)` },
          "75%": { transform: `translate(0px, 60px) scale(1.2)` },
          "100%": { transform: `translate(0px, 0px) scale(1)` },
        },
      },
      animation: {
        move: "move 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
