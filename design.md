# Hallmark Design System Specification: Console Theme
Document version: 2.0.0
Theme: Console
Genre: modern-minimal
Colorway: graphite
Display font: Host Grotesk 500
Body font: Host Grotesk 400
Measured & Code font: Atkinson Hyperlegible Mono 400/500

## The Floor Rules
1. Zero color literals (`#hex`, `rgb`, raw Tailwind palette colors like `zinc-800`, `violet-600`). Every color must route through tokens:
   - Surfaces: `bg-paper`, `bg-paper-2`, `bg-paper-3`
   - Ink: `text-ink`, `text-ink-2`, `text-muted`
   - Rules: `border-rule`, `border-rule-2`
   - Actions: `bg-accent`, `text-accent-ink`, `bg-accent-soft` (chromatic amber for humans)
   - Status: `text-cool`, `bg-cool-soft` (for instruments and states)
   - OK / Bad: `text-ok`, `bg-ok-soft`, `text-bad`, `bg-bad-soft` (for diffs and verification)
2. Zero `transition: all`. Use `transition-colors duration-150` or `transition-opacity duration-150`.
3. Zero purple-to-blue gradients. Solid ink, one anchor hue.
4. Radius: `rounded-card` (10px) on containers, `rounded-pill` (6px) on buttons/controls, 4px on badges. Zero blurry shadows (`shadow-card: none`).
5. Zero eyebrows, zero small caps, zero tracked uppercase text. Natural sentence-case labels.
6. Zero glued arrows (`→` or `←`). Verbs only.
7. Focus states: instant `focus-visible:outline-2 focus-visible:outline-accent`.
8. Motion safety: `motion-safe:` prefixes on transforms.
9. Monospace usage: `font-mono` is ONLY for numbers, timestamps, IDs, units, code, and token values. All labels, headers, and navigation use `font-sans`.
