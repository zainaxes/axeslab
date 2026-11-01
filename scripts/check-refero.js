const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('data/axes_lab.db');
const rows = db.prepare("SELECT slug, metadata_json FROM resources WHERE metadata_json LIKE '%refero%'").all();
console.log('Rows with refero in metadata:', rows.length);
if (rows.length > 0) {
  console.log('Sample row with refero:', rows[0].slug, rows[0].metadata_json);
}
