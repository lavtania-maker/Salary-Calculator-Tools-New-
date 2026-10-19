import https from 'https';

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        status: res.statusCode,
        headers: res.headers,
        data
      }));
    }).on('error', reject);
  });
}

function extractLinks(html) {
  const links = [];
  const regex = /<a[^>]+href="([^"]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.push(match[1]);
  }
  return [...new Set(links)];
}

function checkSeoTags(html) {
  const robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i);
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  return {
    robots: robots ? robots[1] : null,
    canonical: canonical ? canonical[1] : null
  };
}

async function run() {
  const baseUrl = 'https://salarycalculator.my';
  
  // 1. Homepage
  console.log('--- Homepage ---');
  const home = await fetchHtml(baseUrl + '/');
  const homeLinks = extractLinks(home.data);
  const toBlog = homeLinks.includes('/blog') || homeLinks.includes('https://salarycalculator.my/blog');
  console.log(`Link to /blog exists: ${toBlog}`);

  // 2. Blog Index
  console.log('\n--- Blog Index (/blog) ---');
  const blog = await fetchHtml(baseUrl + '/blog');
  const blogLinks = extractLinks(blog.data);
  const categories = blogLinks.filter(l => l.startsWith('/blog/category/'));
  const articles = blogLinks.filter(l => l.startsWith('/blog/') && !l.startsWith('/blog/category/'));
  console.log(`Categories found:`, categories);
  console.log(`Articles found on /blog:`, articles);

  // 3. Categories
  console.log('\n--- Category Pages ---');
  for (const cat of categories) {
    const catPage = await fetchHtml(baseUrl + cat);
    const catLinks = extractLinks(catPage.data).filter(l => l.startsWith('/blog/') && !l.startsWith('/blog/category/'));
    const seo = checkSeoTags(catPage.data);
    console.log(`${cat}: Status=${catPage.status}, Robots=${seo.robots}, Canonical=${seo.canonical}, Articles=${catLinks.length}`);
  }
}

run().catch(console.error);
