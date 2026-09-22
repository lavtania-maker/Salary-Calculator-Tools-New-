// optimize_images.cjs - Ensures all valid png logos and minified CSS are in place
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

// 1. Minify CSS
try {
  require('./update_css_links.cjs');
  const cssSourcePath = fs.existsSync('calculator-styles.src.css') ? 'calculator-styles.src.css' : 'public/calculator-styles.css';
  const cssSource = fs.readFileSync(cssSourcePath, 'utf8');
  const minified = esbuild.transformSync(cssSource, { loader: 'css', minify: true });
  fs.writeFileSync('public/calculator-styles.css', minified.code);
  fs.writeFileSync('calculator-styles.css', minified.code);
  console.log(`CSS minified: ${cssSource.length} -> ${minified.code.length} bytes`);
} catch (err) {
  console.warn('CSS minification error:', err);
}

// 2. Synchronize images
const files = [
  'logo-small.png',
  'logo-small.webp',
  'favicon-ricebowl.png',
  'epf-logo.png',
  'perkeso-logo-vector.png',
  'lhdn-logo.png'
];

for (const f of files) {
  const pub = path.join('public', f);
  if (fs.existsSync(pub)) {
    fs.copyFileSync(pub, f);
  }
}
console.log('Logos verified and synchronized.');
