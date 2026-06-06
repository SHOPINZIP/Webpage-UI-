import type { ResolvedSectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";

export type VideoHeroIconType = "sparkles" | "newspaper" | "radio" | "badge" | "none";
export type VideoHeroInfoStyleType = "light" | "dark";
export type VideoHeroSectionPadding = "small" | "medium" | "large";

export type VideoCardBlock = {
  id?: string;
  type?: string;
  eyebrow?: string;
  title?: string;
  videoUrl?: string;
  posterImage?: string;
  statLabel?: string;
  props?: {
    eyebrow?: string;
    title?: string;
    videoUrl?: string;
    posterImage?: string;
    statLabel?: string;
  };
};

export type InfoCardBlock = {
  id?: string;
  type?: string;
  iconType?: VideoHeroIconType | string;
  title?: string;
  styleType?: VideoHeroInfoStyleType | string;
  props?: {
    iconType?: VideoHeroIconType | string;
    title?: string;
    styleType?: VideoHeroInfoStyleType | string;
  };
};

export type VideoHeroSettings = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  showEyebrow?: boolean;
  showSubheading?: boolean;
  showBottomInfoStrip?: boolean;
  autoPlayVideos?: boolean;
  loopVideos?: boolean;
  staggerMiddleCard?: boolean;
  sectionPadding?: VideoHeroSectionPadding | string;
  appearance?: Record<string, unknown>;
};

export type VideoHeroSectionDoc = {
  id?: string;
  type?: string;
  enabled?: boolean;
  settings?: {
    props?: VideoHeroSettings;
    blocks?: Array<VideoCardBlock | InfoCardBlock>;
  };
};

export type MediaPresenceVideoHeroProps = {
  section: VideoHeroSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};
