import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distServerPath = path.join(__dirname, "dist", "server.cjs");
const isExplicitDev = process.env.npm_lifecycle_event === "dev";

if (!isExplicitDev) {
  process.env.NODE_ENV = "production";

  // Ensure dist/server.cjs exists; if not, build it immediately
  if (!fs.existsSync(distServerPath)) {
    console.log("[server.ts] dist/server.cjs not found, compiling production bundle...");
    const { execSync } = await import("node:child_process");
    execSync(
      "npx esbuild server-app.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
      { stdio: "inherit", cwd: __dirname }
    );
  }

  await import("./dist/server.cjs");
} else {
  await import("./server-app.ts");
}
