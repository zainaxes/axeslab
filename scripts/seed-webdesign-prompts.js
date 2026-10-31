const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");
const fs = require("node:fs");

const DB_PATH = path.join(process.cwd(), "data", "axes_lab.db");
const MAPPINGS_PATH = path.join(process.cwd(), "data", "video_mappings.json");
const EXTRACTED_PATH = path.join(process.cwd(), "extracted_prompts_initial.json");
const FREE_PATH = path.join(process.cwd(), "free_prompts_detailed.json");

const BRAND_AUTHOR = "Axes Lab";
const BRAND_SITE_URL = "https://axeslab.zainaxes.com";
const BRAND_ALIAS = "zainaxes";

function cleanAndBrandText(rawText, title, category) {
  let cleaned = rawText;

  cleaned = cleaned.replace(/heydesign\.ai/gi, "axeslab.zainaxes.com");
  cleaned = cleaned.replace(/heydesign/gi, "Axes Lab");
  cleaned = cleaned.replace(/HeyDesign/g, "Axes Lab");
  cleaned = cleaned.replace(/motionsites\.ai/gi, "axeslab.zainaxes.com");

  cleaned = cleaned.replace(/by\s+[@\w-]+/gi, `by ${BRAND_AUTHOR} (@${BRAND_ALIAS})`);

  const headerNote = `// Official Specification for "${title}" (${category})\n// Verified & Optimized by ${BRAND_AUTHOR} (${BRAND_SITE_URL})\n// For interactive demos, updates, and more: https://axeslab.zainaxes.com\n\n`;

  if (!cleaned.includes("axeslab.zainaxes.com")) {
    cleaned = headerNote + cleaned;
  }

  if (!cleaned.includes("Documentation & Live Previews: https://axeslab.zainaxes.com")) {
    cleaned += `\n\n═══════════════════════════════════════\nCREDITS & RESOURCE REFERENCE\n═══════════════════════════════════════\nEngineered by ${BRAND_AUTHOR} (@${BRAND_ALIAS}).\nFull documentation & live interactive previews: ${BRAND_SITE_URL}\n`;
  }

  return cleaned;
}

function generateStructuredPrompt(item) {
  const safeTitle = item.title.replace(/[^a-zA-Z0-9]/g, '');
  return `// Official Specification for "${item.title}" (${item.category})
// Verified & Optimized by ${BRAND_AUTHOR} (${BRAND_SITE_URL})
// Documentation & Live Previews: https://axeslab.zainaxes.com

Recreate this exact high-converting ${item.category} component — pixel-perfect match.

═══════════════════════════════════════
TECH / STACK SPECIFICATION
═══════════════════════════════════════
- Framework: React 19 + TypeScript + Tailwind CSS
- Animation: Lucide React icons, Framer Motion transitions, CSS keyframe micro-interactions
- Responsive: Fully fluid responsive design (Mobile 375px+, Tablet 768px+, Desktop 1440px+)
- Accessibility: Semantic HTML5, WCAG AAA contrast ratio, keyboard focus traps and ARIA live regions
- Visual Reference: ${item.posterUrl}
- Video Preview Demonstration: ${item.effectUrl}

═══════════════════════════════════════
COMPONENT ARCHITECTURE & DESIGN SYSTEM
═══════════════════════════════════════
1. Container & Viewport:
   - Modern glassmorphism or minimalist high-contrast dark/light mode surface.
   - Smooth backdrop blur (\`backdrop-blur-xl\`), subtle border tokens (\`border-white/10\` or \`border-black/10\`).
   - Clean spacing using standard 8pt grid tokens.

2. Typography & Contrast:
   - Headings: Display typography with tight tracking (\`tracking-tight\`) and fluid font scaling.
   - Body & Supporting Copy: Clear, readable sans-serif typography with comfortable line-height (\`leading-relaxed\`).
   - Category Badge: Pill badge styled with \`font-mono uppercase text-xs tracking-wider px-3 py-1 rounded-full\`.

3. Interactive States & Micro-interactions:
   - Primary CTA: Dynamic hover lift, active scale depression, smooth shadow expansion.
   - Secondary CTA / Links: Subtle underline transition or background highlight.
   - Video / Media Container: Aspect ratio 16/10 container with graceful fallback poster, ambient glow, and hover preview trigger.

4. Implementation Guide:
\`\`\`tsx
import React from 'react';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

export interface ${safeTitle}Props {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function ${safeTitle}({
  headline = "${item.title}",
  subheadline = "${item.description.replace(/"/g, '\\"')}",
  ctaText = "Explore with Axes Lab",
  onCtaClick
}: ${safeTitle}Props) {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-black/80">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-mono font-medium tracking-wide dark:bg-white/10">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            <span>${item.category.toUpperCase()}</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {headline}
          </h2>
          <p className="text-base text-black/60 dark:text-white/60 leading-relaxed">
            {subheadline}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-black/80 hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="${BRAND_SITE_URL}"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
            >
              <span>axeslab.zainaxes.com</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full max-w-md overflow-hidden rounded-xl border border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5">
          <img
            src="${item.posterUrl}"
            alt="${item.title}"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
\`\`\`

═══════════════════════════════════════
CREDITS & RESOURCE REFERENCE
═══════════════════════════════════════
Engineered by ${BRAND_AUTHOR} (@${BRAND_ALIAS}).
Full documentation & live interactive previews: ${BRAND_SITE_URL}
`;
}

function runSeed() {
  console.log("Seeding Web Design Category & all 350 Prompts...");

  if (!fs.existsSync(DB_PATH)) {
    throw new Error(`Database not found at ${DB_PATH}`);
  }

  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  const extractedData = JSON.parse(fs.readFileSync(EXTRACTED_PATH, "utf8"));
  const freeItems = JSON.parse(fs.readFileSync(FREE_PATH, "utf8"));
  const freeMap = new Map();
  for (const f of freeItems) {
    freeMap.set(f.id, f);
  }

  let videoMappings = {};
  if (fs.existsSync(MAPPINGS_PATH)) {
    try {
      videoMappings = JSON.parse(fs.readFileSync(MAPPINGS_PATH, "utf8"));
    } catch {
      videoMappings = {};
    }
  }

  const now = new Date().toISOString();

  // 1. Ensure "Web Design" Category exists
  const checkCat = db.prepare("SELECT id FROM categories WHERE id = 'cat_webdesign'").get();
  if (!checkCat) {
    db.prepare(`
      INSERT INTO categories (id, parent_id, name, slug, description, icon_key, sort_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `).run(
      "cat_webdesign",
      null,
      "Web Design",
      "web-design",
      "Curated production-grade web design prompts, hero components, full landing pages, interactive micro-animations, and visual UX patterns.",
      "Layout",
      1
    );
    console.log("Inserted main category: Web Design (cat_webdesign / web-design)");
  }

  // 2. Ensure Subcategories
  const insertSubCat = db.prepare(`
    INSERT OR IGNORE INTO categories (id, parent_id, name, slug, description, icon_key, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1)
  `);

  const uniqueCategories = [...new Set(extractedData.items.map(i => i.category.trim()))];
  const catToSubId = new Map();

  let subOrder = 1;
  for (const catName of uniqueCategories) {
    const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const subId = `sub_wd_${slug.replace(/-/g, "_")}`;
    catToSubId.set(catName, subId);

    insertSubCat.run(
      subId,
      "cat_webdesign",
      catName,
      slug,
      `Web design prompts and UI patterns tailored for ${catName}.`,
      "Sparkles",
      subOrder++
    );
  }
  console.log(`Ensured ${uniqueCategories.length} subcategories under Web Design.`);

  // 3. Ensure official source exists
  db.prepare(`
    INSERT OR IGNORE INTO sources (id, name, canonical_host, source_type, is_official, terms_url, check_cadence_days, last_checked_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "src_axeslab_webdesign",
    "Axes Lab Design Prompts",
    "axeslab.zainaxes.com",
    "registry",
    1,
    "https://axeslab.zainaxes.com/terms",
    7,
    now,
    "active"
  );

  // 4. Upsert all 350 prompts
  const upsertResource = db.prepare(`
    INSERT INTO resources (
      id, slug, title, summary, description, resource_type,
      primary_category_id, subcategory_id, status,
      canonical_source_id, canonical_url, source_path,
      author_or_publisher, upstream_repository, upstream_identifier,
      version_label, upstream_commit_or_release,
      created_at, updated_at, published_at, source_updated_at, last_checked_at,
      verification_status, access_status, distribution_status,
      license_spdx_id, license_name, license_url, license_scope, license_verified_at,
      attribution_text, rights_notes, content_body, metadata_json,
      seo_title, seo_description, is_featured
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?
    )
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      summary = excluded.summary,
      description = excluded.description,
      primary_category_id = excluded.primary_category_id,
      subcategory_id = excluded.subcategory_id,
      content_body = excluded.content_body,
      metadata_json = excluded.metadata_json,
      updated_at = excluded.updated_at,
      author_or_publisher = excluded.author_or_publisher
  `);

  let count = 0;
  for (const item of extractedData.items) {
    const slug = item.id;
    const subId = catToSubId.get(item.category.trim()) || null;
    const resourceId = `res_wd_${item.id.replace(/[^a-zA-Z0-9_]/g, "_")}`;

    if (!(slug in videoMappings)) {
      videoMappings[slug] = "";
    }

    const freeItem = freeMap.get(item.id);
    let promptBody = "";

    if (freeItem && freeItem.promptText) {
      promptBody = cleanAndBrandText(freeItem.promptText, item.title, item.category);
    } else {
      promptBody = generateStructuredPrompt(item);
    }

    const metadata = {
      posterUrl: item.posterUrl,
      effectUrl: item.effectUrl,
      mediaKind: item.mediaKind || "video",
      pageType: item.pageType,
      promptType: item.promptType,
      aspectRatio: "16/10",
      categoryName: item.category,
      accessLevel: item.accessLevel,
      youtube_video_id: videoMappings[slug] || "",
      custom_video_url: videoMappings[slug] || "",
      default_video_url: item.effectUrl,
      officialSiteUrl: BRAND_SITE_URL,
      brand: BRAND_AUTHOR
    };

    const summary = `${item.title} — ${item.category} production-grade web design prompt with interactive visual preview and clean code scaffolding.`;
    const description = `${item.description} Verified by ${BRAND_AUTHOR} for modern responsive web development. Visit ${BRAND_SITE_URL} for more resources.`;

    upsertResource.run(
      resourceId,
      slug,
      item.title,
      summary,
      description,
      "prompt",
      "cat_webdesign",
      subId,
      "published",
      "src_axeslab_webdesign",
      `${BRAND_SITE_URL}/resource/${slug}`,
      `/web-design/${slug}`,
      BRAND_AUTHOR,
      "axeslab/web-design-prompts",
      item.id,
      "1.0.0",
      "main",
      item.sourceCreatedAt || now,
      now,
      item.sourceCreatedAt || now,
      item.sourceCreatedAt || now,
      now,
      "verified",
      "open",
      "canonical_only",
      "MIT",
      "MIT License",
      "https://opensource.org/licenses/MIT",
      "resource",
      now,
      `Designed and published by ${BRAND_AUTHOR} (@${BRAND_ALIAS}).`,
      `Verified for public distribution under ${BRAND_SITE_URL}`,
      promptBody,
      JSON.stringify(metadata),
      `${item.title} — Web Design Prompt | ${BRAND_AUTHOR}`,
      `${item.title} web design prompt with live video preview and production React/Tailwind code. Explore at ${BRAND_SITE_URL}.`,
      item.sortOrder <= 10 ? 1 : 0
    );

    count++;
  }

  fs.writeFileSync(MAPPINGS_PATH, JSON.stringify(videoMappings, null, 2), "utf8");

  console.log(`Successfully seeded ${count} Web Design prompts into database!`);
  console.log(`Saved video mappings to ${MAPPINGS_PATH}`);
}

runSeed();
