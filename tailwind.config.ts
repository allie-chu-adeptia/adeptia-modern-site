import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/aggregators/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/globals.css",
    "./src/animations/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          gradientLight: "var(--brand-gradient-light)",
          gradientMedium: "var(--brand-gradient-medium)",
          gradientDark: "var(--brand-gradient-dark)",
          backgroundDark: "var(--brand-background-dark)",
          backgroundLight: "var(--brand-background-light)",
          backgroundMedium: "var(--brand-background-medium)",
          primaryBlue: "var(--brand-gradient-medium"
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
