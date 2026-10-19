import urllib.request
import re

urls = [
    "http://localhost:3000/",
    "http://localhost:3000/socso-perkeso",
    "http://localhost:3000/epf-kwsp",
    "http://localhost:3000/pcb-calculator",
    "http://localhost:3000/annual-leave-calculator",
    "http://localhost:3000/overtime-pay-calculator",
    "http://localhost:3000/hourly-rate"
]

for url in urls:
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode("utf-8")
            print(f"URL: {url} -> Status {resp.status}, HTML len {len(html)}")
            
            # Check default visible main-layout div
            visible_layouts = re.findall(r'<div[^>]*class=["\'][^"\']*main-layout[^"\']*["\'](?![^>]*style=["\'][^"\']*display:\s*none)[^>]*id=["\']([^"\']+)["\']', html)
            print("  Default visible layouts:", visible_layouts)
            
            # Check hidden layouts
            hidden_layouts = re.findall(r'<div[^>]*class=["\'][^"\']*main-layout[^"\']*["\'][^>]*style=["\'][^"\']*display:\s*none[^"\']*["\'][^>]*id=["\']([^"\']+)["\']', html)
            print("  Hidden layouts:", hidden_layouts)
            
    except Exception as e:
        print(f"URL: {url} -> ERROR: {e}")

