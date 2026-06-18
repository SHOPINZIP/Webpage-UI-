import type {
  ResolvedSectionAppearance,
  SectionAppearance,
  StorefrontTheme,
} from "../../shared/sectionAppearance";

export type ReelsSectionPadding = "small" | "medium" | "large";

export type ReelItemBlock = {
  id: string;
  type?: "reel_item" | string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  posterImage?: string;
  props?: Record<string, unknown>;
};

export type ReelsSectionControls = {
  kicker?: string;
  heading?: string;
  description?: string;
  cardBackgroundColor?: string;
  autoplayOnScroll?: boolean;
  mutedByDefault?: boolean;
  showProgress?: boolean;
  showMuteButton?: boolean;
  showNavigation?: boolean;
  showDots?: boolean;
  showActiveText?: boolean;
  autoAdvanceOnEnd?: boolean;
  sectionPadding?: ReelsSectionPadding | string;
  appearance?: SectionAppearance;
};

export type ReelsSectionSettings = {
  props?: ReelsSectionControls;
  blocks?: ReelItemBlock[];
};

export type ReelsSectionDoc = {
  id: string;
  type: "reels_section";
  enabled?: boolean;
  settings: ReelsSectionSettings;
};

export type FannedPhoneReelsProps = {
  section: ReelsSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};
