import React from 'react';

/** Section-level controls (settings.props) */
type HeroSectionControls = {
    sectionLabel?: string;
    /** Toolbar subtitle (stacked scroll layout only) */
    toolbarHint?: string;
    autoPlay?: boolean;
    /** Seconds, often stored as string e.g. `"4"` */
    speed?: string | number;
    direction?: "left" | "right";
    showArrows?: boolean;
    showDots?: boolean;
    alignment?: "left" | "center" | "right";
    height?: "default" | "short" | "tall" | string;
    overlay?: "none" | "light" | "medium" | "heavy" | string;
};
type HeroSlideAlignmentOverride = "inherit" | "left" | "center" | "right";
/** One slide block (settings.blocks[].props) */
type HeroSlideBlockProps = {
    image?: string;
    imageMobile?: string;
    /** Small label above the title (stacked scroll layout) */
    eyebrow?: string;
    headline?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    alignmentOverride?: HeroSlideAlignmentOverride;
};
type HeroSlideBlock = {
    id: string;
    type: "slide";
    props: HeroSlideBlockProps;
};
type HeroSectionSettings = {
    props?: HeroSectionControls;
    blocks?: HeroSlideBlock[];
};
/** Persisted hero section document — pass this as the only data prop to `HeroSlider`. */
type HeroSection = {
    id: string;
    type: "hero";
    enabled?: boolean;
    settings: HeroSectionSettings;
};
type HeroSliderProps = {
    section: HeroSection;
};
declare function HeroSlider({ section }: HeroSliderProps): React.JSX.Element | null;

type HeroScrollableSlideProps = {
    section: HeroSection;
};
/**
 * Stacked full-screen scroll cards — same `HeroSection` document shape as {@link HeroSlider}.
 * All copy and media must come from `section.settings` (no built-in demo data).
 */
declare function HeroScrollableSlide({ section }: HeroScrollableSlideProps): React.JSX.Element | null;

type MessageStyleTestimonialItemProps = {
    name?: string;
    role?: string;
    quote?: string;
    /** Hide from storefront when false (default true). */
    isVisible?: boolean;
    /** 1–5, default 5. */
    rating?: number;
};
type MessageStyleTestimonialBlock = {
    id: string;
    type: "testimonial";
    props: MessageStyleTestimonialItemProps;
};
type MessageStyleTestimonialsSectionProps = {
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
type MessageStyleTestimonialsSettings = {
    props?: MessageStyleTestimonialsSectionProps;
    blocks?: MessageStyleTestimonialBlock[];
};
type MessageStyleTestimonialsSectionDoc = {
    id: string;
    type: "messageStyleTestimonials";
    enabled?: boolean;
    settings: MessageStyleTestimonialsSettings;
};
type MessageStyleTestimonialsProps = {
    section: MessageStyleTestimonialsSectionDoc;
};

declare function MessageStyleTestimonials(props: MessageStyleTestimonialsProps): React.JSX.Element;

declare const STYLE_MESSAGE_BUBBLE = "message_bubble";
declare const STYLE_APPLE_MARQUEE = "apple_message_marquee";
declare const STYLE_STACKED_TESTIMONIALS = "stacked_testimonials";
declare const STYLE_PORTRAIT_TESTIMONIALS = "portrait_testimonials";

type StackedTestimonialItemProps = {
    /** "1"–"5" */
    stars?: string;
    quote?: string;
    name?: string;
    role?: string;
};
type StackedTestimonialBlock = {
    id: string;
    type?: string;
    props: StackedTestimonialItemProps;
};
type StackedTestimonialsSectionProps = {
    backgroundWord?: string;
    showBackgroundWord?: boolean;
};
type StackedTestimonialsSettings = {
    props?: StackedTestimonialsSectionProps;
    blocks?: StackedTestimonialBlock[];
};
/** Same section `type` as marquee testimonials; `variant` selects stacked on the storefront. */
type StackedTestimonialsSectionDoc = {
    id: string;
    type: "messageStyleTestimonials";
    variant?: string;
    enabled?: boolean;
    settings: StackedTestimonialsSettings;
};
type StackedTestimonialsProps = {
    section: StackedTestimonialsSectionDoc;
};

declare function StackedTestimonials({ section }: StackedTestimonialsProps): React.JSX.Element;

type ProductMarqueeItemProps = {
    title?: string;
    subtitle?: string;
    image?: string;
};
type ProductMarqueeBlock = {
    id: string;
    type?: string;
    props: ProductMarqueeItemProps;
};
type ProductMarqueeSectionProps = {
    eyebrow?: string;
    heading?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    showButton?: boolean;
};
type ProductMarqueeSettings = {
    props?: ProductMarqueeSectionProps;
    blocks?: ProductMarqueeBlock[];
};
type ProductMarqueeSectionDoc = {
    id: string;
    type: "productMarquee";
    variant?: string;
    enabled?: boolean;
    settings: ProductMarqueeSettings;
};
type ProductMarqueeProps = {
    section: ProductMarqueeSectionDoc;
};

declare function ProductMarquee({ section }: ProductMarqueeProps): React.JSX.Element;

declare function ProductCardMarquee({ section }: ProductMarqueeProps): React.JSX.Element;

declare function CreativeCategoryMarquee({ section }: ProductMarqueeProps): React.JSX.Element;

declare function PortraitTestimonials({ section, }: {
    section: {
        settings?: any;
    };
}): React.JSX.Element;

/**
 * Shared helpers for hero layouts (slider + scrollable).
 */
declare function normalizeImageUrl(raw: unknown): string;

export { CreativeCategoryMarquee, HeroScrollableSlide, type HeroScrollableSlideProps, type HeroSection, type HeroSectionControls, type HeroSectionSettings, type HeroSlideAlignmentOverride, type HeroSlideBlock, type HeroSlideBlockProps, HeroSlider, type HeroSliderProps, type MessageStyleTestimonialBlock, type MessageStyleTestimonialItemProps, MessageStyleTestimonials, type MessageStyleTestimonialsProps, type MessageStyleTestimonialsSectionDoc, type MessageStyleTestimonialsSettings, PortraitTestimonials, ProductCardMarquee, ProductMarquee, type ProductMarqueeBlock, type ProductMarqueeItemProps, type ProductMarqueeProps, type ProductMarqueeSectionDoc, type ProductMarqueeSettings, STYLE_APPLE_MARQUEE, STYLE_MESSAGE_BUBBLE, STYLE_PORTRAIT_TESTIMONIALS, STYLE_STACKED_TESTIMONIALS, type StackedTestimonialBlock, type StackedTestimonialItemProps, StackedTestimonials, type StackedTestimonialsProps, type StackedTestimonialsSectionDoc, type StackedTestimonialsSettings, normalizeImageUrl };
