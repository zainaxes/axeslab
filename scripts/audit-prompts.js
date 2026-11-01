const fs = require('fs');
const path = require('path');

console.log('=== AUDITING ENTIRE CATALOG & GENERATED PROMPTS ===');

const catalog = JSON.parse(fs.readFileSync('data/catalog.json', 'utf8'));
const genPrompts = JSON.parse(fs.readFileSync('src/lib/generated-prompts.json', 'utf8'));

console.log(`Checking ${catalog.length} catalog items and ${genPrompts.length} app items...`);

let forbidden1 = 0; // "Recreate this exact high-converting"
let forbidden2 = 0; // "TECH / STACK SPECIFICATION"
let forbidden3 = 0; // "subheadline = \"<!doctype html>"
let forbidden4 = 0; // "Explore with Axes Lab"
let shortCount = 0; // length < 1000

let minLen = Infinity;
let maxLen = 0;
let totalLen = 0;

catalog.forEach((item, idx) => {
  const p = item.prompt_axes_lab || '';
  if (p.includes('Recreate this exact high-converting')) forbidden1++;
  if (p.includes('TECH / STACK SPECIFICATION')) forbidden2++;
  if (p.includes('subheadline = "<!doctype html>')) forbidden3++;
  if (p.includes('Explore with Axes Lab')) forbidden4++;
  if (p.length < 1000) {
    shortCount++;
    console.log(`[SHORT] Item ${item.slug} (${item.title}): ${p.length} chars`);
  }

  minLen = Math.min(minLen, p.length);
  maxLen = Math.max(maxLen, p.length);
  totalLen += p.length;
});

console.log('\n--- AUDIT RESULTS FOR data/catalog.json ---');
console.log(`"Recreate this exact high-converting" occurrences: ${forbidden1}`);
console.log(`"TECH / STACK SPECIFICATION" occurrences: ${forbidden2}`);
console.log(`"subheadline = <!doctype html>" occurrences: ${forbidden3}`);
console.log(`"Explore with Axes Lab" occurrences: ${forbidden4}`);
console.log(`Short prompts (< 1000 chars): ${shortCount}`);
console.log(`Minimum prompt length: ${minLen} characters`);
console.log(`Maximum prompt length: ${maxLen} characters`);
console.log(`Average prompt length: ${Math.round(totalLen / catalog.length)} characters`);

// Check markdown files on disk
const mdFiles = fs.readdirSync('data/prompts');
console.log(`\nMarkdown prompt files on disk: ${mdFiles.length}`);

// Check duplicates
const seenSlugs = new Set();
const duplicateSlugs = [];
catalog.forEach(item => {
  if (seenSlugs.has(item.slug)) duplicateSlugs.push(item.slug);
  seenSlugs.add(item.slug);
});
console.log(`Duplicate slugs in catalog: ${duplicateSlugs.length} ${duplicateSlugs.join(', ')}`);

const seenTitles = new Set();
const duplicateTitles = [];
catalog.forEach(item => {
  const t = item.title.toLowerCase().trim();
  if (seenTitles.has(t)) duplicateTitles.push(item.title);
  seenTitles.add(t);
});
console.log(`Duplicate titles in catalog: ${duplicateTitles.length} ${duplicateTitles.join(', ')}`);
