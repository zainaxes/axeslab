const https = require('https');
const fs = require('fs');

console.log('Downloading index-DEmyCYxI.js from motionsites.ai...');
https.get('https://motionsites.ai/assets/index-DEmyCYxI.js', (res) => {
  console.log('Status:', res.statusCode);
  const file = fs.createWriteStream('motionsites_index.js');
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Saved motionsites_index.js! Size:', fs.statSync('motionsites_index.js').size);
  });
}).on('error', e => console.error(e));
