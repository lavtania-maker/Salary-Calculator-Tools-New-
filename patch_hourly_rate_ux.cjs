const fs = require('fs');

let html = fs.readFileSync('hourly-rate.html', 'utf8');

// 1. Fix the note text
const oldNote = `<div id="workingDaysNote" style="font-size: 11px; color: #64748b; margin-top: 4px;">Statutory Ordinary Rate of Pay (ORP) uses a fixed 26-day monthly divisor under Section 60I of EA 1955.</div>`;
const newNote = `<div id="workingDaysNote" style="font-size: 11px; color: #64748b; margin-top: 4px;">Statutory rate uses a fixed 26-day monthly divisor per Section 60I of EA 1955 regardless of days per week.</div>`;

html = html.replace(oldNote, newNote);

// 2. Fix the calculation
const oldCalc = `      if (method === 'statutory') {
        // Statutory EA 1955 Method (Malaysian Labor Law standard)
        dailySalary = monthlySalary / 26;
        hourlyRate = dailySalary / workingHours;
        monthlyWorkingHours = 26 * workingHours;
        activeMethodText = "26 Days (Statutory)";`;

const newCalc = `      if (method === 'statutory') {
        // Statutory EA 1955 Method (Malaysian Labor Law standard)
        dailySalary = monthlySalary / 26;
        hourlyRate = dailySalary / workingHours;
        // Calculate Monthly Working Hours using the schedule: (Working Days Per Week * Working Hours Per Day * 52) / 12
        let actualMonthlyWorkingDays = (workingDaysPerWeek * 52) / 12;
        monthlyWorkingHours = actualMonthlyWorkingDays * workingHours;
        activeMethodText = "26 Days (Statutory)";`;

html = html.replace(oldCalc, newCalc);

fs.writeFileSync('hourly-rate.html', html);
