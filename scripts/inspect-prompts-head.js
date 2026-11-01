const fs = require('fs');

const data = fs.readFileSync('assets_prompts.js', 'utf8');
console.log('Length of assets_prompts.js:', data.length);
console.log('Head 400 chars:', data.slice(0, 400));
