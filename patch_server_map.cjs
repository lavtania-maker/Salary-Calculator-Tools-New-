const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf8');
if (!server.includes('"/hourly-rate": "hourly-rate.html"')) {
  server = server.replace(
    /"\/overtime-pay-calculator": "overtime-pay-calculator\.html",/g,
    '"/overtime-pay-calculator": "overtime-pay-calculator.html",\n      "/hourly-rate": "hourly-rate.html",\n      "/hourly-rate.html": "hourly-rate.html",'
  );
  fs.writeFileSync('server.ts', server);
}
