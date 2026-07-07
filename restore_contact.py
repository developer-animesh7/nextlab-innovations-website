with open('diff.txt', 'r', encoding='utf-16') as f:
    lines = f.readlines()
start = -1
end = -1
for i, line in enumerate(lines):
    if '<section id="contact"' in line:
        start = i
    if '</section>' in line and start != -1:
        end = i
        break

html = ''
for line in lines[start:end+1]:
    if line.startswith('+'):
        html += line[1:]

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('</main>', html + '\n  </main>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
