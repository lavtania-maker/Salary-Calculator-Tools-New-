// optimize_images.cjs - Resizes and compresses logos, aliases, and minified CSS
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const sharp = require('sharp');

async function run() {
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

  // 2. Optimize and resize logos using sharp
  try {
    // Resize PERKESO logo to 96x96 crisp retina for 48x48 display
    if (fs.existsSync('public/perkeso-logo-vector.png')) {
      await sharp('public/perkeso-logo-vector.png')
        .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9, effort: 10 })
        .toFile('public/perkeso-logo-vector-opt.png');
      fs.copyFileSync('public/perkeso-logo-vector-opt.png', 'public/perkeso-logo-vector.png');
      fs.copyFileSync('public/perkeso-logo-vector-opt.png', 'public/perkeso-logo.png');
      fs.copyFileSync('public/perkeso-logo-vector-opt.png', 'public/socso-logo.png');
      fs.unlinkSync('public/perkeso-logo-vector-opt.png');
    }

    // Resize LHDN logo to 96x96 crisp retina for 48x48 display
    if (fs.existsSync('public/lhdn-logo.png')) {
      await sharp('public/lhdn-logo.png')
        .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9, effort: 10 })
        .toFile('public/lhdn-logo-opt.png');
      fs.copyFileSync('public/lhdn-logo-opt.png', 'public/lhdn-logo.png');
      fs.copyFileSync('public/lhdn-logo-opt.png', 'public/pcb-logo.png');
      fs.unlinkSync('public/lhdn-logo-opt.png');
    }

    // Resize EPF logo to 96x96 crisp retina for 48x48 display
    if (fs.existsSync('public/epf-logo.png')) {
      await sharp('public/epf-logo.png')
        .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9, effort: 10 })
        .toFile('public/epf-logo-opt.png');
      fs.copyFileSync('public/epf-logo-opt.png', 'public/epf-logo.png');
      fs.copyFileSync('public/epf-logo-opt.png', 'public/kwsp-logo.png');
      fs.unlinkSync('public/epf-logo-opt.png');
    }

    // Optimize logo-small.png
    if (fs.existsSync('public/logo-small.png')) {
      const optLogoBuf = await sharp('public/logo-small.png')
        .png({ compressionLevel: 9, effort: 10 })
        .toBuffer();
      if (optLogoBuf.length < fs.statSync('public/logo-small.png').size) {
        fs.writeFileSync('public/logo-small.png', optLogoBuf);
      }
    }
  } catch (err) {
    console.warn('Image optimization warning:', err);
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
  console.log('Logos verified, aliased, optimized, and synchronized across public, root, and dist.');
}

run().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});

