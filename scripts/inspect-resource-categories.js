const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/axes_lab.db');

const row = db.prepare("SELECT * FROM resources WHERE primary_category_id = 'cat_webdesign' LIMIT 5").all();
row.forEach((r, i) => {
  console.log(`\n=== WebDesign Resource ${i+1} ===`);
  console.log('ID:', r.id);
  console.log('Title:', r.title);
  console.log('Metadata:', r.metadata_json);
});

// Check if resource_categories exists
const rc = db.prepare("SELECT COUNT(*) as c FROM resource_categories").get();
console.log('\nresource_categories rows:', rc.c);

const rcSample = db.prepare("SELECT rc.*, c.name as cat_name FROM resource_categories rc JOIN categories c ON rc.category_id = c.id LIMIT 10").all();
console.log('resource_categories sample:', rcSample);
