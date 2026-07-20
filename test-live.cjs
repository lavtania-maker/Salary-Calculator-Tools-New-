const https = require('https');
https.get('https://salarycalculator.my/blog/basic-salary-vs-gross-salary-vs-net-salary-in-malaysia-whats-the-difference', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
    if(match) {
        match.forEach(m => console.log(m));
    }
  });
});
