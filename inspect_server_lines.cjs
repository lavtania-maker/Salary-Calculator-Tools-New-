const fs = require('fs');
const lines = fs.readFileSync('server.ts', 'utf8').split('\n');
console.log('Lines 880-1000:');
console.log(lines.slice(880, 1000).join('\n'));
