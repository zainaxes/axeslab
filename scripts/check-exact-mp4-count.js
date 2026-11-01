const fs = require('fs');

const data = JSON.parse(fs.readFileSync('meez_catalog_extracted.json', 'utf8'));
const items = Array.isArray(data) ? data : Object.values(data);

console.log('Total items in meez_catalog_extracted:', items.length);

let mp4Count = 0;
let jpgCount = 0;
const sampleMp4s = [];

items.forEach(item => {
  const video = item.image && item.image.endsWith('.mp4') ? item.image : (item.video && item.video.endsWith('.mp4') ? item.video : null);
  const poster = item.poster;
  if (video) {
    mp4Count++;
    if (sampleMp4s.length < 10) sampleMp4s.push({ id: item.id, title: item.title, video, poster });
  }
  if (poster) jpgCount++;
});

console.log('Items with exact .mp4 video:', mp4Count);
console.log('Items with exact poster:', jpgCount);
console.log('\nSample MP4 mappings:');
console.log(sampleMp4s);
