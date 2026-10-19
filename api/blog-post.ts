import { ROUTE_MAP, getEnRoute } from '../src/lib/route-map';
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, collection, query, where, getDocs, limit } from "firebase/firestore";

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

const catMap: Record<string, string> = {
  'salary': 'Salary',
  'epf': 'EPF',
  'socso': 'SOCSO',
  'annual-leave': 'Annual Leave',
  'pcb-income-tax': 'PCB / Income Tax',
  'overtime': 'Overtime'
};

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

// In-memory cache to prevent quota exhaustion and ensure ultra-fast rendering for Googlebot
interface BlogPostCacheEntry {
  post: any;
  timestamp: number;
}
const blogPostCache = new Map<string, BlogPostCacheEntry>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache TTL

interface BlogListCache {
  posts: any[];
  timestamp: number;
}
let cachedBlogList: BlogListCache | null = null;
const LIST_CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache TTL

function getArticlesForCategory(allPosts: any[], targetCategory: string, count: number = 4, excludeSlug: string = ''): any[] {
  const targetNorm = targetCategory.toLowerCase().trim();

  // If targetCategory is empty, 'all', 'featured', or 'salary' for homepage/generic
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

export default async function handler(req: any, res: any) {
  let slug = req.query?.slug || req.params?.slug;
  
  if (!slug || typeof slug !== 'string') {
    return res.status(400).send("Missing slug");
  }

  // Normalize slug to handle any trailing slash
  slug = slug.trim().replace(/\/$/, "");

  const reservedSlugs: Record<string, string> = {
    "hourly-rate": "/hourly-rate-calculator",
    "pcb-income-tax": "/pcb-calculator",
    "payslip": "/payslip-generator",
  };
  if (reservedSlugs[slug]) {
    const target = reservedSlugs[slug];
    if (target !== `/${slug}` && req.path !== target) {
      if (typeof (res as any).redirect === 'function') {
        return (res as any).redirect(301, target);
      }
      res.writeHead(301, { Location: target });
      return res.end();
    }
  }

  const bypassCache = req.query?.nocache === "true" || req.query?.refresh === "true";

  try {
    // Check in-memory cache first to guarantee 100% SLA and zero Firestore reads on repeat requests
    let post: any = null;
    const now = Date.now();
    const cached = blogPostCache.get(slug);

    if (cached && (now - cached.timestamp < CACHE_TTL) && !bypassCache) {
      console.log(`[CACHE HIT] Serving blog post from in-memory cache for slug: ${slug}`);
      post = cached.post;
    } else {
      console.log(`[CACHE MISS] Fetching blog post from Firestore for slug: ${slug}`);
      try {
        const postsRef = collection(db, COLL);
        // Query specifically by slug and status, limiting to 1 document (O(1) database cost!)
        const q = query(postsRef, where("slug", "==", slug), where("status", "==", "published"), limit(1));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const unwrapped = doc.data();
          post = { ...unwrapped, id: doc.id };
          // Normalize Timestamps or objects to ISO strings
          for (const key in post) {
            const val = post[key];
            if (val && typeof val === 'object' && typeof val.toDate === 'function') {
              post[key] = val.toDate().toISOString();
            }
          }
        });

        // Cache the result (including null to avoid repeated database scans for bad URLs)
        blogPostCache.set(slug, { post, timestamp: now });
      } catch (firestoreError) {
        console.error(`[FIRESTORE ERROR] Failed to fetch blog post for slug: ${slug}:`, firestoreError);
        // Fallback to expired cache if we have it, to guarantee high availability
        if (cached) {
          console.warn(`[CACHE FALLBACK] Serving expired cached post for slug: ${slug} due to Firestore error`);
          post = cached.post;
        } else {
          throw firestoreError;
        }
      }
    }

    // 2. Load Template
    let templatePath = path.join(process.cwd(), 'blog-post-template.html');
    if (!fs.existsSync(templatePath)) {
       templatePath = path.join(process.cwd(), 'dist', 'blog-post-template.html');
       if (!fs.existsSync(templatePath)) {
           templatePath = path.join(process.cwd(), 'public', 'blog-post-template.html');
       }
    }
    const html = fs.readFileSync(templatePath, 'utf-8');
    const $ = cheerio.load(html);

    let relatedHtml = '';
    if (post) {
      try {
        const postsRef = collection(db, COLL);
        const qRelated = query(postsRef, where("status", "==", "published"), limit(10));
        const relSnap = await getDocs(qRelated);
        let relatedPosts: any[] = [];
        relSnap.forEach((d: any) => {
          const data = d.data();
          if (data.slug !== slug && relatedPosts.length < 3) {
            let pCats = Array.isArray(data.category) ? data.category : [data.category || ""];
            let myCats = Array.isArray(post.category) ? post.category : [post.category || ""];
            if (myCats.some((c: string) => pCats.includes(c))) {
              relatedPosts.push(data);
            }
          }
        });
        if (relatedPosts.length < 3) {
          relSnap.forEach((d: any) => {
            const data = d.data();
            if (data.slug !== slug && relatedPosts.length < 3 && !relatedPosts.find(r => r.slug === data.slug)) {
              relatedPosts.push(data);
            }
          });
        }
        relatedHtml = relatedPosts.map((r: any) => `<li><a href="/blog/${r.slug}" style="color: #2563eb; text-decoration: none;">${r.title}</a></li>`).join('');
      } catch (e) {
        console.error("Error fetching related posts", e);
      }
    }
    if (relatedHtml) {
      $('#related-articles-list').html(relatedHtml);
    }

    const enUrl = '/blog/' + slug;
    const msUrl = '/ms/';
    const canonicalUrl = 'https://salarycalculator.my' + enUrl;

    $('html').attr('lang', 'en');
    $('link[rel="canonical"]').attr('href', canonicalUrl);
    $('link[rel="alternate"]').remove(); // No hreflang tags for blog pages

    $('.lang-en').attr('href', enUrl).css('color', 'var(--primary-color)').css('font-weight', '600');
    $('.lang-ms').attr('href', msUrl).css('color', 'var(--text-muted)').css('font-weight', '400');


    if (!post) {
      // Return 404 populated template
      $('title').text("Article Not Found – HR & Salary Blog Malaysia");
      $('#loading-skeleton').css('display', 'none');
      $('#article-main').css('display', 'block');
      $('#article-title').text("Article Not Found");
      $('#article-content').html('<p>The article you are looking for does not exist or may have been removed. Browse the <a href="/blog">full blog</a> instead.</p>');
      $('head').prepend('<script>window.__SSR_COMPLETE = true;</script>');

      res.setHeader("Content-Type", "text/html");
      return res.status(404).send($.html());
    }

    // 3. Populate Template
    const titleText = post.title + " – HR & Salary Blog Malaysia";
    const descText = post.metaDesc || post.excerpt || "";
    const pageUrl = "https://salarycalculator.my/blog/" + slug;
    const imageUrl = post.image || "https://salarycalculator.my/logo-small.png";

    $('title').text(titleText);
    
    if (post.metaDesc) $('meta[name="description"]').attr('content', post.metaDesc);
    else if (post.excerpt) $('meta[name="description"]').attr('content', post.excerpt);

    if (post.metaTitle) $('meta[name="title"]').attr('content', post.metaTitle);
    else $('meta[name="title"]').attr('content', post.title);

    if (post.metaKeywords) $('meta[name="keywords"]').attr('content', post.metaKeywords);

    $('link[rel="canonical"]').attr('href', pageUrl);

    // Populate OG & Twitter tags
    $('meta[property="og:title"]').attr('content', titleText);
    $('meta[property="og:description"]').attr('content', descText);
    $('meta[property="og:url"]').attr('content', pageUrl);
    $('meta[property="og:image"]').attr('content', imageUrl);

    $('meta[property="twitter:title"]').attr('content', titleText);
    $('meta[property="twitter:description"]').attr('content', descText);
    $('meta[property="twitter:image"]').attr('content', imageUrl);

    $('#breadcrumb-title').text(post.title);
    $('#article-title').text(post.title);

    let cats = Array.isArray(post.category) ? post.category : [post.category || ""];
    let catLinks = cats.filter((c: string) => c).map((c: string) => {
      let catSlug = c.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-').replace(/-+/g, '-');
      if (catSlug === 'perkeso') catSlug = 'socso';
      let displayCat = catMap[catSlug] || c.replace(/-/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase());
      return '<a href="/blog/category/' + catSlug + '" style="color: inherit; text-decoration: none;">' + displayCat + '</a>';
    });

    if (catLinks.length > 0) {
      $('#article-category').html(catLinks.join(' <span class="bullet" style="margin: 0 8px;">•</span> '));
      $('#bullet-1').css('display', 'inline');
    } else {
      $('#article-category').text('');
      $('#bullet-1').css('display', 'none');
    }

    if (post.publishedAt) {
      const dt = new Date(post.publishedAt);
      $('#article-date').text(isNaN(dt.getTime()) ? post.publishedAt : dt.toLocaleDateString("en-MY", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }));
      $('#bullet-2').css('display', 'inline');
    } else {
      $('#bullet-2').css('display', 'none');
    }

    if (post.readTime) {
      $('#article-read-time').text(post.readTime + " min read");
    } else {
      const words = (post.content || "").split(" ").length;
      const readTime = Math.ceil(words / 200);
      $('#article-read-time').text(readTime + " min read");
    }

    const $content = cheerio.load(post.content || "", null, false);
    $content('table').each((i, el) => {
      $(el).wrap('<div class="table-wrapper"></div>');
    });
    
    const headings = $content('h2');
    if (headings.length >= 2) {
      headings.each((index, el) => {
        let headingId = $(el).attr('id');
        if (!headingId) {
          headingId = "heading-" + index;
          $(el).attr('id', headingId); 
        }
        $('#toc-list').append(`<li><a href="#${headingId}">${$(el).text()}</a></li>`);
      });
      $('#article-toc').css('display', 'block');
    } else {
      $('#article-toc').css('display', 'none');
    }

    $('#article-content').html($content.html() || "");

    if (post.image) {
      $('#article-featured-image').attr('src', post.image);
      $('#article-featured-image').attr('alt', post.title);
      $('#article-featured-image-container').css('display', 'block');
    } else {
      $('#article-featured-image-container').css('display', 'none');
    }

    if (post.readMoreUrl) {
      $('#read-more-link').attr('href', post.readMoreUrl);
      $('#read-more-container').css('display', 'block');
    } else {
      $('#read-more-container').css('display', 'none');
    }

    // Dynamic CTA mapping rules (7 categories with distinct heading, description, button, and URL)
    interface CtaConfig {
      id: string;
      heading: string;
      description: string;
      button: string;
      url: string;
    }

    const CTA_VARIANTS: Record<string, CtaConfig> = {
      // A. General Salary Articles
      salary: {
        id: 'salary',
        heading: 'Calculate Your Take-Home Salary Easily',
        description: 'Find out how much salary you take home after EPF, SOCSO, EIS and PCB deductions. Use our free Malaysia Salary Calculator to estimate your monthly and annual pay.',
        button: 'Salary Calculator',
        url: 'https://salarycalculator.my/'
      },
      // B. SOCSO / PERKESO Articles
      socso: {
        id: 'socso',
        heading: 'Calculate Your SOCSO Contributions',
        description: 'Check your estimated SOCSO contributions as an employee or employer in Malaysia. Use our free SOCSO Calculator to estimate monthly contributions based on your salary.',
        button: 'SOCSO Calculator',
        url: 'https://salarycalculator.my/socso-calculator'
      },
      // C. PCB / Income Tax Articles
      pcb: {
        id: 'pcb',
        heading: 'Estimate Your Monthly PCB Deductions',
        description: 'Calculate your estimated Monthly Tax Deduction (PCB) based on your salary and applicable tax details. Use our free PCB Calculator to understand your estimated monthly tax deductions in Malaysia.',
        button: 'PCB Calculator',
        url: 'https://salarycalculator.my/pcb-calculator'
      },
      // D. EPF / KWSP Articles
      epf: {
        id: 'epf',
        heading: 'Calculate Your EPF Contributions',
        description: 'Find out how much you and your employer contribute to EPF each month. Use our free EPF Calculator to estimate employee contributions, employer contributions and total EPF savings.',
        button: 'EPF Calculator',
        url: 'https://salarycalculator.my/epf-kwsp'
      },
      // E. Overtime Articles
      overtime: {
        id: 'overtime',
        heading: 'Calculate Your Overtime Pay',
        description: 'Want to estimate how much you could earn from overtime? Use our free Overtime Calculator to estimate overtime pay based on your salary, working hours and overtime type in Malaysia.',
        button: 'Overtime Calculator',
        url: 'https://salarycalculator.my/overtime-pay-calculator'
      },
      // F. Annual Leave Articles
      'annual-leave': {
        id: 'annual-leave',
        heading: 'Calculate Your Annual Leave Entitlement',
        description: 'Check your annual leave entitlement and remaining leave balance with our free Annual Leave Calculator. Estimate your leave based on your employment details and applicable entitlement in Malaysia.',
        button: 'Annual Leave Calculator',
        url: 'https://salarycalculator.my/annual-leave-calculator'
      },
      // G. Hourly Rate Articles
      'hourly-rate': {
        id: 'hourly-rate',
        heading: 'Calculate Your Hourly Pay Rate',
        description: 'Find out how much you earn per hour based on your salary and working hours. Use our free Hourly Rate Calculator to estimate your hourly pay in Malaysia, whether for budgeting or work-related calculations.',
        button: 'Hourly Rate Calculator',
        url: 'https://salarycalculator.my/hourly-rate-calculator'
      }
    };

    // Explicit article mappings based on primary topic and search intent
    const KNOWN_ARTICLE_CTA_MAP: Record<string, string> = {
      'salary-after-epf-socso-eis-how-much-do-you-take-home': 'salary',
      'annual-leave-al-in-malaysia-entitlement-rules-how-to-calculate': 'annual-leave',
      'how-to-calculate-gaji-bersih-net-salary-in-malaysia-formula-example-salary-calculator': 'salary',
      'how-to-calculate-pcb-monthly-tax-deduction-in-malaysia-formula-example': 'pcb',
      'basic-salary-vs-gross-salary-vs-net-salary-in-malaysia-whats-the-difference': 'salary',
      'salary-deductions-in-malaysia-how-they-affect-your-take-home-salary': 'salary',
      'hourly-rate-in-malaysia-how-much-do-you-earn-per-hour': 'hourly-rate',
      'how-to-calculate-epf-kwsp-in-malaysia-formula-contribution-rates': 'epf',
      'public-holidays-in-malaysia-2027-full-calendar-annual-leave-overtime': 'annual-leave',
      'perkeso-lindung-24-jam-skbbk-coverage-contribution-rates-opt-out-guide-2026': 'socso',
      'epf-socso-eis-malaysia-latest-contribution-rates-employer-guide-2026': 'salary',
      'how-to-calculate-overtime-pay-in-malaysia-normal-days-rest-days-public-holidays': 'overtime'
    };

    const resolveCta = (p: any, postSlug: string): CtaConfig => {
      // 1. Explicit override on article
      if (p && p.ctaType && CTA_VARIANTS[p.ctaType]) {
        return CTA_VARIANTS[p.ctaType];
      }

      // 2. Exact match for known published article slugs
      const s = (postSlug || '').toLowerCase().trim();
      if (s && KNOWN_ARTICLE_CTA_MAP[s]) {
        return CTA_VARIANTS[KNOWN_ARTICLE_CTA_MAP[s]];
      }

      // 3. Category matching
      const pCats = (Array.isArray(p?.category) ? p.category : [p?.category || ''])
        .filter(Boolean)
        .map((c: string) => c.toLowerCase().trim().replace(/\//g, '-').replace(/\s+/g, '-').replace(/-+/g, '-'));

      if (pCats.includes('hourly-rate')) return CTA_VARIANTS['hourly-rate'];
      if (pCats.includes('annual-leave')) return CTA_VARIANTS['annual-leave'];
      if (pCats.includes('overtime')) return CTA_VARIANTS['overtime'];
      if (pCats.includes('pcb') || pCats.includes('pcb-income-tax') || pCats.includes('tax')) return CTA_VARIANTS['pcb'];
      if (pCats.includes('socso') || pCats.includes('perkeso') || pCats.includes('eis')) return CTA_VARIANTS['socso'];
      if (pCats.includes('epf') || pCats.includes('kwsp')) return CTA_VARIANTS['epf'];
      if (pCats.includes('salary')) return CTA_VARIANTS['salary'];

      // 4. Content / metadata analysis
      const text = `${p?.title || ''} ${s} ${p?.metaTitle || ''} ${p?.excerpt || ''}`.toLowerCase();
      if (text.includes('hourly rate') || text.includes('per hour') || text.includes('hourly-rate')) {
        return CTA_VARIANTS['hourly-rate'];
      }
      if (text.includes('annual leave') || text.includes('annual-leave') || text.includes('leave entitlement') || text.includes('cuti tahunan')) {
        return CTA_VARIANTS['annual-leave'];
      }
      if (text.includes('overtime') || text.includes('ot pay') || text.includes('overtime pay') || text.includes('kerja lebih masa')) {
        return CTA_VARIANTS['overtime'];
      }
      if (text.includes('pcb') || text.includes('tax deduction') || text.includes('income tax') || text.includes('cukai pendapatan') || text.includes('mtd')) {
        return CTA_VARIANTS['pcb'];
      }
      if (text.includes('socso') || text.includes('perkeso') || text.includes('eis') || text.includes('skbbk')) {
        return CTA_VARIANTS['socso'];
      }
      if (text.includes('epf') || text.includes('kwsp')) {
        return CTA_VARIANTS['epf'];
      }
      if (text.includes('salary') || text.includes('gaji') || text.includes('take-home') || text.includes('net salary') || text.includes('payroll')) {
        return CTA_VARIANTS['salary'];
      }

      // Default fallback
      return CTA_VARIANTS['salary'];
    };

    const matchedCta = resolveCta(post, slug);

    // Update CTA Box Heading, Description, and Button
    $('#cta-heading').text(matchedCta.heading);
    $('#cta-related h3').text(matchedCta.heading);
    $('#cta-description').text(matchedCta.description);
    $('#cta-related > p').first().text(matchedCta.description);
    $('.cta-buttons').html(`<a href="${matchedCta.url}" class="cta-btn-primary">${matchedCta.button}</a>`);


    // Parse FAQ for Schema
    let faqs = [];
    let inFaq = false;
    let currentQuestion = null;
    let currentAnswer = [];
    
    $content('*').each((i, el) => {
      const tag = el.type === "tag" ? el.name.toLowerCase() : "";
      const text = $content(el).text().trim();
      
      if (tag === 'h2') {
        if (text.toLowerCase().includes('faq') || text.toLowerCase().includes('frequently asked')) {
          inFaq = true;
        } else {
          if (inFaq && currentQuestion) {
            faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ') });
            currentQuestion = null;
            currentAnswer = [];
          }
          inFaq = false;
        }
      } else if (inFaq && tag === 'h3') {
        if (currentQuestion) {
          faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ') });
        }
        currentQuestion = text;
        currentAnswer = [];
      } else if (inFaq && currentQuestion && (tag === 'p' || tag === 'ul' || tag === 'ol')) {
        currentAnswer.push($content(el).html());
      }
    });
    if (currentQuestion) {
      faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ') });
    }
    
    // Schema
    let dateMod = post.updatedAt || post.publishedAt || "";
    if (typeof dateMod === 'string' && dateMod) {
      const d = new Date(dateMod);
      if (!isNaN(d.getTime())) dateMod = d.toISOString();
    }
    
    let datePub = post.publishedAt || "";
    if (typeof datePub === 'string' && datePub) {
      const d = new Date(datePub);
      if (!isNaN(d.getTime())) datePub = d.toISOString();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt || "",
      image: imageUrl,
      datePublished: datePub,
      dateModified: dateMod,
      author: [
        {
          "@type": "Organization",
          name: "SalaryCalculator.my Team",
          url: "https://salarycalculator.my/",
        },
      ],
      publisher: {
        "@type": "Organization",
        name: "SalaryCalculator.my",
      },
      mainEntityOfPage: "https://salarycalculator.my/blog/" + slug,
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://salarycalculator.my/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://salarycalculator.my/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title
        }
      ]
    };
    
    // Remove existing placeholder schemas
    $('#schema-article').remove();
    $('#schema-breadcrumb').remove();
    
    $('head').append(`<script type="application/ld+json" id="schema-article">${JSON.stringify(schema)}</script>`);

    $('head').append(`<script type="application/ld+json" id="schema-breadcrumb">${JSON.stringify(breadcrumbSchema)}</script>`);
    
    if (faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      };
      $('head').append(`<script type="application/ld+json" id="schema-faq">${JSON.stringify(faqSchema)}</script>`);
    }
    
    $('#loading-skeleton').css('display', 'none');
    $('#article-main').css('display', 'block');
    $('head').prepend('<script>window.__SSR_COMPLETE = true;</script>');

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    return res.status(200).send($.html());
  } catch (error) {
    console.error("Error loading article:", error);
    res.status(500).send("Error loading article");
  }
}
