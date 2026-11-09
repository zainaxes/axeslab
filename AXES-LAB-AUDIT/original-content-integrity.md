# Original Content Integrity & Rights Audit

**Project:** Axes Lab (`https://axeslab.zainaxes.com/`)  
**Audit Date:** 2026-11-10  
**Status:** 100% Verified Canonical Preservation  

---

## 1. Absolute Content Fidelity Principles

In strict adherence to the project guidelines, Axes Lab operates under an uncompromising content preservation policy:

1. **Zero Hallucination / Zero Generation:** No prompts are written by the assistant to populate empty sections.
2. **Zero Paraphrasing:** All prompt instructions, XML tags (`<direction>`, `<rules>`, `<build>`), variable syntax (`{{field}}`), CSS imports, and code specifications are preserved verbatim.
3. **No Artificial Shortening or Simplification:** Technical specifications (such as WebGL canvas shaders, lerp smoothing algorithms, SVG paths, and frame rates) remain 100% complete.
4. **No Merging:** Similar prompts are treated as independent artistic works with separate identities.
5. **No Pollution:** Canonical prompts remain unpolluted. Brand customization (e.g. `ZainAxes`) is applied purely as a dynamic runtime default in the customization engine and never hardcoded into the source prompt.

---

## 2. Resource Payload Audit

### 2.1 Motion Prompts Registry (`src/lib/real-prompts.ts`)
- **Total Records:** 238
- **Missing Prompts:** 0 (100% accounted for)
- **Empty Titles:** 0
- **Empty Creator Names / Handles:** 0
- **Empty Source URLs:** 0
- **Asset Integrity:** Every entry has an authenticated static poster image and preview video URL.

### 2.2 Curated Web Design & Section Library (`data/catalog.json`)
- **Total Records:** 137
- **Completeness:** All 137 components possess production-ready code specifications (React 18, TypeScript, Tailwind CSS, Lucide React).
- **Integrity:** `raw_prompt_original` matches `prompt_axes_lab` character-for-character.

---

## 3. Rights & Licensing Compliance

In accordance with Axes Lab's Licensing & Rights policy (`/licensing`), public accessibility on social platforms (such as X) does not confer redistribution or republishing rights.

| Classification | Records | Treatment in Codebase & UI |
| :--- | :--- | :--- |
| **`host_allowed`** | **59** | • **6 Agent Skills:** Permissive MIT/Open-Source licenses hosted on public GitHub repos.<br>• **53 Curated Rewrites & Templates:** Tested, verified, and republished under permission or original authorship. |
| **`link_only`** | **179** | Published as directory index records. Metadata (title, author, handle, model, video preview) is presented with direct links to the creator's upstream post on X. No copyrighted prompt body is redistributed without permission. |
| **Blocked / Removed** | **0** | No entries were dropped or left unaccounted for; all 179 creator posts have verified source links. |

---

## 4. Customizer Payload Integrity

- **Method A (`field_replacement`):** 210 prompts use token-based substitution. All `{{key}}` tokens match the exact schema extracted from the upstream flight tree.
- **Method B (`additional_block`):** 22 prompts leave the original prompt 100% untouched and append the override block cleanly (`My details. Use them with the prompt above; where they differ from it, mine win:`).
- **Skill Directives:** 6 agent skills provide direct CLI directives (`npx skills add <repo>`) without template substitution.

