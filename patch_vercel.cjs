const fs = require('fs');

let content = fs.readFileSync('vercel.json', 'utf8');

// Replace the redirects section
const newRedirects = `"redirects": [
    {
      "source": "/index\\\\.html",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/index",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "www.salarycalculator.my" }],
      "destination": "https://salarycalculator.my/$1",
      "permanent": true
    },`;

content = content.replace(/"redirects":\s*\[[\s\S]*?"permanent": true\s*\},/, newRedirects);
// Also remove the old x-forwarded-proto rule which is handled by Vercel defaults anyway.
// Wait, the regex above replaces everything from "redirects": [ to the first "permanent": true },
// Let's just parse it as JSON and rewrite it!
const data = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

// Filter out old www and x-forwarded-proto redirects
data.redirects = data.redirects.filter(r => !r.has);

// Add the new ones at the beginning
data.redirects.unshift(
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "www.salarycalculator.my" }],
      "destination": "https://salarycalculator.my/$1",
      "permanent": true
    }
);
data.redirects.unshift(
    {
      "source": "/index",
      "destination": "/",
      "permanent": true
    }
);
data.redirects.unshift(
    {
      "source": "/index\\\\.html",
      "destination": "/",
      "permanent": true
    }
);

// wait, the index.html regex needs double backslashes in JSON string but as object it's just a string, so "/index\\.html" -> wait, in Vercel json regex, it's just string "/index.html" or "/index\\\.html"?
// Vercel says source is a path-to-regexp. So "/index.html" is fine since . matches character but it matches index.html too.
