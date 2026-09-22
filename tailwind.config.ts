import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#232A60",
          dark: "#1a1f4a",
          light: "#2f3878",
        },
        gold: {
          DEFAULT: "#FFCB05",
          dark: "#e6b600",
          light: "#ffd633",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Gill Sans",
          "Gill Sans MT",
          "Calibri",
          "Trebuchet MS",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
