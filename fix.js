const fs = require('fs');
let code = fs.readFileSync('api/blog.ts', 'utf-8');
code = code.replace(/try \{\n\s*allPosts = await fetchBlogPostsRest\(\);\n[\s\S]*\}\n\s*\}\n\s*\}/, `try {
        allPosts = await fetchBlogPostsRest();
      } catch (err) {
        console.warn("[FIRESTORE WARNING] REST query failed:", err);
        if (cachedBlogList) {
          console.warn("[CACHE FALLBACK] Serving expired cached blog post list due to Firestore error");
          allPosts = cachedBlogList.posts;
        } else {
          throw err;
        }
      }`);
fs.writeFileSync('api/blog.ts', code);
