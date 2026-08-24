const fs = require('fs');

// Check all script files in src or root that do translations on the client side
const files = ['src/salary-calculator.ts', 'src/epf-kwsp.ts', 'src/socso-calculator.ts', 'src/pcb-calculator.ts', 'src/annual-leave-calculator.ts', 'src/overtime-calculator.ts', 'src/other-calculators.ts'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const matches = text.match(/i18n|translate|msJson|locale|lang/gi);
    console.log(`${f}: matches for i18n/lang = ${matches ? matches.length : 0}`);
  }
});

// Check how client side does i18n
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatches = html.match(/<script[\s\S]*?<\/script>/gi);
console.log(`\nindex.html inline scripts count: ${scriptMatches ? scriptMatches.length : 0}`);
if (scriptMatches) {
  scriptMatches.forEach((s, idx) => {
    if (s.includes('i18n') || s.includes('lang') || s.includes('locales') || s.includes('ms')) {
      console.log(`Script #${idx} snippet:`, s.substring(0, 200));
    }
  });
}
