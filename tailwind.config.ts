import type { Config } from "tailwindcss"
const withMT = require("@material-tailwind/react/utils/withMT");
const config = withMT({
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#2b8b59",
        secondary: "#65C18B",
        tertiary: "#D2FAE0",
        accent: "#00C7FA",
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "wiggle": {
          '0%, 100%': {
              transform: 'rotate(-2deg)'
          },
          '50%': {
              transform: 'rotate(2deg)'
          },
        },
        "expand-contract": {
          '0%': {
            transform: 'scale(1.05)'
            
          },
          '50%': {
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "wiggle": "wiggle 0.3s ease-in-out",
        "expand-contract": "expand-contract 0.7s ease-in-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}) satisfies Config

export default config