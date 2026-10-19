const fs = require('fs');

let html = fs.readFileSync('hourly-rate.html', 'utf8');

const oldSubmitBlock = `          const checkedDays = document.getElementById("workingDaysSelect");
          const workingDaysRaw = checkedDays ? checkedDays.value : "5";
          
          let monthlyWorkingDays = 21.67;
          if (workingDaysRaw == '5.5') monthlyWorkingDays = 23.83;
          if (workingDaysRaw == '6') monthlyWorkingDays = 26;

          const monthlyWorkingHours = monthlyWorkingDays * workingHours;
          const hourlyRate = monthlySalary / (monthlyWorkingHours || 1);`;

const newSubmitBlock = `          const calcMethodSelect = document.getElementById('calcMethod');
          const method = calcMethodSelect ? calcMethodSelect.value : 'statutory';
          const checkedDays = document.getElementById("workingDaysSelect");
          const workingDaysRaw = checkedDays ? checkedDays.value : "5";
          
          let monthlyWorkingDays = 21.67;
          if (workingDaysRaw == '5.5') monthlyWorkingDays = 23.83;
          if (workingDaysRaw == '6') monthlyWorkingDays = 26;

          let hourlyRate = 0;
          if (method === 'statutory') {
            hourlyRate = (monthlySalary / 26) / (workingHours || 8);
          } else {
            const monthlyWorkingHours = monthlyWorkingDays * (workingHours || 8);
            hourlyRate = monthlySalary / (monthlyWorkingHours || 1);
          }`;

html = html.replace(oldSubmitBlock, newSubmitBlock);

fs.writeFileSync('hourly-rate.html', html);
