const fs = require('fs');

const appJs = fs.readFileSync('temp_meez_app.js', 'utf8');

// Search for api endpoints, prompt endpoints, fetch calls
const fetchMatches = appJs.match(/fetch\([^\)]+\)/gi) || [];
console.log('Fetch calls count:', fetchMatches.length);
console.log('Sample fetch calls:', fetchMatches.slice(0, 10));

const apiMatches = appJs.match(/["']\/api\/[^"']+["']/gi) || [];
console.log('API routes:', [...new Set(apiMatches)]);

const promptMatches = appJs.match(/["']\/[^"']*prompt[^"']*["']/gi) || [];
console.log('Prompt paths:', [...new Set(promptMatches)].slice(0, 15));
