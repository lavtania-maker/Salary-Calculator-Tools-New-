import fs from "fs";

const files = ["index.html", "pcb-calculator.html", "epf-kwsp.html"];

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");

  // Strip style from table-container and similar wrappers
  content = content.replace(
    /(class="(?:table-container|seo-table-wrapper|contribution-table-wrapper)"[^>]*?)\s*style="[^"]*"/gs,
    "$1",
  );
  content = content.replace(
    /style="[^"]*"\s*(class="(?:table-container|seo-table-wrapper|contribution-table-wrapper)")/gs,
    "$1",
  );

  // Also styled-table inline styles (some tables have border: none and width: 100% inline)
  content = content.replace(
    /(class="(?:styled-table|seo-table|contribution-table)"[^>]*?)\s*style="[^"]*"/gs,
    "$1",
  );
  content = content.replace(
    /style="[^"]*"\s*(class="(?:styled-table|seo-table|contribution-table)")/gs,
    "$1",
  );

  fs.writeFileSync(file, content, "utf8");
});
