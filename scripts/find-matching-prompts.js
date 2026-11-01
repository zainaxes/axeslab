const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/axes_lab.db');

const rows = db.prepare(`
  SELECT r.id, r.slug, r.title, r.summary, r.description, r.content_body, c.name as category_name
  FROM resources r
  LEFT JOIN categories c ON r.subcategory_id = c.id
`).all();

const terms = ['directory', 'library', 'resource', 'catalog', 'hub', 'curated', 'toolkit', 'dev tool', 'showcase', 'repo'];

const matches = [];
for (const r of rows) {
  const text = (r.title + ' ' + (r.category_name || '') + ' ' + r.summary + ' ' + (r.description || '')).toLowerCase();
  for (const t of terms) {
    if (text.includes(t)) {
      matches.push({
        slug: r.slug,
        title: r.title,
        category: r.category_name,
        matchedTerm: t,
        summary: r.summary
      });
      break;
    }
  }
}

console.log('Total matches:', matches.length);
console.log('Sample top matches:');
matches.slice(0, 25).forEach(m => {
  console.log(`- [${m.slug}] "${m.title}" (${m.category}) - matched "${m.matchedTerm}"`);
});
