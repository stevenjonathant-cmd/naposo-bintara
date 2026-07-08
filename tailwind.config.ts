import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      colors: {
        ink: "#111827",
        graphite: "#27313F",
        ember: "#D84C3D",
        mango: "#D9A441",
        teal: "#0F766E",
        skydeep: "#215C75",
        paper: "#F7F3EA",
        porcelain: "#FBFAF7"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(17, 24, 39, 0.12)",
        soft: "0 18px 50px rgba(17, 24, 39, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
