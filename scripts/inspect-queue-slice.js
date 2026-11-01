const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('data/catalog.json', 'utf8'));

// Print items 80 to 120
for (let i = 80; i < 110 && i < catalog.length; i++) {
  console.log(`[${i}] ${catalog[i].slug} - video: ${catalog[i].preview_video_url?.slice(0, 50)} - poster: ${catalog[i].preview_poster_url?.slice(0, 50)}`);
}
