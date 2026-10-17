export type Episode = {
  episode: string;
  title: string;
  fps: number;
  durationInFrames: number;
  width: number;
  height: number;
  footage: string | null;
  hud: { label: string; status: string; readouts: { key: string; value: string }[] };
  captions: { from: number; to: number; text: string }[];
  claimCards: { claimId: string; from: number; to: number }[];
  disclaimerId: string;
  disclaimerFrom: number;
};

export type ApprovedClaims = {
  claims: Record<string, { type: string; status: string; reviewer: string | null; text: string }>;
};
