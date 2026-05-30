import type { CSSProperties } from "react";

import type { ResolvedSectionAppearance, SectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";

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
  props?: MarqueeTextControls & {
    appearance?: SectionAppearance;
  };
  blocks?: MarqueeTextBlock[];
};

export type MarqueeTextSectionDoc = {
  id?: string;
  type?: "marquee_text" | string;
  variant?: string;
  enabled?: boolean;
  settings?: MarqueeTextSettings;
};

export type MarqueeRenderItem = {
  id: string;
  text: string;
  style?: CSSProperties;
};

export type DualLineFeatureMarqueeProps = {
  section: MarqueeTextSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};

export type MarqueeLineProps = {
  items: MarqueeRenderItem[];
  large?: boolean;
  reverse?: boolean;
  durationSec?: number;
  pauseOnHover?: boolean;
  reducedMotion?: boolean;
};
