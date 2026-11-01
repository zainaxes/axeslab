const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const catalogPath = path.resolve(process.cwd(), 'data/catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const meez = JSON.parse(fs.readFileSync('meez_catalog_extracted.json', 'utf8'));
const meezItems = Array.isArray(meez) ? meez : Object.values(meez);

const hey = fs.existsSync('extracted_prompts_initial.json') 
  ? JSON.parse(fs.readFileSync('extracted_prompts_initial.json', 'utf8')).items || []
  : [];

// Map meez items by normalized slug and title
const meezMap = new Map();
meezItems.forEach(item => {
  if (item.id) meezMap.set(item.id.toLowerCase().replace(/[^a-z0-9]/g, ''), item);
  if (item.title) meezMap.set(item.title.toLowerCase().replace(/[^a-z0-9]/g, ''), item);
});

// Map hey items
const heyMap = new Map();
hey.forEach(item => {
  if (item.id) heyMap.set(item.id.toLowerCase().replace(/[^a-z0-9]/g, ''), item);
  if (item.title) heyMap.set(item.title.toLowerCase().replace(/[^a-z0-9]/g, ''), item);
});

const videosDir = path.resolve(process.cwd(), 'public/media/videos');
const postersDir = path.resolve(process.cwd(), 'public/media/posters');

fs.mkdirSync(videosDir, { recursive: true });
fs.mkdirSync(postersDir, { recursive: true });

const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 8, timeout: 15000 });
const httpAgent = new http.Agent({ keepAlive: true, maxSockets: 8, timeout: 15000 });

function downloadFile(url, destPath) {
  return new Promise((resolve) => {
    if (!url || !url.startsWith('http') || url.includes('/refero/')) {
      return resolve(false);
    }

    // Skip if already downloaded and valid size (> 1KB)
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1024) {
      return resolve(true);
    }

    const client = url.startsWith('https') ? https : http;
    const agent = url.startsWith('https') ? httpsAgent : httpAgent;

    let hasEnded = false;
    function finish(result) {
      if (hasEnded) return;
      hasEnded = true;
      resolve(result);
    }

    const req = client.get(url, { agent, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      // Follow redirect
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsed = new URL(url);
          redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
        }
        res.resume();
        return downloadFile(redirectUrl, destPath).then(finish);
      }

      // If 404 or any non-200, bail immediately and drain socket
      if (res.statusCode !== 200) {
        res.on('data', () => {});
        res.on('end', () => finish(false));
        res.resume();
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1024) {
            finish(true);
          } else {
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            finish(false);
          }
        });
      });

      fileStream.on('error', () => {
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        finish(false);
      });
    });

    req.on('error', () => finish(false));

    req.setTimeout(12000, () => {
      req.destroy();
      finish(false);
    });
  });
}

// Queue runner with concurrency limit
async function runWithConcurrency(tasks, limit = 8) {
  let index = 0;
  let active = 0;
  let completed = 0;

  return new Promise((resolve) => {
    function next() {
      if (completed >= tasks.length) return resolve();

      while (active < limit && index < tasks.length) {
        const taskIdx = index++;
        active++;
        tasks[taskIdx]()
          .catch(() => {})
          .finally(() => {
            active--;
            completed++;
            if (completed % 25 === 0 || completed === tasks.length) {
              console.log(`[Batch Progress] ${completed}/${tasks.length} media downloads completed...`);
            }
            next();
          });
      }
    }
    next();
  });
}

async function start() {
  console.log(`Analyzing exact media for ${catalog.length} catalog items...`);

  const downloadQueue = [];

  for (const item of catalog) {
    const normSlug = item.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');

    const m = meezMap.get(normSlug) || meezMap.get(normTitle);
    const h = heyMap.get(normSlug) || heyMap.get(normTitle);

    let rawVideoUrl = null;
    let rawPosterUrl = null;

    if (m) {
      if (m.image && m.image.endsWith('.mp4')) rawVideoUrl = m.image;
      else if (m.video && m.video.endsWith('.mp4')) rawVideoUrl = m.video;

      if (m.poster) rawPosterUrl = m.poster;
      else if (m.image && (m.image.endsWith('.jpg') || m.image.endsWith('.png') || m.image.endsWith('.webp'))) rawPosterUrl = m.image;
    }

    if (!rawVideoUrl && h && h.effectUrl && h.effectUrl.endsWith('.mp4')) {
      rawVideoUrl = h.effectUrl;
    }
    if (!rawPosterUrl && h && h.posterUrl) {
      rawPosterUrl = h.posterUrl;
    }

    // Check if raw prompt-media link from meez
    const genericHashes = ['2ea8993c4cac1424', 'cee13c8739283f5b', 'e4a7257d3dce3be7', 'fa97d3b4e3afa702', '7d9ebbbaf8e0e081'];
    if (!rawVideoUrl && item.preview_video_url && item.preview_video_url.includes('prompt-media') && item.preview_video_url.endsWith('.mp4')) {
      const isGeneric = genericHashes.some(g => item.preview_video_url.includes(g));
      if (!isGeneric && !item.preview_video_url.includes('/refero/')) {
        rawVideoUrl = item.preview_video_url;
      }
    }

    if (!rawPosterUrl && item.preview_poster_url && item.preview_poster_url.includes('prompt-media') && !item.preview_poster_url.includes('/refero/')) {
      rawPosterUrl = item.preview_poster_url;
    }

    // Normalize URLs
    if (rawVideoUrl && rawVideoUrl.startsWith('/')) rawVideoUrl = 'https://meez.design' + rawVideoUrl;
    if (rawPosterUrl && rawPosterUrl.startsWith('/')) rawPosterUrl = 'https://meez.design' + rawPosterUrl;

    // EXACT Video Download
    if (rawVideoUrl && !rawVideoUrl.includes('/refero/')) {
      const localVideoFile = path.join(videosDir, `${item.slug}.mp4`);
      downloadQueue.push(async () => {
        await downloadFile(rawVideoUrl, localVideoFile);
      });
    }

    // EXACT Poster Download
    if (rawPosterUrl && !rawPosterUrl.includes('/refero/')) {
      const ext = rawPosterUrl.includes('.png') ? '.png' : rawPosterUrl.includes('.webp') ? '.webp' : '.jpg';
      const localPosterFile = path.join(postersDir, `${item.slug}${ext}`);
      downloadQueue.push(async () => {
        await downloadFile(rawPosterUrl, localPosterFile);
      });
    }
  }

  console.log(`Starting queue with ${downloadQueue.length} files to download (concurrency: 8)...`);
  await runWithConcurrency(downloadQueue, 8);
  console.log('Download queue completed!');

  // Now scan disk and accurately assign local URLs
  for (const item of catalog) {
    const videoFile = path.join(videosDir, `${item.slug}.mp4`);
    if (fs.existsSync(videoFile) && fs.statSync(videoFile).size > 1024) {
      item.preview_video_url = `/media/videos/${item.slug}.mp4`;
    } else {
      // STRICT: NO alternate video!
      item.preview_video_url = null;
    }

    let foundPoster = null;
    for (const ext of ['.jpg', '.webp', '.png']) {
      const pFile = path.join(postersDir, `${item.slug}${ext}`);
      if (fs.existsSync(pFile) && fs.statSync(pFile).size > 1024) {
        foundPoster = `/media/posters/${item.slug}${ext}`;
        break;
      }
    }
    if (foundPoster) {
      item.preview_poster_url = foundPoster;
    }
  }

  const localVideosCount = catalog.filter(i => i.preview_video_url && i.preview_video_url.startsWith('/media/videos/')).length;
  const localPostersCount = catalog.filter(i => i.preview_poster_url && i.preview_poster_url.startsWith('/media/posters/')).length;
  const staticDesignsCount = catalog.filter(i => !i.preview_video_url).length;

  console.log('\n=== DOWNLOAD VERIFICATION REPORT ===');
  console.log(`Verified Exact Local Videos on Disk: ${localVideosCount}`);
  console.log(`Verified Exact Local Posters on Disk: ${localPostersCount}`);
  console.log(`Clean Static UI Prompts (Zero Alternate Video): ${staticDesignsCount}`);

  // Save data/catalog.json
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');

  // Save src/lib/generated-prompts.json
  const updatedGenerated = catalog.map(rec => ({
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
      custom_video_url: rec.preview_video_url, // exact local /media/videos/<slug>.mp4 or null
      posterUrl: rec.preview_poster_url,       // exact local /media/posters/<slug>.<ext>
      route_collection: rec.route_collection
    })
  }));

  fs.writeFileSync(
    path.resolve(process.cwd(), 'src/lib/generated-prompts.json'),
    JSON.stringify(updatedGenerated, null, 2),
    'utf8'
  );

  // Update markdown files in data/prompts/ and data/categories/
  const promptsDir = path.resolve(process.cwd(), 'data/prompts');
  const categoriesDir = path.resolve(process.cwd(), 'data/categories');

  for (const record of catalog) {
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
preview_video: "${record.preview_video_url || ''}"
preview_poster: "${record.preview_poster_url || ''}"
---

# ${record.title} (${record.category})

${record.prompt_axes_lab}
`;

    fs.writeFileSync(path.join(promptsDir, `${record.slug}.md`), promptMd, 'utf8');
    const catFolder = path.join(categoriesDir, record.categorySlug);
    if (fs.existsSync(catFolder)) {
      fs.writeFileSync(path.join(catFolder, `${record.slug}.md`), promptMd, 'utf8');
    }
  }

  console.log('🎉 100% Synchronization Complete! All files, catalogs, and markdown assets updated.');
}

start();
