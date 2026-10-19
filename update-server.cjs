const fs = require('fs');

let serverContent = fs.readFileSync('server.ts', 'utf8');

const htmlPagesBlock = `    const htmlPages: Record<string, string> = {
      "/": "index.html",
      "/index.html": "index.html",
      "/admin": "admin.html",
      "/admin.html": "admin.html",
      "/mincal": "mincal.html",
      "/mincal.html": "mincal.html",
      "/payslip": "payslip.html",
      "/payslip.html": "payslip.html",
      "/payslip-generator": "payslip.html",
      "/report": "report.html",
      "/report.html": "report.html",
      "/epf-kwsp": "epf-kwsp.html",
      "/epf-kwsp.html": "epf-kwsp.html",
      "/socso-perkeso": "socso-perkeso.html",
      "/socso-perkeso.html": "socso-perkeso.html",
      "/epfreport": "epfreport.html",
      "/epfreport.html": "epfreport.html",
      "/socsoreport": "socsoreport.html",
      "/socsoreport.html": "socsoreport.html",
      "/privacy-policy": "privacy-policy.html",
      "/privacy-policy.html": "privacy-policy.html",
      "/pcb-calculator": "pcb-income-tax.html",
      "/pcb-calculator.html": "pcb-income-tax.html",
      "/pcb-income-tax": "pcb-income-tax.html",
      "/pcb-income-tax.html": "pcb-income-tax.html",
      "/annual-leave-calculator": "annual-leave-calculator.html",
      "/overtime-pay-calculator": "overtime-pay-calculator.html",
      "/hourly-rate": "hourly-rate.html",
      "/hourly-rate.html": "hourly-rate.html",
      "/overtime-pay-calculator.html": "overtime-pay-calculator.html",
      "/annual-leave-calculator.html": "annual-leave-calculator.html",
      "/blog": "blog.html",
      "/blog.html": "blog.html",
      "/blog-post-template": "blog-post-template.html",
      "/blog-post-template.html": "blog-post-template.html",
    };`;

serverContent = serverContent.replace(htmlPagesBlock, '');

const sharedHtmlPages = `  const htmlPages: Record<string, string> = {
    "/": "index.html",
    "/index.html": "index.html",
    "/admin": "admin.html",
    "/admin.html": "admin.html",
    "/mincal": "mincal.html",
    "/mincal.html": "mincal.html",
    "/payslip": "payslip.html",
    "/payslip.html": "payslip.html",
    "/payslip-generator": "payslip.html",
    "/report": "report.html",
    "/report.html": "report.html",
    "/epf-kwsp": "epf-kwsp.html",
    "/epf-kwsp.html": "epf-kwsp.html",
    "/socso-perkeso": "socso-perkeso.html",
    "/socso-perkeso.html": "socso-perkeso.html",
    "/epfreport": "epfreport.html",
    "/epfreport.html": "epfreport.html",
    "/socsoreport": "socsoreport.html",
    "/socsoreport.html": "socsoreport.html",
    "/privacy-policy": "privacy-policy.html",
    "/privacy-policy.html": "privacy-policy.html",
    "/pcb-calculator": "pcb-income-tax.html",
    "/pcb-calculator.html": "pcb-income-tax.html",
    "/pcb-income-tax": "pcb-income-tax.html",
    "/pcb-income-tax.html": "pcb-income-tax.html",
    "/annual-leave-calculator": "annual-leave-calculator.html",
    "/overtime-pay-calculator": "overtime-pay-calculator.html",
    "/hourly-rate": "hourly-rate.html",
    "/hourly-rate.html": "hourly-rate.html",
    "/overtime-pay-calculator.html": "overtime-pay-calculator.html",
    "/annual-leave-calculator.html": "annual-leave-calculator.html",
    "/blog": "blog.html",
    "/blog.html": "blog.html",
    "/blog-post-template": "blog-post-template.html",
    "/blog-post-template.html": "blog-post-template.html",
  };

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {`;

serverContent = serverContent.replace(
  '  // Vite middleware for development\n  if (process.env.NODE_ENV !== "production") {',
  sharedHtmlPages
);

const devRouteMatch = `      const urlPath = req.path;
      const htmlFile = htmlPages[urlPath];`;
const devRouteReplace = `      const cleanPath = req.path.replace(/\\/$/, '') || '/';
      const htmlFile = htmlPages[cleanPath] || (req.path.endsWith('.html') ? req.path.slice(1) : undefined);`;

serverContent = serverContent.replace(devRouteMatch, devRouteReplace);

const prodRouteMatch = `    // For MPA, we don't necessarily want a single catch-all that returns index.html
    // unless it's truly a fallback.
    app.get("*all", (req, res) => {
      // If none of the static files matched, check if it's a blog post`;

const prodRouteReplace = `    // For MPA, we don't necessarily want a single catch-all that returns index.html
    // unless it's truly a fallback.
    app.get("*all", (req, res) => {
      const cleanPath = req.path.replace(/\\/$/, '') || '/';
      const htmlFile = htmlPages[cleanPath];
      
      if (htmlFile) {
        const filePath = path.join(distPath, htmlFile);
        if (fs.existsSync(filePath)) {
          return res.sendFile(filePath);
        }
      }

      // If none of the static files matched, check if it's a blog post`;

serverContent = serverContent.replace(prodRouteMatch, prodRouteReplace);

fs.writeFileSync('server.ts', serverContent, 'utf8');
console.log('Update complete.');
