const fs = require('fs');
const html = fs.readFileSync('temp_meez_page.html', 'utf8');

// Look for scripts or json in detail page
const scripts = [];
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  scripts.push(match[1]);
}

scripts.forEach((s, idx) => {
  if (s.trim().length > 0) {
    console.log(`Page Script ${idx} length: ${s.length}, sample: ${s.slice(0, 150).replace(/\n/g, ' ')}`);
  }
});

// Check if prompt text or API endpoint is referenced
const appJs = fs.existsSync('temp_meez_app.js') ? '' : 'not downloaded';
console.log('AppJS status:', appJs);
