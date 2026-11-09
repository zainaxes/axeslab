# Skill Installation, Compatibility & Licences

**Project:** Axes Lab (`https://axeslab.zainaxes.com/`)  
**Audit Date:** 2026-11-10  
**Environment:** Antigravity IDE (Windows PowerShell, Node.js v26.12.0)  

---

## 1. Installed Skills Summary

Both mandated skills have been installed with complete directories (including `SKILL.md`, `references/`, `scripts/`, `agents/`, and full license texts) in workspace-specific storage as well as mirrored to the global Antigravity configuration directory.

| Skill | Repository | Installed Commit / Version | License | Workspace Path | Global Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hallmark** | `https://github.com/Nutlope/hallmark` | `407fa689f4a276f2fd389208d271d0fef08f5058` (v2.0.0) | MIT License | `.agents/skills/hallmark/` | `~/.gemini/config/skills/hallmark/` |
| **Unslop** | `https://github.com/heydamir/unslop` | `97daa3eb365670ea3f87ed85356cbfcee18105a5` (v1.0.0) | CC BY 4.0 | `.agents/skills/unslop/` | `~/.gemini/config/skills/unslop/` |

---

## 2. Directory & Asset Verification

### 2.1 Hallmark File Verification
- **Root Files:**
  - `SKILL.md` (18,239 bytes, verified intact)
  - `LICENSE` (1,078 bytes, MIT license text preserved)
  - `agents/openai.yaml` (verified)
- **References (`references/`):**
  - `redesign.md` (12,231 bytes) — Existing site audit & redesign workflow
  - `brand-truth.md` (3,685 bytes) — Brand extraction and protection
  - `layout.md` (16,258 bytes) — Grid, layout, and composition standards
  - `gates.md` (39,061 bytes) — Floor, Reflex, and Finish quality gates
  - `responsive.md` (3,504 bytes) — Multi-viewport rules
  - `craft.md` (19,279 bytes) — Typography, spacing, micro-details
  - `anatomy.md` (7,037 bytes) — Section order by job type
  - `comp.md`, `dark-mode.md`, `data-viz.md`, `design-md.md`, `direction.md`, `export-formats.md`, `flow.md`, `fonts.md`, `imagery.md`, `interaction-and-states.md`, `macrostructures.md`, `microinteractions.md`, `patterns.md`, `review-finish.md`, `review-hero.md`, `scroll-choreography.md`, `texture.md`
  - Subdirectories: `genres/` (4 genre profiles), `macrostructures/` (21 page shapes), `themes/` (20+ themes with spec cards)
- **Scripts (`scripts/`):**
  - `capture.mjs`, `capture.test.mjs`
  - `sloplint.mjs` (231,740 bytes) — Quality gate automated checker
  - `sloplint-render.mjs` (99,965 bytes) — Render-tier checker
  - `theme.mjs` (59,476 bytes) — Theme dealer and scaffold engine
  - `picture.mjs`, `photos.json`, `refcheck.mjs`, `imagegen.mjs`

### 2.2 Unslop File Verification
- **Root Files:**
  - `SKILL.md` (31,658 bytes, verified intact)
  - `LICENSE` (18,657 bytes, CC BY 4.0 legal code preserved)
  - `agents/openai.yaml` (verified)
- **References (`references/`):**
  - `signs.md` (7,038 bytes) — Catalog of AI-generated visual tells
  - `tokens.md` (6,494 bytes) — Exact spacing, color ramps, and typography values
  - `visuals.md` (8,306 bytes) — Visual styles, what works vs what fails
  - `refs.md` (2,458 bytes) — Exemplar references
  - `effects.md` (4,864 bytes) — Code-based visual treatments and canvas shaders
  - Subdirectory: `refs/` (5 reference webp visual artifacts)
- **Scripts (`scripts/`):**
  - `snapshot.mjs` (8,271 bytes) — Non-destructive live snapshot and DOM capture
  - `story.mjs` (25,382 bytes) — Step-by-step visual audit record

---

## 3. License Compliance & External Service Protection

### 3.1 Unslop CC BY 4.0 Attribution
- **Author:** Damir Sokolovsky (`@heydamir`, `https://heydamir.design/unslop`)
- **Requirement:** Attribution must be retained in all derived documentation, code adaptations, and audits.
- **Compliance:** Retained in `AXES-LAB-AUDIT/`, `.agents/skills/unslop/LICENSE`, and all design tokens.

### 3.2 Hallmark MIT License Notice
- **Author:** Hassan El Mghari (`@Nutlope`, `https://github.com/Nutlope`)
- **Requirement:** Copyright and permission notice must be included in copies or substantial portions of the software.
- **Compliance:** Retained in `.agents/skills/hallmark/LICENSE` and preserved across all audit files.

### 3.3 Zero Unauthorized Data Transmission (Air-Gap Protection)
- **External Providers:** Hallmark and Unslop can optionally query Together AI (`TOGETHER_API_KEY`) or image generation endpoints.
- **Policy Enforcement:** For this project, **no private codebase files, proprietary prompts, user database records, or environment secrets shall be transmitted to third-party AI APIs without explicit written user authorization**.
- **Execution Mode:** All audits, lint checks, theme evaluations, and snapshots run locally in Node.js using deterministic rule passes.

---

## 4. Execution Commands & Invocation Verification

| Operation | Canonical Command | Active Environment Verification |
| :--- | :--- | :--- |
| **Hallmark Audit** | `node .agents/skills/hallmark/scripts/sloplint.mjs <target> --genre modern-minimal` | Local Node.js execution verified |
| **Hallmark Existing-Site Workflow** | Read `references/redesign.md` and execute non-destructive audit against isolated preview | Verified |
| **Unslop Inspection** | Read `references/signs.md` and check 9-layer redline pass | Local verification verified |
| **Unslop Snapshot** | `node .agents/skills/unslop/scripts/snapshot.mjs` | Available via local Chromium |

