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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        brand: {
          blue: "#00C2FF",
          violet: "#7B2FFF",
          dark: "#0A0A0F",
          card: "rgba(255, 255, 255, 0.03)",
          cardHover: "rgba(255, 255, 255, 0.06)",
          border: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glowBlue: "0 0 25px rgba(0, 194, 255, 0.25)",
        glowViolet: "0 0 25px rgba(123, 47, 255, 0.25)",
        glowSm: "0 0 15px rgba(0, 194, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
