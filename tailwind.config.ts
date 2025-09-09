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
        background: "var(--background)",
        foreground: "var(--foreground)",
        white:"#ffffff",
        black:"#000000",
        blue:"#3b82f6",
        yellow:"#f59e0b",
        red:"#ef4444",
      },
    },
  },
  plugins: [],
} satisfies Config;
