const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

function fetchBuffer(url, userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)") {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': userAgent } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location, userAgent).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  console.log("1. Generating SalaryCalculator.my Logo (logo-small.png)...");
  try {
    const logoJpgUrl = 'https://s3-ap-southeast-1.amazonaws.com/ricebowl/images/marketing-campaign/image-3c82ee7b-8135-40c5-80cd-6e1717bf265e.jpg';
    const rawJpgBuf = await fetchBuffer(logoJpgUrl);
    const image = await Jimp.read(rawJpgBuf);

    // Make white transparent and crop
    let minX = image.bitmap.width;
    let minY = image.bitmap.height;
    let maxX = 0;
    let maxY = 0;

    for (let y = 0; y < image.bitmap.height; y++) {
      for (let x = 0; x < image.bitmap.width; x++) {
        const color = image.getPixelColor(x, y);
        const r = (color >> 24) & 0xFF;
        const g = (color >> 16) & 0xFF;
        const b = (color >> 8) & 0xFF;
        if (r < 245 || g < 245 || b < 245) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    for (let y = 0; y < image.bitmap.height; y++) {
      for (let x = 0; x < image.bitmap.width; x++) {
        const color = image.getPixelColor(x, y);
        const r = (color >> 24) & 0xFF;
        const g = (color >> 16) & 0xFF;
        const b = (color >> 8) & 0xFF;
        if (r > 248 && g > 248 && b > 248) {
          image.setPixelColor(0x00000000, x, y);
        }
      }
    }

    if (maxX > minX && maxY > minY) {
      image.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
    }

    const pngBuffer = await image.getBuffer('image/png');
    fs.writeFileSync('public/logo-small.png', pngBuffer);
    if (fs.existsSync('logo-small.png')) fs.writeFileSync('logo-small.png', pngBuffer);
    console.log("Successfully saved public/logo-small.png (Size:", pngBuffer.length, "bytes, Header:", pngBuffer.slice(0, 8).toString('hex'), ")");
  } catch (e) {
    console.error("Error generating logo-small.png:", e);
  }

  console.log("\n2. Generating Favicon (favicon-ricebowl.png)...");
  try {
    const favUrl = 'https://s3-ap-southeast-1.amazonaws.com/ricebowl/images/marketing-campaign/image-a042dd24-6c42-4872-bcca-15280045d191.png';
    const favBuf = await fetchBuffer(favUrl);
    const favImg = await Jimp.read(favBuf);
    favImg.resize({ w: 64, h: 64 });
    const favPng = await favImg.getBuffer('image/png');
    fs.writeFileSync('public/favicon-ricebowl.png', favPng);
    if (fs.existsSync('favicon-ricebowl.png')) fs.writeFileSync('favicon-ricebowl.png', favPng);
    console.log("Successfully saved public/favicon-ricebowl.png (Size:", favPng.length, "bytes)");
  } catch (e) {
    console.error("Error generating favicon:", e);
  }

  console.log("\n3. Generating EPF Logo (epf-logo.png)...");
  try {
    const epfSvgUrl = "https://upload.wikimedia.org/wikipedia/en/6/64/Employees_Provident_Fund_%28Malaysia%29_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original";
    const epfSvgBuf = await fetchBuffer(epfSvgUrl, "SalaryCalculatorBot/1.0 (admin@salarycalculator.my)");
    fs.writeFileSync('public/epf-logo.svg', epfSvgBuf);
    
    // Also generate PNG using Jimp or Playwright if available, or write clean SVG-backed PNG
    console.log("Saved public/epf-logo.svg (Size:", epfSvgBuf.length, ")");
  } catch (e) {
    console.error("Error fetching epf svg:", e);
  }
}

run();
