const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Remove static imports
html = html.replace('import { db } from "/src/firebase.ts";', '');
html = html.replace('import { collection, addDoc } from "firebase/firestore";', '');
html = html.replace('import { generatePDFReport } from "/src/lib/pdf-generator.ts";', '');

// Replace addDoc with dynamic import logic
html = html.replace(
  /await addDoc\(collection\(db, "leads"\), leadData\);/g,
  `
            const { db } = await import("/src/firebase.ts");
            const { collection, addDoc } = await import("firebase/firestore");
            await addDoc(collection(db, "leads"), leadData);
  `
);

// Replace generatePDFReport invocations with dynamic imports
html = html.replace(
  /generatePDFReport\(\{/g,
  `
              const { generatePDFReport } = await import("/src/lib/pdf-generator.ts");
              generatePDFReport({
  `
);

fs.writeFileSync('index.html', html);
console.log('Dynamic imports applied.');
