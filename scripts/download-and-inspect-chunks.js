const https = require('https');
const fs = require('fs');

async function checkChunk(url, filename) {
  return new Promise((resolve) => {
    https.get(url, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        fs.writeFileSync(filename, data, 'utf8');
        console.log(`Saved ${filename} (${data.length} bytes)`);
        // Search for arrays of objects
        const idMatches = data.match(/id:`[^`]+`/g) || [];
        const titleMatches = data.match(/title:`[^`]+`/g) || [];
        console.log(`  -> ids: ${idMatches.length}, titles: ${titleMatches.length}`);
        if (titleMatches.length > 0) {
          console.log(`  -> sample titles:`, titleMatches.slice(0, 5));
        }
        resolve();
      });
    }).on('error', e => {
      console.error(e);
      resolve();
    });
  });
}

async function run() {
  await checkChunk('https://motionsites.ai/assets/sections-BvnyJW2V.js', 'assets_sections.js');
  await checkChunk('https://motionsites.ai/assets/backgrounds-CvJpStCN.js', 'assets_backgrounds.js');
  await checkChunk('https://motionsites.ai/assets/Index-CbVJj2eC.js', 'assets_index.js');
  await checkChunk('https://motionsites.ai/assets/Combination-DOqyfk3I.js', 'assets_combination.js');
}

run();
