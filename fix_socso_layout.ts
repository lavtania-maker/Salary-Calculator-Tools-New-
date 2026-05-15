import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

// 1. Remove inline styles from `<h2>` in socsoSeoContent
content = content.replace(/<h2[^>]*style="[^"]*"[^>]*>\s*(.*?)<\/h2>/g, '<h2>$1</h2>');

// 2. Remove inline styles from `<p>` in socsoSeoContent
// Only match the specific ones to avoid collateral damage if possible, or just strip them.
// Let's replace the inline style of the p directly after h2 in socsoSeoContent
// But wait, the standard size for those paragraphs across all pages is the default p or .seo-subtitle / .card-subtitle.
// Let's just remove the style attributes from <p> and <div> inside socsoSeoContent.

// A safer way is to regex replace carefully inside socsoSeoContent.
let socsoSeoIndex = content.indexOf('id="socsoSeoContent"');
if(socsoSeoIndex !== -1) {
    let socsoEndIndex = content.indexOf('<!-- Footer -->', socsoSeoIndex);
    let chunk = content.substring(socsoSeoIndex, socsoEndIndex);
    
    // remove inline styles from h2
    chunk = chunk.replace(/<h2\s+style="[^"]*"\s*>/g, '<h2>');
    // remove inline styles from p
    chunk = chunk.replace(/<p\s+style="[^"]*"\s*>/g, '<p>');
    
    // There's a <div> that acts as a grid in socsoSeoContent. 
    // Let's change its inline style to use the standard "seo-grid-2" or similar class, or just keep grid if standard.
    chunk = chunk.replace(/<div\s+style="\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(220px,\s*1fr\)\);\s*gap:\s*16px;\s*"\s*>/g, '<div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">');
    
    // Replace back
    content = content.substring(0, socsoSeoIndex) + chunk + content.substring(socsoEndIndex);
}

// 3. Fix the SOCSO result card.
content = content.replace(/id="socsoResultCard"/, 'class="card" id="socsoResultCard"');

let socsoTitleRe = /<div\s+style="\s*display:\s*flex;\s*justify-content:\s*space-between;\s*align-items:\s*center;\s*margin-bottom:\s*0\.75rem;\s*"\s*>\s*<h2\s+class="card-title"\s+style="margin-bottom:\s*0;\s*font-size:\s*1\.1rem"\s*>\s*SOCSO Results\s*<\/h2>\s*<\/div>/g;
content = content.replace(socsoTitleRe, '<h2 class="card-title">SOCSO Results</h2>');

let socsoContentRe = /id="socsoResultsContent"\s*class="results-content"\s*style="display:\s*none;\s*padding:\s*0"/g;
content = content.replace(socsoContentRe, 'id="socsoResultsContent" class="result-content" style="display: none;"');

// In result content, remove the background/border inline wrapper
// Replace that inline style with standard result-section class style.
let socsoBoxRe = /<div\s*style="\s*background:\s*#fff;\s*border:\s*1px\s*solid\s*#e2e8f0;\s*border-radius:\s*16px;\s*padding:\s*20px;\s*box-shadow:\s*0\s*1px\s*3px\s*0\s*rgba\(0,\s*0,\s*0,\s*0\.1\);\s*"\s*>/g;
content = content.replace(socsoBoxRe, '<div class="result-section">');

let socsoEmpRowRe = /<div\s*style="\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*space-between;\s*padding:\s*12px\s*0;\s*border-bottom:\s*1px\s*solid\s*#f1f5f9;\s*"\s*>/g;
content = content.replace(socsoEmpRowRe, '<div class="result-item">');

// also need to change the inline font size styles for the employee cards to match the standard
content = content.replace(/<span\s*id="socsoEmployeeCardVal"\s*style="[^"]*"\s*>/g, '<span id="socsoEmployeeCardVal">');
content = content.replace(/<span\s*id="socsoEmployerCardVal"\s*style="[^"]*"\s*>/g, '<span id="socsoEmployerCardVal">');
content = content.replace(/<span\s*id="socsoTotalCardVal"\s*style="[^"]*"\s*>/g, '<span id="socsoTotalCardVal">');

// For total cost row
let socsoTotalRowRe = /<div\s*style="\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*space-between;\s*padding-top:\s*16px;\s*margin-top:\s*4px;\s*"\s*>/g;
content = content.replace(socsoTotalRowRe, '<div class="result-item total">');


fs.writeFileSync('index.html', content, 'utf8');
