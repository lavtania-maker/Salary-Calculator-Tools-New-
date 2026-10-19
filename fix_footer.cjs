const fs = require('fs');
const glob = require('glob');

const files = [
  'index.html',
  'epf-kwsp.html',
  'socso-perkeso.html',
  'pcb-income-tax.html',
  'annual-leave-calculator.html',
  'overtime-pay-calculator.html',
  'blog.html',
  'public/blog-post-template.html',
  'privacy-policy.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // We want to replace the footer section.
  // The structure is:
  // <footer class="footer"> ... </footer>
  
  // We'll use a regex to match from <footer class="footer"> to </footer>
  const footerRegex = /<footer class="footer">([\s\S]*?)<\/footer>/g;
  
  content = content.replace(footerRegex, (match, inner) => {
    // We need to move the copyright text from .footer-bottom to .footer-col
    // Let's parse it somewhat manually.
    
    // 1. Find the .footer-bottom content
    const bottomRegex = /<div class="footer-bottom">([\s\S]*?)<\/div>/;
    const bottomMatch = inner.match(bottomRegex);
    let bottomContent = bottomMatch ? bottomMatch[1].trim() : '';
    
    // 2. Remove .footer-bottom from inner
    let newInner = inner.replace(/<div class="footer-bottom">[\s\S]*?<\/div>/, '');
    
    // 3. Find the end of .footer-col (the first one)
    // The first one is Logo + Description.
    // It looks like:
    // <div class="footer-col">
    // ...
    // </p>
    // </div>
    
    // We can inject the bottomContent right before the closing </div> of the first .footer-col
    let injected = false;
    newInner = newInner.replace(/(<div class="footer-col">[\s\S]*?)(<\/div>)/, (m, p1, p2) => {
      injected = true;
      return p1 + '\n            <div style="margin-top: 24px; font-size: 15px; color: #64748b;">\n              ' + bottomContent.replace(/<p/g, '<p').replace(/<\/p>/g, '</p>') + '\n            </div>\n          ' + p2;
    });
    
    if (injected) {
      // Also we need to check if the image has object-position left.
      newInner = newInner.replace(/object-fit:\s*contain;/, 'object-fit: contain;\n                  object-position: left center;');
      // And just in case, ensure the image doesn't have a width: auto that makes it center if it were in a different setup.
    }
    
    return `<footer class="footer">${newInner}</footer>`;
  });
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
