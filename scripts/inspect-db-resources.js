const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/axes_lab.db');

const count = db.prepare('SELECT COUNT(*) as count FROM resources').get();
console.log('Total resources in db:', count.count);

const sample = db.prepare('SELECT id, title, slug, summary, content_body, primary_category_id, metadata_json FROM resources LIMIT 3').all();
console.log('Sample rows:');
sample.forEach((row, idx) => {
  console.log(`\n--- Row ${idx + 1} ---`);
  console.log('ID:', row.id);
  console.log('Title:', row.title);
  console.log('Slug:', row.slug);
  console.log('Primary Cat:', row.primary_category_id);
  console.log('Summary:', row.summary?.slice(0, 100));
  console.log('Content Body Length:', row.content_body?.length);
  console.log('Metadata:', row.metadata_json?.slice(0, 200));
});

// Check distinct categories
const cats = db.prepare(`
  SELECT c.name, c.slug, COUNT(r.id) as res_count 
  FROM categories c 
  LEFT JOIN resources r ON r.primary_category_id = c.id 
  GROUP BY c.id 
  ORDER BY res_count DESC 
  LIMIT 25
`).all();
console.log('\nTop 25 Categories:', cats);
