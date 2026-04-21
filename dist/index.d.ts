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

type SubHeroImageLoopBlock = {
    id?: string;
    type?: string;
    props?: {
        desktopImage?: string;
        mobileImage?: string;
        alt?: string;
    };
};
type SubHeroImageLoopSectionDoc = {
    id?: string;
    type?: string;
    enabled?: boolean;
    settings?: {
        props?: {
            autoPlay?: boolean;
            interval?: string | number;
            heightOption?: string;
            effect?: "fade" | "slide";
        };
        blocks?: SubHeroImageLoopBlock[];
    };
};
type SubHeroImageLoopProps = {
    section: SubHeroImageLoopSectionDoc;
};
/**
 * Sub-hero image loop: Framer Motion fade or slide, Apple-like tonal overlays, glass indicators.
 * Data-driven from `section.settings` (blocks type `imageSlide`).
 */
declare function SubHeroImageLoop({ section }: SubHeroImageLoopProps): React.JSX.Element | null;

type LogoFocusedHeaderNavBlockProps = {
    label?: string;
    link?: string;
};
type LogoFocusedHeaderNavBlock = {
    id: string;
    type: "navItem";
    props: LogoFocusedHeaderNavBlockProps;
};
type LogoFocusedHeaderControls = {
    logoText?: string;
    brandName?: string;
    brandSubtitle?: string;
    logoImage?: string;
    showBrandSubtitle?: boolean;
    showProfileIcon?: boolean;
    showCartIcon?: boolean;
    /** Badge text from schema (e.g. cart count) */
    cartCount?: string;
    stickyHeader?: boolean;
};
type LogoFocusedHeaderSettings = {
    props?: LogoFocusedHeaderControls;
    blocks?: LogoFocusedHeaderNavBlock[];
};
type LogoFocusedHeaderSectionDoc = {
    id: string;
    type: "header";
    enabled?: boolean;
    settings: LogoFocusedHeaderSettings;
};
type LogoFocusedHeaderProps = {
    section: LogoFocusedHeaderSectionDoc;
};
declare function LogoFocusedHeader({ section }: LogoFocusedHeaderProps): React.JSX.Element;

type TransparentHeroHeaderNavBlockProps = {
    label?: string;
    link?: string;
};
type TransparentHeroHeaderNavBlock = {
    id: string;
    type: "navItem";
    props: TransparentHeroHeaderNavBlockProps;
};
type TransparentHeroHeaderControls = {
    logoText?: string;
    logoImage?: string;
    showProfileIcon?: boolean;
    showCartIcon?: boolean;
    cartCount?: string;
    stickyHeader?: boolean;
    enableScrollTransition?: boolean;
    initialTransparency?: string;
    maxTransparency?: string;
    maxBlur?: string;
};
type TransparentHeroHeaderSettings = {
    props?: TransparentHeroHeaderControls;
    blocks?: TransparentHeroHeaderNavBlock[];
};
type TransparentHeroHeaderSectionDoc = {
    id: string;
    type: "header";
    enabled?: boolean;
    settings: TransparentHeroHeaderSettings;
};
type TransparentHeroHeaderProps = {
    section: TransparentHeroHeaderSectionDoc;
};
declare function TransparentHeroHeader({ section }: TransparentHeroHeaderProps): React.JSX.Element;

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
    alt?: string;
    /** Card body copy (e.g. LiquidFocusCategories per-card text) */
    description?: string;
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
    defaultActiveIndex?: string;
    resetToDefaultOnLeave?: boolean;
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

declare function LiquidFocusCategories({ section }: ProductMarqueeProps): React.JSX.Element;

declare function PortraitTestimonials({ section, }: {
    section: {
        settings?: any;
    };
}): React.JSX.Element;

type NspSignatureHeroBlock = {
    id?: string;
    type?: string;
    props?: {
        image?: string;
        alt?: string;
        position?: string;
    };
};
type NspSignatureHeroSectionDoc = {
    id?: string;
    type?: string;
    enabled?: boolean;
    settings?: {
        props?: Record<string, unknown>;
        blocks?: NspSignatureHeroBlock[];
    };
};
type ScrollParallaxSignatureHeroProps = {
    section: NspSignatureHeroSectionDoc;
};
declare function ScrollParallaxSignatureHero({ section, }: ScrollParallaxSignatureHeroProps): React.JSX.Element | null;

type FullImageTypingWordBlock = {
    id?: string;
    type?: string;
    props?: {
        text?: string;
    };
};
type FullImageTypingHeroSectionDoc = {
    id?: string;
    type?: string;
    enabled?: boolean;
    settings?: {
        props?: Record<string, unknown>;
        blocks?: FullImageTypingWordBlock[];
    };
};
type FullImageTypingHeroProps = {
    section: FullImageTypingHeroSectionDoc;
};
declare function FullImageTypingHero({ section }: FullImageTypingHeroProps): React.JSX.Element | null;

type PokerRowRevealHeroBlock = {
    id?: string;
    type?: string;
    props?: {
        image?: string;
        alt?: string;
    };
};
type PokerRowRevealHeroSectionDoc = {
    id?: string;
    type?: string;
    enabled?: boolean;
    settings?: {
        props?: Record<string, unknown>;
        blocks?: PokerRowRevealHeroBlock[];
    };
};
type PokerRowRevealHeroProps = {
    section: PokerRowRevealHeroSectionDoc;
};
declare function PokerRowRevealHero({ section }: PokerRowRevealHeroProps): React.JSX.Element | null;

type NSPSignatureHeroMarqueeBlock = {
    id?: string;
    type?: string;
    props?: {
        title?: string;
        subtitle?: string;
        image?: string;
        link?: string;
    };
};
type NSPSignatureHeroMarqueeSectionDoc = {
    id?: string;
    type?: string;
    enabled?: boolean;
    settings?: {
        props?: Record<string, unknown>;
        blocks?: NSPSignatureHeroMarqueeBlock[];
    };
};
type NSPSignatureHeroMarqueeProps = {
    section: NSPSignatureHeroMarqueeSectionDoc;
};
declare function NSPSignatureHeroMarquee({ section }: NSPSignatureHeroMarqueeProps): React.JSX.Element | null;

type MinimalTimelineBenefitBlockProps = {
    title?: string;
    desc?: string;
    point1?: string;
    point2?: string;
    point3?: string;
};
type MinimalTimelineBenefitBlock = {
    id: string;
    type: "benefitItem";
    props: MinimalTimelineBenefitBlockProps;
};
type MinimalTimelineBenefitsControls = {
    eyebrow?: string;
    heading?: string;
    description?: string;
    showActiveRailFill?: boolean;
};
type MinimalTimelineBenefitsSettings = {
    props?: MinimalTimelineBenefitsControls;
    blocks?: MinimalTimelineBenefitBlock[];
};
type MinimalTimelineBenefitsSectionDoc = {
    id: string;
    type: "benefits-points";
    enabled?: boolean;
    settings: MinimalTimelineBenefitsSettings;
};
type MinimalTimelineBenefitsProps = {
    section: MinimalTimelineBenefitsSectionDoc;
};

declare function MinimalTimelineBenefits({ section }: MinimalTimelineBenefitsProps): React.JSX.Element;

/**
 * Merchant Footer Reveal — storefront section document (Web 1 `footer` + `MerchantFooterReveal`).
 */
type MerchantFooterRevealSocialPlatform = "instagram" | "facebook" | "website";
type MerchantFooterRevealPolicyBlockProps = {
    text?: string;
    link?: string;
};
type MerchantFooterRevealPolicyBlock = {
    id: string;
    type: "policyLink";
    props: MerchantFooterRevealPolicyBlockProps;
};
type MerchantFooterRevealBlock = MerchantFooterRevealPolicyBlock;
type MerchantFooterRevealProps = {
    logoText?: string;
    logoImage?: string;
    merchantName?: string;
    merchantSubLabel?: string;
    tagline?: string;
    address?: string;
    phone?: string;
    whatsapp?: string;
    socialHeading?: string;
    policiesHeading?: string;
    instagramLink?: string;
    facebookLink?: string;
    websiteLink?: string;
};
type MerchantFooterRevealSettings = {
    props?: MerchantFooterRevealProps;
    blocks?: MerchantFooterRevealBlock[];
};
type MerchantFooterRevealSectionDoc = {
    settings?: MerchantFooterRevealSettings;
};
type MerchantFooterRevealPropsComponent = {
    section: MerchantFooterRevealSectionDoc & {
        settings?: MerchantFooterRevealSettings;
    };
};

declare function MerchantFooterReveal({ section }: MerchantFooterRevealPropsComponent): React.JSX.Element;

type CouponStripBlockProps = {
    code?: string;
    title?: string;
};
type CouponStripBlock = {
    id?: string;
    type?: string;
    props?: CouponStripBlockProps;
};
type CouponStripsControls = {
    heading?: string;
    subheading?: string;
    showSubheading?: boolean;
    showSecondaryStrip?: boolean;
    stripSpeedPrimary?: number;
    stripSpeedSecondary?: number;
};
type CouponStripsSettings = {
    props?: CouponStripsControls;
    blocks?: CouponStripBlock[];
};
type CouponStripsSectionDoc = {
    id?: string;
    type?: "coupon_strips" | string;
    enabled?: boolean;
    settings?: CouponStripsSettings;
};
type CouponTickerMinimalProps = {
    section: CouponStripsSectionDoc;
};

declare function CouponTickerMinimal({ section }: CouponTickerMinimalProps): React.JSX.Element | null;

/**
 * Shared helpers for hero layouts (slider + scrollable).
 */
declare function normalizeImageUrl(raw: unknown): string;

export { type CouponStripBlock, type CouponStripBlockProps, type CouponStripsControls, type CouponStripsSectionDoc, type CouponStripsSettings, CouponTickerMinimal, type CouponTickerMinimalProps, CreativeCategoryMarquee, FullImageTypingHero, type FullImageTypingHeroProps, type FullImageTypingHeroSectionDoc, type FullImageTypingWordBlock, HeroScrollableSlide, type HeroScrollableSlideProps, type HeroSection, type HeroSectionControls, type HeroSectionSettings, type HeroSlideAlignmentOverride, type HeroSlideBlock, type HeroSlideBlockProps, HeroSlider, type HeroSliderProps, LiquidFocusCategories, LogoFocusedHeader, type LogoFocusedHeaderControls, type LogoFocusedHeaderNavBlock, type LogoFocusedHeaderNavBlockProps, type LogoFocusedHeaderProps, type LogoFocusedHeaderSectionDoc, type LogoFocusedHeaderSettings, MerchantFooterReveal, type MerchantFooterRevealBlock, type MerchantFooterRevealPolicyBlockProps, type MerchantFooterRevealProps, type MerchantFooterRevealPropsComponent, type MerchantFooterRevealSectionDoc, type MerchantFooterRevealSettings, type MerchantFooterRevealSocialPlatform, type MessageStyleTestimonialBlock, type MessageStyleTestimonialItemProps, MessageStyleTestimonials, type MessageStyleTestimonialsProps, type MessageStyleTestimonialsSectionDoc, type MessageStyleTestimonialsSettings, type MinimalTimelineBenefitBlock, type MinimalTimelineBenefitBlockProps, MinimalTimelineBenefits, type MinimalTimelineBenefitsControls, type MinimalTimelineBenefitsProps, type MinimalTimelineBenefitsSectionDoc, type MinimalTimelineBenefitsSettings, NSPSignatureHeroMarquee, type NSPSignatureHeroMarqueeBlock, type NSPSignatureHeroMarqueeProps, type NSPSignatureHeroMarqueeSectionDoc, type NspSignatureHeroBlock, type NspSignatureHeroSectionDoc, PokerRowRevealHero, type PokerRowRevealHeroBlock, type PokerRowRevealHeroProps, type PokerRowRevealHeroSectionDoc, PortraitTestimonials, ProductCardMarquee, ProductMarquee, type ProductMarqueeBlock, type ProductMarqueeItemProps, type ProductMarqueeProps, type ProductMarqueeSectionDoc, type ProductMarqueeSettings, STYLE_APPLE_MARQUEE, STYLE_MESSAGE_BUBBLE, STYLE_PORTRAIT_TESTIMONIALS, STYLE_STACKED_TESTIMONIALS, ScrollParallaxSignatureHero, type ScrollParallaxSignatureHeroProps, type StackedTestimonialBlock, type StackedTestimonialItemProps, StackedTestimonials, type StackedTestimonialsProps, type StackedTestimonialsSectionDoc, type StackedTestimonialsSettings, SubHeroImageLoop, type SubHeroImageLoopProps, type SubHeroImageLoopSectionDoc, TransparentHeroHeader, type TransparentHeroHeaderControls, type TransparentHeroHeaderNavBlock, type TransparentHeroHeaderNavBlockProps, type TransparentHeroHeaderProps, type TransparentHeroHeaderSectionDoc, type TransparentHeroHeaderSettings, normalizeImageUrl };
