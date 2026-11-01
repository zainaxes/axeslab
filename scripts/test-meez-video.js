const https = require('https');

const testUrl = 'https://meez.design/web/prompt-previews/prompt-media/2ea8993c4cac1424.mp4';

https.get(testUrl, res => {
  console.log('Status code:', res.statusCode);
  console.log('Headers:', res.headers);
  let bytes = 0;
  res.on('data', chunk => {
    bytes += chunk.length;
    if (bytes > 50000) {
      res.destroy();
      console.log('Successfully received data chunk of size:', bytes);
    }
  });
}).on('error', err => console.error('Fetch error:', err));
