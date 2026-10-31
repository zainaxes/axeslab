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
        canvas: "#E9E9E0",
        primaryText: "#000000",
        surface: {
          DEFAULT: "#F7F7F2",
          strong: "#FFFFFF",
        },
        mutedText: {
          DEFAULT: "#66665E",
          secondary: "#46463F",
        },
        subtleBorder: {
          DEFAULT: "#C9C9BF",
          strong: "#99998F",
        },
        state: {
          hover: "#DEDED5",
          selected: "#D5D5CA",
          inverse: "#000000",
          inverseText: "#E9E9E0",
          success: "#245A3A",
          warning: "#76500B",
          danger: "#A12828",
          info: "#244F70",
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
      maxWidth: {
        container: "1440px",
      },
      borderRadius: {
        card: "11px",
        btn: "8px",
        input: "8px",
        panel: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
