import { AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import type { ApprovedClaims, Episode } from "./types";

const COLORS = { ink: "#E8F1FF", accent: "#35E0C2", dim: "rgba(8,12,20,0.62)" };
const FONT = "'Helvetica Neue', Arial, sans-serif";

const useFade = (inFrames = 8) => {
  const f = useCurrentFrame();
  return interpolate(f, [0, inFrames], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
};

const Hud: React.FC<{ hud: Episode["hud"] }> = ({ hud }) => {
  const f = useCurrentFrame();
  const pulse = 0.55 + 0.45 * Math.sin(f / 6);
  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: COLORS.ink, padding: 56 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 34, letterSpacing: 6, fontWeight: 700 }}>{hud.label}</div>
        <div style={{ fontSize: 26, letterSpacing: 4, color: COLORS.accent }}>
          <span style={{ opacity: pulse }}>●</span> {hud.status}
        </div>
      </div>
      <div style={{ position: "absolute", top: 150, left: 56, display: "grid", gap: 10 }}>
        {hud.readouts.map((r) => (
          <div key={r.key} style={{ fontSize: 26, letterSpacing: 3 }}>
            <span style={{ opacity: 0.6 }}>{r.key}</span> <span style={{ color: COLORS.accent }}>{r.value}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ text: string }> = ({ text }) => {
  const opacity = useFade();
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 380, opacity }}>
      <div
        style={{
          fontFamily: FONT, fontSize: 58, fontWeight: 700, color: COLORS.ink, textAlign: "center",
          background: COLORS.dim, padding: "18px 32px", borderRadius: 14, maxWidth: 940, lineHeight: 1.2,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

const ClaimCard: React.FC<{ text: string }> = ({ text }) => {
  const opacity = useFade();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity }}>
      <div
        style={{
          fontFamily: FONT, fontSize: 52, fontWeight: 700, color: COLORS.ink, textAlign: "center",
          background: COLORS.dim, border: `2px solid ${COLORS.accent}`, padding: "28px 40px", borderRadius: 16, maxWidth: 900,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

const Disclaimer: React.FC<{ text: string }> = ({ text }) => (
  <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 150 }}>
    <div style={{ fontFamily: FONT, fontSize: 24, color: COLORS.ink, background: COLORS.dim, padding: "12px 24px", borderRadius: 10, maxWidth: 960, textAlign: "center", lineHeight: 1.3 }}>
      {text}
    </div>
  </AbsoluteFill>
);

export const Overlay: React.FC<{ episode: Episode; approved: ApprovedClaims }> = ({ episode, approved }) => {
  const resolve = (id: string) => {
    const c = approved.claims[id];
    if (!c || c.status !== "approved") throw new Error(`Claim "${id}" is missing or not approved`);
    return c.text;
  };
  return (
    <AbsoluteFill>
      {episode.footage ? <OffthreadVideo src={staticFile(episode.footage)} /> : null}
      <Hud hud={episode.hud} />
      {episode.captions.map((c, i) => (
        <Sequence key={`cap-${i}`} from={c.from} durationInFrames={c.to - c.from}>
          <Caption text={c.text} />
        </Sequence>
      ))}
      {episode.claimCards.map((c, i) => (
        <Sequence key={`claim-${i}`} from={c.from} durationInFrames={c.to - c.from}>
          <ClaimCard text={resolve(c.claimId)} />
        </Sequence>
      ))}
      <Sequence from={episode.disclaimerFrom}>
        <Disclaimer text={resolve(episode.disclaimerId)} />
      </Sequence>
    </AbsoluteFill>
  );
};
