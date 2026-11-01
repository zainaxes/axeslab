const https = require('https');
const fs = require('fs');

const chunks = ['assets/client--RbFduoz.js', 'assets/prompts-CL5kGypO.js'];

chunks.forEach(chunk => {
  const url = 'https://motionsites.ai/' + chunk;
  https.get(url, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log(chunk, 'Length:', data.length);
      const sb = data.match(/https:\/\/[a-z0-9]+\.supabase\.co/g);
      if (sb) console.log(chunk, 'Supabase URL:', [...new Set(sb)]);
      const jwt = data.match(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g);
      if (jwt) console.log(chunk, 'JWT / Anon key:', jwt[0]);
    });
  });
});
