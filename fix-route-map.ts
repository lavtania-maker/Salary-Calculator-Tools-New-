import fs from 'fs';

let content = fs.readFileSync('src/lib/route-map.ts', 'utf8');

content = content.replace(
`export function getEnRoute(msRoute: string): string {
  const normalized = msRoute.replace(/\\/$/, '') || '/ms/';
  if (normalized === '/ms') return '/';
  return REVERSE_ROUTE_MAP[normalized] || REVERSE_ROUTE_MAP[normalized + '/'] || '/';
}`,
`export function getEnRoute(msRoute: string): string | null {
  if (msRoute === '/ms' || msRoute === '/ms/') return '/';
  const normalized = msRoute.replace(/\\/$/, '');
  return REVERSE_ROUTE_MAP[normalized] || REVERSE_ROUTE_MAP[normalized + '/'] || null;
}`
);

content = content.replace(
`  if (normalized.startsWith('/blog')) {
    return '/ms/';
  }`,
`  if (normalized.startsWith('/blog')) {
    return enRoute; // Blog remains English
  }`
);

fs.writeFileSync('src/lib/route-map.ts', content);
