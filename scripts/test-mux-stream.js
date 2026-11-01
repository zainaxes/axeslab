const https = require('https');

function test(url) {
  https.get(url, res => {
    console.log(`[${url}] Status:`, res.statusCode, res.headers['content-type']);
  }).on('error', e => console.error(url, e.message));
}

test('https://image.mux.com/iK2ACd5wEwi7ORN8i16kl59Cck01IREnB3hX6EnnqiUk/animated.webp?width=640&fps=15');
test('https://image.mux.com/iK2ACd5wEwi7ORN8i16kl59Cck01IREnB3hX6EnnqiUk/thumbnail.webp?width=1200&time=2');
test('https://stream.mux.com/iK2ACd5wEwi7ORN8i16kl59Cck01IREnB3hX6EnnqiUk.m3u8');
