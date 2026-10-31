const fs = require('fs');

const extracted = JSON.parse(fs.readFileSync('./extracted_prompts_initial.json', 'utf8'));
const free = JSON.parse(fs.readFileSync('./free_prompts_detailed.json', 'utf8'));

console.log('Categories count:', extracted.categories ? extracted.categories.length : 0);
if (extracted.categories) {
  console.log('Sample categories:', extracted.categories.slice(0, 10));
}

let mentions = [];
for (const f of free) {
  const p = f.promptText || '';
  const m1 = p.match(/https?:\/\/[^\s\)\"\'>]+/g) || [];
  const m2 = p.match(/(?:twitter|github|heydesign|discord|linkedin|instagram)[^\s\)\"\'>]*/gi) || [];
  mentions.push(...m1, ...m2);
}
console.log('Mentions found in free prompts:', [...new Set(mentions)]);
