const fs = require('fs');
const meezFree = JSON.parse(fs.readFileSync('meez_free_extracted.json', 'utf8'));

console.log('Reading Library prompt:');
console.log(meezFree['reading-library'] ? meezFree['reading-library'].slice(0, 500) : 'none');

console.log('\nProjects Catalog prompt:');
console.log(meezFree['projects-catalog'] ? meezFree['projects-catalog'].slice(0, 500) : 'none');
