import fs from 'fs';

const pages = [
  { en: '/', ms: '/ms/' },
  { en: '/epf-kwsp', ms: '/ms/kalkulator-epf' },
  { en: '/socso-perkeso', ms: '/ms/kalkulator-socso' },
  { en: '/pcb-income-tax', ms: '/ms/kalkulator-pcb' },
  { en: '/annual-leave-calculator', ms: '/ms/kalkulator-cuti-tahunan' },
  { en: '/overtime-pay-calculator', ms: '/ms/kalkulator-overtime' },
  { en: '/hourly-rate', ms: '/ms/kadar-gaji-sejam' },
  { en: '/mincal', ms: '/ms/kalkulator-gaji-minimum' },
  { en: '/payslip', ms: '/ms/penjana-payslip' },
  { en: '/privacy-policy', ms: '/ms/dasar-privasi' }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

for (const p of pages) {
  // EN
  xml += `  <url>
    <loc>https://salarycalculator.my${p.en}</loc>
    <lastmod>2026-08-18</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://salarycalculator.my${p.en}" />
    <xhtml:link rel="alternate" hreflang="ms" href="https://salarycalculator.my${p.ms}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://salarycalculator.my${p.en}" />
  </url>
`;
  // MS
  xml += `  <url>
    <loc>https://salarycalculator.my${p.ms}</loc>
    <lastmod>2026-08-18</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://salarycalculator.my${p.en}" />
    <xhtml:link rel="alternate" hreflang="ms" href="https://salarycalculator.my${p.ms}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://salarycalculator.my${p.en}" />
  </url>
`;
}

xml += `  <url>
    <loc>https://salarycalculator.my/blog</loc>
    <lastmod>2026-08-18</lastmod>
  </url>
</urlset>`;

fs.writeFileSync('public/sitemap-pages.xml', xml);
console.log('sitemap updated');
