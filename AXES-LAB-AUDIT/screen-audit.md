# Systematic Screen-by-Screen Visual & Craft Audit

**Project:** Axes Lab (`https://axeslab.zainaxes.com/`)  
**Audit Standard:** Hallmark Floor & Unslop 9-Pass Redline Evaluation  
**Auditor:** Design System Architect & Frontend Engineer  

---

## 1. Homepage (`/`)

- **Role:** Main portal, search, platform mission, and curated directives.
- **Audience:** Developers, AI creators, agency motion designers.
- **Primary Action:** Explore prompts or install MCP server.
- **Audit Findings:**
  - **Spacing:** Container properly capped at 1440px with `px-4 sm:px-8`. Hero section follows 4px grid.
  - **Color:** Background in `--color-paper` (`oklch(17% 0.008 250)`), cards in `--color-paper-2`. Parrot-green fully removed; tags use `--color-cool`.
  - **Typography:** Sentence-case tags, no tracked all-caps.
  - **Icons:** Standardized Lucide icons with 1.5 stroke.
  - **Copy & Metrics:** Verified directives count displays **238** (127 Website Prompts, 105 Motion Ads, 6 Skills), dynamically calculated.
  - **Motion & Previews:** Static poster previews by default; hover initiates MP4 preview. Respects `prefers-reduced-motion`.
  - **Verdict:** **PASS (Clean Craft)**

---

## 2. Prompts Library (`/prompts`)

- **Role:** Comprehensive directory discovery and filtering engine.
- **Audit Findings:**
  - **Filter UX:** Airbnb-style clean filter controls. Multi-select subcategories with live dynamic count pills. Reset button appears only when filters are active.
  - **Card Grid:** Clean responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`). Cards feature 16:9 poster preview, title, creator attribution (`@handle`), and clear Customize & Copy actions.
  - **Modal Interaction:** Clicking a card opens `PromptModal` with preview video player, full original prompt, tested prompt (where available), and direct link to creator's post.
  - **Verdict:** **PASS (Exemplar)**

---

## 3. Dedicated Customizer (`/customize/[slug]`)

- **Role:** Parameter manipulation and prompt generation workbench.
- **Audit Findings:**
  - **Dual Engine:** Correctly switches between Method A (`field_replacement`) and Method B (`additional_block`).
  - **Parameter Dials:** 3 calibrated dials (Creativity, Pace, Polish) with 5 discrete stops each. Neutral middle stop (Balanced) injects zero unnecessary boilerplate.
  - **Brand Default:** Pre-populated with `ZainAxes` without polluting canonical source registry.
  - **Live Diff & Preview:** Real-time diff view against the original prompt. Clean copy action with toast notification.
  - **Verdict:** **PASS (Workbench Standard)**

---

## 4. Reusable Templates (`/templates` & `/templates/[id]`)

- **Role:** Production scaffolding prompts for 3D websites and video showreels.
- **Audit Findings:**
  - **Realtime 3D Template:** Complete instructions for Three.js canvas, shaders, and responsive layout. Dedicated customizer at `/templates/realtime/customize`.
  - **Showreel Template:** Beat-synced kinetic typography instructions. Dedicated customizer at `/templates/showreel/customize`.
  - **Verdict:** **PASS**

---

## 5. Skills Hub (`/skills`)

- **Role:** Agent capability bundles for Claude Code, Cursor, and Antigravity.
- **Audit Findings:**
  - **Records:** Displays all 6 authentic open-source agent skills (`taste-skill`, `html-demo`, `cinetic`, `product-film-skill`, `session-story`, `generative-film-skill`).
  - **CLI Directives:** Copyable `npx skills add <repo>` commands.
  - **Attribution:** Direct links to creator GitHub repositories and X posts.
  - **Verdict:** **PASS (Reconciled from previous 3-item hardcode)**

---

## 6. Applications Category (`/apps`)

- **Role:** Web and mobile application UI prompts.
- **Audit Findings:**
  - **Identified Slop / Conflation:** Page currently searches `ALL_REAL_PROMPTS` for the substring "app", inadvertently pulling promotional showreels ("Lego icon app reel", "Claude motion designer showreel") into an application UI listing.
  - **Required Remediation:** Re-map `/apps` to query verified `Product UI` and `Phone` subcategories from `real-prompts.ts` combined with application records from `catalog.json`.
  - **Verdict:** **NEEDS_REMEDIATION (Taxonomy alignment)**

---

## 7. Backgrounds Page (`/backgrounds`)

- **Role:** WebGL shaders and animated canvas backgrounds.
- **Audit Findings:**
  - **Identified Slop / Zero State:** Page currently reports 0 resources because no records in `catalog.json` or `real-prompts.ts` use the literal category name "backgrounds".
  - **Required Remediation:** Map `/backgrounds` to query the 11 verified abstract animation, particle shader, and geometric shape records (`Particles` and `Shapes` subcategories) rather than showing a broken empty state.
  - **Verdict:** **NEEDS_REMEDIATION (Filter query fix)**

---

## 8. Top Resources (`/top`)

- **Role:** Most popular community directives.
- **Audit Findings:**
  - **Identified Slop / False Claim:** Page claims "The 50 most saved and verified design systems in the catalog. Ranked by verified implementations." In reality, `likes` across all 238 registry items are initialized to 0; sorting is effectively a slice of the top 50 array items.
  - **Required Remediation:** Remove unverified claims of "community rankings" and "save counts". Label honestly as "Curated Staff Picks & Essential Directives".
  - **Verdict:** **NEEDS_REMEDIATION (Truthful copy update)**

---

## 9. About & MCP Pages (`/about`, `/mcp`)

- **Role:** Documentation and technical guidance.
- **Audit Findings:**
  - **Identified Slop / Stale Metric:** Text states "Browse 640+ Prompts" and "Search 640+ design prompts". Actual verified count is **375** (238 motion prompts + 137 curated UI components).
  - **Required Remediation:** Reconcile copy to reflect true catalog metrics.
  - **Verdict:** **NEEDS_REMEDIATION (Metric reconciliation)**

