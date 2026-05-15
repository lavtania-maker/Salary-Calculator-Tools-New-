import fs from 'fs';

const files = ['index.html', 'pcb-calculator.html', 'epf-kwsp.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Strip excessive inline styles from buttons to let the CSS class shine
  // e.g. <button type="submit" class="btn btn-primary" style="..."> 
  // We want to remove the style attribute entirely.
  content = content.replace(/(<button[^>]+(?:class="[^"]*btn[^"]*")[^>]+)style="[^"]*"/g, '$1');
  
  // It's possible the button has it backwards: style="..." class="...btn..."
  content = content.replace(/(<button[^>]+)style="[^"]*"([^>]+class="[^"]*btn[^"]*")/g, '$1$2');

  // Clean form-actions div inline styles
  content = content.replace(/(<div[^>]*class="[^"]*form-actions[^"]*"[^>]*)style="[^"]*"/g, '$1');

  // Add gap: 8px; to the .btn class in CSS since we stripped the inline gap
  // Wait, I will just append that to CSS manually.

  fs.writeFileSync(file, content, 'utf8');
  console.log('Cleaned inline styles in ' + file);
});

// Let's also parse calculator-styles.css to add gap to btn
const cssFile = 'public/calculator-styles.css';
let css = fs.readFileSync(cssFile, 'utf8');
if (!css.includes('gap: 8px; /* btn-gap */')) {
   css = css.replace('.btn {', '.btn {\n  gap: 8px; /* btn-gap */');
   fs.writeFileSync(cssFile, css, 'utf8');
}

