import re

with open("src/other-calculators.ts", "r") as f:
    content = f.read()

if "isMs" not in content:
    old_link = 'href="${tool.path}"'
    
    # We can detect if we are on an MS route via pathname
    is_ms_logic = """
  const isMs = typeof window !== 'undefined' && window.location.pathname.startsWith('/ms/');
  
  const getMsPath = (path: string) => {
     const msMap: Record<string, string> = {
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
        "/privacy-policy": "/ms/dasar-privasi"
     };
     return msMap[path] || '/ms' + path;
  };
"""
    content = content.replace('export function renderOtherCalculators(containerOrSelector?: HTMLElement | string) {', 'export function renderOtherCalculators(containerOrSelector?: HTMLElement | string) {\n' + is_ms_logic)
    content = content.replace('href="${tool.path}"', 'href="${isMs ? getMsPath(tool.path) : tool.path}"')
    
    with open("src/other-calculators.ts", "w") as f:
        f.write(content)
    print("Fixed other-calculators.ts")
