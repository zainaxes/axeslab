const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const db = new DatabaseSync('./data/axes_lab.db');

// Read MotionSites items from assets_prompts.js
const msData = fs.readFileSync('assets_prompts.js', 'utf8');
const msRegex = /\{id:`([^`]+)`,title:`([^`]+)`,image:([^,]+),poster:([^,]+),category:`([^`]+)`(?:,type:`([^`]+)`)?/g;
const msMap = new Map();
let msMatch;

while ((msMatch = msRegex.exec(msData)) !== null) {
  const id = msMatch[1];
  const title = msMatch[2];
  let image = msMatch[3].trim().replace(/^`|`$/g, '');
  let poster = msMatch[4].trim().replace(/^`|`$/g, '');
  const category = msMatch[5];
  const type = msMatch[6] || 'hero';

  // Extract Mux playback ID if present
  let muxId = null;
  const muxMatch = (image + ' ' + poster).match(/image\.mux\.com\/([a-zA-Z0-9]+)/);
  if (muxMatch) {
    muxId = muxMatch[1];
  }

  const normTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  msMap.set(normTitle, { id, title, image, poster, category, type, muxId });
}

console.log(`Loaded ${msMap.size} MotionSites prompt visual references.`);

// Clean any accidental pre/post notes
function cleanPromptText(text) {
  if (!text) return '';
  let out = text;
  out = out.replace(/^\/\/\s*Official Specification for[\s\S]*?(?=\n\n|\n[A-Z0-9#\/\*])/i, '').trim();
  out = out.replace(/═{10,}\s*\nCREDITS & RESOURCE REFERENCE\s*\n═{10,}\s*\nEngineered by[\s\S]*$/i, '').trim();
  return out;
}

// Surgical brand transformer exactly per Section 3
function surgicalBrandTransform(rawText) {
  if (!rawText) return '';
  let output = rawText;
  output = output.replace(/\bMotionSites\s+AI\b/gi, 'Axes Lab');
  output = output.replace(/\bMotionSites\.ai\b/gi, 'Axes Lab');
  output = output.replace(/\bMotionSites\b/g, 'Axes Lab');
  output = output.replace(/\bmotionsites\b/g, 'axeslab');

  output = output.replace(/\bViktor\s+Odainyi\b/gi, 'Zainaxes');
  output = output.replace(/\bViktor\s+Oddy\b/gi, 'Zainaxes');
  output = output.replace(/viktoroddy@gmail\.com/gi, 'contact@zainaxes.com');

  output = output.replace(
    /https?:\/\/(www\.)?(instagram\.com|x\.com|twitter\.com|youtube\.com)\/(@?viktoroddy|@?motionsites[a-z0-9_]*)/gi,
    'https://instagram.com/zainaxes'
  );
  output = output.replace(/@viktoroddy\b/gi, '@zainaxes');
  output = output.replace(/@motionsites\b/gi, '@zainaxes');

  output = output.replace(
    /https?:\/\/(www\.)?(motionsites\.ai|viktoroddy\.com)(\/[a-zA-Z0-9-_\/]*)?/gi,
    'https://zainaxes.com'
  );

  return output;
}

// Determine route_collection per Section 4
function determineRouteCollection(category, title) {
  const cat = (category || '').toLowerCase();
  const tit = (title || '').toLowerCase();

  if (cat.includes('background') || tit.includes('background') || tit.includes('ambient') || tit.includes('waves background')) {
    return 'backgrounds';
  }
  if (cat.includes('3d') || tit.includes('3d') || cat.includes('spline') || cat.includes('three.js') || cat.includes('webgl')) {
    return '3d-websites';
  }
  if (
    cat.includes('section') || cat.includes('footer') || cat.includes('features') ||
    cat.includes('pricing') || cat.includes('cta') || cat.includes('bento') ||
    cat.includes('card') || cat.includes('testimonial') || cat.includes('faq') ||
    cat.includes('marquee') || cat.includes('accordion') || cat.includes('tabs') ||
    cat.includes('login') || cat.includes('component') || cat.includes('button') ||
    cat.includes('navigation') || cat.includes('about') || cat.includes('404')
  ) {
    return 'sections';
  }
  if (
    cat.includes('app') || cat.includes('mobile') || cat.includes('dashboard') ||
    cat.includes('assistant') || tit.includes('dashboard') || tit.includes('assistant app')
  ) {
    return 'apps';
  }
  if (cat.includes('template') || tit.includes('template') || tit.includes('starter')) {
    return 'templates';
  }
  return 'prompts';
}

// Generate realistic deterministic like count
function getLikes(slug) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 180) + 24;
}

// High-fidelity fallback ambient loops by category
const CATEGORY_LOOPS = {
  '3d-websites': 'https://meez.design/web/prompt-previews/prompt-media/2ea8993c4cac1424.mp4',
  'backgrounds': 'https://meez.design/web/prompt-previews/prompt-media/cee13c8739283f5b.mp4',
  'sections': 'https://meez.design/web/prompt-previews/prompt-media/e4a7257d3dce3be7.mp4',
  'apps': 'https://meez.design/web/prompt-previews/prompt-media/fa97d3b4e3afa702.mp4',
  'prompts': 'https://meez.design/web/prompt-previews/prompt-media/7d9ebbbaf8e0e081.mp4',
};

// Fallback posters by collection
const CATEGORY_POSTERS = {
  '3d-websites': 'https://meez.design/web/prompt-previews/prompt-media/a0068929de407c71.jpg',
  'backgrounds': 'https://meez.design/web/prompt-previews/prompt-media/fe4d485830d9c0e7.jpg',
  'sections': 'https://meez.design/web/prompt-previews/prompt-media/b9debafa3356cae5.jpg',
  'apps': 'https://meez.design/web/prompt-previews/prompt-media/30e50bca08bd32ee-c.jpg',
  'prompts': 'https://meez.design/web/prompt-previews/prompt-media/685b827bb6e32ba9-c.jpg',
};

const rows = db.prepare("SELECT * FROM resources WHERE primary_category_id = 'cat_webdesign'").all();
console.log(`Processing ${rows.length} web design resources from database...`);

const dataDir = path.resolve(process.cwd(), 'data');
const promptsDir = path.join(dataDir, 'prompts');
const categoriesDir = path.join(dataDir, 'categories');

fs.mkdirSync(promptsDir, { recursive: true });
fs.mkdirSync(categoriesDir, { recursive: true });

const catalogRecords = [];
const categoryStats = new Map();

for (const r of rows) {
  let meta = {};
  try { meta = JSON.parse(r.metadata_json); } catch {}

  const catName = meta.categoryName || 'General';
  const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'general';

  // Tally category
  categoryStats.set(catName, (categoryStats.get(catName) || 0) + 1);

  const cleanOriginalPrompt = cleanPromptText(r.content_body);
  const promptAxesLab = surgicalBrandTransform(cleanOriginalPrompt);

  const collection = determineRouteCollection(catName, r.title);
  const normTitle = r.title.toLowerCase().replace(/[^a-z0-9]/g, '');

  let videoUrl = meta.custom_video_url || meta.effectUrl || meta.default_video_url || '';
  let posterUrl = meta.posterUrl || '';
  let animatedWebp = '';

  // Check if we have exact MotionSites Mux match
  if (msMap.has(normTitle)) {
    const ms = msMap.get(normTitle);
    if (ms.muxId) {
      videoUrl = `https://stream.mux.com/${ms.muxId}.m3u8`;
      posterUrl = `https://image.mux.com/${ms.muxId}/thumbnail.webp?width=1200&time=2`;
      animatedWebp = `https://image.mux.com/${ms.muxId}/animated.webp?width=640&fps=15`;
    } else {
      if (ms.image && ms.image.startsWith('http')) animatedWebp = ms.image;
      if (ms.poster && ms.poster.startsWith('http')) posterUrl = ms.poster;
    }
  }

  // Ensure every item has a working video & poster preview
  if (!videoUrl && animatedWebp) {
    videoUrl = animatedWebp;
  }
  if (!videoUrl) {
    videoUrl = CATEGORY_LOOPS[collection] || CATEGORY_LOOPS['prompts'];
  }
  if (!posterUrl) {
    posterUrl = CATEGORY_POSTERS[collection] || CATEGORY_POSTERS['prompts'];
  }

  const record = {
    id: r.id,
    slug: r.slug,
    title: r.title,
    route_collection: collection,
    category: catName,
    categorySlug: catSlug,
    subcategories: [catName, collection],
    type: collection === 'sections' ? 'section' : collection === 'backgrounds' ? 'background' : collection === '3d-websites' ? '3d' : 'landing',
    page_type: collection === 'sections' ? 'component' : collection === 'backgrounds' ? 'background' : 'full',
    likes_count: getLikes(r.slug),
    is_free: true,
    preview_video_url: videoUrl,
    preview_poster_url: posterUrl,
    animated_webp_url: animatedWebp || undefined,
    summary: r.summary || `${r.title} — ${catName} prompt with visual preview and clean code specification.`,
    chars: promptAxesLab.length,
    tier: meta.tier || 'free',
    raw_prompt_original: cleanOriginalPrompt,
    prompt_axes_lab: promptAxesLab,
    created_at: r.created_at || new Date().toISOString()
  };

  catalogRecords.push(record);

  // 1. Write individual prompt file to data/prompts/<slug>.md
  const promptMd = `---
id: "${record.id}"
slug: "${record.slug}"
title: "${record.title.replace(/"/g, '\\"')}"
category: "${record.category.replace(/"/g, '\\"')}"
categorySlug: "${record.categorySlug}"
collection: "${record.route_collection}"
likes: ${record.likes_count}
tier: "free"
chars: ${record.chars}
preview_video: "${record.preview_video_url}"
preview_poster: "${record.preview_poster_url}"
---

# ${record.title} (${record.category})

${record.prompt_axes_lab}
`;

  fs.writeFileSync(path.join(promptsDir, `${record.slug}.md`), promptMd, 'utf8');

  // 2. Also write into data/categories/<categorySlug>/<slug>.md
  const catFolder = path.join(categoriesDir, catSlug);
  fs.mkdirSync(catFolder, { recursive: true });
  fs.writeFileSync(path.join(catFolder, `${record.slug}.md`), promptMd, 'utf8');
}

// 3. Write data/catalog.json
fs.writeFileSync(path.join(dataDir, 'catalog.json'), JSON.stringify(catalogRecords, null, 2), 'utf8');
console.log(`Saved ${catalogRecords.length} records to data/catalog.json`);

// 4. Also generate category index summaries
const sortedCategories = Array.from(categoryStats.entries())
  .sort((a, b) => b[1] - a[1])
  .map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'general',
    count
  }));

fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(sortedCategories, null, 2), 'utf8');
console.log(`Categorized into ${sortedCategories.length} distinct categories.`);

// 5. Update src/lib/generated-prompts.json to stay 100% in sync
const updatedGeneratedPrompts = catalogRecords.map(rec => ({
  id: rec.id,
  title: rec.title,
  slug: rec.slug,
  summary: rec.summary,
  content_body: rec.prompt_axes_lab,
  primary_category_id: 'cat_webdesign',
  category_name: rec.category,
  category_slug: rec.categorySlug,
  metadata_json: JSON.stringify({
    categoryName: rec.category,
    tier: rec.tier,
    chars: rec.chars,
    custom_video_url: rec.preview_video_url,
    posterUrl: rec.preview_poster_url,
    animatedWebpUrl: rec.animated_webp_url,
    route_collection: rec.route_collection
  })
}));

fs.writeFileSync(
  path.resolve(process.cwd(), 'src/lib/generated-prompts.json'),
  JSON.stringify(updatedGeneratedPrompts, null, 2),
  'utf8'
);
console.log(`Updated src/lib/generated-prompts.json with all ${updatedGeneratedPrompts.length} prompts.`);
