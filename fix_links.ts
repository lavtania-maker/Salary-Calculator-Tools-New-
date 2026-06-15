import fs from "fs";
import path from "path";

const replaceLinks = (content: string) => {
  return content
    .replace(/href="\/pcb-income-tax\.html"/g, 'href="/pcb-income-tax"')
    .replace(/href="\/epf-kwsp\.html"/g, 'href="/epf-kwsp"')
    .replace(
      /href="\/annual-leave-calculator\.html"/g,
      'href="/annual-leave-calculator"',
    );
};

const processFile = (filePath: string) => {
  let content = fs.readFileSync(filePath, "utf-8");
  let newContent = replaceLinks(content);

  // also fix window.location.href redirects in ts files
  newContent = newContent.replace(
    /window\.location\.href = "\/pcb-income-tax\.html"/g,
    'window.location.href = "/pcb-income-tax"',
  );

  // Also fix the class in desktop-nav
  // In epf-kwsp.html, check exactly how it's written inside <nav class="desktop-nav">

  // Replace <a href="/annual-leave-calculator" class="footer-link"> with nav-item only in the nav area
  // Wait, let's just do a manual replace for the specific lines.
  const badNavLine =
    '<a href="/annual-leave-calculator" class="footer-link">Annual Leave Calculator</a>';
  const goodNavLine =
    '<a href="/annual-leave-calculator" class="nav-item">Annual Leave Calculator</a>';
  const badNavLineUnreplaced =
    '<a href="/annual-leave-calculator" class="footer-link">Annual Leave Calculator</a>';

  // We don't want to replace the actual footer link at the bottom of the page.
  // Wait, the footer link at the bottom of the page has `class="footer-link"`!
  // If we replace it there it's bad.
  // Let's do it by regex that looks for it immediately following an EPF Calculator link

  newContent = newContent.replace(
    /(<a href="\/epf-kwsp"[^>]*>EPF Calculator<\/a>\s*)<a href="\/annual-leave-calculator" class="(?:footer-link|nav-item\s+active-nav|nav-item)?[^"]*">Annual Leave Calculator<\/a>(?=\s*<\/nav>)/g,
    '$1<a href="/annual-leave-calculator" class="nav-item$2">Annual Leave Calculator</a>',
  );

  // To preserve 'active-nav' if it was there:
  newContent = newContent.replace(
    /(<a href="\/epf-kwsp"[^>]*>EPF Calculator<\/a>\s*)<a href="\/annual-leave-calculator" class="footer-link">Annual Leave Calculator<\/a>(?=\s*<\/nav>)/g,
    '$1<a href="/annual-leave-calculator" class="nav-item">Annual Leave Calculator</a>',
  );

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
  }
};

const processDir = (dirPath: string) => {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (
        !fullPath.includes("node_modules") &&
        !fullPath.includes(".git") &&
        !fullPath.includes("dist") &&
        !fullPath.includes("public")
      ) {
        processDir(fullPath);
      }
    } else {
      if (fullPath.endsWith(".html") || fullPath.endsWith(".ts")) {
        processFile(fullPath);
      }
    }
  }
};

processDir(".");
console.log("done linking");
