const https = require('https');
const fs = require('fs');

const chunks = [
  'assets/threeD-B569_Fat.js',
  'assets/sections-BvnyJW2V.js',
  'assets/backgrounds-CvJpStCN.js',
  'assets/templates-C9W2mjiW.js',
  'assets/Combination-DOqyfk3I.js'
];

async function download(path) {
  return new Promise((resolve) => {
    https.get('https://motionsites.ai/' + path, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const titleMatches = data.match(/title:`[^`]+`/g) || [];
        const catMatches = data.match(/category:`[^`]+`/g) || [];
        const muxMatches = data.match(/https:\/\/(?:stream|image)\.mux\.com\/[a-zA-Z0-9]+/g) || [];
        console.log(`[${path}] Length: ${data.length}, Titles: ${titleMatches.length}, Categories: ${catMatches.length}, Mux: ${muxMatches.length}`);
        resolve({ path, data, titles: titleMatches, categories: catMatches });
      });
    }).on('error', err => {
      console.error(path, err.message);
      resolve(null);
    });
  });
}

async function run() {
  for (const c of chunks) {
    await download(c);
  }
}

run();
