const fs = require('fs');

const bundle = fs.readFileSync('motionsites_index.js', 'utf8');

// Look for Supabase URL and anon key
const sbUrlMatch = bundle.match(/https:\/\/[a-z0-9]+\.supabase\.co/g);
console.log('Supabase URLs found:', [...new Set(sbUrlMatch)]);

const anonKeyMatch = bundle.match(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g);
console.log('JWT / Anon keys found:', anonKeyMatch ? anonKeyMatch.length : 0);
if (anonKeyMatch) {
  console.log('First key:', anonKeyMatch[0]);
}

// Check for get-prompt or prompt tables
const tableMatches = bundle.match(/from\(['"]([a-zA-Z0-9_-]+)['"]\)/g);
console.log('Supabase tables referenced:', [...new Set(tableMatches)]);
