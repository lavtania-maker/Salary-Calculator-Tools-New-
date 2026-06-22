const fs = require('fs');

const cssRules = `
/* TASK 2 TYPOGRAPHY */
.content-section {
  font-size: 0.925rem;
  line-height: 1.75;
  color: #374151;
}

.content-section h2, .content-card h2, .seo-card h2 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.content-section h3, .content-card h3, .seo-card h3 {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.content-section h2 + p, .content-section h2 + div > p,
.content-section h3 + p, .content-section h3 + div > p,
.content-card h2 + p, .seo-card h2 + p {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* SPACING */
section.content-section {
  padding-top: 48px !important;
  padding-bottom: 48px !important;
  max-width: 900px;
  margin: 0 auto;
  border-top: 1px solid #f1f5f9;
}
section.content-section:first-of-type {
  border-top: none;
}

/* CARDS */
.content-section .content-card,
.content-section .seo-card,
section.content-section > .container > .content-card,
section.content-section > .container > .seo-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px 28px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

/* TABLES */
.content-section table {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}
.content-section th, .content-section thead td {
  background: #f8fafc;
  font-size: 0.78rem;
  text-transform: uppercase;
  color: #475569;
  padding: 12px 16px;
}
.content-section tbody td {
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
  font-size: 0.9rem;
}
.content-section tbody tr:hover td {
  background: #f8fafc;
}

/* LISTS */
.content-section ul,
.content-section ol {
  font-size: 0.9rem;
  line-height: 1.8;
  color: #374151;
  padding-left: 20px;
}

/* NOTE BOXES */
.content-section .info-highlight,
.content-section .info-box,
.content-section .note-box,
.content-section .disclaimer-box {
  background: #f8fafc;
  border-left: 3px solid #3b82f6;
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
  font-size: 0.85rem;
  color: #475569;
  margin-bottom: 16px;
}

/* FAQ ACCORDION */
.faq-container details {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px 18px;
  margin-bottom: 8px;
}
.faq-container details summary {
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
}
.faq-container details p, .faq-container details div {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 8px;
  line-height: 1.6;
}

/* MOBILE */
@media (max-width: 639.98px) {
  section.content-section {
    padding: 32px 16px !important;
  }
  .content-section .seo-table-wrapper,
  .content-section .socso-table-wrapper,
  .content-section .table-responsive {
    overflow-x: auto;
  }
  .content-section .content-card,
  .content-section .seo-card {
    padding: 16px !important;
  }
  .content-section .two-column,
  .content-section .grid {
    display: flex;
    flex-direction: column;
  }
}
`;

// Append CSS to public/calculator-styles.css
const cssFile = 'public/calculator-styles.css';
if (fs.existsSync(cssFile)) {
  let existingCss = fs.readFileSync(cssFile, 'utf8');
  if (!existingCss.includes('/* TASK 2 TYPOGRAPHY */')) {
    fs.appendFileSync(cssFile, '\n' + cssRules);
  }
} else {
  fs.writeFileSync(cssFile, cssRules);
}

const jsSnippet = `
<script>
  var currentYear = new Date().getFullYear();
  document.addEventListener('DOMContentLoaded', 
  function() {
    // Update page title
    document.title = document.title
      .replace(/20\\d\\d/g, currentYear);
    
    // Update H1
    var h1 = document.querySelector('h1');
    if (h1) {
      h1.innerHTML = h1.innerHTML
        .replace(/20\\d\\d/g, currentYear);
    }
    
    // Update meta description
    var metaDesc = document.querySelector(
      'meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content',
        metaDesc.getAttribute('content')
        .replace(/20\\d\\d/g, currentYear));
    }

    // Update canonical
    var canonical = document.querySelector(
      'link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href',
        canonical.getAttribute('href')
        .replace(/20\\d\\d/g, currentYear));
    }

    // Update all h2 and h3 headings
    document.querySelectorAll('h2, h3')
    .forEach(function(el) {
      el.innerHTML = el.innerHTML
        .replace(/20\\d\\d/g, currentYear);
    });
  });
</script>
`;

const data = {
  'index.html': {
    title: 'Salary Calculator Malaysia 2026 – EPF, SOCSO, PCB & Take Home Pay',
    h1: 'Salary Calculator Malaysia (Take Home Pay) 2026',
    desc: 'Calculate your exact take home pay in Malaysia 2026. Includes EPF, SOCSO, EIS & PCB deductions. Free, instant results.'
  },
  'socso-perkeso.html': {
    title: 'SOCSO Calculator Malaysia 2026 – PERKESO Contribution Rates',
    h1: 'SOCSO (PERKESO) Calculator Malaysia 2026',
    desc: 'Check employee and employer SOCSO contributions instantly for 2026. Fast & FREE.'
  },
  'pcb-income-tax.html': {
    title: 'PCB Calculator Malaysia 2026 – Monthly Tax Deduction (MTD)',
    h1: 'PCB (Monthly Tax Deduction) Calculator 2026',
    desc: 'Calculate your PCB deduction for 2026 instantly. Updated Malaysia tax rates. FREE.'
  },
  'epf-kwsp.html': {
    title: 'EPF Calculator Malaysia 2026 – KWSP Contribution Rates',
    h1: 'EPF Calculator Malaysia (KWSP) 2026',
    desc: 'Calculate employee and employer EPF contributions for 2026 instantly. FREE.'
  },
  'annual-leave-calculator.html': {
    title: 'Annual Leave Calculator Malaysia 2026 – Employee Leave Entitlement',
    h1: 'Annual Leave Calculator Malaysia 2026',
    desc: 'Calculate annual leave entitlement based on Malaysian Employment Act 2026. Free for HR and employees.'
  }
};

const files = Object.keys(data);
const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1f9ff}\u{1f200}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Insert script before </head>
  if (!content.includes('var currentYear = new Date().getFullYear();')) {
    content = content.replace('</head>', jsSnippet + '</head>');
    changed = true;
  }

  // Replace Title
  content = content.replace(/<title>([^<]+)<\/title>/i, `<title>${data[file].title}</title>`);
  
  // Replace H1
  // We match the first h1.
  content = content.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/i, `<h1$1>${data[file].h1}</h1>`);

  // Replace Meta Desc
  content = content.replace(/<meta\s+name="description"\s+content="([^"]*)"/i, `<meta name="description" content="${data[file].desc}"`);

  // Remove emojis from h2 and h3
  content = content.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, innerHTML) => {
    // some <h2 class="card-title"> shouldn't have emojis stripped if inside calculator? 
    // The user said: "No emoji icons — remove all emoji from headings across all 5 pages"
    let newInner = innerHTML.replace(emojiRegex, '');
    newInner = newInner.replace(/<span>\s*<\/span>\s*/g, '');
    newInner = newInner.replace(/<span[^>]*>\s*<\/span>\s*/g, '');
    // Also replace old years with 2026 statically in headings just to be safe
    newInner = newInner.replace(/2024|2025/g, '2026');
    return `<${tag}${attrs}>${newInner}</${tag}>`;
  });

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
