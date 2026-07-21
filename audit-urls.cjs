const https = require('https');
const http = require('http');
const fs = require('fs');
const glob = require('glob');

const targetUrls = [
  'https://salarycalculator.my/index.html',
  'http://salarycalculator.my/',
  'http://www.salarycalculator.my/',
  'https://www.salarycalculator.my/',
  'https://www.salarycalculator.my/socso-perkeso'
];

async function checkUrl(urlStr) {
  let hops = 0;
  let currentUrl = urlStr;
  let lastStatus = 0;
  let redirectType = 'None';
  let isFinal200 = false;
  let finalCanonical = '';
  
  while (hops < 10) {
    const res = await new Promise((resolve, reject) => {
      const parsed = new URL(currentUrl);
      const reqModule = parsed.protocol === 'https:' ? https : http;
      const req = reqModule.get(currentUrl, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body
        }));
      });
      req.on('error', reject);
      // timeout after 10s
      req.setTimeout(10000, () => {
        req.abort();
        resolve({ statusCode: 'Timeout', headers: {}, body: '' });
      });
    });
    
    if (hops === 0) {
      lastStatus = res.statusCode;
    }

    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      if (hops === 0) redirectType = res.statusCode;
      hops++;
      const newUrl = new URL(res.headers.location, currentUrl);
      currentUrl = newUrl.href;
    } else {
      if (res.statusCode === 200) {
        isFinal200 = true;
        const match = res.body.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
        if (match) finalCanonical = match[1];
      }
      break;
    }
  }

  return {
    initialStatus: lastStatus,
    redirectType,
    hops,
    finalUrl: currentUrl,
    isFinal200,
    finalCanonical,
    hasRedirectChain: hops > 1
  };
}

async function run() {
  console.log("=== URL Audit ===");
  for (const u of targetUrls) {
    try {
      const res = await checkUrl(u);
      console.log(`\nURL: ${u}`);
      console.log(`1. HTTP Status: ${res.initialStatus}`);
      console.log(`2. Redirect Type: ${res.redirectType}`);
      console.log(`3. Redirect Hops: ${res.hops}`);
      console.log(`4. Final URL: ${res.finalUrl}`);
      console.log(`5. Final HTTP 200: ${res.isFinal200}`);
      console.log(`6. Canonical matches final: ${res.finalCanonical === res.finalUrl} (Canonical: ${res.finalCanonical})`);
      console.log(`9. Redirect Chain Exists: ${res.hasRedirectChain}`);
    } catch(e) {
      console.error(`Error checking ${u}: ${e.message}`);
    }
  }
}
run();
