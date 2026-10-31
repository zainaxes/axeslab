const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/axes_lab.db');
const row = db.prepare("SELECT * FROM resources WHERE slug = 'orbis-nft-landing'").get();
console.log('Sample item title:', row.title);
console.log('Sample item author:', row.author_or_publisher);
console.log('Sample item canonical_url:', row.canonical_url);
console.log('Sample item metadata:', row.metadata_json);
console.log('Sample prompt head:', row.content_body.slice(0, 300));
