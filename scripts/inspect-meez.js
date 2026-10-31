const fs = require('fs');

const html = fs.readFileSync('temp_meez.html', 'utf8');

// Look for script tags
const scripts = [];
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  scripts.push(match[1]);
}

console.log('Total inline scripts:', scripts.length);
scripts.forEach((s, idx) => {
  if (s.trim().length > 0) {
    console.log(`Script ${idx} length: ${s.length}, sample: ${s.slice(0, 150).replace(/\n/g, ' ')}`);
    fs.writeFileSync(`temp_meez_script_${idx}.txt`, s, 'utf8');
  }
});

// Look for external script src
const srcRegex = /<script\b[^>]*src=["']([^"']+)["'][^>]*>/gi;
const external = [];
while ((match = srcRegex.exec(html)) !== null) {
  external.push(match[1]);
}
console.log('External scripts:', external);

// Check title, meta, links
const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'none');

// Look for links in html
const linkRegex = /href=["']([^"']+)["']/gi;
const links = new Set();
while ((match = linkRegex.exec(html)) !== null) {
  links.add(match[1]);
}
console.log('Unique hrefs count:', links.size);
console.log('Sample hrefs:', [...links].slice(0, 20));
