const fs = require('fs');
const glob = require('glob'); // Not available? I'll just hardcode the files.

const files = [
  'src/annual-leave-calculator.ts',
  'src/epf-kwsp.ts',
  'src/overtime-calculator.ts',
  'src/pcb-calculator.ts',
  'src/salary-calculator.ts',
  'src/socso-calculator.ts'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/generatePDFReport\(\{([\s\S]*?)\}\);/, (match, p1) => {
    return `import("./lib/pdf-generator").then(({ generatePDFReport }) => {\n          generatePDFReport({${p1}});\n        });`;
  });
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
