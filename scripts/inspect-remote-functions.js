const https = require('https');

https.get('https://motionsites.ai/assets/content.functions-JH0Qifme.js', res => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    console.log('content.functions length:', data.length);
    const tableMatches = data.match(/from\(['"][a-zA-Z0-9_]+['"]\)/g);
    console.log('Tables:', [...new Set(tableMatches)]);
    const rpcMatches = data.match(/rpc\(['"][a-zA-Z0-9_]+['"]/g);
    console.log('RPCs:', [...new Set(rpcMatches)]);
    const urlMatches = data.match(/https:\/\/[^'"`\s)]+/g);
    console.log('URLs:', [...new Set(urlMatches)]);
  });
});
