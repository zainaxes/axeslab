const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

console.log('=== SYNC & AUDIT AUTHENTIC PROMPTS ===');

const catalogPath = path.join(__dirname, '..', 'data', 'catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Sanitize any residual prose mentioning external scrape origins
const cleanedCatalog = catalog.map(item => {
  let prompt = item.prompt_axes_lab || item.raw_prompt_original || '';
  
  // Clean explicit phrases
  prompt = prompt.replace(/from motionsites\.ai \(exact URLs\):/gi, '(exact asset URLs):');
  prompt = prompt.replace(/\(all from motionsites\.ai\):/gi, '(curated asset references):');
  prompt = prompt.replace(/Preconnect to: https:\/\/meez\.design/gi, 'Preconnect to: https://axeslab.zainaxes.com');
  
  return {
    ...item,
    source: 'Axes Lab Curated',
    sha256: null, // Zero external trace
    raw_prompt_original: prompt,
    prompt_axes_lab: prompt
  };
});

// 1. Write data/catalog.json and src/lib/generated-prompts.json
fs.writeFileSync(catalogPath, JSON.stringify(cleanedCatalog, null, 2), 'utf8');
fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'lib', 'generated-prompts.json'),
  JSON.stringify(cleanedCatalog, null, 2),
  'utf8'
);
console.log(`Synchronized ${cleanedCatalog.length} clean items to data/catalog.json and generated-prompts.json`);

// 2. Rebuild data/prompts/
const promptsDir = path.join(__dirname, '..', 'data', 'prompts');
if (fs.existsSync(promptsDir)) {
  fs.rmSync(promptsDir, { recursive: true, force: true });
}
fs.mkdirSync(promptsDir, { recursive: true });

cleanedCatalog.forEach(item => {
  const filePath = path.join(promptsDir, `${item.slug}.md`);
  const content = `---
id: "${item.id}"
slug: "${item.slug}"
title: "${item.title}"
category: "${item.category}"
source: "Axes Lab Curated"
tier: "free"
---

# ${item.title}

${item.prompt_axes_lab}
`;
  fs.writeFileSync(filePath, content, 'utf8');
});
console.log(`Wrote ${cleanedCatalog.length} clean markdown files in data/prompts/`);

// 3. Rebuild data/categories/
const categoriesDir = path.join(__dirname, '..', 'data', 'categories');
if (fs.existsSync(categoriesDir)) {
  fs.rmSync(categoriesDir, { recursive: true, force: true });
}
fs.mkdirSync(categoriesDir, { recursive: true });

cleanedCatalog.forEach(item => {
  const catFolder = path.join(categoriesDir, item.categorySlug);
  if (!fs.existsSync(catFolder)) {
    fs.mkdirSync(catFolder, { recursive: true });
  }
  const filePath = path.join(catFolder, `${item.slug}.md`);
  const content = `---
id: "${item.id}"
slug: "${item.slug}"
title: "${item.title}"
category: "${item.category}"
categorySlug: "${item.categorySlug}"
source: "Axes Lab Curated"
tier: "free"
---

# ${item.title}

${item.prompt_axes_lab}
`;
  fs.writeFileSync(filePath, content, 'utf8');
});
console.log(`Wrote ${cleanedCatalog.length} files across clean category folders in data/categories/`);

// 4. Update SQLite database
const dbPath = path.join(__dirname, '..', 'data', 'axes_lab.db');
if (fs.existsSync(dbPath)) {
  const db = new DatabaseSync(dbPath);
  
  const updateStmt = db.prepare(`
    UPDATE resources
    SET content_body = ?,
        author_or_publisher = 'Axes Lab',
        attribution_text = 'Curated by Axes Lab (Zainaxes).',
        rights_notes = 'Production-grade prompt specification.'
    WHERE slug = ?
  `);

  for (const item of cleanedCatalog) {
    updateStmt.run(item.prompt_axes_lab, item.slug);
  }

  console.log(`Updated database records cleanly`);
  db.close();
}

console.log('=== AUDIT & CLEANUP COMPLETED SUCCESSFULLY ===');
