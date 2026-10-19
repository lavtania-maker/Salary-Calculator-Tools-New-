const { Timestamp } = require("firebase/firestore");
// Wait, I can't require firebase easily if it's ESM, but I can mock it.
class TS {
  constructor(sec) { this.seconds = sec; }
}
const a = new TS(100);
const b = new TS(200);
console.log(a > b, b > a);
