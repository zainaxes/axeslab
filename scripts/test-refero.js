const https = require('https');

const url = 'https://meez.design/web/prompt-previews/refero/a0e0717cf0810ff1.mp4';
console.log('Testing url:', url);
const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  console.log('Status code:', res.statusCode);
  console.log('Headers:', res.headers);
});
req.on('error', e => console.error(e.message));
req.setTimeout(5000, () => {
  console.log('Timed out!');
  req.destroy();
});
