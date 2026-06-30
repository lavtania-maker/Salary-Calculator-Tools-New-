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

async function slugExistsInFirestore(slug) {
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
    if (!res.ok) return true; // fail-open on transient errors
    const data = await res.json();
    return Array.isArray(data) && data.some((d) => d.document);
  } catch (e) {
    return true; // fail-open — never accidentally 404 real content
  }
}

export const config = {
  runtime: "edge",
  matcher: ["/blog/:slug", "/:slug"],
};

export default async function middleware(request) {
  const url = new URL(request.url);
  let path = url.pathname.replace(/\/+$/, "");
  if (path === "") return; // homepage, not matched anyway

  // Skip any path that looks like a static asset (has a file extension)
  if (/\.[a-zA-Z0-9]+$/.test(path)) return;

  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (TOPIC_SLUGS.has(slug) || LEGACY_BLOG_SLUGS.has(slug)) return;
    const exists = await slugExistsInFirestore(slug);
    if (!exists) return notFoundResponse();
    return;
  }

  const topMatch = path.match(/^\/([^/]+)$/);
  if (topMatch) {
    const slug = topMatch[1];
    if (RESERVED_TOP_LEVEL.has(slug)) return;
    const exists = await slugExistsInFirestore(slug);
    if (!exists) return notFoundResponse();
    return;
  }
}
