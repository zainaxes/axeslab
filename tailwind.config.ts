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
        canvas: "#050507",
        surface: {
          DEFAULT: "#0B0B0F",
          elevated: "#0E0E14",
          card: "#0B0B0F",
          hover: "#14141B",
        },
        brand: {
          violet: "#8B5CF6",
          indigo: "#6366F1",
          cyan: "#38BDF8",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.07)",
          hover: "rgba(255, 255, 255, 0.18)",
          active: "rgba(255, 255, 255, 0.9)",
        },
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        serif: ["Instrument Serif", "Georgia", "serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(139, 92, 246, 0.25)",
        "glow-cyan": "0 0 25px rgba(56, 189, 248, 0.25)",
        card: "0 20px 50px rgba(0, 0, 0, 0.7)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-shift": "glowShift 8s ease infinite alternate",
      },
      keyframes: {
        glowShift: {
          "0%": { opacity: "0.4", transform: "scale(0.98)" },
          "100%": { opacity: "0.7", transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
