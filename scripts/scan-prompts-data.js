const fs = require('fs');

const data = fs.readFileSync('assets_prompts.js', 'utf8');

// Look for items array with title, category, preview
const matches = data.match(/title:[^,]+,[^}]+/g);
console.log('Matches count:', matches ? matches.length : 0);
if (matches) {
  console.log('Sample item:', matches[0]);
}

// Find strings in file
const titles = data.match(/title:`[^`]+`/g);
console.log('Title backticks:', titles ? titles.slice(0, 10) : 0);

const categories = data.match(/category:`[^`]+`/g);
console.log('Category backticks:', categories ? [...new Set(categories)] : 0);
