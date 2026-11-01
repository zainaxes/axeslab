const https = require('https');

const SUPABASE_URL = 'https://xgdzyqfalbibzelpdpvr.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnZHp5cWZhbGJpYnplbHBkcHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzUwMDYsImV4cCI6MjA4NzQxMTAwNn0.u8lH5Y14xx2WxrNEBp8ngkJlijIYHJASq_gOzTaINZY';

const tables = ['prompts', 'categories', 'sections', 'backgrounds', 'templates', 'app_prompts'];

tables.forEach(table => {
  const options = {
    hostname: 'xgdzyqfalbibzelpdpvr.supabase.co',
    path: `/rest/v1/${table}?select=*&limit=3`,
    headers: {
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${ANON_KEY}`
    }
  };

  https.get(options, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log(`Table /rest/v1/${table}: Status ${res.statusCode}, Length ${data.length}`);
      if (res.statusCode === 200) {
        try {
          const parsed = JSON.parse(data);
          console.log(`  -> Items: ${parsed.length}, Sample fields:`, parsed[0] ? Object.keys(parsed[0]) : 'empty');
        } catch {}
      }
    });
  }).on('error', e => console.error(table, e.message));
});
