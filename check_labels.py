import glob
from bs4 import BeautifulSoup

for file in glob.glob("*.html"):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    soup = BeautifulSoup(content, 'html.parser')
    inputs = soup.find_all('input')
    for inp in inputs:
        type_ = inp.get('type')
        id_ = inp.get('id')
        if type_ in ['submit', 'button', 'reset', 'hidden', 'radio', 'checkbox']:
            continue
        
        # Check label for id
        label = soup.find('label', attrs={'for': id_}) if id_ else None
        
        if not label:
            print(f"{file} missing label for input id={id_}, type={type_}")
