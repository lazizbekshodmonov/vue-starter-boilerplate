/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  darkMode: ["selector", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary_color: "#00D388",
        gray_500: "#667085",
        gray_700: "#344054",
        gray_900: "#091414",
        text_primary: "#002B48",
        text_secondary: "#787F95",
        seattle_60: "#74708E",
        seattle_90: "#2E2955",
        schemes_background: "#FEF7FF",
        primary_red: "#FF3B30",
      },
    },
  },
  plugins: [],
};
