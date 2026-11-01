const http = require('http');

const testUrl = 'http://localhost:3000/api/media-proxy?url=' + encodeURIComponent('https://meez.design/web/prompt-previews/prompt-media/2ea8993c4cac1424.mp4');

http.get(testUrl, res => {
  console.log('Proxy response status:', res.statusCode);
  console.log('Headers:', res.headers);
  let bytes = 0;
  res.on('data', chunk => {
    bytes += chunk.length;
    if (bytes > 50000) {
      res.destroy();
      console.log('Successfully received proxied video data:', bytes);
    }
  });
}).on('error', err => console.error('Proxy error:', err));
