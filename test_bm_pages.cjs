const http = require('http');

const pages = [
  '/',
  '/ms/',
  '/ms/kalkulator-epf',
  '/ms/kalkulator-socso',
  '/ms/kalkulator-pcb',
  '/ms/kalkulator-cuti-tahunan',
  '/ms/kalkulator-overtime',
  '/ms/kadar-gaji-sejam',
  '/ms/kalkulator-gaji-minimum',
  '/ms/penjana-payslip',
  '/ms/dasar-privasi'
];

async function checkPage(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ path, statusCode: res.statusCode, length: data.length, body: data });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  for (const p of pages) {
    const res = await checkPage(p);
    if (res.error) {
      console.log(`${p}: ERROR ${res.error}`);
    } else {
      // Check title and sample BM strings in body
      const titleMatch = res.body.match(/<title[^>]*>([^<]+)<\/title>/i);
      const h1Match = res.body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().substring(0, 50) : 'None';
      console.log(`${p} [${res.statusCode}]: Title="${titleMatch ? titleMatch[1] : 'None'}" H1="${h1Text}"`);
    }
  }
}

run();
