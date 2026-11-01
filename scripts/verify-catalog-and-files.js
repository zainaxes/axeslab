const fs = require('fs');
const path = require('path');

const catalog = JSON.parse(fs.readFileSync('data/catalog.json', 'utf8'));
const categories = JSON.parse(fs.readFileSync('data/categories.json', 'utf8'));
const promptFiles = fs.readdirSync('data/prompts');
const catDirs = fs.readdirSync('data/categories');

console.log('--- Verification Summary ---');
console.log('catalog.json records:', catalog.length);
console.log('categories.json count:', categories.length);
console.log('data/prompts/ markdown files:', promptFiles.length);
console.log('data/categories/ category folders:', catDirs.length);

// Check 1: Empty prompt check
const emptyPrompts = catalog.filter(c => !c.prompt_axes_lab || c.prompt_axes_lab.length < 50);
console.log('Items with empty prompt:', emptyPrompts.length);

// Check 2: Branding check
let brandLeaks = 0;
promptFiles.forEach(f => {
  const content = fs.readFileSync(path.join('data/prompts', f), 'utf8');
  if (/motionsites|viktoroddy|viktor\s+odainyi/i.test(content)) {
    brandLeaks++;
  }
});
console.log('Brand leaks across all markdown files:', brandLeaks);

// Check 3: Previews check
const withoutVideo = catalog.filter(c => !c.preview_video_url);
const withoutPoster = catalog.filter(c => !c.preview_poster_url);
console.log('Items without video preview:', withoutVideo.length);
console.log('Items without poster preview:', withoutPoster.length);
