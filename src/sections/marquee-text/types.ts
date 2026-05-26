export type MarqueeTextRow = "top" | "bottom";

export type MarqueeTextBlock = {
  id?: string;
  type?: string;
  text?: string;
  row?: MarqueeTextRow | string;
  props?: {
    text?: string;
    row?: MarqueeTextRow | string;
  };
};

export type MarqueeTextControls = {
  speedTop?: number;
  speedBottom?: number;
  largeTopRow?: boolean;
  largeBottomRow?: boolean;
  pauseOnHover?: boolean;
};

export type MarqueeTextSettings = {
  props?: MarqueeTextControls;
  blocks?: MarqueeTextBlock[];
};

export type MarqueeTextSectionDoc = {
  id?: string;
  type?: "marquee_text" | string;
  variant?: string;
  enabled?: boolean;
  settings?: MarqueeTextSettings;
};

export type DualLineFeatureMarqueeProps = {
  section: MarqueeTextSectionDoc;
};

export type MarqueeLineProps = {
  items: string[];
  large?: boolean;
  reverse?: boolean;
  durationSec?: number;
  pauseOnHover?: boolean;
  reducedMotion?: boolean;
};
