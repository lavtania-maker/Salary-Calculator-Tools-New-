import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
`      if (isMsRoute && enRoute === null) {
        return next();
      }`,
`      if (isMsRoute && enRoute === null) {
        return res.status(404).send('Not Found');
      }`
);

fs.writeFileSync('server.ts', content);
