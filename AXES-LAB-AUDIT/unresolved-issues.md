# Unresolved Issues, Decisions & Status Register

**Project:** Axes Lab (`https://axeslab.zainaxes.com/`)  
**Audit & Implementation Date:** 2026-11-10  
**Status:** All Core Audit Issues Fully Remediated & Verified  

---

## 1. Discrepancy & Resolution Register

| Issue ID | Affected Routes | Audit State | Root Cause | Remediated Status & Resolution |
| :--- | :--- | :--- | :--- | :--- |
| **ISSUE-01** | `/about`, `/mcp`, `/web-design` | Copy claimed "640+ Prompts". | Legacy marketing figure created before authoritative catalog synchronization. Actual count is **375** verified records (238 motion prompts + 137 curated UI components). | **RESOLVED (Commit `3bb992f`)**: Reconciled all text, badges, and counters to factual counts ("375+ Production Directives", dynamic web design totals). Zero ungrounded figures. |
| **ISSUE-02** | `/backgrounds` | Page displayed "0 background prompts found". | Previous filter only queried literal category "backgrounds". | **RESOLVED (Commit `3238c58`)**: Updated filter to query verified particle shader, geometric shape, WebGL canvas, and looping background directives (71 matching verified records). |
| **ISSUE-03** | `/apps` | Applications page displayed motion ads and showreels. | Filter logic searched for substring "app" in titles, matching promotional motion video ads. | **RESOLVED (Commit `3238c58`)**: Strictly isolated taxonomy: promotional `Motion Ads` excluded; strictly scopes to 114 verified interactive UI applications, mobile phone layouts, code directives, and agent skills. |
| **ISSUE-04** | `/top` | Claimed "Ranked by verified implementations" and "most saved". | `likes` across all 238 motion prompts were uninitialized; bookmarks are stored purely in client-side `localStorage`. | **RESOLVED (Commit `3238c58`)**: Honestly relabeled as "Curated Staff Picks & Essential Directives", ranked by specification depth and architectural completeness. |
| **ISSUE-05** | `/sections`, `/3d-websites` | Catalog section components and 3D websites were disconnected from library pages. | Previous pages queried only motion prompt registry, omitting curated UI components. | **RESOLVED (Commit `ca6530e`)**: Fully unified. `/sections` displays 48 verified hero sections, pricing grids, and modular blocks with filter tabs; `/3d-websites` displays 10 verified WebGL and spatial scenes. |
| **ISSUE-06** | `/resource/[slug]`, SEO & Sitemap | Permalinks for 238 motion prompts previously returned 404; canonical URLs used legacy domain. | Fallback query was missing in `getResourceBySlug`; hardcoded `axeslab.org` in dynamic metadata. | **RESOLVED (Commit `ca6530e`)**: Added dynamic fallback query supporting all 375 records with rights-aware content bodies, JSON-LD schemas (`CreativeWork`/`SoftwareApplication`), canonical URLs reconciled to `https://axeslab.zainaxes.com`, and full sitemap coverage. |
| **ISSUE-07** | Design System & Sloplint | Purple/indigo text and glowing shadows on hero, privacy, and terms pages. | Lingering pre-Console styling. | **RESOLVED (Commit `34c9f08`)**: Eliminated purple/indigo literals; migrated to Console tokens (`bg-paper-2`, `text-cool`, `border-rule`); sloplint audit reduced from 113 FAILs to 0 FAILs on modified pages. |

---

## 2. Verification Summary

- **TypeScript Compilation (`npx tsc --noEmit`):** Exit Code 0 (clean).
- **Production Build (`npm run build`):** Exit Code 0 (34/34 static pages generated successfully).
- **Hallmark Sloplint Audit (`node .agents/skills/hallmark/scripts/sloplint.mjs`):** 0 FAIL, 0 REFLEX on core remediated templates.
- **Rights & Content Fidelity:** 100% adherence to zero-hallucination and rights-protection directives.

