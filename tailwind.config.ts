import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2b8b59",
        secondary: "#a1dabb",
        tertiary: "#8eb84b",
        accent: "#6fc6c1",
        background: "#fcfdf9",
        foreground: "#ffffff",
        black: "#1c1d0b",
        white: "#fcfdf9",
        brown: {
          background: "#f5f2eb",
          primary: "#655129",
          secondary: "#d9bc82",
          accent: "#d9bc82"
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
});
// export default config;
