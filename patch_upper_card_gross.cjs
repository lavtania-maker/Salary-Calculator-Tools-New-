const fs = require('fs');
const path = 'src/salary-calculator.ts';
let code = fs.readFileSync(path, 'utf8');

// Replace totalIncome with grossSalary in the incomeGroup classification block
const oldLogicStart = "    let groupBg = \"#fef2f2\";";
const newLogicStart = "    let groupBg = \"#fef2f2\";";

// Basically replacing `totalIncome >= ` with `grossSalary >= ` in that block
let startIndex = code.indexOf(oldLogicStart);
let endIndex = code.indexOf("const groupLabel = document.getElementById(\"resIncomeGroupLabel\");");

if (startIndex > -1 && endIndex > startIndex) {
    let block = code.substring(startIndex, endIndex);
    block = block.replace(/totalIncome >= /g, "grossSalary >= ");
    code = code.substring(0, startIndex) + block + code.substring(endIndex);
    fs.writeFileSync(path, code);
    console.log("Patched upper card to use grossSalary");
} else {
    console.log("Failed to find logic block");
}
