import fs from "fs";

let content = fs.readFileSync("pcb-calculator.html", "utf8");

// Find the form-actions block and extract it
const actionsBlockRegex =
  /<div class="form-actions"\s*>\s*<button type="reset" id="resetBtn" class="btn btn-outline">\s*Reset\s*<\/button>\s*<button type="submit" class="btn btn-primary" id="calculatePcbBtn"[^>]*>\s*Calculate\s*<\/button>\s*<\/div>/g;

const match = content.match(actionsBlockRegex);
if (match) {
  content = content.replace(actionsBlockRegex, "");
  content = content.replace(
    "</form>",
    `\n              ${match[0]}\n            </form>`,
  );
  fs.writeFileSync("pcb-calculator.html", content, "utf8");
}
