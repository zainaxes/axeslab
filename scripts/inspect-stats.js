const fs = require('fs');

const extracted = JSON.parse(fs.readFileSync('./extracted_prompts_initial.json', 'utf8'));
const free = JSON.parse(fs.readFileSync('./free_prompts_detailed.json', 'utf8'));

console.log('Total items in catalogue:', extracted.items.length);
console.log('Total free items with full promptText:', free.length);

const categories = [...new Set(extracted.items.map(i => i.category))];
console.log('Unique categories count in items:', categories.length);

const freeSlugs = new Set(free.map(f => f.id));
console.log('Sample free slugs:', [...freeSlugs].slice(0, 5));
