import fs from "fs";

function removeOldHiring(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  let startIdx = content.indexOf(
    '<div\n              class="form-group"\n              id="hiringQuestionGroup"',
  );
  if (startIdx === -1) {
    startIdx = content.indexOf(
      '<div class="form-group" id="hiringQuestionGroup"',
    );
  }

  if (startIdx !== -1) {
    // Find the end of the div. Because of nesting, let's just use regex or find next <div class="form-group" id="companyNameGroup"
    let endStr =
      '<div class="form-group" id="companyNameGroup" style="display: none">';
    let endIdx = content.indexOf(endStr);

    if (endIdx !== -1) {
      content = content.substring(0, startIdx) + content.substring(endIdx);
      fs.writeFileSync(filePath, content);
      console.log("Removed old hiring form group from " + filePath);
    }
  }
}

removeOldHiring("index.html");
