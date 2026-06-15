import * as fs from "fs";

const files = [
  "src/pcb-calculator.ts",
  "src/epf-kwsp.ts",
  "index.html",
  "src/annual-leave-calculator.ts",
];

files.forEach((f) => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, "utf8");

  // Make sure we have EXACT string keys sent to the backend
  if (f.endsWith(".ts")) {
    const sheetRegex =
      /const sheetPayload = \{[\s\S]*?download_via: "(.*?)",?\s*\};/;
    if (content.match(sheetRegex)) {
      content = content.replace(sheetRegex, (match, downloadViaStr) => {
        return `const sheetPayload = {
          timestamp: new Date().toISOString(),
          "Email": email,
          "User Type": role,
          "Hiring Status": hiringInputExt?.value || "",
          "Company Name": companyInputExt?.value?.trim() || "",
          "User Phone": phone,
          download_via: "${downloadViaStr}",
        };`;
      });
      fs.writeFileSync(f, content, "utf8");
      console.log("Fixed EXACT KEYS in sheet payload in", f);
    }
  }
});
