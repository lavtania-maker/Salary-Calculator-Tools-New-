import os, glob

pages = [
    "index.html",
    "epf-kwsp.html",
    "socso-perkeso.html",
    "pcb-income-tax.html",
    "hourly-rate.html",
    "annual-leave-calculator.html",
    "overtime-pay-calculator.html",
    "blog.html"
]

print("=== SIZE COMPARISON (Live Production vs Local) ===")
for p in pages:
    live_p = f"live_pages/{p}"
    if os.path.exists(live_p) and os.path.exists(p):
        l_size = os.path.getsize(live_p)
        c_size = os.path.getsize(p)
        diff = c_size - l_size
        print(f"{p:30s} | Live: {l_size:7d} | Local: {c_size:7d} | Diff: {diff:+7d}")

