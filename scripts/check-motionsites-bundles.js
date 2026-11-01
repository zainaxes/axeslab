const https = require('https');

https.get('https://motionsites.ai/', (res) => {
  console.log('Status of motionsites.ai:', res.statusCode);
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Fetched HTML length:', html.length);
    const scriptMatches = html.match(/src="(\/assets\/[^"]+)"/g);
    console.log('Asset bundles:', scriptMatches);
  });
}).on('error', e => console.error(e));
