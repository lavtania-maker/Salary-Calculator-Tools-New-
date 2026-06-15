import * as fs from "fs";

const files = ["src/pcb-calculator.ts", "src/epf-kwsp.ts"];

files.forEach((f) => {
  let content = fs.readFileSync(f, "utf8");

  // Remove the old sheetPayload entirely and rewrite it
  const sheetRegex =
    /const sheetPayload = \{[\s\S]*?download_via: "(.*?)",?\s*\};/;
  if (content.match(sheetRegex)) {
    content = content.replace(sheetRegex, (match, downloadViaStr) => {
      return `const sheetPayload = {
          timestamp: new Date().toISOString(),
          email: email,
          userType: role,
          hiringStatus: hiringInputExt?.value || "",
          companyName: companyInputExt?.value?.trim() || "",
          userPhone: phone,
          download_via: "${downloadViaStr}",
        };`;
    });

    fs.writeFileSync(f, content, "utf8");
    console.log("Fixed sheet payload in", f);
  }
});
