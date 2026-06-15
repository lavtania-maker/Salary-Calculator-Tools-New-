import * as fs from "fs";

const files = [
  "index.html",
  "pcb-income-tax.html",
  "epf-kwsp.html",
  "annual-leave-calculator.html",
];

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");

  // Remove the old hiring intent modal block HTML
  content = content.replace(
    /<!-- Hiring Intent Modal -->[\s\S]*?(<script>[\s\S]*?<\/script>)\s*<\/div>\s*<\/div>\s*<\/div>|<div class="modal-overlay" id="hiringIntentModal"[\s\S]*?<script>[\s\S]*?<\/script>\s+/g,
    "",
  );
  // A simpler way: we know it starts with <div class="modal-overlay" id="hiringIntentModal" and ends around a <script> block and </body>

  const hiringIntentIdx = content.indexOf(
    '<div class="modal-overlay" id="hiringIntentModal"',
  );
  if (hiringIntentIdx !== -1) {
    const scriptEndIdx = content.indexOf("</script>", hiringIntentIdx);
    if (scriptEndIdx !== -1) {
      content =
        content.slice(0, hiringIntentIdx) + content.slice(scriptEndIdx + 9);
    }
  }

  // also specifically targeting old occurrences of the display trigger:
  content = content.replace(
    /if\s*\((typeValue|role)\s*===\s*"Employer \/ HR"\s*\|\|\s*(typeValue|role)\s*===\s*"Employer\/HR"\)\s*\{\s*const\s+hiringModal\s*=\s*document\.getElementById\("hiringIntentModal"\);\s*if\s*\(hiringModal\)\s*\{\s*hiringModal\.style\.display\s*=\s*"flex";[\s\S]*?\}\s*\}/g,
    "",
  );

  // Fix Javascript declaration for missing hiringGroup/Input in JS blocks
  const replaceTarget =
    'const companyInput = document.getElementById("companyName");';
  const replacement = `const companyInput = document.getElementById("companyName");
          const hiringGroup = document.getElementById("hiringQuestionGroup");
          const hiringInput = document.getElementById("hiringStatus");`;

  content = content.split(replaceTarget).join(replacement);
  // because we might have already replaced some in the previous script, let's deduplicate:
  while (
    content.includes(
      `${replacement}\n          const hiringGroup = document.getElementById("hiringQuestionGroup");`,
    )
  ) {
    content = content.replace(
      `${replacement}\n          const hiringGroup = document.getElementById("hiringQuestionGroup");\n          const hiringInput = document.getElementById("hiringStatus");`,
      replacement,
    );
  }

  content = content.replace(
    /if\s*\(companyInput\)\s*companyInput\.required\s*=\s*true;/g,
    'if (companyInput) companyInput.required = true;\n            if (hiringGroup) hiringGroup.style.display = "block";\n            if (hiringInput) hiringInput.required = true;',
  );

  content = content.replace(
    /if\s*\(hiringGroup\)\s*hiringGroup\.style\.display\s*=\s*"block";\n\s*if\s*\(hiringInput\)\s*hiringInput\.required\s*=\s*true;\n            if \(hiringGroup\) hiringGroup.style.display = "block";/g,
    'if (hiringGroup) hiringGroup.style.display = "block";\n            if (hiringInput) hiringInput.required = true;',
  );

  let resetFalseBlock = `if (companyInput) {
              companyInput.required = false;
              companyInput.value = "";
            }
            if (hiringGroup) hiringGroup.style.display = "none";
            if (hiringInput) {
              hiringInput.required = false;
              hiringInput.value = "";
            }`;
  content = content.replace(
    /if\s*\(companyInput\)\s*\{\s*companyInput\.required\s*=\s*false;\s*companyInput\.value\s*=\s*"";\s*\}/g,
    resetFalseBlock,
  );
  content = content.replace(
    new RegExp(
      resetFalseBlock.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
        '\\s*if \\(hiringGroup\\) hiringGroup\\.style\\.display = "none";',
      "g",
    ),
    resetFalseBlock,
  );

  fs.writeFileSync(file, content, "utf8");
  console.log("Cleaned up HTML/JS in", file);
});
