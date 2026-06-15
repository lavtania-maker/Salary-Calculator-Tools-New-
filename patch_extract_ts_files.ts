import * as fs from "fs";

const file = "src/annual-leave-calculator.ts";
let content = fs.readFileSync(file, "utf8");

const regexPayload =
  /const sheetPayload = \{[\s\S]*?download_via: "Annual Leave Calculator"\s*\};/;
const matchPayload = content.match(regexPayload);
if (matchPayload) {
  const replacement = `const companyInputExt = document.getElementById("companyName") as HTMLInputElement;
        const hiringInputExt = document.getElementById("hiringStatus") as HTMLSelectElement;
        
        const sheetPayload = {
          timestamp: new Date().toISOString(),
          email: emailInput?.value || "",
          userType: userTypeSelect?.value || "",
          companyName: companyInputExt?.value?.trim() || "",
          hiringStatus: hiringInputExt?.value || "",
          userPhone: phoneInput?.value || "",
          download_via: "Annual Leave Calculator"
        };`;

  content = content.replace(regexPayload, replacement);
  fs.writeFileSync(file, content, "utf8");
  console.log("Patched", file);
}

// Similarly for epf-kwsp.ts
const epfFile = "src/epf-kwsp.ts";
let epfContent = fs.readFileSync(epfFile, "utf8");
const epfPayloadRegex =
  /const sheetPayload = \{[\s\S]*?download_via: "Download EPF Report"\s*\};/;
const matchEpf = epfContent.match(epfPayloadRegex);
if (matchEpf) {
  const replacement = `const companyInputExt = document.getElementById("companyName") as HTMLInputElement;
        const hiringInputExt = document.getElementById("hiringStatus") as HTMLSelectElement;
        
        const sheetPayload = {
          timestamp: new Date().toISOString(),
          email: emailInput?.value || "",
          userType: userTypeSelect?.value || "",
          companyName: companyInputExt?.value?.trim() || "",
          hiringStatus: hiringInputExt?.value || "",
          userPhone: phoneInput?.value || "",
          download_via: "Download EPF Report"
        };`;
  epfContent = epfContent.replace(epfPayloadRegex, replacement);
  fs.writeFileSync(epfFile, epfContent, "utf8");
  console.log("Patched", epfFile);
}

// Similarly for pcb-calculator.ts
const pcbFile = "src/pcb-calculator.ts";
let pcbContent = fs.readFileSync(pcbFile, "utf8");
const pcbPayloadRegex =
  /const sheetPayload = \{[\s\S]*?download_via: "Download PCB Report"\s*\};/;
const matchPcb = pcbContent.match(pcbPayloadRegex);
if (matchPcb) {
  const replacement = `const companyInputExt = document.getElementById("companyName") as HTMLInputElement;
        const hiringInputExt = document.getElementById("hiringStatus") as HTMLSelectElement;
        
        const sheetPayload = {
          timestamp: new Date().toISOString(),
          email: emailInput?.value || "",
          userType: userTypeSelect?.value || "",
          companyName: companyInputExt?.value?.trim() || "",
          hiringStatus: hiringInputExt?.value || "",
          userPhone: phoneInput?.value || "",
          download_via: "Download PCB Report"
        };`;
  pcbContent = pcbContent.replace(pcbPayloadRegex, replacement);
  fs.writeFileSync(pcbFile, pcbContent, "utf8");
  console.log("Patched", pcbFile);
}
