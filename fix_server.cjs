const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

// 1. Add route-map import
if (!serverCode.includes('import { ROUTE_MAP, REVERSE_ROUTE_MAP, getEnRoute }')) {
    serverCode = serverCode.replace('import blogHandler from "./api/blog";', 'import blogHandler from "./api/blog";\nimport { ROUTE_MAP, REVERSE_ROUTE_MAP, getEnRoute } from "./src/lib/route-map";');
}

// 2. Remove old ROUTE_MAP definition
serverCode = serverCode.replace(/const ROUTE_MAP: Record<string, string> = {[\s\S]*?REVERSE_ROUTE_MAP\[ms\] = en;\n}/, '');

// 3. Fix /ms/blog route falling through
if (!serverCode.includes('app.get("/ms/blog"')) {
    serverCode = serverCode.replace('app.get("/blog/category/:category", (req, res) => {', 'app.get("/ms/blog", (req, res) => {\n    req.query.lang = "ms";\n    return blogHandler(req as any, res as any);\n  });\n\n  app.get("/ms/blog/category/:category", (req, res) => {\n    req.query.category = req.params.category;\n    req.query.lang = "ms";\n    return blogHandler(req as any, res as any);\n  });\n\n  app.get("/blog/category/:category", (req, res) => {');
}

// 4. Fix app.get("*all") logic
const oldAll = `    app.get("*all", (req, res) => {
      const isMsRoute = req.path.startsWith('/ms/');
      const enRoute = isMsRoute ? REVERSE_ROUTE_MAP[req.path.replace(/\\/$/, '') || '/ms/'] : req.path.replace(/\\/$/, '') || '/';
      
      let htmlFile = htmlPages[enRoute];
      if (!htmlFile && req.path === '/ms/') htmlFile = 'index.html'; // root fix
      if (!htmlFile && enRoute === '/') htmlFile = 'index.html';`;

const newAll = `    app.get("*all", (req, res) => {
      const isMsRoute = req.path.startsWith('/ms/');
      const enRoute = isMsRoute ? getEnRoute(req.path) : (req.path.replace(/\\/$/, '') || '/');
      
      let htmlFile = htmlPages[enRoute];
      if (!htmlFile && enRoute === '/') htmlFile = 'index.html';`;

serverCode = serverCode.replace(oldAll, newAll);

fs.writeFileSync('server.ts', serverCode);
console.log('Fixed server.ts');
