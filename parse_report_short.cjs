const fs = require('fs');
const report = JSON.parse(fs.readFileSync('detailed_audit_report.json', 'utf8'));

Object.keys(report).forEach(url => {
  const d = report[url];
  console.log(`URL: ${url} -> Untranslated items: ${d.untranslatedElements.length}`);
  if (d.untranslatedElements.length > 0) {
    d.untranslatedElements.slice(0, 5).forEach(e => console.log(`   <${e.tag}> ${e.text.substring(0, 70)}`));
  }
});
