const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Image optimizations
html = html.replace(/<img(.*?)>/g, (match, p1) => {
  let newTag = match;
  if (!p1.includes('alt=')) {
    newTag = newTag.replace(/<img/, '<img alt="Image"');
  }

  // Handle priority for the first logo vs the rest
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

// 2. Open Graph optimizations
const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="(.*?)"\s*\/?>/);
if (ogImageMatch && !html.includes('og:image:width')) {
  const metaToAdd = `
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Salary Calculator Malaysia" />`;
  html = html.replace(ogImageMatch[0], ogImageMatch[0] + metaToAdd);
}

// 3. Defer JS
// Replace 'async' gtag with 'defer' gtag
const gtagMatch = html.match(/<script\s+async\s+src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-TMQV1XC09P"\s*>\s*<\/script>/);
if (gtagMatch) {
  html = html.replace(gtagMatch[0], '<script defer src="https://www.googletagmanager.com/gtag/js?id=G-TMQV1XC09P"></script>');
}

fs.writeFileSync('index.html', html);
console.log('Optimizations applied.');
