const fs = require('fs');
let html = fs.readFileSync('hourly-rate.html', 'utf8');

// Replace the entire DOMContentLoaded block or just the contents
// We can use a regex to replace the calculate function and variable definitions

const newScript = `
    const calcMethodSelect = document.getElementById('calcMethod');
    const workingDaysSelect = document.getElementById('workingDaysSelect');
    
    // Toggle working days based on method
    if (calcMethodSelect && workingDaysSelect) {
      calcMethodSelect.addEventListener('change', (e) => {
        if (e.target.value === 'statutory') {
          workingDaysSelect.disabled = true;
          document.getElementById('workingDaysNote').style.display = 'block';
        } else {
          workingDaysSelect.disabled = false;
          document.getElementById('workingDaysNote').style.display = 'none';
        }
      });
    }

    function calculate() {
      const monthlySalary = parseFloat(monthlySalaryInput.value) || 0;
      const workingHours = parseFloat(workingHoursInput.value) || 8;
      const method = calcMethodSelect ? calcMethodSelect.value : 'statutory';
      const workingDaysPerWeek = workingDaysSelect ? parseFloat(workingDaysSelect.value) : 5;

      if (monthlySalary <= 0 || workingHours <= 0) return;

      let hourlyRate, dailySalary, monthlyWorkingHours, activeMethodText, calculationStepsHtml;
      
      const resSubtitleTag = document.getElementById('resSubtitleTag');
      const otRatesPanel = document.getElementById('otRatesPanel');
      const resActiveMethod = document.getElementById('resActiveMethod');
      const resCalcSteps = document.getElementById('resCalcSteps');
      
      if (method === 'statutory') {
        // Statutory EA 1955 Method (Malaysian Labor Law standard)
        dailySalary = monthlySalary / 26;
        hourlyRate = dailySalary / workingHours;
        monthlyWorkingHours = 26 * workingHours;
        activeMethodText = "26 Days (Statutory)";
        
        if(resSubtitleTag) resSubtitleTag.textContent = "(Statutory EA 1955 Rate)";
        if(otRatesPanel) otRatesPanel.style.display = "block";
        
        const ot15 = hourlyRate * 1.5;
        const ot20 = hourlyRate * 2.0;
        const ot30 = hourlyRate * 3.0;
        
        document.getElementById('resOT15').textContent = formatCurrency(ot15) + '/hr';
        document.getElementById('resOT20').textContent = formatCurrency(ot20) + '/hr';
        document.getElementById('resOT30').textContent = formatCurrency(ot30) + '/hr';
        
        calculationStepsHtml = \`
          <div style="margin-bottom: 8px;"><strong>1. Daily Salary (ORP):</strong> <br/> \${formatCurrency(monthlySalary)} ÷ 26 days = <strong>\${formatCurrency(dailySalary)}/day</strong></div>
          <div><strong>2. Hourly Rate (HRP):</strong> <br/> \${formatCurrency(dailySalary)} ÷ \${workingHours} hrs = <strong>\${formatCurrency(hourlyRate)}/hr</strong></div>
        \`;
      } else {
        // Calendar Average Method
        let monthlyWorkingDays = (workingDaysPerWeek * 52) / 12;
        monthlyWorkingHours = monthlyWorkingDays * workingHours;
        dailySalary = monthlySalary / monthlyWorkingDays;
        hourlyRate = monthlySalary / monthlyWorkingHours;
        activeMethodText = \`\${monthlyWorkingDays.toFixed(2)} Days (Calendar Avg)\`;
        
        if(resSubtitleTag) resSubtitleTag.textContent = "(Calendar Average Rate)";
        if(otRatesPanel) otRatesPanel.style.display = "none";
        
        calculationStepsHtml = \`
          <div style="margin-bottom: 8px;"><strong>1. Monthly Working Days:</strong> <br/> (\${workingDaysPerWeek} days × 52 weeks) ÷ 12 = <strong>\${monthlyWorkingDays.toFixed(2)} days</strong></div>
          <div style="margin-bottom: 8px;"><strong>2. Monthly Working Hours:</strong> <br/> \${monthlyWorkingDays.toFixed(2)} days × \${workingHours} hrs = <strong>\${monthlyWorkingHours.toFixed(2)} hrs</strong></div>
          <div><strong>3. Hourly Rate:</strong> <br/> \${formatCurrency(monthlySalary)} ÷ \${monthlyWorkingHours.toFixed(2)} hrs = <strong>\${formatCurrency(hourlyRate)}/hr</strong></div>
        \`;
      }

      if (resHourlyRate) resHourlyRate.textContent = formatCurrency(hourlyRate);
      if (resDailySalary) resDailySalary.textContent = formatCurrency(dailySalary);
      if (resMonthlyHours) resMonthlyHours.textContent = monthlyWorkingHours.toFixed(2) + ' hours';
      if (resActiveMethod) resActiveMethod.textContent = activeMethodText;
      if (resCalcSteps) resCalcSteps.innerHTML = calculationStepsHtml;

      if (resultsPlaceholder) resultsPlaceholder.style.display = 'none';
      if (resultsContent) {
        resultsContent.style.display = 'block';
        setTimeout(() => {
          resultsContent.style.opacity = '1';
        }, 10);
      }
      
      if (typeof gtag === 'function') {
        gtag('event', 'calculate_hourly', {
          'salary': monthlySalary,
          'method': method
        });
      }
    }
`;

html = html.replace(/function calculate\(\) \{[\s\S]*?(?=if\(calculateBtn\))/m, newScript);

fs.writeFileSync('hourly-rate.html', html);
