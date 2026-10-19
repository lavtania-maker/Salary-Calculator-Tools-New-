const fs = require('fs');

const path = 'api/blog.ts';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove cache TTL completely or set it to 0
content = content.replace(
  'const LIST_CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache TTL',
  'const LIST_CACHE_TTL = 0; // Disabled cache to ensure immediate updates'
);

// 2. Fix the sorting
const badSort = "allPosts.sort((a, b) => (b.publishedAt || '') > (a.publishedAt || '') ? 1 : -1);";
const goodSort = `const getVal = (v: any) => v?.toDate ? v.toDate().getTime() : v?.seconds ? v.seconds * 1000 : new Date(v || 0).getTime() || 0;
          allPosts.sort((a, b) => getVal(b.publishedAt) - getVal(a.publishedAt));`;

content = content.replace(badSort, goodSort);

fs.writeFileSync(path, content);
