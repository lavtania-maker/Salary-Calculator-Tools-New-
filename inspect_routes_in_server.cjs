const fs = require('fs');
const code = fs.readFileSync('server.ts', 'utf8');
// find all res.send or transformPage usages in server.ts
const lines = code.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('transformPage') || line.includes('isMsRoute') || line.includes('.html')) {
    console.log(`Line ${idx+1}: ${line}`);
  }
});
