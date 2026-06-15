const fs = require('fs');

const pcbLogicOld = `            // 5. PCB (LHDN Progressive Logic)
            let pcb = 0;
            if (includePcb) {
              const annualIncome = totalIncome * 12;
              const epfRelief = Math.min(epf * 12, 4000);
              const personalRelief = 9000;

              let spouseRelief = 0;
              let childRelief = 0;

              switch (maritalStatus) {
                case "single":
                  break;
                case "married_spouse_not_working_no_child":
                  spouseRelief = 4000;
                  break;
                case "married_1_child_spouse_not_working":
                  spouseRelief = 4000;
                  childRelief = 2000;
                  break;
                case "married_2_children_spouse_not_working":
                  spouseRelief = 4000;
                  childRelief = 4000;
                  break;
                case "married_spouse_working_no_child":
                  break;
                case "married_1_child_spouse_working":
                  childRelief = 2000;
                  break;
                case "married_2_children_spouse_working":
                  childRelief = 4000;
                  break;
              }

              const totalRelief =
                personalRelief + epfRelief + spouseRelief + childRelief;
              const taxableIncome = annualIncome - totalRelief;

              if (taxableIncome > 0) {
                let annualTax = 0;
                if (taxableIncome <= 5000) {
                  annualTax = 0;
                } else if (taxableIncome <= 20000) {
                  annualTax = (taxableIncome - 5000) * 0.01;
                } else if (taxableIncome <= 35000) {
                  annualTax = 150 + (taxableIncome - 20000) * 0.03;
                } else if (taxableIncome <= 50000) {
                  annualTax = 600 + (taxableIncome - 35000) * 0.08;
                } else if (taxableIncome <= 70000) {
                  annualTax = 1800 + (taxableIncome - 50000) * 0.11;
                } else if (taxableIncome <= 100000) {
                  annualTax = 4000 + (taxableIncome - 70000) * 0.19;
                } else if (taxableIncome <= 400000) {
                  annualTax = 9700 + (taxableIncome - 100000) * 0.25;
                } else if (taxableIncome <= 600000) {
                  annualTax = 84700 + (taxableIncome - 400000) * 0.26;
                } else if (taxableIncome <= 2000000) {
                  annualTax = 136700 + (taxableIncome - 600000) * 0.28;
                } else {
                  annualTax = 528700 + (taxableIncome - 2000000) * 0.3;
                }

                // Tax rebate for low income
                if (taxableIncome <= 35000) {
                  annualTax = Math.max(0, annualTax - 400);
                }

                pcb = annualTax / 12;
              }
            }`;

const pcbLogicNew = `            // 5. PCB (LHDN Progressive Logic)
            let pcb = 0;
            if (includePcb) {
              const annualIncome = (totalIncome - epf) * 12;
              const personalRelief = 9000;

              let spouseRelief = 0;
              let childRelief = 0;

              switch (maritalStatus) {
                case "single":
                  break;
                case "married_spouse_not_working_no_child":
                  spouseRelief = 4000;
                  break;
                case "married_1_child_spouse_not_working":
                  spouseRelief = 4000;
                  childRelief = 2000;
                  break;
                case "married_2_children_spouse_not_working":
                  spouseRelief = 4000;
                  childRelief = 4000;
                  break;
                case "married_spouse_working_no_child":
                  break;
                case "married_1_child_spouse_working":
                  childRelief = 2000;
                  break;
                case "married_2_children_spouse_working":
                  childRelief = 4000;
                  break;
              }

              const totalRelief = personalRelief + spouseRelief + childRelief;
              const taxableIncome = annualIncome - totalRelief;

              if (taxableIncome > 0) {
                let annualTax = 0;
                if (taxableIncome <= 5000) {
                  annualTax = 0;
                } else if (taxableIncome <= 20000) {
                  annualTax = (taxableIncome - 5000) * 0.01;
                } else if (taxableIncome <= 35000) {
                  annualTax = 150 + (taxableIncome - 20000) * 0.03;
                } else if (taxableIncome <= 50000) {
                  annualTax = 600 + (taxableIncome - 35000) * 0.06;
                } else if (taxableIncome <= 70000) {
                  annualTax = 1500 + (taxableIncome - 50000) * 0.11;
                } else if (taxableIncome <= 100000) {
                  annualTax = 3700 + (taxableIncome - 70000) * 0.19;
                } else if (taxableIncome <= 400000) {
                  annualTax = 9400 + (taxableIncome - 100000) * 0.25;
                } else if (taxableIncome <= 600000) {
                  annualTax = 84400 + (taxableIncome - 400000) * 0.26;
                } else if (taxableIncome <= 2000000) {
                  annualTax = 136400 + (taxableIncome - 600000) * 0.28;
                } else {
                  annualTax = 528400 + (taxableIncome - 2000000) * 0.30;
                }

                pcb = annualTax / 12;
              }
            }`;

for (const file of ['index.html', 'pcb-income-tax.html']) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(pcbLogicOld)) {
     content = content.replace(pcbLogicOld, pcbLogicNew);
     fs.writeFileSync(file, content);
     console.log('Fixed PCB in ' + file);
  } else {
     // fallback regex if formatting differs
     const re = /let pcb = 0;[\s\S]*?pcb = annualTax \/ 12;\s*}\s*}/;
     if (re.test(content)) {
         content = content.replace(re, pcbLogicNew.replace('            // 5. PCB (LHDN Progressive Logic)\\n', ''));
         fs.writeFileSync(file, content);
         console.log('Fixed PCB (regex) in ' + file);
     } else {
         console.log('PCB block not found in ' + file);
     }
  }
}
