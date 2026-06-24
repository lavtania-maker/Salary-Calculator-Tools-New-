const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

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
  let html = '<!-- Other Calculators Section -->';
  html += '<section class="blog-section other-calculators-section" style="border-top: 1px solid #e2e8f0; background: #f8fafc; padding: 40px 0;">';
  html += '<div class="container">';
  html += '<div style="margin-bottom: 32px;">';
  html += '<h2 style="font-size: 1.875rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Try Our Other Free Calculators</h2>';
  html += '<p style="color: #64748b; font-size: 1rem;">Free, instant and accurate HR calculation tools for Malaysia.</p>';
  html += '</div>';
  html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">';

  tools.forEach(tool => {
    if (tool.file !== currentFile) {
      html += '<a href="' + tool.link + '" class="calc-card" style="padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s; display: block;">';
      html += '<h3 style="color: #2563eb; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">' + tool.title + '</h3>';
      html += '<p style="color: #64748b; font-size: 0.875rem; line-height: 1.5; margin: 0;">' + tool.desc + '</p>';
      html += '</a>';
    }
  });

  html += '</div></div></section>';
  return html;
}

function processFile(file) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/2023/g, '2026');

  const $ = cheerio.load(content, { decodeEntities: false });

  $('head title').remove();
  $('head').append('<title>' + titles[file] + '</title>');

  $('head meta[name="description"]').remove();
  $('head').append('<meta name="description" content="' + descriptions[file] + '" />');

  $('script[type="application/ld+json"]').remove();

  let faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": []
  };

  const faqTitles = $('h2, h3').filter((i, el) => $(el).text().toLowerCase().includes('frequently asked questions') || $(el).text().toLowerCase().includes('faq'));
  
  faqTitles.each((i, titleEl) => {
    let currentEl = $(titleEl).next();
    while(currentEl.length > 0 && currentEl[0].tagName.toLowerCase() !== 'h2' && currentEl.attr('class') !== 'footer') {
      
      if(currentEl[0].tagName.toLowerCase() === 'h3') {
        let q = currentEl.text().trim();
        let a = currentEl.next('p').text().trim();
        if(q && a) {
          faqSchema.mainEntity.push({
            "@type": "Question", "name": q,
            "acceptedAnswer": { "@type": "Answer", "text": a }
          });
        }
      }
      
      if(currentEl[0].tagName.toLowerCase() === 'p') {
        let strong = currentEl.find('strong');
        if(strong.length > 0 && strong.text().includes('?')) {
           let q = strong.text().trim();
           let pNext = currentEl.next();
           let a = '';
           if(pNext.length > 0 && pNext[0].tagName.toLowerCase() === 'p') {
              a = pNext.text().trim();
           } else if (pNext.length > 0 && pNext[0].tagName.toLowerCase() === 'ul') {
              a = pNext.text().trim();
           }
           if (q && a) {
              faqSchema.mainEntity.push({
                "@type": "Question", "name": q,
                "acceptedAnswer": { "@type": "Answer", "text": a }
              });
           }
        }
      }
      currentEl = currentEl.next();
    }
  });

  const uniqueFaqs = new Map();
  faqSchema.mainEntity.forEach(f => uniqueFaqs.set(f.name, f));
  faqSchema.mainEntity = Array.from(uniqueFaqs.values());

  let toolUrl = 'https://salarycalculator.my' + tools.find(t => t.file === file).link;
  if (toolUrl.endsWith('/socso-perkeso')) {
     // keep it exact
  } else if (toolUrl.endsWith('/')) {
     // do nothing
  } else if (toolUrl === "https://salarycalculator.my") {
     toolUrl = "https://salarycalculator.my/";
  }

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

  $('head').append('\\n<script type="application/ld+json">\\n' + JSON.stringify(webAppSchema, null, 2) + '\\n</script>');
  $('head').append('\\n<script type="application/ld+json">\\n' + JSON.stringify(breadcrumbSchema, null, 2) + '\\n</script>');
  
  if(faqSchema.mainEntity.length > 0) {
    $('head').append('\\n<script type="application/ld+json">\\n' + JSON.stringify(faqSchema, null, 2) + '\\n</script>');
  }

  $('.other-calculators-section').remove();

  if ($('footer.footer').length > 0) {
     $('footer.footer').before(generateOtherCalculators(file));
  } else if ($('footer').length > 0) {
     $('footer').first().before(generateOtherCalculators(file));
  }

  if (file === 'epf-kwsp.html') {
    $('#heroTitle, .hero-title').text('EPF & KWSP Calculator Malaysia 2026');
    
    let p1 = $('#heroSubtitle, .hero-subtitle');
    if (p1.length > 0 && !p1.text().includes('Kumpulan Wang Simpanan Pekerja')) {
      p1.text('Calculate your Employee and Employer KWSP (Kumpulan Wang Simpanan Pekerja / Employees Provident Fund) contributions instantly for 2026.');
    }
    
    if ($('.kwsp-calculator-h2').length === 0) {
       $('.layout-grid').first().before('<!-- Added KWSP Subheading --><div class="kwsp-calculator-h2" style="margin-bottom: 24px; text-align: center;"><h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a;">KWSP Calculator</h2></div>');
    }
  }

  if (file === 'pcb-income-tax.html') {
    let pcbSectionHTML = '<!-- Added PCB SEO text --><div class="pcb-seo-info" style="margin-bottom: 32px; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto; padding: 0 20px;"><h2 style="font-size: 1.75rem; font-weight: 700; color: #0f172a; margin-bottom: 12px;">Income Tax Calculator Malaysia 2026</h2><p style="color: #475569; font-size: 1.05rem; line-height: 1.6;">PCB (Potongan Cukai Berjadual) is the monthly advance payment of your annual income tax. It is deducted by your employer from your monthly salary and sent directly to LHDN every month. Use this calculator to estimate your deductions accurately for 2026.</p></div>';
    if ($('.pcb-seo-info').length === 0) {
       $('.layout-grid').first().before(pcbSectionHTML);
    }
  }

  let newHtml = $.html();
  newHtml = newHtml.replace(/\\n<\/head>/, '\n<\/head>');
  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log('Processed ' + file);
}

files.forEach(processFile);
console.log('All files processed.');
