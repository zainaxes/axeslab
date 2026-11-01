const fs = require('fs');

const catalog = JSON.parse(fs.readFileSync('data/catalog.json', 'utf8'));
const meez = JSON.parse(fs.readFileSync('meez_catalog_extracted.json', 'utf8'));
const meezItems = Array.isArray(meez) ? meez : Object.values(meez);

const hey = fs.existsSync('extracted_prompts_initial.json') 
  ? JSON.parse(fs.readFileSync('extracted_prompts_initial.json', 'utf8')).items || []
  : [];

// Map meez items by normalized slug/title
const meezMap = new Map();
meezItems.forEach(item => {
  const normSlug = item.id.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  meezMap.set(normSlug, item);
  meezMap.set(normTitle, item);
});

// Map hey items by normalized slug/title
const heyMap = new Map();
hey.forEach(item => {
  const normSlug = item.id.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  heyMap.set(normSlug, item);
  heyMap.set(normTitle, item);
});

let matchedExactVideo = 0;
let matchedExactPoster = 0;
let staticNoVideo = 0;

const videoDownloadList = [];
const posterDownloadList = [];

catalog.forEach(item => {
  const normSlug = item.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');

  const m = meezMap.get(normSlug) || meezMap.get(normTitle);
  const h = heyMap.get(normSlug) || heyMap.get(normTitle);

  let exactVideoUrl = null;
  let exactPosterUrl = null;

  // Check Meez exact video (.mp4)
  if (m) {
    if (m.image && m.image.endsWith('.mp4')) exactVideoUrl = m.image;
    else if (m.video && m.video.endsWith('.mp4')) exactVideoUrl = m.video;

    if (m.poster) exactPosterUrl = m.poster;
    else if (m.image && (m.image.endsWith('.jpg') || m.image.endsWith('.png') || m.image.endsWith('.webp'))) exactPosterUrl = m.image;
  }

  // Check HeyDesign exact video (.mp4)
  if (!exactVideoUrl && h && h.effectUrl && h.effectUrl.endsWith('.mp4')) {
    exactVideoUrl = h.effectUrl;
  }
  if (!exactPosterUrl && h && h.posterUrl) {
    exactPosterUrl = h.posterUrl;
  }

  // Check if item in catalog already had a real meez.design/web/prompt-previews/prompt-media/<hash>.mp4
  if (!exactVideoUrl && item.raw_video && item.raw_video.includes('prompt-media') && item.raw_video.endsWith('.mp4')) {
    exactVideoUrl = item.raw_video;
  }

  if (exactVideoUrl) {
    matchedExactVideo++;
    // Normalize URL
    if (exactVideoUrl.startsWith('/')) exactVideoUrl = 'https://meez.design' + exactVideoUrl;
    videoDownloadList.push({ slug: item.slug, title: item.title, url: exactVideoUrl });
  } else {
    staticNoVideo++;
  }

  if (exactPosterUrl) {
    matchedExactPoster++;
    if (exactPosterUrl.startsWith('/')) exactPosterUrl = 'https://meez.design' + exactPosterUrl;
    posterDownloadList.push({ slug: item.slug, title: item.title, url: exactPosterUrl });
  }
});

console.log('=== Media Source Match Results ===');
console.log('Total catalog prompts:', catalog.length);
console.log('Prompts with EXACT matching .mp4 video:', matchedExactVideo);
console.log('Prompts that are STATIC UI designs (no video exists, only poster):', staticNoVideo);
console.log('Prompts with EXACT matching poster image:', matchedExactPoster);
console.log('\nSample video download targets:');
console.log(videoDownloadList.slice(0, 5));
console.log('\nSample poster download targets:');
console.log(posterDownloadList.slice(0, 5));
