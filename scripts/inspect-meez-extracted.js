const fs = require('fs');

const cat = JSON.parse(fs.readFileSync('meez_catalog_extracted.json', 'utf8'));
const free = JSON.parse(fs.readFileSync('meez_free_extracted.json', 'utf8'));

console.log('meez_catalog_extracted keys/count:', Array.isArray(cat) ? cat.length : Object.keys(cat).length);
console.log('meez_free_extracted count:', free.length);

const catSample = Array.isArray(cat) ? cat[0] : Object.values(cat)[0];
console.log('\nCatalog sample:');
console.log(catSample);

console.log('\nFree sample:');
console.log(free[0]);

// Check how many have video or poster URLs
let catVideos = 0, catPosters = 0;
const catItems = Array.isArray(cat) ? cat : Object.values(cat);
catItems.forEach(i => {
  if (i.video || i.videoUrl || i.effectUrl) catVideos++;
  if (i.poster || i.posterUrl || i.image) catPosters++;
});
console.log(`Catalog: ${catVideos} videos, ${catPosters} posters`);

let freeVideos = 0, freePosters = 0;
free.forEach(i => {
  if (i.video || i.videoUrl || i.effectUrl) freeVideos++;
  if (i.poster || i.posterUrl || i.image) freePosters++;
});
console.log(`Free: ${freeVideos} videos, ${freePosters} posters`);
