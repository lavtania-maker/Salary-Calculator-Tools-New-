const fs = require('fs');
const path = 'src/salary-calculator.ts';
let code = fs.readFileSync(path, 'utf8');

// Replace totalIncome with grossSalary for progress calculation in the function
code = code.replace(
  "progressPct = Math.round((totalIncome / upperBound) * 100);",
  "progressPct = Math.round((grossSalary / upperBound) * 100);"
);

code = code.replace(
  "trackPct = (totalIncome / 5250) * 50;",
  "trackPct = (grossSalary / 5250) * 50;"
);

code = code.replace(
  "trackPct = 50 + ((totalIncome - 5250) / (11820 - 5250)) * 50;",
  "trackPct = 50 + ((grossSalary - 5250) / (11820 - 5250)) * 50;"
);

// Fix the totalIncome usage in currentGroup assignment
// Wait, the prompt says "Based on individual monthly gross salary (RM 5,000.00)..."
// And we want the journey to match the gross salary. Should currentGroup and isT20 be based on grossSalary?
// Yes! Let's change the upper conditions.

const searchConditions = `  let currentGroup = "B40";
  let nextGroup = "M40";
  let lowerBound = 0;
  let upperBound = 5250; 
  let isT20 = false;
  
  if (totalIncome >= 11820) {`;
  
const newConditions = `  let currentGroup = "B40";
  let nextGroup = "M40";
  let lowerBound = 0;
  let upperBound = 5250; 
  let isT20 = false;
  
  if (grossSalary >= 11820) {`;

code = code.replace(searchConditions, newConditions);

code = code.replace(
  "} else if (totalIncome >= 5250) {",
  "} else if (grossSalary >= 5250) {"
);

code = code.replace(
  "if (nodeM40) nodeM40.style.borderColor = totalIncome >= 5250 ? (currentGroup === \"M40\" ? \"#eab308\" : \"#16a34a\") : \"#e2e8f0\";",
  "if (nodeM40) nodeM40.style.borderColor = grossSalary >= 5250 ? (currentGroup === \"M40\" ? \"#eab308\" : \"#16a34a\") : \"#e2e8f0\";"
);

code = code.replace(
  "if (nodeT20) nodeT20.style.borderColor = totalIncome >= 11820 ? \"#16a34a\" : \"#e2e8f0\";",
  "if (nodeT20) nodeT20.style.borderColor = grossSalary >= 11820 ? \"#16a34a\" : \"#e2e8f0\";"
);

fs.writeFileSync(path, code);
console.log("Journey math updated to grossSalary");
