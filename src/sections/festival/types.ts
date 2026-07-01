import type {
  ResolvedSectionAppearance,
  SectionAppearance,
  StorefrontTheme,
} from "../../shared/sectionAppearance";

export type FestivalSectionPadding = "small" | "medium" | "large";

export type FestivalIllustrationType =
  | "rakhi"
  | "mithai"
  | "puja"
  | "silver"
  | "hamper"
  | "floral"
  | "customImage";

export type FestivalCardBlock = {
  id: string;
  type?: "festival_card" | string;
  frontTitle?: string;
  frontSubtitle?: string;
  frontDescription?: string;
  frontTag?: string;
  frontTagBgColor?: string;
  frontPrice?: string;
  frontAccentColor?: string;
  frontIllustrationType?: FestivalIllustrationType | string;
  frontImage?: string;
  frontButtonText?: string;
  productLink?: string;
  props?: Record<string, unknown>;
};

export type FestivalPetalBlock = {
  id: string;
  type?: "festival_petal" | string;
  color?: string;
  size?: number;
  leftPosition?: number;
  delay?: number;
  duration?: number;
  rotation?: number;
  props?: Record<string, unknown>;
};

export type FestivalBlock = FestivalCardBlock | FestivalPetalBlock;

export type FestivalSectionControls = {
  festivalLabel?: string;
  heroTitleLineOne?: string;
  heroTitleLineTwo?: string;
  heroSubtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  quoteText?: string;
  quoteSubText?: string;
  collectionLabel?: string;
  collectionHeadingLineOne?: string;
  collectionHeadingLineTwo?: string;
  collectionHintText?: string;
  footerText?: string;
  showPetals?: boolean;
  showGlowBlobs?: boolean;
  showQuote?: boolean;
  showFooter?: boolean;
  sectionPadding?: FestivalSectionPadding | string;
  [colorProp: string]: unknown;
};

export type FestivalSectionSettings = {
  props?: FestivalSectionControls;
  blocks?: FestivalBlock[];
};

export type FestivalSectionDoc = {
  id: string;
  type: "festival";
  variant?: string;
  enabled?: boolean;
  settings: FestivalSectionSettings;
};

export type RakhiGiftFestivalProps = {
  section: FestivalSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};

export type FestivalSectionAppearance = SectionAppearance;
