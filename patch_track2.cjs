const fs = require('fs');
const path = 'src/salary-calculator.ts';
let code = fs.readFileSync(path, 'utf8');

const oldStr = `    if (currentGroup === "B40") {
      const linePercent = Math.min((grossSalary / 5249) * 100, 92);
      trackPct = linePercent * 0.5;
    } else if (currentGroup === "M40") {
      const linePercent = Math.min(((grossSalary - 5250) / (11820 - 5250)) * 100, 92);
      trackPct = 50 + (linePercent * 0.5);
    }`;

const newStr = `    if (grossSalary < 5250) {
      const segmentRatio = Math.min(grossSalary / 5249, 1);
      trackPct = segmentRatio * 45;
    } else if (grossSalary < 11820) {
      const segmentRatio = Math.min((grossSalary - 5250) / (11819 - 5250), 1);
      trackPct = 50 + (segmentRatio * 45);
    }`;

if (code.includes(oldStr)) {
  code = code.replace(oldStr, newStr);
  fs.writeFileSync(path, code);
  console.log('patched');
} else {
  console.error('not found');
}
