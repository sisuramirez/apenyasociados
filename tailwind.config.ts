import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: "#17383F",
              fontWeight: "700",
            },
            h2: {
              color: "#17383F",
              fontWeight: "700",
            },
            h3: {
              color: "#17383F",
              fontWeight: "600",
            },
            h4: {
              color: "#17383F",
              fontWeight: "600",
            },
            a: {
              color: "#12ACA4",
              "&:hover": {
                color: "#0e918a",
              },
            },
            strong: {
              color: "#17383F",
            },
            blockquote: {
              borderLeftColor: "#12ACA4",
              color: "#4b5563",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
