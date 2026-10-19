// optimize_lcp.cjs - Fixes LCP bottleneck caused by font swap and DOM mutations
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  // 1. Replace display=swap with display=optional to avoid layout shifts & delayed LCP font swap paints
  if (content.includes('family=Inter:wght@400;500;600;700&display=swap') || content.includes('family=Inter:wght@400;500;600;700&amp;display=swap')) {
    content = content.replace(/family=Inter:wght@400;500;600;700&(amp;)?display=swap/g, 'family=Inter:wght@400;500;600;700&display=optional');
    changed = true;
  }

  // 2. Add preconnect to gstatic if not present alongside googleapis
  if (content.includes('https://fonts.googleapis.com') && !content.includes('https://fonts.gstatic.com')) {
    content = content.replace(
      '<link rel="preconnect" href="https://fonts.googleapis.com">',
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    );
    changed = true;
  }

  // 3. Optimize dynYear DOM mutation script so it does not block the main thread
  const optimizedDynYearScript = `var dynYear = new Date().getFullYear();
    function updateDynYear() {
      if (!document.title.includes(dynYear)) {
        document.title = document.title.replace(/20\\d\\d/g, dynYear);
      }
      var h1 = document.querySelector('h1');
      if (h1 && !h1.textContent.includes(dynYear)) {
        h1.innerHTML = h1.innerHTML.replace(/20\\d\\d/g, dynYear);
      }
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && !metaDesc.getAttribute('content').includes(dynYear)) {
        metaDesc.setAttribute('content', metaDesc.getAttribute('content').replace(/20\\d\\d/g, dynYear));
      }
      var canonical = document.querySelector('link[rel="canonical"]');
      if (canonical && !canonical.getAttribute('href').includes(dynYear)) {
        canonical.setAttribute('href', canonical.getAttribute('href').replace(/20\\d\\d/g, dynYear));
      }
      document.querySelectorAll('h2, h3').forEach(function(el) {
        if (el.textContent && /20\\d\\d/.test(el.textContent) && !el.textContent.includes(dynYear)) {
          el.innerHTML = el.innerHTML.replace(/20\\d\\d/g, dynYear);
        }
      });
    }
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(updateDynYear, { timeout: 3000 });
    } else {
      setTimeout(updateDynYear, 2000);
    }
  })();`;

  if (content.includes('var dynYear = new Date().getFullYear();') && !content.includes('updateDynYear')) {
    const scriptRegex = /<script>\s*\(function\(\)\s*\{[\s\S]*?var dynYear = new Date\(\)\.getFullYear\(\);[\s\S]*?<\/script>/;
    if (scriptRegex.test(content)) {
      const fullScript = `<script>
  (function() {
    ${optimizedDynYearScript}
</script>`;
      content = content.replace(scriptRegex, fullScript);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`[LCP Optimizer] Optimized ${f}`);
  }
}
