const fs = require('fs');
const html = fs.readFileSync('temp_heydesign.html', 'utf8');

const articles = html.match(/<article[\s\S]*?<\/article>/gi) || [];
if (articles.length > 0) {
  fs.writeFileSync('temp_article_0.html', articles[0]);
  console.log('Saved temp_article_0.html, total length:', articles[0].length);
  console.log(articles[0]);
}
