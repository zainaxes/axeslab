const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./data/axes_lab.db');

const r = db.prepare("SELECT title, content_body FROM resources WHERE title = 'Space planet'").get();

function cleanInjectedNotes(text) {
  let out = text;
  // Remove pre-pended header
  out = out.replace(/^\/\/\s*Official Specification for[\s\S]*?(?=\n\n|\n[A-Z0-9#\/\*])/i, '').trim();
  // Remove appended footer
  out = out.replace(/═{10,}\s*\nCREDITS & RESOURCE REFERENCE\s*\n═{10,}\s*\nEngineered by[\s\S]*$/i, '').trim();
  return out;
}

const cleaned = cleanInjectedNotes(r.content_body);
console.log('Original length:', r.content_body.length);
console.log('Cleaned length:', cleaned.length);
console.log('Cleaned start:\n', cleaned.slice(0, 300));
console.log('Cleaned end:\n', cleaned.slice(-200));
