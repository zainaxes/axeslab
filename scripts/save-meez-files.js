const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('temp_meez_catalog.json', 'utf8'));
const free = JSON.parse(fs.readFileSync('temp_meez_free.json', 'utf8'));

fs.writeFileSync('meez_catalog_extracted.json', JSON.stringify(catalog, null, 2), 'utf8');
fs.writeFileSync('meez_free_extracted.json', JSON.stringify(free, null, 2), 'utf8');
console.log('Saved meez_catalog_extracted.json and meez_free_extracted.json');
