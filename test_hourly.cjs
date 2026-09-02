const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const html = fs.readFileSync('hourly-rate.html', 'utf8');
const dom = new JSDOM(html, { runScripts: "dangerously" });

setTimeout(() => {
  const btn = dom.window.document.getElementById('calculateBtn');
  console.log("Button found:", !!btn);
  if (btn) {
    const salary = dom.window.document.getElementById('monthlySalary');
    if (salary) salary.value = "3000";
    
    btn.click();
    console.log("resHourlyRate:", dom.window.document.getElementById('resHourlyRate').textContent);
  }
}, 500);
