async function analyzeMeez() {
  const res = await fetch('https://meez.design/');
  const html = await res.text();

  console.log('HTML size:', html.length);

  // Extract headings
  const headings = html.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi) || [];
  console.log('Headings:');
  headings.forEach(h => console.log(' - ' + h.replace(/<[^>]+>/g, '').trim()));

  // Extract navigation / header links
  const links = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || [];
  console.log('\nTop links sample:');
  const seen = new Set();
  links.forEach(l => {
    const text = l.replace(/<[^>]+>/g, '').trim();
    if (text && !seen.has(text) && seen.size < 20) {
      seen.add(text);
      console.log(' - ' + text);
    }
  });

  // Extract CSS classes that describe UI patterns
  const classMatches = html.match(/class=["']([^"']+)["']/gi) || [];
  const classes = new Set();
  classMatches.forEach(c => {
    c.replace(/class=["']/, '').replace(/["']/, '').split(/\s+/).forEach(cls => {
      if (cls.includes('nav') || cls.includes('hero') || cls.includes('card') || cls.includes('grid') || cls.includes('modal') || cls.includes('badge') || cls.includes('pill')) {
        classes.add(cls);
      }
    });
  });
  console.log('\nCharacteristic UI classes:', [...classes].slice(0, 30));
}
analyzeMeez();
