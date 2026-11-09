# Technical SEO & Discoverability Baseline

**Project:** Axes Lab (`https://axeslab.zainaxes.com/`)  
**Audit Date:** 2026-11-10  
**Domain:** `https://axeslab.zainaxes.com`  

---

## 1. Disentangling the Four SEO Outcomes

In accordance with Section 7 of the execution brief, this audit strictly distinguishes between four distinct outcomes:

1. **Technical SEO Implementation:** The codebase configuration (sitemaps, robots.txt, canonical headers, structured data, semantic HTML).
2. **Search Engine Discovery:** Search crawlers finding and fetching URLs via sitemaps and crawlable anchors.
3. **Search Engine Indexing:** Crawlers parsing, rendering, evaluating content quality, and storing URLs in their index.
4. **Organic Search Performance:** Actual keyword ranking positions, click-through rates, and organic traffic.

> **Strict Truth In Advertising:** Successful technical implementation does not prove indexing; successful indexing does not guarantee top rankings; and LLM discovery files (`llms.txt`) do not guarantee citations by external AI models. All claims must be supported by empirical evidence.

---

## 2. Technical SEO Architecture Audit

### 2.1 Metadata & Canonical URLs
- **Canonical Tags:** Enforced across all routes using `metadataBase = new URL('https://axeslab.zainaxes.com')`.
- **OpenGraph & Twitter Cards:** Configured for social sharing with static poster image previews and explicit descriptions.
- **Dynamic Detail Pages:** Permalinks (`/customize/[slug]`, `/templates/[id]`, `/resource/[slug]`) generate dynamic page titles (`<title>{item.title} — Axes Lab</title>`) and canonical links.

### 2.2 XML Sitemap (`src/app/sitemap.ts`)
- **Coverage:**
  - All core landing pages (`/`, `/prompts`, `/customize`, `/templates`, `/skills`, `/mcp`, `/about`, `/methodology`, `/licensing`).
  - All 238 motion prompt permalinks.
  - All 137 curated UI component permalinks.
- **Change Frequencies & Priority:** Calibrated appropriately (`daily` for library hubs, `monthly` for static editorial policies).

### 2.3 Crawler Directives (`src/app/robots.ts`)
- **Directives:**
  - `User-Agent: *`
  - `Allow: /`
  - `Disallow: /admin/`, `Disallow: /api/`
  - `Sitemap: https://axeslab.zainaxes.com/sitemap.xml`

### 2.4 Machine-Readable Catalog (`/llms.txt`)
- **Role:** Text-based summary structured for LLM retrieval and agent inspection.
- **Integrity:** Lists verified platform categories, documentation links, and API routes. Legacy links to broken paths (`/explore`, `/collections`) must be synchronized to live routes.

### 2.5 Structured Data (JSON-LD)
- **Schema Type:** `Dataset` and `TechArticle` for verified directives; `SoftwareSourceCode` for coding agent skills.
- **Truth In Schema:** Structured data strictly mirrors visible page content. Generic schemas are not claimed to provide guaranteed Google rich snippets.

---

## 3. Discoverability & Crawlable Permalinks

- **Modal vs Permalink:** Previously, clicking a prompt card only opened an in-memory client modal without a stable URL. Search engines could not crawl the full prompt text.
- **Resolution:** Dedicated routes (`/customize/[slug]`, `/templates/[id]`, `/resource/[slug]`) ensure every single resource has a persistent, fully crawlable HTML page.
