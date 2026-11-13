# Huang exit / Musk reply: Chris Instagram Reel, 2026-11-13

Status: DRAFT for Chris review. Not staged to any publisher. Not scheduled. Not published.

## Files

| File | What it is |
|---|---|
| `../2026-11-13-huang-musk-chris-ig-reel.mp4` | Reel, 1080x1920, 30 fps, 31.4 s, H.264 + AAC 48 kHz, about -16 LUFS |
| `../2026-11-13-huang-musk-chris-ig-reel-poster.png` | Cover image, 1080x1920, composed to survive the 3:4 profile grid crop |
| `build/index.html`, `build/data.js`, `build/render.mjs` | Template, timing data and frame renderer used to build the reel |

## Caption (58 words, no hashtags, no dashes)

Nvidia ran for 33 years with one CEO and no board chair.

This week it has an interim CEO, its first chair, and Elon Musk saying it would be an honor to hire the founder.

Same chips. Different control layer.

Founders, that's the part to study. What in your company keeps deciding when you're not in the room?

## Narration and burned captions (verbatim)

1. Jensen Huang is out at Nvidia. And Elon Musk says he'd hire him.
2. Asked on X, Musk answered in five words. That would be an honor.
3. Thirty three years, one CEO. Now an interim chief, with earnings on Tuesday.
4. Here's what I'm watching. Nvidia never had a board chair. It named its first one this week.
5. The chips didn't change. The control layer did. Build yours before you need it.

"Tuesday" is 2026-11-17 and "this week" is the week of 2026-11-09. Both go stale if the post slips past Monday 2026-11-16.

## On-screen headlines

1. NVIDIA'S FOUNDER IS OUT. MUSK SAYS HE'D HIRE HIM. (name tags: JENSEN HUANG, ELON MUSK)
2. ASKED TO HIRE HIM, MUSK SAID: "THAT WOULD BE AN HONOR."
3. 33 YEARS. ONE CEO. NOW AN INTERIM.
4. NVIDIA NEVER HAD A BOARD CHAIR. UNTIL THIS WEEK.
5. THE CHIPS DIDN'T CHANGE. THE CONTROL LAYER DID.
6. BUILD YOURS BEFORE YOU NEED IT. @chriscorkins, powered by Venture Fox, photo credits.

## Alt text

A 31 second vertical video. Photos of Jensen Huang and Elon Musk side by side under the headline "Nvidia's founder is out. Musk says he'd hire him." Then Musk on a stage with the quote "That would be an honor." Then Huang with "33 years. One CEO. Now an interim." Then the Nvidia headquarters sign with "Nvidia never had a board chair. Until this week." Then both men again with "The chips didn't change. The control layer did." It ends on a black card with a fox mark, "Build yours before you need it." and @chriscorkins.

## Claim table

| On-screen or spoken claim | Source | Status |
|---|---|---|
| Jensen Huang resigned as Nvidia president, CEO and director; board accepted 2026-11-11, announced 2026-11-12 | Nvidia release "NVIDIA Announces CEO Transition" and Form 8-K, 2026-11-12 | Corroborated across outlets quoting the filing. Direct fetch of sec.gov and investor.nvidia.com was refused (403), so the filing text was not read first hand |
| CFO Colette Kress is interim CEO | Same release | Corroborated |
| Harvey C. Jones named first-ever chair of the board | Same release (headline wording "First-Ever Chair of the Board") | Corroborated |
| 33 years, one CEO | Kress statement in the release ("over the last 33 years"); Nvidia founded 1993 | Corroborated |
| Earnings on Tuesday 2026-11-17 | Nvidia investor relations, reported by multiple outlets | Corroborated |
| ZeroHedge posted "Elon please hire Jensen"; Musk replied "That would be an honor." | CNBC and Bloomberg, 2026-11-12 | Corroborated. Outlets differ on whether the reply was posted Nov 11 or Nov 12, so no date is shown |
| "Musk says he'd hire him" | Paraphrase of the reply above | Fair paraphrase. No role was named and no offer has been reported, and the reel does not claim either |

Left out on purpose: the reported reasons for the resignation. Nvidia's release gives none, and the piece is about governance.

## Photo credits and licences

All people shown are real photographs, deterministically cropped and scaled only. No AI imagery, no generated likenesses, no retouching.

| Scene | File on Wikimedia Commons | Author | Licence |
|---|---|---|---|
| 1 and 3 and 5 (Huang) | `Jensen Huang Stanford 2026-04-30 010 (cropped).jpg` and `Jensen huang stanford 2026-04-30 008 (cropped).jpg` | Anders Eidesvik | CC BY-SA 4.0 |
| 1 and 2 and 5 (Musk) | `Elon onstage tonight (55284153690).jpg` and its `(3x4 cropped)` extract | Steve Jurvetson | CC BY 4.0 |
| 4 (Nvidia headquarters) | `NVIDIA Headquarters.jpg` | Coolcaesar | CC BY-SA 4.0 |

Licence texts: https://creativecommons.org/licenses/by-sa/4.0/ and https://creativecommons.org/licenses/by/4.0/

ShareAlike note: three of the photos are CC BY-SA 4.0. The reel is an adaptation of them, so the reel itself is released under CC BY-SA 4.0. The caption text and the Venture Fox mark are not covered by that licence. No affiliation with or endorsement by Nvidia, Jensen Huang, Elon Musk or the photographers is implied. Nvidia's name and sign appear only to identify the subject.

Fox mark: cropped pixel for pixel from the previously published `2026-10-07-anthropic-60b-lively-v3-s5.png`. Not redrawn.

## Audio

- Narration: ElevenLabs v4 through Higgsfield, stock voice "Desmond" (the voice used on the October reels). Five lines, one generation each.
- Music: ElevenLabs Music v2.5 through Higgsfield, instrumental, generated for this piece. Time stretched 7 percent to fit.
- Mix: music ducked under narration by sidechain compression, then loudness normalised to -16 LUFS, true peak -1.5 dB.

Disclosure for the publisher: the narration is a synthetic voice and the music is AI generated. No synthetic person appears on screen.

## Build

`node render.mjs` steps the page through `window.__seek(t)` at 30 fps and screenshots each frame with headless Chromium; ffmpeg encodes the frames and muxes the mix. `node render.mjs --poster --only 2.2` produces the cover. Fonts: Anton and Archivo (both SIL Open Font License), installed from npm (`@fontsource/anton`, `@fontsource-variable/archivo`). Photo files and audio stems are not stored in this repository.

Layout rules applied: reel safe zones (top 150, bottom 320, right 130), headline type 118 to 138 px, mustard #FFD429 as the single accent on #0D0D0D, handle and fox mark on the last card only, no dashes, no slide numbers.
