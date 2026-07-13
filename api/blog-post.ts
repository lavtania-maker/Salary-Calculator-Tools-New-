import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, limit } from "firebase/firestore";

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
const db = getFirestore(app, DB_ID);

const catMap: Record<string, string> = {
  'salary': 'Salary',
  'epf': 'EPF',
  'socso': 'SOCSO',
  'annual-leave': 'Annual Leave',
  'pcb-income-tax': 'PCB / Income Tax'
};

// In-memory cache to prevent quota exhaustion and ensure ultra-fast rendering for Googlebot
interface BlogPostCacheEntry {
  post: any;
  timestamp: number;
}
const blogPostCache = new Map<string, BlogPostCacheEntry>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache TTL

export default async function handler(req: any, res: any) {
  let slug = req.query?.slug || req.params?.slug;
  
  if (!slug || typeof slug !== 'string') {
    return res.status(400).send("Missing slug");
  }

  // Normalize slug to handle any trailing slash
  slug = slug.trim().replace(/\/$/, "");

  try {
    // Check in-memory cache first to guarantee 100% SLA and zero Firestore reads on repeat requests
    let post: any = null;
    const now = Date.now();
    const cached = blogPostCache.get(slug);

    if (cached && (now - cached.timestamp < CACHE_TTL)) {
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
    let templatePath = path.join(process.cwd(), 'public', 'blog-post-template.html');
    if (!fs.existsSync(templatePath)) {
       templatePath = path.join(process.cwd(), 'dist', 'blog-post-template.html');
       if (!fs.existsSync(templatePath)) {
           templatePath = path.join(process.cwd(), 'blog-post-template.html');
       }
    }
    const html = fs.readFileSync(templatePath, 'utf-8');
    const $ = cheerio.load(html);

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
      "@type": "Article",
      headline: post.title,
      description: post.excerpt || "",
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
    res.setHeader("Cache-Control", "public, s-maxage=3600");
    return res.status(200).send($.html());
  } catch (error) {
    console.error("Error loading article:", error);
    res.status(500).send("Error loading article");
  }
}
