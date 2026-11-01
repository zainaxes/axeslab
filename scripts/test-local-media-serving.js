const http = require('http');

function testEndpoint(url) {
  return new Promise(resolve => {
    http.get(url, res => {
      console.log(`[${url}] Status: ${res.statusCode}, Content-Type: ${res.headers['content-type']}, Content-Length: ${res.headers['content-length']}`);
      res.resume();
      resolve(res.statusCode);
    }).on('error', e => {
      console.error(url, e.message);
      resolve(500);
    });
  });
}

async function run() {
  await testEndpoint('http://localhost:3000/media/videos/21-splite.mp4');
  await testEndpoint('http://localhost:3000/media/videos/21-aurora-background.mp4');
  await testEndpoint('http://localhost:3000/media/posters/21-splite.jpg');
  await testEndpoint('http://localhost:3000/media/posters/21-dark-gradient-pricing.jpg');
  await testEndpoint('http://localhost:3000/');
}

run();
