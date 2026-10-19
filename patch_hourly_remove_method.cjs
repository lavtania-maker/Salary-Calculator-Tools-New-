const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('hourly-rate.html', 'utf8');

// 1. Remove the Calculation Method dropdown
const formPattern = /<!-- Calculation Method -->[\s\S]*?<\/div>[\s\S]*?(?=<div style="display: grid;)/;
html = html.replace(formPattern, '');

// 2. Fix the working days select (remove disabled)
html = html.replace(/<select id="workingDaysSelect" class="form-select" disabled="">/g, '<select id="workingDaysSelect" class="form-select">');
html = html.replace(/<select id="workingDaysSelect" class="form-select" disabled>/g, '<select id="workingDaysSelect" class="form-select">');

// 3. The JS logic for calc method toggling
const toggleScript = `    const calcMethodSelect = document.getElementById('calcMethod');
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
    }`;
html = html.replace(toggleScript, "    const workingDaysSelect = document.getElementById('workingDaysSelect');");

// 4. Update the calculate function
const oldCalculateBlock = `    function calculate() {
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
        // Calculate Monthly Working Hours using the schedule: (Working Days Per Week * Working Hours Per Day * 52) / 12
        let actualMonthlyWorkingDays = (workingDaysPerWeek * 52) / 12;
        monthlyWorkingHours = actualMonthlyWorkingDays * workingHours;
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
      }`;

const newCalculateBlock = `    function calculate() {
      const monthlySalary = parseFloat(monthlySalaryInput.value) || 0;
      const workingHours = parseFloat(workingHoursInput.value) || 8;
      const workingDaysPerWeek = workingDaysSelect ? parseFloat(workingDaysSelect.value) : 5;

      if (monthlySalary <= 0 || workingHours <= 0) return;

      let hourlyRate, dailySalary, monthlyWorkingHours, activeMethodText, calculationStepsHtml;
      
      const resSubtitleTag = document.getElementById('resSubtitleTag');
      const otRatesPanel = document.getElementById('otRatesPanel');
      const resActiveMethod = document.getElementById('resActiveMethod');
      const resCalcSteps = document.getElementById('resCalcSteps');
      
      // Statutory EA 1955 Method (Malaysian Labor Law standard)
      dailySalary = monthlySalary / 26;
      hourlyRate = dailySalary / workingHours;
      // Calculate Monthly Working Hours using the schedule: (Working Days Per Week * Working Hours Per Day * 52) / 12
      let actualMonthlyWorkingDays = (workingDaysPerWeek * 52) / 12;
      monthlyWorkingHours = actualMonthlyWorkingDays * workingHours;
      activeMethodText = "26 Days (Statutory)";
      
      if(resSubtitleTag) resSubtitleTag.textContent = "(Statutory EA 1955 Rate)";
      if(otRatesPanel) otRatesPanel.style.display = "block";
      
      const ot15 = hourlyRate * 1.5;
      const ot20 = hourlyRate * 2.0;
      const ot30 = hourlyRate * 3.0;
      
      const elOT15 = document.getElementById('resOT15');
      const elOT20 = document.getElementById('resOT20');
      const elOT30 = document.getElementById('resOT30');
      
      if (elOT15) elOT15.textContent = formatCurrency(ot15) + '/hr';
      if (elOT20) elOT20.textContent = formatCurrency(ot20) + '/hr';
      if (elOT30) elOT30.textContent = formatCurrency(ot30) + '/hr';
      
      calculationStepsHtml = \`
        <div style="margin-bottom: 8px;"><strong>1. Daily Salary (ORP):</strong> <br/> \${formatCurrency(monthlySalary)} ÷ 26 days = <strong>\${formatCurrency(dailySalary)}/day</strong></div>
        <div><strong>2. Hourly Rate (HRP):</strong> <br/> \${formatCurrency(dailySalary)} ÷ \${workingHours} hrs = <strong>\${formatCurrency(hourlyRate)}/hr</strong></div>
      \`;`;

html = html.replace(oldCalculateBlock, newCalculateBlock);


// 5. Clean up email form handler
const oldEmailForm = `          const calcMethodSelect = document.getElementById('calcMethod');
          const method = calcMethodSelect ? calcMethodSelect.value : 'statutory';
          const checkedDays = document.getElementById("workingDaysSelect");
          const workingDaysRaw = checkedDays ? checkedDays.value : "5";
          const workingDaysPerWeek = parseFloat(workingDaysRaw);
          
          let hourlyRate = 0;
          if (method === 'statutory') {
            hourlyRate = (monthlySalary / 26) / (workingHours || 8);
          } else {
            let monthlyWorkingDays = (workingDaysPerWeek * 52) / 12;
            const monthlyWorkingHours = monthlyWorkingDays * (workingHours || 8);
            hourlyRate = monthlySalary / (monthlyWorkingHours || 1);
          }`;

const newEmailForm = `          const checkedDays = document.getElementById("workingDaysSelect");
          const workingDaysRaw = checkedDays ? checkedDays.value : "5";
          const workingDaysPerWeek = parseFloat(workingDaysRaw);
          
          let hourlyRate = (monthlySalary / 26) / (workingHours || 8);`;

html = html.replace(oldEmailForm, newEmailForm);


// 6. Remove the "Calculation Method" from results view row? 
// 
// <div class="result-item" style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between;">
//   <span>Calculation Method</span>
//   <span id="resActiveMethod" style="font-weight: 600; font-size: 13px; color: #475569;">26 Days (Statutory)</span>
// </div>

const resultsPattern = /<div class="result-item" style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between;">[\s]*<span>Calculation Method<\/span>[\s]*<span id="resActiveMethod" style="font-weight: 600; font-size: 13px; color: #475569;">26 Days \(Statutory\)<\/span>[\s]*<\/div>/;

html = html.replace(resultsPattern, '');


fs.writeFileSync('hourly-rate.html', html);
