const fs = require('fs');

const sec = fs.readFileSync('assets_sections.js', 'utf8');
const bg = fs.readFileSync('assets_backgrounds.js', 'utf8');

console.log('Sections imports/chunks:');
console.log(sec.match(/import[^;]+from['"][^'"]+['"]/g) || sec.match(/assets\/[a-zA-Z0-9_-]+\.js/g) || sec.slice(0, 300));

console.log('Backgrounds imports/chunks:');
console.log(bg.match(/import[^;]+from['"][^'"]+['"]/g) || bg.match(/assets\/[a-zA-Z0-9_-]+\.js/g) || bg.slice(0, 300));
