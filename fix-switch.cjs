const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const oldSalaryHero = `// Update Hero
            if (heroTitle)
              heroTitle.textContent =
                "Salary Calculator Malaysia (Take Home Pay)";
            if (heroSubtitle)
              heroSubtitle.textContent =
                "Calculate Salary, EPF, SOCSO, EIS and PCB Contributions for FREE.";
            document.title =
              "Salary Calculator Malaysia (Take Home Pay) | EPF, SOCSO, EIS, PCB";`;

const newSalaryHero = `// Update Hero
            var currentYear = new Date().getFullYear();
            if (heroTitle)
              heroTitle.textContent =
                "Salary Calculator Malaysia (Take Home Pay) " + currentYear;
            if (heroSubtitle)
              heroSubtitle.textContent =
                "Calculate Salary, EPF, SOCSO, EIS and PCB Contributions for FREE.";
            document.title =
              "Salary Calculator Malaysia " + currentYear + " – EPF, SOCSO, PCB & Take Home Pay";
            var metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute("content", "Calculate your exact take home pay in Malaysia " + currentYear + ". Includes EPF, SOCSO, EIS & PCB deductions. Free, instant results.");`;

content = content.replace(oldSalaryHero, newSalaryHero);

const oldSocsoHero = `// Update Hero
            if (heroTitle)
              heroTitle.textContent = "SOCSO (PERKESO) Calculator Malaysia";
            if (heroSubtitle)
              heroSubtitle.textContent =
                "Check employee and employer SOCSO contributions instantly, FAST & FREE.";
            document.title =
              "SOCSO (PERKESO) Calculator Malaysia | Check employee and employer SOCSO contributions";`;

const newSocsoHero = `// Update Hero
            var currentYear = new Date().getFullYear();
            if (heroTitle)
              heroTitle.textContent = "SOCSO (PERKESO) Calculator Malaysia " + currentYear;
            if (heroSubtitle)
              heroSubtitle.textContent =
                "Check employee and employer SOCSO contributions instantly, FAST & FREE.";
            document.title =
              "SOCSO Calculator Malaysia " + currentYear + " – PERKESO Contribution Rates";
            var metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute("content", "Check employee and employer SOCSO contributions instantly for " + currentYear + ". Fast & FREE.");`;

content = content.replace(oldSocsoHero, newSocsoHero);

fs.writeFileSync('index.html', content);
console.log('Fixed switchToolTab');
