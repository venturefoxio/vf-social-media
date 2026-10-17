# brain-ops-hud

Code-rendered HUD, caption, claim-card and disclaimer layer for BRAIN OPS episodes. Generated footage stays separate; all on-screen text comes from JSON.

- `content/approved-claims.json`: single claims-review point. Only `status: "approved"` entries can render.
- `content/ep01.json`: episode spec (timing, HUD readouts, captions, claim refs, footage path).
- `scripts/check-claims.mjs`: gate run before every render; prints a review hash of all on-screen strings.

```
npm install
npm run studio            # preview
npm run still             # PNG at frame 60
npm run render:overlay    # transparent ProRes 4444 to drop over footage in an editor
npm run render:composite  # set "footage" in ep01.json (file under public/) first
```

All text in the repo is placeholder. Replace claims and disclaimer with compliance-approved copy before publishing.
