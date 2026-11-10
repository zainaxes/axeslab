import type { Config } from "tailwindcss";

const token = (cssVar: string) =>
  `color-mix(in oklch, var(${cssVar}) calc(<alpha-value> * 100%), transparent)`;

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
        paper: token("--color-paper"),
        "paper-2": token("--color-paper-2"),
        "paper-3": token("--color-paper-3"),
        ink: token("--color-ink"),
        "ink-2": token("--color-ink-2"),
        muted: token("--color-muted"),
        rule: token("--color-rule"),
        "rule-2": token("--color-rule-2"),
        accent: token("--color-accent"),
        "accent-ink": token("--color-accent-ink"),
        "accent-soft": token("--color-accent-soft"),
        cool: token("--color-cool"),
        "cool-soft": token("--color-cool-soft"),
        ok: token("--color-ok"),
        "ok-soft": token("--color-ok-soft"),
        bad: token("--color-bad"),
        "bad-soft": token("--color-bad-soft"),
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-outlier)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "var(--radius-card)",
        pill: "var(--radius-pill)",
      },
      letterSpacing: {
        display: "var(--tracking-display)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
    },
  },
  plugins: [],
};

export default config;
