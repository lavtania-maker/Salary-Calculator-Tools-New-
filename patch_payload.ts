import * as fs from "fs";

const files = ["src/pcb-calculator.ts", "src/epf-kwsp.ts"];

files.forEach((f) => {
  let content = fs.readFileSync(f, "utf8");

  // Add mapped values
  const sheetRegex =
    /const sheetPayload = \{([\s\S]*?download_via: ".*?",?)\s*\};/;
  if (content.match(sheetRegex)) {
    content = content.replace(sheetRegex, (match) => {
      return match.replace(
        "download_via:",
        `"Email": email,
          "User Type": role,
          "Company Name": companyInputExt?.value?.trim() || "",
          "Hiring Status": hiringInputExt?.value || "",
          "User Phone": phone,
          download_via:`,
      );
    });

    fs.writeFileSync(f, content, "utf8");
    console.log("Patched sheet payload", f);
  }
});
