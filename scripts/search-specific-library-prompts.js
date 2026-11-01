const fs = require('fs');
const meezCatalog = JSON.parse(fs.readFileSync('meez_catalog_extracted.json', 'utf8'));
const heydesignCatalog = JSON.parse(fs.readFileSync('extracted_prompts_initial.json', 'utf8')).items;

const combined = [
  ...meezCatalog.map(m => ({ ...m, source: 'meez' })),
  ...heydesignCatalog.map(h => ({ ...h, source: 'heydesign' }))
];

const relevant = [];
for (const item of combined) {
  const text = (item.title + ' ' + (item.category || '') + ' ' + (item.preview || '') + ' ' + (item.description || '')).toLowerCase();
  
  let score = 0;
  const hits = [];

  if (text.includes('directory')) { score += 5; hits.push('directory'); }
  if (text.includes('library')) { score += 5; hits.push('library'); }
  if (text.includes('curated') || text.includes('curat')) { score += 4; hits.push('curat'); }
  if (text.includes('catalog')) { score += 4; hits.push('catalog'); }
  if (text.includes('resource')) { score += 4; hits.push('resource'); }
  if (text.includes('toolkit') || text.includes('tools')) { score += 3; hits.push('toolkit/tools'); }
  if (text.includes('design system')) { score += 3; hits.push('design system'); }
  if (text.includes('showcase')) { score += 3; hits.push('showcase'); }
  if (text.includes('search') && text.includes('filter')) { score += 3; hits.push('search/filter'); }
  if (text.includes('bento')) { score += 2; hits.push('bento'); }

  if (score >= 4) {
    relevant.push({
      id: item.id,
      title: item.title,
      category: item.category,
      source: item.source,
      score,
      hits,
      preview: (item.preview || item.description || '').slice(0, 140)
    });
  }
}

relevant.sort((a, b) => b.score - a.score);
console.log('Top relevant prompts found:', relevant.length);
relevant.slice(0, 20).forEach((r, i) => {
  console.log(`${i+1}. [${r.id}] "${r.title}" (${r.category}) [Source: ${r.source}, Score: ${r.score}]`);
  console.log(`   Hits: ${r.hits.join(', ')}`);
  console.log(`   Snippet: ${r.preview}\n`);
});
