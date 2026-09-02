import * as fs from 'fs';
import * as cheerio from 'cheerio';
import crypto from 'crypto';

const htmlFiles = [
  'index.html', 'epf-kwsp.html', 'socso-perkeso.html', 'pcb-income-tax.html',
  'annual-leave-calculator.html', 'overtime-pay-calculator.html', 'hourly-rate.html',
  'mincal.html', 'payslip.html', 'blog.html', 'privacy-policy.html'
];

const enJson: Record<string, string> = {};

function getElementText(el: any, $: cheerio.CheerioAPI): string {
  // Get outer HTML of contents to preserve formatting like <br> or <strong>
  return $(el).html()?.trim() || '';
}

function processFile(file: string) {
  const content = fs.readFileSync(file, 'utf-8');
  const $ = cheerio.load(content);
  let modified = false;

  const elementsToTranslate = 'h1, h2, h3, h4, h5, h6, p, label, button, th, td, li, a.nav-item, a.mobile-nav-item, a.footer-link, span.badge, .calc-card h3, .calc-card p';

  $(elementsToTranslate).each((_, el) => {
    // Only process if it doesn't already have data-i18n
    if ($(el).attr('data-i18n')) return;
    
    // Skip if it contains block level elements or is empty
    const text = $(el).text().trim();
    if (!text) return;

    // Skip elements with children that are block level, we only want leaf-ish nodes
    const hasBlockChildren = $(el).find('div, p, ul, table, section, form, h1, h2, h3, h4, h5, h6').length > 0;
    if (hasBlockChildren) return;

    // Skip script and style tags
    if (el.tagName === 'script' || el.tagName === 'style') return;

    const htmlContent = getElementText(el, $);
    if (!htmlContent) return;

    // Generate a reasonable key
    const cleanText = text.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '_').substring(0, 40).toLowerCase();
    const hash = crypto.createHash('md5').update(htmlContent).digest('hex').substring(0, 6);
    const key = `${cleanText}_${hash}`;

    $(el).attr('data-i18n', key);
    enJson[key] = htmlContent;
    modified = true;
  });

  if (modified) {
    fs.writeFileSync(file, $.html());
  }
}

htmlFiles.forEach(processFile);
fs.writeFileSync('locales/en.json', JSON.stringify(enJson, null, 2));
console.log(`Generated locales/en.json with ${Object.keys(enJson).length} keys.`);

