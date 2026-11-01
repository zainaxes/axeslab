const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');

const db = new DatabaseSync('./data/axes_lab.db');

const rows = db.prepare('SELECT id, title, slug, content_body, summary, metadata_json FROM resources').all();

let motionSitesCount = 0;
let viktorCount = 0;
let oddyCount = 0;

rows.forEach(r => {
  const allText = `${r.title} ${r.slug} ${r.summary} ${r.content_body} ${r.metadata_json}`;
  if (/motionsites/i.test(allText)) motionSitesCount++;
  if (/viktor\s+odainyi/i.test(allText)) viktorCount++;
  if (/viktoroddy/i.test(allText)) oddyCount++;
});

console.log('--- Database axes_lab.db check ---');
console.log('MotionSites matches:', motionSitesCount);
console.log('Viktor Odainyi matches:', viktorCount);
console.log('viktoroddy matches:', oddyCount);

if (fs.existsSync('src/lib/generated-prompts.json')) {
  const jsonContent = fs.readFileSync('src/lib/generated-prompts.json', 'utf8');
  console.log('\n--- generated-prompts.json check ---');
  console.log('motionsites matches:', (jsonContent.match(/motionsites/gi) || []).length);
  console.log('viktor odainyi matches:', (jsonContent.match(/viktor\s+odainyi/gi) || []).length);
  console.log('viktoroddy matches:', (jsonContent.match(/viktoroddy/gi) || []).length);
}
