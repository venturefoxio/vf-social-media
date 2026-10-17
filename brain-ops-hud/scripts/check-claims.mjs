// Gate: every claim card and disclaimer an episode renders must be an approved entry.
// Captions are free text, listed in the report so the reviewer sees every on-screen string.
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";

const approved = JSON.parse(readFileSync("content/approved-claims.json", "utf8")).claims;
const episodes = readdirSync("content").filter((f) => /^ep\d+\.json$/.test(f));
let failed = false;

for (const file of episodes) {
  const ep = JSON.parse(readFileSync(`content/${file}`, "utf8"));
  const ids = [...(ep.claimCards ?? []).map((c) => c.claimId), ep.disclaimerId].filter(Boolean);
  const strings = [];
  for (const id of ids) {
    const c = approved[id];
    if (!c) { console.error(`${file}: unknown claim id "${id}"`); failed = true; continue; }
    if (c.status !== "approved") { console.error(`${file}: claim "${id}" status is "${c.status}", not approved`); failed = true; }
    strings.push(c.text);
  }
  const captions = (ep.captions ?? []).map((c) => c.text);
  const digest = createHash("sha256").update([...strings, ...captions].join("\n")).digest("hex").slice(0, 12);
  console.log(`${file}: ${ids.length} claim refs, ${captions.length} captions, review hash ${digest}`);
}

if (failed) { console.error("Claims check FAILED. Nothing rendered."); process.exit(1); }
console.log("Claims check passed.");
