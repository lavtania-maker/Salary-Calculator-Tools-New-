import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
`  app.get(["/ms/blog", "/ms/blog/*all"], (req, res) => {
    return res.redirect(301, "/ms/");
  });`,
``
);

fs.writeFileSync('server.ts', content);
