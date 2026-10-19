const fs = require('fs');
const path = 'src/salary-calculator.ts';
let code = fs.readFileSync(path, 'utf8');

const newLogic = `    if (totalIncome >= 15040) {
      incomeGroup = "T20";
      subGroup = "T2";
      groupColor = "#16a34a";
      groupBg = "#f0fdf4";
      groupBorder = "#dcfce7";
      shortExplanation = "top income group";
      shortExplanationMs = "kumpulan pendapatan tertinggi";
    } else if (totalIncome >= 11820) {
      incomeGroup = "T20";
      subGroup = "T1";
      groupColor = "#16a34a";
      groupBg = "#f0fdf4";
      groupBorder = "#dcfce7";
      shortExplanation = "top income group";
      shortExplanationMs = "kumpulan pendapatan tertinggi";
    } else if (totalIncome >= 10300) {
      incomeGroup = "M40";
      subGroup = "M4";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (totalIncome >= 8700) {
      incomeGroup = "M40";
      subGroup = "M3";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (totalIncome >= 7110) {
      incomeGroup = "M40";
      subGroup = "M2";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (totalIncome >= 5250) {
      incomeGroup = "M40";
      subGroup = "M1";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (totalIncome >= 3970) {
      incomeGroup = "B40";
      subGroup = "B4";
      groupColor = "#ef4444";
      groupBg = "#fef2f2";
      groupBorder = "#fee2e2";
      shortExplanation = "lower income group";
      shortExplanationMs = "kumpulan pendapatan rendah";
    } else if (totalIncome >= 3170) {
      incomeGroup = "B40";
      subGroup = "B3";
      groupColor = "#ef4444";
      groupBg = "#fef2f2";
      groupBorder = "#fee2e2";
      shortExplanation = "lower income group";
      shortExplanationMs = "kumpulan pendapatan rendah";
    } else if (totalIncome >= 2500) {
      incomeGroup = "B40";
      subGroup = "B2";
      groupColor = "#ef4444";
      groupBg = "#fef2f2";
      groupBorder = "#fee2e2";
      shortExplanation = "lower income group";
      shortExplanationMs = "kumpulan pendapatan rendah";
    } else {
      incomeGroup = "B40";
      subGroup = "B1";
      groupColor = "#ef4444";
      groupBg = "#fef2f2";
      groupBorder = "#fee2e2";
      shortExplanation = "lower income group";
      shortExplanationMs = "kumpulan pendapatan rendah";
    }`;

// Since the file is messed up right now, let's just find the start of the messed up block
const oldLogicStart = "    if (totalIncome >= 15040) {";
const endToken = "const groupLabel = document.getElementById(\"resIncomeGroupLabel\");";
let startIndex = code.indexOf(oldLogicStart);
let endIndex = code.indexOf(endToken);

if (startIndex > -1 && endIndex > startIndex) {
    code = code.substring(0, startIndex) + newLogic + "\n    " + code.substring(endIndex);
    fs.writeFileSync(path, code);
    console.log("Patched subGroups properly");
} else {
    console.log("Failed to find logic block", startIndex, endIndex);
}
