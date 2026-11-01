const fs = require('fs');

const meez = JSON.parse(fs.readFileSync('meez_catalog_extracted.json', 'utf8'));
const items = Array.isArray(meez) ? meez : Object.values(meez);

const videoTypes = new Map();
items.forEach(i => {
  const v = i.image || i.video || '';
  if (v.includes('.mp4')) {
    const prefix = v.split('/')[2] || 'root';
    videoTypes.set(prefix, (videoTypes.get(prefix) || 0) + 1);
  }
});

console.log('Video prefix distribution:', videoTypes);
