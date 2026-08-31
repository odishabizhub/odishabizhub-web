import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f1b2b",
        paper: "#f7f9fc",
        // Primary brand blue — matches the reference design's CTA/link/nav colour.
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        // Terracotta accent for the logo mark and small highlights, evoking the
        // Konark sun-wheel motif from the reference design — never used as the
        // primary UI colour, so it can't read as an official emblem.
        saffron: "#c76b2c",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(14px) translateX(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
