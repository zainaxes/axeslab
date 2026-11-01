const https = require('https');

const testUrl = 'https://heydesign.ai/api/design-prompt-media/v1/effects/relocation-card.mp4';

https.get(testUrl, res => {
  console.log('Heydesign status code:', res.statusCode);
  console.log('Headers:', res.headers);
}).on('error', err => {
  console.error('Heydesign error:', err);
});
