const ROUTE_MAP = {
  "/": "/ms/",
  "/epf-kwsp": "/ms/kalkulator-epf",
  "/socso-perkeso": "/ms/kalkulator-socso",
  "/pcb-income-tax": "/ms/kalkulator-pcb",
  "/annual-leave-calculator": "/ms/kalkulator-cuti-tahunan",
  "/overtime-pay-calculator": "/ms/kalkulator-overtime",
  "/hourly-rate": "/ms/kadar-gaji-sejam",
  "/mincal": "/ms/kalkulator-gaji-minimum",
  "/payslip": "/ms/penjana-slip-gaji",
  "/blog": "/ms/blog",
  "/privacy-policy": "/ms/dasar-privasi",
};
const REVERSE_ROUTE_MAP = {};
for (const [en, ms] of Object.entries(ROUTE_MAP)) {
  REVERSE_ROUTE_MAP[ms] = en;
}
console.log("REVERSE of /ms/:", REVERSE_ROUTE_MAP["/ms/"]);
console.log("REVERSE of /ms:", REVERSE_ROUTE_MAP["/ms"]);
console.log("REVERSE of /ms/kalkulator-epf:", REVERSE_ROUTE_MAP["/ms/kalkulator-epf"]);
