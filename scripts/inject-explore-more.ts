import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

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

const catClasses: Record<string, string> = {
  'salary': 'category-tips',
  'epf': 'category-epf',
  'socso': 'category-socso',
  'eis': 'category-socso',
  'annual-leave': 'category-law',
  'pcb-income-tax': 'category-pcb',
  'overtime': 'category-overtime'
};

const catDisplay: Record<string, string> = {
  'salary': 'Salary',
  'epf': 'EPF',
  'socso': 'SOCSO',
  'eis': 'EIS',
  'annual-leave': 'Annual Leave',
  'pcb-income-tax': 'PCB / Income Tax',
  'overtime': 'Overtime'
};

function getArticlesForCategory(allPosts: any[], targetCategory: string, count: number = 4, excludeSlug: string = ''): any[] {
  const targetNorm = targetCategory.toLowerCase().trim();

  // If targetCategory is empty, 'all', 'featured', or 'salary' for homepage/generic (Note: Salary Calculator is handled separately if specified)
  if (!targetCategory || targetNorm === 'all' || targetNorm === 'featured') {
    // Show the latest featured articles from all categories
    const filtered = excludeSlug ? allPosts.filter(p => (p.slug || p.id) !== excludeSlug) : allPosts;
    return filtered.slice(0, count);
  }

  const matched: any[] = [];
  
  // Normalization logic: lower case, strip slashes/spaces/dashes
  const normalize = (cat: string) => cat.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-').replace(/-+/g, '-');
  const targetNormalized = normalize(targetCategory);

  for (const post of allPosts) {
    if (matched.length >= count) break;
    const postSlug = post.slug || post.id;
    if (excludeSlug && postSlug === excludeSlug) continue;

    const postCats = (Array.isArray(post.category) ? post.category : [post.category || '']).map(c => normalize(c));
    if (postCats.includes(targetNormalized)) {
      matched.push(post);
    }
  }

  return matched;
}

function renderCard(post: any): string {
  const slug = post.slug || post.id;
  
  let rawCat = 'Salary';
  if (post.category) {
    if (Array.isArray(post.category)) {
      rawCat = post.category[0] || 'Salary';
    } else {
      rawCat = post.category;
    }
  }
  const normCat = rawCat.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-').replace(/-+/g, '-');
  const catClass = catClasses[normCat] || 'category-tips';
  const catName = catDisplay[normCat] || rawCat;
  
  const title = post.title || 'Untitled';

  return `
    <a class="blog-card" href="/blog/${slug}">
      <div class="blog-content">
        <div style="margin-bottom: 12px; display: flex; align-items: center;">
          <span class="blog-category ${catClass}">${catName}</span>
        </div>
        <h3 class="blog-title">${title}</h3>
        <div class="blog-meta">
          <span class="read-more-link">Read Article →</span>
        </div>
      </div>
    </a>
  `.trim();
}

function buildExploreMoreSection(posts: any[]): string {
  const cardsHtml = posts.map(post => renderCard(post)).join('\n');
  return `
<!-- START_EXPLORE_MORE_ARTICLES -->
<section class="explore-more-section" style="padding: 60px 0; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
  <div class="container" style="max-width: 1100px; margin: 0 auto; padding: 0 20px; box-sizing: border-box; width: 100%;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h2 style="font-size: 2rem; font-weight: 700; color: #2563eb !important; margin: 0 0 12px 0;">Explore More Articles</h2>
      <p style="font-size: 1.1rem; color: #64748b; margin: 0 auto; max-width: 600px; line-height: 1.5; text-align: center;">Browse our latest guides, salary tips, and calculator tutorials.</p>
    </div>
    <div class="explore-more-grid">
      ${cardsHtml}
    </div>
    <div style="text-align: center; margin-top: 40px;">
      <a class="view-all-articles-link" href="https://salarycalculator.my/blog" style="display: inline-block; font-size: 1.1rem; font-weight: 600; color: #2563eb; text-decoration: none; transition: color 0.2s ease, transform 0.2s ease;">View All Articles →</a>
    </div>
  </div>
</section>
<style>
  .explore-more-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 32px !important;
    margin-top: 32px !important;
  }
  @media (max-width: 640px) {
    .explore-more-grid {
      grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
      gap: 20px !important;
    }
  }
  .explore-more-grid .blog-card {
    display: flex !important;
    flex-direction: column !important;
    text-decoration: none !important;
    height: 100% !important;
    background-color: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03) !important;
    transition: transform 0.2s ease, box-shadow 0.2s ease !important;
    box-sizing: border-box !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }
  .explore-more-grid .blog-card:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
  }
  .explore-more-grid .blog-content {
    padding: 32px !important;
    flex-grow: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    background: #ffffff !important;
    box-sizing: border-box !important;
    border-radius: 12px !important;
  }
  @media (max-width: 640px) {
    .explore-more-grid .blog-content {
      padding: 24px !important;
    }
  }
  .explore-more-grid .blog-title {
    font-size: 1.25rem !important;
    font-weight: 600 !important;
    color: #0f172a !important;
    margin: 0 0 16px 0 !important;
    line-height: 1.4 !important;
    flex-grow: 1 !important;
  }
  .explore-more-grid .blog-meta {
    margin-top: auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
  }
  .explore-more-grid .read-more-link {
    color: #2563eb !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    transition: color 0.15s ease !important;
  }
  .explore-more-grid .blog-card:hover .read-more-link {
    color: #1d4ed8 !important;
  }
  .view-all-articles-link:hover {
    color: #1d4ed8 !important;
    text-decoration: underline !important;
  }
</style>
<!-- END_EXPLORE_MORE_ARTICLES -->
  `.trim();
}

function processHtmlFile(filePath: string, allPosts: any[], pageCategory: string) {
  if (!fs.existsSync(filePath)) return;
  console.log(`Processing file: ${filePath} (Category: ${pageCategory})`);
  let content = fs.readFileSync(filePath, "utf-8");

  const selectedPosts = getArticlesForCategory(allPosts, pageCategory, 4);
  const sectionHtml = buildExploreMoreSection(selectedPosts);

  const startMarker = "<!-- START_EXPLORE_MORE_ARTICLES -->";
  const endMarker = "<!-- END_EXPLORE_MORE_ARTICLES -->";

  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex !== -1 && endIndex !== -1) {
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex + endMarker.length);
    content = before + sectionHtml + after;
  } else {
    const footerIndex = content.toLowerCase().indexOf("<footer");
    if (footerIndex !== -1) {
      const before = content.substring(0, footerIndex);
      const after = content.substring(footerIndex);
      content = before + sectionHtml + "\n" + after;
    } else {
      console.warn(`No footer tag found in ${filePath}, skipping injection.`);
      return;
    }
  }

  fs.writeFileSync(filePath, content, "utf-8");
}

function getFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else if (file.endsWith(".html")) {
      results.push(filePath);
    }
  });
  return results;
}

const fallbackPosts = [
  {
    title: "Basic Salary vs Gross Salary vs Net Salary in Malaysia: What's the Difference?",
    slug: "basic-salary-vs-gross-salary-vs-net-salary-in-malaysia-whats-the-difference",
    category: "Salary"
  },
  {
    title: "How to Calculate Gaji Bersih (Net Salary) in Malaysia: Formula & Example",
    slug: "how-to-calculate-gaji-bersih-net-salary-in-malaysia-formula-example-salary-calculator",
    category: "Salary"
  },
  {
    title: "How to Calculate PCB (Monthly Tax Deduction) in Malaysia: Formula & Example",
    slug: "how-to-calculate-pcb-monthly-tax-deduction-in-malaysia-formula-example",
    category: "PCB / Income Tax"
  },
  {
    title: "How to Calculate EPF (KWSP) in Malaysia: Formula & Contribution Rates",
    slug: "how-to-calculate-epf-kwsp-in-malaysia-formula-contribution-rates",
    category: "EPF"
  }
];

async function run() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app, DB_ID);
  const postsRef = collection(db, COLL);
  const q = query(postsRef, where("status", "==", "published"));
  
  console.log("Fetching posts for injection...");
  let posts: any[] = [];
  
  try {
    const snap = await getDocs(q);
    snap.forEach(doc => {
      const data = doc.data();
      for (const key in data) {
        if (data[key] && typeof data[key] === 'object' && typeof data[key].toDate === 'function') {
          data[key] = data[key].toDate().toISOString();
        }
      }
      posts.push({ ...data, id: doc.id });
    });
  } catch (err) {
    console.warn("Could not fetch posts from Firestore:", err);
  }

  if (posts.length === 0) {
    console.log("Using fallback posts for injection.");
    posts = fallbackPosts;
  }

  posts.sort((a, b) => {
    const dA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dB - dA;
  });

  console.log(`Loaded ${posts.length} posts for injection.`);

  const pageMappings: Record<string, string> = {
    'index.html': 'all',
    'epf-kwsp.html': 'epf',
    'socso-perkeso.html': 'socso',
    'pcb-income-tax.html': 'pcb-income-tax',
    'annual-leave-calculator.html': 'annual-leave',
    'overtime-pay-calculator.html': 'overtime',
    'privacy-policy.html': 'all'
  };

  for (const [filename, cat] of Object.entries(pageMappings)) {
    const filePath = path.join(process.cwd(), filename);
    processHtmlFile(filePath, posts, cat);
  }

  const distDir = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    for (const [filename, cat] of Object.entries(pageMappings)) {
      const filePath = path.join(distDir, filename);
      processHtmlFile(filePath, posts, cat);
    }
  }

  console.log("Injection completed successfully.");
  process.exit(0);
}

run().catch(err => {
  console.error("Injection failed:", err);
  process.exit(1);
});
