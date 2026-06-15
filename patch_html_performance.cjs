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

  // 3. Defer GTM/gtag.js to prevent early execution and thread blocks
  // Find and replace the typical inline script block for GTM
  const gtmMatchPattern = /<!-- Google tag \(gtag\.js\) -->[\s\S]*?<script[^>]*src="https:\/\/www\.googletagmanager\.com[\s\S]*?<\/script>\s*<script>[\s\S]*?<\/script>/gi;
  const delayedGTM = `<!-- Latently loaded Google Tag Manager to resolve early execution & unused JS warnings -->
    <script>
      window.addEventListener('load', function() {
        setTimeout(function() {
          const script = document.createElement('script');
          script.src = "https://www.googletagmanager.com/gtag/js?id=G-TMQV1XC09P";
          script.async = true;
          document.head.appendChild(script);

          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          window.gtag = gtag;
          gtag("js", new Date());
          gtag("config", "G-TMQV1XC09P");
        }, 1200);
      });
    </script>`;
  
  if (gtmMatchPattern.test(html)) {
    html = html.replace(gtmMatchPattern, delayedGTM);
  } else {
    // try to find individual gtag scripts and wrap them
    html = html.replace(/<script\s+defer\s+src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-TMQV1XC09P"\s*><\/script>/gi, '');
    html = html.replace(/<script>\s*window\.dataLayer\s*=[\s\S]*?gtag\("config",\s*"G-TMQV1XC09P"\);\s*<\/script>/gi, delayedGTM);
  }

  // 4. Update favicon reference
  html = html.replaceAll(oldIcon, '/favicon-ricebowl.png');

  // 5. Replace image URLs and apply width and height to prevent CLS
  
  // Custom replacements for <img> tags
  // Top nav logo (logo-img):
  const headerLogoTarget = new RegExp(`<img[^>]*src="${escapeRegExp(oldLogo)}"[^>]*class="logo-img"[^>]*>`, 'gi');
  const headerLogoReplacement = `<img src="/logo-small.png" alt="SalaryCalc MY" referrerpolicy="no-referrer" class="logo-img" width="250" height="39" />`;
  html = html.replace(headerLogoTarget, headerLogoReplacement);

  // Footer logo with height styled:
  const footerLogoTarget = new RegExp(`<img[^>]*src="${escapeRegExp(oldLogo)}"[^>]*style="[^"]*height:\\s*60px[^"]*"[^>]*>`, 'gi');
  const footerLogoReplacement = `<img src="/logo-small.png" alt="SalaryCalc MY" referrerpolicy="no-referrer" width="250" height="39" style="height: 60px; width: auto; object-fit: contain; border-radius: 4px; mix-blend-mode: screen; opacity: 0.9;" />`;
  html = html.replace(footerLogoTarget, footerLogoReplacement);

  // Other general logo replacements (replace raw src first)
  html = html.replaceAll(oldLogo, '/logo-small.png');

  // Epf Logo:
  const epfLogoTarget = new RegExp(`<img[^>]*src="${escapeRegExp(oldEpf)}"[^>]*>`, 'gi');
  const epfLogoReplacement = `<img src="/epf-logo.png" alt="EPF Logo" width="48" height="48" style="width: 48px; height: 48px; object-fit: contain;" />`;
  html = html.replace(epfLogoTarget, epfLogoReplacement);
  html = html.replaceAll(oldEpf, '/epf-logo.png');

  // Socso Logo (48px and 72px):
  // First, target the 72px one:
  const socso72Target = new RegExp(`<img[^>]*src="${escapeRegExp(oldSocso)}"[^>]*style="[^"]*width:\\s*72px[^"]*"[^>]*>`, 'gi');
  const socso72Replacement = `<img src="/perkeso-logo-vector.png" alt="PERKESO Logo" width="72" height="72" style="width: 72px; height: 72px; object-fit: contain; border-radius: 8px;" />`;
  html = html.replace(socso72Target, socso72Replacement);

  // Target any other Socso 48px:
  const socso48Target = new RegExp(`<img[^>]*src="${escapeRegExp(oldSocso)}"[^>]*>`, 'gi');
  const socso48Replacement = `<img src="/perkeso-logo-vector.png" alt="SOCSO Logo" width="48" height="48" style="width: 48px; height: 48px; object-fit: contain;" />`;
  html = html.replace(socso48Target, socso48Replacement);
  html = html.replaceAll(oldSocso, '/perkeso-logo-vector.png');

  // Lhdn Logo:
  const lhdnTarget = new RegExp(`<img[^>]*src="${escapeRegExp(oldLhdn)}"[^>]*>`, 'gi');
  const lhdnReplacement = `<img src="/lhdn-logo.png" alt="LHDN Logo" width="48" height="48" style="width: 48px; height: 48px; object-fit: contain;" />`;
  html = html.replace(lhdnTarget, lhdnReplacement);
  html = html.replaceAll(oldLhdn, '/lhdn-logo.png');

  // Ensure any standard image in the html has width/height if we missed it
  // (Adding a safe default pattern search if we find logo images)
  html = html.replace(/<img\s+src="\/logo-small\.png"\s+alt="SalaryCalc MY"\s+referrerpolicy="no-referrer"\s+class="logo-img"\s*\/?>/gi, headerLogoReplacement);

  fs.writeFileSync(filePath, html, 'utf8');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        processDirectory(fullPath);
      }
    } else if (file.endsWith('.html')) {
      optimizeHtmlFile(fullPath);
    }
  });
}

// Start processing both current workspace and dist output
dirs.forEach(dir => processDirectory(dir));
console.log('All HTML performance optimizations completed successfully!');
