const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/axes_lab.db');

const rows = db.prepare("SELECT id, title, slug, metadata_json FROM resources WHERE primary_category_id = 'cat_webdesign'").all();
console.log('Total webdesign rows in db:', rows.length);

let withEffectUrl = 0;
let withCustomVideo = 0;
let withPosterUrl = 0;
let meezDesignCount = 0;
let heydesignCount = 0;
let muxCount = 0;
let otherCount = 0;

const sampleMeez = [];
const sampleHey = [];
const sampleMux = [];

rows.forEach(r => {
  let meta = {};
  try { meta = JSON.parse(r.metadata_json); } catch {}
  const v = meta.custom_video_url || meta.effectUrl || meta.default_video_url || '';
  const p = meta.posterUrl || '';

  if (meta.effectUrl) withEffectUrl++;
  if (meta.custom_video_url) withCustomVideo++;
  if (meta.posterUrl) withPosterUrl++;

  if (v.includes('meez.design')) {
    meezDesignCount++;
    if (sampleMeez.length < 5) sampleMeez.push({ title: r.title, video: v, poster: p });
  } else if (v.includes('heydesign.ai')) {
    heydesignCount++;
    if (sampleHey.length < 5) sampleHey.push({ title: r.title, video: v, poster: p });
  } else if (v.includes('mux.com')) {
    muxCount++;
    if (sampleMux.length < 5) sampleMux.push({ title: r.title, video: v, poster: p });
  } else if (v) {
    otherCount++;
  }
});

console.log('With effectUrl in metadata:', withEffectUrl);
console.log('With custom_video_url in metadata:', withCustomVideo);
console.log('With posterUrl in metadata:', withPosterUrl);
console.log('\nMeez videos count:', meezDesignCount);
console.log('Heydesign videos count:', heydesignCount);
console.log('Mux videos count:', muxCount);
console.log('Other videos count:', otherCount);

console.log('\nSample Meez items:', sampleMeez);
console.log('\nSample Heydesign items:', sampleHey);
console.log('\nSample Mux items:', sampleMux);
