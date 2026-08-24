const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const f of files) {
  let html = fs.readFileSync(f, 'utf8');
  let changed = false;

  // Replace /logo-small.png(?v=...)? with /logo-small.png?v=4
  if (html.includes('/logo-small.png')) {
    html = html.replace(/\/logo-small\.png(\?v=\d+)?/g, '/logo-small.png?v=4');
    changed = true;
  }
  if (html.includes('/favicon-ricebowl.png')) {
    html = html.replace(/\/favicon-ricebowl\.png(\?v=\d+)?/g, '/favicon-ricebowl.png?v=4');
    changed = true;
  }
  if (html.includes('/epf-logo.png')) {
    html = html.replace(/\/epf-logo\.png(\?v=\d+)?/g, '/epf-logo.png?v=4');
    changed = true;
  }
  if (html.includes('/perkeso-logo-vector.png')) {
    html = html.replace(/\/perkeso-logo-vector\.png(\?v=\d+)?/g, '/perkeso-logo-vector.png?v=4');
    changed = true;
  }
  if (html.includes('/lhdn-logo.png')) {
    html = html.replace(/\/lhdn-logo\.png(\?v=\d+)?/g, '/lhdn-logo.png?v=4');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, html, 'utf8');
    console.log(`Updated cache bust in ${f}`);
  }
}
