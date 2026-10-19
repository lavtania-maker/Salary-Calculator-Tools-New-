const fs = require('fs');
let html = fs.readFileSync('hourly-rate.html', 'utf8');

// Also remove resActiveMethod from calculate function body completely
html = html.replace(/const resActiveMethod = document.getElementById\('resActiveMethod'\);\s*/g, '');

fs.writeFileSync('hourly-rate.html', html);
