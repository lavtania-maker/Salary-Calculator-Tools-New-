const fs = require('fs');
const path = 'src/salary-calculator.ts';
let code = fs.readFileSync(path, 'utf8');

// The English milestone text
code = code.replace(
  /"Awesome! You're in the top group."/g,
  '"You have reached the top income tier (T20)"'
);

// The Malay milestone text
code = code.replace(
  /"Tahniah! Anda berada di kumpulan teratas."/g,
  '"Anda telah mencapai tahap pendapatan tertinggi (T20)"'
);

fs.writeFileSync(path, code);

// Also need to update index.html if it has the static text for maxGoalContent
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
  /You're in the top household income group!/g,
  "You have reached the top income tier (T20)"
);
fs.writeFileSync('index.html', html);

console.log("Patched T20 text");
