const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/axes_lab.db');
const row = db.prepare("SELECT * FROM resources WHERE slug = 'cargo-group'").get();
console.log('Sample free item title:', row.title);
console.log('Sample free item author:', row.author_or_publisher);
console.log('Sample free prompt head:', row.content_body.slice(0, 350));
console.log('Contains axeslab.zainaxes.com:', row.content_body.includes('axeslab.zainaxes.com'));
