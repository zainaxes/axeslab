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
        canvas: "#09090B",
        primaryText: "#F4F4F5",
        surface: {
          DEFAULT: "#121215",
          strong: "#18181B",
        },
        mutedText: {
          DEFAULT: "#71717A",
          secondary: "#A1A1AA",
        },
        subtleBorder: {
          DEFAULT: "#27272A",
          strong: "#3F3F46",
        },
        state: {
          hover: "#1F1F23",
          selected: "#27272A",
          inverse: "#FFFFFF",
          inverseText: "#09090B",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
          info: "#0EA5E9",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "SFMono-Regular",
          "Consolas",
          "Liberation Mono",
          "Menlo",
          "monospace",
        ],
      },
      borderRadius: {
        card: "12px",
        panel: "16px",
        btn: "8px",
        input: "8px",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
