const https = require('https');
const fs = require('fs');

const agent = new https.Agent({ keepAlive: true, maxSockets: 4, timeout: 30000 });

function testWithAgent(url, dest) {
  return new Promise((resolve) => {
    const req = https.get(url, { agent, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      console.log(`[${dest}] Status: ${res.statusCode}, size: ${res.headers['content-length']}`);
      if (res.statusCode !== 200) {
        res.resume();
        return resolve(false);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve(true);
      });
      stream.on('error', () => resolve(false));
    });

    req.on('error', err => {
      console.error(`Error on ${dest}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  await testWithAgent('https://meez.design/web/media/preview_videos/creative-studio.mp4', 'public/media/videos/agent-creative.mp4');
  await testWithAgent('https://meez.design/web/prompt-previews/orbis-nft-landing-preview.mp4', 'public/media/videos/agent-orbis.mp4');
  console.log('Test completed successfully!');
}

run();
