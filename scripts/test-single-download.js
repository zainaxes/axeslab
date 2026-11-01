const https = require('https');
const fs = require('fs');
const path = require('path');

const testUrl = 'https://meez.design/web/prompt-previews/orbis-nft-landing-preview.mp4';
const dest = path.resolve(process.cwd(), 'public/media/videos/orbis-nft-landing.mp4');

fs.mkdirSync(path.dirname(dest), { recursive: true });

const file = fs.createWriteStream(dest);
https.get(testUrl, res => {
  console.log('Status code:', res.statusCode);
  console.log('Content type:', res.headers['content-type']);
  console.log('Content length:', res.headers['content-length']);
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Successfully saved to:', dest, 'Size:', fs.statSync(dest).size, 'bytes');
  });
}).on('error', err => {
  console.error('Error downloading:', err);
});
