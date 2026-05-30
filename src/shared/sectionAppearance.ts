import {
  DEFAULT_STOREFRONT_FONT_ID,
  resolveStorefrontFontFamily,
} from "./fonts/fontRegistry";
import type { TextStyle } from "./sectionTypography";
import {
  normalizeBlockGroupStyles,
  normalizeFieldStyles,
  normalizeSectionTypography,
  normalizeThemeTypography,
} from "./sectionTypography";
import {
  normalizeHeaderAppearance,
  pruneHeaderAppearanceForPersistence,
  type HeaderAppearance,
} from "./headerAppearance";

export type SectionAppearance = {
  backgroundColor?: string;
  typography?: {
    heading?: TextStyle;
    body?: TextStyle;
  };
  fieldStyles?: Record<string, TextStyle>;
  blockGroupStyles?: Record<string, TextStyle>;
  header?: HeaderAppearance;
};

export type StorefrontTheme = {
  backgroundColor?: string;
  fontFamily?: string;
  typography?: {
    heading?: TextStyle;
    body?: TextStyle;
  };
};

export type ResolvedSectionAppearance = {
  backgroundColor: string;
  fontId: string;
  fontFamily: string;
};

export const SYSTEM_APPEARANCE_DEFAULTS = {
  backgroundColor: "#ffffff",
};

export const SECTION_TYPE_APPEARANCE_DEFAULTS: Record<string, SectionAppearance> = {
  marquee_text: { backgroundColor: "#fbfaf7" },
  coupon_strips: { backgroundColor: "#ffffff" },
  messageStyleTestimonials: { backgroundColor: "#f5f5f7" },
  "benefits-points": { backgroundColor: "#ffffff" },
  footer: { backgroundColor: "#0b1f2a" },
};

function pickNonEmpty(...values: unknown[]): string {
  for (const value of values) {
    const next = String(value ?? "").trim();
    if (next) return next;
  }
  return "";
}

export function normalizeAppearance(raw?: SectionAppearance | null): SectionAppearance {
  const header = normalizeHeaderAppearance(raw?.header);
  const next: SectionAppearance = {
    backgroundColor: pickNonEmpty(raw?.backgroundColor),
    typography: normalizeSectionTypography(raw?.typography),
    fieldStyles: normalizeFieldStyles(raw?.fieldStyles),
    blockGroupStyles: normalizeBlockGroupStyles(raw?.blockGroupStyles),
  };
  if (Object.keys(header).length > 0) {
    next.header = header;
  }
  return next;
}

export function normalizeTheme(raw?: StorefrontTheme | null): StorefrontTheme {
  return {
    backgroundColor:
      pickNonEmpty(raw?.backgroundColor) || SYSTEM_APPEARANCE_DEFAULTS.backgroundColor,
    fontFamily: pickNonEmpty(raw?.fontFamily),
    typography: normalizeThemeTypography(raw?.typography),
  };
}

export function resolveSectionAppearance(
  section: {
    type?: string;
    settings?: { props?: { appearance?: SectionAppearance } };
  },
  theme?: StorefrontTheme | null
): ResolvedSectionAppearance {
  const override = normalizeAppearance(section?.settings?.props?.appearance);
  const normalizedTheme = normalizeTheme(theme);
  const typeDefaults =
    SECTION_TYPE_APPEARANCE_DEFAULTS[String(section?.type ?? "").trim()] ?? {};

  const backgroundColor =
    pickNonEmpty(
      override.backgroundColor,
      normalizedTheme.backgroundColor,
      typeDefaults.backgroundColor,
      SYSTEM_APPEARANCE_DEFAULTS.backgroundColor
    ) || SYSTEM_APPEARANCE_DEFAULTS.backgroundColor;

  const headingFontId = pickNonEmpty(
    override.typography?.heading?.fontFamily,
    normalizedTheme.typography?.heading?.fontFamily,
    normalizedTheme.fontFamily,
    DEFAULT_STOREFRONT_FONT_ID
  );

  return {
    backgroundColor,
    fontId: headingFontId,
    fontFamily: resolveStorefrontFontFamily(headingFontId),
  };
}

export function sectionAppearanceStyle(appearance?: ResolvedSectionAppearance | null) {
  if (!appearance) return undefined;
  return {
    backgroundColor: appearance.backgroundColor,
  };
}
