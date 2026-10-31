const fs = require('fs');

const s4 = fs.readFileSync('temp_script_4.txt', 'utf8');
console.log('Script 4 size:', s4.length);

// Look for data patterns in s4:
// TanStack Router / SSR state injection typically uses self.$R or json payloads
const pushMatches = s4.match(/self\.\$R\["tsr"\]\.push\([\s\S]*?\);/g) || [];
console.log('Number of push calls:', pushMatches.length);

pushMatches.forEach((p, idx) => {
  console.log(`Push ${idx} length: ${p.length}, preview: ${p.slice(0, 200)}`);
  fs.writeFileSync(`temp_push_${idx}.txt`, p);
});
