const https = require('https');
const fs = require('fs');

https.get('https://motionsites.ai/assets/prompts-CL5kGypO.js', res => {
  const f = fs.createWriteStream('assets_prompts.js');
  res.pipe(f);
  f.on('finish', () => {
    f.close();
    console.log('Saved assets_prompts.js!');
    const promptsChunk = fs.readFileSync('assets_prompts.js', 'utf8');
    const fnMatches = promptsChunk.match(/\/functions\/v1\/[a-zA-Z0-9_-]+/g);
    console.log('Edge functions in prompts chunk:', [...new Set(fnMatches)]);
    const fromMatches = promptsChunk.match(/from\(['"][a-zA-Z0-9_-]+['"]/g);
    console.log('Tables in prompts chunk:', [...new Set(fromMatches)]);
    const rpcMatches = promptsChunk.match(/rpc\(['"][a-zA-Z0-9_-]+['"]/g);
    console.log('RPC calls in prompts chunk:', [...new Set(rpcMatches)]);
  });
});
