const fs = require('fs');
let html = fs.readFileSync('epf-kwsp.html', 'utf8');

// The clean up script added this: <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 16px; letter-spacing: -0.025em;">
// Let's replace those inline styles back to <h2> so CSS can take over!
html = html.replace(/<h2 style="font-size: 1.5rem; font-weight: 800; color: var\(--text-main\); margin-bottom: 16px; letter-spacing: -0.025em;">/g, '<h2>');

// Wait, the official government salary calc section has an h2 with margin-bottom 10px instead, leave that or remove it?
html = html.replace(/<h2 style="font-size: 1.5rem; font-weight: 800; color: var\(--text-main\); margin-bottom: 10px; letter-spacing: -0.025em;">/g, '<h2>');

fs.writeFileSync('epf-kwsp.html', html);
console.log('done');
