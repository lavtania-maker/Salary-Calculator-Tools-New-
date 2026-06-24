const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'socso-perkeso.html',
  'pcb-income-tax.html',
  'epf-kwsp.html',
  'annual-leave-calculator.html'
];

const titles = {
  'index.html': 'Salary Calculator Malaysia 2026 – Free EPF, SOCSO, PCB & Take Home Pay Calculator',
  'socso-perkeso.html': 'SOCSO Calculator Malaysia 2026 – Free PERKESO Employee & Employer Contribution Calculator',
  'pcb-income-tax.html': 'PCB Calculator Malaysia 2026 – Calculate Monthly Tax Deduction (MTD) FREE',
  'epf-kwsp.html': 'EPF Calculator Malaysia 2026 – Free KWSP Employee & Employer Contribution Calculator',
  'annual-leave-calculator.html': 'Annual Leave Calculator Malaysia 2026 – Calculate Employee Leave Entitlement FREE'
};

const descriptions = {
  'index.html': 'Calculate your exact take home pay in Malaysia 2026. Free salary calculator with EPF, SOCSO, EIS and PCB deductions. Instant results, no signup needed.',
  'socso-perkeso.html': 'Calculate SOCSO and EIS contributions instantly for 2026. Check employee and employer PERKESO rates by salary and age group. Free and accurate.',
  'pcb-income-tax.html': 'Calculate your PCB monthly tax deduction for 2026 instantly. Updated Malaysia income tax rates and brackets. Free PCB calculator for employees and employers.',
  'epf-kwsp.html': 'Calculate EPF KWSP contributions instantly for 2026. See employee 11% and employer 13% rates by salary. Free EPF calculator Malaysia.',
  'annual-leave-calculator.html': 'Calculate annual leave entitlement based on Malaysian Employment Act 2026. Free for HR teams and employees. Supports pro-rated leave calculation.'
};

const tools = [
  { file: 'index.html', title: 'Salary Calculator', desc: 'Calculate your exact take home pay after EPF, SOCSO, EIS & PCB deductions.', link: '/' },
  { file: 'socso-perkeso.html', title: 'SOCSO Calculator', desc: 'Check employee and employer PERKESO & EIS contribution rates.', link: '/socso-perkeso' },
  { file: 'pcb-income-tax.html', title: 'PCB Calculator', desc: 'Calculate your monthly tax deduction (MTD) for employees & employers.', link: '/pcb-income-tax' },
  { file: 'epf-kwsp.html', title: 'EPF Calculator', desc: 'Calculate Employee 11% and Employer 13% KWSP contribution rates.', link: '/epf-kwsp' },
  { file: 'annual-leave-calculator.html', title: 'Annual Leave Calculator', desc: 'Calculate accurate pro-rated annual leave entitlement under Employment Act.', link: '/annual-leave-calculator' },
];

function generateOtherCalculators(currentFile) {
  let html = `
    <!-- Other Calculators Section -->
    <section class="blog-section" style="border-top: 1px solid #e2e8f0; background: #f8fafc;">
      <div class="container">
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 1.875rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Try Our Other Free Calculators</h2>
          <p style="color: #64748b; font-size: 1rem;">Free, instant and accurate HR calculation tools for Malaysia.</p>
        </div>
        <div class="blog-grid" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
`;

  tools.forEach(tool => {
    if (tool.file !== currentFile) {
      html += `
          <a href="${tool.link}" class="blog-card" style="padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; text-decoration: none;">
            <h3 style="color: #2563eb; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">${tool.title}</h3>
            <p style="color: #64748b; font-size: 0.875rem; line-height: 1.5; margin: 0;">${tool.desc}</p>
          </a>
`;
    }
  });

  html += `
        </div>
      </div>
    </section>
`;
  return html;
}

function processFile(file) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix 1 & 2: Title and Meta Description
  const titleMatch = content.match(/<title>.*?<\/title>/s);
  if (titleMatch) {
    content = content.replace(titleMatch[0], `<title>${titles[file]}</title>`);
  } else {
    content = content.replace('</head>', `  <title>${titles[file]}</title>\n</head>`);
  }

  const descMatch = content.match(/<meta[^>]*name="description"[^>]*>/s);
  if (descMatch) {
    content = content.replace(descMatch[0], `<meta name="description" content="${descriptions[file]}" />`);
  } else {
    content = content.replace('</head>', `  <meta name="description" content="${descriptions[file]}" />\n</head>`);
  }

  // Fix 3: 2023 -> 2026
  content = content.replace(/2023/g, '2026');

  // Fix 4: Add internal links just before footer
  // Let's find <!-- Footer --> or <footer
  const internalLinksRegex = /<!-- Other Calculators Section -->.*?<\/section>/s;
  if(internalLinksRegex.test(content)) {
    content = content.replace(internalLinksRegex, generateOtherCalculators(file));
  } else if (content.includes('<!-- Footer -->')) {
    content = content.replace('<!-- Footer -->', generateOtherCalculators(file) + '\n    <!-- Footer -->');
  } else if (content.includes('<footer')) {
    content = content.replace(/(<footer[^>]*>)/, generateOtherCalculators(file) + '\n    $1');
  }

  // Fix 5: Schemas
  // 5.1 Extract FAQs
  const doc = content;
  const faqBlocks = [];
  const faqRegex = /<h3>([^<]+)<\/h3>\s*<p>(.*?)<\/p>/gi; // Assuming FAQ questions are in H3, answers in P
  let match;
  // Use a simpler approach to grab faq items inside faq containers
  
  // Actually, wait, let's parse FAQ simply using cheerio or regex
  // Let's skip automatic regex for now as it's flaky. Let's do a reliable approach in a second script or simpler logic below.
  
  // 5.2 Add schemas to HEAD if not present
  // Removing old schemas first to avoid duplicates
  content = content.replace(/<script type="application\/ld\+json">.*?<\/script>/gs, '');
  
  let toolUrl = `https://salarycalculator.my${tools.find(t => t.file === file).link}`;
  
  let webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": titles[file],
    "description": descriptions[file],
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "url": toolUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "MYR"
    }
  };

  let breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://salarycalculator.my/"
    }]
  };
  
  if (file !== 'index.html') {
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": tools.find(t => t.file === file).title,
      "item": toolUrl
    });
  }

  // Find all FAQs in the HTML (assuming they are in .faq-item or just h3 + p tags after "Frequently Asked Questions" h2)
  let faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": []
  };
  
  // A simple hack to parse the FAQs using regex
  // Split content by "Frequently Asked Questions"
  let faqSection = content.split(/Frequently Asked Questions/i)[1];
  if (faqSection) {
    // Only look until the next section (like footer or related calculators)
    let sectionContent = faqSection.split(/<footer|<!--/)[0];
    
    // Look for <p class="faq-q"> and <p class="faq-a"> OR <strong> and following text
    let qMatches = [...sectionContent.matchAll(/<strong[^>]*>(.*?)<\/strong>.*?<p[^>]*>(.*?)<\/p>/gs)];
    if(qMatches.length === 0) {
       // alternative format: <p><strong>Q:</strong></p> <p>A:</p>
       qMatches = [...sectionContent.matchAll(/<[hp][^>]*>(.*?\?.*?)<.*?(?:<\/h\d>|<\/p>)\s*<p[^>]*>(.*?)<\/p>/gis)];
    }
    
    // We'll try to find any tags ending with '?' as question, next <p> as answer
    let matches2 = [...sectionContent.matchAll(/<[^>]+>(.*?\?)<\/[^>]+>.*?<p>(.*?)<\/p>/gs)];
    
    // In our manual inspection, questions are usually in strong tags
    let strongs = [...sectionContent.matchAll(/<p[^>]*><strong>([^<]+)<\/strong><\/p>\s*<p[^>]*>(.*?)<\/p>/gs)];
    
    let allQs = strongs;
    if (allQs.length === 0) {
      allQs = [...sectionContent.matchAll(/<p[^>]*><strong>([^<]+)<\/strong><\/p>\s*(?:<ul>)?\s*<li[^>]*>(.*?)<\/li>/gs)];
    }
    
    if (allQs.length > 0) {
      allQs.forEach(m => {
        let q = m[1].replace(/<[^>]+>/g, '').trim();
        let a = m[2].replace(/<[^>]+>/g, '').trim();
        if(q && a && q.includes('?')) {
          faqSchema.mainEntity.push({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": a
            }
          });
        }
      });
    }
    
    // fallback if couldn't parse properly
    if(faqSchema.mainEntity.length === 0) {
      // Just some generic regex
       let pTags = [...sectionContent.matchAll(/<p><strong>([^<]+\?)<\/strong><\/p>\s*<p>(.*?)<\/p>/gs)];
       pTags.forEach(m => {
         faqSchema.mainEntity.push({
            "@type": "Question",
            "name": m[1].replace(/<[^>]+>/g, '').trim(),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": m[2].replace(/<[^>]+>/g, '').trim()
            }
          });
       });
    }
  }

  let schemas = `
    <script type="application/ld+json">
    ${JSON.stringify(webAppSchema, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>`;
    
  if(faqSchema.mainEntity.length > 0) {
    schemas += `
    <script type="application/ld+json">
    ${JSON.stringify(faqSchema, null, 2)}
    </script>`;
  }

  content = content.replace('</head>', `  ${schemas}\n</head>`);


  // FIx 6: EPF PAGE KEYWORD
  if (file === 'epf-kwsp.html') {
    // Make sure H1 includes both EPF and KWSP
    content = content.replace(/<h1[^>]*>.*?<\/h1>/, '<h1 class="hero-title" id="heroTitle">EPF & KWSP Calculator Malaysia 2026</h1>');
    
    // Add "KWSP" and "Kumpulan Wang Simpanan Pekerja" naturally in first content paragraph
    const p1Regex = /(<p[^>]*class="hero-subtitle"[^>]*>)(.*?)(<\/p>)/;
    if(p1Regex.test(content)) {
       content = content.replace(p1Regex, '$1Calculate your Employee and Employer KWSP (Kumpulan Wang Simpanan Pekerja / Employees Provident Fund) contributions instantly for 2026.$3');
    }
    
    // Add "KWSP Calculator" as an H2 subheading (maybe in description or before FAQ)
    if (!content.includes('>KWSP Calculator<')) {
      content = content.replace('<div class="layout-grid">', '<!-- Added KWSP Subheading -->\n      <div style="margin-bottom: 24px; text-align: center;"><h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a;">KWSP Calculator</h2></div>\n      <div class="layout-grid">');
    }
  }

  // Fix 7: PCB PAGE KEYWORD
  if (file === 'pcb-income-tax.html') {
    // Add this H2: "Income Tax Calculator Malaysia 2026"
    // Add a short paragraph explaining that PCB is the monthly advance payment...
    if (!content.includes('>Income Tax Calculator Malaysia 2026<')) {
      let pcbAddition = `
      <!-- Added PCB SEO text -->
      <div style="margin-bottom: 32px; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto; padding: 0 20px;">
        <h2 style="font-size: 1.75rem; font-weight: 700; color: #0f172a; margin-bottom: 12px;">Income Tax Calculator Malaysia 2026</h2>
        <p style="color: #475569; font-size: 1.05rem; line-height: 1.6;">PCB (Potongan Cukai Berjadual) is the monthly advance payment of your annual income tax. It is deducted by your employer from your monthly salary and sent directly to LHDN every month. Use this calculator to estimate your deductions accurately for 2026.</p>
      </div>
      `;
      content = content.replace('<div class="layout-grid">', pcbAddition + '\n      <div class="layout-grid">');
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${file}`);
}

files.forEach(processFile);
console.log('All files processed.');
