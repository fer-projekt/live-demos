#!/usr/bin/env python3
"""Build an offline, single-file presentation from the editable source files."""
from pathlib import Path
import base64
import re
import json

root = Path(__file__).resolve().parent.parent
html = (root / 'index.html').read_text(encoding='utf-8')

def css_tag(match):
    file = root / match.group(1)
    css = file.read_text(encoding='utf-8')
    def data_font(font):
        path = file.parent / font.group(1)
        encoded = base64.b64encode(path.read_bytes()).decode('ascii')
        return "url('data:font/woff2;base64," + encoded + "')"
    css = re.sub(r"url\('([^']+\.woff2)'\)", data_font, css)
    return '<style>\n' + css + '\n</style>'

html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', css_tag, html)
script_paths = re.findall(r'<script defer src="([^"]+)"></script>', html)
html = re.sub(r'<script defer src="[^"]+"></script>', '', html)
scripts=[]
for script_path in script_paths:
    js = (root / script_path).read_text(encoding='utf-8')
    js = re.sub(r'//# sourceMappingURL=.*', '', js)
    js = re.sub(r'</script', r'<\\/script', js, flags=re.I)
    scripts.append('<script>\n' + js + '\n</script>')
favicon = base64.b64encode((root/'assets/favicon.svg').read_bytes()).decode('ascii')
html = html.replace('href="assets/favicon.svg"', 'href="data:image/svg+xml;base64,'+favicon+'"')
# Store each image once; hydrate every instance before Alpine initializes.
images = {}
def embed_image(match):
    path = match.group(1)
    if path not in images:
        images[path] = 'data:image/png;base64,' + base64.b64encode((root/path).read_bytes()).decode('ascii')
    return 'data-embedded-image="' + path + '"'
html = re.sub(r'src="(assets/media/[^"]+\.png)"', embed_image, html)
logo_icon = base64.b64encode((root/'assets/media/logo_hr.png').read_bytes()).decode('ascii')
html = html.replace('href="assets/media/logo_hr.png"', 'href="data:image/png;base64,'+logo_icon+'"')
image_script = '<script>\n(()=>{const images=' + json.dumps(images) + ';document.querySelectorAll("[data-embedded-image]").forEach(el=>{el.src=images[el.dataset.embeddedImage];});})();\n</script>'
scripts.insert(0, image_script)
html = html.replace('</body>', '\n'.join(scripts) + '\n</body>')
(root/'POKRENI.html').write_text(html, encoding='utf-8')
print('POKRENI.html —', len(html.encode('utf-8')), 'bytes; fonts, images, CSS and scripts embedded.')
