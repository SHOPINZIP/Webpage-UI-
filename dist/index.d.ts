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

/**
 * Shared helpers for hero layouts (slider + scrollable).
 */
declare function normalizeImageUrl(raw: unknown): string;

export { HeroScrollableSlide, type HeroScrollableSlideProps, type HeroSection, type HeroSectionControls, type HeroSectionSettings, type HeroSlideAlignmentOverride, type HeroSlideBlock, type HeroSlideBlockProps, HeroSlider, type HeroSliderProps, type MessageStyleTestimonialBlock, type MessageStyleTestimonialItemProps, MessageStyleTestimonials, type MessageStyleTestimonialsProps, type MessageStyleTestimonialsSectionDoc, type MessageStyleTestimonialsSettings, STYLE_APPLE_MARQUEE, STYLE_MESSAGE_BUBBLE, normalizeImageUrl };
