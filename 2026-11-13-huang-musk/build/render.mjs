// Deterministic frame-step renderer: loads reel/index.html, calls window.__seek(t) per frame, screenshots.
// Usage: node render.mjs [--w 1080 --h 1920 --fps 30 --from 0 --to <dur> --out frames --only t1,t2]
import { createRequire } from 'module';
import path from 'path'; import fs from 'fs'; import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const W = +arg('w', 1080), H = +arg('h', 1920), FPS = +arg('fps', 30);
const page_ = arg('page', 'reel/index.html'); const outDir = path.join(here, arg('out', 'frames'));
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on('console', m => { if (m.type() === 'error') console.error('[page]', m.text()); });
page.on('pageerror', e => console.error('[pageerror]', e.message));
await page.goto('file://' + path.join(here, page_) + '?render=1' + (process.argv.includes('--nocap') ? '&nocap=1' : '') + (process.argv.includes('--poster') ? '&poster=1' : ''));
await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });
const dur = await page.evaluate(() => window.__duration);
const only = arg('only', null);
if (only) {
  for (const t of only.split(',').map(Number)) {
    await page.evaluate(tt => window.__seek(tt), t);
    await page.screenshot({ path: path.join(outDir, `still_${t.toFixed(2).replace('.', '_')}.png`) });
  }
} else {
  const from = +arg('from', 0), to = +arg('to', dur); const n0 = Math.round(from * FPS), n1 = Math.round(to * FPS);
  const t0 = Date.now();
  for (let n = n0; n < n1; n++) {
    await page.evaluate(tt => window.__seek(tt), n / FPS);
    await page.screenshot({ path: path.join(outDir, `f_${String(n).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 96 });
    if (n % 90 === 0) console.log(`frame ${n}/${n1} (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
  }
}
await browser.close(); console.log('done', dur);
