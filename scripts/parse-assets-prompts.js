const fs = require('fs');

const content = fs.readFileSync('assets_prompts.js', 'utf8');

// Let's inspect how the prompts array is structured in assets_prompts.js
console.log('File size:', content.length);
// Find where the array begins
const arrayIdx = content.indexOf('[{title:');
console.log('array index with [{title:', arrayIdx);

if (arrayIdx !== -1) {
  const sample = content.slice(arrayIdx, arrayIdx + 2000);
  console.log('Sample data starting at array:\n', sample);
} else {
  // Try finding title:
  const match = content.match(/title:[^,]+/g);
  console.log('Total title occurrences:', match ? match.length : 0);
  if (match) {
    console.log('First 5 titles:', match.slice(0, 5));
  }
}
