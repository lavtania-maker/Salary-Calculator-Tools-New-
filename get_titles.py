import glob
from bs4 import BeautifulSoup

for file in glob.glob("*.html"):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    soup = BeautifulSoup(content, 'html.parser')
    title = soup.title
    if title:
        print(f"{file}: {len(title.text)} chars - {title.text}")
