# Unified Design System Specification

**Project:** Axes Lab (`https://axeslab.zainaxes.com/`)  
**Design Standard:** Hallmark v2.0.0 & Unslop v1.0.0 Integrated Framework  
**Theme:** Console (Graphite Neutral, Cool Steel, Chromatic Amber)  

---

## 1. Design Direction & Product Identity

Axes Lab is a technical prompt and design-system directory for developers, motion designers, and autonomous coding agents.

- **World:** Developer Console & High-Precision Design Workbench.
- **Character:** Calm, exact, utilitarian, technically sound.
- **Moments:** Rich video motion loops, canvas previews, and parameter dials.
- **Chrome:** Quiet graphite surfaces with quiet hairline borders, zero neon glows, zero decorative status dots.
- **Signature:** Live command palette (`⌘K`), calibrated 5-stop parameter dials, and copy-ready terminal directives.

---

## 2. Color System & Design Tokens (`src/app/tokens.css`)

All colors and fonts are bound to `:root` tokens. No literal colors or arbitrary font classes exist past the token block.

### 2.1 Surfaces & Neutrals (Graphite Ramp)
```css
--color-paper:    oklch(17% 0.008 250);   /* Primary page background (#121316) */
--color-paper-2:  oklch(21% 0.009 250);   /* Raised cards, navigation bar */
--color-paper-3:  oklch(13.5% 0.007 250); /* Deep wells, code blocks, inputs */
--color-rule:     oklch(31% 0.01 250);    /* Quiet hairline borders (8-10% opacity equivalent) */
--color-rule-2:   oklch(42% 0.012 250);   /* Active / focused borders */
```

### 2.2 Text Hierarchy
```css
--color-ink:      oklch(96% 0.005 250);   /* High-contrast primary text (#F4F4F6) */
--color-muted:    oklch(68% 0.01 250);    /* Secondary / metadata text (#A1A1AA) */
```

### 2.3 Chromatic Accents & Functional Colors
```css
--color-accent:      oklch(82% 0.15 80);    /* Warm Chromatic Amber (Primary action) */
--color-accent-ink:  oklch(18% 0.04 75);    /* Dark text on accent button */
--color-accent-soft: oklch(29% 0.05 80);    /* Subtle amber selection tint */

--color-cool:        oklch(77% 0.12 245);   /* Cool Steel Cyan (Verification, tokens, code) */
--color-cool-soft:   oklch(29% 0.05 245);   /* Cool pill background tint */

--color-bad:         oklch(70% 0.17 25);    /* Error state */
--color-bad-soft:    oklch(24.5% 0.035 25); /* Error well background */
```

> **Strict Color Rule:** All instances of generic parrot/light-green (`oklch(76% 0.15 150)`) have been eliminated. Semantic positive states route to `--color-cool` to preserve palette restraint.

---

## 3. Typography & Typesetting

- **Display & Body Face:** `Host Grotesk`, ui-sans-serif, system-ui, sans-serif.
- **Technical & Code Face:** `Atkinson Hyperlegible Mono`, ui-monospace, monospace.
- **Labels & Captions:** Always sentence-case or lower-case body face, untracked. Never tracked all-caps, never small caps.
- **No Mixed Headings:** Headings are one single font and weight; never an italic word inserted inside a roman heading.

---

## 4. Spacing, Layout & Container Geometry

- **Base Rhythm:** 4px grid (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`).
- **Container Width:** `max-w-[var(--container)]` (1440px), centered with `mx-auto`. At 1920px viewports, horizontal gutters grow while measure remains capped.
- **Horizontal Gutters:** `px-4 sm:px-8`.
- **Overflow Standard:** `overflow-x: clip` on `html` and `body`. Never `hidden`, never `100vw`.
- **Motion Restraint:** Never `transition: all`. Transitions specifically target `color`, `background-color`, `border-color`, `transform`, or `opacity`. Duration: 150ms to 200ms with `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 5. Page Families & Architectural Patterns

| Family | Routes | Composition Rules |
| :--- | :--- | :--- |
| **Library Pages** | `/prompts`, `/sections`, `/web-design` | Clean filter bar, multi-select subcategories, static preview posters, dynamic counts, responsive card grid. |
| **Resource Detail** | `/customize/[slug]`, `/templates/[id]` | Visual preview leads first. Technical prompt formatted in clean mono code well. Calibrated dials for parameter customization. |
| **Interactive Tools** | `/customize`, `/restyle` | Parameter input controls, live split preview, copy action. |
| **Editorial Pages** | `/about`, `/methodology`, `/licensing`, `/safety-and-security` | Centered readable measure (max-w-2xl), clear section hierarchy, transparent governance. |
| **Utility Pages** | `/saved`, `/submit`, `/contact` | Form controls with focus rings, clear feedback toasts, zero fake validation. |

---

## 6. Hallmark & Unslop Quality Gates

1. **The Floor (Zero Tolerance):**
   - No literal colors or un-tokenized fonts.
   - All interactive elements possess `:focus-visible` with instantaneous visual ring.
   - All animations respect `prefers-reduced-motion: reduce`.
   - Zero invented metrics, testimonials, or case-study counts.
   - About 80 words per screen; hero leads with headline + one sentence + action.
2. **Unslop Visual Passes:**
   - Quiet chrome: borders are subtle hairlines (8-10% opacity).
   - One bright moment per screen (the motion preview or dial output).
   - Icons from Lucide React at fixed stroke (1.5) and matching text color.
   - Zero emoji icons, zero purple-blue gradients, zero neon glows.

