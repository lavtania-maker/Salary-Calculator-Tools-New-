// optimize_images.cjs - Ensures all valid png logos, aliases, and minified CSS are in place
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

// 1. Minify CSS & update cache busting links & LCP optimization
try {
  require('./update_css_links.cjs');
  require('./update_logo_cache_bust.cjs');
  require('./optimize_lcp.cjs');
  const cssSourcePath = fs.existsSync('calculator-styles.src.css') ? 'calculator-styles.src.css' : 'public/calculator-styles.css';
  const cssSource = fs.readFileSync(cssSourcePath, 'utf8');
  const minified = esbuild.transformSync(cssSource, { loader: 'css', minify: true });
  fs.writeFileSync('public/calculator-styles.css', minified.code);
  fs.writeFileSync('calculator-styles.css', minified.code);
  console.log(`CSS minified: ${cssSource.length} -> ${minified.code.length} bytes`);
} catch (err) {
  console.warn('CSS minification error:', err);
}

// 2. Ensure aliases in public/
if (fs.existsSync("public/perkeso-logo-vector.png")) {
  fs.copyFileSync("public/perkeso-logo-vector.png", "public/perkeso-logo.png");
  fs.copyFileSync("public/perkeso-logo-vector.png", "public/socso-logo.png");
}
if (fs.existsSync("public/lhdn-logo.png")) {
  fs.copyFileSync("public/lhdn-logo.png", "public/pcb-logo.png");
}
if (fs.existsSync("public/epf-logo.png")) {
  fs.copyFileSync("public/epf-logo.png", "public/kwsp-logo.png");
}

// 3. Synchronize images to root and dist
const files = [
  'logo-small.png',
  'logo-small.webp',
  'favicon-ricebowl.png',
  'epf-logo.png',
  'kwsp-logo.png',
  'epf-logo.svg',
  'perkeso-logo-vector.png',
  'perkeso-logo-transparent.png',
  'perkeso-logo.png',
  'socso-logo.png',
  'lhdn-logo.png',
  'pcb-logo.png'
];

for (const f of files) {
  const pub = path.join('public', f);
  if (fs.existsSync(pub)) {
    fs.copyFileSync(pub, f);
    const distTarget = path.join('dist', f);
    if (fs.existsSync('dist')) {
      fs.copyFileSync(pub, distTarget);
    }
  }
}
console.log('Logos verified, aliased, and synchronized across public, root, and dist.');
