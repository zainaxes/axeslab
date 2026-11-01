const fs = require('fs');
const content = fs.readFileSync('assets_prompts.js', 'utf8');
const idx = content.indexOf('title:');
console.log(content.slice(Math.max(0, idx - 50), idx + 800));
