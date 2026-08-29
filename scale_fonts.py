import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

def repl(m):
    val = int(m.group(1))
    new_val = int(val * 1.5)
    return f"font-size: {new_val}px"

new_css = re.sub(r"font-size:\s*(\d+)px", repl, css)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(new_css)
print("Font sizes increased by 50%")
