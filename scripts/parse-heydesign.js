const fs = require('fs');

const html = fs.readFileSync('temp_heydesign.html', 'utf8');

// Check script 4 contents or data blobs
const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Total scripts:', scripts.length);

scripts.forEach((s, i) => {
  console.log(`--- Script ${i} (length: ${s.length}) ---`);
  console.log(s.slice(0, 300));
  fs.writeFileSync(`temp_script_${i}.txt`, s);
});
