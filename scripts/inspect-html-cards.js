const fs = require('fs');
const html = fs.readFileSync('temp_heydesign.html', 'utf8');

// Find articles or card wrappers
const articles = html.match(/<article[\s\S]*?<\/article>/gi) || [];
console.log('Article tags count:', articles.length);
if (articles.length > 0) {
  console.log('Article 0 snippet:', articles[0].slice(0, 500));
}

// Find video tags
const videos = html.match(/<video[\s\S]*?<\/video>/gi) || [];
console.log('Video tags count:', videos.length);
if (videos.length > 0) {
  console.log('Video 0 snippet:', videos[0].slice(0, 500));
}

// Check how cards are rendered in HTML
const buttons = html.match(/<button[\s\S]*?<\/button>/gi) || [];
console.log('Button tags count:', buttons.length);
const promptButtons = buttons.filter(b => b.includes('Copy') || b.includes('Prompt') || b.includes('View'));
console.log('Prompt buttons sample:', promptButtons.slice(0, 5));
