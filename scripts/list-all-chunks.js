const fs = require('fs');

const indexData = fs.readFileSync('motionsites_index.js', 'utf8');

const chunks = indexData.match(/assets\/[a-zA-Z0-9_.-]+\.js/g);
console.log('Unique chunk paths in index:', [...new Set(chunks)]);
