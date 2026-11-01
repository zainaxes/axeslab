const fs = require('fs');

const bundle = fs.readFileSync('motionsites_index.js', 'utf8');

// Look for functions/v1 calls
const fnMatches = bundle.match(/\/functions\/v1\/[a-zA-Z0-9_-]+/g);
console.log('Edge functions referenced in index:', [...new Set(fnMatches)]);

// Check prompts-CL5kGypO.js chunk
const promptsChunk = fs.readFileSync('assets_prompts.js', 'utf8');
const fnMatches2 = promptsChunk.match(/\/functions\/v1\/[a-zA-Z0-9_-]+/g);
console.log('Edge functions in prompts chunk:', [...new Set(fnMatches2)]);

const rpcMatches = promptsChunk.match(/rpc\(['"][a-zA-Z0-9_-]+['"]/g);
console.log('RPC calls in prompts chunk:', [...new Set(rpcMatches)]);

const fromMatches = promptsChunk.match(/from\(['"][a-zA-Z0-9_-]+['"]/g);
console.log('Tables in prompts chunk:', [...new Set(fromMatches)]);
