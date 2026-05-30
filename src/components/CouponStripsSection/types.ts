export type CouponStripBlockProps = {
  code?: string;
  title?: string;
};

export type CouponStripBlock = {
  id?: string;
  type?: string;
  props?: CouponStripBlockProps;
};

export type CouponStripsControls = {
  heading?: string;
  subheading?: string;
  showSubheading?: boolean;
  showSecondaryStrip?: boolean;
  stripSpeedPrimary?: number;
  stripSpeedSecondary?: number;
};

import type { ResolvedSectionAppearance, SectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";

export type CouponStripsSettings = {
  props?: CouponStripsControls & {
    appearance?: SectionAppearance;
  };
  blocks?: CouponStripBlock[];
};

export type CouponStripsSectionDoc = {
  id?: string;
  type?: "coupon_strips" | string;
  enabled?: boolean;
  settings?: CouponStripsSettings;
};

export type CouponTickerMinimalProps = {
  section: CouponStripsSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};

