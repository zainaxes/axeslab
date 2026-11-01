const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/axes_lab.db');

const rows = db.prepare("SELECT title, content_body FROM resources WHERE primary_category_id = 'cat_webdesign' LIMIT 3").all();
rows.forEach((r, i) => {
  console.log(`\n================ Item ${i+1}: ${r.title} ================`);
  console.log('Length:', r.content_body.length);
  console.log('Start:\n', r.content_body.slice(0, 300));
  console.log('End:\n', r.content_body.slice(-200));
});
