import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#12ACA4",
        secondary: "#17383F",
        background: "#FFFFFF",
      },
      screens: {
        tablet: "800px",
      },
    },
  },
  plugins: [],
} satisfies Config;
