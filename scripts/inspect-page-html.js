const fs = require('fs');
const html = fs.readFileSync('temp_meez_page.html', 'utf8');

const srcMatches = html.match(/src=["']([^"']+)["']/gi) || [];
console.log('src attributes:', srcMatches);

// Look for where prompt is loaded
const promptMatches = html.match(/.{0,50}prompt.{0,50}/gi) || [];
console.log('prompt mentions sample:', promptMatches.slice(0, 10));
