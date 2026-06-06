import type { ResolvedSectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";

export type LightPremiumVideoIconType =
  | "podcast"
  | "sparkles"
  | "newspaper"
  | "radio"
  | "clapperboard"
  | "arrowUpRight"
  | "badgeCheck"
  | "shieldCheck"
  | "play"
  | "none"
  | string;

export type LightPremiumInfoIconType =
  | "shieldCheck"
  | "badgeCheck"
  | "newspaper"
  | "sparkles"
  | "radio"
  | "none"
  | string;

export type LightPremiumInfoStyleType = "light" | "dark";
export type LightPremiumSectionPadding = "small" | "medium" | "large";

export type LightPremiumVideoCardBlock = {
  id?: string;
  type?: string;
  tag?: string;
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  posterImage?: string;
  iconType?: LightPremiumVideoIconType;
  props?: {
    tag?: string;
    title?: string;
    subtitle?: string;
    videoUrl?: string;
    posterImage?: string;
    iconType?: LightPremiumVideoIconType;
  };
};

export type LightPremiumInfoCardBlock = {
  id?: string;
  type?: string;
  iconType?: LightPremiumInfoIconType;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  styleType?: LightPremiumInfoStyleType | string;
  props?: {
    iconType?: LightPremiumInfoIconType;
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    styleType?: LightPremiumInfoStyleType | string;
  };
};

export type LightPremiumVideoHeroSettings = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  showEyebrow?: boolean;
  showSubheading?: boolean;
  showBottomInfoStrip?: boolean;
  autoPlayVideos?: boolean;
  loopVideos?: boolean;
  showVideoControls?: boolean;
  sectionPadding?: LightPremiumSectionPadding | string;
  appearance?: Record<string, unknown>;
};

export type LightPremiumVideoHeroSectionDoc = {
  id?: string;
  type?: string;
  enabled?: boolean;
  settings?: {
    props?: LightPremiumVideoHeroSettings;
    blocks?: Array<LightPremiumVideoCardBlock | LightPremiumInfoCardBlock>;
  };
};

export type LightMediaPresencePremiumProps = {
  section: LightPremiumVideoHeroSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};
