const fs = require('fs');

const bundle = fs.readFileSync('motionsites_index.js', 'utf8');

// Look for .js imports or dynamic chunks
const chunkMatches = bundle.match(/["'][^"']*\.js["']/g);
console.log('Chunk references found in bundle:', [...new Set(chunkMatches)]);
