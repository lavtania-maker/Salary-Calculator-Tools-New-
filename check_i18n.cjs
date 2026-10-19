const fs = require('fs');

console.log('Checking locales:');
if (fs.existsSync('locales/ms.json')) {
  const ms = JSON.parse(fs.readFileSync('locales/ms.json', 'utf8'));
  console.log('locales/ms.json keys:', Object.keys(ms).length);
} else {
  console.log('locales/ms.json DOES NOT EXIST');
}

if (fs.existsSync('src/lib/translations-ms.ts')) {
  console.log('src/lib/translations-ms.ts exists, size:', fs.statSync('src/lib/translations-ms.ts').size);
}

if (fs.existsSync('src/i18n.ts')) {
  console.log('src/i18n.ts exists, size:', fs.statSync('src/i18n.ts').size);
}

// Find any other i18n files
const files = fs.readdirSync('src');
console.log('src files:', files);
if (fs.existsSync('src/lib')) {
  console.log('src/lib files:', fs.readdirSync('src/lib'));
}
