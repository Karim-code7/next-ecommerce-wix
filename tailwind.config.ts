import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "instagram-gradient":
          "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
      },
      colors: {
        primary: "#1977f2",

        TrendoGo: "#F35C7A",

        "TrendoGo-green": "#16A34A",

        secound: "#16A34A",

        dark: "#242526",

        "dark-input": "#3a3b3c",

        facebook: "#1877F2",

        instagram: "#E4405F",

        youtube: "#FF0000",

        x: "#000000",

        pinterest: "#E60023",

        paypal: {
          dark: "#003087",
          light: "#009cde",
        },

        visa: {
          blue: "#1a1f71",
          yellow: "#f7b600",
        },

        mastercard: {
          red: "#eb001b",
          orange: "#ff5f00",
          yellow: "#f79e1b",
        },

        discover: {
          orange: "#ff6000",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
};
export default config;
