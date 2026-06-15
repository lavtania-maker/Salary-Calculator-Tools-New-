import * as fs from "fs";

const files = ["src/pcb-calculator.ts", "src/epf-kwsp.ts"];

files.forEach((f) => {
  let content = fs.readFileSync(f, "utf8");

  // 1. Add imports at the very beginning
  if (
    !content.includes(
      'import { collection, addDoc } from "firebase/firestore";',
    )
  ) {
    content =
      'import { collection, addDoc } from "firebase/firestore";\nimport { db } from "./firebase";\n' +
      content;
  }

  // 2. Add Firestore logic
  // We can insert the addDoc logic right after the `const sheetPayload = { ... };` block
  const isEpf = f.includes("epf");
  const sheetRegex = /const sheetPayload = \{[\s\S]*?\s*download_via:.*?\s*\};/;
  if (content.match(sheetRegex)) {
    if (!content.includes("await addDoc")) {
      content = content.replace(
        sheetRegex,
        (match) =>
          match +
          `\n
            const dbPayload = {
               email: email,
               userType: role,
               action: "${isEpf ? "Download EPF Report" : "Download PCB Report"}",
               createdAt: new Date().toISOString()
            };
            if (companyInputExt?.value?.trim()) (dbPayload as any).companyName = companyInputExt?.value?.trim();
            if (hiringInputExt?.value) (dbPayload as any).hiringStatus = hiringInputExt?.value;
            if (phone) (dbPayload as any).phoneNumber = phone;
            
            try {
               await addDoc(collection(db, "leads"), dbPayload);
            } catch (err) {
               console.error("Firestore error:", err);
            }
            `,
      );
    }
  }

  fs.writeFileSync(f, content, "utf8");
  console.log("Patched", f);
});
