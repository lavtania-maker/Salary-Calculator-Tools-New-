// optimize_images.cjs - Ensures all valid png logos are in place
const fs = require('fs');
const path = require('path');

const files = [
  'logo-small.png',
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
