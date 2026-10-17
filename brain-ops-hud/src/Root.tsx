import { Composition } from "remotion";
import { Overlay } from "./Overlay";
import episode from "../content/ep01.json";
import claims from "../content/approved-claims.json";
import type { ApprovedClaims, Episode } from "./types";

const ep = episode as Episode;

export const Root = () => (
  <Composition
    id="Overlay"
    component={Overlay}
    width={ep.width}
    height={ep.height}
    fps={ep.fps}
    durationInFrames={ep.durationInFrames}
    defaultProps={{ episode: ep, approved: claims as ApprovedClaims }}
  />
);
