import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT1xtn2fSPbxUrIyJvK_r449D_WB6Ete8",
  authDomain: "gen-lang-client-0273291777.firebaseapp.com",
  projectId: "gen-lang-client-0273291777",
  storageBucket: "gen-lang-client-0273291777.firebasestorage.app",
  messagingSenderId: "235978759653",
  appId: "1:235978759653:web:fb82260c62f98fc80ce30c"
};

const DB_ID = "ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918";
const COLL = "blog_posts";

// Initialize Firebase App gracefully
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, DB_ID);

const categoryMeta: Record<string, { title: string; desc: string }> = {
  'salary': {
    title: "Salary, Payroll & Minimum Wage Guides Malaysia – HR Blog",
    desc: "Read expert guides on payroll processing, minimum wage laws, salary structures, and employment benefits in Malaysia."
  },
  'epf': {
    title: "EPF / KWSP Contribution Guides & Contribution Rates – HR Blog Malaysia",
    desc: "Learn about Employee Provident Fund (EPF) contribution rates, withdrawal rules, dividend calculations, and employer responsibilities in Malaysia."
  },
  'socso': {
    title: "SOCSO & EIS PERKESO Contribution Guides – HR Blog Malaysia",
    desc: "Detailed guides on SOCSO (PERKESO) contribution rates, EIS unemployment protection, and social security benefit claims in Malaysia."
  },
  'pcb-income-tax': {
    title: "PCB / Income Tax Monthly Deductions Guides – HR Blog Malaysia",
    desc: "Calculate and understand Monthly Tax Deduction (MTD / PCB), tax reliefs, tax rates, and yearly income tax declarations in Malaysia."
  },
  'annual-leave': {
    title: "Annual Leave & Employment Act Guides – HR Blog Malaysia",
    desc: "Understand your rights regarding annual leave entitlements, sick leave, public holidays, and rest days under the Malaysia Employment Act."
  },
  'overtime': {
    title: "Overtime Pay & Employment Act Guides – HR Blog Malaysia",
    desc: "Learn about overtime pay rates, normal working hours, public holiday OT calculations, and Employment Act rules in Malaysia."
  }
};



interface BlogListCache {
  posts: any[];
  timestamp: number;
}
let cachedBlogList: BlogListCache | null = null;
const LIST_CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache TTL

function fmtDate(d: any) {
  if (!d) return '';
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? d : dt.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' });
}

function card(p: any, large: boolean) {
  const cls = large ? 'featured-card' : 'post-card';
  const catMap: Record<string, string> = {
    'salary': 'Salary',
    'epf': 'EPF',
    'socso': 'SOCSO',
    'eis': 'EIS',
    'annual-leave': 'Annual Leave',
    'pcb-income-tax': 'PCB / Income Tax',
    'overtime': 'Overtime'
  };
  const rawCats = Array.isArray(p.category) ? p.category : [p.category || ''];
  const cats = rawCats.filter(Boolean).map((c: string) => {
    let catSlug = c.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-').replace(/-+/g, '-');
    if (catSlug === 'perkeso') catSlug = 'socso';
    return catMap[catSlug] || c.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  });

  const desc = p.metaDesc || p.excerpt || p.summary || '';
  const catsHtml = cats.map((c: string) => `<span>${c}</span>`).join(' <span class="bullet" style="margin: 0 6px; color:#94a3b8; display:inline-block; transform:translateY(-1px);">•</span> ');
  const descHtml = desc ? `<p class="card-excerpt">${desc}</p>` : '';

  return `<a class="${cls}" href="/blog/${p.slug || p.id}">` +
    `<div class="card-cat">${catsHtml}</div>` +
    `<h2 class="card-title">${p.title || 'Untitled'}</h2>` +
    descHtml +
    `<div class="card-meta"><div class="card-date">${fmtDate(p.publishedAt)}</div></div></a>`;
}



export default async function handler(req: any, res: any) {
  let category = req.query?.category || req.params?.category || "";
  if (category === "perkeso") category = "socso";

  const bypassCache = req.query?.nocache === "true" || req.query?.refresh === "true";

  try {
    // 1. Fetch posts from Firestore (or in-memory cache)
    let allPosts: any[] = [];
    const now = Date.now();
    if (cachedBlogList && (now - cachedBlogList.timestamp < LIST_CACHE_TTL) && !bypassCache) {
      console.log(`[CACHE HIT] Serving full blog post list from in-memory cache`);
      allPosts = cachedBlogList.posts;
    } else {
      console.log(`[CACHE MISS] Fetching full blog post list from Firestore`);
      try {
        const postsRef = collection(db, COLL);
        const q = query(postsRef, where("status", "==", "published"), orderBy("publishedAt", "desc"));
        const querySnapshot = await getDocs(q);
        allPosts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      } catch (err) {
        console.warn(`[FIRESTORE WARNING] orderBy query failed, trying fallback un-ordered query:`, err);
        // Fallback query without orderBy if indexing issue or first run
        try {
          const postsRef = collection(db, COLL);
          const q = query(postsRef, where("status", "==", "published"));
          const querySnapshot = await getDocs(q);
          allPosts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          allPosts.sort((a, b) => (b.publishedAt || '') > (a.publishedAt || '') ? 1 : -1);
        } catch (dbErr) {
          console.error(`[FIRESTORE ERROR] Failed to fetch blog post list:`, dbErr);
          if (cachedBlogList) {
            console.warn(`[CACHE FALLBACK] Serving expired cached blog post list due to Firestore error`);
            allPosts = cachedBlogList.posts;
          } else {
            throw dbErr;
          }
        }
      }

      // Normalize Timestamps/objects
      allPosts.forEach(post => {
        for (const key in post) {
          const val = post[key];
          if (val && typeof val === 'object' && typeof val.toDate === 'function') {
            post[key] = val.toDate().toISOString();
          }
        }
      });

      // Cache the result even if empty
      cachedBlogList = { posts: allPosts, timestamp: now };
    }

    // Filter by category if requested
    let filteredPosts = allPosts;
    if (category) {
      filteredPosts = allPosts.filter(p => {
        const cats = Array.isArray(p.category) ? p.category : [p.category || ''];
        const pCat = cats.map((c: string) => c.toLowerCase()).join(' ');
        if (category === 'socso') {
          return pCat.indexOf('socso') > -1 || pCat.indexOf('perkeso') > -1;
        }
        return pCat.indexOf(category) > -1;
      });
    }

    // 2. Load blog.html template
    let templatePath = path.join(process.cwd(), 'public', 'blog.html');
    if (!fs.existsSync(templatePath)) {
      templatePath = path.join(process.cwd(), 'dist', 'blog.html');
      if (!fs.existsSync(templatePath)) {
        templatePath = path.join(process.cwd(), 'blog.html');
      }
    }
    const htmlContent = fs.readFileSync(templatePath, 'utf-8');
    const $ = cheerio.load(htmlContent);

    // 3. Update category tabs UI
    $('#categoryTabs .tab').removeClass('active');
    if (category) {
      $(`#categoryTabs .tab[data-cat="${category}"]`).addClass('active');
    } else {
      $(`#categoryTabs .tab[data-cat=""]`).addClass('active');
    }

    // 4. Populate SEO category metadata
    if (category && categoryMeta[category]) {
      const meta = categoryMeta[category];
      $('title').text(meta.title);
      $('meta[name="description"]').attr('content', meta.desc);
      $('link[rel="canonical"]').attr('href', `https://salarycalculator.my/blog/category/${category}`);
    } else {
      $('link[rel="canonical"]').attr('href', "https://salarycalculator.my/blog");
    }

    // 5. Render posts
    let renderedHtml = "";
    if (!filteredPosts.length) {
      renderedHtml = '<div class="empty-state"><h2>No articles yet</h2><p>Check back soon for guides on EPF, PCB, SOCSO and more.</p></div>';
    } else {
      renderedHtml = '<div class="featured-grid">' + card(filteredPosts[0], true);
      renderedHtml += filteredPosts.length >= 2 ? card(filteredPosts[1], true) : '<div class="featured-card" style="background:#f8faff"></div>';
      renderedHtml += '</div>';
      if (filteredPosts.length > 2) {
        renderedHtml += '<div class="posts-grid">';
        for (let i = 2; i < filteredPosts.length; i++) {
          renderedHtml += card(filteredPosts[i], false);
        }
        if ((filteredPosts.length - 2) % 2 !== 0) {
          renderedHtml += '<div class="post-card" style="background:#f8faff"></div>';
        }
        renderedHtml += '</div>';
      }
    }

    $('#articlesContainer').html(renderedHtml);



    // 6. Prepend SSR completed script to prevent client-side double load
    $('head').prepend('<script>window.__SSR_COMPLETE = true;</script>');

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "public, s-maxage=3600");
    return res.status(200).send($.html());
  } catch (error) {
    console.error("Error SSR blog list:", error);
    res.status(500).send("Error loading blog");
  }
}
