import {
  DEFAULT_STOREFRONT_FONT_ID,
  resolveStorefrontFontFamily,
} from "./fonts/fontRegistry";

export type TypographyRole = "heading" | "body";

export type TextStyle = {
  fontFamily?: string;
  color?: string;
  colorLight?: string;
  colorOverImage?: string;
  backgroundColor?: string;
  fontWeight?: string;
  fontSize?: string;
};

export type ResolvedTextStyle = {
  fontFamily: string;
  color: string;
  fontWeight: string;
  fontSize: string;
};

export type StorefrontThemeTypography = {
  heading?: TextStyle;
  body?: TextStyle;
};

export const DEFAULT_TYPOGRAPHY: Record<TypographyRole, TextStyle> = {
  heading: {
    fontFamily: DEFAULT_STOREFRONT_FONT_ID,
    color: "#111111",
    fontWeight: "700",
    fontSize: "48px",
  },
  body: {
    fontFamily: DEFAULT_STOREFRONT_FONT_ID,
    color: "#444444",
    fontWeight: "400",
    fontSize: "18px",
  },
};

export function pickNonEmpty(...values: unknown[]): string {
  for (const value of values) {
    const next = String(value ?? "").trim();
    if (next) return next;
  }
  return "";
}

export function normalizeTextStyle(raw?: TextStyle | null): TextStyle {
  return {
    fontFamily: pickNonEmpty(raw?.fontFamily),
    color: pickNonEmpty(raw?.color),
    colorLight: pickNonEmpty(raw?.colorLight),
    colorOverImage: pickNonEmpty(raw?.colorOverImage),
    backgroundColor: pickNonEmpty(raw?.backgroundColor),
    fontWeight: pickNonEmpty(raw?.fontWeight),
    fontSize: pickNonEmpty(raw?.fontSize),
  };
}

export function normalizeTypographyRole(raw?: TextStyle | null): TextStyle {
  return normalizeTextStyle(raw);
}

export function normalizeTypography(raw?: StorefrontThemeTypography | null) {
  return {
    heading: normalizeTypographyRole(raw?.heading),
    body: normalizeTypographyRole(raw?.body),
  };
}

export function normalizeSectionTypographyRole(raw?: TextStyle | null): TextStyle {
  return {
    color: pickNonEmpty(raw?.color),
  };
}

export function normalizeSectionTypography(raw?: StorefrontThemeTypography | null) {
  return {
    heading: normalizeSectionTypographyRole(raw?.heading),
    body: normalizeSectionTypographyRole(raw?.body),
  };
}

export function normalizeThemeTypographyRole(raw?: TextStyle | null): TextStyle {
  return {
    fontFamily: pickNonEmpty(raw?.fontFamily),
    color: pickNonEmpty(raw?.color),
  };
}

export function normalizeThemeTypography(raw?: StorefrontThemeTypography | null) {
  return {
    heading: normalizeThemeTypographyRole(raw?.heading),
    body: normalizeThemeTypographyRole(raw?.body),
  };
}

export function stripFieldOverrideStyle(style?: TextStyle | null): TextStyle {
  const normalized = normalizeTextStyle(style);
  const next: TextStyle = {};
  if (normalized.color) next.color = normalized.color;
  if (normalized.colorLight) next.colorLight = normalized.colorLight;
  if (normalized.colorOverImage) next.colorOverImage = normalized.colorOverImage;
  if (normalized.backgroundColor) next.backgroundColor = normalized.backgroundColor;
  if (normalized.fontWeight) next.fontWeight = normalized.fontWeight;
  return next;
}

export function normalizeFieldStyles(
  raw?: Record<string, TextStyle | undefined> | null
): Record<string, TextStyle> {
  if (!raw || typeof raw !== "object") return {};
  const next: Record<string, TextStyle> = {};
  Object.entries(raw).forEach(([fieldId, style]) => {
    const normalized = stripFieldOverrideStyle(style);
    if (Object.keys(normalized).length > 0) {
      next[fieldId] = normalized;
    }
  });
  return next;
}

export function normalizeBlockGroupStyles(
  raw?: Record<string, TextStyle | undefined> | null
): Record<string, TextStyle> {
  return normalizeFieldStyles(raw);
}

export function resolveThemeFontKey(
  role: TypographyRole | string = "body",
  theme?: {
    fontFamily?: string;
    typography?: Partial<Record<TypographyRole, TextStyle>>;
  } | null
): string {
  const headingFont = pickNonEmpty(theme?.typography?.heading?.fontFamily);
  const bodyFont = pickNonEmpty(theme?.typography?.body?.fontFamily);
  const legacyFont = pickNonEmpty(theme?.fontFamily);

  if (role === "heading") {
    return (
      pickNonEmpty(
        headingFont,
        bodyFont,
        legacyFont,
        DEFAULT_TYPOGRAPHY.heading.fontFamily,
        DEFAULT_STOREFRONT_FONT_ID
      ) || DEFAULT_STOREFRONT_FONT_ID
    );
  }

  return (
    pickNonEmpty(
      bodyFont,
      headingFont,
      legacyFont,
      DEFAULT_TYPOGRAPHY.body.fontFamily,
      DEFAULT_STOREFRONT_FONT_ID
    ) || DEFAULT_STOREFRONT_FONT_ID
  );
}

export type ResolveTextStyleInput = {
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

export function resolveTextStyle({
  section,
  theme,
  fieldId,
  role = "body",
  defaultStyle,
}: ResolveTextStyleInput): ResolvedTextStyle {
  const typographyRole: TypographyRole = role === "heading" ? "heading" : "body";
  const appearance = section?.settings?.props?.appearance ?? {};

  const fieldStyle =
    fieldId && appearance.fieldStyles?.[fieldId]
      ? stripFieldOverrideStyle(appearance.fieldStyles[fieldId])
      : {};
  const sectionRoleStyle = normalizeSectionTypographyRole(
    appearance.typography?.[typographyRole]
  );
  const themeRoleStyle = normalizeThemeTypographyRole(theme?.typography?.[typographyRole]);
  const schemaDefault = normalizeTextStyle(defaultStyle);
  const systemDefault = DEFAULT_TYPOGRAPHY[typographyRole] ?? DEFAULT_TYPOGRAPHY.body;

  const fontKey = resolveThemeFontKey(typographyRole, theme);

  return {
    fontFamily: resolveStorefrontFontFamily(fontKey),
    color: pickNonEmpty(
      fieldStyle.color,
      sectionRoleStyle.color,
      themeRoleStyle.color,
      schemaDefault.color,
      systemDefault.color
    ),
    fontWeight: pickNonEmpty(
      fieldStyle.fontWeight,
      schemaDefault.fontWeight,
      systemDefault.fontWeight
    ),
    fontSize: pickNonEmpty(
      fieldStyle.fontSize,
      schemaDefault.fontSize,
      systemDefault.fontSize
    ),
  };
}

export type ResolveBlockGroupTextStyleInput = {
  section?: ResolveTextStyleInput["section"];
  theme?: ResolveTextStyleInput["theme"];
  groupKey?: string;
  role?: TypographyRole | string;
  defaultStyle?: TextStyle | null;
};

export function resolveBlockGroupTextStyle({
  section,
  theme,
  groupKey,
  role = "body",
  defaultStyle,
}: ResolveBlockGroupTextStyleInput): ResolvedTextStyle {
  const typographyRole: TypographyRole = role === "heading" ? "heading" : "body";
  const appearance = section?.settings?.props?.appearance ?? {};

  const groupStyle =
    groupKey && appearance.blockGroupStyles?.[groupKey]
      ? stripFieldOverrideStyle(appearance.blockGroupStyles[groupKey])
      : {};
  const sectionRoleStyle = normalizeSectionTypographyRole(
    appearance.typography?.[typographyRole]
  );
  const themeRoleStyle = normalizeThemeTypographyRole(theme?.typography?.[typographyRole]);
  const schemaDefault = normalizeTextStyle(defaultStyle);
  const systemDefault = DEFAULT_TYPOGRAPHY[typographyRole] ?? DEFAULT_TYPOGRAPHY.body;

  const fontKey = resolveThemeFontKey(typographyRole, theme);

  return {
    fontFamily: resolveStorefrontFontFamily(fontKey),
    color: pickNonEmpty(
      groupStyle.color,
      sectionRoleStyle.color,
      themeRoleStyle.color,
      schemaDefault.color,
      systemDefault.color
    ),
    fontWeight: pickNonEmpty(
      groupStyle.fontWeight,
      schemaDefault.fontWeight,
      systemDefault.fontWeight
    ),
    fontSize: pickNonEmpty(schemaDefault.fontSize, systemDefault.fontSize),
  };
}

export function resolvedTextStyleToInlineStyle(style: ResolvedTextStyle) {
  return {
    fontFamily: style.fontFamily,
    color: style.color,
    fontWeight: style.fontWeight,
    fontSize: style.fontSize,
  };
}

export function resolveBlockGroupSurfaceStyle({
  section,
  groupKey,
  defaultStyle,
}: {
  section?: ResolveBlockGroupTextStyleInput["section"];
  groupKey?: string;
  defaultStyle?: TextStyle | null;
}) {
  const appearance = section?.settings?.props?.appearance ?? {};
  const groupStyle =
    groupKey && appearance.blockGroupStyles?.[groupKey]
      ? stripFieldOverrideStyle(appearance.blockGroupStyles[groupKey])
      : {};
  const schemaDefault = normalizeTextStyle(defaultStyle);
  return {
    backgroundColor: pickNonEmpty(groupStyle.backgroundColor, schemaDefault.backgroundColor),
    color: pickNonEmpty(groupStyle.color, schemaDefault.color),
  };
}

const DEFAULT_SCROLL_REVEAL_COLOR_OVER_IMAGE = "rgba(255, 255, 255, 0.96)";

export type ResolveScrollRevealColorsInput = {
  section?: ResolveTextStyleInput["section"];
  theme?: ResolveTextStyleInput["theme"];
  fieldId?: string;
  groupKey?: string;
  role?: TypographyRole | string;
  defaultStyle?: TextStyle | null;
};

export function resolveScrollRevealColors({
  section,
  theme,
  fieldId,
  groupKey,
  role = "heading",
  defaultStyle,
}: ResolveScrollRevealColorsInput) {
  const appearance = section?.settings?.props?.appearance ?? {};
  const rawOverride =
    groupKey && appearance.blockGroupStyles?.[groupKey]
      ? appearance.blockGroupStyles[groupKey]
      : fieldId && appearance.fieldStyles?.[fieldId]
        ? appearance.fieldStyles[fieldId]
        : {};
  const override = stripFieldOverrideStyle(rawOverride);

  const resolved = groupKey
    ? resolveBlockGroupTextStyle({ section, theme, groupKey, role, defaultStyle })
    : resolveTextStyle({ section, theme, fieldId, role, defaultStyle });

  return {
    colorLight: pickNonEmpty(override.colorLight, override.color, resolved.color),
    colorOverImage: pickNonEmpty(
      override.colorOverImage,
      DEFAULT_SCROLL_REVEAL_COLOR_OVER_IMAGE
    ),
  };
}

export function collectThemeFontIds(theme?: ResolveTextStyleInput["theme"]) {
  const ids = new Set<string>();
  const heading = pickNonEmpty(theme?.typography?.heading?.fontFamily);
  const body = pickNonEmpty(theme?.typography?.body?.fontFamily);
  const legacy = pickNonEmpty(theme?.fontFamily);
  if (heading) ids.add(heading);
  if (body) ids.add(body);
  if (legacy) ids.add(legacy);
  if (ids.size === 0) ids.add(DEFAULT_STOREFRONT_FONT_ID);
  return Array.from(ids);
}
