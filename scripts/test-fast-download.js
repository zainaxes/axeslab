const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

async function testFastDownload(url, dest) {
  const start = Date.now();
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) {
      console.log(`Failed ${url}: status ${res.status}`);
      return false;
    }
    const fileStream = fs.createWriteStream(dest);
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
    console.log(`Downloaded ${url} in ${Date.now() - start}ms (size: ${fs.statSync(dest).size} bytes)`);
    return true;
  } catch (err) {
    console.error(`Error ${url}: ${err.message}`);
    return false;
  }
}

async function run() {
  await testFastDownload('https://meez.design/web/media/preview_videos/creative-studio.mp4', 'public/media/videos/test-creative.mp4');
  await testFastDownload('https://meez.design/web/prompt-previews/orbis-nft-landing-preview.mp4', 'public/media/videos/test-orbis.mp4');
}

run();
