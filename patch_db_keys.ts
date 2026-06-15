import * as fs from "fs";

let content = fs.readFileSync("src/pcb-calculator.ts", "utf8");

let regex =
  /const dbPayload = \{([\s\S]*?)try \{[\s\S]*?addDoc.*?\} catch \(err\) \{/g;
if (content.match(regex)) {
  content = content.replace(
    regex,
    `const dbPayload = {
          "Email": email,
          "User Type": role,
          action: "Download PCB Report",
          createdAt: new Date().toISOString(),
        };
        if (companyInputExt?.value?.trim())
          (dbPayload as any)["Company Name"] = companyInputExt?.value?.trim();
        if (hiringInputExt?.value)
          (dbPayload as any)["Hiring Status"] = hiringInputExt?.value;
        if (phone) (dbPayload as any)["User Phone"] = phone;

        try {
          await addDoc(collection(db, "leads"), dbPayload);
        } catch (err) {`,
  );
  fs.writeFileSync("src/pcb-calculator.ts", content, "utf8");
}

let epfContent = fs.readFileSync("src/epf-kwsp.ts", "utf8");
let regexEpf =
  /const dbPayload = \{([\s\S]*?)try \{[\s\S]*?addDoc.*?\} catch \(err\) \{/g;
if (epfContent.match(regexEpf)) {
  epfContent = epfContent.replace(
    regexEpf,
    `const dbPayload = {
          "Email": email,
          "User Type": role,
          action: "Download EPF Report",
          createdAt: new Date().toISOString(),
        };
        if (companyInputExt?.value?.trim())
          (dbPayload as any)["Company Name"] = companyInputExt?.value?.trim();
        if (hiringInputExt?.value)
          (dbPayload as any)["Hiring Status"] = hiringInputExt?.value;
        if (phone) (dbPayload as any)["User Phone"] = phone;

        try {
          await addDoc(collection(db, "leads"), dbPayload);
        } catch (err) {`,
  );
  fs.writeFileSync("src/epf-kwsp.ts", epfContent, "utf8");
}

let idxContent = fs.readFileSync("index.html", "utf8");
let regexIdx = /const leadData = \{([\s\S]*?)await addDoc.*?;/g;
if (idxContent.match(regexIdx)) {
  idxContent = idxContent.replace(
    regexIdx,
    `const leadData = {
              "Email": userEmailAddress,
              "User Type": typeValue,
              action: actionName,
              createdAt: new Date().toISOString(),
            };

            if (hiringValue) {
              leadData["Hiring Status"] = hiringValue;
            }

            if (companyValue) {
              leadData["Company Name"] = companyValue;
            }

            if (phoneValue) {
              leadData["User Phone"] = phoneValue;
            }

            await addDoc(collection(db, "leads"), leadData);`,
  );
  fs.writeFileSync("index.html", idxContent, "utf8");
  console.log("Patched index.html bdPayload keys");
}
