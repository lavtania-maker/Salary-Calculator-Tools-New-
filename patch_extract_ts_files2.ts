import * as fs from "fs";

const epfFile = "src/epf-kwsp.ts";
let epfContent = fs.readFileSync(epfFile, "utf8");
const epfPayloadRegex =
  /const sheetPayload = \{[\s\S]*?download_via: "EPF Calculator"\s*\};/;
const matchEpf = epfContent.match(epfPayloadRegex);
if (matchEpf) {
  const replacement = `const companyInputExt = document.getElementById("companyName") as HTMLInputElement;
        const hiringInputExt = document.getElementById("hiringStatus") as HTMLSelectElement;
        const sheetPayload = {
          timestamp: new Date().toISOString(),
          email: email,
          userType: role,
          companyName: companyInputExt?.value?.trim() || "",
          hiringStatus: hiringInputExt?.value || "",
          userPhone: phone,
          download_via: "EPF Calculator"
        };`;
  epfContent = epfContent.replace(epfPayloadRegex, replacement);
  fs.writeFileSync(epfFile, epfContent, "utf8");
  console.log("Patched", epfFile);
}

// Similarly for pcb-calculator.ts
const pcbFile = "src/pcb-calculator.ts";
let pcbContent = fs.readFileSync(pcbFile, "utf8");
const pcbPayloadRegex =
  /const sheetPayload = \{[\s\S]*?download_via: "PCB Calculator"\s*\};/;
const matchPcb = pcbContent.match(pcbPayloadRegex);
if (matchPcb) {
  const replacement = `const companyInputExt = document.getElementById("companyName") as HTMLInputElement;
        const hiringInputExt = document.getElementById("hiringStatus") as HTMLSelectElement;
        const sheetPayload = {
          timestamp: new Date().toISOString(),
          email: email,
          userType: role,
          companyName: companyInputExt?.value?.trim() || "",
          hiringStatus: hiringInputExt?.value || "",
          userPhone: phone,
          download_via: "PCB Calculator"
        };`;
  pcbContent = pcbContent.replace(pcbPayloadRegex, replacement);
  fs.writeFileSync(pcbFile, pcbContent, "utf8");
  console.log("Patched", pcbFile);
}
