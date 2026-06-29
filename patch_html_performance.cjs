const fs = require('fs');
const path = require('path');




// Target directory paths
const dirs = ['.', 'dist'];




const oldLogo = 'https://s3-ap-southeast-1.amazonaws.com/ricebowl/images/marketing-campaign/image-3c82ee7b-8135-40c5-80cd-6e1717bf265e.jpg';
const oldIcon = 'https://s3-ap-southeast-1.amazonaws.com/ricebowl/images/marketing-campaign/image-a042dd24-6c42-4872-bcca-15280045d191.png';
const oldEpf = 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Employees_Provident_Fund_%28Malaysia%29_logo.svg/1280px-Employees_Provident_Fund_%28Malaysia%29_logo.svg.png';
const oldSocso = 'https://vectorseek.com/wp-content/uploads/2023/09/Perkeso-Socso-Logo-Vector.svg-.png';
const oldLhdn = 'https://www.ajobthing.com/resources/blog/data/blog/images/2026/05/LHDN_logo%20(1).png';




function optimizeHtmlFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  // Skip blog-admin.html and blog.html - they have complex inline JS
  var skipFiles = ['blog-admin.html', 'blog.html'];
  if (skipFiles.some(function(f){ return filePath.endsWith(f); })) { console.log('Skipping: ' + filePath); return; }
  console.log(`Optimizing file: ${filePath}`);
  let html = fs.readFileSync(filePath, 'utf8');




  // 1. Optimize Google Fonts to non-render-blocking
  const originalFontsPattern = /<link\s+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:wght@400;500;600;700&display=swap"\s+rel="stylesheet"\s*\/?>/gi;
  const optimizedFonts = `<!-- Asynchronously loaded Google Fonts to prevent render-blocking -->
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />`;
  html = html.replace(originalFontsPattern, optimizedFonts);




  // Alternative font pattern matching for possible single-quoted or variations
  html = html.replace(/<link[^>]*fonts\.googleapis\.com\/css2[^>]*>/gi, (match) => {
    if (match.includes('media="print"')) return match; // already optimized
    return `<!-- Optimized Fonts -->
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />`;
  });




  // 2. Optimize calculator-styles.css to non-render-blocking
  html = html.replace(/<link\s+rel="stylesheet"\s+href="\/calculator-styles\.css"\s*\/?>/gi, `<!-- Optimized CSS loading to prevent render-blocking -->
    <link rel="preload" href="/calculator-styles.css" as="style" />
    <link rel="stylesheet" href="/calculator-styles.css" media="print" onload="this.media='all'" />`);
