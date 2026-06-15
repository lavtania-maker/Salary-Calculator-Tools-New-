import * as fs from "fs";

const tsFiles = [
  "src/pcb-calculator.ts",
  "src/epf-kwsp.ts",
  "src/annual-leave-calculator.ts",
];

const extractLogic = `
      const companyInputExt = document.getElementById("companyName") as HTMLInputElement;
      const hiringInputExt = document.getElementById("hiringStatus") as HTMLSelectElement;

      const companyValue = companyInputExt ? companyInputExt.value.trim() : "";
      const hiringValue = hiringInputExt ? hiringInputExt.value : "";
`;

tsFiles.forEach((f) => {
  let content = fs.readFileSync(f, "utf8");
  if (!content.includes("const companyValue = ")) {
    // Find where we get emailValue and typeValue
    const matchPattern = /const typeValue = [^;]+;/;
    if (content.match(matchPattern)) {
      content = content.replace(
        matchPattern,
        (match) => match + "\n" + extractLogic,
      );
    }

    // Patch payload where action is added or type is added to add company and hiring
    content = content.replace(
      /(download_via:.*?,)/,
      (match) =>
        `companyName: companyValue,\n                hiringStatus: hiringValue,\n                ` +
        match,
    );
    fs.writeFileSync(f, content, "utf8");
    console.log("Patched missing extracts in", f);
  }
});
