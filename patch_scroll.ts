import fs from "fs";

const files = [
  "index.html",
  "pcb-income-tax.html",
  "epf-kwsp.html",
  "annual-leave-calculator.html",
];

files.forEach((f) => {
  let content = fs.readFileSync(f, "utf-8");

  if (!content.includes("scrollRestoration")) {
    const script = `
    <script>
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    </script>
    `;

    // Insert after <head>
    content = content.replace("<head>", "<head>" + script);
    fs.writeFileSync(f, content);
    console.log("Patched " + f);
  }
});
