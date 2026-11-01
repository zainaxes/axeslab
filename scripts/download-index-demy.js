const https = require('https');
const fs = require('fs');

https.get('https://motionsites.ai/assets/index-DEmyCYxI.js', res => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    fs.writeFileSync('assets_index_demy.js', data, 'utf8');
    console.log(`Saved assets_index_demy.js (${data.length} bytes)`);
    const idMatches = data.match(/id:`[^`]+`/g) || [];
    const titleMatches = data.match(/title:`[^`]+`/g) || [];
    console.log(`  -> ids: ${idMatches.length}, titles: ${titleMatches.length}`);
    if (titleMatches.length > 0) {
      console.log(`  -> sample titles:`, titleMatches.slice(0, 10));
    }
    const catMatches = data.match(/category:`[^`]+`/g) || [];
    console.log(`  -> categories:`, [...new Set(catMatches)]);
  });
}).on('error', console.error);
