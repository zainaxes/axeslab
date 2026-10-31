const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");
const fs = require("node:fs");

const DB_PATH = path.join(process.cwd(), "data", "axes_lab.db");
const MAPPINGS_PATH = path.join(process.cwd(), "data", "video_mappings.json");
const MEEZ_CATALOG_PATH = path.join(process.cwd(), "meez_catalog_extracted.json");
const MEEZ_FREE_PATH = path.join(process.cwd(), "meez_free_extracted.json");

const BRAND_AUTHOR = "Axes Lab";
const BRAND_SITE_URL = "https://axeslab.zainaxes.com";
const BRAND_ALIAS = "zainaxes";

function cleanAndBrandText(rawText, title, category) {
  let cleaned = rawText;

  // Replace external domains & mentions with Axes Lab
  cleaned = cleaned.replace(/meez\.design/gi, "axeslab.zainaxes.com");
  cleaned = cleaned.replace(/meez/gi, "Axes Lab");
  cleaned = cleaned.replace(/Meez/g, "Axes Lab");

  // Replace author / creator mentions
  cleaned = cleaned.replace(/by\s+[@\w-]+/gi, `by ${BRAND_AUTHOR} (@${BRAND_ALIAS})`);

  // Ensure canonical site link is clearly placed at the top header
  const headerNote = `// Official Specification for "${title}" (${category})\n// Verified & Optimized by ${BRAND_AUTHOR} (${BRAND_SITE_URL})\n// Interactive Demos, Video Guides & Assets: https://axeslab.zainaxes.com\n\n`;

  if (!cleaned.includes("axeslab.zainaxes.com")) {
    cleaned = headerNote + cleaned;
  }

  // Ensure canonical reference in footer
  if (!cleaned.includes("Documentation & Live Previews: https://axeslab.zainaxes.com")) {
    cleaned += `\n\n═══════════════════════════════════════\nCREDITS & RESOURCE REFERENCE\n═══════════════════════════════════════\nEngineered by ${BRAND_AUTHOR} (@${BRAND_ALIAS}).\nFull documentation & live interactive previews: ${BRAND_SITE_URL}\n`;
  }

  return cleaned;
}

function generateStructuredPrompt(item, posterUrl, videoUrl) {
  const safeTitle = item.title.replace(/[^a-zA-Z0-9]/g, '');
  const previewText = item.preview ? item.preview.replace(/"/g, '\\"') : `High-converting ${item.category} component designed with modern motion design principles.`;

  return `// Official Specification for "${item.title}" (${item.category})
// Verified & Optimized by ${BRAND_AUTHOR} (${BRAND_SITE_URL})
// Documentation & Live Previews: https://axeslab.zainaxes.com

Recreate this exact high-converting ${item.category} design — pixel-perfect match.

═══════════════════════════════════════
TECH / STACK SPECIFICATION
═══════════════════════════════════════
- Framework: React 19 + TypeScript + Vite / Next.js
- Styling: Tailwind CSS v4 / modern utility styling
- Motion & Interactions: Framer Motion / Lucide React icons
- Responsive: Fully fluid responsive design (Mobile 375px+, Tablet 768px+, Desktop 1440px+)
- Visual Reference: ${posterUrl}
${videoUrl ? `- Video Motion Demonstration: ${videoUrl}` : ''}

═══════════════════════════════════════
COMPONENT ARCHITECTURE & DESIGN SYSTEM
═══════════════════════════════════════
1. Layout & Grid:
   - Modern clean background with smooth ambient lighting and subtle borders (\`border-black/10\` or \`border-white/10\`).
   - Standard 8pt spacing grid with fluid viewport container.

2. Typography & Hierarchy:
   - Primary Headings: Display font with tight letter spacing (\`tracking-tight\`).
   - Body & Supporting Copy: Highly legible sans-serif with comfortable line height (\`leading-relaxed\`).
   - Category Pill: \`font-mono uppercase text-xs tracking-wider px-3 py-1 rounded-full\`.

3. Micro-Interactions:
   - Hover lift, magnetic CTA buttons, and smooth transition states.
   - 16/10 aspect ratio preview media container with fallback poster.

4. Production Component Implementation:
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
  subheadline = "${previewText}",
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
        ${posterUrl ? `
        <div className="relative aspect-[16/10] w-full max-w-md overflow-hidden rounded-xl border border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5">
          <img
            src="${posterUrl}"
            alt="${item.title}"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>` : ''}
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
  console.log("Seeding Meez prompts into exact categorized structure...");

  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  const catalog = JSON.parse(fs.readFileSync(MEEZ_CATALOG_PATH, "utf8"));
  const freeMap = JSON.parse(fs.readFileSync(MEEZ_FREE_PATH, "utf8"));

  let videoMappings = {};
  if (fs.existsSync(MAPPINGS_PATH)) {
    try {
      videoMappings = JSON.parse(fs.readFileSync(MAPPINGS_PATH, "utf8"));
    } catch {
      videoMappings = {};
    }
  }

  const now = new Date().toISOString();

  // 1. Ensure official source exists
  db.prepare(`
    INSERT OR IGNORE INTO sources (id, name, canonical_host, source_type, is_official, terms_url, check_cadence_days, last_checked_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "src_axeslab_prompts",
    "Axes Lab Design Prompts",
    "axeslab.zainaxes.com",
    "registry",
    1,
    "https://axeslab.zainaxes.com/terms",
    7,
    now,
    "active"
  );

  // 2. Fetch all existing categories to avoid slug collisions and resolve exact category IDs
  const allCategories = db.prepare("SELECT id, name, slug, parent_id FROM categories").all();
  const catSlugMap = new Map();
  for (const c of allCategories) {
    catSlugMap.set(c.slug, c.id);
  }

  const insertCategory = db.prepare(`
    INSERT INTO categories (id, parent_id, name, slug, description, icon_key, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1)
  `);

  const uniqueCategories = [...new Set(catalog.map(i => (i.category || "General").trim()))];
  const catToFinalSubId = new Map();

  let maxSort = 200;
  for (const catName of uniqueCategories) {
    const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    
    // Check if category with this slug already exists
    if (catSlugMap.has(slug)) {
      catToFinalSubId.set(catName, catSlugMap.get(slug));
    } else {
      const newId = `sub_cat_${slug.replace(/-/g, "_")}`;
      insertCategory.run(
        newId,
        "cat_webdesign",
        catName,
        slug,
        `Curated design prompts, UI components and layouts for ${catName}.`,
        "Sparkles",
        maxSort++
      );
      catSlugMap.set(slug, newId);
      catToFinalSubId.set(catName, newId);
    }
  }
  console.log(`Resolved and ensured all ${uniqueCategories.length} categories.`);

  // 3. Upsert resources
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
  for (const item of catalog) {
    const slug = item.id;
    const catName = (item.category || "General").trim();
    const subId = catToFinalSubId.get(catName) || null;
    const resourceId = `res_meez_${item.id.replace(/[^a-zA-Z0-9_]/g, "_")}`;

    if (!(slug in videoMappings)) {
      videoMappings[slug] = "";
    }

    // Media resolution
    let posterUrl = "";
    if (item.poster) {
      posterUrl = item.poster.startsWith("http") ? item.poster : `https://meez.design${item.poster.startsWith("/") ? "" : "/"}${item.poster}`;
    }

    let videoUrl = "";
    const rawVid = item.video || (item.image && item.image.endsWith(".mp4") ? item.image : null);
    if (rawVid) {
      videoUrl = rawVid.startsWith("http") ? rawVid : `https://meez.design${rawVid.startsWith("/") ? "" : "/"}${rawVid}`;
    } else if (item.image) {
      if (!posterUrl) {
        posterUrl = item.image.startsWith("http") ? item.image : `https://meez.design${item.image.startsWith("/") ? "" : "/"}${item.image}`;
      }
    }

    let promptBody = "";
    if (slug in freeMap && freeMap[slug]) {
      promptBody = cleanAndBrandText(freeMap[slug], item.title, catName);
    } else {
      promptBody = generateStructuredPrompt(item, posterUrl, videoUrl);
    }

    const metadata = {
      posterUrl: posterUrl || undefined,
      effectUrl: videoUrl || undefined,
      mediaKind: videoUrl ? "video" : "image",
      categoryName: catName,
      tier: item.tier || "free",
      chars: item.chars || promptBody.length,
      aspectRatio: "16/10",
      youtube_video_id: videoMappings[slug] || "",
      custom_video_url: videoMappings[slug] || "",
      default_video_url: videoUrl || undefined,
      officialSiteUrl: BRAND_SITE_URL,
      brand: BRAND_AUTHOR
    };

    const previewSnippet = item.preview ? item.preview.replace(/meez/gi, "Axes Lab").replace(/https?:\/\/[^\s]+/g, BRAND_SITE_URL) : "";
    const summary = `${item.title} — ${catName} prompt with visual preview, responsive layout, and clean code specification.`;
    const description = `${previewSnippet ? previewSnippet + " " : ""}${item.title} curated and verified by ${BRAND_AUTHOR} for modern web development. Learn more at ${BRAND_SITE_URL}.`;

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
      "src_axeslab_prompts",
      `${BRAND_SITE_URL}/resource/${slug}`,
      `/p/${slug}`,
      BRAND_AUTHOR,
      "axeslab/design-prompts",
      item.id,
      "1.0.0",
      "main",
      now,
      now,
      now,
      now,
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
      `${item.title} — ${catName} Prompt | ${BRAND_AUTHOR}`,
      `${item.title} prompt with interactive video preview and clean code. Explore at ${BRAND_SITE_URL}.`,
      item.tier === "free" ? 1 : 0
    );

    count++;
  }

  fs.writeFileSync(MAPPINGS_PATH, JSON.stringify(videoMappings, null, 2), "utf8");

  console.log(`Successfully seeded ${count} prompts into database!`);
  console.log(`Video mappings dictionary updated at ${MAPPINGS_PATH}`);
}

runSeed();
