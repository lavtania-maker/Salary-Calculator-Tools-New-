const fs = require('fs');

const ms = JSON.parse(fs.readFileSync('locales/ms.json', 'utf8'));
console.log('Total keys in ms.json:', Object.keys(ms).length);
console.log('Sample keys/values from ms.json:');
const sampleKeys = Object.keys(ms).slice(0, 15);
sampleKeys.forEach(k => console.log(`  ${k}: "${ms[k].substring(0, 50)}..."`));

const fullMap = fs.readFileSync('src/lib/translations-ms.ts', 'utf8');
console.log('\nFULL_TEXT_MAP_MS lines count:', fullMap.split('\n').length);
