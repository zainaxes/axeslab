const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/axes_lab.db');
const totalRes = db.prepare('SELECT COUNT(*) as c FROM resources').get();
const wdRes = db.prepare("SELECT COUNT(*) as c FROM resources WHERE primary_category_id = 'cat_webdesign'").get();
const subCats = db.prepare("SELECT COUNT(*) as c FROM categories WHERE parent_id = 'cat_webdesign'").get();
console.log('Total resources in db:', totalRes.c);
console.log('Total Web Design resources:', wdRes.c);
console.log('Total Web Design subcategories:', subCats.c);
