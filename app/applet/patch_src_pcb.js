const fs = require('fs');
let content = fs.readFileSync('src/pcb-calculator.ts', 'utf8');

const regex = /\/\/ Simplified EPF calculation \(11% of salary\)[\s\S]*?const finalReliefAndZakat = totalMonthlyRelief \+ zakat;/;
const replacement = `// EPF deduction
    const epfDeduction = totalIncome * epfRate;

    const annualIncome = (totalIncome - epfDeduction) * 12;
    const personalRelief = 9000;
    
    // totalRelief
    let totalRelief = personalRelief;
    if (hasSpouse) totalRelief += 4000;
    totalRelief += (childrenCount * 2000);
    
    const taxableIncome = annualIncome - totalRelief;

    let tax = 0;
    let bracket = "0%";
    let annualTax = 0;

    if (isNonResident) {
      annualTax = annualIncome * 0.30;
      bracket = "30%";
      tax = annualTax / 12;
    } else {
      if (taxableIncome > 0) {
        if (taxableIncome <= 5000) {
          annualTax = 0;
          bracket = "0%";
        } else if (taxableIncome <= 20000) {
          annualTax = (taxableIncome - 5000) * 0.01;
          bracket = "1%";
        } else if (taxableIncome <= 35000) {
          annualTax = 150 + (taxableIncome - 20000) * 0.03;
          bracket = "3%";
        } else if (taxableIncome <= 50000) {
          annualTax = 600 + (taxableIncome - 35000) * 0.06;
          bracket = "6%";
        } else if (taxableIncome <= 70000) {
          annualTax = 1500 + (taxableIncome - 50000) * 0.11;
          bracket = "11%";
        } else if (taxableIncome <= 100000) {
          annualTax = 3700 + (taxableIncome - 70000) * 0.19;
          bracket = "19%";
        } else if (taxableIncome <= 400000) {
          annualTax = 9400 + (taxableIncome - 100000) * 0.25;
          bracket = "25%";
        } else if (taxableIncome <= 600000) {
          annualTax = 84400 + (taxableIncome - 400000) * 0.26;
          bracket = "26%";
        } else if (taxableIncome <= 2000000) {
          annualTax = 136400 + (taxableIncome - 600000) * 0.28;
          bracket = "28%";
        } else {
          annualTax = 528400 + (taxableIncome - 2000000) * 0.30;
          bracket = "30%";
        }
        
        tax = annualTax / 12;
      }
    }
    
    // Apply zakat / rebate
    tax = tax - zakat;
    if (tax < 0) tax = 0;

    let chargeable = taxableIncome / 12;
    if (chargeable < 0) chargeable = 0;
    
    const effectiveRate = totalIncome > 0 ? (tax / totalIncome) * 100 : 0;
    const finalReliefAndZakat = (totalRelief/12) + zakat;`;

if (content.match(regex)) {
   content = content.replace(regex, replacement);
   fs.writeFileSync('src/pcb-calculator.ts', content);
   console.log('patched src/pcb-calculator.ts');
} else {
   console.log('failed to match in src/pcb-calculator.ts');
}
