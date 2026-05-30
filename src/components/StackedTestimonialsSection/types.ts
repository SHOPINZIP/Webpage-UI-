import type {
  ResolvedSectionAppearance,
  SectionAppearance,
  StorefrontTheme,
} from "../../shared/sectionAppearance";

export type StackedTestimonialItemProps = {
  /** "1"–"5" */
  stars?: string;
  quote?: string;
  name?: string;
  role?: string;
};

export type StackedTestimonialBlock = {
  id: string;
  type?: string;
  props: StackedTestimonialItemProps;
};

export type StackedTestimonialsSectionProps = {
  backgroundWord?: string;
  showBackgroundWord?: boolean;
  appearance?: SectionAppearance;
};

export type StackedTestimonialsSettings = {
  props?: StackedTestimonialsSectionProps;
  blocks?: StackedTestimonialBlock[];
};

/** Same section `type` as marquee testimonials; `variant` selects stacked on the storefront. */
export type StackedTestimonialsSectionDoc = {
  id: string;
  type: "messageStyleTestimonials";
  variant?: string;
  enabled?: boolean;
  settings: StackedTestimonialsSettings;
};

export type StackedTestimonialsProps = {
  section: StackedTestimonialsSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};
