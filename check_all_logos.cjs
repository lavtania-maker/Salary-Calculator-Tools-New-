const fs = require('fs');
const cheerio = require('cheerio');
const glob = require('glob');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const $ = cheerio.load(html);
  console.log(`\n=== File: ${f} ===`);
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    const alt = $(el).attr('alt');
    const cls = $(el).attr('class');
    const width = $(el).attr('width');
    const height = $(el).attr('height');
    const style = $(el).attr('style');
    const parentA = $(el).closest('a').attr('href');
    if (src && (src.includes('logo') || (alt && alt.toLowerCase().includes('logo')) || (cls && cls.includes('logo')))) {
      console.log(`  Img #${i}: src="${src}" alt="${alt}" class="${cls}" w="${width}" h="${height}" parentHref="${parentA}"`);
      if (style) console.log(`    style="${style}"`);
    }
  });
}
