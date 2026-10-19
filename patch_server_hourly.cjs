const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf8');
if (!server.includes('"hourly-rate"')) {
  server = server.replace(
    /const reserved = \["blog",/g,
    'const reserved = ["hourly-rate", "blog",'
  );
  fs.writeFileSync('server.ts', server);
}
