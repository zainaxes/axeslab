const fs = require('fs');
const free = require('../meez_free_extracted.json');
const allText = Object.values(free).join(' ');
const matches = allText.match(/https:\/\/[^"'\s\)]+\.mp4/g) || [];
console.log('Total MP4s in meez prompts:', matches.length);
console.log('Sample distinct MP4s:', [...new Set(matches)]);
