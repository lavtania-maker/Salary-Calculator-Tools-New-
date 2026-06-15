const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');

  // Image optimizations
  html = html.replace(/<img(.*?)>/g, (match, p1) => {
    let newTag = match;
    if (!p1.includes('alt=')) {
      newTag = newTag.replace(/<img/, '<img alt="Image"');
    }
    if (p1.includes('class="logo-img"')) {
      if (!p1.includes('fetchpriority=')) {
        newTag = newTag.replace(/<img/, '<img fetchpriority="high" decoding="sync"');
      }
    } else {
      if (!p1.includes('loading=')) {
        newTag = newTag.replace(/<img/, '<img loading="lazy" decoding="async"');
      }
    }
    return newTag;
  });

  // Open Graph Image Size optimizations
  const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="(.*?)"\s*\/?>/);
  if (ogImageMatch && !html.includes('og:image:width')) {
    const metaToAdd = `
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Salary Calculator Malaysia" />`;
    html = html.replace(ogImageMatch[0], ogImageMatch[0] + metaToAdd);
  }

  // Defer JS
  const gtagMatch = html.match(/<script\s+async\s+src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-TMQV1XC09P"\s*>\s*<\/script>/);
  if (gtagMatch) {
    html = html.replace(gtagMatch[0], '<script defer src="https://www.googletagmanager.com/gtag/js?id=G-TMQV1XC09P"></script>');
  }

  fs.writeFileSync(file, html);
  console.log('Optimized:', file);
}
