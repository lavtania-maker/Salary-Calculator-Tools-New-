const fs = require('fs');
const path = require('path');

const version = '20260709';
const rootDir = process.cwd();

// Find all HTML files in the root directory
const files = fs.readdirSync(rootDir).filter(file => file.endsWith('.html'));

console.log(`[CSS Cache Buster] Found ${files.length} HTML files to update.`);

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace /calculator-styles.css (with or without existing query params)
  // Matching: /calculator-styles.css, /calculator-styles.css?v=123, etc.
  const regex = /\/calculator-styles\.css(?:\?v=[a-zA-Z0-9_-]+)?/g;
  const newContent = content.replace(regex, `/calculator-styles.css?v=${version}`);
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`[CSS Cache Buster] Updated ${file}`);
  } else {
    console.log(`[CSS Cache Buster] No change needed for ${file}`);
  }
});

console.log('[CSS Cache Buster] Done!');
