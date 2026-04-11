export type MessageStyleTestimonialItemProps = {
  name?: string;
  role?: string;
  quote?: string;
  /** Hide from storefront when false (default true). */
  isVisible?: boolean;
  /** 1–5, default 5. */
  rating?: number;
};

export type MessageStyleTestimonialBlock = {
  id: string;
  type: "testimonial";
  props: MessageStyleTestimonialItemProps;
};

export type MessageStyleTestimonialsSectionProps = {
  heading?: string;
  /** @deprecated use heading */
  header?: string;
  subheading?: string;
  testimonialStyle?: string;
  backgroundColor?: string;
  rowOneSpeed?: number | string;
  rowTwoSpeed?: number | string;
  pauseOnHover?: boolean;
  showStars?: boolean;
  sectionPaddingTop?: number | string;
  sectionPaddingBottom?: number | string;
};

export type MessageStyleTestimonialsSettings = {
  props?: MessageStyleTestimonialsSectionProps;
  blocks?: MessageStyleTestimonialBlock[];
};

export type MessageStyleTestimonialsSectionDoc = {
  id: string;
  type: "messageStyleTestimonials";
  enabled?: boolean;
  settings: MessageStyleTestimonialsSettings;
};

export type MessageStyleTestimonialsProps = {
  section: MessageStyleTestimonialsSectionDoc;
};
