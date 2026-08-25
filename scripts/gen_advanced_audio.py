# -*- coding: utf-8 -*-
import json, os, subprocess, time

HERE = os.path.dirname(os.path.abspath(__file__))
VOCAB_PATH = os.path.join(HERE, "..", "src", "data", "advancedVocab.json")
AUDIO_ROOT = os.path.join(HERE, "..", "public", "audio", "advanced")
MANIFEST_PATH = os.path.join(HERE, "..", "src", "data", "audioManifest.json")
VOICE = "Amélie"

os.makedirs(AUDIO_ROOT, exist_ok=True)

chapters = json.load(open(VOCAB_PATH, encoding="utf-8"))
manifest = json.load(open(MANIFEST_PATH, encoding="utf-8"))


def synth(text, out_m4a):
    aiff = out_m4a[:-4] + ".aiff"
    subprocess.run(["say", "-v", VOICE, "-r", "190", "-o", aiff, text], check=True)
    subprocess.run(
        ["afconvert", "-f", "m4af", "-d", "aac", aiff, out_m4a],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    os.remove(aiff)


total = 0
t0 = time.time()
for ch in chapters:
    for w in ch["words"]:
        n = w["n"]
        base = f"{n}"
        word_file = os.path.join(AUDIO_ROOT, f"{base}.m4a")
        synth(w["fr"], word_file)
        manifest[str(n)] = manifest.get(str(n), {})
        manifest[str(n)]["word"] = f"advanced/{base}.m4a"
        total += 1

        for i, (en, fr) in enumerate(w["ex"][:2], 1):
            sent_file = os.path.join(AUDIO_ROOT, f"{base}_ex{i}.m4a")
            synth(fr, sent_file)
            manifest[str(n)][f"ex{i}"] = f"advanced/{base}_ex{i}.m4a"
            total += 1

    print(f"[{time.time()-t0:6.0f}s] chapter {ch['achapter']} done — running total: {total}", flush=True)

with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, separators=(",", ":"))

print(f"DONE. {total} advanced clips generated. Manifest updated: {MANIFEST_PATH}")
