const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const db = new DatabaseSync('./data/axes_lab.db');

const rows = db.prepare("SELECT id, title, slug, metadata_json FROM resources WHERE primary_category_id = 'cat_webdesign'").all();

const withoutVideo = [];
rows.forEach(r => {
  let meta = {};
  try { meta = JSON.parse(r.metadata_json); } catch {}
  if (!meta.effectUrl && !meta.custom_video_url) {
    withoutVideo.push({ id: r.id, title: r.title, slug: r.slug, meta });
  }
});

console.log('Count of items without video:', withoutVideo.length);
console.log('Sample 10 items without video:');
withoutVideo.slice(0, 10).forEach(x => console.log(`- ${x.title} (${x.slug}) [category: ${x.meta.categoryName}, mediaKind: ${x.meta.mediaKind}, posterUrl: ${x.meta.posterUrl ? 'yes' : 'no'}]`));
