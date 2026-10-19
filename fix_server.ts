import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
`      const isMsRoute = req.path.startsWith('/ms/') || req.path === '/ms';
      const enRoute = isMsRoute ? getEnRoute(req.path) : (req.path.replace(/\\/$/, '') || '/');
      const htmlFile = htmlPages[enRoute] || (req.path.endsWith('.html') ? req.path.slice(1) : undefined);
      if (!htmlFile) return next();`,
`      const isMsRoute = req.path.startsWith('/ms/') || req.path === '/ms';
      const enRoute = isMsRoute ? getEnRoute(req.path) : (req.path.replace(/\\/$/, '') || '/');
      
      if (isMsRoute && enRoute === null) {
        return next();
      }

      const htmlFile = enRoute ? htmlPages[enRoute] || (req.path.endsWith('.html') ? req.path.slice(1) : undefined) : undefined;
      if (!htmlFile) return next();`
);

content = content.replace(
`    app.get("*all", (req, res) => {
      const isMsRoute = req.path.startsWith('/ms/') || req.path === '/ms';
      const enRoute = isMsRoute ? getEnRoute(req.path) : (req.path.replace(/\\/$/, '') || '/');
      
      let htmlFile = htmlPages[enRoute];
      if (!htmlFile && enRoute === '/') htmlFile = 'index.html';
      
      if (htmlFile) {
        const filePath = path.join(distPath, htmlFile);
        if (fs.existsSync(filePath)) {
          const rawHtml = fs.readFileSync(filePath, 'utf8');
          const $ = cheerio.load(rawHtml);
          transformPage($, enRoute, isMsRoute);
          
          res.status(200).setHeader("Content-Type", "text/html");
          return res.send($.html());
        }
      }`,
`    app.get("*all", (req, res) => {
      const isMsRoute = req.path.startsWith('/ms/') || req.path === '/ms';
      const enRoute = isMsRoute ? getEnRoute(req.path) : (req.path.replace(/\\/$/, '') || '/');
      
      if (isMsRoute && enRoute === null) {
        return res.status(404).send('Not Found');
      }
      
      let htmlFile = enRoute ? htmlPages[enRoute] : undefined;
      if (!htmlFile && enRoute === '/') htmlFile = 'index.html';
      
      if (htmlFile) {
        const filePath = path.join(distPath, htmlFile);
        if (fs.existsSync(filePath)) {
          const rawHtml = fs.readFileSync(filePath, 'utf8');
          const $ = cheerio.load(rawHtml);
          transformPage($, enRoute as string, isMsRoute);
          
          res.status(200).setHeader("Content-Type", "text/html");
          return res.send($.html());
        }
      }`
);

fs.writeFileSync('server.ts', content);
