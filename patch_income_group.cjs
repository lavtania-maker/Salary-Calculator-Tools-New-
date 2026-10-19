const fs = require('fs');
const path = 'src/salary-calculator.ts';
let code = fs.readFileSync(path, 'utf8');

// 1. Sync label to just incomeGroup
code = code.replace(
  "groupLabel.textContent = `${incomeGroup} (${subGroup})`;",
  "groupLabel.textContent = `${incomeGroup}`;"
);

// 2. Update description logic
const searchStr = `    const descriptionEl = document.getElementById("resIncomeGroupDescription");
    if (descriptionEl) {
      const isMs = typeof window !== "undefined" && (window.location.pathname.startsWith("/ms/") || window.location.pathname === "/ms" || document.documentElement.lang === "ms");`;

const endStr = `    }

    const section = document.getElementById("incomeGroupSection");`;

const newDescriptionBlock = `    const descriptionEl = document.getElementById("resIncomeGroupDescription");
    if (descriptionEl) {
      const isMs = typeof window !== "undefined" && (window.location.pathname.startsWith("/ms/") || window.location.pathname === "/ms" || document.documentElement.lang === "ms");
      
      const formattedGross = "RM " + grossSalary.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      let rangeText = "";
      let rangeTextMs = "";
      if (incomeGroup === "B40") {
        rangeText = "Up to RM 5,249";
        rangeTextMs = "Hingga RM 5,249";
      } else if (incomeGroup === "M40") {
        rangeText = "RM 5,250 - RM 11,819";
        rangeTextMs = "RM 5,250 - RM 11,819";
      } else {
        rangeText = "RM 11,820 & above";
        rangeTextMs = "RM 11,820 & ke atas";
      }
      
      descriptionEl.innerHTML = isMs 
         ? \`Berdasarkan gaji kasar bulanan individu (\${formattedGross}), anda berada dalam tier <strong style="color: \${groupColor}; font-weight: 800;">\${incomeGroup} (\${rangeTextMs})</strong>. Nota: Klasifikasi rasmi DOSM dinilai berdasarkan jumlah pendapatan isi rumah.\`
        : \`Based on individual monthly gross salary (\${formattedGross}), you fall into the <strong style="color: \${groupColor}; font-weight: 800;">\${incomeGroup} tier (\${rangeText})</strong>. Note: Official DOSM classifications are evaluated based on total household income.\`;`;

const startIndex = code.indexOf(searchStr);
const endIndex = code.indexOf(endStr);
if (startIndex !== -1 && endIndex !== -1) {
  code = code.substring(0, startIndex) + newDescriptionBlock + code.substring(endIndex);
  fs.writeFileSync(path, code);
  console.log("Successfully patched description");
} else {
  console.log("Failed to find boundaries");
}
