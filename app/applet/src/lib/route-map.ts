export const ROUTE_MAP: Record<string, string> = {
  "/": "/ms/",
  "/epf-kwsp": "/ms/kalkulator-epf",
  "/socso-perkeso": "/ms/kalkulator-socso",
  "/pcb-income-tax": "/ms/kalkulator-pcb",
  "/annual-leave-calculator": "/ms/kalkulator-cuti-tahunan",
  "/overtime-pay-calculator": "/ms/kalkulator-overtime",
  "/hourly-rate": "/ms/kadar-gaji-sejam",
  "/mincal": "/ms/kalkulator-gaji-minimum",
  "/payslip": "/ms/penjana-payslip",
  "/privacy-policy": "/ms/dasar-privasi",
};

export const REVERSE_ROUTE_MAP: Record<string, string> = {};
for (const [en, ms] of Object.entries(ROUTE_MAP)) {
  REVERSE_ROUTE_MAP[ms] = en;
}

export function getEnRoute(msRoute: string): string | null {
  if (msRoute === '/ms' || msRoute === '/ms/') return '/';
  const normalized = msRoute.replace(/\/$/, '');
  return REVERSE_ROUTE_MAP[normalized] || REVERSE_ROUTE_MAP[normalized + '/'] || null;
}

export function getMsRoute(enRoute: string): string {
  const normalized = enRoute.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  if (normalized.startsWith('/blog')) {
    return enRoute; // Blog remains English
  }
  return ROUTE_MAP[normalized] || ROUTE_MAP[normalized + '/'] || '/ms/';
}
