import re
with open('low.html', 'r') as file:
    data = file.read()
list = re.findall("(background: .*; height)", data)
last  = '[';
for item in list:
    item = item[12:-8]
    last = last +"'"+ item +"'"+ ','
    pass
last = last+']'
print(last)
