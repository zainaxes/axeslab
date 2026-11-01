const fs = require('fs');

const promptsData = fs.readFileSync('assets_prompts.js', 'utf8');
const ourPrompts = JSON.parse(fs.readFileSync('src/lib/generated-prompts.json', 'utf8'));

// Extract items from assets_prompts.js
// Pattern: {id:`...`,title:`...`,image:`...`,poster:`...`,category:`...`...}
const regex = /\{id:`([^`]+)`,title:`([^`]+)`,image:([^,]+),poster:([^,]+),category:`([^`]+)`/g;

let match;
const motionsitesItems = [];
while ((match = regex.exec(promptsData)) !== null) {
  motionsitesItems.push({
    id: match[1],
    title: match[2],
    image: match[3],
    poster: match[4],
    category: match[5]
  });
}

console.log('Parsed MotionSites items count:', motionsitesItems.length);
console.log('Sample motionsites item:', motionsitesItems[0]);

// Check matches with ourPrompts
let matchedCount = 0;
motionsitesItems.forEach(ms => {
  const normTitle = ms.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const found = ourPrompts.find(p => p.title.toLowerCase().replace(/[^a-z0-9]/g, '') === normTitle);
  if (found) matchedCount++;
});
console.log(`Matched ${matchedCount} / ${motionsitesItems.length} items with our catalog!`);
