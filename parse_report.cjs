const fs = require('fs');
const report = JSON.parse(fs.readFileSync('detailed_audit_report.json', 'utf8'));

for (const [url, data] of Object.entries(report)) {
  console.log(`\n======================================================`);
  console.log(`URL: ${url}`);
  console.log(`Title: ${data.title}`);
  console.log(`H1: ${data.h1}`);
  console.log(`Untranslated count: ${data.untranslatedElements.length}`);
  data.untranslatedElements.forEach((el, idx) => {
    console.log(`  [${idx+1}] <${el.tag}>: "${el.text}"`);
  });
}
