class TS {
  constructor(sec) { this.seconds = sec; }
}
const a = new TS(100);
const b = new TS(200);
console.log(a > b, b > a);
