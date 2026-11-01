const fs = require('fs');

const bundle = fs.readFileSync('motionsites_index.js', 'utf8');

// Look for endpoints, prompts, or API calls
const endpoints = bundle.match(/https?:\/\/[^\s"'`)]+/g);
const uniqueEndpoints = [...new Set(endpoints)];
console.log('Total URLs found in bundle:', uniqueEndpoints.length);
console.log('Sample URLs:', uniqueEndpoints.filter(u => !u.includes('w3.org') && !u.includes('reactjs')).slice(0, 30));

// Check for array of prompt items or templates
const promptMatches = bundle.match(/title:\s*["'][^"']+["']/g);
console.log('Title properties found in bundle:', promptMatches ? promptMatches.length : 0);
if (promptMatches) {
  console.log('Sample titles:', promptMatches.slice(0, 15));
}
