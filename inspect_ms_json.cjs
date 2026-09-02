const fs = require('fs');
const msJson = JSON.parse(fs.readFileSync('locales/ms.json', 'utf8'));

let englishCount = 0;
let malayCount = 0;
const englishSamples = [];

for (const [k, v] of Object.entries(msJson)) {
  if (typeof v === 'string') {
    // check if contains obvious english phrases
    if (v.includes('What is') || v.includes('How to calculate') || v.includes('Calculate employee') || v.includes('Contributions are') || v.includes('Understanding') || v.includes('Frequently Asked Questions')) {
      englishCount++;
      if (englishSamples.length < 20) {
        englishSamples.push({ key: k, value: v.substring(0, 80) });
      }
    } else {
      malayCount++;
    }
  }
}

console.log(`ms.json stats: Potential English = ${englishCount}, Likely Malay = ${malayCount}`);
console.log('Sample English in ms.json:');
englishSamples.forEach(s => console.log(`  [${s.key}]: "${s.value}"`));
