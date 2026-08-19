#!/usr/bin/env python3
"""Render every page of every PDF in public/assets/pdf/ to a JPEG.

Pages display these documents as images rather than embedding the PDF, so the
browser's own PDF viewer (and its dark toolbar) never appears inside the page.
Writes docs-manifest.json, which build.py reads to lay out each document.

Run after adding or replacing a PDF:  python3 render_docs.py && python3 build.py
"""
import json, os
import pypdfium2 as pdfium

ROOT = os.path.dirname(os.path.abspath(__file__))
PDF_DIR = os.path.join(ROOT, 'public', 'assets', 'pdf')
OUT_DIR = os.path.join(ROOT, 'public', 'assets', 'img', 'docs')
TARGET_WIDTH = 1100          # readable on screen without oversized files


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for f in os.listdir(OUT_DIR):
        os.remove(os.path.join(OUT_DIR, f))
    manifest = {}
    for pdf in sorted(f for f in os.listdir(PDF_DIR) if f.lower().endswith('.pdf')):
        stem = pdf[:-4]
        doc = pdfium.PdfDocument(os.path.join(PDF_DIR, pdf))
        count = len(doc)
        pages = []
        for i in range(count):
            page = doc[i]
            width, _ = page.get_size()
            scale = min(TARGET_WIDTH / width, 2.0)
            img = page.render(scale=scale).to_pil().convert('RGB')
            name = f'{stem}-{i + 1:02d}.jpg' if count > 1 else f'{stem}.jpg'
            img.save(os.path.join(OUT_DIR, name), 'JPEG',
                     quality=78, optimize=True, progressive=True)
            pages.append({'file': name, 'w': img.size[0], 'h': img.size[1]})
        manifest[stem] = {'pages': pages, 'count': count}
        kb = sum(os.path.getsize(os.path.join(OUT_DIR, p['file'])) for p in pages) // 1024
        print(f'{stem:26} {count:>3} pages  {kb:>6} KB')
    with open(os.path.join(ROOT, 'docs-manifest.json'), 'w', encoding='utf-8') as fh:
        json.dump(manifest, fh, indent=1)
    print(f'\n{len(manifest)} documents -> {len(os.listdir(OUT_DIR))} images')


if __name__ == '__main__':
    main()
