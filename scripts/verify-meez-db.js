const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/axes_lab.db');
const total = db.prepare('SELECT count(*) as c FROM resources').get();
const prompts = db.prepare("SELECT count(*) as c FROM resources WHERE resource_type = 'prompt'").get();
const webDesign = db.prepare("SELECT count(*) as c FROM resources WHERE primary_category_id = 'cat_webdesign'").get();
const cats = db.prepare('SELECT count(*) as c FROM categories').get();
console.log('Total resources:', total.c);
console.log('Total prompts:', prompts.c);
console.log('Total Web Design resources:', webDesign.c);
console.log('Total categories:', cats.c);

const mappings = JSON.parse(require('fs').readFileSync('./data/video_mappings.json', 'utf8'));
console.log('Total video mappings registered:', Object.keys(mappings).length);
