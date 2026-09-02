const fs = require('fs');
let html = fs.readFileSync('hourly-rate.html', 'utf8');

// Remove activeMethodText assignment and usages
html = html.replace(/let hourlyRate, dailySalary, monthlyWorkingHours, activeMethodText, calculationStepsHtml;/g, 'let hourlyRate, dailySalary, monthlyWorkingHours, calculationStepsHtml;');
html = html.replace(/activeMethodText = "26 Days \(Statutory\)";\s*/g, '');
html = html.replace(/if\s*\(resActiveMethod\)\s*resActiveMethod\.textContent = activeMethodText;\s*/g, '');

fs.writeFileSync('hourly-rate.html', html);
