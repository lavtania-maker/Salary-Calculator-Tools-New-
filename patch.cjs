const fs = require('fs');
const path = 'src/salary-calculator.ts';
let code = fs.readFileSync(path, 'utf8');

// Update shortExplanation for T20
code = code.replace(/"top income group"/g, '"upper income group"');

// Update groupLabel
code = code.replace(
  "groupLabel.textContent = `${incomeGroup}`;",
  "groupLabel.textContent = `${incomeGroup} (${subGroup})`;"
);

// Update description body
const descStartStr = `const descriptionEl = document.getElementById("resIncomeGroupDescription");`;
const descEndStr = `const section = document.getElementById("incomeGroupSection");`;
const startIndex = code.indexOf(descStartStr);
const endIndex = code.indexOf(descEndStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newDesc = `const descriptionEl = document.getElementById("resIncomeGroupDescription");
    if (descriptionEl) {
      const isMs = typeof window !== "undefined" && (window.location.pathname.startsWith("/ms/") || window.location.pathname === "/ms" || document.documentElement.lang === "ms");
      
      descriptionEl.innerHTML = isMs 
        ? \`Dengan jumlah pendapatan bulanan anda, anda berada dalam <strong style="color: \${groupColor}; font-weight: 800;">kategori \${incomeGroup} (\${subGroup}) (\${shortExplanationMs})</strong> di Malaysia.\`
        : \`With your total monthly income, you're in the <strong style="color: \${groupColor}; font-weight: 800;">\${incomeGroup} (\${subGroup}) category (\${shortExplanation})</strong> in Malaysia.\`;
    }

    `;
  code = code.substring(0, startIndex) + newDesc + code.substring(endIndex);
}

// Update trackPct for B40
code = code.replace(
  "trackPct = (grossSalary / 5250) * 50;",
  "trackPct = 50; // Spans fully across B40 section connecting to M40 circle"
);

fs.writeFileSync(path, code);
