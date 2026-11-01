const fs = require('fs');
const data = JSON.parse(fs.readFileSync('meez_catalog_extracted.json', 'utf8'));
const items = Array.isArray(data) ? data : Object.values(data);

const withoutMp4 = items.filter(i => !(i.image && i.image.endsWith('.mp4')) && !(i.video && i.video.endsWith('.mp4')));
console.log('Items without mp4 in meez_catalog_extracted:', withoutMp4.length);
console.log('Sample 10 items without mp4:');
withoutMp4.slice(0, 10).forEach(x => {
  console.log(`- ${x.title} (${x.id}) [image: ${x.image}, poster: ${x.poster}]`);
});
