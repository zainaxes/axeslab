# Design System Master File — Axes Lab

> **Brand:** Axes Lab  
> **Tagline:** Discover the tools behind AI.  
> **Description:** An independent library of AI prompts, agent skills, MCP servers, workflows and open-source resources.  
> **Design Philosophy:** Restrained editorial / technical reference library and digital archive. Calm, precise, fast, accessible.

---

## 1. Core Color Palette & Design Tokens

### Foundations (Strict Brand Requirements)

| Token | Value | Purpose |
|---|---|---|
| `--color-canvas` | `#E9E9E0` | Primary page background |
| `--color-text` | `#000000` | Primary text, headings, prominent icons |
| `--color-surface` | `#F7F7F2` | Elevated content surfaces, menu panels |
| `--color-surface-strong` | `#FFFFFF` | Code panels, inputs, focused content |
| `--color-text-secondary` | `#46463F` | Supporting text that must remain readable |
| `--color-text-muted` | `#66665E` | Timestamps, low-priority metadata |
| `--color-border` | `#C9C9BF` | Default dividers, card outlines, input borders |
| `--color-border-strong` | `#99998F` | Active boundaries, stronger separators |
| `--color-hover` | `#DEDED5` | Subtle hover surface on canvas |
| `--color-selected` | `#D5D5CA` | Selected navigation/filter surface |
| `--color-inverse` | `#000000` | Primary dark buttons, inverted panels |
| `--color-inverse-text` | `#E9E9E0` | Text on black surfaces |

### Semantic Colors

| Token | Value | Usage |
|---|---|---|
| `--color-success` | `#245A3A` | Verified / safe status |
| `--color-warning` | `#76500B` | Review required, partial compatibility, caution |
| `--color-danger` | `#A12828` | Unsafe, unavailable, destructive, error state |
| `--color-info` | `#244F70` | Neutral informational state |

---

## 2. Typography

```css
--font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
```

### Scale

| Token | Size / Line Height | Weight | Usage |
|---|---|---|---|
| `--type-display` | 44px / 50px | 600 | Homepage headline |
| `--type-h1` | 34px / 42px | 600 | Page heading |
| `--type-h2` | 25px / 32px | 600 | Major section heading |
| `--type-h3` | 19px / 27px | 600 | Subsection / card group heading |
| `--type-body-lg` | 17px / 27px | 400 | Intro and explanatory text |
| `--type-body` | 15px / 24px | 400 | Default reading text |
| `--type-small` | 13px / 19px | 400–500 | Metadata and helper text |
| `--type-label` | 12px / 16px | 600 | Eyebrows, compact labels, table headings |
| `--type-code` | 13px / 21px | 400 | Code, prompt bodies, configs |

---

## 3. Spacing Scale

`4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px, 80px, 96px`

---

## 4. Borders, Elevation & Radius

- Card radius: `10px`
- Input and button radius: `8px`
- Menu / dropdown radius: `10px`
- Modal / drawer radius: `12px`
- Border: `1px solid var(--color-border)`
- Shadow: minimal to none. Surfaces use subtle tonal borders rather than heavy drop shadows.

---

## 5. Buttons

- **Primary Button**: `background: #000000`, `color: #E9E9E0`, `border-radius: 8px`, `padding: 10px 18px`, `font-weight: 500`.
- **Secondary Button**: `background: var(--color-surface)`, `color: #000000`, `border: 1px solid var(--color-border)`, `border-radius: 8px`.
- **Tertiary Button**: `background: transparent`, `color: var(--color-text-secondary)`.
- **Destructive Button**: `background: var(--color-danger)`, `color: #FFFFFF`.

---

## 6. Anti-Patterns (Explicitly Prohibited)

- No neon gradients, aurora glowing blobs, or glassmorphic blurs.
- No giant hero sections pushing catalogue below the fold.
- No chatbots or "Ask AI" floating widgets as navigation.
- No fake counters, fake stars, or fabricated metrics.
- No emoji used as navigation icons.
