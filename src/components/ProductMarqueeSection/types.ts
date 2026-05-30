export type ProductMarqueeItemProps = {
  title?: string;
  subtitle?: string;
  image?: string;
  alt?: string;
  /** Card body copy (e.g. LiquidFocusCategories per-card text) */
  description?: string;
};

export type ProductMarqueeBlock = {
  id: string;
  type?: string;
  props: ProductMarqueeItemProps;
};

export type ProductMarqueeSectionProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  showButton?: boolean;
  defaultActiveIndex?: string;
  resetToDefaultOnLeave?: boolean;
};

import type { ResolvedSectionAppearance, SectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";

export type ProductMarqueeSettings = {
  props?: ProductMarqueeSectionProps & {
    appearance?: SectionAppearance;
  };
  blocks?: ProductMarqueeBlock[];
};

export type ProductMarqueeSectionDoc = {
  id: string;
  type: "productMarquee";
  variant?: string;
  enabled?: boolean;
  settings: ProductMarqueeSettings;
};

export type ProductMarqueeProps = {
  section: ProductMarqueeSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};

