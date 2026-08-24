const fs = require('fs');
const code = fs.readFileSync('server.ts', 'utf8');
const start = code.indexOf('function transformPage');
const end = code.indexOf('dotenv.config()', start);
console.log(code.substring(start, end));
