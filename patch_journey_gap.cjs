const fs = require('fs');
const path = 'src/salary-calculator.ts';
let code = fs.readFileSync(path, 'utf8');

// Replace function signature
code = code.replace(
  "function updatePremiumIncomeJourney(totalIncome: number) {",
  "function updatePremiumIncomeJourney(totalIncome: number, grossSalary: number) {"
);

// Replace the call site
const oldCall = "updatePremiumIncomeJourney(totalIncome);";
const newCall = "updatePremiumIncomeJourney(totalIncome, grossSalary);";
code = code.replace(oldCall, newCall);

// Inside updatePremiumIncomeJourney, find the amountNeeded calculation
const oldAmountNeeded = "amountNeeded = upperBound - totalIncome;";
const newAmountNeeded = "amountNeeded = upperBound - grossSalary;";
code = code.replace(oldAmountNeeded, newAmountNeeded);

fs.writeFileSync(path, code);
console.log("Patched amountNeeded to use grossSalary");
