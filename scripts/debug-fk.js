const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const db = new DatabaseSync('./data/axes_lab.db');
const catalog = require('../meez_catalog_extracted.json');

const uniqueCategories = [...new Set(catalog.map(i => (i.category || "General").trim()))];
let missingCount = 0;
for (const catName of uniqueCategories) {
  const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const subId = `sub_cat_${slug.replace(/-/g, "_")}`;
  const row = db.prepare('SELECT id FROM categories WHERE id = ?').get(subId);
  if (!row) {
    missingCount++;
    console.log('Missing category row for subId:', subId, 'catName:', catName, 'slug:', slug);
  }
}
console.log('Total missing subcategories:', missingCount);

const srcRow = db.prepare('SELECT id FROM sources WHERE id = ?').get('src_axeslab_prompts');
console.log('Source row exists:', !!srcRow);
const primaryCat = db.prepare('SELECT id FROM categories WHERE id = ?').get('cat_webdesign');
console.log('cat_webdesign exists:', !!primaryCat);
