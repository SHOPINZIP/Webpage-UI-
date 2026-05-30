import React, { CSSProperties } from 'react';

type TypographyRole = "heading" | "body";
type TextStyle = {
    fontFamily?: string;
    color?: string;
    fontWeight?: string;
    fontSize?: string;
};
type ResolvedTextStyle = {
    fontFamily: string;
    color: string;
    fontWeight: string;
    fontSize: string;
};
type StorefrontThemeTypography = {
    heading?: TextStyle;
    body?: TextStyle;
};
declare const DEFAULT_TYPOGRAPHY: Record<TypographyRole, TextStyle>;
declare function normalizeTextStyle(raw?: TextStyle | null): TextStyle;
declare function normalizeTypography(raw?: StorefrontThemeTypography | null): {
    heading: TextStyle;
    body: TextStyle;
};
declare function normalizeSectionTypographyRole(raw?: TextStyle | null): TextStyle;
declare function normalizeSectionTypography(raw?: StorefrontThemeTypography | null): {
    heading: TextStyle;
    body: TextStyle;
};
declare function normalizeThemeTypography(raw?: StorefrontThemeTypography | null): {
    heading: TextStyle;
    body: TextStyle;
};
declare function stripFieldOverrideStyle(style?: TextStyle | null): TextStyle;
declare function normalizeFieldStyles(raw?: Record<string, TextStyle | undefined> | null): Record<string, TextStyle>;
declare function normalizeBlockGroupStyles(raw?: Record<string, TextStyle | undefined> | null): Record<string, TextStyle>;
declare function resolveThemeFontKey(role?: TypographyRole | string, theme?: {
    fontFamily?: string;
    typography?: Partial<Record<TypographyRole, TextStyle>>;
} | null): string;
type ResolveTextStyleInput = {
    section?: {
        settings?: {
            props?: {
                appearance?: {
                    typography?: Partial<Record<TypographyRole, TextStyle>>;
                    fieldStyles?: Record<string, TextStyle>;
                    blockGroupStyles?: Record<string, TextStyle>;
                };
            };
        };
    } | null;
    theme?: {
        fontFamily?: string;
        typography?: Partial<Record<TypographyRole, TextStyle>>;
    } | null;
    fieldId?: string;
    role?: TypographyRole | string;
    defaultStyle?: TextStyle | null;
};
declare function resolveTextStyle({ section, theme, fieldId, role, defaultStyle, }: ResolveTextStyleInput): ResolvedTextStyle;
type ResolveBlockGroupTextStyleInput = {
    section?: ResolveTextStyleInput["section"];
    theme?: ResolveTextStyleInput["theme"];
    groupKey?: string;
    role?: TypographyRole | string;
    defaultStyle?: TextStyle | null;
};
declare function resolveBlockGroupTextStyle({ section, theme, groupKey, role, defaultStyle, }: ResolveBlockGroupTextStyleInput): ResolvedTextStyle;
declare function resolvedTextStyleToInlineStyle(style: ResolvedTextStyle): {
    fontFamily: string;
    color: string;
    fontWeight: string;
    fontSize: string;
};
declare function collectThemeFontIds(theme?: ResolveTextStyleInput["theme"]): string[];

type HeaderAppearance = {
    navContainerBackground?: string;
    navTextColor?: string;
    navActiveBackground?: string;
    navActiveTextColor?: string;
    navBorderColor?: string;
    iconButtonBackground?: string;
    iconButtonColor?: string;
    iconButtonBorderColor?: string;
    cartBadgeBackground?: string;
    cartBadgeTextColor?: string;
};

type SectionAppearance = {
    backgroundColor?: string;
    typography?: {
        heading?: TextStyle;
        body?: TextStyle;
    };
    fieldStyles?: Record<string, TextStyle>;
    blockGroupStyles?: Record<string, TextStyle>;
    header?: HeaderAppearance;
};
type StorefrontTheme = {
    backgroundColor?: string;
    fontFamily?: string;
    typography?: {
        heading?: TextStyle;
        body?: TextStyle;
    };
};
type ResolvedSectionAppearance = {
    backgroundColor: string;
    fontId: string;
    fontFamily: string;
};
declare const SECTION_TYPE_APPEARANCE_DEFAULTS: Record<string, SectionAppearance>;
declare function normalizeAppearance(raw?: SectionAppearance | null): SectionAppearance;
declare function normalizeTheme(raw?: StorefrontTheme | null): StorefrontTheme;
declare function resolveSectionAppearance(section: {
    type?: string;
    settings?: {
        props?: {
            appearance?: SectionAppearance;
        };
    };
}, theme?: StorefrontTheme | null): ResolvedSectionAppearance;
declare function sectionAppearanceStyle(appearance?: ResolvedSectionAppearance | null): {
    backgroundColor: string;
} | undefined;

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
    props?: HeroSectionControls & {
        appearance?: SectionAppearance;
    };
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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};
declare function HeroSlider({ section, appearance, theme }: HeroSliderProps): React.JSX.Element | null;

type HeroScrollableSlideProps = {
    section: HeroSection;
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};
/**
 * Stacked full-screen scroll cards — same `HeroSection` document shape as {@link HeroSlider}.
 * All copy and media must come from `section.settings` (no built-in demo data).
 */
declare function HeroScrollableSlide({ section, appearance, theme, }: HeroScrollableSlideProps): React.JSX.Element | null;

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
    props?: LogoFocusedHeaderControls & {
        appearance?: SectionAppearance;
    };
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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
    cartCount?: number | string;
    onSearchChnage?: (search?: string) => void;
    onProfileClick?: (data?: any) => void;
    onCartClick?: (data?: any) => void;
};
declare function LogoFocusedHeader({ section, appearance, theme, cartCount, onSearchChnage, onProfileClick, onCartClick, }: LogoFocusedHeaderProps): React.JSX.Element;

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
    brandName?: string;
    brandSubtitle?: string;
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
    props?: TransparentHeroHeaderControls & {
        appearance?: SectionAppearance;
    };
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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
    cartCount?: number | string;
    onSearchChnage?: (search?: string) => void;
    onProfileClick?: (data?: any) => void;
    onCartClick?: (data?: any) => void;
};
declare function TransparentHeroHeader({ section, appearance, theme, cartCount, onSearchChnage, onProfileClick, onCartClick, }: TransparentHeroHeaderProps): React.JSX.Element;

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
    appearance?: SectionAppearance;
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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};

declare function MessageStyleTestimonials({ section, appearance, theme, }: MessageStyleTestimonialsProps): React.JSX.Element;

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
    appearance?: SectionAppearance;
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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};

declare function StackedTestimonials({ section, appearance, theme, }: StackedTestimonialsProps): React.JSX.Element;

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
    props?: ProductMarqueeSectionProps & {
        appearance?: SectionAppearance;
    };
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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};

declare function ProductMarquee({ section, appearance, theme }: ProductMarqueeProps): React.JSX.Element;

declare function ProductCardMarquee({ section, appearance, theme }: ProductMarqueeProps): React.JSX.Element;

declare function CreativeCategoryMarquee({ section, appearance, theme, }: ProductMarqueeProps): React.JSX.Element;

declare function LiquidFocusCategories({ section, appearance, theme, }: ProductMarqueeProps): React.JSX.Element;

declare function PortraitTestimonials({ section, appearance, theme, }: {
    section: {
        settings?: any;
    };
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};
declare function ScrollParallaxSignatureHero({ section, appearance, theme, }: ScrollParallaxSignatureHeroProps): React.JSX.Element | null;

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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};
declare function FullImageTypingHero({ section, appearance, theme, }: FullImageTypingHeroProps): React.JSX.Element | null;

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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};
declare function PokerRowRevealHero({ section, appearance, theme, }: PokerRowRevealHeroProps): React.JSX.Element | null;

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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};
declare function NSPSignatureHeroMarquee({ section, appearance, theme, }: NSPSignatureHeroMarqueeProps): React.JSX.Element | null;

type FloatingSnackGalleryImageBlock = {
    id?: string;
    type?: string;
    image?: string;
    title?: string;
    altText?: string;
    alt?: string;
    props?: {
        image?: string;
        title?: string;
        altText?: string;
        alt?: string;
    };
};
type FloatingSnackGalleryHeroSectionDoc = {
    id?: string;
    type?: string;
    enabled?: boolean;
    settings?: {
        props?: Record<string, unknown>;
        blocks?: FloatingSnackGalleryImageBlock[];
    };
};
type FloatingSnackGalleryHeroProps = {
    section: FloatingSnackGalleryHeroSectionDoc;
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};
declare function FloatingSnackGalleryHero({ section, appearance, theme, }: FloatingSnackGalleryHeroProps): React.JSX.Element | null;

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
    props?: MinimalTimelineBenefitsControls & {
        appearance?: SectionAppearance;
    };
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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};

declare function MinimalTimelineBenefits({ section, appearance, theme, }: MinimalTimelineBenefitsProps): React.JSX.Element;

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
    props?: MerchantFooterRevealProps & {
        appearance?: SectionAppearance;
    };
    blocks?: MerchantFooterRevealBlock[];
};
type MerchantFooterRevealSectionDoc = {
    settings?: MerchantFooterRevealSettings;
};
type MerchantFooterRevealPropsComponent = {
    section: MerchantFooterRevealSectionDoc & {
        settings?: MerchantFooterRevealSettings;
    };
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};

declare function MerchantFooterReveal({ section, appearance, theme, }: MerchantFooterRevealPropsComponent): React.JSX.Element;

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
    props?: CouponStripsControls & {
        appearance?: SectionAppearance;
    };
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
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};

declare function CouponTickerMinimal({ section, appearance, theme, }: CouponTickerMinimalProps): React.JSX.Element | null;

type MarqueeTextRow = "top" | "bottom";
type MarqueeTextBlock = {
    id?: string;
    type?: string;
    text?: string;
    row?: MarqueeTextRow | string;
    props?: {
        text?: string;
        row?: MarqueeTextRow | string;
    };
};
type MarqueeTextControls = {
    speedTop?: number;
    speedBottom?: number;
    largeTopRow?: boolean;
    largeBottomRow?: boolean;
    pauseOnHover?: boolean;
};
type MarqueeTextSettings = {
    props?: MarqueeTextControls & {
        appearance?: SectionAppearance;
    };
    blocks?: MarqueeTextBlock[];
};
type MarqueeTextSectionDoc = {
    id?: string;
    type?: "marquee_text" | string;
    variant?: string;
    enabled?: boolean;
    settings?: MarqueeTextSettings;
};
type MarqueeRenderItem = {
    id: string;
    text: string;
    style?: CSSProperties;
};
type DualLineFeatureMarqueeProps = {
    section: MarqueeTextSectionDoc;
    appearance?: ResolvedSectionAppearance | null;
    theme?: StorefrontTheme | null;
};
type MarqueeLineProps = {
    items: MarqueeRenderItem[];
    large?: boolean;
    reverse?: boolean;
    durationSec?: number;
    pauseOnHover?: boolean;
    reducedMotion?: boolean;
};

declare function DualLineFeatureMarquee({ section, appearance, theme, }: DualLineFeatureMarqueeProps): React.JSX.Element | null;

type FeatureMarqueeBlockProps = {
    marqueeTop: MarqueeRenderItem[];
    marqueeBottom: MarqueeRenderItem[];
    speedTop?: number;
    speedBottom?: number;
    largeTopRow?: boolean;
    largeBottomRow?: boolean;
    pauseOnHover?: boolean;
    reducedMotion?: boolean;
};
declare function FeatureMarqueeBlock({ marqueeTop, marqueeBottom, speedTop, speedBottom, largeTopRow, largeBottomRow, pauseOnHover, reducedMotion, }: FeatureMarqueeBlockProps): React.JSX.Element | null;

/**
 * Shared helpers for hero layouts (slider + scrollable).
 */
declare function normalizeImageUrl(raw: unknown): string;

declare const DEFAULT_STOREFRONT_FONT_ID = "inter";
type StorefrontFontSource = "system" | "google" | "local";
type StorefrontFontDefinition = {
    value: string;
    label: string;
    cssFamily: string;
    source: StorefrontFontSource;
    googleFamily?: string;
    files?: string[];
};
declare const STOREFRONT_FONTS: StorefrontFontDefinition[];
declare const STOREFRONT_FONT_OPTIONS: {
    value: string;
    label: string;
}[];
declare function getStorefrontFontById(fontId?: string | null): StorefrontFontDefinition;
declare function resolveStorefrontFontFamily(fontId?: string | null): string;
declare function collectStorefrontFontIdsFromDocument(doc?: {
    theme?: {
        fontFamily?: string;
        typography?: {
            heading?: {
                fontFamily?: string;
            };
            body?: {
                fontFamily?: string;
            };
        };
    };
    sections?: Array<{
        settings?: {
            props?: {
                appearance?: {
                    typography?: {
                        heading?: {
                            fontFamily?: string;
                        };
                        body?: {
                            fontFamily?: string;
                        };
                    };
                    fieldStyles?: Record<string, {
                        fontFamily?: string;
                    }>;
                    blockGroupStyles?: Record<string, {
                        fontFamily?: string;
                    }>;
                };
            };
        };
    }>;
}): string[];

type StorefrontFontLoaderProps = {
    themeFontId?: string | null;
    fontIds?: string[];
    document?: Parameters<typeof collectStorefrontFontIdsFromDocument>[0] | null;
};
declare function StorefrontFontLoader({ themeFontId, fontIds, document, }: StorefrontFontLoaderProps): null;

declare const MARQUEE_TOP_ROW_DEFAULT: TextStyle;
declare const MARQUEE_BOTTOM_ROW_DEFAULT: TextStyle;
/** Large row when largeTopRow / largeBottomRow toggles are on. */
declare const MARQUEE_TEXT_LARGE_DEFAULT: TextStyle;
declare const MARQUEE_TEXT_SMALL_DEFAULT: TextStyle;

declare const HERO_SECTION_LABEL_DEFAULT: TextStyle;
declare const HERO_SLIDE_HEADLINE_DEFAULT: TextStyle;
declare const HERO_SLIDE_DESCRIPTION_DEFAULT: TextStyle;

declare const FOOTER_MERCHANT_NAME_DEFAULT: TextStyle;
declare const FOOTER_MERCHANT_SUB_LABEL_DEFAULT: TextStyle;
declare const FOOTER_TAGLINE_DEFAULT: TextStyle;
declare const FOOTER_COLUMN_HEADING_DEFAULT: TextStyle;
declare const FOOTER_POLICY_LINK_TEXT_DEFAULT: TextStyle;

declare const HEADER_BRAND_NAME_DEFAULT: TextStyle;
declare const HEADER_BRAND_SUBTITLE_DEFAULT: TextStyle;
declare const HEADER_NAV_LINK_TEXT_DEFAULT: TextStyle;
/** Transparent / glass hero header nav pills (light text on dark overlay). */
declare const HEADER_NAV_LINK_TEXT_LIGHT_DEFAULT: TextStyle;

declare const COUPON_HEADING_DEFAULT: TextStyle;
declare const COUPON_SUBHEADING_DEFAULT: TextStyle;
declare const COUPON_CODE_DEFAULT: TextStyle;
declare const COUPON_TITLE_DEFAULT: TextStyle;

declare const BENEFITS_EYEBROW_DEFAULT: TextStyle;
declare const BENEFITS_HEADING_DEFAULT: TextStyle;
declare const BENEFITS_DESCRIPTION_DEFAULT: TextStyle;
declare const BENEFIT_TITLE_DEFAULT: TextStyle;
declare const BENEFIT_DESCRIPTION_DEFAULT: TextStyle;
declare const BENEFIT_POINT_DEFAULT: TextStyle;

declare const PRODUCT_MARQUEE_EYEBROW_DEFAULT: TextStyle;
declare const PRODUCT_MARQUEE_HEADING_DEFAULT: TextStyle;
declare const PRODUCT_MARQUEE_DESCRIPTION_DEFAULT: TextStyle;
declare const PRODUCT_CARD_TITLE_DEFAULT: TextStyle;
/** Card titles on image overlays (e.g. LiquidFocusCategories). */
declare const PRODUCT_CARD_TITLE_OVERLAY_DEFAULT: TextStyle;
declare const PRODUCT_CARD_SUBTITLE_DEFAULT: TextStyle;
declare const PRODUCT_CARD_DESCRIPTION_DEFAULT: TextStyle;

declare const TESTIMONIAL_QUOTE_TEXT_DEFAULT: TextStyle;
declare const TESTIMONIAL_CUSTOMER_NAME_DEFAULT: TextStyle;
declare const TESTIMONIAL_CUSTOMER_ROLE_DEFAULT: TextStyle;
declare const TESTIMONIAL_SUBHEADING_DEFAULT: TextStyle;
declare const TESTIMONIAL_BACKGROUND_WORD_DEFAULT: TextStyle;
declare const TESTIMONIAL_EYEBROW_DEFAULT: TextStyle;
declare const TESTIMONIAL_HEADING_DEFAULT: TextStyle;
declare const TESTIMONIAL_HIGHLIGHT_TEXT_DEFAULT: TextStyle;
declare const TESTIMONIAL_DESCRIPTION_DEFAULT: TextStyle;
declare const TESTIMONIAL_BUTTON_TEXT_DEFAULT: TextStyle;

declare const NSP_SIG_HERO_EYEBROW_DEFAULT: TextStyle;
declare const NSP_SIG_HERO_HEADING_DEFAULT: TextStyle;
declare const NSP_SIG_HERO_DESCRIPTION_DEFAULT: TextStyle;
declare const NSP_SIG_HERO_PRIMARY_BUTTON_TEXT_DEFAULT: TextStyle;
declare const NSP_SIG_HERO_SECONDARY_BUTTON_TEXT_DEFAULT: TextStyle;
declare const NSP_TYPING_STATIC_HEADING_DEFAULT: TextStyle;
declare const NSP_TYPING_DESCRIPTION_DEFAULT: TextStyle;
declare const NSP_TYPING_PRIMARY_BUTTON_TEXT_DEFAULT: TextStyle;
declare const NSP_TYPING_SECONDARY_BUTTON_TEXT_DEFAULT: TextStyle;
declare const NSP_TYPING_WORD_DEFAULT: TextStyle;
declare const NSP_POKER_EYEBROW_DEFAULT: TextStyle;
declare const NSP_POKER_HEADING_DEFAULT: TextStyle;
declare const NSP_POKER_DESCRIPTION_DEFAULT: TextStyle;
declare const NSP_MARQUEE_EYEBROW_DEFAULT: TextStyle;
declare const NSP_MARQUEE_HERO_BADGE_TEXT_DEFAULT: TextStyle;
declare const NSP_MARQUEE_HEADING_DEFAULT: TextStyle;
declare const NSP_MARQUEE_SUBHEADING_DEFAULT: TextStyle;
declare const NSP_MARQUEE_CARD_TITLE_DEFAULT: TextStyle;
declare const NSP_MARQUEE_CARD_SUBTITLE_DEFAULT: TextStyle;
declare const NSP_FLOATING_SNACK_TITLE_DEFAULT: TextStyle;

export { BENEFITS_DESCRIPTION_DEFAULT, BENEFITS_EYEBROW_DEFAULT, BENEFITS_HEADING_DEFAULT, BENEFIT_DESCRIPTION_DEFAULT, BENEFIT_POINT_DEFAULT, BENEFIT_TITLE_DEFAULT, COUPON_CODE_DEFAULT, COUPON_HEADING_DEFAULT, COUPON_SUBHEADING_DEFAULT, COUPON_TITLE_DEFAULT, type CouponStripBlock, type CouponStripBlockProps, type CouponStripsControls, type CouponStripsSectionDoc, type CouponStripsSettings, CouponTickerMinimal, type CouponTickerMinimalProps, CreativeCategoryMarquee, DEFAULT_STOREFRONT_FONT_ID, DEFAULT_TYPOGRAPHY, DualLineFeatureMarquee, type DualLineFeatureMarqueeProps, FOOTER_COLUMN_HEADING_DEFAULT, FOOTER_MERCHANT_NAME_DEFAULT, FOOTER_MERCHANT_SUB_LABEL_DEFAULT, FOOTER_POLICY_LINK_TEXT_DEFAULT, FOOTER_TAGLINE_DEFAULT, FeatureMarqueeBlock, type FeatureMarqueeBlockProps, FloatingSnackGalleryHero, type FloatingSnackGalleryHeroProps, type FloatingSnackGalleryHeroSectionDoc, type FloatingSnackGalleryImageBlock, FullImageTypingHero, type FullImageTypingHeroProps, type FullImageTypingHeroSectionDoc, type FullImageTypingWordBlock, HEADER_BRAND_NAME_DEFAULT, HEADER_BRAND_SUBTITLE_DEFAULT, HEADER_NAV_LINK_TEXT_DEFAULT, HEADER_NAV_LINK_TEXT_LIGHT_DEFAULT, HERO_SECTION_LABEL_DEFAULT, HERO_SLIDE_DESCRIPTION_DEFAULT, HERO_SLIDE_HEADLINE_DEFAULT, HeroScrollableSlide, type HeroScrollableSlideProps, type HeroSection, type HeroSectionControls, type HeroSectionSettings, type HeroSlideAlignmentOverride, type HeroSlideBlock, type HeroSlideBlockProps, HeroSlider, type HeroSliderProps, LiquidFocusCategories, LogoFocusedHeader, type LogoFocusedHeaderControls, type LogoFocusedHeaderNavBlock, type LogoFocusedHeaderNavBlockProps, type LogoFocusedHeaderProps, type LogoFocusedHeaderSectionDoc, type LogoFocusedHeaderSettings, MARQUEE_BOTTOM_ROW_DEFAULT, MARQUEE_TEXT_LARGE_DEFAULT, MARQUEE_TEXT_SMALL_DEFAULT, MARQUEE_TOP_ROW_DEFAULT, type MarqueeLineProps, type MarqueeTextBlock, type MarqueeTextControls, type MarqueeTextRow, type MarqueeTextSectionDoc, type MarqueeTextSettings, MerchantFooterReveal, type MerchantFooterRevealBlock, type MerchantFooterRevealPolicyBlockProps, type MerchantFooterRevealProps, type MerchantFooterRevealPropsComponent, type MerchantFooterRevealSectionDoc, type MerchantFooterRevealSettings, type MerchantFooterRevealSocialPlatform, type MessageStyleTestimonialBlock, type MessageStyleTestimonialItemProps, MessageStyleTestimonials, type MessageStyleTestimonialsProps, type MessageStyleTestimonialsSectionDoc, type MessageStyleTestimonialsSettings, type MinimalTimelineBenefitBlock, type MinimalTimelineBenefitBlockProps, MinimalTimelineBenefits, type MinimalTimelineBenefitsControls, type MinimalTimelineBenefitsProps, type MinimalTimelineBenefitsSectionDoc, type MinimalTimelineBenefitsSettings, NSPSignatureHeroMarquee, type NSPSignatureHeroMarqueeBlock, type NSPSignatureHeroMarqueeProps, type NSPSignatureHeroMarqueeSectionDoc, NSP_FLOATING_SNACK_TITLE_DEFAULT, NSP_MARQUEE_CARD_SUBTITLE_DEFAULT, NSP_MARQUEE_CARD_TITLE_DEFAULT, NSP_MARQUEE_EYEBROW_DEFAULT, NSP_MARQUEE_HEADING_DEFAULT, NSP_MARQUEE_HERO_BADGE_TEXT_DEFAULT, NSP_MARQUEE_SUBHEADING_DEFAULT, NSP_POKER_DESCRIPTION_DEFAULT, NSP_POKER_EYEBROW_DEFAULT, NSP_POKER_HEADING_DEFAULT, NSP_SIG_HERO_DESCRIPTION_DEFAULT, NSP_SIG_HERO_EYEBROW_DEFAULT, NSP_SIG_HERO_HEADING_DEFAULT, NSP_SIG_HERO_PRIMARY_BUTTON_TEXT_DEFAULT, NSP_SIG_HERO_SECONDARY_BUTTON_TEXT_DEFAULT, NSP_TYPING_DESCRIPTION_DEFAULT, NSP_TYPING_PRIMARY_BUTTON_TEXT_DEFAULT, NSP_TYPING_SECONDARY_BUTTON_TEXT_DEFAULT, NSP_TYPING_STATIC_HEADING_DEFAULT, NSP_TYPING_WORD_DEFAULT, type NspSignatureHeroBlock, type NspSignatureHeroSectionDoc, PRODUCT_CARD_DESCRIPTION_DEFAULT, PRODUCT_CARD_SUBTITLE_DEFAULT, PRODUCT_CARD_TITLE_DEFAULT, PRODUCT_CARD_TITLE_OVERLAY_DEFAULT, PRODUCT_MARQUEE_DESCRIPTION_DEFAULT, PRODUCT_MARQUEE_EYEBROW_DEFAULT, PRODUCT_MARQUEE_HEADING_DEFAULT, PokerRowRevealHero, type PokerRowRevealHeroBlock, type PokerRowRevealHeroProps, type PokerRowRevealHeroSectionDoc, PortraitTestimonials, ProductCardMarquee, ProductMarquee, type ProductMarqueeBlock, type ProductMarqueeItemProps, type ProductMarqueeProps, type ProductMarqueeSectionDoc, type ProductMarqueeSettings, type ResolvedSectionAppearance, type ResolvedTextStyle, SECTION_TYPE_APPEARANCE_DEFAULTS, STOREFRONT_FONTS, STOREFRONT_FONT_OPTIONS, STYLE_APPLE_MARQUEE, STYLE_MESSAGE_BUBBLE, STYLE_PORTRAIT_TESTIMONIALS, STYLE_STACKED_TESTIMONIALS, ScrollParallaxSignatureHero, type ScrollParallaxSignatureHeroProps, type SectionAppearance, type StackedTestimonialBlock, type StackedTestimonialItemProps, StackedTestimonials, type StackedTestimonialsProps, type StackedTestimonialsSectionDoc, type StackedTestimonialsSettings, StorefrontFontLoader, type StorefrontTheme, SubHeroImageLoop, type SubHeroImageLoopProps, type SubHeroImageLoopSectionDoc, TESTIMONIAL_BACKGROUND_WORD_DEFAULT, TESTIMONIAL_BUTTON_TEXT_DEFAULT, TESTIMONIAL_CUSTOMER_NAME_DEFAULT, TESTIMONIAL_CUSTOMER_ROLE_DEFAULT, TESTIMONIAL_DESCRIPTION_DEFAULT, TESTIMONIAL_EYEBROW_DEFAULT, TESTIMONIAL_HEADING_DEFAULT, TESTIMONIAL_HIGHLIGHT_TEXT_DEFAULT, TESTIMONIAL_QUOTE_TEXT_DEFAULT, TESTIMONIAL_SUBHEADING_DEFAULT, type TextStyle, TransparentHeroHeader, type TransparentHeroHeaderControls, type TransparentHeroHeaderNavBlock, type TransparentHeroHeaderNavBlockProps, type TransparentHeroHeaderProps, type TransparentHeroHeaderSectionDoc, type TransparentHeroHeaderSettings, type TypographyRole, collectStorefrontFontIdsFromDocument, collectThemeFontIds, getStorefrontFontById, normalizeAppearance, normalizeBlockGroupStyles, normalizeFieldStyles, normalizeImageUrl, normalizeSectionTypography, normalizeSectionTypographyRole, normalizeTextStyle, normalizeTheme, normalizeThemeTypography, normalizeTypography, resolveBlockGroupTextStyle, resolveSectionAppearance, resolveStorefrontFontFamily, resolveTextStyle, resolveThemeFontKey, resolvedTextStyleToInlineStyle, sectionAppearanceStyle, stripFieldOverrideStyle };
