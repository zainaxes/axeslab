const http = require('http');

const routes = [
  '/',
  '/apps',
  '/sections',
  '/3d-websites',
  '/backgrounds',
  '/top',
  '/mcp',
  '/skills',
  '/restyle',
  '/submit',
  '/contact'
];

async function checkRoute(r) {
  return new Promise(resolve => {
    http.get(`http://localhost:3000${r}`, res => {
      console.log(`[${r}] Status: ${res.statusCode}`);
      let html = '';
      res.on('data', d => html += d);
      res.on('end', () => {
        resolve({ route: r, status: res.statusCode, length: html.length });
      });
    }).on('error', err => {
      console.error(`[${r}] Error:`, err.message);
      resolve({ route: r, error: err.message });
    });
  });
}

async function run() {
  for (const r of routes) {
    await checkRoute(r);
  }
}

run();
