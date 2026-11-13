#!/usr/bin/env python3
"""Build reel/data.js and the audio mix from the narration files.

Usage: python3 make_timeline.py <build_dir>
Reads audio/n1.mp3 .. n5.mp3 and audio/music.mp3, measures speech segments,
locks scene, headline and caption timings to them, writes reel/data.js and out/mix.wav.
"""
import json, re, subprocess, sys, os

B = sys.argv[1]
A = os.path.join(B, "audio")

LINES = [  # narration line -> caption chunks (each chunk is one single-line caption)
    ["Jensen Huang is out at Nvidia.", "The night before the announcement,", "Elon Musk was asked to hire him."],
    ["Musk replied in five words.", "That would be an honor."],
    ["Thirty three years, one CEO.", "Now an interim chief.", "Earnings are November 17."],
    ["Here’s the detail worth watching.", "Nvidia never had a board chair.", "It just named its first."],
    ["The chips didn’t change.", "Who’s in charge did.", "Build your board before you need it."],
]


def probe(path):
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path], capture_output=True, text=True).stdout)
    err = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-af", "silencedetect=noise=-38dB:d=0.14", "-f", "null", "-"], capture_output=True, text=True).stderr
    ev = re.findall(r"silence_(start|end): ([0-9.]+)", err)
    segs, t = [], 0.0
    for k, v in ev:
        v = float(v)
        if k == "start":
            if v - t > 0.1: segs.append([t, v])
        else:
            t = v
    if dur - t > 0.1: segs.append([t, dur])
    return dur, segs


def align(chunks, segs):
    """Return [(start, end)] per chunk, in file time."""
    segs = [s[:] for s in segs]
    m = len(chunks)
    while len(segs) > m:  # merge across the smallest pause
        gaps = [segs[i + 1][0] - segs[i][1] for i in range(len(segs) - 1)]
        i = gaps.index(min(gaps)); segs[i][1] = segs[i + 1][1]; del segs[i + 1]
    if len(segs) == m:
        return [tuple(s) for s in segs]
    # fewer pauses than chunks: split the segment that carries the most characters per second deficit
    out = [tuple(s) for s in segs]
    chars = [len(c) for c in chunks]
    while len(out) < m:
        # find the grouping of chunks to segments by cumulative proportion, then split the longest-duration segment
        i = max(range(len(out)), key=lambda k: out[k][1] - out[k][0])
        # chunks covered by segment i: assume the split is needed here
        k0 = i  # chunk index where this segment starts (segments before i map one to one)
        a, b = out[i]
        c1, c2 = chars[k0], chars[k0 + 1]
        cut = a + (b - a) * c1 / (c1 + c2)
        out[i:i + 1] = [(a, cut), (cut, b)]
    return out


durs, spans = [], []
for n in range(1, 6):
    d, segs = probe(os.path.join(A, f"n{n}.mp3"))
    al = align(LINES[n - 1], segs)
    durs.append(d); spans.append(al)
    print(f"n{n}: dur {d:.2f}  segments {[(round(a,2),round(b,2)) for a,b in segs]}")
    for c, (a, b) in zip(LINES[n - 1], al): print(f"     {a:5.2f}-{b:5.2f}  {c}")

LEAD, TAIL = 0.22, 0.30
offs, starts, t = [], [], 0.0
for n in range(5):
    starts.append(t); off = t + (0.25 if n == 0 else LEAD); offs.append(off)
    t = off + spans[n][-1][1] + TAIL
A5 = [(offs[4] + a, offs[4] + b) for a, b in spans[4]]
end_start = round(A5[2][0] - 0.16, 2)
dur = round(A5[2][1] + 1.25, 1)
ab = lambda n, k: (offs[n] + spans[n][k][0], offs[n] + spans[n][k][1])
r2 = lambda x: round(x, 2)

scenes = [
    {"id": "hook", "start": 0.0, "end": r2(starts[1]), "kind": "duo",
     "photos": [{"src": "../assets/huang_010.jpg", "w": 640, "x": -33, "y": 0, "ox": 0.47, "oy": 0.4},
                {"src": "../assets/musk_3x4.jpg", "w": 1050, "x": -251, "y": 0, "ox": 0.434, "oy": 0.227}],
     "lines": [{"t": "JENSEN HUANG", "at": -1}, {"t": "IS OUT AT NVIDIA.", "at": -1},
               {"t": "MUSK WAS ASKED", "at": 0.35, "acc": 1}, {"t": "TO HIRE HIM.", "at": 0.47, "acc": 1}]},
    {"id": "reply", "start": r2(starts[1]), "end": r2(starts[2]), "kind": "full",
     "photos": [{"src": "../assets/musk_stage.jpg", "w": 1640, "x": -70, "y": -30, "ox": 0.3, "oy": 0.16}],
     "lines": [{"t": "MUSK’S REPLY:", "at": r2(starts[1] + 0.1)},
               {"t": "“THAT WOULD BE", "at": r2(ab(1, 1)[0] - 0.12), "acc": 1}, {"t": "AN HONOR.”", "at": r2(ab(1, 1)[0] + 0.02), "acc": 1}]},
    {"id": "why", "start": r2(starts[2]), "end": r2(starts[3]), "kind": "full",
     "photos": [{"src": "../assets/hx_007.jpg", "w": 1400, "x": -100, "y": -489, "ox": 0.46, "oy": 0.44}],
     "lines": [{"t": "33 YEARS.", "at": r2(starts[2] + 0.1)},
               {"t": "ONE CEO.", "at": r2(ab(2, 0)[0] + 0.58 * (ab(2, 0)[1] - ab(2, 0)[0]))},
               {"t": "NOW AN INTERIM.", "at": r2(ab(2, 1)[0] - 0.08), "acc": 1}]},
    {"id": "chair", "start": r2(starts[3]), "end": r2(starts[4]), "kind": "full",
     "photos": [{"src": "../assets/nvidia_hq.jpg", "w": 1900, "x": -40, "y": 0, "ox": 0.3, "oy": 0.4}],
     "lines": [{"t": "NVIDIA NEVER HAD", "at": r2(starts[3] + 0.1)}, {"t": "A BOARD CHAIR.", "at": r2(starts[3] + 0.26)},
               {"t": "UNTIL NOW.", "at": r2(ab(3, 2)[0] - 0.08), "acc": 1}]},
    {"id": "read", "start": r2(starts[4]), "end": end_start, "kind": "full",
     "photos": [{"src": "../assets/nvidia_hq.jpg", "w": 2300, "x": -1002, "y": -510, "ox": 0.74, "oy": 0.7}],
     "lines": [{"t": "THE CHIPS", "at": r2(starts[4] + 0.1)}, {"t": "DIDN’T CHANGE.", "at": r2(starts[4] + 0.24)},
               {"t": "WHO’S IN", "at": r2(A5[1][0] - 0.08), "acc": 1}, {"t": "CHARGE DID.", "at": r2(A5[1][0] + 0.06), "acc": 1}]},
    {"id": "end", "start": end_start, "end": dur, "kind": "end",
     "lines": [{"t": "BUILD YOUR BOARD", "at": r2(end_start + 0.12)}, {"t": "BEFORE YOU", "at": r2(end_start + 0.26)},
               {"t": "NEED IT.", "at": r2(end_start + 0.4), "acc": 1}]},
]

# Captions for lines 1 to 4. Line 5 is shown verbatim as the headline, so it carries no duplicate caption.
caps = []
for n in range(4):
    for k, c in enumerate(LINES[n]):
        a, b = ab(n, k)
        if (n, k) == (1, 1): continue  # the quote is the headline; no duplicate caption
        caps.append([r2(a - 0.05), r2(b + 0.1), c])
for i in range(len(caps) - 1):  # no overlaps
    if caps[i][1] > caps[i + 1][0]: caps[i][1] = caps[i + 1][0]

reel = {"dur": dur, "xf": 0.24, "scenes": scenes, "caps": caps,
        "credits": ["Photos, cropped, via Wikimedia Commons:", "Anders Eidesvik and Coolcaesar, CC BY-SA 4.0", "Steve Jurvetson, CC BY 4.0"]}
with open(os.path.join(B, "reel", "data.js"), "w", encoding="utf-8") as f:
    f.write("// Generated by make_timeline.py from the measured narration files. No dashes. Handle and fox mark only on the sign-off.\n")
    f.write("window.REEL = " + json.dumps(reel, indent=1, ensure_ascii=True) + ";\n")
print("dur", dur, "offsets", [r2(x) for x in offs], "scene starts", [r2(x) for x in starts], "end card", end_start)

# audio: narration at measured offsets, music stretched to length and ducked under speech, loudness normalised
MUSIC = os.path.join(A, "music2.mp3")
_md, _msegs = probe(MUSIC)
music_len = _msegs[-1][1] if _msegs else _md  # end of the last audible passage
tempo = max(0.92, min(1.0, music_len / (dur - 0.2)))
ins, fc = [], []
for n in range(5):
    ins += ["-i", os.path.join(A, f"n{n+1}.mp3")]
    fc.append(f"[{n}:a]aresample=48000,adelay={int(round(offs[n]*1000))}:all=1[v{n}]")
ins += ["-i", MUSIC]
fc.append("".join(f"[v{n}]" for n in range(5)) + f"amix=inputs=5:normalize=0:dropout_transition=0,highpass=f=70,acompressor=threshold=-22dB:ratio=3:attack=8:release=160:makeup=4dB,apad=whole_dur={dur},atrim=0:{dur},asplit=2[vo][sc]")
fc.append(f"[5:a]aresample=48000,atrim=0:{music_len:.2f},atempo={tempo:.4f},volume=0.5,afade=t=in:st=0:d=0.05,afade=t=out:st={dur-0.9}:d=0.9,apad=whole_dur={dur},atrim=0:{dur}[mu]")
fc.append("[mu][sc]sidechaincompress=threshold=0.02:ratio=10:attack=20:release=450:makeup=1[duck]")
fc.append("[vo][duck]amix=inputs=2:normalize=0:dropout_transition=0,loudnorm=I=-16:TP=-1.5:LRA=7,aresample=48000[out]")
os.makedirs(os.path.join(B, "out"), exist_ok=True)
cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y"] + ins + ["-filter_complex", ";".join(fc), "-map", "[out]", "-ac", "2", "-c:a", "pcm_s16le", os.path.join(B, "out", "mix_v3.wav")]
subprocess.run(cmd, check=True)
print("mix written, music content", round(music_len, 2), "tempo", round(tempo, 4))
