const fs = require('fs');

const s4 = fs.readFileSync('temp_script_4.txt', 'utf8');

console.log('Start of script 4:\n', s4.slice(0, 1500));
console.log('\n---\nEnd of script 4:\n', s4.slice(-1500));
