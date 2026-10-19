const fs = require('fs');

let html = fs.readFileSync('hourly-rate.html', 'utf8');

// Replace document.querySelector('input[name="workingDays"]:checked')
html = html.replace(/const checkedDays = document\.querySelector\('input\[name="workingDays"\]:checked'\);/g, 'const checkedDays = document.getElementById("workingDaysSelect");');
html = html.replace(/const workingDaysPerWeek = checkedDays \? parseFloat\(checkedDays.value\) : 5;/g, 'const workingDaysPerWeek = checkedDays ? parseFloat(checkedDays.value) : 5;');

// For the second occurrence where workingDaysRaw is defined
html = html.replace(/const workingDaysRaw = checkedDays \? checkedDays\.value : "5";/g, 'const workingDaysRaw = checkedDays ? checkedDays.value : "5";');

// In reset button
html = html.replace(/const defaultDay = document\.querySelector\('input\[name="workingDays"\]\[value="5"\]'\);\s*if\(defaultDay\) defaultDay\.checked = true;/g, 'const workingDaysSelect = document.getElementById("workingDaysSelect"); if(workingDaysSelect) workingDaysSelect.value = "5";');

fs.writeFileSync('hourly-rate.html', html);
