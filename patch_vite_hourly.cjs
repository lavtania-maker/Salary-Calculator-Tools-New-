const fs = require('fs');

let config = fs.readFileSync('vite.config.ts', 'utf8');
if (!config.includes('"hourly-rate.html"')) {
  config = config.replace(
    /overtimePay: path\.resolve\(__dirname, "overtime-pay-calculator\.html"\),/g,
    'overtimePay: path.resolve(__dirname, "overtime-pay-calculator.html"),\n          hourlyRate: path.resolve(__dirname, "hourly-rate.html"),'
  );
  fs.writeFileSync('vite.config.ts', config);
}
