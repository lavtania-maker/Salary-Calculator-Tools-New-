const fs = require('fs');
let html = fs.readFileSync('epf-kwsp.html', 'utf8');

// Replace general content cards with cleaner modern styles
html = html.replace(/<div class="content-card" style="margin-bottom: 2rem;">/g, 
  '<div class="content-card" style="margin-bottom: 32px; padding: 32px; background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">');

html = html.replace(/<div class="content-card" style="box-shadow: none; margin-bottom: 0;">/g, 
  '<div class="content-card" style="padding: 24px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: none;">');

html = html.replace(/<div class="content-card" style="box-shadow: none; margin-bottom: 0; background: #f8fafc;">/g, 
  '<div class="content-card" style="padding: 24px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: none;">');

html = html.replace(/<div class="content-card">/g, 
  '<div class="content-card" style="padding: 24px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: none;">');

// Update H2 and typography to be larger and bold
html = html.replace(/<h2>/g, 
  '<h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 16px; letter-spacing: -0.025em;">');

// Clean up p tag padding issue globally inside the section if any
html = html.replace(/<p\s+>/g, '<p>');

fs.writeFileSync('epf-kwsp.html', html);
console.log('Done.');
