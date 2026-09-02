const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Add redirect for index.html in Vite dev middleware
content = content.replace(
  `app.use(async (req, res, next) => {`,
  `app.use((req, res, next) => {
      if (req.path === '/index.html' || req.path === '/index') {
        return res.redirect(308, '/');
      }
      next();
    });
    
    app.use(async (req, res, next) => {`
);

// Add redirect for index.html in prod middleware before express.static
content = content.replace(
  `app.use(express.static(distPath, {`,
  `app.use((req, res, next) => {
      if (req.path === '/index.html' || req.path === '/index') {
        return res.redirect(308, '/');
      }
      
      // Also redirect www if needed
      if (req.hostname === 'www.salarycalculator.my') {
        return res.redirect(308, 'https://salarycalculator.my' + req.originalUrl);
      }
      next();
    });
    app.use(express.static(distPath, {`
);

fs.writeFileSync('server.ts', content);
