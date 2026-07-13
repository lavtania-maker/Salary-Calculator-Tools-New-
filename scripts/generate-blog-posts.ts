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
const catMap: Record<string, string> = {
  'salary': 'Salary',
  'epf': 'EPF',
  'socso': 'SOCSO',
  'annual-leave': 'Annual Leave',
  'pcb-income-tax': 'PCB / Income Tax'
};

async function generate() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app, DB_ID);
  const postsRef = collection(db, COLL);
  const q = query(postsRef, where("status", "==", "published"));
  
  console.log("Fetching posts for static generation...");
  const snap = await getDocs(q);
  const posts: any[] = [];
  
  snap.forEach(doc => {
    const data = doc.data();
    for (const key in data) {
      if (data[key] && typeof data[key] === 'object' && typeof data[key].toDate === 'function') {
        data[key] = data[key].toDate().toISOString();
      }
    }
    posts.push({ ...data, id: doc.id });
  });
  
  console.log(`Found ${posts.length} published posts.`);
  
  const templatePath = path.join(process.cwd(), 'blog-post-template.html');
  if (!fs.existsSync(templatePath)) {
    console.error("Template not found at", templatePath);
    process.exit(1);
  }
  
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  
  // ensure dist/blog directory exists
  const distBlogDir = path.join(process.cwd(), 'dist', 'blog');
  if (!fs.existsSync(distBlogDir)) {
    fs.mkdirSync(distBlogDir, { recursive: true });
  }

  for (const post of posts) {
    if (!post.slug) continue;
    const slug = post.slug;
    
    console.log(`Generating HTML for: ${slug}`);
    
    const $ = cheerio.load(templateHtml);
    
    // related posts logic
    let relatedHtml = '';
    let relatedPosts: any[] = [];
    
    for (const p of posts) {
      if (p.slug !== slug && relatedPosts.length < 3) {
        let pCats = Array.isArray(p.category) ? p.category : [p.category || ""];
        let myCats = Array.isArray(post.category) ? post.category : [post.category || ""];
        if (myCats.some((c: string) => pCats.includes(c))) {
          relatedPosts.push(p);
        }
      }
    }
    if (relatedPosts.length < 3) {
      for (const p of posts) {
        if (p.slug !== slug && relatedPosts.length < 3 && !relatedPosts.find(r => r.slug === p.slug)) {
          relatedPosts.push(p);
        }
      }
    }
    relatedHtml = relatedPosts.map((r: any) => `<li><a href="/blog/${r.slug}" style="color: #2563eb; text-decoration: none;">${r.title}</a></li>`).join('');
    
    if (relatedHtml) {
      $('#related-articles-list').html(relatedHtml);
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
    let faqs: {question: string, answer: string}[] = [];
    let inFaq = false;
    let currentQuestion: string | null = null;
    let currentAnswer: string[] = [];
    
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
        currentAnswer.push($content(el).html() || "");
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
    
    // Save to dist/blog/[slug].html
    const outPath = path.join(distBlogDir, `${slug}.html`);
    fs.writeFileSync(outPath, $.html());
    
    // Also save to dist/blog/[slug]/index.html to support clean URLs if needed by Vercel
    const cleanUrlDir = path.join(distBlogDir, slug);
    if (!fs.existsSync(cleanUrlDir)) {
      fs.mkdirSync(cleanUrlDir, { recursive: true });
    }
    fs.writeFileSync(path.join(cleanUrlDir, 'index.html'), $.html());
  }
  console.log("Static generation complete.");
  process.exit(0);
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
