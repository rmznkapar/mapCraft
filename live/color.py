import re
with open('World.vue', 'r') as file:
    data = file.read()

def upper_repl(match):
    return "id=\"" + match.group(1).upper() + "\""

data = re.sub(r"id=\"(..)\"", upper_repl, data)

f = open("demofile.vue", "w")
f.write(data)
f.close()
