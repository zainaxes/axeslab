const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/axes_lab.db');

const rows = db.prepare("SELECT metadata_json FROM resources WHERE primary_category_id = 'cat_webdesign'").all();
const catMap = new Map();

rows.forEach(r => {
  try {
    const meta = JSON.parse(r.metadata_json);
    const c = meta.categoryName || 'Uncategorized';
    catMap.set(c, (catMap.get(c) || 0) + 1);
  } catch {}
});

console.log('Total distinct categoryName count:', catMap.size);
const sorted = Array.from(catMap.entries()).sort((a, b) => b[1] - a[1]);
console.log('Categories (first 30):', sorted.slice(0, 30));
console.log('Total resources counted:', sorted.reduce((a, b) => a + b[1], 0));
