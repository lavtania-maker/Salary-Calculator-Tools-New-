const fs = require('fs');

const files = [
  'index.html',
  'epf-kwsp.html',
  'socso-perkeso.html',
  'pcb-income-tax.html',
  'annual-leave-calculator.html',
  'overtime-pay-calculator.html',
  'blog.html',
  'blog-post-template.html',
  'privacy-policy.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the inline style of the footer logo
  const searchStyle = /height:\s*60px;\s*width:\s*auto;\s*object-fit:\s*contain;\s*object-position:\s*left\scenter;\s*border-radius:\s*4px;/g;
  const newStyle = "height: 60px !important; width: auto !important; max-width: none !important; object-fit: contain; object-position: left center; border-radius: 4px;";
  
  if (content.match(searchStyle)) {
    content = content.replace(searchStyle, newStyle);
  } else {
    // If it doesn't have object-position yet (maybe some files missed it?)
    const oldStyle = /height:\s*60px;\s*width:\s*auto;\s*object-fit:\s*contain;\s*border-radius:\s*4px;/g;
    content = content.replace(oldStyle, newStyle);
  }
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
