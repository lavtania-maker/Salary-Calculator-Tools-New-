const fs = require('fs');
const content = fs.readFileSync('pcb-income-tax.html', 'utf8');
const startMatch = content.indexOf('<!-- JavaScript Logic -->');
const scriptMatch = content.indexOf('<script type="module">', startMatch);
const endMatch = content.indexOf('</script>', scriptMatch) + '</script>'.length;

if (startMatch !== -1 && endMatch !== -1 && endMatch > startMatch + 1000) {
  const newContent = content.substring(0, startMatch) + content.substring(endMatch);
  fs.writeFileSync('pcb-income-tax.html', newContent);
  console.log("Successfully removed block.");
} else {
  console.log("Block not found or too short.", startMatch, scriptMatch, endMatch);
}
