# Authoritative Route Inventory

**Project:** Axes Lab (`https://axeslab.zainaxes.com/`)  
**Audit Date:** 2026-11-10  
**Inspection Framework:** Next.js 15.5.28 App Router  

---

## 1. Route Classification Summary

Every route discovered in `src/app/` has been accounted for and audited across five functional page families:

| Family | Total Routes | Description | Primary Behavior |
| :--- | :--- | :--- | :--- |
| **Library & Discovery** | 9 | Homepage, prompts, apps, skills, backgrounds, sections, 3d, explore, collections | Search, filter, preview cards, pagination |
| **Resource Detail** | 5 | `/customize/[slug]`, `/templates/[id]`, `/templates/[id]/customize`, `/resource/[slug]`, `/[category]/[subcategory]/[slug]` | Visual preview, technical prompt, copy/customize |
| **Interactive Tools** | 3 | `/restyle`, `/submit`, `/customize` | Live manipulation, parameter dials, submission forms |
| **Editorial & Governance** | 8 | `/about`, `/methodology`, `/changelog`, `/licensing`, `/safety-and-security`, `/privacy`, `/terms`, `/top` | Structured reading, policy enforcement, transparency |
| **System & APIs** | 15 | `/api/mcp`, `/api/public/resources`, `/api/skill/download`, `/api/media-proxy`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`, Admin routes | HTTP endpoints, schema feeds, administration |

---

## 2. Complete Discovered Route Inventory

| Path | File Path | Route Type | Rendering Model | Current State / Finding |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Library | Static (SSG) | Homepage with live directives counter (238), category tabs, and motion cards. |
| `/prompts` | `src/app/prompts/page.tsx` | Library | Static (SSG) | Full motion prompt library with Airbnb-style filtering, search, multi-select subcategories. |
| `/customize` | `src/app/customize/page.tsx` | Interactive | Static (SSG) | Customization hub with parameter dials, brand default (`ZainAxes`), and template picker. |
| `/customize/[slug]` | `src/app/customize/[slug]/page.tsx` | Detail | Dynamic (SSR) | Dedicated customizer route supporting Method A (`field_replacement`) and Method B (`additional_block`). |
| `/templates` | `src/app/templates/page.tsx` | Library | Static (SSG) | Curated templates listing: "The 3D template" (`realtime`) and "The showreel prompt" (`showreel`). |
| `/templates/[id]` | `src/app/templates/[id]/page.tsx` | Detail | Dynamic (SSR) | Template detail page with visual preview, specs, and fields breakdown. |
| `/templates/[id]/customize` | `src/app/templates/[id]/customize/page.tsx` | Interactive | Dynamic (SSR) | Full interactive customizer for the selected template. |
| `/skills` | `src/app/skills/page.tsx` | Library | Static (SSG) | Verified agent skills directory with 6 authentic open-source skills and CLI commands. |
| `/mcp` | `src/app/mcp/page.tsx` | Editorial/Tool | Static (SSG) | MCP Server installation and JSON-RPC usage guide. Contains legacy reference to "640+ prompts" needing reconciliation. |
| `/apps` | `src/app/apps/page.tsx` | Library | Static (SSG) | Applications registry. Conflates motion ads with UI screens due to title matching; requires taxonomy fix. |
| `/backgrounds` | `src/app/backgrounds/page.tsx` | Library | Static (SSG) | **Audit Finding:** Reports 0 resources. In `catalog.json` and `real-prompts.ts`, zero items are categorized as "backgrounds". |
| `/sections` | `src/app/sections/page.tsx` | Library | Static (SSG) | Hero sections, bento grids, and layout components from `catalog.json` (46 resources). |
| `/3d-websites` | `src/app/3d-websites/page.tsx` | Library | Static (SSG) | 3D interactive WebGL websites and canvas scenes from `catalog.json`. |
| `/web-design` | `src/app/web-design/page.tsx` | Library | Static (SSG) | Full landing page prompts from `catalog.json` (86 resources). Contains legacy "640+" claim needing update. |
| `/explore` | `src/app/explore/page.tsx` | Library | Dynamic (SSR) | Cross-category search and discovery route with query parameter filtering. |
| `/collections` | `src/app/collections/page.tsx` | Library | Dynamic (SSR) | Curated thematic collections from `db_snapshot.json`. |
| `/collections/[slug]` | `src/app/collections/[slug]/page.tsx` | Library | Dynamic (SSR) | Individual collection view. |
| `/top` | `src/app/top/page.tsx` | Editorial | Static (SSG) | **Audit Finding:** Claims "Ranked by verified implementations", but sorts by `likes` which are all 0 in `real-prompts`. Must be labeled honestly as editorially curated. |
| `/restyle` | `src/app/restyle/page.tsx` | Interactive | Static (SSG) | Restyle Studio for applying alternative palettes and design systems. |
| `/submit` | `src/app/submit/page.tsx` | Utility | Static (SSG) | Submission form for new prompts and UI templates. |
| `/contact` | `src/app/contact/page.tsx` | Utility | Static (SSG) | Contact and inquiries form. |
| `/about` | `src/app/about/page.tsx` | Editorial | Static (SSG) | Platform mission. Contains legacy "Browse 640+ Prompts" copy needing reconciliation. |
| `/methodology` | `src/app/methodology/page.tsx` | Editorial | Static (SSG) | Verification and benchmarking standards. |
| `/changelog` | `src/app/changelog/page.tsx` | Editorial | Static (SSG) | Platform updates and release history. |
| `/saved` | `src/app/saved/page.tsx` | Utility | Static (SSG) | Local browser bookmarks view (`localStorage`). |
| `/safety-and-security` | `src/app/safety-and-security/page.tsx` | Editorial | Static (SSG) | Security posture, input sanitization, and report guidelines. |
| `/privacy` | `src/app/privacy/page.tsx` | Editorial | Static (SSG) | Privacy policy and data handling transparency. |
| `/terms` | `src/app/terms/page.tsx` | Editorial | Static (SSG) | Terms of service and usage limitations. |
| `/licensing` | `src/app/licensing/page.tsx` | Editorial | Static (SSG) | Rights and licensing policy (`host_allowed` vs `link_only`). |
| `/resource/[slug]` | `src/app/resource/[slug]/page.tsx` | Detail | Dynamic (SSR) | Single resource detail view with JSON-LD and preview container. |
| `/[category]` | `src/app/[category]/page.tsx` | Library | Dynamic (SSR) | Dynamic catch-all for top-level category archives. |
| `/[category]/[subcategory]` | `src/app/[category]/[subcategory]/page.tsx` | Library | Dynamic (SSR) | Dynamic catch-all for subcategory archives. |
| `/[category]/[subcategory]/[slug]` | `src/app/[category]/[subcategory]/[slug]/page.tsx` | Detail | Dynamic (SSR) | Deep crawlable permalink for resources. |
| `/sitemap.xml` | `src/app/sitemap.ts` | System | Dynamic (SSR) | Search engine sitemap covering all static pages and resource slugs. |
| `/robots.txt` | `src/app/robots.ts` | System | Static | Crawler directives (allow indexing, block `/admin`). |
| `/llms.txt` | `src/app/llms.txt/route.ts` | System | Dynamic (SSR) | Markdown summary of catalog for LLM crawlers. |
| `/api/mcp` | `src/app/api/mcp/route.ts` | API | Dynamic | Streamable JSON-RPC 2.0 MCP server covering prompts and design assets. |
| `/api/public/resources` | `src/app/api/public/resources/route.ts` | API | Dynamic | Public REST endpoint for resource search and pagination. |
| `/api/skill/download` | `src/app/api/skill/download/route.ts` | API | Dynamic | Bundled agent skill download endpoint. |
| `/api/media-proxy` | `src/app/api/media-proxy/route.ts` | API | Dynamic | Proxy for streaming external video/poster media safely. |
| `/api/submissions` | `src/app/api/submissions/route.ts` | API | Dynamic | Submissions endpoint with rate limiting. |
| `/api/reports` | `src/app/api/reports/route.ts` | API | Dynamic | Resource reporting endpoint. |
| `/admin/*` (6 routes) | `src/app/admin/**/page.tsx` | Admin | Dynamic | Internal management dashboard and audit log. |

---

## 3. Discrepancies & Broken URL Findings

1. **The "640+" Legacy Claim:**
   Found across `/about`, `/mcp`, and `/web-design`. The actual count is **375** verified resources (238 motion prompts + 137 UI/web-design components). All instances must be reconciled to factual counts.
2. **The `/backgrounds` Empty State:**
   No resources exist with `category = 'backgrounds'`. The filter condition in `backgrounds/page.tsx` looked for the literal word "background" in titles.
3. **The `/top` Fictional Ranking Claim:**
   The page claims ranking based on "verified community implementations", but simply slices the un-liked registry items.
