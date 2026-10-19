import urllib.request

url = "http://localhost:3000/pcb-income-tax"
try:
    with urllib.request.urlopen(url) as resp:
        print(f"URL: {url} -> Status {resp.status}, HTML len {len(resp.read())}")
except Exception as e:
    print(f"Error: {e}")
