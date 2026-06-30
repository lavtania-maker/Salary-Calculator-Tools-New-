// Vercel Routing Middleware — runs before rewrites, on the Edge runtime.
// Purpose: make sure URLs that don't correspond to a real page return a true
// HTTP 404 (not a 200 "Error Loading Article" client-rendered page), so
// Google can detect and drop them from its index.

const PROJECT_ID = "gen-lang-client-0273291777";
const DB_ID = "ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918";
const API_KEY = "AIzaSyAT1xtn2fSPbxUrIyJvK_r449D_WB6Ete8";

// The 6 dedicated topic hub pages (always real, served as static files)
const TOPIC_SLUGS = new Set([
  "salary",
  "epf",
  "socso",
  "perkeso",
  "pcb-income-tax",
  "annual-leave",
]);

// Legacy hand-written static articles that exist as real files but aren't
// (yet) tracked in Firestore.
const LEGACY_BLOG_SLUGS = new Set(["epf-contribution-rates-2026"]);

// Top-level routes that are real pages, handled elsewhere in vercel.json.
const RESERVED_TOP_LEVEL = new Set([
  "blog",
  "epf-kwsp",
  "socso-perkeso",
  "pcb-income-tax",
  "pcb-calculator",
  "annual-leave-calculator",
  "privacy-policy",
  "admin",
  "blog-admin",
  "mincal",
  "payslip-generator",
  "report",
  "sitemap.xml",
  "robots.txt",
  "favicon.ico",
  "logo-small.png",
  "thumbnail.jpg",
  "calculator-styles.css",
]);

function notFoundResponse() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Page Not Found - Salary Calculator MY</title>
<meta name="robots" content="noindex">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1d23;background:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center}
  .wrap{max-width:480px}
  h1{font-size:64px;font-weight:800;color:#2563eb;margin-bottom:8px}
  h2{font-size:22px;font-weight:700;margin-bottom:12px}
  p{color:#64748b;margin-bottom:28px;line-height:1.6}
  .links{display:flex;flex-direction:column;gap:10px;max-width:280px;margin:0 auto}
  a{display:block;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px}
  .primary{background:#2563eb;color:#fff}
  .secondary{background:#f1f5f9;color:#1e3a8a}
</style>
</head>
<body>
  <div class="wrap">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist or may have been moved.</p>
    <div class="links">
      <a href="/" class="primary">Go to Salary Calculator</a>
      <a href="/blog" class="secondary">Browse the Blog</a>
    </div>
  </div>
</body>
</html>`;
  return new Response(html, {
    status: 404,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

async function getPostFromFirestore(slug) {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DB_ID}/documents:runQuery?key=${API_KEY}`;
    const body = {
      structuredQuery: {
        from: [{ collectionId: "blog_posts" }],
        where: {
          compositeFilter: {
            op: "AND",
            filters: [
              {
                fieldFilter: {
                  field: { fieldPath: "slug" },
                  op: "EQUAL",
                  value: { stringValue: slug },
                },
              },
              {
                fieldFilter: {
                  field: { fieldPath: "status" },
                  op: "EQUAL",
                  value: { stringValue: "published" },
                },
              },
            ],
          },
        },
        limit: 1,
      },
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { exists: true }; // fail-open on transient errors
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0 && data[0].document) {
      const fields = data[0].document.fields || {};
      return {
        exists: true,
        title: fields.title?.stringValue || "",
        content: fields.content?.stringValue || "",
        readMoreUrl: fields.readMoreUrl?.stringValue || "",
        metaDesc: fields.metaDesc?.stringValue || "",
      };
    }
    return null; // Not found
  } catch (e) {
    return { exists: true }; // fail-open — never accidentally 404 real content
  }
}

async function getBlogPostsFromFirestore() {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DB_ID}/documents:runQuery?key=${API_KEY}`;
    const body = {
      structuredQuery: {
        from: [{ collectionId: "blog_posts" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "status" },
            op: "EQUAL",
            value: { stringValue: "published" },
          },
        },
        orderBy: [{ field: { fieldPath: "publishedAt" }, direction: "DESCENDING" }],
        limit: 50,
      },
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      // Sometimes index isn't ready for orderBy, fallback to just where
      delete body.structuredQuery.orderBy;
      const res2 = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res2.ok) return null;
      const data2 = await res2.json();
      if (!Array.isArray(data2)) return [];
      const posts = data2.filter(d => d.document).map(d => {
        const fields = d.document.fields || {};
        return {
          id: d.document.name.split('/').pop(),
          slug: fields.slug?.stringValue || "",
          title: fields.title?.stringValue || "",
          category: fields.category?.stringValue || "",
          excerpt: fields.excerpt?.stringValue || "",
          publishedAt: fields.publishedAt?.stringValue || "",
        };
      });
      return posts.sort((a,b) => (b.publishedAt||'') > (a.publishedAt||'') ? 1 : -1);
    }
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.filter(d => d.document).map(d => {
      const fields = d.document.fields || {};
      return {
        id: d.document.name.split('/').pop(),
        slug: fields.slug?.stringValue || "",
        title: fields.title?.stringValue || "",
        category: fields.category?.stringValue || "",
        excerpt: fields.excerpt?.stringValue || "",
        publishedAt: fields.publishedAt?.stringValue || "",
      };
    });
  } catch (e) {
    return null;
  }
}

async function renderServerSideBlogList(request) {
  const posts = await getBlogPostsFromFirestore();
  if (!posts) return; // Fallback to client JS
  
  try {
    const url = new URL(request.url);
    const templateRes = await fetch(url.origin + "/blog.html");
    if (!templateRes.ok) return;
    let html = await templateRes.text();
    
    function fmtDate(d) {
      if (!d) return '';
      const dt = new Date(d);
      return isNaN(dt) ? d : dt.toLocaleDateString('en-MY', {day:'numeric',month:'long',year:'numeric'});
    }
    function initials(t) { return (t||'SC').split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase(); }
    
    function card(p, large) {
      const cls = large ? 'featured-card' : 'post-card';
      const cats = (p.category||'').split(',').map(c=>c.trim()).filter(Boolean);
      return `<a class="${cls}" href="/blog/${p.slug||p.id}">`
        +`<div class="card-cat">${cats.map(c=>`<span>${c}</span>`).join('')}</div>`
        +`<h2 class="card-title">${p.title||'Untitled'}</h2>`
        +(p.excerpt?`<p class="card-excerpt">${p.excerpt}</p>`:'')
        +`<div class="card-meta"><div class="card-avatar">${initials(p.title)}</div>`
        +`<div class="card-date">${fmtDate(p.publishedAt)}</div></div></a>`;
    }
    
    let injectedHtml = '';
    if (!posts.length) {
      injectedHtml = '<div class="empty-state"><h2>No articles yet</h2><p>Check back soon for guides on EPF, PCB, SOCSO and more.</p></div>';
    } else {
      injectedHtml = '<div class="featured-grid">' + card(posts[0], true);
      injectedHtml += posts.length >= 2 ? card(posts[1], true) : '<div class="featured-card" style="background:#f8faff"></div>';
      injectedHtml += '</div>';
      if (posts.length > 2) {
        injectedHtml += '<div class="posts-grid">';
        for(let i=2; i<posts.length; i++) injectedHtml += card(posts[i], false);
        if ((posts.length-2)%2 !== 0) injectedHtml += '<div class="post-card" style="background:#f8faff"></div>';
        injectedHtml += '</div>';
      }
    }
    
    html = html.replace(
      /<div id="articlesContainer">[\s\S]*?<\/div>\s*<aside class="sidebar">/i,
      `<div id="articlesContainer">${injectedHtml}</div>\n    <aside class="sidebar">`
    );
    
    // Also hide the noscript banner since we pre-rendered it
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, '');
    
    return new Response(html, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  } catch (e) {
    return;
  }
}

async function renderServerSidePost(request, slug, post) {
  // If we couldn't fetch data due to transient error, just let it pass through to client JS
  if (!post.title && !post.content) return;
  
  try {
    const url = new URL(request.url);
    const templateRes = await fetch(url.origin + "/blog-post-template.html");
    if (!templateRes.ok) return;
    let html = await templateRes.text();
    
    // Inject basic meta
    html = html.replace(/<title>.*?<\/title>/, `<title>${post.title} - Salary Calculator MY</title>`);
    html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${post.metaDesc || post.title}"`);
    
    // Inject content
    html = html.replace('<div id="article-content" class="article-body">', `<div id="article-content" class="article-body">${post.content}`);
    
    // Inject read more
    if (post.readMoreUrl) {
      html = html.replace('id="read-more-container" style="display: none;', 'id="read-more-container" style="display: block;');
      html = html.replace('id="read-more-link" href="#"', `id="read-more-link" href="${post.readMoreUrl}"`);
    }
    
    return new Response(html, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  } catch (e) {
    return; // Fallback to client-side JS
  }
}

export const config = {
  runtime: "edge",
  matcher: ["/blog/:slug", "/:slug"],
};

export default async function middleware(request) {
  const url = new URL(request.url);
  let path = url.pathname.replace(/\/+$/, "");
  
  if (path === "/blog") {
    return await renderServerSideBlogList(request);
  }

  if (path === "") return; // homepage, not matched anyway

  // Skip any path that looks like a static asset (has a file extension)
  if (/\.[a-zA-Z0-9]+$/.test(path)) return;

  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (TOPIC_SLUGS.has(slug) || LEGACY_BLOG_SLUGS.has(slug)) return;
    const post = await getPostFromFirestore(slug);
    if (!post) return notFoundResponse();
    return await renderServerSidePost(request, slug, post);
  }

  const topMatch = path.match(/^\/([^/]+)$/);
  if (topMatch) {
    const slug = topMatch[1];
    if (RESERVED_TOP_LEVEL.has(slug)) return;
    const post = await getPostFromFirestore(slug);
    if (!post) return notFoundResponse();
    return await renderServerSidePost(request, slug, post);
  }
}
