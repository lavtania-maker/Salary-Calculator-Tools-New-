import fs from "fs";
let content = fs.readFileSync("server.ts", "utf8");

const msBlogLogic = `
  app.get("/ms/blog/:slug", (req, res, next) => {
    if (req.params.slug && req.params.slug !== "category" && !req.params.slug.includes(".")) {
      req.query.slug = req.params.slug;
      req.query.lang = "ms"; // Flag for the blog post handler to use MS translation
      return blogPostHandler(req as any, res as any);
    }
    next();
  });
`;

content = content.replace('app.get("/blog/:slug",', msBlogLogic + '\n  app.get("/blog/:slug",');
fs.writeFileSync("server.ts", content);
console.log("Patched ms blog route");
