const fs = require('fs');
const path = require('path');

const VERSION = '20260922v5';

function updateContent(str) {
  let res = str;
  // Replace all image src paths for logos with updated version
  res = res.replace(/\/logo-small\.png(\?v=[a-zA-Z0-9_-]+)?/g, `/logo-small.png?v=${VERSION}`);
  res = res.replace(/\/favicon-ricebowl\.png(\?v=[a-zA-Z0-9_-]+)?/g, `/favicon-ricebowl.png?v=${VERSION}`);
  res = res.replace(/\/epf-logo\.png(\?v=[a-zA-Z0-9_-]+)?/g, `/epf-logo.png?v=${VERSION}`);
  res = res.replace(/\/perkeso-logo-vector\.png(\?v=[a-zA-Z0-9_-]+)?/g, `/perkeso-logo-vector.png?v=${VERSION}`);
  res = res.replace(/\/perkeso-logo\.png(\?v=[a-zA-Z0-9_-]+)?/g, `/perkeso-logo.png?v=${VERSION}`);
  res = res.replace(/\/socso-logo\.png(\?v=[a-zA-Z0-9_-]+)?/g, `/socso-logo.png?v=${VERSION}`);
  res = res.replace(/\/lhdn-logo\.png(\?v=[a-zA-Z0-9_-]+)?/g, `/lhdn-logo.png?v=${VERSION}`);
  res = res.replace(/\/pcb-logo\.png(\?v=[a-zA-Z0-9_-]+)?/g, `/pcb-logo.png?v=${VERSION}`);
  return res;
}

// 1. Process all HTML files in root
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const f of files) {
  const original = fs.readFileSync(f, 'utf8');
  const updated = updateContent(original);
  if (updated !== original) {
    fs.writeFileSync(f, updated, 'utf8');
    console.log(`[Logo Cache Buster] Updated ${f}`);
  }
}

// 2. Process locales
['locales/en.json', 'locales/ms.json'].forEach(locFile => {
  if (fs.existsSync(locFile)) {
    const original = fs.readFileSync(locFile, 'utf8');
    const updated = updateContent(original);
    if (updated !== original) {
      fs.writeFileSync(locFile, updated, 'utf8');
      console.log(`[Logo Cache Buster] Updated ${locFile}`);
    }
  }
});
