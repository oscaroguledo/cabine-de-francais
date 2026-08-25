# -*- coding: utf-8 -*-
"""
Regenerates src/data/grammar.json directly from scripts/build_textbook.py's CHAPTERS list,
so the app's Grammar mode always matches French_Textbook_Complete.pdf exactly. Run this
after editing scripts/build_textbook.py (and re-run build_textbook.py itself, from the
french/ copy, to regenerate the PDF from the same source).

Usage: python3 scripts/extract_grammar.py
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "build_textbook.py")
OUT = os.path.join(HERE, "..", "src", "data", "grammar.json")

src = open(SRC, encoding="utf-8").read()
start = src.index("CHAPTERS = [")
end = src.index("\n\n# sanity")
chapters_src = src[start:end]

ns = {}
exec(chapters_src, ns)
chapters = ns["CHAPTERS"]
assert len(chapters) == 15, f"expected 15 chapters, got {len(chapters)}"

out = []
for i, ch in enumerate(chapters, 1):
    out.append(
        {
            "chapter": i,
            "title": ch["title"],
            "intro": ch["intro"],
            "grammar": ch["grammar"].strip(),
        }
    )

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

print(f"Wrote {OUT} — {len(out)} chapters, sourced directly from build_textbook.py")
