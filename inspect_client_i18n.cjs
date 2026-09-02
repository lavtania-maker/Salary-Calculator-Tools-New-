const fs = require('fs');

if (fs.existsSync('src/i18n.ts')) {
  console.log('src/i18n.ts content (first 100 lines):');
  const lines = fs.readFileSync('src/i18n.ts', 'utf8').split('\n');
  console.log(lines.slice(0, 100).join('\n'));
}

