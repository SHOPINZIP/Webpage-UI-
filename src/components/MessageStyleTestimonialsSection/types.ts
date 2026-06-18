import type {
  ResolvedSectionAppearance,
  SectionAppearance,
  StorefrontTheme,
} from "../../shared/sectionAppearance";

export type MessageStyleTestimonialItemProps = {
  name?: string;
  role?: string;
  post?: string;
  quote?: string;
  message?: string;
  description?: string;
  borderColor?: string;
  border?: string;
  /** Hide from storefront when false (default true). */
  isVisible?: boolean;
  /** 0-5, default 5. */
  rating?: number;
};

export type MessageStyleTestimonialBlock = {
  id: string;
  type: "testimonial";
  props: MessageStyleTestimonialItemProps;
};

export type MessageStyleTestimonialsSectionProps = {
  kicker?: string;
  heading?: string;
  /** @deprecated use heading */
  header?: string;
  subheading?: string;
  testimonialStyle?: string;
  showKicker?: boolean;
  showSubheading?: boolean;
  cardsPerGroup?: number | string;
  autoRotate?: boolean;
  rotationDuration?: number | string;
  showDots?: boolean;
  showRating?: boolean;
  showFooter?: boolean;
  footerLabel?: string;
  sectionPadding?: "small" | "medium" | "large" | string;
  autoAnimate?: boolean;
  animationInterval?: number | string;
  showCardNumber?: boolean;
  showCardBorder?: boolean;
  backgroundColor?: string;
  rowOneSpeed?: number | string;
  rowTwoSpeed?: number | string;
  pauseOnHover?: boolean;
  showStars?: boolean;
  sectionPaddingTop?: number | string;
  sectionPaddingBottom?: number | string;
  appearance?: SectionAppearance;
};

export type MessageStyleTestimonialsSettings = {
  props?: MessageStyleTestimonialsSectionProps;
  blocks?: MessageStyleTestimonialBlock[];
};

export type MessageStyleTestimonialsSectionDoc = {
  id: string;
  type: "messageStyleTestimonials";
  enabled?: boolean;
  variant?: string;
  settings: MessageStyleTestimonialsSettings;
};

export type MessageStyleTestimonialsProps = {
  section: MessageStyleTestimonialsSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};
