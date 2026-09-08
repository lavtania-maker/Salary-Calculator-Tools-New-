const fs = require('fs');
const path = 'src/salary-calculator.ts';
let code = fs.readFileSync(path, 'utf8');

const oldB40Str = `    if (currentGroup === "B40") {
      trackPct = 50; // Spans fully across B40 section connecting to M40 circle
    } else if (currentGroup === "M40") {
      trackPct = 50 + ((grossSalary - 5250) / (11820 - 5250)) * 50;
    }`;

const newB40Str = `    if (currentGroup === "B40") {
      const linePercent = Math.min((grossSalary / 5249) * 100, 92);
      trackPct = linePercent * 0.5;
    } else if (currentGroup === "M40") {
      const linePercent = Math.min(((grossSalary - 5250) / (11820 - 5250)) * 100, 92);
      trackPct = 50 + (linePercent * 0.5);
    }`;

code = code.replace(oldB40Str, newB40Str);
fs.writeFileSync(path, code);
