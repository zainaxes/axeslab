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

function downloadFile(url, destPath, retries = 2) {
  return new Promise((resolve) => {
    if (!url || !url.startsWith('http')) return resolve(false);

    // Skip if already downloaded and valid size (> 1KB)
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1024) {
      return resolve(true);
    }

    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      // Follow redirect if needed
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsed = new URL(url);
          redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
        }
        return downloadFile(redirectUrl, destPath, retries).then(resolve);
      }

      if (res.statusCode !== 200) {
        res.resume();
        if (retries > 0) {
          setTimeout(() => downloadFile(url, destPath, retries - 1).then(resolve), 500);
        } else {
          resolve(false);
        }
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1024) {
            resolve(true);
          } else {
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            resolve(false);
          }
        });
      });

      fileStream.on('error', () => {
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        resolve(false);
      });
    });

    req.on('error', () => {
      if (retries > 0) {
        setTimeout(() => downloadFile(url, destPath, retries - 1).then(resolve), 500);
      } else {
        resolve(false);
      }
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(false);
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
              console.log(`Progress: ${completed}/${tasks.length} media downloads processed...`);
            }
            next();
          });
      }
    }
    next();
  });
}

async function start() {
  console.log(`Analyzing exact media for ${catalog.length} prompts...`);

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

    // Check if item had raw prompt-media link from meez
    if (!rawVideoUrl && item.preview_video_url && item.preview_video_url.includes('prompt-media') && item.preview_video_url.endsWith('.mp4')) {
      // Exclude generic loops (2ea8993c4cac1424, cee13c8739283f5b, e4a7257d3dce3be7, fa97d3b4e3afa702, 7d9ebbbaf8e0e081)
      const genericHashes = ['2ea8993c4cac1424', 'cee13c8739283f5b', 'e4a7257d3dce3be7', 'fa97d3b4e3afa702', '7d9ebbbaf8e0e081'];
      const hasGeneric = genericHashes.some(h => item.preview_video_url.includes(h));
      if (!hasGeneric) {
        rawVideoUrl = item.preview_video_url;
      }
    }

    if (!rawPosterUrl && item.preview_poster_url && item.preview_poster_url.includes('prompt-media')) {
      rawPosterUrl = item.preview_poster_url;
    }

    // Normalize URLs to full HTTPS
    if (rawVideoUrl && rawVideoUrl.startsWith('/')) rawVideoUrl = 'https://meez.design' + rawVideoUrl;
    if (rawPosterUrl && rawPosterUrl.startsWith('/')) rawPosterUrl = 'https://meez.design' + rawPosterUrl;

    // Queue video download if exact video exists
    if (rawVideoUrl) {
      item._download_video_url = rawVideoUrl;
      const localVideoFile = path.join(videosDir, `${item.slug}.mp4`);
      downloadQueue.push(async () => {
        const ok = await downloadFile(rawVideoUrl, localVideoFile);
        if (ok) {
          item.preview_video_url = `/media/videos/${item.slug}.mp4`;
        } else {
          item.preview_video_url = null; // NEVER use alternate video!
        }
      });
    } else {
      // NO alternate video!
      item.preview_video_url = null;
    }

    // Queue poster download if exact poster exists
    if (rawPosterUrl) {
      item._download_poster_url = rawPosterUrl;
      const ext = rawPosterUrl.includes('.png') ? '.png' : rawPosterUrl.includes('.webp') ? '.webp' : '.jpg';
      const localPosterFile = path.join(postersDir, `${item.slug}${ext}`);
      downloadQueue.push(async () => {
        const ok = await downloadFile(rawPosterUrl, localPosterFile);
        if (ok) {
          item.preview_poster_url = `/media/posters/${item.slug}${ext}`;
        }
      });
    }
  }

  console.log(`Starting ${downloadQueue.length} parallel downloads...`);
  await runWithConcurrency(downloadQueue, 8);
  console.log('All downloads completed!');

  // Clean helper temp fields before saving catalog
  catalog.forEach(item => {
    delete item._download_video_url;
    delete item._download_poster_url;
  });

  // Count final verified local videos and posters
  const localVideos = catalog.filter(i => i.preview_video_url && i.preview_video_url.startsWith('/media/videos/')).length;
  const localPosters = catalog.filter(i => i.preview_poster_url && i.preview_poster_url.startsWith('/media/posters/')).length;
  const staticDesigns = catalog.filter(i => !i.preview_video_url).length;

  console.log('=== Final Download & Verification Report ===');
  console.log(`Local Exact Videos Available: ${localVideos}`);
  console.log(`Local Exact Posters Available: ${localPosters}`);
  console.log(`Static UI Designs (Clean Poster, 0 Alternate Video): ${staticDesigns}`);

  // Write updated catalog.json
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');

  // Update src/lib/generated-prompts.json
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

  // Update markdown prompt files in data/prompts/ and data/categories/
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

  console.log('✅ All prompt files, catalogs, and categories updated with exact local media!');
}

start();
