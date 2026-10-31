const fs = require('fs');

const freeObj = JSON.parse(fs.readFileSync('temp_meez_free.json', 'utf8'));
const mentions = [];

for (const [key, text] of Object.entries(freeObj)) {
  const m1 = text.match(/https?:\/\/[^\s\)\"\'>]+/g) || [];
  const m2 = text.match(/(?:twitter|github|meez|discord|linkedin|instagram)[^\s\)\"\'>]*/gi) || [];
  mentions.push(...m1, ...m2);
}

const uniqueMentions = [...new Set(mentions)];
console.log('Total unique mentions:', uniqueMentions.length);
console.log('Sample mentions:');
uniqueMentions.slice(0, 30).forEach(m => console.log(' - ' + m));
