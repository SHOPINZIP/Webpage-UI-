"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  BENEFITS_DESCRIPTION_DEFAULT: () => BENEFITS_DESCRIPTION_DEFAULT,
  BENEFITS_EYEBROW_DEFAULT: () => BENEFITS_EYEBROW_DEFAULT,
  BENEFITS_HEADING_DEFAULT: () => BENEFITS_HEADING_DEFAULT,
  BENEFIT_DESCRIPTION_DEFAULT: () => BENEFIT_DESCRIPTION_DEFAULT,
  BENEFIT_POINT_DEFAULT: () => BENEFIT_POINT_DEFAULT,
  BENEFIT_TITLE_DEFAULT: () => BENEFIT_TITLE_DEFAULT,
  COUPON_CODE_DEFAULT: () => COUPON_CODE_DEFAULT,
  COUPON_HEADING_DEFAULT: () => COUPON_HEADING_DEFAULT,
  COUPON_SUBHEADING_DEFAULT: () => COUPON_SUBHEADING_DEFAULT,
  COUPON_TITLE_DEFAULT: () => COUPON_TITLE_DEFAULT,
  CouponTickerMinimal: () => CouponTickerMinimal,
  CreativeCategoryMarquee: () => CreativeCategoryMarquee,
  DEFAULT_STOREFRONT_FONT_ID: () => DEFAULT_STOREFRONT_FONT_ID,
  DEFAULT_TYPOGRAPHY: () => DEFAULT_TYPOGRAPHY,
  DualLineFeatureMarquee: () => DualLineFeatureMarquee,
  FOOTER_COLUMN_HEADING_DEFAULT: () => FOOTER_COLUMN_HEADING_DEFAULT,
  FOOTER_MERCHANT_NAME_DEFAULT: () => FOOTER_MERCHANT_NAME_DEFAULT,
  FOOTER_MERCHANT_SUB_LABEL_DEFAULT: () => FOOTER_MERCHANT_SUB_LABEL_DEFAULT,
  FOOTER_POLICY_LINK_TEXT_DEFAULT: () => FOOTER_POLICY_LINK_TEXT_DEFAULT,
  FOOTER_TAGLINE_DEFAULT: () => FOOTER_TAGLINE_DEFAULT,
  FeatureMarqueeBlock: () => FeatureMarqueeBlock,
  FloatingSnackGalleryHero: () => FloatingSnackGalleryHero,
  FullImageTypingHero: () => FullImageTypingHero,
  HEADER_BRAND_NAME_DEFAULT: () => HEADER_BRAND_NAME_DEFAULT,
  HEADER_BRAND_SUBTITLE_DEFAULT: () => HEADER_BRAND_SUBTITLE_DEFAULT,
  HEADER_NAV_LINK_TEXT_DEFAULT: () => HEADER_NAV_LINK_TEXT_DEFAULT,
  HEADER_NAV_LINK_TEXT_LIGHT_DEFAULT: () => HEADER_NAV_LINK_TEXT_LIGHT_DEFAULT,
  HERO_SECTION_LABEL_DEFAULT: () => HERO_SECTION_LABEL_DEFAULT,
  HERO_SLIDE_DESCRIPTION_DEFAULT: () => HERO_SLIDE_DESCRIPTION_DEFAULT,
  HERO_SLIDE_HEADLINE_DEFAULT: () => HERO_SLIDE_HEADLINE_DEFAULT,
  HeroScrollableSlide: () => HeroScrollableSlide,
  HeroSlider: () => HeroSlider,
  LiquidFocusCategories: () => LiquidFocusCategories,
  LogoFocusedHeader: () => LogoFocusedHeader,
  MARQUEE_BOTTOM_ROW_DEFAULT: () => MARQUEE_BOTTOM_ROW_DEFAULT,
  MARQUEE_TEXT_LARGE_DEFAULT: () => MARQUEE_TEXT_LARGE_DEFAULT,
  MARQUEE_TEXT_SMALL_DEFAULT: () => MARQUEE_TEXT_SMALL_DEFAULT,
  MARQUEE_TOP_ROW_DEFAULT: () => MARQUEE_TOP_ROW_DEFAULT,
  MerchantFooterReveal: () => MerchantFooterReveal,
  MessageStyleTestimonials: () => MessageStyleTestimonials,
  MinimalTimelineBenefits: () => MinimalTimelineBenefits,
  NSPSignatureHeroMarquee: () => NSPSignatureHeroMarquee,
  NSP_FLOATING_SNACK_TITLE_DEFAULT: () => NSP_FLOATING_SNACK_TITLE_DEFAULT,
  NSP_MARQUEE_CARD_SUBTITLE_DEFAULT: () => NSP_MARQUEE_CARD_SUBTITLE_DEFAULT,
  NSP_MARQUEE_CARD_TITLE_DEFAULT: () => NSP_MARQUEE_CARD_TITLE_DEFAULT,
  NSP_MARQUEE_EYEBROW_DEFAULT: () => NSP_MARQUEE_EYEBROW_DEFAULT,
  NSP_MARQUEE_HEADING_DEFAULT: () => NSP_MARQUEE_HEADING_DEFAULT,
  NSP_MARQUEE_HERO_BADGE_TEXT_DEFAULT: () => NSP_MARQUEE_HERO_BADGE_TEXT_DEFAULT,
  NSP_MARQUEE_SUBHEADING_DEFAULT: () => NSP_MARQUEE_SUBHEADING_DEFAULT,
  NSP_POKER_DESCRIPTION_DEFAULT: () => NSP_POKER_DESCRIPTION_DEFAULT,
  NSP_POKER_EYEBROW_DEFAULT: () => NSP_POKER_EYEBROW_DEFAULT,
  NSP_POKER_HEADING_DEFAULT: () => NSP_POKER_HEADING_DEFAULT,
  NSP_SIG_HERO_DESCRIPTION_DEFAULT: () => NSP_SIG_HERO_DESCRIPTION_DEFAULT,
  NSP_SIG_HERO_EYEBROW_DEFAULT: () => NSP_SIG_HERO_EYEBROW_DEFAULT,
  NSP_SIG_HERO_HEADING_DEFAULT: () => NSP_SIG_HERO_HEADING_DEFAULT,
  NSP_SIG_HERO_PRIMARY_BUTTON_TEXT_DEFAULT: () => NSP_SIG_HERO_PRIMARY_BUTTON_TEXT_DEFAULT,
  NSP_SIG_HERO_SECONDARY_BUTTON_TEXT_DEFAULT: () => NSP_SIG_HERO_SECONDARY_BUTTON_TEXT_DEFAULT,
  NSP_TYPING_DESCRIPTION_DEFAULT: () => NSP_TYPING_DESCRIPTION_DEFAULT,
  NSP_TYPING_PRIMARY_BUTTON_TEXT_DEFAULT: () => NSP_TYPING_PRIMARY_BUTTON_TEXT_DEFAULT,
  NSP_TYPING_SECONDARY_BUTTON_TEXT_DEFAULT: () => NSP_TYPING_SECONDARY_BUTTON_TEXT_DEFAULT,
  NSP_TYPING_STATIC_HEADING_DEFAULT: () => NSP_TYPING_STATIC_HEADING_DEFAULT,
  NSP_TYPING_WORD_DEFAULT: () => NSP_TYPING_WORD_DEFAULT,
  PRODUCT_CARD_DESCRIPTION_DEFAULT: () => PRODUCT_CARD_DESCRIPTION_DEFAULT,
  PRODUCT_CARD_SUBTITLE_DEFAULT: () => PRODUCT_CARD_SUBTITLE_DEFAULT,
  PRODUCT_CARD_TITLE_DEFAULT: () => PRODUCT_CARD_TITLE_DEFAULT,
  PRODUCT_CARD_TITLE_OVERLAY_DEFAULT: () => PRODUCT_CARD_TITLE_OVERLAY_DEFAULT,
  PRODUCT_MARQUEE_DESCRIPTION_DEFAULT: () => PRODUCT_MARQUEE_DESCRIPTION_DEFAULT,
  PRODUCT_MARQUEE_EYEBROW_DEFAULT: () => PRODUCT_MARQUEE_EYEBROW_DEFAULT,
  PRODUCT_MARQUEE_HEADING_DEFAULT: () => PRODUCT_MARQUEE_HEADING_DEFAULT,
  PokerRowRevealHero: () => PokerRowRevealHero,
  PortraitTestimonials: () => PortraitTestimonials,
  ProductCardMarquee: () => ProductCardMarquee,
  ProductMarquee: () => ProductMarquee,
  SECTION_TYPE_APPEARANCE_DEFAULTS: () => SECTION_TYPE_APPEARANCE_DEFAULTS,
  STOREFRONT_FONTS: () => STOREFRONT_FONTS,
  STOREFRONT_FONT_OPTIONS: () => STOREFRONT_FONT_OPTIONS,
  STYLE_APPLE_MARQUEE: () => STYLE_APPLE_MARQUEE,
  STYLE_MESSAGE_BUBBLE: () => STYLE_MESSAGE_BUBBLE,
  STYLE_PORTRAIT_TESTIMONIALS: () => STYLE_PORTRAIT_TESTIMONIALS,
  STYLE_STACKED_TESTIMONIALS: () => STYLE_STACKED_TESTIMONIALS,
  ScrollParallaxSignatureHero: () => ScrollParallaxSignatureHero,
  StackedTestimonials: () => StackedTestimonials,
  StorefrontFontLoader: () => StorefrontFontLoader,
  SubHeroImageLoop: () => SubHeroImageLoop,
  TESTIMONIAL_BACKGROUND_WORD_DEFAULT: () => TESTIMONIAL_BACKGROUND_WORD_DEFAULT,
  TESTIMONIAL_BUTTON_TEXT_DEFAULT: () => TESTIMONIAL_BUTTON_TEXT_DEFAULT,
  TESTIMONIAL_CUSTOMER_NAME_DEFAULT: () => TESTIMONIAL_CUSTOMER_NAME_DEFAULT,
  TESTIMONIAL_CUSTOMER_ROLE_DEFAULT: () => TESTIMONIAL_CUSTOMER_ROLE_DEFAULT,
  TESTIMONIAL_DESCRIPTION_DEFAULT: () => TESTIMONIAL_DESCRIPTION_DEFAULT,
  TESTIMONIAL_EYEBROW_DEFAULT: () => TESTIMONIAL_EYEBROW_DEFAULT,
  TESTIMONIAL_HEADING_DEFAULT: () => TESTIMONIAL_HEADING_DEFAULT,
  TESTIMONIAL_HIGHLIGHT_TEXT_DEFAULT: () => TESTIMONIAL_HIGHLIGHT_TEXT_DEFAULT,
  TESTIMONIAL_QUOTE_TEXT_DEFAULT: () => TESTIMONIAL_QUOTE_TEXT_DEFAULT,
  TESTIMONIAL_SUBHEADING_DEFAULT: () => TESTIMONIAL_SUBHEADING_DEFAULT,
  TransparentHeroHeader: () => TransparentHeroHeader,
  collectStorefrontFontIdsFromDocument: () => collectStorefrontFontIdsFromDocument,
  collectThemeFontIds: () => collectThemeFontIds,
  getStorefrontFontById: () => getStorefrontFontById,
  normalizeAppearance: () => normalizeAppearance,
  normalizeBlockGroupStyles: () => normalizeBlockGroupStyles,
  normalizeFieldStyles: () => normalizeFieldStyles,
  normalizeImageUrl: () => normalizeImageUrl,
  normalizeSectionTypography: () => normalizeSectionTypography,
  normalizeSectionTypographyRole: () => normalizeSectionTypographyRole,
  normalizeTextStyle: () => normalizeTextStyle,
  normalizeTheme: () => normalizeTheme,
  normalizeThemeTypography: () => normalizeThemeTypography,
  normalizeTypography: () => normalizeTypography,
  resolveBlockGroupTextStyle: () => resolveBlockGroupTextStyle,
  resolveSectionAppearance: () => resolveSectionAppearance,
  resolveStorefrontFontFamily: () => resolveStorefrontFontFamily,
  resolveTextStyle: () => resolveTextStyle,
  resolveThemeFontKey: () => resolveThemeFontKey,
  resolvedTextStyleToInlineStyle: () => resolvedTextStyleToInlineStyle,
  sectionAppearanceStyle: () => sectionAppearanceStyle,
  stripFieldOverrideStyle: () => stripFieldOverrideStyle
});
module.exports = __toCommonJS(index_exports);

// src/components/HeroSection/HeroSlider/index.tsx
var import_react = __toESM(require("react"));

// src/components/HeroSection/heroSectionUtils.ts
function normalizeImageUrl(raw) {
  const s = String(raw != null ? raw : "").trim();
  if (!s) return "";
  if (/^data:/i.test(s)) return s;
  if (/^blob:/i.test(s)) return s;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("//")) return `https://${s}`;
  return `https://${s}`;
}
function resolveBlockImageUrl(raw) {
  var _a, _b, _c, _d;
  if (raw == null) return "";
  if (typeof raw === "string") return normalizeImageUrl(raw);
  if (typeof raw === "object") {
    const record = raw;
    return normalizeImageUrl(
      (_d = (_c = (_b = (_a = record.url) != null ? _a : record.src) != null ? _b : record.image) != null ? _c : record.href) != null ? _d : ""
    );
  }
  return normalizeImageUrl(raw);
}
function normalizePathname(pathname) {
  let p = pathname || "/";
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}
function normalizeNavLinkPath(href, baseOrigin) {
  const raw = String(href != null ? href : "").trim();
  if (!raw || raw.startsWith("#")) return null;
  const origin = baseOrigin != null ? baseOrigin : typeof window !== "undefined" ? window.location.origin : "http://localhost";
  try {
    const isAbsolute = /^https?:\/\//i.test(raw);
    const normalized = !isAbsolute && !raw.startsWith("/") ? `/${raw.replace(/^\.\//, "")}` : raw;
    const url = new URL(normalized, origin);
    if (typeof window !== "undefined" && url.origin !== window.location.origin) return null;
    return normalizePathname(url.pathname || "/");
  } catch {
    return null;
  }
}
function resolveHeaderNavActiveLabel(pathname, items) {
  var _a;
  if (!items.length) return null;
  let best = null;
  const pathNorm = normalizePathname(pathname);
  for (const item of items) {
    const p = normalizeNavLinkPath(String((_a = item.link) != null ? _a : ""));
    if (!p) continue;
    const matches = p === "/" ? pathNorm === "/" : pathNorm === p || pathNorm.startsWith(`${p}/`);
    if (matches && (!best || p.length > best.len)) {
      best = { label: item.label, len: p.length };
    }
  }
  return best ? best.label : null;
}
function subscribeToPathname(onPathname) {
  if (typeof window === "undefined") return () => {
  };
  const notify = () => {
    var _a;
    return onPathname((_a = window.location.pathname) != null ? _a : "");
  };
  notify();
  window.addEventListener("popstate", notify);
  const { pushState, replaceState } = history;
  const wrap = (original) => function(...args) {
    const result = original.apply(this, args);
    notify();
    return result;
  };
  history.pushState = wrap(pushState);
  history.replaceState = wrap(replaceState);
  return () => {
    window.removeEventListener("popstate", notify);
    history.pushState = pushState;
    history.replaceState = replaceState;
  };
}

// src/shared/fonts/fontRegistry.ts
var DEFAULT_STOREFRONT_FONT_ID = "inter";
var SYSTEM_FONT_FAMILY = 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
var STOREFRONT_FONTS = [
  {
    value: "system",
    label: "System Default",
    cssFamily: SYSTEM_FONT_FAMILY,
    source: "system"
  },
  {
    value: "inter",
    label: "Inter (Google)",
    cssFamily: '"Inter", system-ui, sans-serif',
    source: "google",
    googleFamily: "Inter:wght@400;500;600;700;800"
  },
  {
    value: "maharani",
    label: "Maharani",
    cssFamily: '"Maharani", serif',
    source: "local",
    files: ["Maharani-Regular.woff2", "Maharani-Regular.woff"]
  },
  {
    value: "bongita",
    label: "Bongita",
    cssFamily: '"Bongita", cursive',
    source: "local",
    files: ["Bongita.woff2", "Bongita.woff"]
  },
  {
    value: "girlkick",
    label: "Girlkick",
    cssFamily: '"Girlkick", cursive',
    source: "local",
    files: ["Girlkick.woff2", "Girlkick.woff"]
  },
  {
    value: "glamoure-everyday",
    label: "Glamoure Everyday",
    cssFamily: '"Glamoure Everyday", cursive',
    source: "local",
    files: ["GlamoureEveryday.woff2", "GlamoureEveryday.woff"]
  },
  {
    value: "kirome",
    label: "Kirome",
    cssFamily: '"Kirome", sans-serif',
    source: "local",
    files: ["Kirome.woff"]
  },
  {
    value: "aesthetic",
    label: "Aesthetic",
    cssFamily: '"Aesthetic", cursive',
    source: "local",
    files: ["Aesthetic.woff2", "Aesthetic.woff"]
  },
  {
    value: "royal",
    label: "Royal",
    cssFamily: '"Royal", serif',
    source: "local",
    files: ["Royal.woff2", "Royal.woff"]
  },
  {
    value: "sabrine",
    label: "Sabrine",
    cssFamily: '"Sabrine", cursive',
    source: "local",
    files: ["Sabrine.woff2", "Sabrine.woff"]
  },
  {
    value: "fresh-mango",
    label: "Fresh Mango",
    cssFamily: '"Fresh Mango", cursive',
    source: "local",
    files: ["FreshMango.ttf"]
  },
  {
    value: "rounding",
    label: "Rounding",
    cssFamily: '"Rounding", sans-serif',
    source: "local",
    files: ["Rounding.ttf"]
  }
];
var STOREFRONT_FONT_OPTIONS = STOREFRONT_FONTS.map(({ value, label }) => ({
  value,
  label
}));
var fontById = Object.fromEntries(STOREFRONT_FONTS.map((f) => [f.value, f]));
function isDevelopment() {
  var _a, _b;
  const g = globalThis;
  return ((_b = (_a = g.process) == null ? void 0 : _a.env) == null ? void 0 : _b.NODE_ENV) !== "production";
}
function getStorefrontFontById(fontId) {
  var _a, _b;
  const id = String(fontId != null ? fontId : "").trim();
  if (id && !fontById[id] && isDevelopment()) {
    console.warn(`[storefrontFonts] Unknown font id "${id}". Falling back to default.`);
  }
  return (_b = (_a = fontById[id]) != null ? _a : fontById[DEFAULT_STOREFRONT_FONT_ID]) != null ? _b : STOREFRONT_FONTS[0];
}
function resolveStorefrontFontFamily(fontId) {
  return getStorefrontFontById(fontId).cssFamily;
}
function collectFontIdsFromTextStyle(style) {
  var _a;
  if (!style || typeof style !== "object") return [];
  const id = String((_a = style.fontFamily) != null ? _a : "").trim();
  return id ? [id] : [];
}
function collectFontIdsFromTypography(typography) {
  if (!typography || typeof typography !== "object") return [];
  return [
    ...collectFontIdsFromTextStyle(typography.heading),
    ...collectFontIdsFromTextStyle(typography.body)
  ];
}
function collectFontIdsFromStyleMap(styleMap) {
  if (!styleMap || typeof styleMap !== "object") return [];
  const ids = [];
  Object.values(styleMap).forEach((style) => {
    ids.push(...collectFontIdsFromTextStyle(style));
  });
  return ids;
}
function collectStorefrontFontIdsFromDocument(doc) {
  var _a;
  const ids = /* @__PURE__ */ new Set();
  const theme = doc == null ? void 0 : doc.theme;
  if (theme == null ? void 0 : theme.fontFamily) ids.add(String(theme.fontFamily).trim());
  collectFontIdsFromTypography(theme == null ? void 0 : theme.typography).forEach((id) => ids.add(id));
  ((_a = doc == null ? void 0 : doc.sections) != null ? _a : []).forEach((section) => {
    var _a2, _b;
    const appearance = (_b = (_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.props) == null ? void 0 : _b.appearance;
    if (!appearance) return;
    collectFontIdsFromTypography(appearance.typography).forEach((id) => ids.add(id));
    collectFontIdsFromStyleMap(appearance.fieldStyles).forEach((id) => ids.add(id));
    collectFontIdsFromStyleMap(appearance.blockGroupStyles).forEach((id) => ids.add(id));
  });
  ids.delete("");
  return Array.from(ids);
}
function buildGoogleFontLink(fontIds) {
  const families = /* @__PURE__ */ new Set();
  fontIds.forEach((id) => {
    const font = getStorefrontFontById(id);
    if (font.source === "google" && font.googleFamily) {
      families.add(font.googleFamily);
    }
  });
  if (families.size === 0) return null;
  const query = Array.from(families).map((family) => `family=${family.replace(/ /g, "+")}`).join("&");
  return `https://fonts.googleapis.com/css2?${query}&display=swap`;
}

// src/shared/sectionTypography.ts
var DEFAULT_TYPOGRAPHY = {
  heading: {
    fontFamily: DEFAULT_STOREFRONT_FONT_ID,
    color: "#111111",
    fontWeight: "700",
    fontSize: "48px"
  },
  body: {
    fontFamily: DEFAULT_STOREFRONT_FONT_ID,
    color: "#444444",
    fontWeight: "400",
    fontSize: "18px"
  }
};
function pickNonEmpty(...values) {
  for (const value of values) {
    const next = String(value != null ? value : "").trim();
    if (next) return next;
  }
  return "";
}
function normalizeTextStyle(raw) {
  return {
    fontFamily: pickNonEmpty(raw == null ? void 0 : raw.fontFamily),
    color: pickNonEmpty(raw == null ? void 0 : raw.color),
    fontWeight: pickNonEmpty(raw == null ? void 0 : raw.fontWeight),
    fontSize: pickNonEmpty(raw == null ? void 0 : raw.fontSize)
  };
}
function normalizeTypographyRole(raw) {
  return normalizeTextStyle(raw);
}
function normalizeTypography(raw) {
  return {
    heading: normalizeTypographyRole(raw == null ? void 0 : raw.heading),
    body: normalizeTypographyRole(raw == null ? void 0 : raw.body)
  };
}
function normalizeSectionTypographyRole(raw) {
  return {
    color: pickNonEmpty(raw == null ? void 0 : raw.color)
  };
}
function normalizeSectionTypography(raw) {
  return {
    heading: normalizeSectionTypographyRole(raw == null ? void 0 : raw.heading),
    body: normalizeSectionTypographyRole(raw == null ? void 0 : raw.body)
  };
}
function normalizeThemeTypographyRole(raw) {
  return {
    fontFamily: pickNonEmpty(raw == null ? void 0 : raw.fontFamily),
    color: pickNonEmpty(raw == null ? void 0 : raw.color)
  };
}
function normalizeThemeTypography(raw) {
  return {
    heading: normalizeThemeTypographyRole(raw == null ? void 0 : raw.heading),
    body: normalizeThemeTypographyRole(raw == null ? void 0 : raw.body)
  };
}
function stripFieldOverrideStyle(style) {
  const normalized = normalizeTextStyle(style);
  const next = {};
  if (normalized.color) next.color = normalized.color;
  if (normalized.fontWeight) next.fontWeight = normalized.fontWeight;
  return next;
}
function normalizeFieldStyles(raw) {
  if (!raw || typeof raw !== "object") return {};
  const next = {};
  Object.entries(raw).forEach(([fieldId, style]) => {
    const normalized = stripFieldOverrideStyle(style);
    if (Object.keys(normalized).length > 0) {
      next[fieldId] = normalized;
    }
  });
  return next;
}
function normalizeBlockGroupStyles(raw) {
  return normalizeFieldStyles(raw);
}
function resolveThemeFontKey(role = "body", theme) {
  var _a, _b, _c, _d;
  const headingFont = pickNonEmpty((_b = (_a = theme == null ? void 0 : theme.typography) == null ? void 0 : _a.heading) == null ? void 0 : _b.fontFamily);
  const bodyFont = pickNonEmpty((_d = (_c = theme == null ? void 0 : theme.typography) == null ? void 0 : _c.body) == null ? void 0 : _d.fontFamily);
  const legacyFont = pickNonEmpty(theme == null ? void 0 : theme.fontFamily);
  if (role === "heading") {
    return pickNonEmpty(
      headingFont,
      bodyFont,
      legacyFont,
      DEFAULT_TYPOGRAPHY.heading.fontFamily,
      DEFAULT_STOREFRONT_FONT_ID
    ) || DEFAULT_STOREFRONT_FONT_ID;
  }
  return pickNonEmpty(
    bodyFont,
    headingFont,
    legacyFont,
    DEFAULT_TYPOGRAPHY.body.fontFamily,
    DEFAULT_STOREFRONT_FONT_ID
  ) || DEFAULT_STOREFRONT_FONT_ID;
}
function resolveTextStyle({
  section,
  theme,
  fieldId,
  role = "body",
  defaultStyle
}) {
  var _a, _b, _c, _d, _e, _f, _g;
  const typographyRole = role === "heading" ? "heading" : "body";
  const appearance = (_c = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) == null ? void 0 : _b.appearance) != null ? _c : {};
  const fieldStyle = fieldId && ((_d = appearance.fieldStyles) == null ? void 0 : _d[fieldId]) ? stripFieldOverrideStyle(appearance.fieldStyles[fieldId]) : {};
  const sectionRoleStyle = normalizeSectionTypographyRole(
    (_e = appearance.typography) == null ? void 0 : _e[typographyRole]
  );
  const themeRoleStyle = normalizeThemeTypographyRole((_f = theme == null ? void 0 : theme.typography) == null ? void 0 : _f[typographyRole]);
  const schemaDefault = normalizeTextStyle(defaultStyle);
  const systemDefault = (_g = DEFAULT_TYPOGRAPHY[typographyRole]) != null ? _g : DEFAULT_TYPOGRAPHY.body;
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
    )
  };
}
function resolveBlockGroupTextStyle({
  section,
  theme,
  groupKey,
  role = "body",
  defaultStyle
}) {
  var _a, _b, _c, _d, _e, _f, _g;
  const typographyRole = role === "heading" ? "heading" : "body";
  const appearance = (_c = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) == null ? void 0 : _b.appearance) != null ? _c : {};
  const groupStyle = groupKey && ((_d = appearance.blockGroupStyles) == null ? void 0 : _d[groupKey]) ? stripFieldOverrideStyle(appearance.blockGroupStyles[groupKey]) : {};
  const sectionRoleStyle = normalizeSectionTypographyRole(
    (_e = appearance.typography) == null ? void 0 : _e[typographyRole]
  );
  const themeRoleStyle = normalizeThemeTypographyRole((_f = theme == null ? void 0 : theme.typography) == null ? void 0 : _f[typographyRole]);
  const schemaDefault = normalizeTextStyle(defaultStyle);
  const systemDefault = (_g = DEFAULT_TYPOGRAPHY[typographyRole]) != null ? _g : DEFAULT_TYPOGRAPHY.body;
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
    fontSize: pickNonEmpty(schemaDefault.fontSize, systemDefault.fontSize)
  };
}
function resolvedTextStyleToInlineStyle(style) {
  return {
    fontFamily: style.fontFamily,
    color: style.color,
    fontWeight: style.fontWeight,
    fontSize: style.fontSize
  };
}
function collectThemeFontIds(theme) {
  var _a, _b, _c, _d;
  const ids = /* @__PURE__ */ new Set();
  const heading = pickNonEmpty((_b = (_a = theme == null ? void 0 : theme.typography) == null ? void 0 : _a.heading) == null ? void 0 : _b.fontFamily);
  const body = pickNonEmpty((_d = (_c = theme == null ? void 0 : theme.typography) == null ? void 0 : _c.body) == null ? void 0 : _d.fontFamily);
  const legacy = pickNonEmpty(theme == null ? void 0 : theme.fontFamily);
  if (heading) ids.add(heading);
  if (body) ids.add(body);
  if (legacy) ids.add(legacy);
  if (ids.size === 0) ids.add(DEFAULT_STOREFRONT_FONT_ID);
  return Array.from(ids);
}

// src/shared/headerAppearance.ts
var HEADER_APPEARANCE_KEYS = [
  "navContainerBackground",
  "navTextColor",
  "navActiveBackground",
  "navActiveTextColor",
  "navBorderColor",
  "iconButtonBackground",
  "iconButtonColor",
  "iconButtonBorderColor",
  "cartBadgeBackground",
  "cartBadgeTextColor"
];
var HEADER_APPEARANCE_DEFAULTS = {
  navContainerBackground: "rgba(255, 255, 255, 0.9)",
  navTextColor: "rgba(0, 0, 0, 0.6)",
  navActiveBackground: "#0a0a0a",
  navActiveTextColor: "#ffffff",
  navBorderColor: "rgba(0, 0, 0, 0.06)",
  iconButtonBackground: "#ffffff",
  iconButtonColor: "#0a0a0a",
  iconButtonBorderColor: "rgba(0, 0, 0, 0.06)",
  cartBadgeBackground: "#0a0a0a",
  cartBadgeTextColor: "#ffffff"
};
function normalizeHeaderAppearance(raw) {
  if (!raw || typeof raw !== "object") return {};
  const next = {};
  HEADER_APPEARANCE_KEYS.forEach((key) => {
    const value = pickNonEmpty(raw[key]);
    if (value) next[key] = value;
  });
  return next;
}
function resolveHeaderAppearance({
  section,
  theme
}) {
  var _a, _b, _c, _d, _e, _f;
  const appearance = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) == null ? void 0 : _b.appearance;
  const header = normalizeHeaderAppearance(appearance == null ? void 0 : appearance.header);
  const sectionTypo = normalizeSectionTypography(appearance == null ? void 0 : appearance.typography);
  const themeTypo = normalizeThemeTypography(theme == null ? void 0 : theme.typography);
  const navTextColor = pickNonEmpty(
    header.navTextColor,
    (_c = sectionTypo.body) == null ? void 0 : _c.color,
    (_d = themeTypo.body) == null ? void 0 : _d.color,
    HEADER_APPEARANCE_DEFAULTS.navTextColor
  );
  const navActiveTextColor = pickNonEmpty(
    header.navActiveTextColor,
    header.navTextColor,
    HEADER_APPEARANCE_DEFAULTS.navActiveTextColor
  );
  const iconButtonColor = pickNonEmpty(
    header.iconButtonColor,
    (_e = sectionTypo.body) == null ? void 0 : _e.color,
    (_f = themeTypo.body) == null ? void 0 : _f.color,
    HEADER_APPEARANCE_DEFAULTS.iconButtonColor
  );
  return {
    navContainerBackground: pickNonEmpty(
      header.navContainerBackground,
      HEADER_APPEARANCE_DEFAULTS.navContainerBackground
    ),
    navTextColor,
    navActiveBackground: pickNonEmpty(
      header.navActiveBackground,
      HEADER_APPEARANCE_DEFAULTS.navActiveBackground
    ),
    navActiveTextColor,
    navBorderColor: pickNonEmpty(
      header.navBorderColor,
      HEADER_APPEARANCE_DEFAULTS.navBorderColor
    ),
    iconButtonBackground: pickNonEmpty(
      header.iconButtonBackground,
      HEADER_APPEARANCE_DEFAULTS.iconButtonBackground
    ),
    iconButtonColor,
    iconButtonBorderColor: pickNonEmpty(
      header.iconButtonBorderColor,
      HEADER_APPEARANCE_DEFAULTS.iconButtonBorderColor
    ),
    cartBadgeBackground: pickNonEmpty(
      header.cartBadgeBackground,
      HEADER_APPEARANCE_DEFAULTS.cartBadgeBackground
    ),
    cartBadgeTextColor: pickNonEmpty(
      header.cartBadgeTextColor,
      HEADER_APPEARANCE_DEFAULTS.cartBadgeTextColor
    )
  };
}
function logoFocusedHeaderAppearanceCssVars(resolved) {
  return {
    "--ak-lfh-nav-container-bg": resolved.navContainerBackground,
    "--ak-lfh-nav-border": resolved.navBorderColor,
    "--ak-lfh-nav-text": resolved.navTextColor,
    "--ak-lfh-nav-active-bg": resolved.navActiveBackground,
    "--ak-lfh-nav-active-text": resolved.navActiveTextColor,
    "--ak-lfh-icon-bg": resolved.iconButtonBackground,
    "--ak-lfh-icon-color": resolved.iconButtonColor,
    "--ak-lfh-icon-border": resolved.iconButtonBorderColor,
    "--ak-lfh-badge-bg": resolved.cartBadgeBackground,
    "--ak-lfh-badge-text": resolved.cartBadgeTextColor
  };
}
function transparentHeroHeaderAppearanceCssVars(resolved) {
  return {
    "--ak-thh-nav-container-bg": resolved.navContainerBackground,
    "--ak-thh-nav-border": resolved.navBorderColor,
    "--ak-thh-nav-text": resolved.navTextColor,
    "--ak-thh-nav-active-bg": resolved.navActiveBackground,
    "--ak-thh-nav-active-text": resolved.navActiveTextColor,
    "--ak-thh-icon-bg": resolved.iconButtonBackground,
    "--ak-thh-icon-color": resolved.iconButtonColor,
    "--ak-thh-icon-border": resolved.iconButtonBorderColor,
    "--ak-thh-badge-bg": resolved.cartBadgeBackground,
    "--ak-thh-badge-text": resolved.cartBadgeTextColor
  };
}
function headerChromeStyles(resolved) {
  return {
    navShell: {
      background: resolved.navContainerBackground,
      border: `1px solid ${resolved.navBorderColor}`
    },
    inactivePill: {
      color: resolved.navTextColor,
      background: "transparent"
    },
    activePill: {
      color: resolved.navActiveTextColor,
      background: resolved.navActiveBackground
    },
    iconButton: {
      background: resolved.iconButtonBackground,
      color: resolved.iconButtonColor,
      border: `1px solid ${resolved.iconButtonBorderColor}`
    },
    cartBadge: {
      background: resolved.cartBadgeBackground,
      color: resolved.cartBadgeTextColor
    }
  };
}
function hasHeaderAppearanceOverrides(section) {
  var _a, _b, _c;
  const header = normalizeHeaderAppearance(
    (_c = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) == null ? void 0 : _b.appearance) == null ? void 0 : _c.header
  );
  return Object.keys(header).length > 0;
}

// src/shared/sectionAppearance.ts
var SYSTEM_APPEARANCE_DEFAULTS = {
  backgroundColor: "#ffffff"
};
var SECTION_TYPE_APPEARANCE_DEFAULTS = {
  marquee_text: { backgroundColor: "#fbfaf7" },
  coupon_strips: { backgroundColor: "#ffffff" },
  messageStyleTestimonials: { backgroundColor: "#f5f5f7" },
  "benefits-points": { backgroundColor: "#ffffff" },
  footer: { backgroundColor: "#0b1f2a" }
};
function pickNonEmpty2(...values) {
  for (const value of values) {
    const next = String(value != null ? value : "").trim();
    if (next) return next;
  }
  return "";
}
function normalizeAppearance(raw) {
  const header = normalizeHeaderAppearance(raw == null ? void 0 : raw.header);
  const next = {
    backgroundColor: pickNonEmpty2(raw == null ? void 0 : raw.backgroundColor),
    typography: normalizeSectionTypography(raw == null ? void 0 : raw.typography),
    fieldStyles: normalizeFieldStyles(raw == null ? void 0 : raw.fieldStyles),
    blockGroupStyles: normalizeBlockGroupStyles(raw == null ? void 0 : raw.blockGroupStyles)
  };
  if (Object.keys(header).length > 0) {
    next.header = header;
  }
  return next;
}
function normalizeTheme(raw) {
  return {
    backgroundColor: pickNonEmpty2(raw == null ? void 0 : raw.backgroundColor) || SYSTEM_APPEARANCE_DEFAULTS.backgroundColor,
    fontFamily: pickNonEmpty2(raw == null ? void 0 : raw.fontFamily),
    typography: normalizeThemeTypography(raw == null ? void 0 : raw.typography)
  };
}
function resolveSectionAppearance(section, theme) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const override = normalizeAppearance((_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) == null ? void 0 : _b.appearance);
  const normalizedTheme = normalizeTheme(theme);
  const typeDefaults = (_d = SECTION_TYPE_APPEARANCE_DEFAULTS[String((_c = section == null ? void 0 : section.type) != null ? _c : "").trim()]) != null ? _d : {};
  const backgroundColor = pickNonEmpty2(
    override.backgroundColor,
    normalizedTheme.backgroundColor,
    typeDefaults.backgroundColor,
    SYSTEM_APPEARANCE_DEFAULTS.backgroundColor
  ) || SYSTEM_APPEARANCE_DEFAULTS.backgroundColor;
  const headingFontId = pickNonEmpty2(
    (_f = (_e = override.typography) == null ? void 0 : _e.heading) == null ? void 0 : _f.fontFamily,
    (_h = (_g = normalizedTheme.typography) == null ? void 0 : _g.heading) == null ? void 0 : _h.fontFamily,
    normalizedTheme.fontFamily,
    DEFAULT_STOREFRONT_FONT_ID
  );
  return {
    backgroundColor,
    fontId: headingFontId,
    fontFamily: resolveStorefrontFontFamily(headingFontId)
  };
}
function sectionAppearanceStyle(appearance) {
  if (!appearance) return void 0;
  return {
    backgroundColor: appearance.backgroundColor
  };
}

// src/shared/textStyleDefaults/heroTextStyleDefaults.ts
var HERO_SECTION_LABEL_DEFAULT = {
  color: "rgba(255, 255, 255, 0.9)",
  fontWeight: "600",
  fontSize: "12px"
};
var HERO_SLIDE_HEADLINE_DEFAULT = {
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "48px"
};
var HERO_SLIDE_DESCRIPTION_DEFAULT = {
  color: "rgba(255, 255, 255, 0.84)",
  fontWeight: "400",
  fontSize: "16px"
};

// src/components/HeroSection/HeroSlider/index.tsx
var HEIGHT_PRESETS = {
  default: "default",
  short: "short",
  tall: "tall"
};
var OVERLAY_PRESETS = {
  none: "none",
  light: "light",
  medium: "medium",
  heavy: "heavy"
};
function resolveSlideAlignment(override, sectionDefault) {
  if (!override || override === "inherit") return void 0;
  return override;
}
function sectionBlocksToSlides(blocks, sectionAlignment) {
  const slideBlocks = blocks.filter((b) => b.type === "slide");
  if (slideBlocks.length === 0) return [];
  const out = [];
  slideBlocks.forEach((b, i) => {
    var _a;
    const bp = b.props || {};
    const imageRaw = normalizeImageUrl(bp.image);
    if (!imageRaw) return;
    const imageMobileRaw = normalizeImageUrl(bp.imageMobile);
    const imageMobile = imageMobileRaw !== "" ? imageMobileRaw : void 0;
    out.push({
      id: (_a = b.id) != null ? _a : `slide-${i + 1}`,
      image: imageRaw,
      imageMobile,
      headline: bp.headline,
      subheadline: bp.description,
      buttonText: bp.buttonText,
      buttonHref: bp.buttonLink || "#",
      secondaryButtonText: bp.secondaryButtonText,
      secondaryButtonHref: bp.secondaryButtonLink || "#",
      contentAlignment: resolveSlideAlignment(
        bp.alignmentOverride,
        sectionAlignment
      )
    });
  });
  return out;
}
function preloadImage(src) {
  if (!src) return;
  const img = new Image();
  img.src = src;
}
function SlideImage({
  desktopSrc,
  mobileSrc
}) {
  const [desktop, setDesktop] = (0, import_react.useState)(desktopSrc);
  const [mobile, setMobile] = (0, import_react.useState)(mobileSrc || "");
  (0, import_react.useEffect)(() => {
    setDesktop(desktopSrc);
  }, [desktopSrc]);
  (0, import_react.useEffect)(() => {
    setMobile(mobileSrc || "");
  }, [mobileSrc]);
  if (!desktop) {
    return null;
  }
  if (mobile) {
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: desktop,
        alt: "",
        decoding: "async",
        draggable: false,
        onError: () => setDesktop(""),
        className: "ak-hero__img ak-hero__img--desktop"
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: mobile,
        alt: "",
        decoding: "async",
        draggable: false,
        onError: () => setMobile(""),
        className: "ak-hero__img ak-hero__img--mobile"
      }
    ));
  }
  return /* @__PURE__ */ import_react.default.createElement(
    "img",
    {
      src: desktop,
      alt: "",
      decoding: "async",
      draggable: false,
      onError: () => setDesktop(""),
      className: "ak-hero__img"
    }
  );
}
function HeroSlider({ section, appearance, theme }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const p = (_b = (_a = section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const blocks = (_d = (_c = section.settings) == null ? void 0 : _c.blocks) != null ? _d : [];
  const sectionLabelStyle = (0, import_react.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "sectionLabel",
        role: "body",
        defaultStyle: HERO_SECTION_LABEL_DEFAULT
      })
    ),
    [section, theme]
  );
  const slideHeadlineStyle = (0, import_react.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "slideHeadline",
        role: "heading",
        defaultStyle: HERO_SLIDE_HEADLINE_DEFAULT
      })
    ),
    [section, theme]
  );
  const slideDescriptionStyle = (0, import_react.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "slideDescription",
        role: "body",
        defaultStyle: HERO_SLIDE_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const sectionAlignment = (_e = p.alignment) != null ? _e : "left";
  const sectionLabel = p.sectionLabel;
  const heightPreset = (_f = p.height) != null ? _f : "default";
  const overlayPreset = (_g = p.overlay) != null ? _g : "medium";
  const autoPlayProp = p.autoPlay !== false;
  const directionProp = p.direction === "right" ? "right" : "left";
  const intervalSecondsProp = Math.max(1, Number(p.speed) || 4);
  const showArrows = p.showArrows !== false;
  const showDots = p.showDots !== false;
  const baseSlides = (0, import_react.useMemo)(() => {
    return sectionBlocksToSlides(blocks, sectionAlignment);
  }, [blocks, sectionAlignment]);
  const hasMultipleSlides = baseSlides.length > 1;
  const slides = (0, import_react.useMemo)(() => {
    if (!hasMultipleSlides) return baseSlides;
    return [
      { ...baseSlides[baseSlides.length - 1], id: `clone-start-${baseSlides[baseSlides.length - 1].id}` },
      ...baseSlides,
      { ...baseSlides[0], id: `clone-end-${baseSlides[0].id}` }
    ];
  }, [baseSlides, hasMultipleSlides]);
  const trackRef = (0, import_react.useRef)(null);
  const viewportRef = (0, import_react.useRef)(null);
  const autoplayRef = (0, import_react.useRef)(null);
  const resetRafRef = (0, import_react.useRef)(null);
  const [viewportWidth, setViewportWidth] = (0, import_react.useState)(0);
  const [index, setIndex] = (0, import_react.useState)(hasMultipleSlides ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = (0, import_react.useState)(true);
  const [isAnimating, setIsAnimating] = (0, import_react.useState)(false);
  const slideSignature = (0, import_react.useMemo)(
    () => baseSlides.map((s) => {
      var _a2;
      return `${s.id}:${s.image}:${(_a2 = s.imageMobile) != null ? _a2 : ""}`;
    }).join("|"),
    [baseSlides]
  );
  (0, import_react.useLayoutEffect)(() => {
    const el = viewportRef.current;
    if (!el) return;
    const updateWidth = () => {
      const width = el.offsetWidth || 0;
      setViewportWidth(width);
    };
    updateWidth();
    const observer = new ResizeObserver(() => {
      updateWidth();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  (0, import_react.useEffect)(() => {
    baseSlides.forEach((slide) => {
      preloadImage(slide.image);
      preloadImage(slide.imageMobile);
    });
  }, [baseSlides]);
  (0, import_react.useEffect)(() => {
    setIndex(hasMultipleSlides ? 1 : 0);
    setTransitionEnabled(true);
    setIsAnimating(false);
  }, [slideSignature, hasMultipleSlides]);
  const activeIndex = hasMultipleSlides ? ((index - 1) % baseSlides.length + baseSlides.length) % baseSlides.length : 0;
  const currentSlide = baseSlides[activeIndex] || baseSlides[0];
  const activeAlign = (_i = (_h = currentSlide == null ? void 0 : currentSlide.contentAlignment) != null ? _h : sectionAlignment) != null ? _i : "left";
  const heightKey = (_j = HEIGHT_PRESETS[String(heightPreset)]) != null ? _j : "default";
  const overlayKey = (_k = OVERLAY_PRESETS[String(overlayPreset)]) != null ? _k : "medium";
  const displayHeadline = currentSlide == null ? void 0 : currentSlide.headline;
  const displaySub = currentSlide == null ? void 0 : currentSlide.subheadline;
  const displayButton = currentSlide == null ? void 0 : currentSlide.buttonText;
  const primaryHref = (_l = currentSlide == null ? void 0 : currentSlide.buttonHref) != null ? _l : "#";
  const displayBadge = sectionLabel;
  const showSecondary = Boolean(
    (currentSlide == null ? void 0 : currentSlide.secondaryButtonText) && String(currentSlide.secondaryButtonText).trim()
  );
  const secondaryHref = (currentSlide == null ? void 0 : currentSlide.secondaryButtonHref) || "#";
  const clearAutoplay = (0, import_react.useCallback)(() => {
    if (autoplayRef.current) {
      window.clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);
  const goToIndex = (0, import_react.useCallback)(
    (nextIndex) => {
      if (!hasMultipleSlides) return;
      if (isAnimating) return;
      setTransitionEnabled(true);
      setIsAnimating(true);
      setIndex(nextIndex);
    },
    [hasMultipleSlides, isAnimating]
  );
  const goNext = (0, import_react.useCallback)(() => {
    goToIndex(index + 1);
  }, [goToIndex, index]);
  const goPrev = (0, import_react.useCallback)(() => {
    goToIndex(index - 1);
  }, [goToIndex, index]);
  (0, import_react.useEffect)(() => {
    clearAutoplay();
    if (!hasMultipleSlides) return;
    if (!autoPlayProp) return;
    if (isAnimating) return;
    autoplayRef.current = window.setTimeout(() => {
      if (directionProp === "left") {
        setTransitionEnabled(true);
        setIsAnimating(true);
        setIndex((prev) => prev + 1);
      } else {
        setTransitionEnabled(true);
        setIsAnimating(true);
        setIndex((prev) => prev - 1);
      }
    }, intervalSecondsProp * 1e3);
    return clearAutoplay;
  }, [
    index,
    hasMultipleSlides,
    autoPlayProp,
    directionProp,
    intervalSecondsProp,
    isAnimating,
    clearAutoplay
  ]);
  const jumpWithoutAnimation = (0, import_react.useCallback)((targetIndex) => {
    setTransitionEnabled(false);
    setIndex(targetIndex);
    if (resetRafRef.current) {
      cancelAnimationFrame(resetRafRef.current);
    }
    resetRafRef.current = requestAnimationFrame(() => {
      resetRafRef.current = requestAnimationFrame(() => {
        setTransitionEnabled(true);
        setIsAnimating(false);
      });
    });
  }, []);
  const handleTransitionEnd = (0, import_react.useCallback)(() => {
    if (!hasMultipleSlides) {
      setIsAnimating(false);
      return;
    }
    if (index === slides.length - 1) {
      jumpWithoutAnimation(1);
      return;
    }
    if (index === 0) {
      jumpWithoutAnimation(slides.length - 2);
      return;
    }
    setIsAnimating(false);
  }, [hasMultipleSlides, index, slides.length, jumpWithoutAnimation]);
  (0, import_react.useEffect)(() => {
    return () => {
      clearAutoplay();
      if (resetRafRef.current) {
        cancelAnimationFrame(resetRafRef.current);
      }
    };
  }, [clearAutoplay]);
  const trackTranslateX = viewportWidth > 0 ? -(index * viewportWidth) : 0;
  if (section.enabled === false) {
    return null;
  }
  if (baseSlides.length === 0) {
    return null;
  }
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero", style: sectionAppearanceStyle(appearance) }, /* @__PURE__ */ import_react.default.createElement("section", { className: "ak-hero__section" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__container" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__frame" }, /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      ref: viewportRef,
      className: `ak-hero__viewport ak-hero__viewport--${heightKey}`
    },
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        ref: trackRef,
        onTransitionEnd: handleTransitionEnd,
        className: "ak-hero__track",
        style: {
          width: viewportWidth > 0 ? `${slides.length * viewportWidth}px` : `${slides.length * 100}%`,
          transform: `translate3d(${trackTranslateX}px, 0, 0)`,
          transition: hasMultipleSlides && transitionEnabled ? "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          willChange: "transform"
        }
      },
      slides.map((slide, i) => {
        const href = slide.buttonHref || "#";
        return /* @__PURE__ */ import_react.default.createElement(
          "a",
          {
            key: `slot-${i}-${slide.id}`,
            href,
            className: "ak-hero__slide",
            style: {
              width: viewportWidth > 0 ? `${viewportWidth}px` : `${100 / slides.length}%`,
              flex: "0 0 auto"
            },
            "aria-label": "Hero slide"
          },
          /* @__PURE__ */ import_react.default.createElement(
            SlideImage,
            {
              desktopSrc: slide.image,
              mobileSrc: slide.imageMobile
            }
          ),
          /* @__PURE__ */ import_react.default.createElement(
            "div",
            {
              className: `ak-hero__overlay ak-hero__overlay--${overlayKey}`
            }
          ),
          /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__gradient ak-hero__gradient--r" }),
          /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__gradient ak-hero__gradient--t" })
        );
      })
    ),
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: `ak-hero__contentLayer ak-hero__contentLayer--${activeAlign}`
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__contentPadding" }, /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: `ak-hero__contentCard ak-hero__contentCard--${activeAlign}`
        },
        displayHeadline ? /* @__PURE__ */ import_react.default.createElement("h1", { className: "ak-hero__headline", style: slideHeadlineStyle }, displayHeadline) : null,
        displaySub ? /* @__PURE__ */ import_react.default.createElement("p", { className: "ak-hero__subhead", style: slideDescriptionStyle }, displaySub) : null,
        /* @__PURE__ */ import_react.default.createElement(
          "div",
          {
            className: `ak-hero__ctaRow ak-hero__ctaRow--${activeAlign}`
          },
          displayButton ? /* @__PURE__ */ import_react.default.createElement(
            "a",
            {
              href: primaryHref,
              className: "ak-hero__btn ak-hero__btn--primary"
            },
            displayButton
          ) : null,
          showSecondary && (currentSlide == null ? void 0 : currentSlide.secondaryButtonText) ? /* @__PURE__ */ import_react.default.createElement(
            "a",
            {
              href: secondaryHref,
              className: "ak-hero__btn ak-hero__btn--secondary"
            },
            currentSlide.secondaryButtonText
          ) : null
        )
      ))
    ),
    showArrows && hasMultipleSlides && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: goPrev,
        disabled: isAnimating,
        className: "ak-hero__arrow ak-hero__arrow--prev",
        "aria-label": "Previous slide",
        type: "button"
      },
      /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-arrow-left" })
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: goNext,
        disabled: isAnimating,
        className: "ak-hero__arrow ak-hero__arrow--next",
        "aria-label": "Next slide",
        type: "button"
      },
      /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-arrow-right" })
    )),
    /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__topbar" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__topbarInner" }, displayBadge ? /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__badge", style: sectionLabelStyle }, displayBadge) : null, /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__counter" }, "Slide ", String(activeIndex + 1).padStart(2, "0"), " /", " ", String(baseSlides.length).padStart(2, "0"))))
  ), showDots && baseSlides.length > 1 && /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__dotsBar" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__dots" }, baseSlides.map((slide, dotIndex) => /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      key: slide.id,
      type: "button",
      disabled: isAnimating,
      onClick: () => {
        if (isAnimating) return;
        setTransitionEnabled(true);
        setIsAnimating(true);
        setIndex(dotIndex + 1);
      },
      className: `ak-hero__dot ${activeIndex === dotIndex ? "is-active" : ""}`,
      "aria-label": `Go to slide ${dotIndex + 1}`
    }
  ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__dotsCounter" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "ak-hero__dotsCounterStrong" }, String(activeIndex + 1).padStart(2, "0")), /* @__PURE__ */ import_react.default.createElement("span", { className: "ak-hero__dotsCounterSep" }, "/"), /* @__PURE__ */ import_react.default.createElement("span", null, String(baseSlides.length).padStart(2, "0"))))))));
}

// src/components/HeroSection/HeroScrollableSlide/index.tsx
var import_react2 = __toESM(require("react"));
function sectionBlocksToScrollCards(blocks) {
  const slideBlocks = blocks.filter((b) => b.type === "slide");
  if (slideBlocks.length === 0) return [];
  const out = [];
  slideBlocks.forEach((b, i) => {
    var _a, _b, _c, _d, _e;
    const bp = b.props || {};
    const imageRaw = normalizeImageUrl(bp.image);
    if (!imageRaw) return;
    const imageMobileRaw = normalizeImageUrl(bp.imageMobile);
    const imageMobile = imageMobileRaw !== "" ? imageMobileRaw : void 0;
    out.push({
      id: (_a = b.id) != null ? _a : `card-${i + 1}`,
      eyebrow: String((_b = bp.eyebrow) != null ? _b : "").trim(),
      title: String((_c = bp.headline) != null ? _c : "").trim(),
      description: String((_d = bp.description) != null ? _d : "").trim(),
      button: String((_e = bp.buttonText) != null ? _e : "").trim(),
      buttonLink: bp.buttonLink || "#",
      secondaryButtonText: bp.secondaryButtonText,
      secondaryButtonLink: bp.secondaryButtonLink || "#",
      image: imageRaw,
      imageMobile
    });
  });
  return out;
}
function CardImage({
  desktopSrc,
  mobileSrc
}) {
  const desktop = desktopSrc.trim();
  const mobile = mobileSrc == null ? void 0 : mobileSrc.trim();
  if (!desktop) {
    return null;
  }
  if (mobile) {
    return /* @__PURE__ */ import_react2.default.createElement("picture", null, /* @__PURE__ */ import_react2.default.createElement("source", { media: "(max-width: 639px)", srcSet: mobile }), /* @__PURE__ */ import_react2.default.createElement(
      "img",
      {
        src: desktop,
        alt: "",
        decoding: "async",
        draggable: false,
        className: "ak-scroll-cards__img",
        onError: (e) => {
          e.currentTarget.removeAttribute("src");
        }
      }
    ));
  }
  return /* @__PURE__ */ import_react2.default.createElement(
    "img",
    {
      src: desktop,
      alt: "",
      decoding: "async",
      draggable: false,
      className: "ak-scroll-cards__img",
      onError: (e) => {
        e.currentTarget.removeAttribute("src");
      }
    }
  );
}
var CtaArrowIcon = () => /* @__PURE__ */ import_react2.default.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "ak-scroll-cards__ctaIcon",
    "aria-hidden": "true"
  },
  /* @__PURE__ */ import_react2.default.createElement("path", { d: "M7 7h10v10" }),
  /* @__PURE__ */ import_react2.default.createElement("path", { d: "M7 17 17 7" })
);
function HeroScrollableSlide({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c, _d;
  const p = (_b = (_a = section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const blocks = (_d = (_c = section.settings) == null ? void 0 : _c.blocks) != null ? _d : [];
  const slideHeadlineStyle = (0, import_react2.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "slideHeadline",
        role: "heading",
        defaultStyle: HERO_SLIDE_HEADLINE_DEFAULT
      })
    ),
    [section, theme]
  );
  const slideDescriptionStyle = (0, import_react2.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "slideDescription",
        role: "body",
        defaultStyle: HERO_SLIDE_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const cards = (0, import_react2.useMemo)(
    () => sectionBlocksToScrollCards(blocks),
    [blocks]
  );
  if (section.enabled === false) {
    return null;
  }
  if (cards.length === 0) {
    return null;
  }
  return /* @__PURE__ */ import_react2.default.createElement("section", { className: "ak-scroll-cards", style: sectionAppearanceStyle(appearance) }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__inner" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__stack" }, cards.map((card, index) => {
    var _a2;
    return /* @__PURE__ */ import_react2.default.createElement(
      "section",
      {
        key: String(card.id),
        className: "ak-scroll-cards__sticky",
        style: { zIndex: index + 1 }
      },
      /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__stickyCenter" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__frame" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__media" }, /* @__PURE__ */ import_react2.default.createElement(
        CardImage,
        {
          desktopSrc: card.image,
          mobileSrc: card.imageMobile
        }
      ), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__overlayTint" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__overlayGradient" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__overlayRadial" })), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__content" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__topRow" }, card.eyebrow ? /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__eyebrow" }, card.eyebrow) : null, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__index" }, String(index + 1).padStart(2, "0"), " /", " ", String(cards.length).padStart(2, "0"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__panel" }, card.title ? /* @__PURE__ */ import_react2.default.createElement("h2", { className: "ak-scroll-cards__title", style: slideHeadlineStyle }, card.title) : null, card.description ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "ak-scroll-cards__desc", style: slideDescriptionStyle }, card.description) : null, /* @__PURE__ */ import_react2.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center"
          }
        },
        card.button ? /* @__PURE__ */ import_react2.default.createElement(
          "a",
          {
            href: card.buttonLink || "#",
            className: "ak-scroll-cards__cta"
          },
          card.button,
          /* @__PURE__ */ import_react2.default.createElement(CtaArrowIcon, null)
        ) : null,
        ((_a2 = card.secondaryButtonText) == null ? void 0 : _a2.trim()) ? /* @__PURE__ */ import_react2.default.createElement(
          "a",
          {
            href: card.secondaryButtonLink || "#",
            style: {
              marginTop: 0,
              display: "inline-flex",
              alignItems: "center",
              borderRadius: 9999,
              padding: "12px 20px",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.85)",
              color: "#fff"
            }
          },
          card.secondaryButtonText
        ) : null
      )))))
    );
  }))));
}

// src/components/HeroSection/SubHeroImageLoop/index.tsx
var import_react3 = __toESM(require("react"));
var import_framer_motion = require("framer-motion");
var BLOCK_TYPE = "imageSlide";
function blocksToSlides(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return [];
  const out = [];
  blocks.forEach((b, i) => {
    var _a, _b;
    if (b.type && b.type !== BLOCK_TYPE) return;
    const p = b.props || {};
    const desktopRaw = normalizeImageUrl(p.desktopImage);
    if (!desktopRaw) return;
    const mobileRaw = normalizeImageUrl(p.mobileImage);
    const mobile = mobileRaw !== "" ? mobileRaw : void 0;
    out.push({
      id: (_a = b.id) != null ? _a : `img-slide-${i + 1}`,
      desktop: desktopRaw,
      mobile,
      alt: String((_b = p.alt) != null ? _b : "").trim()
    });
  });
  return out;
}
function SlidePicture({
  desktopSrc,
  mobileSrc,
  alt,
  className
}) {
  const desktop = desktopSrc.trim();
  const mobile = mobileSrc == null ? void 0 : mobileSrc.trim();
  if (!desktop) return null;
  if (mobile) {
    return /* @__PURE__ */ import_react3.default.createElement("picture", null, /* @__PURE__ */ import_react3.default.createElement("source", { media: "(max-width: 639px)", srcSet: mobile }), /* @__PURE__ */ import_react3.default.createElement(
      "img",
      {
        src: desktop,
        alt,
        decoding: "async",
        draggable: false,
        className,
        onError: (e) => {
          e.currentTarget.removeAttribute("src");
        }
      }
    ));
  }
  return /* @__PURE__ */ import_react3.default.createElement(
    "img",
    {
      src: desktop,
      alt,
      decoding: "async",
      draggable: false,
      className,
      onError: (e) => {
        e.currentTarget.removeAttribute("src");
      }
    }
  );
}
var fadeTransition = {
  opacity: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
  scale: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
  filter: { duration: 1.15, ease: [0.22, 1, 0.36, 1] }
};
var slideTransition = {
  duration: 1,
  ease: [0.4, 0, 0.2, 1]
};
var HEIGHT_KEYS = ["xs", "sm", "md", "lg", "xl", "full"];
function resolveHeightKey(raw) {
  const s = raw == null ? "" : String(raw);
  if (HEIGHT_KEYS.includes(s)) return s;
  if (s === "small") return "sm";
  if (s === "medium") return "md";
  if (s === "large") return "lg";
  if (s === "short") return "sm";
  if (s === "tall") return "lg";
  if (s === "default") return "md";
  return "md";
}
function SubHeroImageLoop({ section }) {
  var _a, _b, _c, _d, _e;
  const p = (_b = (_a = section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const blocks = (_d = (_c = section.settings) == null ? void 0 : _c.blocks) != null ? _d : [];
  const reduceMotion = (0, import_framer_motion.useReducedMotion)();
  const slides = (0, import_react3.useMemo)(() => blocksToSlides(blocks), [blocks]);
  const autoPlay = p.autoPlay !== false;
  const intervalMs = Math.max(
    1200,
    Number.parseInt(String((_e = p.interval) != null ? _e : "4200"), 10) || 4200
  );
  const heightKey = resolveHeightKey(p.heightOption);
  const effect = p.effect === "slide" ? "slide" : "fade";
  const [activeIndex, setActiveIndex] = (0, import_react3.useState)(0);
  const slideCount = slides.length;
  const canGo = slideCount > 1;
  const goNext = (0, import_react3.useCallback)(() => {
    if (!canGo) return;
    setActiveIndex((i) => (i + 1) % slideCount);
  }, [canGo, slideCount]);
  (0, import_react3.useEffect)(() => {
    if (!autoPlay || !canGo) return;
    const id = window.setInterval(goNext, intervalMs);
    return () => window.clearInterval(id);
  }, [autoPlay, canGo, goNext, intervalMs]);
  (0, import_react3.useEffect)(() => {
    if (activeIndex >= slideCount && slideCount > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, slideCount]);
  if (section.enabled === false) {
    return null;
  }
  if (slideCount === 0) {
    return null;
  }
  const active = slides[activeIndex];
  const altText = active.alt || `Sub hero slide ${activeIndex + 1}`;
  const rootClass = ["ak-sub-hero-loop", `ak-sub-hero-loop--h-${heightKey}`].join(" ");
  const viewportMod = effect === "slide" ? "ak-sub-hero-loop__viewport--slide-ui" : "ak-sub-hero-loop__viewport--fade-ui";
  const fadeMotionProps = reduceMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.15 }
  } : {
    initial: { opacity: 0, scale: 1.035, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.985, filter: "blur(8px)" },
    transition: fadeTransition
  };
  const slideMotionProps = reduceMotion ? {
    initial: { x: "0%" },
    animate: { x: "0%" },
    exit: { x: "0%" },
    transition: { duration: 0.15 }
  } : {
    initial: { x: "100%" },
    animate: { x: "0%" },
    exit: { x: "-100%" },
    transition: slideTransition
  };
  return /* @__PURE__ */ import_react3.default.createElement("section", { className: rootClass }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-sub-hero-loop__inner" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: `ak-sub-hero-loop__viewport ${viewportMod}` }, effect === "fade" ? /* @__PURE__ */ import_react3.default.createElement(import_framer_motion.AnimatePresence, null, /* @__PURE__ */ import_react3.default.createElement(
    import_framer_motion.motion.div,
    {
      key: activeIndex,
      className: "ak-sub-hero-loop__motionFill",
      ...fadeMotionProps
    },
    /* @__PURE__ */ import_react3.default.createElement(
      SlidePicture,
      {
        desktopSrc: active.desktop,
        mobileSrc: active.mobile,
        alt: altText,
        className: "ak-sub-hero-loop__img"
      }
    )
  )) : /* @__PURE__ */ import_react3.default.createElement(import_framer_motion.AnimatePresence, null, /* @__PURE__ */ import_react3.default.createElement(
    import_framer_motion.motion.div,
    {
      key: activeIndex,
      className: "ak-sub-hero-loop__motionFill",
      ...slideMotionProps
    },
    /* @__PURE__ */ import_react3.default.createElement(
      SlidePicture,
      {
        desktopSrc: active.desktop,
        mobileSrc: active.mobile,
        alt: altText,
        className: "ak-sub-hero-loop__img"
      }
    )
  )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-sub-hero-loop__tonal", "aria-hidden": "true" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-sub-hero-loop__tonalBase" }), /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-sub-hero-loop__tonalGradient" }), /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-sub-hero-loop__tonalRadial" }), /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-sub-hero-loop__tonalTop" }), /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-sub-hero-loop__tonalBottom" })), /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-sub-hero-loop__polish", "aria-hidden": "true" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-sub-hero-loop__polishWash" }), /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-sub-hero-loop__polishLeft" })), canGo ? /* @__PURE__ */ import_react3.default.createElement(
    "div",
    {
      className: "ak-sub-hero-loop__indicatorsBar",
      role: "tablist",
      "aria-label": "Hero slides"
    },
    slides.map((s, i) => {
      const isActive = i === activeIndex;
      return /* @__PURE__ */ import_react3.default.createElement(
        "button",
        {
          key: String(s.id),
          type: "button",
          role: "tab",
          "aria-label": `Go to slide ${i + 1}`,
          "aria-selected": isActive,
          className: "ak-sub-hero-loop__indicatorBtn",
          onClick: () => setActiveIndex(i)
        },
        /* @__PURE__ */ import_react3.default.createElement(
          "span",
          {
            className: isActive ? "ak-sub-hero-loop__indicatorDot ak-sub-hero-loop__indicatorDot--active" : "ak-sub-hero-loop__indicatorDot"
          }
        )
      );
    })
  ) : null)));
}

// src/components/LogoFocusedHeaderSection/LogoFocusedHeader.tsx
var import_react4 = __toESM(require("react"));

// src/shared/textStyleDefaults/headerTextStyleDefaults.ts
var HEADER_BRAND_NAME_DEFAULT = {
  color: "#0a0a0a",
  fontWeight: "600",
  fontSize: "16px"
};
var HEADER_BRAND_SUBTITLE_DEFAULT = {
  color: "rgba(0, 0, 0, 0.4)",
  fontWeight: "400",
  fontSize: "11px"
};
var HEADER_NAV_LINK_TEXT_DEFAULT = {
  color: "rgba(0, 0, 0, 0.6)",
  fontWeight: "500",
  fontSize: "13px"
};
var HEADER_NAV_LINK_TEXT_LIGHT_DEFAULT = {
  color: "rgba(255, 255, 255, 0.8)",
  fontWeight: "500",
  fontSize: "14px"
};

// src/components/LogoFocusedHeaderSection/LogoFocusedHeader.tsx
function safeText(v) {
  return String(v != null ? v : "").trim();
}
function handleClientNavClick(e, href, options) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }
  try {
    const navPath = normalizeNavLinkPath(href);
    if (!navPath) return;
    e.preventDefault();
    window.history.pushState({}, "", navPath);
    window.dispatchEvent(new PopStateEvent("popstate"));
    if (options == null ? void 0 : options.scrollToTop) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  } catch {
  }
}
function IconUser() {
  return /* @__PURE__ */ import_react4.default.createElement(
    "svg",
    {
      className: "ak-lfh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react4.default.createElement("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "12", cy: "7", r: "4" })
  );
}
function IconBag() {
  return /* @__PURE__ */ import_react4.default.createElement(
    "svg",
    {
      className: "ak-lfh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react4.default.createElement("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }),
    /* @__PURE__ */ import_react4.default.createElement("path", { d: "M3 6h18" }),
    /* @__PURE__ */ import_react4.default.createElement("path", { d: "M16 10a4 4 0 0 1-8 0" })
  );
}
function IconSearch() {
  return /* @__PURE__ */ import_react4.default.createElement(
    "svg",
    {
      className: "ak-lfh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ import_react4.default.createElement("path", { d: "m21 21-4.3-4.3" })
  );
}
function IconX() {
  return /* @__PURE__ */ import_react4.default.createElement(
    "svg",
    {
      className: "ak-lfh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react4.default.createElement("path", { d: "M18 6 6 18" }),
    /* @__PURE__ */ import_react4.default.createElement("path", { d: "M6 6l12 12" })
  );
}
function NavToggle({
  items,
  active,
  onSelect,
  linkFontStyle,
  navShellStyle,
  inactivePillStyle,
  activePillStyle
}) {
  if (items.length === 0) return null;
  return /* @__PURE__ */ import_react4.default.createElement(
    "div",
    {
      className: "ak-lfh__navToggle",
      role: "tablist",
      "aria-label": "Primary navigation",
      style: navShellStyle
    },
    items.map((item, idx) => {
      const isActive = active === item.label;
      const href = safeText(item.link);
      const pillStyle = {
        ...linkFontStyle,
        ...isActive ? activePillStyle : inactivePillStyle
      };
      return href ? /* @__PURE__ */ import_react4.default.createElement(
        "a",
        {
          key: `${item.label}-${idx}`,
          href,
          role: "tab",
          "aria-selected": isActive,
          className: isActive ? "ak-lfh__navPill ak-lfh__navPill--active" : "ak-lfh__navPill",
          style: pillStyle,
          onClick: (e) => {
            onSelect(item.label);
            handleClientNavClick(e, href);
          }
        },
        item.label
      ) : /* @__PURE__ */ import_react4.default.createElement(
        "button",
        {
          key: `${item.label}-${idx}`,
          type: "button",
          role: "tab",
          "aria-selected": isActive,
          className: isActive ? "ak-lfh__navPill ak-lfh__navPill--active" : "ak-lfh__navPill",
          style: pillStyle,
          onClick: () => onSelect(item.label)
        },
        item.label
      );
    })
  );
}
function LogoFocusedHeader({
  section,
  appearance,
  theme,
  cartCount,
  onSearchChnage,
  onProfileClick,
  onCartClick
}) {
  var _a, _b, _c;
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const rawBlocks = (_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks;
  const [pathname, setPathname] = (0, import_react4.useState)(() => {
    var _a2;
    try {
      return (_a2 = window.location.pathname) != null ? _a2 : "";
    } catch {
      return "";
    }
  });
  (0, import_react4.useEffect)(() => subscribeToPathname(setPathname), []);
  const navItems = (0, import_react4.useMemo)(() => {
    const blocks = Array.isArray(rawBlocks) ? rawBlocks : [];
    return blocks.slice(0, 2).map((b, i) => {
      var _a2, _b2;
      return {
        label: safeText((_a2 = b == null ? void 0 : b.props) == null ? void 0 : _a2.label) || (i === 0 ? "Home" : "Shop"),
        link: safeText((_b2 = b == null ? void 0 : b.props) == null ? void 0 : _b2.link)
      };
    });
  }, [rawBlocks]);
  const [activeLabel, setActiveLabel] = (0, import_react4.useState)(() => {
    var _a2, _b2;
    try {
      const p = (_a2 = window.location.pathname) != null ? _a2 : "";
      return (_b2 = resolveHeaderNavActiveLabel(p, navItems)) != null ? _b2 : "";
    } catch {
      return "";
    }
  });
  (0, import_react4.useEffect)(() => {
    var _a2;
    setActiveLabel((_a2 = resolveHeaderNavActiveLabel(pathname, navItems)) != null ? _a2 : "");
  }, [pathname, navItems]);
  const logoText = safeText(props.logoText) || "Logo";
  const brandName = safeText(props.brandName) || "";
  const brandSubtitle = safeText(props.brandSubtitle) || "";
  const logoSrc = normalizeImageUrl(props.logoImage);
  const showSubtitle = props.showBrandSubtitle !== false;
  const showProfile = props.showProfileIcon !== false;
  const showCart = props.showCartIcon !== false;
  const sticky = props.stickyHeader !== false;
  const brandNameStyle = (0, import_react4.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "brandName",
        role: "heading",
        defaultStyle: HEADER_BRAND_NAME_DEFAULT
      })
    ),
    [section, theme]
  );
  const brandSubtitleStyle = (0, import_react4.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "brandSubtitle",
        role: "body",
        defaultStyle: HEADER_BRAND_SUBTITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  const navLinkFontStyle = (0, import_react4.useMemo)(
    () => {
      const resolved = resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "navLinkText",
        role: "body",
        defaultStyle: HEADER_NAV_LINK_TEXT_DEFAULT
      });
      return {
        fontFamily: resolved.fontFamily,
        fontWeight: resolved.fontWeight,
        fontSize: resolved.fontSize
      };
    },
    [section, theme]
  );
  const resolvedHeaderAppearance = (0, import_react4.useMemo)(
    () => resolveHeaderAppearance({ section, theme }),
    [section, theme]
  );
  const headerChrome = (0, import_react4.useMemo)(
    () => headerChromeStyles(resolvedHeaderAppearance),
    [resolvedHeaderAppearance]
  );
  const headerBarStyle = (0, import_react4.useMemo)(
    () => ({
      ...sectionAppearanceStyle(appearance),
      ...logoFocusedHeaderAppearanceCssVars(resolvedHeaderAppearance)
    }),
    [appearance, resolvedHeaderAppearance]
  );
  const showSearch = pathname == null ? void 0 : pathname.startsWith("/store");
  const [isSearchOpen, setIsSearchOpen] = (0, import_react4.useState)(false);
  const [searchValue, setSearchValue] = (0, import_react4.useState)("");
  const desktopSearchRef = (0, import_react4.useRef)(null);
  const mobileSearchRef = (0, import_react4.useRef)(null);
  const desktopInputRef = (0, import_react4.useRef)(null);
  const mobileInputRef = (0, import_react4.useRef)(null);
  const debounceTimerRef = (0, import_react4.useRef)(void 0);
  const setSearchOpen = (next) => {
    setIsSearchOpen(next);
  };
  (0, import_react4.useEffect)(() => {
    return () => {
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    };
  }, []);
  (0, import_react4.useEffect)(() => {
    if (showSearch) return;
    if (!isSearchOpen && searchValue.trim() === "") return;
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    setIsSearchOpen(false);
    setSearchValue("");
    onSearchChnage == null ? void 0 : onSearchChnage("");
  }, [showSearch, isSearchOpen, searchValue, onSearchChnage]);
  (0, import_react4.useEffect)(() => {
    if (!showSearch || !isSearchOpen) return;
    const raf = window.requestAnimationFrame(() => {
      var _a2, _b2, _c2, _d, _e;
      const isMobile = (_c2 = (_b2 = (_a2 = window.matchMedia) == null ? void 0 : _a2.call(window, "(max-width: 768px)")) == null ? void 0 : _b2.matches) != null ? _c2 : false;
      const el = (_e = (_d = isMobile ? mobileInputRef.current : desktopInputRef.current) != null ? _d : desktopInputRef.current) != null ? _e : mobileInputRef.current;
      el == null ? void 0 : el.focus();
    });
    return () => window.cancelAnimationFrame(raf);
  }, [isSearchOpen, showSearch]);
  (0, import_react4.useEffect)(() => {
    if (!showSearch || !isSearchOpen) return;
    const onPointerDown = (e) => {
      var _a2, _b2, _c2, _d;
      const target = e.target;
      if (!target) return;
      const insideDesktop = (_b2 = (_a2 = desktopSearchRef.current) == null ? void 0 : _a2.contains(target)) != null ? _b2 : false;
      const insideMobile = (_d = (_c2 = mobileSearchRef.current) == null ? void 0 : _c2.contains(target)) != null ? _d : false;
      if (insideDesktop || insideMobile) return;
      if (searchValue.trim() === "") setSearchOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown, true);
    document.addEventListener("touchstart", onPointerDown, true);
    return () => {
      document.removeEventListener("mousedown", onPointerDown, true);
      document.removeEventListener("touchstart", onPointerDown, true);
    };
  }, [isSearchOpen, searchValue, showSearch]);
  const handleSearchChange = (next) => {
    setSearchValue(next);
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(() => {
      if (onSearchChnage)
        onSearchChnage(next);
    }, 300);
  };
  const clearSearch = (e) => {
    var _a2, _b2, _c2, _d, _e;
    e == null ? void 0 : e.preventDefault();
    e == null ? void 0 : e.stopPropagation();
    setSearchValue("");
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    onSearchChnage == null ? void 0 : onSearchChnage("");
    const isMobile = (_c2 = (_b2 = (_a2 = window.matchMedia) == null ? void 0 : _a2.call(window, "(max-width: 768px)")) == null ? void 0 : _b2.matches) != null ? _c2 : false;
    const el = (_e = (_d = isMobile ? mobileInputRef.current : desktopInputRef.current) != null ? _d : desktopInputRef.current) != null ? _e : mobileInputRef.current;
    el == null ? void 0 : el.focus();
  };
  return /* @__PURE__ */ import_react4.default.createElement("header", { className: `ak-lfh ${sticky ? "ak-lfh__bar--sticky" : ""}` }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__bar", style: headerBarStyle }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__row" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__brand" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__brandMark" }, /* @__PURE__ */ import_react4.default.createElement(
    "a",
    {
      href: "/",
      className: "ak-lfh__logoBadge",
      "aria-label": brandName ? `Go to ${brandName} home` : "Go to home",
      onClick: (e) => handleClientNavClick(e, "/", { scrollToTop: true })
    },
    logoSrc ? /* @__PURE__ */ import_react4.default.createElement(
      "img",
      {
        className: "ak-lfh__logoImg",
        src: logoSrc,
        alt: "",
        loading: "lazy"
      }
    ) : /* @__PURE__ */ import_react4.default.createElement("span", { className: "ak-lfh__logoText" }, logoText)
  ), showProfile ? /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      type: "button",
      className: "ak-lfh__iconBtn ak-lfh__iconBtn--profileMobile",
      "aria-label": "Account",
      style: headerChrome.iconButton,
      onClick: () => onProfileClick == null ? void 0 : onProfileClick()
    },
    /* @__PURE__ */ import_react4.default.createElement(IconUser, null)
  ) : null), /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__brandText" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__brandName", style: brandNameStyle }, brandName), showSubtitle ? /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__brandSub", style: brandSubtitleStyle }, brandSubtitle) : null)), /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__center" }, /* @__PURE__ */ import_react4.default.createElement(
    NavToggle,
    {
      items: navItems,
      active: activeLabel,
      onSelect: setActiveLabel,
      linkFontStyle: navLinkFontStyle,
      navShellStyle: headerChrome.navShell,
      inactivePillStyle: headerChrome.inactivePill,
      activePillStyle: headerChrome.activePill
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__actions" }, showSearch ? /* @__PURE__ */ import_react4.default.createElement(
    "div",
    {
      ref: desktopSearchRef,
      className: isSearchOpen ? "ak-lfh__search ak-lfh__search--open" : "ak-lfh__search"
    },
    !isSearchOpen ? /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        type: "button",
        className: "ak-lfh__iconBtn",
        "aria-label": "Search",
        "aria-expanded": false,
        style: headerChrome.iconButton,
        onClick: () => setSearchOpen(true)
      },
      /* @__PURE__ */ import_react4.default.createElement(IconSearch, null)
    ) : null,
    isSearchOpen ? /* @__PURE__ */ import_react4.default.createElement(
      "span",
      {
        className: "ak-lfh__searchIconSpacer",
        "aria-hidden": true,
        onClick: (e) => {
          e.stopPropagation();
        }
      }
    ) : null,
    /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__searchField", "aria-hidden": !isSearchOpen }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__searchInputWrap" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "ak-lfh__searchInputIcon", "aria-hidden": true }, /* @__PURE__ */ import_react4.default.createElement(IconSearch, null)), /* @__PURE__ */ import_react4.default.createElement(
      "input",
      {
        ref: desktopInputRef,
        className: "ak-lfh__searchInput",
        type: "search",
        inputMode: "search",
        autoComplete: "off",
        placeholder: "Search products...",
        value: searchValue,
        onChange: (e) => handleSearchChange(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") e.preventDefault();
        }
      }
    ), searchValue.trim() ? /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        type: "button",
        className: "ak-lfh__searchClear",
        "aria-label": "Clear search",
        onClick: (e) => clearSearch(e)
      },
      /* @__PURE__ */ import_react4.default.createElement(IconX, null)
    ) : null))
  ) : null, showProfile ? /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      type: "button",
      id: "profile-button",
      className: "ak-lfh__iconBtn ak-lfh__iconBtn--profileDesktop",
      "aria-label": "Account",
      style: headerChrome.iconButton,
      onClick: () => onProfileClick == null ? void 0 : onProfileClick()
    },
    /* @__PURE__ */ import_react4.default.createElement(IconUser, null)
  ) : null, showCart ? /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      type: "button",
      className: "ak-lfh__iconBtn",
      "aria-label": "Shopping cart",
      style: headerChrome.iconButton,
      onClick: () => onCartClick == null ? void 0 : onCartClick()
    },
    /* @__PURE__ */ import_react4.default.createElement(IconBag, null),
    /* @__PURE__ */ import_react4.default.createElement("span", { className: "ak-lfh__badge", style: headerChrome.cartBadge }, cartCount != null ? cartCount : 0)
  ) : null)), showSearch ? /* @__PURE__ */ import_react4.default.createElement(
    "div",
    {
      ref: mobileSearchRef,
      className: isSearchOpen ? "ak-lfh__searchMobile ak-lfh__searchMobile--open" : "ak-lfh__searchMobile",
      "aria-hidden": !isSearchOpen
    },
    /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__searchMobileInner" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-lfh__searchInputWrap" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "ak-lfh__searchInputIcon", "aria-hidden": true }, /* @__PURE__ */ import_react4.default.createElement(IconSearch, null)), /* @__PURE__ */ import_react4.default.createElement(
      "input",
      {
        ref: mobileInputRef,
        className: "ak-lfh__searchInput",
        type: "search",
        inputMode: "search",
        autoComplete: "off",
        placeholder: "Search products...",
        value: searchValue,
        onChange: (e) => handleSearchChange(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") e.preventDefault();
        }
      }
    ), searchValue.trim() ? /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        type: "button",
        className: "ak-lfh__searchClear",
        "aria-label": "Clear search",
        onClick: (e) => clearSearch(e)
      },
      /* @__PURE__ */ import_react4.default.createElement(IconX, null)
    ) : null))
  ) : null));
}

// src/components/TransparentHeroHeaderSection/TransparentHeroHeader.tsx
var import_react5 = __toESM(require("react"));
function safeText2(v) {
  return String(v != null ? v : "").trim();
}
function parseOpacity(v, fallback) {
  const n = parseFloat(String(v != null ? v : ""));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(1, Math.max(0, n));
}
function parseBlurPx(v, fallback) {
  const n = parseFloat(String(v != null ? v : ""));
  if (!Number.isFinite(n) || n < 0) return fallback;
  return n;
}
function IconUser2() {
  return /* @__PURE__ */ import_react5.default.createElement(
    "svg",
    {
      className: "ak-thh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react5.default.createElement("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ import_react5.default.createElement("circle", { cx: "12", cy: "7", r: "4" })
  );
}
function IconBag2() {
  return /* @__PURE__ */ import_react5.default.createElement(
    "svg",
    {
      className: "ak-thh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react5.default.createElement("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }),
    /* @__PURE__ */ import_react5.default.createElement("path", { d: "M3 6h18" }),
    /* @__PURE__ */ import_react5.default.createElement("path", { d: "M16 10a4 4 0 0 1-8 0" })
  );
}
function IconSearch2() {
  return /* @__PURE__ */ import_react5.default.createElement(
    "svg",
    {
      className: "ak-thh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react5.default.createElement("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ import_react5.default.createElement("path", { d: "m21 21-4.3-4.3" })
  );
}
function IconX2() {
  return /* @__PURE__ */ import_react5.default.createElement(
    "svg",
    {
      className: "ak-thh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react5.default.createElement("path", { d: "M18 6 6 18" }),
    /* @__PURE__ */ import_react5.default.createElement("path", { d: "M6 6l12 12" })
  );
}
function NavPills({
  items,
  active,
  onSelect,
  scrolled,
  linkFontStyle,
  navShellStyle,
  inactivePillStyle,
  activePillStyle
}) {
  if (items.length === 0) return null;
  return /* @__PURE__ */ import_react5.default.createElement(
    "div",
    {
      className: [
        "ak-thh__navShell",
        scrolled ? "ak-thh__navShell--scrolled" : "ak-thh__navShell--top"
      ].join(" "),
      role: "tablist",
      "aria-label": "Primary navigation",
      style: navShellStyle
    },
    items.map((item, idx) => {
      const isActive = active === item.label;
      const href = safeText2(item.link);
      const pillClass = [
        "ak-thh__navPill",
        isActive ? "ak-thh__navPill--active" : "",
        scrolled ? "ak-thh__navPill--scrolled" : "ak-thh__navPill--top"
      ].filter(Boolean).join(" ");
      const pillStyle = {
        ...linkFontStyle,
        ...isActive ? activePillStyle : inactivePillStyle
      };
      return href ? /* @__PURE__ */ import_react5.default.createElement(
        "a",
        {
          key: `${item.label}-${idx}`,
          href,
          role: "tab",
          "aria-selected": isActive,
          className: pillClass,
          style: pillStyle,
          onClick: () => onSelect(item.label)
        },
        item.label
      ) : /* @__PURE__ */ import_react5.default.createElement(
        "button",
        {
          key: `${item.label}-${idx}`,
          type: "button",
          role: "tab",
          "aria-selected": isActive,
          className: pillClass,
          style: pillStyle,
          onClick: () => onSelect(item.label)
        },
        item.label
      );
    })
  );
}
function TransparentHeroHeader({
  section,
  appearance,
  theme,
  cartCount,
  onSearchChnage,
  onProfileClick,
  onCartClick
}) {
  var _a, _b, _c;
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const rawBlocks = (_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks;
  const [pathname, setPathname] = (0, import_react5.useState)(() => {
    var _a2;
    try {
      return (_a2 = window.location.pathname) != null ? _a2 : "";
    } catch {
      return "";
    }
  });
  (0, import_react5.useEffect)(() => subscribeToPathname(setPathname), []);
  const navItems = (0, import_react5.useMemo)(() => {
    const blocks = Array.isArray(rawBlocks) ? rawBlocks : [];
    return blocks.slice(0, 2).map((b, i) => {
      var _a2, _b2;
      return {
        label: safeText2((_a2 = b == null ? void 0 : b.props) == null ? void 0 : _a2.label) || (i === 0 ? "Home" : "Shop"),
        link: safeText2((_b2 = b == null ? void 0 : b.props) == null ? void 0 : _b2.link)
      };
    });
  }, [rawBlocks]);
  const [activeLabel, setActiveLabel] = (0, import_react5.useState)(() => {
    var _a2, _b2;
    try {
      const p = (_a2 = window.location.pathname) != null ? _a2 : "";
      return (_b2 = resolveHeaderNavActiveLabel(p, navItems)) != null ? _b2 : "";
    } catch {
      return "";
    }
  });
  const [scrollY, setScrollY] = (0, import_react5.useState)(0);
  (0, import_react5.useEffect)(() => {
    var _a2;
    setActiveLabel((_a2 = resolveHeaderNavActiveLabel(pathname, navItems)) != null ? _a2 : "");
  }, [pathname, navItems]);
  const enableTransition = props.enableScrollTransition !== false;
  const sticky = props.stickyHeader !== false;
  (0, import_react5.useEffect)(() => {
    if (typeof window === "undefined") return void 0;
    if (!sticky && !enableTransition) {
      setScrollY(0);
      return void 0;
    }
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableTransition, sticky]);
  const scrolled = scrollY > 24;
  const progress = (0, import_react5.useMemo)(
    () => enableTransition ? Math.min(scrollY / 120, 1) : 0,
    [scrollY, enableTransition]
  );
  const initialAlpha = parseOpacity(props.initialTransparency, 0.04);
  const maxAlpha = parseOpacity(props.maxTransparency, 0.32);
  const maxBlurPx = parseBlurPx(props.maxBlur, 18);
  const bgAlpha = enableTransition ? initialAlpha + progress * Math.max(0, maxAlpha - initialAlpha) : initialAlpha;
  const blurPx = enableTransition ? progress * maxBlurPx : 0;
  const borderAlpha = enableTransition ? progress * 0.08 : 0;
  const logoText = safeText2(props.logoText) || "Logo";
  const brandSubtitle = safeText2(props.brandSubtitle);
  const logoSrc = normalizeImageUrl(props.logoImage);
  const showProfile = props.showProfileIcon !== false;
  const showCart = props.showCartIcon !== false;
  const brandNameStyle = (0, import_react5.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "brandName",
        role: "heading",
        defaultStyle: HEADER_BRAND_NAME_DEFAULT
      })
    ),
    [section, theme]
  );
  const brandSubtitleStyle = (0, import_react5.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "brandSubtitle",
        role: "body",
        defaultStyle: HEADER_BRAND_SUBTITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  const navLinkFontStyle = (0, import_react5.useMemo)(
    () => {
      const resolved = resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "navLinkText",
        role: "body",
        defaultStyle: HEADER_NAV_LINK_TEXT_LIGHT_DEFAULT
      });
      return {
        fontFamily: resolved.fontFamily,
        fontWeight: resolved.fontWeight,
        fontSize: resolved.fontSize
      };
    },
    [section, theme]
  );
  const useHeaderChrome = hasHeaderAppearanceOverrides(section);
  const resolvedHeaderAppearance = (0, import_react5.useMemo)(
    () => resolveHeaderAppearance({ section, theme }),
    [section, theme]
  );
  const headerChrome = (0, import_react5.useMemo)(
    () => useHeaderChrome ? headerChromeStyles(resolvedHeaderAppearance) : null,
    [useHeaderChrome, resolvedHeaderAppearance]
  );
  const headerChromeVars = (0, import_react5.useMemo)(
    () => useHeaderChrome ? transparentHeroHeaderAppearanceCssVars(resolvedHeaderAppearance) : void 0,
    [useHeaderChrome, resolvedHeaderAppearance]
  );
  const showSearch = pathname == null ? void 0 : pathname.startsWith("/store");
  const [isSearchOpen, setIsSearchOpen] = (0, import_react5.useState)(false);
  const [searchValue, setSearchValue] = (0, import_react5.useState)("");
  const desktopSearchRef = (0, import_react5.useRef)(null);
  const mobileSearchRef = (0, import_react5.useRef)(null);
  const desktopInputRef = (0, import_react5.useRef)(null);
  const mobileInputRef = (0, import_react5.useRef)(null);
  const debounceTimerRef = (0, import_react5.useRef)(void 0);
  const setSearchOpen = (next) => {
    setIsSearchOpen(next);
  };
  (0, import_react5.useEffect)(() => {
    return () => {
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    };
  }, []);
  (0, import_react5.useEffect)(() => {
    if (showSearch) return;
    if (!isSearchOpen && searchValue.trim() === "") return;
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    setIsSearchOpen(false);
    setSearchValue("");
    onSearchChnage == null ? void 0 : onSearchChnage("");
  }, [showSearch, isSearchOpen, searchValue, onSearchChnage]);
  (0, import_react5.useEffect)(() => {
    if (!showSearch || !isSearchOpen) return;
    const raf = window.requestAnimationFrame(() => {
      var _a2, _b2, _c2, _d, _e;
      const isMobile = (_c2 = (_b2 = (_a2 = window.matchMedia) == null ? void 0 : _a2.call(window, "(max-width: 768px)")) == null ? void 0 : _b2.matches) != null ? _c2 : false;
      const el = (_e = (_d = isMobile ? mobileInputRef.current : desktopInputRef.current) != null ? _d : desktopInputRef.current) != null ? _e : mobileInputRef.current;
      el == null ? void 0 : el.focus();
    });
    return () => window.cancelAnimationFrame(raf);
  }, [isSearchOpen, showSearch]);
  (0, import_react5.useEffect)(() => {
    if (!showSearch || !isSearchOpen) return;
    const onPointerDown = (e) => {
      var _a2, _b2, _c2, _d;
      const target = e.target;
      if (!target) return;
      const insideDesktop = (_b2 = (_a2 = desktopSearchRef.current) == null ? void 0 : _a2.contains(target)) != null ? _b2 : false;
      const insideMobile = (_d = (_c2 = mobileSearchRef.current) == null ? void 0 : _c2.contains(target)) != null ? _d : false;
      if (insideDesktop || insideMobile) return;
      if (searchValue.trim() === "") setSearchOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown, true);
    document.addEventListener("touchstart", onPointerDown, true);
    return () => {
      document.removeEventListener("mousedown", onPointerDown, true);
      document.removeEventListener("touchstart", onPointerDown, true);
    };
  }, [isSearchOpen, searchValue, showSearch]);
  const handleSearchChange = (next) => {
    setSearchValue(next);
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(() => {
      onSearchChnage == null ? void 0 : onSearchChnage(next);
    }, 300);
  };
  const clearSearch = (e) => {
    var _a2, _b2, _c2, _d, _e;
    e == null ? void 0 : e.preventDefault();
    e == null ? void 0 : e.stopPropagation();
    setSearchValue("");
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    onSearchChnage == null ? void 0 : onSearchChnage("");
    const isMobile = (_c2 = (_b2 = (_a2 = window.matchMedia) == null ? void 0 : _a2.call(window, "(max-width: 768px)")) == null ? void 0 : _b2.matches) != null ? _c2 : false;
    const el = (_e = (_d = isMobile ? mobileInputRef.current : desktopInputRef.current) != null ? _d : desktopInputRef.current) != null ? _e : mobileInputRef.current;
    el == null ? void 0 : el.focus();
  };
  const iconBtnClass = ["ak-thh__iconBtn", scrolled ? "ak-thh__iconBtn--scrolled" : "ak-thh__iconBtn--top"].join(" ");
  const headerStyle = {
    ...sectionAppearanceStyle(appearance),
    ...headerChromeVars,
    backgroundColor: `rgba(10, 10, 12, ${bgAlpha})`,
    backdropFilter: blurPx > 0 ? `blur(${blurPx}px)` : void 0,
    WebkitBackdropFilter: blurPx > 0 ? `blur(${blurPx}px)` : void 0,
    boxShadow: `inset 0 -1px 0 rgba(255,255,255,${borderAlpha})`
  };
  const iconButtonStyle = headerChrome == null ? void 0 : headerChrome.iconButton;
  const cartBadgeStyle = headerChrome == null ? void 0 : headerChrome.cartBadge;
  const positionClass = sticky ? "ak-thh__bar--sticky" : "ak-thh__bar--static";
  return /* @__PURE__ */ import_react5.default.createElement("header", { className: `ak-thh ${positionClass}`, style: headerStyle }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-thh__wrap" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-thh__inner" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-thh__logo" }, /* @__PURE__ */ import_react5.default.createElement(
    "div",
    {
      className: [
        "ak-thh__logoBadge",
        scrolled ? "ak-thh__logoBadge--scrolled" : "ak-thh__logoBadge--top"
      ].join(" "),
      "aria-hidden": Boolean(logoSrc)
    },
    logoSrc ? /* @__PURE__ */ import_react5.default.createElement(
      "img",
      {
        className: "ak-thh__logoImg",
        src: logoSrc,
        alt: logoText,
        loading: "lazy"
      }
    ) : /* @__PURE__ */ import_react5.default.createElement("span", { className: "ak-thh__logoText", style: brandNameStyle }, logoText)
  ), brandSubtitle ? /* @__PURE__ */ import_react5.default.createElement("span", { className: "ak-thh__brandSub", style: brandSubtitleStyle }, brandSubtitle) : null), /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-thh__center" }, /* @__PURE__ */ import_react5.default.createElement(
    NavPills,
    {
      items: navItems,
      active: activeLabel,
      onSelect: setActiveLabel,
      scrolled,
      linkFontStyle: navLinkFontStyle,
      navShellStyle: headerChrome == null ? void 0 : headerChrome.navShell,
      inactivePillStyle: headerChrome == null ? void 0 : headerChrome.inactivePill,
      activePillStyle: headerChrome == null ? void 0 : headerChrome.activePill
    }
  )), /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-thh__actions" }, showSearch ? /* @__PURE__ */ import_react5.default.createElement(
    "div",
    {
      ref: desktopSearchRef,
      className: isSearchOpen ? "ak-thh__search ak-thh__search--open" : "ak-thh__search"
    },
    !isSearchOpen ? /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        type: "button",
        className: iconBtnClass,
        "aria-label": "Search",
        "aria-expanded": false,
        style: iconButtonStyle,
        onClick: () => setSearchOpen(true)
      },
      /* @__PURE__ */ import_react5.default.createElement(IconSearch2, null)
    ) : null,
    isSearchOpen ? /* @__PURE__ */ import_react5.default.createElement(
      "span",
      {
        className: "ak-thh__searchIconSpacer",
        "aria-hidden": true,
        onClick: (e) => {
          e.stopPropagation();
        }
      }
    ) : null,
    /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-thh__searchField", "aria-hidden": !isSearchOpen }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-thh__searchInputWrap" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "ak-thh__searchInputIcon", "aria-hidden": true }, /* @__PURE__ */ import_react5.default.createElement(IconSearch2, null)), /* @__PURE__ */ import_react5.default.createElement(
      "input",
      {
        ref: desktopInputRef,
        className: "ak-thh__searchInput",
        type: "search",
        inputMode: "search",
        autoComplete: "off",
        placeholder: "Search products...",
        value: searchValue,
        onChange: (e) => handleSearchChange(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") e.preventDefault();
        }
      }
    ), searchValue.trim() ? /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        type: "button",
        className: "ak-thh__searchClear",
        "aria-label": "Clear search",
        onClick: (e) => clearSearch(e)
      },
      /* @__PURE__ */ import_react5.default.createElement(IconX2, null)
    ) : null))
  ) : null, showProfile ? /* @__PURE__ */ import_react5.default.createElement(
    "button",
    {
      type: "button",
      id: "profile-button",
      className: iconBtnClass,
      "aria-label": "Account",
      style: iconButtonStyle,
      onClick: () => onProfileClick == null ? void 0 : onProfileClick()
    },
    /* @__PURE__ */ import_react5.default.createElement(IconUser2, null)
  ) : null, showCart ? /* @__PURE__ */ import_react5.default.createElement(
    "button",
    {
      type: "button",
      className: iconBtnClass,
      "aria-label": "Shopping cart",
      style: iconButtonStyle,
      onClick: () => onCartClick == null ? void 0 : onCartClick()
    },
    /* @__PURE__ */ import_react5.default.createElement(IconBag2, null),
    /* @__PURE__ */ import_react5.default.createElement("span", { className: "ak-thh__badge", style: cartBadgeStyle }, cartCount != null ? cartCount : 0)
  ) : null)), showSearch ? /* @__PURE__ */ import_react5.default.createElement(
    "div",
    {
      ref: mobileSearchRef,
      className: isSearchOpen ? "ak-thh__searchMobile ak-thh__searchMobile--open" : "ak-thh__searchMobile",
      "aria-hidden": !isSearchOpen
    },
    /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-thh__searchMobileInner" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-thh__searchInputWrap" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "ak-thh__searchInputIcon", "aria-hidden": true }, /* @__PURE__ */ import_react5.default.createElement(IconSearch2, null)), /* @__PURE__ */ import_react5.default.createElement(
      "input",
      {
        ref: mobileInputRef,
        className: "ak-thh__searchInput",
        type: "search",
        inputMode: "search",
        autoComplete: "off",
        placeholder: "Search products...",
        value: searchValue,
        onChange: (e) => handleSearchChange(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") e.preventDefault();
        }
      }
    ), searchValue.trim() ? /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        type: "button",
        className: "ak-thh__searchClear",
        "aria-label": "Clear search",
        onClick: (e) => clearSearch(e)
      },
      /* @__PURE__ */ import_react5.default.createElement(IconX2, null)
    ) : null))
  ) : null));
}

// src/components/MessageStyleTestimonialsSection/MessageStyleTestimonials.tsx
var import_react11 = __toESM(require("react"));

// src/components/MessageStyleTestimonialsSection/variants/AppleMessageMarquee.tsx
var import_react7 = __toESM(require("react"));

// src/shared/textStyleDefaults/testimonialTextStyleDefaults.ts
var TESTIMONIAL_QUOTE_TEXT_DEFAULT = {
  color: "#1d1d1f",
  fontWeight: "400",
  fontSize: "16px"
};
var TESTIMONIAL_CUSTOMER_NAME_DEFAULT = {
  color: "#1d1d1f",
  fontWeight: "600",
  fontSize: "15px"
};
var TESTIMONIAL_CUSTOMER_ROLE_DEFAULT = {
  color: "#86868b",
  fontWeight: "400",
  fontSize: "14px"
};
var TESTIMONIAL_SUBHEADING_DEFAULT = {
  color: "#6e6e73",
  fontWeight: "400",
  fontSize: "17px"
};
var TESTIMONIAL_BACKGROUND_WORD_DEFAULT = {
  color: "rgba(0, 0, 0, 0.06)",
  fontWeight: "700",
  fontSize: "15rem"
};
var TESTIMONIAL_EYEBROW_DEFAULT = {
  color: "#86868b",
  fontWeight: "600",
  fontSize: "12px"
};
var TESTIMONIAL_HEADING_DEFAULT = {
  color: "#1d1d1f",
  fontWeight: "700",
  fontSize: "36px"
};
var TESTIMONIAL_HIGHLIGHT_TEXT_DEFAULT = {
  color: "#6e6e73",
  fontWeight: "600",
  fontSize: "36px"
};
var TESTIMONIAL_DESCRIPTION_DEFAULT = {
  color: "#6e6e73",
  fontWeight: "400",
  fontSize: "16px"
};
var TESTIMONIAL_BUTTON_TEXT_DEFAULT = {
  color: "#ffffff",
  fontWeight: "600",
  fontSize: "15px"
};

// src/components/MessageStyleTestimonialsSection/hooks.ts
var import_react6 = require("react");
function usePrefersReducedMotion() {
  const [reduced, setReduced] = (0, import_react6.useState)(false);
  (0, import_react6.useEffect)(() => {
    if (typeof window === "undefined" || !window.matchMedia) return void 0;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

// src/components/MessageStyleTestimonialsSection/shared.ts
var STYLE_MESSAGE_BUBBLE = "message_bubble";
var STYLE_APPLE_MARQUEE = "apple_message_marquee";
var STYLE_STACKED_TESTIMONIALS = "stacked_testimonials";
var STYLE_PORTRAIT_TESTIMONIALS = "portrait_testimonials";
function getVisibleTestimonialItems(blocks) {
  if (!Array.isArray(blocks)) return [];
  const out = [];
  for (const b of blocks) {
    const p = b == null ? void 0 : b.props;
    if (!p) continue;
    if (p.isVisible === false) continue;
    out.push(p);
  }
  return out;
}
function buildMarqueeLoop(items, minItems = 4) {
  if (items.length === 0) return [];
  let base = [...items];
  while (base.length < minItems) {
    base = [...base, ...items];
  }
  return [...base, ...base];
}
function resolveHeading(props) {
  var _a, _b;
  const h = String((_b = (_a = props == null ? void 0 : props.heading) != null ? _a : props == null ? void 0 : props.header) != null ? _b : "").trim();
  return h;
}

// src/components/MessageStyleTestimonialsSection/variants/AppleMessageMarquee.tsx
function parsePx(n, fallback) {
  const v = Number(n);
  return Number.isFinite(v) ? v : fallback;
}
function parseDurationSec(n, fallback) {
  const v = Number(n);
  if (!Number.isFinite(v) || v < 8) return fallback;
  return Math.min(120, v);
}
function StarRating({
  rating,
  visible
}) {
  if (!visible) return null;
  const r = Math.min(5, Math.max(1, Math.round(rating || 5)));
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst-apple__stars", "aria-hidden": true }, Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ import_react7.default.createElement(
    "span",
    {
      key: i,
      className: i < r ? "ak-mst-apple__star ak-mst-apple__star--on" : "ak-mst-apple__star"
    },
    "\u2605"
  )));
}
function AppleCard({
  item,
  showStars,
  quoteStyle,
  nameStyle,
  roleStyle
}) {
  var _a, _b, _c;
  const name = String((_a = item == null ? void 0 : item.name) != null ? _a : "").trim();
  const role = String((_b = item == null ? void 0 : item.role) != null ? _b : "").trim();
  const quote = String((_c = item == null ? void 0 : item.quote) != null ? _c : "").trim();
  const rating = Number(item == null ? void 0 : item.rating);
  const stars = Number.isFinite(rating) ? rating : 5;
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst-apple__card-wrap" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst-apple__card" }, /* @__PURE__ */ import_react7.default.createElement(StarRating, { rating: stars, visible: showStars }), /* @__PURE__ */ import_react7.default.createElement("p", { className: "ak-mst-apple__quote", style: quoteStyle }, quote ? /* @__PURE__ */ import_react7.default.createElement(import_react7.default.Fragment, null, /* @__PURE__ */ import_react7.default.createElement("span", { className: "ak-mst-apple__q" }, "\u201C"), quote, /* @__PURE__ */ import_react7.default.createElement("span", { className: "ak-mst-apple__q" }, "\u201D")) : /* @__PURE__ */ import_react7.default.createElement("span", { className: "ak-mst-apple__placeholder" }, "Add a quote")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst-apple__footer" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "ak-mst-apple__name", style: nameStyle }, name || "Name"), role ? /* @__PURE__ */ import_react7.default.createElement("span", { className: "ak-mst-apple__role", style: roleStyle }, role) : null)));
}
function AppleMessageMarquee({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c, _d, _e;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const heading = resolveHeading(props);
  const sub = String((_c = props.subheading) != null ? _c : "").trim();
  const bg = String((_d = props.backgroundColor) != null ? _d : "").trim() || "#f5f5f7";
  const row1 = parseDurationSec(props.rowOneSpeed, 34);
  const row2 = parseDurationSec(props.rowTwoSpeed, 38);
  const pauseOnHover = Boolean(props.pauseOnHover);
  const showStars = props.showStars !== false;
  const padTop = parsePx(props.sectionPaddingTop, 72);
  const padBot = parsePx(props.sectionPaddingBottom, 72);
  const blocks = (_e = section == null ? void 0 : section.settings) == null ? void 0 : _e.blocks;
  const items = (0, import_react7.useMemo)(
    () => getVisibleTestimonialItems(blocks),
    [blocks]
  );
  const loop = (0, import_react7.useMemo)(
    () => items.length > 0 ? buildMarqueeLoop(items, 6) : [],
    [items]
  );
  const subheadingStyle = (0, import_react7.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "subheading",
        role: "body",
        defaultStyle: TESTIMONIAL_SUBHEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const quoteTextStyle = (0, import_react7.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "quoteText",
        role: "body",
        defaultStyle: TESTIMONIAL_QUOTE_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const customerNameStyle = (0, import_react7.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "customerName",
        role: "heading",
        defaultStyle: TESTIMONIAL_CUSTOMER_NAME_DEFAULT
      })
    ),
    [section, theme]
  );
  const customerRoleStyle = (0, import_react7.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "customerRole",
        role: "body",
        defaultStyle: TESTIMONIAL_CUSTOMER_ROLE_DEFAULT
      })
    ),
    [section, theme]
  );
  const sectionStyle = {
    ...sectionAppearanceStyle(appearance),
    background: bg,
    paddingTop: padTop,
    paddingBottom: padBot
  };
  const cls = [
    "ak-mst-apple",
    pauseOnHover ? "ak-mst-apple--pause-hover" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ import_react7.default.createElement(
    "section",
    {
      className: cls,
      style: sectionStyle,
      "aria-label": heading || "Testimonials"
    },
    /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst-apple__inner" }, /* @__PURE__ */ import_react7.default.createElement("header", { className: "ak-mst-apple__intro" }, /* @__PURE__ */ import_react7.default.createElement("h2", { className: "ak-mst-apple__title" }, heading || "Loved by merchants."), sub ? /* @__PURE__ */ import_react7.default.createElement("p", { className: "ak-mst-apple__sub", style: subheadingStyle }, sub) : null), items.length === 0 ? /* @__PURE__ */ import_react7.default.createElement("p", { className: "ak-mst-apple__empty" }, "No testimonials yet.") : reduceMotion ? /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst-apple__static-grid" }, items.map((item, i) => /* @__PURE__ */ import_react7.default.createElement(
      AppleCard,
      {
        key: i,
        item,
        showStars,
        quoteStyle: quoteTextStyle,
        nameStyle: customerNameStyle,
        roleStyle: customerRoleStyle
      }
    ))) : /* @__PURE__ */ import_react7.default.createElement(import_react7.default.Fragment, null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst-apple__marquee" }, /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: "ak-mst-apple__track ak-mst-apple__track--1",
        style: {
          ["--ak-mst-apple-dur"]: `${row1}s`
        }
      },
      loop.map((item, index) => /* @__PURE__ */ import_react7.default.createElement(
        AppleCard,
        {
          key: `r1-${index}`,
          item,
          showStars,
          quoteStyle: quoteTextStyle,
          nameStyle: customerNameStyle,
          roleStyle: customerRoleStyle
        }
      ))
    )), /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst-apple__marquee ak-mst-apple__marquee--second" }, /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: "ak-mst-apple__track ak-mst-apple__track--2",
        style: {
          ["--ak-mst-apple-dur"]: `${row2}s`
        }
      },
      loop.map((item, index) => /* @__PURE__ */ import_react7.default.createElement(
        AppleCard,
        {
          key: `r2-${index}`,
          item,
          showStars,
          quoteStyle: quoteTextStyle,
          nameStyle: customerNameStyle,
          roleStyle: customerRoleStyle
        }
      ))
    ))))
  );
}

// src/components/MessageStyleTestimonialsSection/variants/MessageBubbleMarquee.tsx
var import_react8 = __toESM(require("react"));
function MessageBubble({
  item,
  quoteStyle,
  nameStyle,
  roleStyle
}) {
  var _a, _b, _c;
  const name = String((_a = item == null ? void 0 : item.name) != null ? _a : "").trim();
  const role = String((_b = item == null ? void 0 : item.role) != null ? _b : "").trim();
  const quote = String((_c = item == null ? void 0 : item.quote) != null ? _c : "").trim();
  return /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-mst__bubble-wrap" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-mst__bubble" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-mst__tail", "aria-hidden": true }), /* @__PURE__ */ import_react8.default.createElement("p", { className: "ak-mst__quote", style: quoteStyle }, quote ? /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement("span", { className: "ak-mst__quote-mark" }, "\u201C"), quote, /* @__PURE__ */ import_react8.default.createElement("span", { className: "ak-mst__quote-mark" }, "\u201D")) : /* @__PURE__ */ import_react8.default.createElement("span", { className: "ak-mst__quote-placeholder" }, "Add a quote")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-mst__meta" }, name || role ? /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, name ? /* @__PURE__ */ import_react8.default.createElement("span", { style: nameStyle }, name) : null, name && role ? /* @__PURE__ */ import_react8.default.createElement("span", { className: "ak-mst__meta-sep" }, " \u2022 ") : null, role ? /* @__PURE__ */ import_react8.default.createElement("span", { style: roleStyle }, role) : null) : /* @__PURE__ */ import_react8.default.createElement("span", { className: "ak-mst__meta-placeholder" }, "Name \u2022 Role"))));
}
function MessageBubbleMarquee({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const heading = resolveHeading(props);
  const blocks = (_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks;
  const items = (0, import_react8.useMemo)(
    () => getVisibleTestimonialItems(blocks),
    [blocks]
  );
  const trackItems = (0, import_react8.useMemo)(
    () => items.length > 0 ? buildMarqueeLoop(items) : [],
    [items]
  );
  const durationSec = Math.max(18, items.length * 5);
  const quoteTextStyle = (0, import_react8.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "quoteText",
        role: "body",
        defaultStyle: TESTIMONIAL_QUOTE_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const customerNameStyle = (0, import_react8.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "customerName",
        role: "heading",
        defaultStyle: TESTIMONIAL_CUSTOMER_NAME_DEFAULT
      })
    ),
    [section, theme]
  );
  const customerRoleStyle = (0, import_react8.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "customerRole",
        role: "body",
        defaultStyle: TESTIMONIAL_CUSTOMER_ROLE_DEFAULT
      })
    ),
    [section, theme]
  );
  return /* @__PURE__ */ import_react8.default.createElement(
    "section",
    {
      className: "ak-mst",
      "aria-label": heading || "Testimonials",
      style: sectionAppearanceStyle(appearance)
    },
    /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-mst__inner" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-mst__header-wrap" }, /* @__PURE__ */ import_react8.default.createElement("h2", { className: "ak-mst__heading" }, heading || "What merchants say.")), items.length === 0 ? /* @__PURE__ */ import_react8.default.createElement("p", { className: "ak-mst__empty" }, "No testimonials yet.") : reduceMotion ? /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-mst__row ak-mst__row--static" }, items.map((item, index) => {
      var _a2;
      return /* @__PURE__ */ import_react8.default.createElement(
        MessageBubble,
        {
          key: `${String((_a2 = item.name) != null ? _a2 : index)}-${index}`,
          item,
          quoteStyle: quoteTextStyle,
          nameStyle: customerNameStyle,
          roleStyle: customerRoleStyle
        }
      );
    })) : /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-mst__marquee" }, /* @__PURE__ */ import_react8.default.createElement(
      "div",
      {
        className: "ak-mst__track ak-mst__track--animate",
        style: {
          ["--ak-mst-duration"]: `${durationSec}s`
        }
      },
      trackItems.map((item, index) => {
        var _a2, _b2;
        return /* @__PURE__ */ import_react8.default.createElement(
          MessageBubble,
          {
            key: `${index}-${String((_a2 = item.name) != null ? _a2 : "")}-${String((_b2 = item.quote) != null ? _b2 : "").slice(0, 12)}`,
            item,
            quoteStyle: quoteTextStyle,
            nameStyle: customerNameStyle,
            roleStyle: customerRoleStyle
          }
        );
      })
    )))
  );
}

// src/components/StackedTestimonialsSection/StackedTestimonials.tsx
var import_react9 = __toESM(require("react"));
function clampStars(raw) {
  const n = Number.parseInt(String(raw != null ? raw : "5"), 10);
  if (!Number.isFinite(n)) return 5;
  return Math.min(5, Math.max(1, n));
}
function StarRow({ count }) {
  const n = Math.min(5, Math.max(0, count));
  return /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-stacked-t__stars", "aria-hidden": true }, Array.from({ length: n }).map((_, i) => /* @__PURE__ */ import_react9.default.createElement(
    "svg",
    {
      key: i,
      className: "ak-stacked-t__star",
      viewBox: "0 0 24 24",
      width: "16",
      height: "16",
      role: "presentation"
    },
    /* @__PURE__ */ import_react9.default.createElement(
      "path",
      {
        fill: "currentColor",
        d: "M12 2.5l2.9 6.1 6.8.6-5.1 4.5 1.5 6.7L12 17.9 5.9 20.4l1.5-6.7-5.1-4.5 6.8-.6L12 2.5z"
      }
    )
  )));
}
var DESKTOP_OFFSETS = [
  "ak-stacked-t__card-pos--d0",
  "ak-stacked-t__card-pos--d1",
  "ak-stacked-t__card-pos--d2",
  "ak-stacked-t__card-pos--d3",
  "ak-stacked-t__card-pos--d4"
];
var MOBILE_OFFSETS = [
  "ak-stacked-t__card-pos--m0",
  "ak-stacked-t__card-pos--m1",
  "ak-stacked-t__card-pos--m2",
  "ak-stacked-t__card-pos--m3",
  "ak-stacked-t__card-pos--m4"
];
function StackedCard({
  item,
  index,
  reduceMotion,
  quoteStyle,
  nameStyle,
  roleStyle
}) {
  var _a, _b, _c;
  const name = String((_a = item == null ? void 0 : item.name) != null ? _a : "").trim();
  const role = String((_b = item == null ? void 0 : item.role) != null ? _b : "").trim();
  const quote = String((_c = item == null ? void 0 : item.quote) != null ? _c : "").trim();
  const stars = clampStars(item == null ? void 0 : item.stars);
  const posClass = `${MOBILE_OFFSETS[index % MOBILE_OFFSETS.length]} ${DESKTOP_OFFSETS[index % DESKTOP_OFFSETS.length]}`;
  return /* @__PURE__ */ import_react9.default.createElement(
    "div",
    {
      className: `ak-stacked-t__card-wrap ${posClass} ${reduceMotion ? "ak-stacked-t__card-wrap--static" : ""}`,
      style: { zIndex: 10 + index }
    },
    /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-stacked-t__card" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-stacked-t__card-shine", "aria-hidden": true }), /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-stacked-t__card-inner" }, /* @__PURE__ */ import_react9.default.createElement(StarRow, { count: stars }), /* @__PURE__ */ import_react9.default.createElement("p", { className: "ak-stacked-t__quote", style: quoteStyle }, quote ? /* @__PURE__ */ import_react9.default.createElement(import_react9.default.Fragment, null, /* @__PURE__ */ import_react9.default.createElement("span", { className: "ak-stacked-t__quote-mark" }, "\u201C"), quote, /* @__PURE__ */ import_react9.default.createElement("span", { className: "ak-stacked-t__quote-mark" }, "\u201D")) : /* @__PURE__ */ import_react9.default.createElement("span", { className: "ak-stacked-t__placeholder" }, "Add a quote")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-stacked-t__footer" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-stacked-t__name", style: nameStyle }, name || /* @__PURE__ */ import_react9.default.createElement("span", { className: "ak-stacked-t__placeholder" }, "Name")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-stacked-t__role", style: roleStyle }, role || /* @__PURE__ */ import_react9.default.createElement("span", { className: "ak-stacked-t__placeholder" }, "Role")))))
  );
}
function StackedTestimonials({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c, _d;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const headingWord = String((_c = props.backgroundWord) != null ? _c : "Testimonial").trim() || "Testimonial";
  const showWord = props.showBackgroundWord !== false;
  const blocks = (0, import_react9.useMemo)(
    () => {
      var _a2;
      return Array.isArray((_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks) ? section.settings.blocks.filter((b) => b && typeof b === "object") : [];
    },
    [(_d = section == null ? void 0 : section.settings) == null ? void 0 : _d.blocks]
  );
  const hasContent = blocks.some((b) => {
    var _a2, _b2, _c2;
    const p = b == null ? void 0 : b.props;
    if (!p || typeof p !== "object") return false;
    return String((_a2 = p.quote) != null ? _a2 : "").trim() !== "" || String((_b2 = p.name) != null ? _b2 : "").trim() !== "" || String((_c2 = p.role) != null ? _c2 : "").trim() !== "";
  });
  const backgroundWordStyle = (0, import_react9.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "backgroundWord",
        role: "heading",
        defaultStyle: TESTIMONIAL_BACKGROUND_WORD_DEFAULT
      })
    ),
    [section, theme]
  );
  const quoteTextStyle = (0, import_react9.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "quoteText",
        role: "body",
        defaultStyle: TESTIMONIAL_QUOTE_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const customerNameStyle = (0, import_react9.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "customerName",
        role: "heading",
        defaultStyle: TESTIMONIAL_CUSTOMER_NAME_DEFAULT
      })
    ),
    [section, theme]
  );
  const customerRoleStyle = (0, import_react9.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "customerRole",
        role: "body",
        defaultStyle: TESTIMONIAL_CUSTOMER_ROLE_DEFAULT
      })
    ),
    [section, theme]
  );
  return /* @__PURE__ */ import_react9.default.createElement(
    "section",
    {
      className: "ak-stacked-t",
      "aria-label": headingWord,
      style: sectionAppearanceStyle(appearance)
    },
    /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-stacked-t__bg", "aria-hidden": true }),
    /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-stacked-t__container" }, showWord ? /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-stacked-t__wordmark-wrap" }, /* @__PURE__ */ import_react9.default.createElement(
      "div",
      {
        className: "ak-stacked-t__wordmark ak-stacked-t__wordmark--sm",
        style: backgroundWordStyle
      },
      headingWord
    ), /* @__PURE__ */ import_react9.default.createElement(
      "div",
      {
        className: "ak-stacked-t__wordmark ak-stacked-t__wordmark--lg",
        style: backgroundWordStyle
      },
      headingWord
    )) : null, /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-stacked-t__stage" }, !hasContent ? /* @__PURE__ */ import_react9.default.createElement("p", { className: "ak-stacked-t__empty" }, "No testimonials yet.") : blocks.map((block, index) => {
      var _a2, _b2;
      return /* @__PURE__ */ import_react9.default.createElement(
        StackedCard,
        {
          key: String((_a2 = block.id) != null ? _a2 : index),
          item: (_b2 = block.props) != null ? _b2 : {},
          index,
          reduceMotion,
          quoteStyle: quoteTextStyle,
          nameStyle: customerNameStyle,
          roleStyle: customerRoleStyle
        }
      );
    })))
  );
}

// src/components/PortraitTestimonialsSection/PortraitTestimonials.tsx
var import_react10 = __toESM(require("react"));
var DESKTOP_POS = [
  { posClass: "ak-pt__p0", rotate: -5, delayMs: 0 },
  { posClass: "ak-pt__p1", rotate: 2, delayMs: 100 },
  { posClass: "ak-pt__p2", rotate: -3, delayMs: 220 },
  { posClass: "ak-pt__p3", rotate: 3, delayMs: 320 },
  { posClass: "ak-pt__p4", rotate: -2, delayMs: 420 },
  { posClass: "ak-pt__p5", rotate: 5, delayMs: 520 },
  { posClass: "ak-pt__p6", rotate: 4, delayMs: 620 },
  { posClass: "ak-pt__p7", rotate: -4, delayMs: 720 }
];
function safeText3(v) {
  return String(v != null ? v : "").trim();
}
function computeMagneticOffset(pointerX, pointerY, centerX, centerY, radius = 220, maxPull = 14) {
  const dx = pointerX - centerX;
  const dy = pointerY - centerY;
  const distance = Math.hypot(dx, dy) || 1;
  if (distance > radius) return { x: 0, y: 0 };
  const strength = (1 - distance / radius) * maxPull;
  return { x: dx / distance * strength, y: dy / distance * strength };
}
function easeOffset(offset, factor = 0.84) {
  const x = Math.abs(offset.x) < 0.12 ? 0 : offset.x * factor;
  const y = Math.abs(offset.y) < 0.12 ? 0 : offset.y * factor;
  return { x, y };
}
function PortraitTestimonials({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const eyebrow = safeText3(props.eyebrow) || "TESTIMONIALS";
  const heading = safeText3(props.heading) || "Trusted by leaders";
  const highlightText = safeText3(props.highlightText) || "from various industries";
  const description = safeText3(props.description) || "Learn why professionals trust thoughtful digital experiences to elevate customer journeys.";
  const showButton = props.showButton !== false;
  const buttonText = safeText3(props.buttonText) || "Read Success Stories";
  const buttonLink = safeText3(props.buttonLink);
  const enableMagnetic = props.enableMagneticEffect !== false;
  const blocks = (0, import_react10.useMemo)(() => {
    var _a2;
    const raw = (_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks;
    if (!Array.isArray(raw)) return [];
    return raw.slice(0, 8);
  }, [(_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks]);
  const [loaded, setLoaded] = (0, import_react10.useState)(false);
  const [offsets, setOffsets] = (0, import_react10.useState)(
    () => Object.fromEntries(DESKTOP_POS.map((_, i) => [i, { x: 0, y: 0 }]))
  );
  const sectionRef = (0, import_react10.useRef)(null);
  const cardRefs = (0, import_react10.useRef)({});
  const restFrameRef = (0, import_react10.useRef)(null);
  (0, import_react10.useEffect)(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, []);
  (0, import_react10.useEffect)(() => {
    if (reduceMotion) return void 0;
    const sectionEl = sectionRef.current;
    if (!sectionEl) return void 0;
    if (!enableMagnetic) return void 0;
    const stopRest = () => {
      if (restFrameRef.current !== null) {
        window.cancelAnimationFrame(restFrameRef.current);
        restFrameRef.current = null;
      }
    };
    const animateBack = () => {
      setOffsets((prev) => {
        var _a2;
        const next = {};
        let moving = false;
        for (let i = 0; i < DESKTOP_POS.length; i += 1) {
          const eased = easeOffset((_a2 = prev[i]) != null ? _a2 : { x: 0, y: 0 });
          next[i] = eased;
          if (eased.x !== 0 || eased.y !== 0) moving = true;
        }
        if (moving) {
          restFrameRef.current = window.requestAnimationFrame(animateBack);
        } else {
          restFrameRef.current = null;
        }
        return next;
      });
    };
    const updateFromPointer = (clientX, clientY) => {
      setOffsets(() => {
        const next = {};
        for (let i = 0; i < DESKTOP_POS.length; i += 1) {
          const el = cardRefs.current[i];
          if (!el) {
            next[i] = { x: 0, y: 0 };
            continue;
          }
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          next[i] = computeMagneticOffset(clientX, clientY, cx, cy);
        }
        return next;
      });
    };
    const onMove = (e) => {
      stopRest();
      updateFromPointer(e.clientX, e.clientY);
    };
    const onLeave = () => {
      stopRest();
      restFrameRef.current = window.requestAnimationFrame(animateBack);
    };
    sectionEl.addEventListener("pointermove", onMove);
    sectionEl.addEventListener("pointerleave", onLeave);
    return () => {
      sectionEl.removeEventListener("pointermove", onMove);
      sectionEl.removeEventListener("pointerleave", onLeave);
      stopRest();
    };
  }, [enableMagnetic, reduceMotion]);
  const eyebrowStyle = (0, import_react10.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "eyebrow",
        role: "body",
        defaultStyle: TESTIMONIAL_EYEBROW_DEFAULT
      })
    ),
    [section, theme]
  );
  const headingStyle = (0, import_react10.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "heading",
        role: "heading",
        defaultStyle: TESTIMONIAL_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const highlightTextStyle = (0, import_react10.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "highlightText",
        role: "heading",
        defaultStyle: TESTIMONIAL_HIGHLIGHT_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const descriptionStyle = (0, import_react10.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "description",
        role: "body",
        defaultStyle: TESTIMONIAL_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const buttonTextStyle = (0, import_react10.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "buttonText",
        role: "body",
        defaultStyle: TESTIMONIAL_BUTTON_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  return /* @__PURE__ */ import_react10.default.createElement(
    "section",
    {
      ref: sectionRef,
      className: "ak-pt",
      "aria-label": heading,
      style: sectionAppearanceStyle(appearance)
    },
    /* @__PURE__ */ import_react10.default.createElement("div", { className: "ak-pt__container" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "ak-pt__desktop" }, DESKTOP_POS.map((pos, index) => {
      var _a2, _b2, _c2;
      const p = (_b2 = (_a2 = blocks[index]) == null ? void 0 : _a2.props) != null ? _b2 : {};
      const img = safeText3(p.image);
      const alt = safeText3(p.alt) || "Testimonial portrait";
      const magnetic = (_c2 = offsets[index]) != null ? _c2 : { x: 0, y: 0 };
      return /* @__PURE__ */ import_react10.default.createElement(
        "div",
        {
          key: index,
          className: `ak-pt__portrait ${pos.posClass}`,
          style: {
            transition: "transform 1400ms cubic-bezier(0.22,1,0.36,1), opacity 1200ms cubic-bezier(0.22,1,0.36,1), filter 1400ms cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: `${pos.delayMs}ms`,
            opacity: loaded ? 1 : 0,
            filter: loaded ? "blur(0px)" : "blur(10px)",
            transform: loaded ? "translate3d(0px, 0px, 0px) scale(1)" : "translate3d(0px, 48px, 0px) scale(0.9)"
          }
        },
        /* @__PURE__ */ import_react10.default.createElement(
          "div",
          {
            ref: (node) => {
              cardRefs.current[index] = node;
            },
            className: "ak-pt__card",
            style: {
              transform: `translate3d(${magnetic.x}px, ${magnetic.y}px, 0) rotate(${pos.rotate}deg)`,
              transition: "transform 320ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms cubic-bezier(0.22,1,0.36,1)",
              boxShadow: magnetic.x !== 0 || magnetic.y !== 0 ? "0 34px 84px rgba(0,0,0,0.1)" : "0 26px 70px rgba(0,0,0,0.08)",
              willChange: "transform"
            }
          },
          img ? /* @__PURE__ */ import_react10.default.createElement(
            "img",
            {
              src: img,
              alt,
              className: "ak-pt__img",
              style: {
                transform: loaded ? "scale(1)" : "scale(1.08)",
                transitionDelay: `${pos.delayMs + 60}ms`
              },
              loading: "lazy"
            }
          ) : /* @__PURE__ */ import_react10.default.createElement("div", { className: "ak-pt__img ak-pt__img--fallback", "aria-hidden": true })
        )
      );
    })), /* @__PURE__ */ import_react10.default.createElement("div", { className: "ak-pt__mobile" }, blocks.slice(0, 8).map((b, index) => {
      var _a2, _b2, _c2, _d, _e;
      const p = (_a2 = b == null ? void 0 : b.props) != null ? _a2 : {};
      const img = safeText3(p.image);
      const alt = safeText3(p.alt) || "Testimonial portrait";
      const settledY = index % 2 === 0 ? 16 : -4;
      const startY = index % 2 === 0 ? 36 : 12;
      return /* @__PURE__ */ import_react10.default.createElement(
        "div",
        {
          key: `m-${index}`,
          className: `ak-pt__mcard ${index % 2 === 0 ? "ak-pt__mcard--down" : "ak-pt__mcard--up"}`,
          style: {
            transitionDelay: `${(_c2 = (_b2 = DESKTOP_POS[index]) == null ? void 0 : _b2.delayMs) != null ? _c2 : 0}ms`,
            transform: loaded ? `translateY(${settledY}px) scale(1)` : `translateY(${startY}px) scale(0.92)`,
            opacity: loaded ? 1 : 0,
            filter: loaded ? "blur(0px)" : "blur(4px)"
          }
        },
        img ? /* @__PURE__ */ import_react10.default.createElement(
          "img",
          {
            src: img,
            alt,
            className: "ak-pt__mimg",
            style: {
              transform: loaded ? "scale(1)" : "scale(1.06)",
              transitionDelay: `${((_e = (_d = DESKTOP_POS[index]) == null ? void 0 : _d.delayMs) != null ? _e : 0) + 60}ms`
            },
            loading: "lazy"
          }
        ) : /* @__PURE__ */ import_react10.default.createElement("div", { className: "ak-pt__mimg ak-pt__mimg--fallback", "aria-hidden": true })
      );
    })), /* @__PURE__ */ import_react10.default.createElement("div", { className: "ak-pt__center" }, /* @__PURE__ */ import_react10.default.createElement(
      "div",
      {
        className: "ak-pt__eyebrow",
        style: {
          ...eyebrowStyle,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)"
        }
      },
      eyebrow
    ), /* @__PURE__ */ import_react10.default.createElement(
      "h2",
      {
        className: "ak-pt__heading",
        style: {
          ...headingStyle,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(24px)"
        }
      },
      heading,
      /* @__PURE__ */ import_react10.default.createElement("br", null),
      /* @__PURE__ */ import_react10.default.createElement("span", { className: "ak-pt__highlight", style: highlightTextStyle }, highlightText)
    ), /* @__PURE__ */ import_react10.default.createElement(
      "p",
      {
        className: "ak-pt__desc",
        style: {
          ...descriptionStyle,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(24px)"
        }
      },
      description
    ), showButton ? buttonLink ? /* @__PURE__ */ import_react10.default.createElement(
      "a",
      {
        className: "ak-pt__btn",
        href: buttonLink,
        style: {
          ...buttonTextStyle,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(24px)"
        }
      },
      buttonText,
      " ",
      /* @__PURE__ */ import_react10.default.createElement("span", { "aria-hidden": true }, "\u2192")
    ) : /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        className: "ak-pt__btn",
        type: "button",
        style: {
          ...buttonTextStyle,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(24px)"
        }
      },
      buttonText,
      " ",
      /* @__PURE__ */ import_react10.default.createElement("span", { "aria-hidden": true }, "\u2192")
    ) : null))
  );
}

// src/components/MessageStyleTestimonialsSection/MessageStyleTestimonials.tsx
function MessageStyleTestimonials({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c;
  const style = (_c = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) == null ? void 0 : _b.testimonialStyle) != null ? _c : STYLE_MESSAGE_BUBBLE;
  if (style === STYLE_STACKED_TESTIMONIALS) {
    return /* @__PURE__ */ import_react11.default.createElement(StackedTestimonials, { section, appearance, theme });
  }
  if (style === STYLE_PORTRAIT_TESTIMONIALS) {
    return /* @__PURE__ */ import_react11.default.createElement(PortraitTestimonials, { section, appearance, theme });
  }
  if (style === STYLE_APPLE_MARQUEE) {
    return /* @__PURE__ */ import_react11.default.createElement(AppleMessageMarquee, { section, appearance, theme });
  }
  return /* @__PURE__ */ import_react11.default.createElement(MessageBubbleMarquee, { section, appearance, theme });
}

// src/components/ProductMarqueeSection/ProductMarquee.tsx
var import_react12 = __toESM(require("react"));

// src/shared/textStyleDefaults/productMarqueeTextStyleDefaults.ts
var PRODUCT_MARQUEE_EYEBROW_DEFAULT = {
  color: "rgba(64, 64, 64, 1)",
  fontWeight: "700",
  fontSize: "0.6875rem"
};
var PRODUCT_MARQUEE_HEADING_DEFAULT = {
  color: "#111111",
  fontWeight: "600",
  fontSize: "1.875rem"
};
var PRODUCT_MARQUEE_DESCRIPTION_DEFAULT = {
  color: "rgba(82, 82, 82, 1)",
  fontWeight: "400",
  fontSize: "0.95rem"
};
var PRODUCT_CARD_TITLE_DEFAULT = {
  color: "#111111",
  fontWeight: "600",
  fontSize: "0.875rem"
};
var PRODUCT_CARD_TITLE_OVERLAY_DEFAULT = {
  color: "#ffffff",
  fontWeight: "600",
  fontSize: "1.5rem"
};
var PRODUCT_CARD_SUBTITLE_DEFAULT = {
  color: "rgba(115, 115, 115, 1)",
  fontWeight: "700",
  fontSize: "0.8125rem"
};
var PRODUCT_CARD_DESCRIPTION_DEFAULT = {
  color: "rgba(255, 255, 255, 0.78)",
  fontWeight: "400",
  fontSize: "0.875rem"
};

// src/components/ProductMarqueeSection/ProductMarquee.tsx
function rotate(items, by) {
  if (items.length === 0) return [];
  const n = (by % items.length + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}
function distributeRows(items) {
  const row1 = items;
  const row2 = rotate(items, 2);
  const row3 = rotate(items, 1).reverse();
  return { row1, row2, row3 };
}
function safeText4(v) {
  return String(v != null ? v : "").trim();
}
function ProductPill({
  item,
  cardTitleStyle,
  cardSubtitleStyle
}) {
  const title = safeText4(item == null ? void 0 : item.title);
  const subtitle = safeText4(item == null ? void 0 : item.subtitle);
  const image = safeText4(item == null ? void 0 : item.image);
  return /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__pill" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__pill-imgWrap", "aria-hidden": !image }, image ? /* @__PURE__ */ import_react12.default.createElement(
    "img",
    {
      className: "ak-pm__pill-img",
      src: image,
      alt: title,
      loading: "lazy"
    }
  ) : /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__pill-img ak-pm__pill-img--fallback", "aria-hidden": true })), /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__pill-text" }, /* @__PURE__ */ import_react12.default.createElement("span", { className: "ak-pm__pill-title", style: cardTitleStyle }, title || /* @__PURE__ */ import_react12.default.createElement("span", { className: "ak-pm__placeholder" }, "Title")), /* @__PURE__ */ import_react12.default.createElement("span", { className: "ak-pm__pill-subtitle", style: cardSubtitleStyle }, subtitle || /* @__PURE__ */ import_react12.default.createElement("span", { className: "ak-pm__placeholder" }, "Subtitle"))));
}
function MarqueeRow({
  items,
  reverse = false,
  durationSec = 34,
  reduceMotion,
  cardTitleStyle,
  cardSubtitleStyle
}) {
  const loopItems = items.length > 0 ? [...items, ...items] : [];
  const animClass = reverse ? "ak-pm__track--rev" : "ak-pm__track";
  if (reduceMotion) {
    return /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__row" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__track ak-pm__track--static" }, items.map((item, index) => /* @__PURE__ */ import_react12.default.createElement(
      ProductPill,
      {
        key: `${safeText4(item.title)}-${index}`,
        item,
        cardTitleStyle,
        cardSubtitleStyle
      }
    ))));
  }
  return /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__row" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: animClass, style: { animationDuration: `${durationSec}s` } }, loopItems.map((item, index) => /* @__PURE__ */ import_react12.default.createElement(
    ProductPill,
    {
      key: `${safeText4(item.title)}-${index}`,
      item,
      cardTitleStyle,
      cardSubtitleStyle
    }
  ))));
}
function ProductMarquee({ section, appearance, theme }) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const eyebrow = safeText4(props.eyebrow);
  const heading = safeText4(props.heading);
  const description = safeText4(props.description);
  const showButton = props.showButton !== false;
  const buttonText = safeText4(props.buttonText);
  const buttonLink = safeText4(props.buttonLink);
  const eyebrowStyle = (0, import_react12.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "eyebrow",
        role: "body",
        defaultStyle: PRODUCT_MARQUEE_EYEBROW_DEFAULT
      })
    ),
    [section, theme]
  );
  const headingStyle = (0, import_react12.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "heading",
        role: "heading",
        defaultStyle: PRODUCT_MARQUEE_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const descriptionStyle = (0, import_react12.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "description",
        role: "body",
        defaultStyle: PRODUCT_MARQUEE_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const cardTitleStyle = (0, import_react12.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "cardTitle",
        role: "heading",
        defaultStyle: PRODUCT_CARD_TITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  const cardSubtitleStyle = (0, import_react12.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "cardSubtitle",
        role: "body",
        defaultStyle: PRODUCT_CARD_SUBTITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  const items = (0, import_react12.useMemo)(() => {
    var _a2;
    const blocks = (_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks;
    if (!Array.isArray(blocks)) return [];
    return blocks.filter((b) => b && typeof b === "object").map((b) => (b == null ? void 0 : b.props) && typeof b.props === "object" ? b.props : {});
  }, [(_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks]);
  const hasContent = items.some(
    (it) => safeText4(it.title) || safeText4(it.subtitle) || safeText4(it.image)
  );
  const { row1, row2, row3 } = (0, import_react12.useMemo)(() => distributeRows(items), [items]);
  return /* @__PURE__ */ import_react12.default.createElement("section", { className: "ak-pm", "aria-label": heading || "Products", style: sectionAppearanceStyle(appearance) }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__bg", "aria-hidden": true }), /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__glow", "aria-hidden": true }), /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__container" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__header" }, eyebrow ? /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__eyebrow", style: eyebrowStyle }, eyebrow) : null, /* @__PURE__ */ import_react12.default.createElement("h2", { className: "ak-pm__heading", style: headingStyle }, heading || "Explore handpicked products."), description ? /* @__PURE__ */ import_react12.default.createElement("p", { className: "ak-pm__desc", style: descriptionStyle }, description) : null), /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__rows" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__fade ak-pm__fade--l", "aria-hidden": true }), /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__fade ak-pm__fade--r", "aria-hidden": true }), !hasContent ? /* @__PURE__ */ import_react12.default.createElement("p", { className: "ak-pm__empty" }, "No items yet.") : /* @__PURE__ */ import_react12.default.createElement(import_react12.default.Fragment, null, /* @__PURE__ */ import_react12.default.createElement(
    MarqueeRow,
    {
      items: row1,
      durationSec: 34,
      reduceMotion,
      cardTitleStyle,
      cardSubtitleStyle
    }
  ), /* @__PURE__ */ import_react12.default.createElement(
    MarqueeRow,
    {
      items: row2,
      reverse: true,
      durationSec: 38,
      reduceMotion,
      cardTitleStyle,
      cardSubtitleStyle
    }
  ), /* @__PURE__ */ import_react12.default.createElement(
    MarqueeRow,
    {
      items: row3,
      durationSec: 36,
      reduceMotion,
      cardTitleStyle,
      cardSubtitleStyle
    }
  ))), showButton ? /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pm__cta" }, buttonLink ? /* @__PURE__ */ import_react12.default.createElement("a", { className: "ak-pm__btn", href: buttonLink }, buttonText || "Buy Now", " ", /* @__PURE__ */ import_react12.default.createElement("span", { "aria-hidden": true }, "\u2192")) : /* @__PURE__ */ import_react12.default.createElement("button", { className: "ak-pm__btn", type: "button" }, buttonText || "Buy Now", " ", /* @__PURE__ */ import_react12.default.createElement("span", { "aria-hidden": true }, "\u2192"))) : null));
}

// src/components/ProductMarqueeSection/ProductCardMarquee.tsx
var import_react13 = __toESM(require("react"));
function rotate2(items, by) {
  if (items.length === 0) return [];
  const n = (by % items.length + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}
function distributeRows2(items) {
  const row1 = items;
  const row2 = rotate2(items, 2);
  const row3 = rotate2(items, 1).reverse();
  return { row1, row2, row3 };
}
function safeText5(v) {
  return String(v != null ? v : "").trim();
}
function ProductCard({
  item,
  cardTitleStyle,
  cardSubtitleStyle
}) {
  const title = safeText5(item == null ? void 0 : item.title);
  const subtitle = safeText5(item == null ? void 0 : item.subtitle);
  const image = safeText5(item == null ? void 0 : item.image);
  return /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__card" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__imgWrap", "aria-hidden": !image }, image ? /* @__PURE__ */ import_react13.default.createElement("img", { className: "ak-pmc__img", src: image, alt: title, loading: "lazy" }) : /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__img ak-pmc__img--fallback", "aria-hidden": true })), /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__meta" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__title", style: cardTitleStyle }, title || /* @__PURE__ */ import_react13.default.createElement("span", { className: "ak-pmc__placeholder" }, "Title")), /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__subtitle", style: cardSubtitleStyle }, subtitle || /* @__PURE__ */ import_react13.default.createElement("span", { className: "ak-pmc__placeholder" }, "Subtitle"))));
}
function MarqueeRow2({
  items,
  reverse = false,
  durationSec = 34,
  reduceMotion,
  cardTitleStyle,
  cardSubtitleStyle
}) {
  const loopItems = items.length > 0 ? [...items, ...items] : [];
  const animClass = reverse ? "ak-pmc__track--rev" : "ak-pmc__track";
  if (reduceMotion) {
    return /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__row" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__track ak-pmc__track--static" }, items.map((item, index) => /* @__PURE__ */ import_react13.default.createElement(
      ProductCard,
      {
        key: `${safeText5(item.title)}-${index}`,
        item,
        cardTitleStyle,
        cardSubtitleStyle
      }
    ))));
  }
  return /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__row" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: animClass, style: { animationDuration: `${durationSec}s` } }, loopItems.map((item, index) => /* @__PURE__ */ import_react13.default.createElement(
    ProductCard,
    {
      key: `${safeText5(item.title)}-${index}`,
      item,
      cardTitleStyle,
      cardSubtitleStyle
    }
  ))));
}
function ProductCardMarquee({ section, appearance, theme }) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const eyebrow = safeText5(props.eyebrow) || "Bestsellers";
  const heading = safeText5(props.heading) || "Browse products the way modern commerce feels effortless.";
  const description = safeText5(props.description) || "A quicker-commerce inspired layout with the name neatly placed below the square image and one clean section action.";
  const showButton = props.showButton !== false;
  const buttonText = safeText5(props.buttonText) || "Buy Now";
  const buttonLink = safeText5(props.buttonLink);
  const eyebrowStyle = (0, import_react13.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "eyebrow",
        role: "body",
        defaultStyle: PRODUCT_MARQUEE_EYEBROW_DEFAULT
      })
    ),
    [section, theme]
  );
  const headingStyle = (0, import_react13.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "heading",
        role: "heading",
        defaultStyle: PRODUCT_MARQUEE_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const descriptionStyle = (0, import_react13.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "description",
        role: "body",
        defaultStyle: PRODUCT_MARQUEE_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const cardTitleStyle = (0, import_react13.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "cardTitle",
        role: "heading",
        defaultStyle: PRODUCT_CARD_TITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  const cardSubtitleStyle = (0, import_react13.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "cardSubtitle",
        role: "body",
        defaultStyle: PRODUCT_CARD_SUBTITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  const items = (0, import_react13.useMemo)(() => {
    var _a2;
    const blocks = (_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks;
    if (!Array.isArray(blocks)) return [];
    return blocks.filter((b) => b && typeof b === "object").map((b) => (b == null ? void 0 : b.props) && typeof b.props === "object" ? b.props : {});
  }, [(_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks]);
  const hasContent = items.some(
    (it) => safeText5(it.title) || safeText5(it.subtitle) || safeText5(it.image)
  );
  const { row1, row2, row3 } = (0, import_react13.useMemo)(() => distributeRows2(items), [items]);
  return /* @__PURE__ */ import_react13.default.createElement("section", { className: "ak-pmc", "aria-label": heading, style: sectionAppearanceStyle(appearance) }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__bg", "aria-hidden": true }), /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__glow", "aria-hidden": true }), /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__container" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__header" }, eyebrow ? /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__eyebrow", style: eyebrowStyle }, eyebrow) : null, /* @__PURE__ */ import_react13.default.createElement("h2", { className: "ak-pmc__heading", style: headingStyle }, heading), description ? /* @__PURE__ */ import_react13.default.createElement("p", { className: "ak-pmc__desc", style: descriptionStyle }, description) : null), /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__rows" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__fade ak-pmc__fade--l", "aria-hidden": true }), /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__fade ak-pmc__fade--r", "aria-hidden": true }), !hasContent ? /* @__PURE__ */ import_react13.default.createElement("p", { className: "ak-pmc__empty" }, "No items yet.") : /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement(
    MarqueeRow2,
    {
      items: row1,
      durationSec: 34,
      reduceMotion,
      cardTitleStyle,
      cardSubtitleStyle
    }
  ), /* @__PURE__ */ import_react13.default.createElement(
    MarqueeRow2,
    {
      items: row2,
      reverse: true,
      durationSec: 38,
      reduceMotion,
      cardTitleStyle,
      cardSubtitleStyle
    }
  ), /* @__PURE__ */ import_react13.default.createElement(
    MarqueeRow2,
    {
      items: row3,
      durationSec: 36,
      reduceMotion,
      cardTitleStyle,
      cardSubtitleStyle
    }
  ))), showButton ? /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-pmc__cta" }, buttonLink ? /* @__PURE__ */ import_react13.default.createElement("a", { className: "ak-pmc__btn", href: buttonLink }, buttonText, " ", /* @__PURE__ */ import_react13.default.createElement("span", { "aria-hidden": true }, "\u2192")) : /* @__PURE__ */ import_react13.default.createElement("button", { className: "ak-pmc__btn", type: "button" }, buttonText, " ", /* @__PURE__ */ import_react13.default.createElement("span", { "aria-hidden": true }, "\u2192"))) : null));
}

// src/components/ProductMarqueeSection/CreativeCategoryMarquee.tsx
var import_react14 = __toESM(require("react"));
function rotate3(items, by) {
  if (items.length === 0) return [];
  const n = (by % items.length + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}
function safeText6(v) {
  return String(v != null ? v : "").trim();
}
function distributeTwoRows(items) {
  const row1 = items;
  const row2 = rotate3(items, 3);
  return { row1, row2 };
}
function CategoryCard({
  item,
  cardTitleStyle
}) {
  const name = safeText6(item == null ? void 0 : item.title);
  const image = safeText6(item == null ? void 0 : item.image);
  return /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__card" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__imgOuter" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__imgInner", "aria-hidden": !image }, image ? /* @__PURE__ */ import_react14.default.createElement("img", { className: "ak-ccm__img", src: image, alt: name, loading: "lazy" }) : /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__img ak-ccm__img--fallback", "aria-hidden": true }), /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__imgOverlay", "aria-hidden": true }))), /* @__PURE__ */ import_react14.default.createElement("p", { className: "ak-ccm__name", style: cardTitleStyle }, name || /* @__PURE__ */ import_react14.default.createElement("span", { className: "ak-ccm__placeholder" }, "Category")));
}
function Row({
  items,
  reverse = false,
  durationSec = 30,
  reduceMotion,
  cardTitleStyle
}) {
  const loop = items.length > 0 ? [...items, ...items, ...items] : [];
  if (reduceMotion) {
    return /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__row" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__track ak-ccm__track--static" }, items.map((item, i) => /* @__PURE__ */ import_react14.default.createElement(
      CategoryCard,
      {
        key: `${safeText6(item.title)}-${i}`,
        item,
        cardTitleStyle
      }
    ))));
  }
  return /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__row" }, /* @__PURE__ */ import_react14.default.createElement(
    "div",
    {
      className: reverse ? "ak-ccm__track--rev" : "ak-ccm__track",
      style: { animationDuration: `${durationSec}s` }
    },
    loop.map((item, i) => /* @__PURE__ */ import_react14.default.createElement(
      CategoryCard,
      {
        key: `${safeText6(item.title)}-${i}`,
        item,
        cardTitleStyle
      }
    ))
  ));
}
function CreativeCategoryMarquee({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const heading = safeText6(props.heading) || "Explore by Category";
  const description = safeText6(props.description) || "Smooth, scrollable categories designed for quick discovery.";
  const headingStyle = (0, import_react14.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "heading",
        role: "heading",
        defaultStyle: PRODUCT_MARQUEE_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const descriptionStyle = (0, import_react14.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "description",
        role: "body",
        defaultStyle: PRODUCT_MARQUEE_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const cardTitleStyle = (0, import_react14.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "cardTitle",
        role: "heading",
        defaultStyle: PRODUCT_CARD_TITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  const items = (0, import_react14.useMemo)(() => {
    var _a2;
    const blocks = (_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks;
    if (!Array.isArray(blocks)) return [];
    return blocks.filter((b) => b && typeof b === "object").map((b) => (b == null ? void 0 : b.props) && typeof b.props === "object" ? b.props : {});
  }, [(_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks]);
  const hasContent = items.some((it) => safeText6(it.title) || safeText6(it.image));
  const { row1, row2 } = (0, import_react14.useMemo)(() => distributeTwoRows(items), [items]);
  return /* @__PURE__ */ import_react14.default.createElement("section", { className: "ak-ccm", "aria-label": heading, style: sectionAppearanceStyle(appearance) }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__container" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__header" }, /* @__PURE__ */ import_react14.default.createElement("h2", { className: "ak-ccm__heading", style: headingStyle }, heading), /* @__PURE__ */ import_react14.default.createElement("p", { className: "ak-ccm__desc", style: descriptionStyle }, description)), /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__rows" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__fade ak-ccm__fade--l", "aria-hidden": true }), /* @__PURE__ */ import_react14.default.createElement("div", { className: "ak-ccm__fade ak-ccm__fade--r", "aria-hidden": true }), !hasContent ? /* @__PURE__ */ import_react14.default.createElement("p", { className: "ak-ccm__empty" }, "No categories yet.") : /* @__PURE__ */ import_react14.default.createElement(import_react14.default.Fragment, null, /* @__PURE__ */ import_react14.default.createElement(Row, { items: row1, durationSec: 30, reduceMotion, cardTitleStyle }), /* @__PURE__ */ import_react14.default.createElement(
    Row,
    {
      items: row2,
      reverse: true,
      durationSec: 34,
      reduceMotion,
      cardTitleStyle
    }
  )))));
}

// src/components/ProductMarqueeSection/LiquidFocusCategories.tsx
var import_react15 = __toESM(require("react"));
function safeText7(v) {
  return String(v != null ? v : "").trim();
}
function clampIndex(n) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(3, Math.floor(n)));
}
function parseDefaultActiveIndex(raw) {
  const s = String(raw != null ? raw : "1").trim();
  if (s === "0" || s === "1" || s === "2" || s === "3") {
    return parseInt(s, 10);
  }
  const n = parseInt(s, 10);
  return clampIndex(Number.isFinite(n) ? n : 1);
}
function padToFour(items) {
  const next = items.slice(0, 4);
  while (next.length < 4) next.push({});
  return next;
}
function LiquidFocusCategories({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const heading = safeText7(props.heading) || "Crafted for every taste";
  const description = safeText7(props.description);
  const resetToDefaultOnLeave = props.resetToDefaultOnLeave !== false;
  const defaultActiveIndex = parseDefaultActiveIndex(props.defaultActiveIndex);
  const headingStyle = (0, import_react15.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "heading",
        role: "heading",
        defaultStyle: PRODUCT_MARQUEE_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const descriptionStyle = (0, import_react15.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "description",
        role: "body",
        defaultStyle: PRODUCT_MARQUEE_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const cardTitleStyle = (0, import_react15.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "cardTitle",
        role: "heading",
        defaultStyle: PRODUCT_CARD_TITLE_OVERLAY_DEFAULT
      })
    ),
    [section, theme]
  );
  const cardDescriptionStyle = (0, import_react15.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "cardDescription",
        role: "body",
        defaultStyle: PRODUCT_CARD_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const [active, setActive] = (0, import_react15.useState)(defaultActiveIndex);
  (0, import_react15.useEffect)(() => {
    setActive(defaultActiveIndex);
  }, [defaultActiveIndex]);
  const items = (0, import_react15.useMemo)(() => {
    var _a2;
    const blocks = (_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks;
    if (!Array.isArray(blocks)) return padToFour([]);
    const mapped = blocks.filter((b) => b && typeof b === "object").map(
      (b) => (b == null ? void 0 : b.props) && typeof b.props === "object" ? b.props : {}
    );
    return padToFour(mapped);
  }, [(_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks]);
  const transitionMs = reduceMotion ? 120 : 700;
  return /* @__PURE__ */ import_react15.default.createElement("section", { className: "ak-lfc", "aria-label": heading, style: sectionAppearanceStyle(appearance) }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__inner" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__header" }, /* @__PURE__ */ import_react15.default.createElement("h2", { className: "ak-lfc__heading", style: headingStyle }, heading), description ? /* @__PURE__ */ import_react15.default.createElement("p", { className: "ak-lfc__sub", style: descriptionStyle }, description) : null), /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__desktop" }, /* @__PURE__ */ import_react15.default.createElement(
    "div",
    {
      className: "ak-lfc__strip",
      onMouseLeave: () => {
        if (resetToDefaultOnLeave) setActive(defaultActiveIndex);
      }
    },
    items.map((item, index) => {
      const title = safeText7(item == null ? void 0 : item.title);
      const image = safeText7(item == null ? void 0 : item.image);
      const alt = safeText7(item == null ? void 0 : item.alt) || title || "Category";
      const cardDescription = safeText7(item == null ? void 0 : item.description);
      const isActive = index === active;
      return /* @__PURE__ */ import_react15.default.createElement(
        "button",
        {
          key: `lfc-${index}`,
          type: "button",
          className: isActive ? "ak-lfc__card ak-lfc__card--active" : "ak-lfc__card",
          style: { transitionDuration: `${transitionMs}ms` },
          onMouseEnter: () => setActive(index),
          onFocus: () => setActive(index),
          "aria-pressed": isActive,
          "aria-label": title || `Card ${index + 1}`
        },
        /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__cardMedia", "aria-hidden": !image }, image ? /* @__PURE__ */ import_react15.default.createElement(
          "img",
          {
            className: "ak-lfc__img",
            src: image,
            alt,
            loading: "lazy"
          }
        ) : /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__img ak-lfc__img--fallback" })),
        /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__grad", "aria-hidden": true }),
        /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__grad2", "aria-hidden": true }),
        /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__cardBody" }, /* @__PURE__ */ import_react15.default.createElement(
          "h3",
          {
            className: isActive ? "ak-lfc__title ak-lfc__title--active" : "ak-lfc__title",
            style: { ...cardTitleStyle, transitionDuration: `${transitionMs}ms` }
          },
          title || /* @__PURE__ */ import_react15.default.createElement("span", { className: "ak-lfc__placeholder" }, "Title")
        ), /* @__PURE__ */ import_react15.default.createElement(
          "p",
          {
            className: isActive ? "ak-lfc__desc ak-lfc__desc--visible" : "ak-lfc__desc",
            style: { ...cardDescriptionStyle, transitionDuration: `${transitionMs}ms` }
          },
          cardDescription
        ))
      );
    })
  )), /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__mobile" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__scroll" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__scrollRow" }, items.map((item, index) => {
    const title = safeText7(item == null ? void 0 : item.title);
    const image = safeText7(item == null ? void 0 : item.image);
    const alt = safeText7(item == null ? void 0 : item.alt) || title || "Category";
    const cardDescription = safeText7(item == null ? void 0 : item.description);
    return /* @__PURE__ */ import_react15.default.createElement("div", { key: `lfc-m-${index}`, className: "ak-lfc__mcard" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__mcardMedia", "aria-hidden": !image }, image ? /* @__PURE__ */ import_react15.default.createElement(
      "img",
      {
        className: "ak-lfc__img",
        src: image,
        alt,
        loading: "lazy"
      }
    ) : /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__img ak-lfc__img--fallback" })), /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__mgrad", "aria-hidden": true }), /* @__PURE__ */ import_react15.default.createElement("div", { className: "ak-lfc__mbody" }, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "ak-lfc__mtitle", style: cardTitleStyle }, title || /* @__PURE__ */ import_react15.default.createElement("span", { className: "ak-lfc__placeholder" }, "Title")), /* @__PURE__ */ import_react15.default.createElement("p", { className: "ak-lfc__mdesc", style: cardDescriptionStyle }, cardDescription)));
  }))))));
}

// src/components/NspSignatureHeroSection/ScrollParallaxSignatureHero.tsx
var import_react16 = __toESM(require("react"));
var import_framer_motion2 = require("framer-motion");

// src/shared/textStyleDefaults/nspSignatureHeroTextStyleDefaults.ts
var NSP_SIG_HERO_EYEBROW_DEFAULT = {
  color: "#86868b",
  fontWeight: "600",
  fontSize: "11px"
};
var NSP_SIG_HERO_HEADING_DEFAULT = {
  color: "#14151c",
  fontWeight: "700",
  fontSize: "42px"
};
var NSP_SIG_HERO_DESCRIPTION_DEFAULT = {
  color: "rgba(28, 30, 40, 0.72)",
  fontWeight: "400",
  fontSize: "17px"
};
var NSP_SIG_HERO_PRIMARY_BUTTON_TEXT_DEFAULT = {
  color: "#ffffff",
  fontWeight: "600",
  fontSize: "14px"
};
var NSP_SIG_HERO_SECONDARY_BUTTON_TEXT_DEFAULT = {
  color: "#1c1f2e",
  fontWeight: "600",
  fontSize: "14px"
};
var NSP_TYPING_STATIC_HEADING_DEFAULT = {
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "56px"
};
var NSP_TYPING_DESCRIPTION_DEFAULT = {
  color: "rgba(255, 255, 255, 0.84)",
  fontWeight: "400",
  fontSize: "16px"
};
var NSP_TYPING_PRIMARY_BUTTON_TEXT_DEFAULT = {
  color: "#000000",
  fontWeight: "500",
  fontSize: "14px"
};
var NSP_TYPING_SECONDARY_BUTTON_TEXT_DEFAULT = {
  color: "#ffffff",
  fontWeight: "500",
  fontSize: "14px"
};
var NSP_TYPING_WORD_DEFAULT = {
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "56px"
};
var NSP_POKER_EYEBROW_DEFAULT = {
  color: "rgba(17, 17, 17, 0.72)",
  fontWeight: "600",
  fontSize: "12px"
};
var NSP_POKER_HEADING_DEFAULT = {
  color: "#141413",
  fontWeight: "600",
  fontSize: "48px"
};
var NSP_POKER_DESCRIPTION_DEFAULT = {
  color: "rgba(17, 17, 17, 0.62)",
  fontWeight: "400",
  fontSize: "17px"
};
var NSP_MARQUEE_EYEBROW_DEFAULT = {
  color: "rgba(17, 17, 17, 0.68)",
  fontWeight: "600",
  fontSize: "11px"
};
var NSP_MARQUEE_HERO_BADGE_TEXT_DEFAULT = {
  color: "rgba(255, 255, 255, 0.82)",
  fontWeight: "600",
  fontSize: "10px"
};
var NSP_MARQUEE_HEADING_DEFAULT = {
  color: "#141413",
  fontWeight: "600",
  fontSize: "48px"
};
var NSP_MARQUEE_SUBHEADING_DEFAULT = {
  color: "rgba(17, 17, 17, 0.62)",
  fontWeight: "400",
  fontSize: "17px"
};
var NSP_MARQUEE_CARD_TITLE_DEFAULT = {
  color: "#111111",
  fontWeight: "600",
  fontSize: "16px"
};
var NSP_MARQUEE_CARD_SUBTITLE_DEFAULT = {
  color: "rgba(0, 0, 0, 0.58)",
  fontWeight: "400",
  fontSize: "12px"
};
var NSP_FLOATING_SNACK_TITLE_DEFAULT = {
  color: "#0a0a0a",
  fontWeight: "900",
  fontSize: "13.4rem"
};

// src/components/NspSignatureHeroSection/ScrollParallaxSignatureHero.tsx
var POSITIONS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right"
];
var SCROLL_OFFSET = ["start start", "0.75 end"];
var SCROLLABLE_OVERFLOW_VALUES = /* @__PURE__ */ new Set(["auto", "scroll", "overlay"]);
function isScrollableOverflowValue(value) {
  return SCROLLABLE_OVERFLOW_VALUES.has(value.toLowerCase());
}
function isActuallyScrollable(el) {
  return el.clientHeight > 0 && el.scrollHeight - el.clientHeight > 1;
}
function findScrollContainer(el) {
  var _a;
  let parent = (_a = el == null ? void 0 : el.parentElement) != null ? _a : null;
  while (parent) {
    const style = window.getComputedStyle(parent);
    const ox = style.overflow.toLowerCase();
    const oy = style.overflowY.toLowerCase();
    const canScrollByStyle = isScrollableOverflowValue(ox) || isScrollableOverflowValue(oy);
    if (canScrollByStyle && isActuallyScrollable(parent)) {
      return parent;
    }
    if (parent === document.body) break;
    parent = parent.parentElement;
  }
  return null;
}
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = (0, import_react16.useState)(false);
  (0, import_react16.useEffect)(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < breakpoint);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, [breakpoint]);
  return isMobile;
}
function usePrefersReducedMotion2() {
  const [reduced, setReduced] = (0, import_react16.useState)(false);
  (0, import_react16.useEffect)(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}
function parsePosition(raw) {
  const s = String(raw != null ? raw : "").trim();
  if (POSITIONS.includes(s)) return s;
  return "top-left";
}
function FloatingImageCard({
  card,
  index,
  progress,
  isMobile,
  settleLift,
  enableFloatingImages
}) {
  const shouldFloat = enableFloatingImages !== false;
  const floatMultiplier = isMobile ? 0.6 : 1;
  const idleFloatY = [10, 14, 12, 16][index] * floatMultiplier;
  const idleFloatRotate = [0.9, -0.75, 0.85, -0.95][index];
  const idleDuration = [11, 12.5, 11.8, 13][index];
  const startYDesktop = [0, 14, 26, 12][index];
  const startYMobile = [-20, -10, 28, 40][index];
  const startY = isMobile ? startYMobile : startYDesktop;
  const moveUpDistance = isMobile ? [-705, -770, -830, -875][index] : [-985, -1045, -1095, -1140][index];
  const rotateRange = [-6, 5, -4, 6][index];
  const layerDepth = [0.8, 1.1, 0.95, 1.18][index];
  const rawY = (0, import_framer_motion2.useTransform)(
    progress,
    [0, 0.12, 0.3, 0.45, 0.6, 1],
    [
      startY,
      startY - 8,
      startY - 34,
      moveUpDistance,
      moveUpDistance - 24,
      moveUpDistance - 40
    ]
  );
  const rawRotate = (0, import_framer_motion2.useTransform)(
    progress,
    [0, 0.15, 0.45, 1],
    [rotateRange, rotateRange * 0.76, rotateRange * 0.12, 0]
  );
  const rawScale = (0, import_framer_motion2.useTransform)(
    progress,
    [0, 0.15, 0.4, 0.6, 1],
    [1, 1.006, 1.018, 0.982, 0.95]
  );
  const rawOpacity = (0, import_framer_motion2.useTransform)(
    progress,
    [0, 0.38, 0.54, 0.6, 1],
    [1, 1, 0.72, 0.08, 0]
  );
  const rawInnerParallax = (0, import_framer_motion2.useTransform)(
    progress,
    [0, 1],
    [0, isMobile ? -32 * layerDepth : -54 * layerDepth]
  );
  const y = (0, import_framer_motion2.useSpring)(rawY, { stiffness: 60, damping: 24, mass: 0.9 });
  const rotate4 = (0, import_framer_motion2.useSpring)(rawRotate, { stiffness: 54, damping: 22, mass: 0.96 });
  const scale = (0, import_framer_motion2.useSpring)(rawScale, { stiffness: 64, damping: 24, mass: 0.9 });
  const opacity = (0, import_framer_motion2.useSpring)(rawOpacity, { stiffness: 72, damping: 28, mass: 0.84 });
  const innerParallax = (0, import_framer_motion2.useSpring)(rawInnerParallax, {
    stiffness: 40,
    damping: 20,
    mass: 1.08
  });
  const settleOffset = (0, import_framer_motion2.useTransform)(settleLift, (v) => v * layerDepth * 0.7);
  const floatYOffset = (0, import_framer_motion2.useMotionValue)(0);
  const floatRotateOffset = (0, import_framer_motion2.useMotionValue)(0);
  const cardY = (0, import_framer_motion2.useTransform)([y, floatYOffset], ([scrollY, idleY]) => Number(scrollY) + Number(idleY));
  const cardRotate = (0, import_framer_motion2.useTransform)(
    [rotate4, floatRotateOffset],
    ([scrollR, idleR]) => Number(scrollR) + Number(idleR)
  );
  (0, import_react16.useEffect)(() => {
    if (!shouldFloat) {
      floatYOffset.set(0);
      floatRotateOffset.set(0);
      return;
    }
    const animY = (0, import_framer_motion2.animate)(floatYOffset, [0, -idleFloatY, 0, idleFloatY * 0.55, 0], {
      duration: idleDuration,
      repeat: Infinity,
      ease: "easeInOut"
    });
    const animR = (0, import_framer_motion2.animate)(floatRotateOffset, [0, idleFloatRotate, 0, idleFloatRotate * -0.75, 0], {
      duration: idleDuration,
      repeat: Infinity,
      ease: "easeInOut"
    });
    return () => {
      animY.stop();
      animR.stop();
      floatYOffset.set(0);
      floatRotateOffset.set(0);
    };
  }, [shouldFloat, idleFloatY, idleFloatRotate, idleDuration, floatYOffset, floatRotateOffset]);
  return /* @__PURE__ */ import_react16.default.createElement(
    import_framer_motion2.motion.div,
    {
      style: { y: cardY, rotate: cardRotate, scale, opacity },
      className: `ak-nsp-sig-hero__card ak-nsp-sig-hero__card--${card.position}${isMobile ? " ak-nsp-sig-hero__card--mobile" : ""}`
    },
    /* @__PURE__ */ import_react16.default.createElement("div", { className: "ak-nsp-sig-hero__cardInner" }, /* @__PURE__ */ import_react16.default.createElement(import_framer_motion2.motion.div, { style: { y: innerParallax }, className: "ak-nsp-sig-hero__cardParallax" }, card.image ? /* @__PURE__ */ import_react16.default.createElement(
      "img",
      {
        src: card.image,
        alt: card.alt || "",
        className: "ak-nsp-sig-hero__cardImg",
        decoding: "async",
        draggable: false,
        onError: (e) => {
          e.currentTarget.removeAttribute("src");
        }
      }
    ) : /* @__PURE__ */ import_react16.default.createElement("div", { className: "ak-nsp-sig-hero__cardPlaceholder", "aria-hidden": true })), /* @__PURE__ */ import_react16.default.createElement(
      import_framer_motion2.motion.div,
      {
        style: { y: settleOffset },
        className: "ak-nsp-sig-hero__cardShade",
        "aria-hidden": true
      }
    ), /* @__PURE__ */ import_react16.default.createElement("div", { className: "ak-nsp-sig-hero__cardRing", "aria-hidden": true }))
  );
}
function ScrollParallaxSignatureHeroInner({
  section,
  sectionRef,
  scrollRoot,
  theme
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const scrollOpts = (0, import_react16.useMemo)(() => {
    const base = {
      target: sectionRef,
      offset: SCROLL_OFFSET
    };
    if (scrollRoot === window) {
      return base;
    }
    return {
      ...base,
      container: { current: scrollRoot }
    };
  }, [sectionRef, scrollRoot]);
  const { scrollYProgress } = (0, import_framer_motion2.useScroll)(
    scrollOpts
  );
  const p = (_b = (_a = section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const blocks = (_d = (_c = section.settings) == null ? void 0 : _c.blocks) != null ? _d : [];
  const eyebrow = String((_e = p.eyebrow) != null ? _e : "").trim();
  const heading = String((_f = p.heading) != null ? _f : "").trim();
  const description = String((_g = p.description) != null ? _g : "").trim();
  const primaryButtonText = String((_h = p.primaryButtonText) != null ? _h : "").trim();
  const primaryButtonLink = String((_i = p.primaryButtonLink) != null ? _i : "").trim() || "#";
  const secondaryButtonText = String((_j = p.secondaryButtonText) != null ? _j : "").trim();
  const secondaryButtonLink = String((_k = p.secondaryButtonLink) != null ? _k : "").trim() || "#";
  const showSecondaryButton = p.showSecondaryButton !== false;
  const enableScrollMotion = p.enableScrollMotion !== false;
  const backgroundTone = String((_l = p.backgroundTone) != null ? _l : "light");
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion2();
  const progressLogBucketRef = (0, import_react16.useRef)(-1);
  (0, import_react16.useEffect)(() => {
    console.log("Floating enabled:", p.enableFloatingImages);
  }, [p.enableFloatingImages]);
  (0, import_react16.useEffect)(() => {
    const reducedMotionFromMq = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
    if (scrollRoot === window) {
      console.log("[NSP Signature Hero] scroll root: window");
    } else {
      const scrollElement = scrollRoot;
      const cls = scrollElement.className.trim().split(/\s+/).filter(Boolean).join(".");
      console.log(
        "[NSP Signature Hero] scroll root element:",
        `<${scrollElement.tagName.toLowerCase()}${cls ? `.${cls}` : ""}>`
      );
    }
    console.log("[NSP Signature Hero] enableScrollMotion:", enableScrollMotion);
    console.log(
      "[NSP Signature Hero] prefers-reduced-motion:",
      reducedMotionFromMq
    );
  }, [scrollRoot, enableScrollMotion]);
  (0, import_react16.useEffect)(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const bucket = Math.round(latest * 20) / 20;
      if (bucket === progressLogBucketRef.current) return;
      progressLogBucketRef.current = bucket;
      console.log("[NSP Signature Hero] scrollYProgress:", Number(latest.toFixed(3)));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);
  const animProgress = (0, import_framer_motion2.useTransform)(scrollYProgress, (latest) => {
    if (!enableScrollMotion || prefersReducedMotion) return 0;
    return latest;
  });
  const rawTextY = (0, import_framer_motion2.useTransform)(
    animProgress,
    [0, 0.45, 0.6, 0.75, 1],
    [0, 0, -72, -165, -250]
  );
  const rawTextScale = (0, import_framer_motion2.useTransform)(animProgress, [0, 0.45, 0.7, 1], [1, 1, 0.972, 0.93]);
  const rawTextOpacity = (0, import_framer_motion2.useTransform)(animProgress, [0, 0.55, 0.8, 1], [1, 1, 0.72, 0.14]);
  const rawBadgeOpacity = (0, import_framer_motion2.useTransform)(animProgress, [0, 0.55, 0.9, 1], [1, 1, 0.32, 0.18]);
  const rawHaloScale = (0, import_framer_motion2.useTransform)(animProgress, [0, 0.28, 0.55, 1], [1, 1.03, 1.08, 1.12]);
  const rawTextParallax = (0, import_framer_motion2.useTransform)(animProgress, [0, 1], [0, isMobile ? -10 : -18]);
  const textY = (0, import_framer_motion2.useSpring)(rawTextY, { stiffness: 54, damping: 22, mass: 1.02 });
  const textScale = (0, import_framer_motion2.useSpring)(rawTextScale, { stiffness: 58, damping: 24, mass: 0.98 });
  const textOpacity = (0, import_framer_motion2.useSpring)(rawTextOpacity, { stiffness: 66, damping: 26, mass: 0.9 });
  const badgeOpacity = (0, import_framer_motion2.useSpring)(rawBadgeOpacity, { stiffness: 68, damping: 26, mass: 0.86 });
  const haloScale = (0, import_framer_motion2.useSpring)(rawHaloScale, { stiffness: 48, damping: 20, mass: 1.1 });
  const textParallax = (0, import_framer_motion2.useSpring)(rawTextParallax, { stiffness: 40, damping: 18, mass: 1.12 });
  const velocity = (0, import_framer_motion2.useVelocity)(scrollYProgress);
  const velocityAbs = (0, import_framer_motion2.useTransform)(velocity, (v) => Math.min(Math.abs(v) * 90, 1));
  const settleTarget = (0, import_framer_motion2.useTransform)(
    velocityAbs,
    (v) => enableScrollMotion && !prefersReducedMotion ? (1 - v) * -7 : 0
  );
  const settleLift = (0, import_framer_motion2.useSpring)(settleTarget, { stiffness: 90, damping: 20, mass: 0.8 });
  const textPanelOpacity = (0, import_framer_motion2.useTransform)(animProgress, [0, 0.22, 0.5], [0.54, 0.36, 0.18]);
  const textPanelBlur = (0, import_framer_motion2.useTransform)(animProgress, [0, 0.6], [10, 4]);
  const textShadowOpacity = (0, import_framer_motion2.useTransform)(animProgress, [0, 0.35, 0.75], [0.08, 0.12, 0.04]);
  const pointerX = (0, import_framer_motion2.useMotionValue)(0.5);
  const pointerY = (0, import_framer_motion2.useMotionValue)(0.5);
  const lightX = (0, import_framer_motion2.useSpring)((0, import_framer_motion2.useTransform)(pointerX, [0, 1], [38, 62]), {
    stiffness: 80,
    damping: 18,
    mass: 1
  });
  const lightY = (0, import_framer_motion2.useSpring)((0, import_framer_motion2.useTransform)(pointerY, [0, 1], [30, 66]), {
    stiffness: 80,
    damping: 18,
    mass: 1
  });
  const glowStyle = {
    background: (0, import_framer_motion2.useTransform)(
      [lightX, lightY, textPanelOpacity],
      ([x, y, opacity]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,${0.42 + Number(opacity) * 0.18}), rgba(255,255,255,${0.14 + Number(opacity) * 0.1}) 24%, rgba(255,255,255,0.02) 58%, transparent 72%)`
    )
  };
  const descBlur = (0, import_framer_motion2.useTransform)(textPanelBlur, (v) => `blur(${Math.max(v - 2, 2)}px)`);
  const headingBoxShadow = (0, import_framer_motion2.useTransform)(
    textShadowOpacity,
    (v) => `0 22px 70px rgba(255,255,255,${v})`
  );
  const headingBackdrop = (0, import_framer_motion2.useTransform)(textPanelBlur, (v) => `blur(${v}px)`);
  const cards = (0, import_react16.useMemo)(() => {
    const slice = blocks.slice(0, 4);
    return POSITIONS.map((fallbackPos, i) => {
      var _a2, _b2, _c2, _d2, _e2;
      const b = slice[i];
      const bp = (_a2 = b == null ? void 0 : b.props) != null ? _a2 : {};
      const position = parsePosition((_b2 = bp.position) != null ? _b2 : fallbackPos);
      const image = normalizeImageUrl(String((_c2 = bp.image) != null ? _c2 : ""));
      const alt = String((_d2 = bp.alt) != null ? _d2 : "").trim();
      return {
        key: String((_e2 = b == null ? void 0 : b.id) != null ? _e2 : `card-${i + 1}`),
        position,
        image,
        alt
      };
    });
  }, [blocks]);
  const eyebrowStyle = (0, import_react16.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "eyebrow",
        role: "body",
        defaultStyle: NSP_SIG_HERO_EYEBROW_DEFAULT
      })
    ),
    [section, theme]
  );
  const headingStyle = (0, import_react16.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "heading",
        role: "heading",
        defaultStyle: NSP_SIG_HERO_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const descriptionStyle = (0, import_react16.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "description",
        role: "body",
        defaultStyle: NSP_SIG_HERO_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const primaryButtonTextStyle = (0, import_react16.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "primaryButtonText",
        role: "body",
        defaultStyle: NSP_SIG_HERO_PRIMARY_BUTTON_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const secondaryButtonTextStyle = (0, import_react16.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "secondaryButtonText",
        role: "body",
        defaultStyle: NSP_SIG_HERO_SECONDARY_BUTTON_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const rootMods = backgroundTone === "soft-neutral" ? "ak-nsp-sig-hero--tone-soft" : "ak-nsp-sig-hero--tone-light";
  return /* @__PURE__ */ import_react16.default.createElement(import_react16.default.Fragment, null, /* @__PURE__ */ import_react16.default.createElement("div", { className: "ak-nsp-sig-hero__halo", "aria-hidden": true }), /* @__PURE__ */ import_react16.default.createElement("div", { className: "ak-nsp-sig-hero__cards" }, cards.map((c, index) => /* @__PURE__ */ import_react16.default.createElement(
    FloatingImageCard,
    {
      key: c.key,
      card: c,
      index,
      progress: animProgress,
      isMobile,
      settleLift,
      enableFloatingImages: typeof p.enableFloatingImages === "boolean" ? p.enableFloatingImages : void 0
    }
  ))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "ak-nsp-sig-hero__center" }, /* @__PURE__ */ import_react16.default.createElement(
    import_framer_motion2.motion.div,
    {
      style: { y: textY, scale: textScale, opacity: textOpacity },
      className: "ak-nsp-sig-hero__content"
    },
    eyebrow ? /* @__PURE__ */ import_react16.default.createElement(
      import_framer_motion2.motion.div,
      {
        style: { opacity: badgeOpacity, y: settleLift },
        className: "ak-nsp-sig-hero__badge"
      },
      /* @__PURE__ */ import_react16.default.createElement("span", { style: eyebrowStyle }, eyebrow)
    ) : null,
    heading ? /* @__PURE__ */ import_react16.default.createElement(
      import_framer_motion2.motion.div,
      {
        style: {
          y: textParallax,
          boxShadow: headingBoxShadow,
          backdropFilter: headingBackdrop
        },
        className: "ak-nsp-sig-hero__headingShell"
      },
      /* @__PURE__ */ import_react16.default.createElement("h2", { className: "ak-nsp-sig-hero__heading", style: headingStyle }, heading)
    ) : null,
    description ? /* @__PURE__ */ import_react16.default.createElement(
      import_framer_motion2.motion.div,
      {
        style: { y: settleLift, backdropFilter: descBlur },
        className: "ak-nsp-sig-hero__descShell"
      },
      /* @__PURE__ */ import_react16.default.createElement("p", { className: "ak-nsp-sig-hero__desc", style: descriptionStyle }, description)
    ) : null,
    /* @__PURE__ */ import_react16.default.createElement(import_framer_motion2.motion.div, { style: { y: settleLift }, className: "ak-nsp-sig-hero__actions" }, primaryButtonText ? /* @__PURE__ */ import_react16.default.createElement(
      "a",
      {
        className: "ak-nsp-sig-hero__btnPrimary",
        href: primaryButtonLink,
        style: primaryButtonTextStyle
      },
      primaryButtonText
    ) : null, showSecondaryButton && secondaryButtonText ? /* @__PURE__ */ import_react16.default.createElement(
      "a",
      {
        className: "ak-nsp-sig-hero__btnSecondary",
        href: secondaryButtonLink,
        style: secondaryButtonTextStyle
      },
      secondaryButtonText
    ) : null)
  )));
}
function ScrollParallaxSignatureHero({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c, _d;
  const sectionRef = (0, import_react16.useRef)(null);
  const [scrollRoot, setScrollRoot] = (0, import_react16.useState)(null);
  (0, import_react16.useLayoutEffect)(() => {
    var _a2;
    const el = sectionRef.current;
    if (!el) {
      setScrollRoot(window);
      return;
    }
    setScrollRoot((_a2 = findScrollContainer(el)) != null ? _a2 : window);
  }, []);
  const p = (_b = (_a = section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const sectionHeight = String((_c = p.sectionHeight) != null ? _c : "260vh").trim() || "260vh";
  const backgroundTone = String((_d = p.backgroundTone) != null ? _d : "light");
  if (section.enabled === false) {
    return null;
  }
  const rootMods = backgroundTone === "soft-neutral" ? "ak-nsp-sig-hero--tone-soft" : "ak-nsp-sig-hero--tone-light";
  return /* @__PURE__ */ import_react16.default.createElement(
    "section",
    {
      ref: sectionRef,
      className: `ak-nsp-sig-hero ak-nsp-sig-hero--scroll ${rootMods}`,
      style: { height: sectionHeight, ...sectionAppearanceStyle(appearance) }
    },
    /* @__PURE__ */ import_react16.default.createElement("div", { className: "ak-nsp-sig-hero__sticky" }, scrollRoot !== null ? /* @__PURE__ */ import_react16.default.createElement(
      ScrollParallaxSignatureHeroInner,
      {
        section,
        sectionRef,
        scrollRoot,
        theme
      }
    ) : null)
  );
}

// src/components/NspSignatureHeroSection/FullImageTypingHero.tsx
var import_react17 = __toESM(require("react"));
var TYPING_SPEED_MS = 90;
var DELETING_SPEED_MS = 50;
var PAUSE_DURATION_MS = 1200;
var MAX_FONT_SIZE_PX = 90;
var MIN_FONT_SIZE_PX = 28;
var FALLBACK_TYPING_WORD = "Mithai";
function adjustFontSize(el, max, min) {
  if (!el) return;
  let size = max;
  el.style.fontSize = `${size}px`;
  while (el.scrollWidth > el.offsetWidth && size > min) {
    size -= 1;
    el.style.fontSize = `${size}px`;
  }
}
function FullImageTypingHero({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const props = (_b = (_a = section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const blocks = (_d = (_c = section.settings) == null ? void 0 : _c.blocks) != null ? _d : [];
  const backgroundImage = normalizeImageUrl(props.backgroundImage);
  const backgroundAlt = String((_e = props.backgroundAlt) != null ? _e : "Hero background").trim() || "Hero background";
  const staticHeading = String((_f = props.staticHeading) != null ? _f : "").trim();
  const description = String((_g = props.description) != null ? _g : "").trim();
  const primaryButtonText = String((_h = props.primaryButtonText) != null ? _h : "").trim();
  const primaryButtonLink = String((_i = props.primaryButtonLink) != null ? _i : "").trim();
  const secondaryButtonText = String((_j = props.secondaryButtonText) != null ? _j : "").trim();
  const secondaryButtonLink = String((_k = props.secondaryButtonLink) != null ? _k : "").trim();
  const showSecondaryButton = props.showSecondaryButton !== false;
  const words = (0, import_react17.useMemo)(() => {
    const list = (Array.isArray(blocks) ? blocks : []).map((b) => {
      var _a2, _b2;
      return String((_b2 = (_a2 = b == null ? void 0 : b.props) == null ? void 0 : _a2.text) != null ? _b2 : "").trim();
    }).filter(Boolean);
    return list.length > 0 ? list : [FALLBACK_TYPING_WORD];
  }, [blocks]);
  const wordsKey = words.join("");
  const [wordIndex, setWordIndex] = (0, import_react17.useState)(0);
  const [displayedText, setDisplayedText] = (0, import_react17.useState)("");
  const [isDeleting, setIsDeleting] = (0, import_react17.useState)(false);
  const dynamicRef = (0, import_react17.useRef)(null);
  const staticRef = (0, import_react17.useRef)(null);
  const pauseTimeoutRef = (0, import_react17.useRef)(null);
  (0, import_react17.useEffect)(() => {
    setWordIndex(0);
    setDisplayedText("");
    setIsDeleting(false);
  }, [wordsKey]);
  (0, import_react17.useEffect)(() => {
    if (!words.length) {
      return;
    }
    const currentWord = words[wordIndex % words.length];
    const speed = isDeleting ? DELETING_SPEED_MS : TYPING_SPEED_MS;
    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, displayedText.length + 1);
        setDisplayedText(next);
        if (next === currentWord) {
          if (pauseTimeoutRef.current !== null) {
            window.clearTimeout(pauseTimeoutRef.current);
          }
          pauseTimeoutRef.current = window.setTimeout(() => {
            pauseTimeoutRef.current = null;
            setIsDeleting(true);
          }, PAUSE_DURATION_MS);
        }
      } else {
        const next = currentWord.slice(0, displayedText.length - 1);
        setDisplayedText(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);
    return () => {
      window.clearTimeout(timer);
      if (pauseTimeoutRef.current !== null) {
        window.clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    };
  }, [displayedText, isDeleting, wordIndex, words]);
  (0, import_react17.useEffect)(() => {
    const resize = () => {
      adjustFontSize(staticRef.current, MAX_FONT_SIZE_PX, MIN_FONT_SIZE_PX);
      adjustFontSize(dynamicRef.current, MAX_FONT_SIZE_PX, MIN_FONT_SIZE_PX);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [displayedText, staticHeading, wordsKey]);
  const staticHeadingStyle = (0, import_react17.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "staticHeading",
        role: "heading",
        defaultStyle: NSP_TYPING_STATIC_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const typingWordStyle = (0, import_react17.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "typingWord",
        role: "heading",
        defaultStyle: NSP_TYPING_WORD_DEFAULT
      })
    ),
    [section, theme]
  );
  const descriptionStyle = (0, import_react17.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "description",
        role: "body",
        defaultStyle: NSP_TYPING_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const primaryButtonTextStyle = (0, import_react17.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "primaryButtonText",
        role: "body",
        defaultStyle: NSP_TYPING_PRIMARY_BUTTON_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const secondaryButtonTextStyle = (0, import_react17.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "secondaryButtonText",
        role: "body",
        defaultStyle: NSP_TYPING_SECONDARY_BUTTON_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const headingLineBaseStyle = {
    fontSize: `${MAX_FONT_SIZE_PX}px`
  };
  if (section.enabled === false) {
    return null;
  }
  const primaryHref = primaryButtonLink || "#";
  const secondaryHref = secondaryButtonLink || "#";
  return /* @__PURE__ */ import_react17.default.createElement("section", { className: "ak-nsp-typing-hero", style: sectionAppearanceStyle(appearance) }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "ak-nsp-typing-hero__bg", "aria-hidden": !backgroundImage }, backgroundImage ? /* @__PURE__ */ import_react17.default.createElement(
    "img",
    {
      className: "ak-nsp-typing-hero__bg-img",
      src: backgroundImage,
      alt: backgroundAlt
    }
  ) : null, /* @__PURE__ */ import_react17.default.createElement("div", { className: "ak-nsp-typing-hero__overlay-solid" }), /* @__PURE__ */ import_react17.default.createElement("div", { className: "ak-nsp-typing-hero__overlay-gradient" })), /* @__PURE__ */ import_react17.default.createElement("div", { className: "ak-nsp-typing-hero__inner" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "ak-nsp-typing-hero__content" }, staticHeading ? /* @__PURE__ */ import_react17.default.createElement(
    "div",
    {
      ref: staticRef,
      className: "ak-nsp-typing-hero__line",
      style: { ...staticHeadingStyle, ...headingLineBaseStyle }
    },
    staticHeading
  ) : null, words.length > 0 ? /* @__PURE__ */ import_react17.default.createElement(
    "div",
    {
      ref: dynamicRef,
      className: "ak-nsp-typing-hero__line ak-nsp-typing-hero__line--dynamic",
      style: { ...typingWordStyle, ...headingLineBaseStyle }
    },
    displayedText,
    /* @__PURE__ */ import_react17.default.createElement("span", { className: "ak-nsp-typing-hero__cursor", "aria-hidden": true })
  ) : null, description ? /* @__PURE__ */ import_react17.default.createElement("p", { className: "ak-nsp-typing-hero__desc", style: descriptionStyle }, description) : null, primaryButtonText || showSecondaryButton && secondaryButtonText ? /* @__PURE__ */ import_react17.default.createElement("div", { className: "ak-nsp-typing-hero__actions" }, primaryButtonText ? /* @__PURE__ */ import_react17.default.createElement(
    "a",
    {
      className: "ak-nsp-typing-hero__btn ak-nsp-typing-hero__btn--primary",
      href: primaryHref,
      style: primaryButtonTextStyle
    },
    primaryButtonText
  ) : null, showSecondaryButton && secondaryButtonText ? /* @__PURE__ */ import_react17.default.createElement(
    "a",
    {
      className: "ak-nsp-typing-hero__btn ak-nsp-typing-hero__btn--secondary",
      href: secondaryHref,
      style: secondaryButtonTextStyle
    },
    secondaryButtonText
  ) : null) : null)));
}

// src/components/NspSignatureHeroSection/PokerRowRevealHero.tsx
var import_react18 = __toESM(require("react"));
var import_framer_motion3 = require("framer-motion");
var CARD_COUNT = 5;
var SCROLL_OFFSET2 = ["start start", "end end"];
var SCROLLABLE_OVERFLOW_VALUES2 = /* @__PURE__ */ new Set(["auto", "scroll", "overlay"]);
var FALLBACK_CARDS = [
  {
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
    alt: "Luxury packaging showcase"
  },
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    alt: "Brand card showcase"
  },
  {
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1600&q=80",
    alt: "Label design showcase"
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    alt: "Printed collateral showcase"
  },
  {
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
    alt: "Bag packaging showcase"
  }
];
function isScrollableOverflowValue2(value) {
  return SCROLLABLE_OVERFLOW_VALUES2.has(value.toLowerCase());
}
function isActuallyScrollable2(el) {
  return el.clientHeight > 0 && el.scrollHeight - el.clientHeight > 1;
}
function findScrollContainer2(el) {
  var _a;
  let parent = (_a = el == null ? void 0 : el.parentElement) != null ? _a : null;
  while (parent) {
    const style = window.getComputedStyle(parent);
    const ox = style.overflow.toLowerCase();
    const oy = style.overflowY.toLowerCase();
    const canScrollByStyle = isScrollableOverflowValue2(ox) || isScrollableOverflowValue2(oy);
    if (canScrollByStyle && isActuallyScrollable2(parent)) {
      return parent;
    }
    if (parent === document.body) break;
    parent = parent.parentElement;
  }
  return null;
}
function useIsMobile2(breakpoint = 640) {
  const [isMobile, setIsMobile] = (0, import_react18.useState)(false);
  import_react18.default.useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < breakpoint);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, [breakpoint]);
  return isMobile;
}
function SafeImageCard({ image, alt }) {
  const [failed, setFailed] = (0, import_react18.useState)(false);
  const hasImage = Boolean(image) && !failed;
  return /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__cardSurface" }, hasImage ? /* @__PURE__ */ import_react18.default.createElement(
    "img",
    {
      src: image,
      alt,
      className: "ak-nsp-poker-hero__cardImg",
      decoding: "async",
      draggable: false,
      onError: () => setFailed(true)
    }
  ) : /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__cardPlaceholder", "aria-hidden": true }, /* @__PURE__ */ import_react18.default.createElement("span", null, "No image")));
}
function SpreadCard({
  card,
  index,
  openProgress,
  spreadOpacity,
  spreadScale,
  isMobile
}) {
  const desktopOffsets = [-280, -140, 0, 140, 280];
  const mobileOffsets = [-100, -50, 0, 50, 100];
  const desktopRotations = [-8, -4, 0, 4, 8];
  const mobileRotations = [-6, -3, 0, 3, 6];
  const x = (0, import_framer_motion3.useTransform)(
    openProgress,
    [0, 1],
    [0, isMobile ? mobileOffsets[index] : desktopOffsets[index]]
  );
  const rotate4 = (0, import_framer_motion3.useTransform)(
    openProgress,
    [0, 1],
    [0, isMobile ? mobileRotations[index] : desktopRotations[index]]
  );
  const eachScale = (0, import_framer_motion3.useTransform)(
    openProgress,
    [0, 1],
    [1, index === 2 ? 1.01 : 0.975]
  );
  const zIndex = index === 2 ? 30 : 20 - Math.abs(2 - index);
  return /* @__PURE__ */ import_react18.default.createElement(
    import_framer_motion3.motion.div,
    {
      className: "ak-nsp-poker-hero__spreadCardWrap",
      style: { opacity: spreadOpacity, scale: spreadScale, zIndex }
    },
    /* @__PURE__ */ import_react18.default.createElement(
      import_framer_motion3.motion.div,
      {
        className: "ak-nsp-poker-hero__spreadCard",
        style: { x, rotate: rotate4, scale: eachScale }
      },
      /* @__PURE__ */ import_react18.default.createElement(SafeImageCard, { image: card.image, alt: card.alt })
    )
  );
}
function PokerSpread({
  cards,
  progress,
  isMobile
}) {
  var _a, _b;
  const smooth = (0, import_framer_motion3.useSpring)(progress, {
    stiffness: 130,
    damping: 30,
    mass: 0.95
  });
  const flip = (0, import_framer_motion3.useTransform)(smooth, [0, 0.18, 0.34], [0, 88, 180]);
  const singleOpacity = (0, import_framer_motion3.useTransform)(smooth, [0, 0.12, 0.24], [1, 1, 0]);
  const openProgress = (0, import_framer_motion3.useTransform)(smooth, [0.24, 0.58, 1], [0, 1, 1]);
  const spreadOpacity = (0, import_framer_motion3.useTransform)(openProgress, [0, 0.12, 1], [0, 1, 1]);
  const spreadScale = (0, import_framer_motion3.useTransform)(openProgress, [0, 0.2, 1], [0.95, 1, 1]);
  return /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__cardStack" }, cards.map((card, index) => /* @__PURE__ */ import_react18.default.createElement(
    SpreadCard,
    {
      key: card.key,
      card,
      index,
      openProgress,
      spreadOpacity,
      spreadScale,
      isMobile
    }
  )), /* @__PURE__ */ import_react18.default.createElement(
    import_framer_motion3.motion.div,
    {
      className: "ak-nsp-poker-hero__singleFlip",
      style: { rotateY: flip, opacity: singleOpacity }
    },
    /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__singleFace ak-nsp-poker-hero__singleFace--front" }, /* @__PURE__ */ import_react18.default.createElement(SafeImageCard, { image: ((_a = cards[2]) == null ? void 0 : _a.image) || "", alt: ((_b = cards[2]) == null ? void 0 : _b.alt) || "" }), /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__frontShade" }), /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__frontMeta" }, /* @__PURE__ */ import_react18.default.createElement("p", null, "FEATURED SHOWCASE"), /* @__PURE__ */ import_react18.default.createElement("h3", null, "One card flips, then opens into the row."))),
    /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__singleFace ak-nsp-poker-hero__singleFace--back" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__backInner" }, /* @__PURE__ */ import_react18.default.createElement("p", null, "OPENING THE COLLECTION"), /* @__PURE__ */ import_react18.default.createElement("p", null, "Scroll down to open. Scroll up to close.")))
  ));
}
function PokerRowRevealHeroInner({
  section,
  sectionRef,
  scrollRoot,
  theme
}) {
  var _a, _b, _c, _d, _e, _f, _g;
  const p = (_b = (_a = section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const blocks = (_d = (_c = section.settings) == null ? void 0 : _c.blocks) != null ? _d : [];
  const isMobile = useIsMobile2();
  const scrollOpts = (0, import_react18.useMemo)(() => {
    const base = {
      target: sectionRef,
      offset: SCROLL_OFFSET2
    };
    if (scrollRoot === window) return base;
    return {
      ...base,
      container: { current: scrollRoot }
    };
  }, [sectionRef, scrollRoot]);
  const { scrollYProgress } = (0, import_framer_motion3.useScroll)(
    scrollOpts
  );
  const pinnedProgress = (0, import_framer_motion3.useTransform)(scrollYProgress, [0.08, 0.55, 1], [0, 1, 1]);
  const cards = (0, import_react18.useMemo)(() => {
    return Array.from({ length: CARD_COUNT }).map((_, i) => {
      var _a2, _b2, _c2, _d2;
      const b = blocks[i];
      const bp = (_a2 = b == null ? void 0 : b.props) != null ? _a2 : {};
      const image = normalizeImageUrl(String((_b2 = bp.image) != null ? _b2 : "")) || FALLBACK_CARDS[i].image;
      const alt = String((_c2 = bp.alt) != null ? _c2 : "").trim() || FALLBACK_CARDS[i].alt;
      return {
        key: String((_d2 = b == null ? void 0 : b.id) != null ? _d2 : `poker-reveal-card-${i + 1}`),
        image,
        alt
      };
    });
  }, [blocks]);
  const eyebrow = String((_e = p.eyebrow) != null ? _e : "").trim();
  const heading = String((_f = p.heading) != null ? _f : "").trim();
  const description = String((_g = p.description) != null ? _g : "").trim();
  const showSparklesIcon = p.showSparklesIcon !== false;
  const eyebrowStyle = (0, import_react18.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "eyebrow",
        role: "body",
        defaultStyle: NSP_POKER_EYEBROW_DEFAULT
      })
    ),
    [section, theme]
  );
  const headingStyle = (0, import_react18.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "heading",
        role: "heading",
        defaultStyle: NSP_POKER_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const descriptionStyle = (0, import_react18.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "description",
        role: "body",
        defaultStyle: NSP_POKER_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  return /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__sticky" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__inner" }, /* @__PURE__ */ import_react18.default.createElement(
    import_framer_motion3.motion.div,
    {
      initial: { opacity: 0, y: 22 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.35 },
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      className: "ak-nsp-poker-hero__copy"
    },
    (showSparklesIcon || eyebrow) && /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__eyebrow", style: eyebrowStyle }, showSparklesIcon ? /* @__PURE__ */ import_react18.default.createElement("span", { "aria-hidden": true, className: "ak-nsp-poker-hero__eyebrowIcon" }, "*") : null, eyebrow),
    heading ? /* @__PURE__ */ import_react18.default.createElement("h2", { className: "ak-nsp-poker-hero__heading", style: headingStyle }, heading) : null,
    description ? /* @__PURE__ */ import_react18.default.createElement("p", { className: "ak-nsp-poker-hero__description", style: descriptionStyle }, description) : null
  ), /* @__PURE__ */ import_react18.default.createElement("div", { className: "ak-nsp-poker-hero__cardsWrap" }, /* @__PURE__ */ import_react18.default.createElement(PokerSpread, { cards, progress: pinnedProgress, isMobile }))));
}
function PokerRowRevealHero({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c;
  const sectionRef = (0, import_react18.useRef)(null);
  const [scrollRoot, setScrollRoot] = (0, import_react18.useState)(null);
  const p = (_b = (_a = section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const sectionHeight = String((_c = p.sectionHeight) != null ? _c : "200vh").trim() || "200vh";
  (0, import_react18.useLayoutEffect)(() => {
    var _a2;
    const el = sectionRef.current;
    if (!el) {
      setScrollRoot(window);
      return;
    }
    setScrollRoot((_a2 = findScrollContainer2(el)) != null ? _a2 : window);
  }, []);
  if (section.enabled === false) return null;
  return /* @__PURE__ */ import_react18.default.createElement(
    "section",
    {
      ref: sectionRef,
      className: "ak-nsp-poker-hero",
      style: { height: sectionHeight, ...sectionAppearanceStyle(appearance) }
    },
    scrollRoot ? /* @__PURE__ */ import_react18.default.createElement(
      PokerRowRevealHeroInner,
      {
        section,
        sectionRef,
        scrollRoot,
        theme
      }
    ) : null
  );
}

// src/components/NspSignatureHeroSection/NSPSignatureHeroMarquee.tsx
var import_react19 = __toESM(require("react"));
var import_framer_motion4 = require("framer-motion");
function SparklesIcon() {
  return /* @__PURE__ */ import_react19.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, className: "ak-nsp-marquee-hero__sparklesIcon" }, /* @__PURE__ */ import_react19.default.createElement(
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ), /* @__PURE__ */ import_react19.default.createElement("path", { d: "M20 2v4", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ import_react19.default.createElement("path", { d: "M22 4h-4", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ import_react19.default.createElement("circle", { cx: "4", cy: "20", r: "2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }));
}
function BadgeCheckIcon() {
  return /* @__PURE__ */ import_react19.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, className: "ak-nsp-marquee-hero__badgeCheckIcon" }, /* @__PURE__ */ import_react19.default.createElement(
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ), /* @__PURE__ */ import_react19.default.createElement("path", { d: "m9 12 2 2 4-4", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }));
}
function toOverlayOpacity(raw) {
  const num = Number(raw);
  if (!Number.isFinite(num)) return 0.4;
  return Math.min(0.8, Math.max(0, num));
}
function MarqueeCard({
  item,
  index,
  cardTitleStyle,
  cardSubtitleStyle
}) {
  const cardBody = /* @__PURE__ */ import_react19.default.createElement(
    import_framer_motion4.motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.25 },
      transition: { duration: 0.45, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] },
      className: "ak-nsp-marquee-hero__marqueeCard"
    },
    /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__marqueeMediaWrap" }, item.image ? /* @__PURE__ */ import_react19.default.createElement(
      "img",
      {
        src: item.image,
        alt: item.title || "",
        className: "ak-nsp-marquee-hero__marqueeImage",
        decoding: "async",
        loading: "lazy",
        draggable: false,
        onError: (e) => {
          e.currentTarget.removeAttribute("src");
        }
      }
    ) : /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__marqueeImagePlaceholder", "aria-hidden": true }), /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__marqueeGradient" })),
    /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__marqueeMeta" }, item.title ? /* @__PURE__ */ import_react19.default.createElement("h3", { style: cardTitleStyle }, item.title) : null, item.subtitle ? /* @__PURE__ */ import_react19.default.createElement("p", { style: cardSubtitleStyle }, item.subtitle) : null)
  );
  if (item.link) {
    return /* @__PURE__ */ import_react19.default.createElement(
      "a",
      {
        href: item.link,
        className: "ak-nsp-marquee-hero__marqueeCardLink",
        "aria-label": item.title || "Marquee card link"
      },
      cardBody
    );
  }
  return cardBody;
}
function NSPSignatureHeroMarquee({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const props = (_b = (_a = section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const rawBlocks = Array.isArray((_c = section.settings) == null ? void 0 : _c.blocks) ? section.settings.blocks : [];
  const eyebrow = String((_d = props.eyebrow) != null ? _d : "").trim();
  const heading = String((_e = props.heading) != null ? _e : "").trim();
  const subheading = String((_f = props.subheading) != null ? _f : "").trim();
  const heroBadgeText = String((_g = props.heroBadgeText) != null ? _g : "").trim();
  const heroImage = normalizeImageUrl(String((_h = props.heroImage) != null ? _h : ""));
  const heroImageAlt = String((_i = props.heroImageAlt) != null ? _i : "").trim() || "NSP signature hero image";
  const overlayOpacity = toOverlayOpacity(props.overlayOpacity);
  const bottomStripEyebrow = String((_j = props.bottomStripEyebrow) != null ? _j : "").trim();
  const bottomStripText = String((_k = props.bottomStripText) != null ? _k : "").trim();
  const bottomStripItemsText = String((_l = props.bottomStripItemsText) != null ? _l : "").trim();
  const showBottomStrip = Boolean(bottomStripEyebrow || bottomStripText || bottomStripItemsText);
  const marqueeCards = (0, import_react19.useMemo)(() => {
    const baseCards = rawBlocks.filter((block) => block && typeof block === "object").map((block, index) => {
      var _a2, _b2, _c2, _d2, _e2, _f2;
      const blockProps = (_a2 = block.props) != null ? _a2 : {};
      return {
        key: String((_b2 = block.id) != null ? _b2 : `nsp-marquee-card-${index + 1}`),
        title: String((_c2 = blockProps.title) != null ? _c2 : "").trim(),
        subtitle: String((_d2 = blockProps.subtitle) != null ? _d2 : "").trim(),
        image: normalizeImageUrl(String((_e2 = blockProps.image) != null ? _e2 : "")),
        link: String((_f2 = blockProps.link) != null ? _f2 : "").trim()
      };
    });
    if (baseCards.length === 0) return [];
    const minimumLoopCards = baseCards.length === 1 ? [...baseCards, { ...baseCards[0], key: `${baseCards[0].key}-clone` }] : baseCards;
    return [...minimumLoopCards, ...minimumLoopCards].map((item, index) => ({
      ...item,
      key: `${item.key}-${index}`
    }));
  }, [rawBlocks]);
  const eyebrowStyle = (0, import_react19.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "eyebrow",
        role: "body",
        defaultStyle: NSP_MARQUEE_EYEBROW_DEFAULT
      })
    ),
    [section, theme]
  );
  const heroBadgeTextStyle = (0, import_react19.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "heroBadgeText",
        role: "body",
        defaultStyle: NSP_MARQUEE_HERO_BADGE_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const headingStyle = (0, import_react19.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "heading",
        role: "heading",
        defaultStyle: NSP_MARQUEE_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const subheadingStyle = (0, import_react19.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "subheading",
        role: "body",
        defaultStyle: NSP_MARQUEE_SUBHEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const marqueeCardTitleStyle = (0, import_react19.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "marqueeCardTitle",
        role: "heading",
        defaultStyle: NSP_MARQUEE_CARD_TITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  const marqueeCardSubtitleStyle = (0, import_react19.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "marqueeCardSubtitle",
        role: "body",
        defaultStyle: NSP_MARQUEE_CARD_SUBTITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  if (section.enabled === false) return null;
  return /* @__PURE__ */ import_react19.default.createElement("section", { className: "ak-nsp-marquee-hero", style: sectionAppearanceStyle(appearance) }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__inner" }, /* @__PURE__ */ import_react19.default.createElement(
    import_framer_motion4.motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.35 },
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      className: "ak-nsp-marquee-hero__copy"
    },
    eyebrow ? /* @__PURE__ */ import_react19.default.createElement("p", { className: "ak-nsp-marquee-hero__eyebrow", style: eyebrowStyle }, /* @__PURE__ */ import_react19.default.createElement(SparklesIcon, null), /* @__PURE__ */ import_react19.default.createElement("span", null, eyebrow)) : null,
    heading ? /* @__PURE__ */ import_react19.default.createElement("h2", { className: "ak-nsp-marquee-hero__heading", style: headingStyle }, heading) : null,
    subheading ? /* @__PURE__ */ import_react19.default.createElement("p", { className: "ak-nsp-marquee-hero__subheading", style: subheadingStyle }, subheading) : null
  ), /* @__PURE__ */ import_react19.default.createElement(
    import_framer_motion4.motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.25 },
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
      className: "ak-nsp-marquee-hero__heroMedia"
    },
    heroImage ? /* @__PURE__ */ import_react19.default.createElement(
      "img",
      {
        src: heroImage,
        alt: heroImageAlt,
        className: "ak-nsp-marquee-hero__heroImage",
        decoding: "async",
        loading: "lazy",
        onError: (e) => {
          e.currentTarget.removeAttribute("src");
        }
      }
    ) : /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__heroImagePlaceholder", "aria-hidden": true }),
    /* @__PURE__ */ import_react19.default.createElement(
      "div",
      {
        className: "ak-nsp-marquee-hero__heroImageOverlay",
        style: { opacity: overlayOpacity }
      }
    ),
    heroBadgeText ? /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__heroMediaBadge", style: heroBadgeTextStyle }, heroBadgeText) : null
  ), marqueeCards.length > 0 ? /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__marqueeViewport" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__marqueeTrack" }, marqueeCards.map((item, index) => /* @__PURE__ */ import_react19.default.createElement(
    MarqueeCard,
    {
      key: item.key,
      item,
      index,
      cardTitleStyle: marqueeCardTitleStyle,
      cardSubtitleStyle: marqueeCardSubtitleStyle
    }
  )))) : null, showBottomStrip ? /* @__PURE__ */ import_react19.default.createElement(
    import_framer_motion4.motion.div,
    {
      initial: { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.35 },
      transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
      className: "ak-nsp-marquee-hero__bottomStrip"
    },
    /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__bottomStripLeft" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__bottomStripIconWrap" }, /* @__PURE__ */ import_react19.default.createElement(BadgeCheckIcon, null)), /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__bottomStripContent" }, bottomStripEyebrow ? /* @__PURE__ */ import_react19.default.createElement("p", null, bottomStripEyebrow) : null, bottomStripText ? /* @__PURE__ */ import_react19.default.createElement("h3", null, bottomStripText) : null)),
    bottomStripItemsText ? /* @__PURE__ */ import_react19.default.createElement("div", { className: "ak-nsp-marquee-hero__bottomStripItems" }, bottomStripItemsText) : null
  ) : null));
}

// src/components/NspSignatureHeroSection/FloatingSnackGalleryHero.tsx
var import_react20 = __toESM(require("react"));
var import_framer_motion5 = require("framer-motion");
var MAX_RENDER_TILES = 12;
var SCROLL_HINT_TEXT = "Scroll to reveal";
var IMAGE_ALT_PREFIX = "Gallery image";
var SCROLL_OFFSET3 = ["start start", "end end"];
var SCROLLABLE_OVERFLOW_VALUES3 = /* @__PURE__ */ new Set(["auto", "scroll", "overlay"]);
var TILE_CENTER_TRANSFORM = "translate(-50%, -50%)";
var FALLBACK_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=78"
];
var desktopLayouts = [
  { x: -0.39, y: -0.28, r: -7 },
  { x: -0.14, y: -0.34, r: 5 },
  { x: 0.13, y: -0.3, r: -4 },
  { x: 0.38, y: -0.23, r: 6 },
  { x: -0.43, y: -0.01, r: 4 },
  { x: -0.17, y: 0.05, r: -3 },
  { x: 0.17, y: 0.03, r: 4 },
  { x: 0.41, y: 0.01, r: -5 },
  { x: -0.32, y: 0.3, r: -5 },
  { x: -0.04, y: 0.34, r: 4 },
  { x: 0.23, y: 0.28, r: -4 },
  { x: 0.43, y: 0.24, r: 5 }
];
var mobileLayouts = [
  { x: -0.35, y: -0.38, r: 5 },
  { x: 0, y: -0.36, r: -4 },
  { x: 0.35, y: -0.38, r: 5 },
  { x: -0.34, y: -0.18, r: -5 },
  { x: 0.18, y: -0.16, r: 4 },
  { x: -0.16, y: -0.06, r: -3 },
  { x: 0.18, y: 0.06, r: 3 },
  { x: -0.32, y: 0.17, r: 5 },
  { x: 0.34, y: 0.18, r: -5 },
  { x: -0.35, y: 0.38, r: 5 },
  { x: 0, y: 0.36, r: -4 },
  { x: 0.35, y: 0.38, r: 5 }
];
function isScrollableOverflowValue3(value) {
  return SCROLLABLE_OVERFLOW_VALUES3.has(value.toLowerCase());
}
function isActuallyScrollable3(el) {
  return el.clientHeight > 0 && el.scrollHeight - el.clientHeight > 1;
}
function findScrollContainer3(el) {
  var _a;
  let parent = (_a = el == null ? void 0 : el.parentElement) != null ? _a : null;
  while (parent) {
    const style = window.getComputedStyle(parent);
    const ox = style.overflow.toLowerCase();
    const oy = style.overflowY.toLowerCase();
    if ((isScrollableOverflowValue3(ox) || isScrollableOverflowValue3(oy)) && isActuallyScrollable3(parent)) {
      return parent;
    }
    if (parent === document.body) break;
    parent = parent.parentElement;
  }
  return null;
}
function readBlockFields(block) {
  var _a, _b, _c, _d, _e;
  const nested = (block == null ? void 0 : block.props) && typeof block.props === "object" ? block.props : {};
  return {
    image: resolveBlockImageUrl((_a = nested.image) != null ? _a : block == null ? void 0 : block.image),
    altText: String(
      (_e = (_d = (_c = (_b = nested.altText) != null ? _b : nested.alt) != null ? _c : block == null ? void 0 : block.altText) != null ? _d : block == null ? void 0 : block.alt) != null ? _e : ""
    ).trim()
  };
}
function buildGalleryTiles(blocks) {
  const tiles = [];
  if (Array.isArray(blocks)) {
    for (let i = 0; i < blocks.length && tiles.length < MAX_RENDER_TILES; i += 1) {
      const block = blocks[i];
      const { image, altText } = readBlockFields(block);
      if (!image) continue;
      tiles.push({
        key: (block == null ? void 0 : block.id) || `gallery-tile-${i}`,
        src: image,
        alt: altText || `${IMAGE_ALT_PREFIX} ${tiles.length + 1}`
      });
    }
  }
  if (tiles.length > 0) return tiles;
  return FALLBACK_GALLERY_IMAGES.slice(0, MAX_RENDER_TILES).map((src, index) => ({
    key: `gallery-fallback-${index}`,
    src,
    alt: `${IMAGE_ALT_PREFIX} ${index + 1}`
  }));
}
function useTileMotion(progress, index, target, containerWidth, containerHeight) {
  const fromLeft = index % 2 === 0;
  const start = 0.025 + index * 0.018;
  const settle = start + 0.22;
  const hold = Math.min(settle + 0.2, 1);
  const safeWidth = Math.max(containerWidth, 1);
  const safeHeight = Math.max(containerHeight, 1);
  const startX = (fromLeft ? -1 : 1) * safeWidth * 1.18;
  const startY = (index < 6 ? -1 : 1) * safeHeight * 0.07;
  const targetX = safeWidth * target.x;
  const targetY = safeHeight * target.y;
  const xRaw = (0, import_framer_motion5.useTransform)(
    progress,
    [start, settle, hold],
    [startX, targetX, targetX]
  );
  const yRaw = (0, import_framer_motion5.useTransform)(
    progress,
    [start, settle, hold],
    [startY, targetY, targetY]
  );
  const rotateRaw = (0, import_framer_motion5.useTransform)(progress, [start, settle], [fromLeft ? -12 : 12, target.r]);
  const scaleRaw = (0, import_framer_motion5.useTransform)(progress, [start, settle], [0.72, 0.75]);
  const opacityRaw = (0, import_framer_motion5.useTransform)(progress, [start, start + 0.055, settle], [0, 1, 1]);
  return {
    x: (0, import_framer_motion5.useSpring)(xRaw, { stiffness: 108, damping: 27, mass: 0.72 }),
    y: (0, import_framer_motion5.useSpring)(yRaw, { stiffness: 108, damping: 27, mass: 0.72 }),
    rotate: (0, import_framer_motion5.useSpring)(rotateRaw, { stiffness: 116, damping: 27, mass: 0.72 }),
    scale: (0, import_framer_motion5.useSpring)(scaleRaw, { stiffness: 116, damping: 27, mass: 0.72 }),
    opacity: (0, import_framer_motion5.useSpring)(opacityRaw, { stiffness: 140, damping: 24, mass: 0.55 })
  };
}
var TileShell = (0, import_react20.memo)(function TileShell2({
  src,
  alt,
  index,
  isMobile = false
}) {
  const driftY = index % 3 === 0 ? 12 : index % 3 === 1 ? -10 : 9;
  const driftX = index % 4 === 0 ? 6 : index % 4 === 1 ? -5 : index % 4 === 2 ? 4 : -6;
  const driftRotate = index % 2 === 0 ? 1.8 : -1.8;
  const duration = 5.8 + index % 5 * 0.45;
  return /* @__PURE__ */ import_react20.default.createElement(
    import_framer_motion5.motion.div,
    {
      animate: {
        y: [0, driftY, 0],
        x: [0, driftX, 0],
        rotate: [0, driftRotate, 0]
      },
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.12
      },
      className: `tile-shell ${isMobile ? "mobile" : "desktop"}`
    },
    /* @__PURE__ */ import_react20.default.createElement("img", { src, alt, loading: index < 4 ? "eager" : "lazy", decoding: "async" }),
    /* @__PURE__ */ import_react20.default.createElement("div", { className: "tile-overlay" }),
    /* @__PURE__ */ import_react20.default.createElement("div", { className: "tile-ring" }),
    !isMobile ? /* @__PURE__ */ import_react20.default.createElement("div", { className: "tile-line" }) : null
  );
});
function FloatingTile({
  src,
  alt,
  index,
  progress,
  containerWidth,
  containerHeight
}) {
  var _a, _b;
  const desktopTarget = (_a = desktopLayouts[index]) != null ? _a : desktopLayouts[desktopLayouts.length - 1];
  const mobileTarget = (_b = mobileLayouts[index]) != null ? _b : mobileLayouts[mobileLayouts.length - 1];
  const desktopMotion = useTileMotion(
    progress,
    index,
    desktopTarget,
    containerWidth,
    containerHeight
  );
  const mobileMotion = useTileMotion(
    progress,
    index,
    mobileTarget,
    containerWidth,
    containerHeight
  );
  return /* @__PURE__ */ import_react20.default.createElement(import_react20.default.Fragment, null, /* @__PURE__ */ import_react20.default.createElement(
    import_framer_motion5.motion.div,
    {
      style: desktopMotion,
      className: "floating-tile desktop-tile",
      transformTemplate: (_transform, generatedTransform) => `${TILE_CENTER_TRANSFORM} ${generatedTransform}`.trim()
    },
    /* @__PURE__ */ import_react20.default.createElement(TileShell, { src, alt, index })
  ), /* @__PURE__ */ import_react20.default.createElement(
    import_framer_motion5.motion.div,
    {
      style: mobileMotion,
      className: "floating-tile mobile-tile",
      transformTemplate: (_transform, generatedTransform) => `${TILE_CENTER_TRANSFORM} ${generatedTransform}`.trim()
    },
    /* @__PURE__ */ import_react20.default.createElement(TileShell, { src, alt, index, isMobile: true })
  ));
}
function renderTwoLineTitle(titleRaw) {
  const normalized = String(titleRaw != null ? titleRaw : "").replace(/\s+/g, " ").trim();
  const title = normalized || "Snack Gallery";
  if (title.includes("\n")) {
    const [a, b] = title.split("\n");
    return /* @__PURE__ */ import_react20.default.createElement(import_react20.default.Fragment, null, a, /* @__PURE__ */ import_react20.default.createElement("br", null), b || "");
  }
  const parts = title.split(" ").filter(Boolean);
  if (parts.length <= 1) return title;
  return /* @__PURE__ */ import_react20.default.createElement(import_react20.default.Fragment, null, parts[0], /* @__PURE__ */ import_react20.default.createElement("br", null), parts.slice(1).join(" "));
}
function FloatingSnackGalleryHeroContent({
  section,
  sectionRef,
  scrollContainer,
  theme
}) {
  var _a, _b, _c, _d;
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const blocks = (_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks;
  const title = String((_d = props.title) != null ? _d : "Snack Gallery").trim() || "Snack Gallery";
  const showScrollHint = props.showScrollHint !== false;
  const tiles = (0, import_react20.useMemo)(() => buildGalleryTiles(blocks), [blocks]);
  const [containerSize, setContainerSize] = (0, import_react20.useState)({ width: 1366, height: 768 });
  (0, import_react20.useLayoutEffect)(() => {
    const readSize = () => {
      var _a2;
      const el = sectionRef.current;
      const rect = el == null ? void 0 : el.getBoundingClientRect();
      setContainerSize({
        width: Math.max((_a2 = rect == null ? void 0 : rect.width) != null ? _a2 : window.innerWidth, 1),
        height: Math.max(window.innerHeight, 1)
      });
    };
    readSize();
    window.addEventListener("resize", readSize);
    return () => window.removeEventListener("resize", readSize);
  }, [sectionRef]);
  const scrollContainerRef = (0, import_react20.useRef)(scrollContainer);
  scrollContainerRef.current = scrollContainer;
  const scrollOpts = (0, import_react20.useMemo)(() => {
    const base = {
      target: sectionRef,
      offset: SCROLL_OFFSET3
    };
    if (!scrollContainer) {
      return base;
    }
    return { ...base, container: scrollContainerRef };
  }, [sectionRef, scrollContainer]);
  const { scrollYProgress } = (0, import_framer_motion5.useScroll)(
    scrollOpts
  );
  const titleScale = (0, import_framer_motion5.useSpring)((0, import_framer_motion5.useTransform)(scrollYProgress, [0, 0.72], [1, 0.955]), {
    stiffness: 72,
    damping: 28,
    mass: 0.8
  });
  const titleY = (0, import_framer_motion5.useSpring)((0, import_framer_motion5.useTransform)(scrollYProgress, [0, 0.72], [0, -10]), {
    stiffness: 72,
    damping: 28,
    mass: 0.8
  });
  const glowScale = (0, import_framer_motion5.useSpring)((0, import_framer_motion5.useTransform)(scrollYProgress, [0, 0.8], [0.9, 1.14]), {
    stiffness: 55,
    damping: 30,
    mass: 1
  });
  const titleOpacity = (0, import_framer_motion5.useTransform)(scrollYProgress, [0, 0.85], [1, 0.92]);
  const titleStyle = (0, import_react20.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "title",
        role: "heading",
        defaultStyle: NSP_FLOATING_SNACK_TITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  return /* @__PURE__ */ import_react20.default.createElement("div", { className: "sticky-wrapper" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "bg-layer" }), /* @__PURE__ */ import_react20.default.createElement("div", { className: "gradient-layer" }), /* @__PURE__ */ import_react20.default.createElement(import_framer_motion5.motion.div, { style: { scale: glowScale }, className: "center-glow" }), showScrollHint ? /* @__PURE__ */ import_react20.default.createElement("div", { className: "scroll-indicator" }, /* @__PURE__ */ import_react20.default.createElement("span", null, SCROLL_HINT_TEXT), /* @__PURE__ */ import_react20.default.createElement("span", { className: "line" })) : null, /* @__PURE__ */ import_react20.default.createElement("div", { className: "floating-cluster" }, tiles.map((tile, index) => /* @__PURE__ */ import_react20.default.createElement(
    FloatingTile,
    {
      key: tile.key,
      src: tile.src,
      alt: tile.alt,
      index,
      progress: scrollYProgress,
      containerWidth: containerSize.width,
      containerHeight: containerSize.height
    }
  ))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "title-wrapper" }, /* @__PURE__ */ import_react20.default.createElement(
    import_framer_motion5.motion.div,
    {
      style: { scale: titleScale, y: titleY, opacity: titleOpacity },
      className: "title-inner"
    },
    /* @__PURE__ */ import_react20.default.createElement("div", { className: "title-glow-one" }),
    /* @__PURE__ */ import_react20.default.createElement("div", { className: "title-glow-two" }),
    /* @__PURE__ */ import_react20.default.createElement("h1", { style: titleStyle }, renderTwoLineTitle(title))
  )));
}
function FloatingSnackGalleryHero({
  section,
  appearance,
  theme
}) {
  const sectionRef = (0, import_react20.useRef)(null);
  const [scrollContainer, setScrollContainer] = (0, import_react20.useState)(
    void 0
  );
  (0, import_react20.useLayoutEffect)(() => {
    const el = sectionRef.current;
    setScrollContainer(el ? findScrollContainer3(el) : null);
  }, []);
  if ((section == null ? void 0 : section.enabled) === false) {
    return null;
  }
  return /* @__PURE__ */ import_react20.default.createElement(
    "section",
    {
      ref: sectionRef,
      className: "premium-snack-gallery",
      style: sectionAppearanceStyle(appearance)
    },
    scrollContainer !== void 0 ? /* @__PURE__ */ import_react20.default.createElement(
      FloatingSnackGalleryHeroContent,
      {
        section,
        sectionRef,
        scrollContainer,
        theme
      }
    ) : null
  );
}

// src/components/MinimalTimelineBenefitsSection/MinimalTimelineBenefits.tsx
var import_react21 = __toESM(require("react"));
var import_framer_motion6 = require("framer-motion");

// src/shared/textStyleDefaults/benefitsTextStyleDefaults.ts
var BENEFITS_EYEBROW_DEFAULT = {
  color: "rgba(0, 0, 0, 0.3)",
  fontWeight: "500",
  fontSize: "10px"
};
var BENEFITS_HEADING_DEFAULT = {
  color: "#111111",
  fontWeight: "600",
  fontSize: "2rem"
};
var BENEFITS_DESCRIPTION_DEFAULT = {
  color: "rgba(0, 0, 0, 0.55)",
  fontWeight: "400",
  fontSize: "14px"
};
var BENEFIT_TITLE_DEFAULT = {
  color: "#111111",
  fontWeight: "600",
  fontSize: "1.2rem"
};
var BENEFIT_DESCRIPTION_DEFAULT = {
  color: "rgba(0, 0, 0, 0.55)",
  fontWeight: "400",
  fontSize: "13.5px"
};
var BENEFIT_POINT_DEFAULT = {
  color: "rgba(0, 0, 0, 0.6)",
  fontWeight: "400",
  fontSize: "13px"
};

// src/components/MinimalTimelineBenefitsSection/MinimalTimelineBenefits.tsx
var easing = [0.22, 1, 0.36, 1];
function safeText8(v) {
  return String(v != null ? v : "").trim();
}
function collectPoints(props) {
  return [props.point1, props.point2, props.point3].map((p) => safeText8(p)).filter(Boolean);
}
function Row2({
  item,
  index,
  isLast,
  showActiveRailFill,
  reduceMotion,
  benefitTitleStyle,
  benefitDescriptionStyle,
  benefitPointStyle
}) {
  const title = safeText8(item.title);
  const desc = safeText8(item.desc);
  const points = collectPoints(item);
  const motionProps = reduceMotion ? { initial: false, animate: { opacity: 1, y: 0 } } : {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.45 },
    transition: { duration: 0.6, delay: index * 0.06, ease: easing }
  };
  return /* @__PURE__ */ import_react21.default.createElement(
    import_framer_motion6.motion.div,
    {
      ...motionProps,
      className: "ak-mt-benefits__row"
    },
    /* @__PURE__ */ import_react21.default.createElement("div", { className: "ak-mt-benefits__rail-wrap" }, /* @__PURE__ */ import_react21.default.createElement("div", { className: "ak-mt-benefits__rail-base", "aria-hidden": true }), !isLast && showActiveRailFill && !reduceMotion ? /* @__PURE__ */ import_react21.default.createElement(
      import_framer_motion6.motion.div,
      {
        initial: { scaleY: 0 },
        whileInView: { scaleY: 1 },
        viewport: { once: true, amount: 0.6 },
        transition: { duration: 0.8, delay: 0.12, ease: easing },
        className: "ak-mt-benefits__rail-fill",
        "aria-hidden": true
      }
    ) : null, !isLast && showActiveRailFill && reduceMotion ? /* @__PURE__ */ import_react21.default.createElement("div", { className: "ak-mt-benefits__rail-fill ak-mt-benefits__rail-fill--static", "aria-hidden": true }) : null, /* @__PURE__ */ import_react21.default.createElement(
      import_framer_motion6.motion.span,
      {
        ...reduceMotion ? { initial: false, animate: { scale: 1, opacity: 1 } } : {
          initial: { scale: 0.85, opacity: 0 },
          whileInView: { scale: 1, opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.45, delay: index * 0.05, ease: easing }
        },
        className: "ak-mt-benefits__dot"
      },
      /* @__PURE__ */ import_react21.default.createElement("span", { className: "ak-mt-benefits__dot-inner" })
    )),
    /* @__PURE__ */ import_react21.default.createElement("div", { className: "ak-mt-benefits__row-body" }, /* @__PURE__ */ import_react21.default.createElement("div", { className: "ak-mt-benefits__row-inner" }, title ? /* @__PURE__ */ import_react21.default.createElement("h3", { className: "ak-mt-benefits__item-title", style: benefitTitleStyle }, title) : null, desc ? /* @__PURE__ */ import_react21.default.createElement("p", { className: "ak-mt-benefits__item-desc", style: benefitDescriptionStyle }, desc) : null, points.length > 0 ? /* @__PURE__ */ import_react21.default.createElement("div", { className: "ak-mt-benefits__points" }, points.map((p, i) => /* @__PURE__ */ import_react21.default.createElement(
      import_framer_motion6.motion.div,
      {
        key: `${index}-${p}-${i}`,
        ...reduceMotion ? { initial: false, animate: { opacity: 1, y: 0 } } : {
          initial: { opacity: 0, y: 6 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: {
            duration: 0.35,
            delay: 0.12 + i * 0.05,
            ease: easing
          }
        },
        className: "ak-mt-benefits__point"
      },
      /* @__PURE__ */ import_react21.default.createElement("span", { className: "ak-mt-benefits__point-bullet", "aria-hidden": true }),
      /* @__PURE__ */ import_react21.default.createElement("span", { className: "ak-mt-benefits__point-text", style: benefitPointStyle }, p)
    ))) : null))
  );
}
function MinimalTimelineBenefits({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const rawBlocks = (_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks;
  const eyebrow = safeText8(props.eyebrow);
  const heading = safeText8(props.heading);
  const description = safeText8(props.description);
  const showActiveRailFill = props.showActiveRailFill !== false;
  const eyebrowStyle = (0, import_react21.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "eyebrow",
        role: "body",
        defaultStyle: BENEFITS_EYEBROW_DEFAULT
      })
    ),
    [section, theme]
  );
  const headingStyle = (0, import_react21.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "heading",
        role: "heading",
        defaultStyle: BENEFITS_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const descriptionStyle = (0, import_react21.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "description",
        role: "body",
        defaultStyle: BENEFITS_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const benefitTitleStyle = (0, import_react21.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "benefitTitle",
        role: "heading",
        defaultStyle: BENEFIT_TITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  const benefitDescriptionStyle = (0, import_react21.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "benefitDescription",
        role: "body",
        defaultStyle: BENEFIT_DESCRIPTION_DEFAULT
      })
    ),
    [section, theme]
  );
  const benefitPointStyle = (0, import_react21.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "benefitPoint",
        role: "body",
        defaultStyle: BENEFIT_POINT_DEFAULT
      })
    ),
    [section, theme]
  );
  const blocks = (0, import_react21.useMemo)(() => Array.isArray(rawBlocks) ? rawBlocks : [], [rawBlocks]);
  const headerMotion = reduceMotion ? { initial: false, animate: { opacity: 1, y: 0 } } : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: easing }
  };
  return /* @__PURE__ */ import_react21.default.createElement("section", { className: "ak-mt-benefits", style: sectionAppearanceStyle(appearance) }, /* @__PURE__ */ import_react21.default.createElement("div", { className: "ak-mt-benefits__container" }, /* @__PURE__ */ import_react21.default.createElement(import_framer_motion6.motion.div, { ...headerMotion, className: "ak-mt-benefits__header" }, eyebrow ? /* @__PURE__ */ import_react21.default.createElement("div", { className: "ak-mt-benefits__eyebrow", style: eyebrowStyle }, eyebrow) : null, heading ? /* @__PURE__ */ import_react21.default.createElement(
    "h2",
    {
      className: "ak-mt-benefits__heading",
      style: { ...headingStyle, whiteSpace: "pre-line" }
    },
    heading
  ) : null, description ? /* @__PURE__ */ import_react21.default.createElement(
    "p",
    {
      className: "ak-mt-benefits__sub",
      style: { ...descriptionStyle, whiteSpace: "pre-line" }
    },
    description
  ) : null), /* @__PURE__ */ import_react21.default.createElement("div", { className: "ak-mt-benefits__timeline" }, blocks.map((b, i) => {
    var _a2;
    return /* @__PURE__ */ import_react21.default.createElement(
      Row2,
      {
        key: (b == null ? void 0 : b.id) || `benefit-${i}`,
        item: (_a2 = b == null ? void 0 : b.props) != null ? _a2 : {},
        index: i,
        isLast: i === blocks.length - 1,
        showActiveRailFill,
        reduceMotion,
        benefitTitleStyle,
        benefitDescriptionStyle,
        benefitPointStyle
      }
    );
  }))));
}

// src/components/MerchantFooterRevealSection/MerchantFooterReveal.tsx
var import_react22 = __toESM(require("react"));
var import_framer_motion7 = require("framer-motion");

// src/shared/textStyleDefaults/footerTextStyleDefaults.ts
var FOOTER_MERCHANT_NAME_DEFAULT = {
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "40px"
};
var FOOTER_MERCHANT_SUB_LABEL_DEFAULT = {
  color: "rgba(255, 255, 255, 0.56)",
  fontWeight: "400",
  fontSize: "15px"
};
var FOOTER_TAGLINE_DEFAULT = {
  color: "rgba(255, 255, 255, 0.72)",
  fontWeight: "400",
  fontSize: "16px"
};
var FOOTER_COLUMN_HEADING_DEFAULT = {
  color: "rgba(255, 255, 255, 0.76)",
  fontWeight: "600",
  fontSize: "16px"
};
var FOOTER_POLICY_LINK_TEXT_DEFAULT = {
  color: "rgba(255, 255, 255, 0.76)",
  fontWeight: "500",
  fontSize: "14px"
};
var FOOTER_LOGO_TEXT_DEFAULT = {
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "18px"
};
var FOOTER_CONTACT_TEXT_DEFAULT = {
  color: "rgba(255, 255, 255, 0.72)",
  fontWeight: "400",
  fontSize: "14px"
};

// src/components/MerchantFooterRevealSection/MerchantFooterReveal.tsx
function safeText9(v) {
  return String(v != null ? v : "").trim();
}
function ChevronRightIcon({ className }) {
  return /* @__PURE__ */ import_react22.default.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react22.default.createElement(
      "path",
      {
        d: "M9 6l6 6-6 6",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  );
}
function IconBase({ className, children }) {
  return /* @__PURE__ */ import_react22.default.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      "aria-hidden": true
    },
    children
  );
}
function InstagramIcon({ className }) {
  return /* @__PURE__ */ import_react22.default.createElement(IconBase, { className }, /* @__PURE__ */ import_react22.default.createElement("rect", { x: "4", y: "4", width: "16", height: "16", rx: "4", stroke: "currentColor", strokeWidth: "1.8" }), /* @__PURE__ */ import_react22.default.createElement("circle", { cx: "12", cy: "12", r: "3.4", stroke: "currentColor", strokeWidth: "1.8" }), /* @__PURE__ */ import_react22.default.createElement("circle", { cx: "17.2", cy: "6.8", r: "1", fill: "currentColor" }));
}
function FacebookIcon({ className }) {
  return /* @__PURE__ */ import_react22.default.createElement(IconBase, { className }, /* @__PURE__ */ import_react22.default.createElement(
    "path",
    {
      d: "M13.15 20V13.15H15.55L15.95 10.45H13.15V8.65C13.15 7.88 13.38 7.36 14.48 7.36H16V5.02C15.29 4.93 14.58 4.89 13.87 4.9C11.66 4.9 10.22 6.22 10.22 8.64V10.45H8V13.15H10.22V20H13.15Z",
      fill: "currentColor"
    }
  ));
}
function WebsiteIcon({ className }) {
  return /* @__PURE__ */ import_react22.default.createElement(IconBase, { className }, /* @__PURE__ */ import_react22.default.createElement("circle", { cx: "12", cy: "12", r: "8", stroke: "currentColor", strokeWidth: "1.8" }), /* @__PURE__ */ import_react22.default.createElement("path", { d: "M4 12H20", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }), /* @__PURE__ */ import_react22.default.createElement(
    "path",
    {
      d: "M12 4C14.3 6.45 15.55 9.08 15.55 12C15.55 14.92 14.3 17.55 12 20",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round"
    }
  ), /* @__PURE__ */ import_react22.default.createElement(
    "path",
    {
      d: "M12 4C9.7 6.45 8.45 9.08 8.45 12C8.45 14.92 9.7 17.55 12 20",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round"
    }
  ));
}
function MapPinIcon({ className }) {
  return /* @__PURE__ */ import_react22.default.createElement(IconBase, { className }, /* @__PURE__ */ import_react22.default.createElement(
    "path",
    {
      d: "M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10z",
      stroke: "currentColor",
      strokeWidth: "1.85",
      strokeLinejoin: "round"
    }
  ), /* @__PURE__ */ import_react22.default.createElement("circle", { cx: "12", cy: "11", r: "2.2", stroke: "currentColor", strokeWidth: "1.85" }));
}
function PhoneIcon({ className }) {
  return /* @__PURE__ */ import_react22.default.createElement(IconBase, { className }, /* @__PURE__ */ import_react22.default.createElement(
    "path",
    {
      d: "M8.5 3h2l1.5 4-2.2 1.2a11 11 0 0 0 5 5L16 11l4 1.5v2a2 2 0 0 1-2 2h-.5C9.6 16.5 4.5 11.4 4.5 4.5V4a2 2 0 0 1 2-2z",
      stroke: "currentColor",
      strokeWidth: "1.85",
      strokeLinejoin: "round"
    }
  ));
}
function MessageCircleIcon({ className }) {
  return /* @__PURE__ */ import_react22.default.createElement(IconBase, { className }, /* @__PURE__ */ import_react22.default.createElement(
    "path",
    {
      d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z",
      stroke: "currentColor",
      strokeWidth: "1.85",
      strokeLinejoin: "round"
    }
  ));
}
var PLATFORM_META = {
  instagram: { label: "Instagram", Icon: InstagramIcon },
  facebook: { label: "Facebook", Icon: FacebookIcon },
  website: { label: "Website", Icon: WebsiteIcon }
};
function normalizeExternalHref(raw) {
  const s = safeText9(raw);
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("//")) return `https:${s}`;
  if (s.startsWith("/") || s.startsWith("#")) return s;
  return `https://${s}`;
}
function normalizePolicyHref(raw) {
  const s = safeText9(raw);
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/") || s.startsWith("#")) return s;
  if (/^mailto:/i.test(s) || /^tel:/i.test(s)) return s;
  if (/^www\./i.test(s)) return `https://${s}`;
  return s;
}
function InfoRow({
  icon: Icon,
  text,
  style
}) {
  if (!text) return null;
  return /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__info-row" }, /* @__PURE__ */ import_react22.default.createElement("span", { className: "ak-mf__info-icon", "aria-hidden": true }, /* @__PURE__ */ import_react22.default.createElement(Icon, { className: "ak-mf__info-icon-svg" })), /* @__PURE__ */ import_react22.default.createElement("p", { className: "ak-mf__info-text", style }, text));
}
function collectPolicies(blocks) {
  var _a;
  const policies = [];
  if (!Array.isArray(blocks)) return policies;
  for (const b of blocks) {
    if (!b || typeof b !== "object" || b.type !== "policyLink") continue;
    policies.push((_a = b.props) != null ? _a : {});
  }
  return policies;
}
var FIXED_SOCIAL_ORDER = ["instagram", "facebook", "website"];
function MerchantFooterReveal({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c;
  const sectionRef = (0, import_react22.useRef)(null);
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const rawBlocks = (_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks;
  const logoText = safeText9(props.logoText) || "M";
  const logoImage = normalizeImageUrl(props.logoImage);
  const merchantName = safeText9(props.merchantName);
  const merchantSubLabel = safeText9(props.merchantSubLabel);
  const tagline = safeText9(props.tagline);
  const address = safeText9(props.address);
  const phone = safeText9(props.phone);
  const whatsapp = safeText9(props.whatsapp);
  const socialHeading = safeText9(props.socialHeading) || "Social";
  const policiesHeading = safeText9(props.policiesHeading) || "Policies";
  const linkByPlatform = {
    instagram: normalizeExternalHref(props.instagramLink),
    facebook: normalizeExternalHref(props.facebookLink),
    website: normalizeExternalHref(props.websiteLink)
  };
  const enableRevealMotion = !reduceMotion;
  const rawPolicies = (0, import_react22.useMemo)(() => collectPolicies(rawBlocks), [rawBlocks]);
  const policyItems = (0, import_react22.useMemo)(() => {
    return rawPolicies.map((p) => ({
      text: safeText9(p == null ? void 0 : p.text),
      link: normalizePolicyHref(p == null ? void 0 : p.link)
    })).filter((p) => p.text);
  }, [rawPolicies]);
  const socialItems = (0, import_react22.useMemo)(() => {
    return FIXED_SOCIAL_ORDER.map((platform) => {
      const link = linkByPlatform[platform];
      if (!link) return null;
      const meta = PLATFORM_META[platform];
      return { link, platform, label: meta.label, Icon: meta.Icon };
    }).filter(Boolean);
  }, [props.instagramLink, props.facebookLink, props.websiteLink]);
  const hasPolicies = policyItems.length > 0;
  const hasSocial = socialItems.length > 0;
  const gridModifier = hasSocial && hasPolicies ? "ak-mf__grid--3" : hasSocial || hasPolicies ? "ak-mf__grid--2" : "ak-mf__grid--1";
  const { scrollYProgress } = (0, import_framer_motion7.useScroll)({
    target: sectionRef,
    offset: ["start end", "end end"]
  });
  const rawReveal = (0, import_framer_motion7.useTransform)(scrollYProgress, [0.82, 1], [0, 1]);
  const reveal = (0, import_framer_motion7.useSpring)(rawReveal, {
    stiffness: 185,
    damping: 24,
    mass: 0.42
  });
  const brandY = (0, import_framer_motion7.useTransform)(reveal, [0, 1], ["100%", "0%"]);
  const brandScaleX = (0, import_framer_motion7.useTransform)(reveal, [0, 1], [1, 1.02]);
  const topLift = (0, import_framer_motion7.useTransform)(reveal, [0, 1], [0, 28]);
  const whatsappLine = whatsapp ? `WhatsApp: ${whatsapp}` : "";
  const merchantNameStyle = (0, import_react22.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "merchantName",
        role: "heading",
        defaultStyle: FOOTER_MERCHANT_NAME_DEFAULT
      })
    ),
    [section, theme]
  );
  const merchantSubLabelStyle = (0, import_react22.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "merchantSubLabel",
        role: "body",
        defaultStyle: FOOTER_MERCHANT_SUB_LABEL_DEFAULT
      })
    ),
    [section, theme]
  );
  const taglineStyle = (0, import_react22.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "tagline",
        role: "body",
        defaultStyle: FOOTER_TAGLINE_DEFAULT
      })
    ),
    [section, theme]
  );
  const socialHeadingStyle = (0, import_react22.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "socialHeading",
        role: "heading",
        defaultStyle: FOOTER_COLUMN_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const policiesHeadingStyle = (0, import_react22.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "policiesHeading",
        role: "heading",
        defaultStyle: FOOTER_COLUMN_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const policyLinkTextStyle = (0, import_react22.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "policyLinkText",
        role: "body",
        defaultStyle: FOOTER_POLICY_LINK_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const logoTextStyle = (0, import_react22.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "logoText",
        role: "heading",
        defaultStyle: FOOTER_LOGO_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const addressStyle = (0, import_react22.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "address",
        role: "body",
        defaultStyle: FOOTER_CONTACT_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const phoneStyle = (0, import_react22.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "phone",
        role: "body",
        defaultStyle: FOOTER_CONTACT_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const whatsappStyle = (0, import_react22.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "whatsapp",
        role: "body",
        defaultStyle: FOOTER_CONTACT_TEXT_DEFAULT
      })
    ),
    [section, theme]
  );
  const revealInner = /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__reveal-box" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__powered-wrap" }, /* @__PURE__ */ import_react22.default.createElement("span", { className: "ak-mf__powered" }, "Powered by")), /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__brand-big-wrap" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__brand-big" }, "areakart")), /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__reveal-fade", "aria-hidden": true }));
  return /* @__PURE__ */ import_react22.default.createElement("section", { ref: sectionRef, className: "ak-mf", style: sectionAppearanceStyle(appearance) }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__ambient", "aria-hidden": true }), /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__top-rule", "aria-hidden": true }), enableRevealMotion ? /* @__PURE__ */ import_react22.default.createElement(import_framer_motion7.motion.div, { style: { height: topLift }, className: "ak-mf__top-spacer", "aria-hidden": true }) : null, /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__inner" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: `ak-mf__grid ${gridModifier}` }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__col ak-mf__col--brand" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__brand-row" }, logoImage ? /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__logo-img-wrap" }, /* @__PURE__ */ import_react22.default.createElement("img", { src: logoImage, alt: "", className: "ak-mf__logo-img" })) : /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__logo-fallback", "aria-hidden": true, style: logoTextStyle }, logoText.slice(0, 3)), /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__brand-text" }, merchantName ? /* @__PURE__ */ import_react22.default.createElement("h2", { className: "ak-mf__merchant-name", style: merchantNameStyle }, merchantName) : null, merchantSubLabel ? /* @__PURE__ */ import_react22.default.createElement("p", { className: "ak-mf__merchant-sub", style: merchantSubLabelStyle }, merchantSubLabel) : null)), tagline ? /* @__PURE__ */ import_react22.default.createElement("p", { className: "ak-mf__tagline", style: taglineStyle }, tagline) : null, address || phone || whatsappLine ? /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__contact" }, /* @__PURE__ */ import_react22.default.createElement(InfoRow, { icon: MapPinIcon, text: address, style: addressStyle }), /* @__PURE__ */ import_react22.default.createElement(InfoRow, { icon: PhoneIcon, text: phone, style: phoneStyle }), /* @__PURE__ */ import_react22.default.createElement(InfoRow, { icon: MessageCircleIcon, text: whatsappLine, style: whatsappStyle })) : null), hasSocial ? /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__col ak-mf__col--social" }, /* @__PURE__ */ import_react22.default.createElement("p", { className: "ak-mf__col-heading", style: socialHeadingStyle }, socialHeading), /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__link-stack" }, socialItems.map((item, idx) => /* @__PURE__ */ import_react22.default.createElement(
    "a",
    {
      key: `social-${idx}-${item.platform}`,
      href: item.link,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "ak-mf__link-row ak-mf__link-row--social"
    },
    /* @__PURE__ */ import_react22.default.createElement("span", { className: "ak-mf__social-label" }, /* @__PURE__ */ import_react22.default.createElement("span", { className: "ak-mf__social-icon" }, /* @__PURE__ */ import_react22.default.createElement(item.Icon, { className: "ak-mf__social-icon-svg" })), item.label),
    /* @__PURE__ */ import_react22.default.createElement(ChevronRightIcon, { className: "ak-mf__chev ak-mf__chev--social" })
  )))) : null, hasPolicies ? /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__col ak-mf__col--policies" }, /* @__PURE__ */ import_react22.default.createElement("p", { className: "ak-mf__col-heading", style: policiesHeadingStyle }, policiesHeading), /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__link-stack" }, policyItems.map((item, idx) => /* @__PURE__ */ import_react22.default.createElement("div", { key: `policy-${idx}-${item.text}`, className: "ak-mf__policy-row" }, item.link ? /* @__PURE__ */ import_react22.default.createElement("a", { href: item.link, className: "ak-mf__link-row" }, /* @__PURE__ */ import_react22.default.createElement("span", { style: policyLinkTextStyle }, item.text), /* @__PURE__ */ import_react22.default.createElement(ChevronRightIcon, { className: "ak-mf__chev" })) : /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__link-row ak-mf__link-row--static" }, /* @__PURE__ */ import_react22.default.createElement("span", { style: policyLinkTextStyle }, item.text), /* @__PURE__ */ import_react22.default.createElement(ChevronRightIcon, { className: "ak-mf__chev ak-mf__chev--muted" })))))) : null), /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__reveal-wrap" }, enableRevealMotion ? /* @__PURE__ */ import_react22.default.createElement(import_framer_motion7.motion.div, { className: "ak-mf__reveal-motion", style: { y: brandY, scaleX: brandScaleX } }, revealInner) : /* @__PURE__ */ import_react22.default.createElement("div", { className: "ak-mf__reveal-motion" }, revealInner))));
}

// src/components/CouponStripsSection/CouponTickerMinimal.tsx
var import_react23 = __toESM(require("react"));

// src/shared/textStyleDefaults/couponTextStyleDefaults.ts
var COUPON_HEADING_DEFAULT = {
  color: "#141413",
  fontWeight: "600",
  fontSize: "3.75rem"
};
var COUPON_SUBHEADING_DEFAULT = {
  color: "rgba(0, 0, 0, 0.52)",
  fontWeight: "400",
  fontSize: "0.94rem"
};
var COUPON_CODE_DEFAULT = {
  color: "#ffffff",
  fontWeight: "600",
  fontSize: "0.68rem"
};
var COUPON_TITLE_DEFAULT = {
  color: "#111111",
  fontWeight: "500",
  fontSize: "1rem"
};

// src/components/CouponStripsSection/CouponTickerMinimal.tsx
function safeText10(value) {
  return String(value != null ? value : "").trim();
}
function normalizeSpeed(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return n;
}
function buildTickerItems(rawBlocks) {
  if (!Array.isArray(rawBlocks)) return [];
  const baseItems = rawBlocks.filter((block) => block && typeof block === "object").map((block, index) => {
    var _a;
    const props = (_a = block == null ? void 0 : block.props) != null ? _a : {};
    const code = safeText10(props.code);
    const title = safeText10(props.title);
    return {
      key: safeText10(block.id) || `coupon-${index + 1}`,
      code,
      title
    };
  }).filter((item) => item.code || item.title);
  if (baseItems.length === 0) return [];
  const copiesPerSequence = baseItems.length === 1 ? 8 : baseItems.length === 2 ? 6 : baseItems.length === 3 ? 4 : baseItems.length === 4 ? 3 : 2;
  const expanded = [];
  for (let copy = 0; copy < copiesPerSequence; copy += 1) {
    baseItems.forEach((item, index) => {
      expanded.push({
        ...item,
        key: `${item.key}-s${copy}-i${index}`
      });
    });
  }
  return expanded;
}
function TickerRow({
  items,
  reverse = false,
  durationSec,
  reducedMotion,
  secondary = false,
  codeStyle,
  titleStyle
}) {
  const loopItems = (0, import_react23.useMemo)(
    () => [...items, ...items].map((item, index) => ({
      ...item,
      key: `${item.key}-${index}`
    })),
    [items]
  );
  const trackClass = secondary ? "ak-coupon-ticker__track ak-coupon-ticker__track--secondary" : "ak-coupon-ticker__track";
  const animationName = reverse ? "ak-coupon-ticker-scroll-reverse" : "ak-coupon-ticker-scroll";
  return /* @__PURE__ */ import_react23.default.createElement("div", { className: "ak-coupon-ticker__row" }, /* @__PURE__ */ import_react23.default.createElement(
    "div",
    {
      className: trackClass,
      style: reducedMotion ? void 0 : {
        animationName,
        animationDuration: `${durationSec}s`
      }
    },
    loopItems.map((item) => /* @__PURE__ */ import_react23.default.createElement("div", { key: item.key, className: "ak-coupon-ticker__item" }, secondary ? /* @__PURE__ */ import_react23.default.createElement(
      "span",
      {
        className: "ak-coupon-ticker__code ak-coupon-ticker__code--secondary",
        style: codeStyle
      },
      item.code
    ) : /* @__PURE__ */ import_react23.default.createElement("span", { className: "ak-coupon-ticker__pill", style: codeStyle }, item.code), /* @__PURE__ */ import_react23.default.createElement(
      "span",
      {
        className: secondary ? "ak-coupon-ticker__title ak-coupon-ticker__title--secondary" : "ak-coupon-ticker__title",
        style: titleStyle
      },
      item.title
    ), /* @__PURE__ */ import_react23.default.createElement(
      "span",
      {
        className: secondary ? "ak-coupon-ticker__divider ak-coupon-ticker__divider--secondary" : "ak-coupon-ticker__divider",
        "aria-hidden": true
      }
    )))
  ));
}
function CouponTickerMinimal({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c;
  if ((section == null ? void 0 : section.enabled) === false) return null;
  const reducedMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const heading = safeText10(props.heading) || "Active Offers";
  const subheading = safeText10(props.subheading);
  const showSubheading = props.showSubheading !== false;
  const showSecondaryStrip = props.showSecondaryStrip !== false;
  const stripSpeedPrimary = normalizeSpeed(props.stripSpeedPrimary, 20);
  const stripSpeedSecondary = normalizeSpeed(props.stripSpeedSecondary, 28);
  const headingStyle = (0, import_react23.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "heading",
        role: "heading",
        defaultStyle: COUPON_HEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const subheadingStyle = (0, import_react23.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveTextStyle({
        section,
        theme,
        fieldId: "subheading",
        role: "body",
        defaultStyle: COUPON_SUBHEADING_DEFAULT
      })
    ),
    [section, theme]
  );
  const couponCodeStyle = (0, import_react23.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "couponCode",
        role: "body",
        defaultStyle: COUPON_CODE_DEFAULT
      })
    ),
    [section, theme]
  );
  const couponTitleStyle = (0, import_react23.useMemo)(
    () => resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "couponTitle",
        role: "body",
        defaultStyle: COUPON_TITLE_DEFAULT
      })
    ),
    [section, theme]
  );
  const items = (0, import_react23.useMemo)(
    () => {
      var _a2;
      return buildTickerItems((_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks);
    },
    [(_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks]
  );
  const showTicker = items.length > 0;
  return /* @__PURE__ */ import_react23.default.createElement("section", { className: "ak-coupon-ticker", style: sectionAppearanceStyle(appearance) }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "ak-coupon-ticker__divider-line ak-coupon-ticker__divider-line--top", "aria-hidden": true }), /* @__PURE__ */ import_react23.default.createElement("span", { className: "ak-coupon-ticker__divider-line ak-coupon-ticker__divider-line--bottom", "aria-hidden": true }), /* @__PURE__ */ import_react23.default.createElement("div", { className: "ak-coupon-ticker__header" }, /* @__PURE__ */ import_react23.default.createElement("h2", { className: "ak-coupon-ticker__heading", style: headingStyle }, heading), showSubheading && subheading ? /* @__PURE__ */ import_react23.default.createElement("p", { className: "ak-coupon-ticker__subheading", style: subheadingStyle }, subheading) : null), showTicker ? /* @__PURE__ */ import_react23.default.createElement("div", { className: "ak-coupon-ticker__strips" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "ak-coupon-ticker__fade ak-coupon-ticker__fade--left", "aria-hidden": true }), /* @__PURE__ */ import_react23.default.createElement("div", { className: "ak-coupon-ticker__fade ak-coupon-ticker__fade--right", "aria-hidden": true }), /* @__PURE__ */ import_react23.default.createElement(
    TickerRow,
    {
      items,
      durationSec: stripSpeedPrimary,
      reducedMotion,
      codeStyle: couponCodeStyle,
      titleStyle: couponTitleStyle
    }
  ), showSecondaryStrip ? /* @__PURE__ */ import_react23.default.createElement("div", { className: "ak-coupon-ticker__secondary-wrap" }, /* @__PURE__ */ import_react23.default.createElement(
    TickerRow,
    {
      items,
      reverse: true,
      secondary: true,
      durationSec: stripSpeedSecondary,
      reducedMotion,
      codeStyle: couponCodeStyle,
      titleStyle: couponTitleStyle
    }
  )) : null) : null);
}

// src/sections/marquee-text/DualLineFeatureMarquee.tsx
var import_react26 = __toESM(require("react"));

// src/sections/marquee-text/FeatureMarqueeBlock.tsx
var import_react25 = __toESM(require("react"));

// src/sections/marquee-text/MarqueeLine.tsx
var import_react24 = __toESM(require("react"));
function getCopiesPerSequence(items, large) {
  const count = items.length;
  const avgChars = items.reduce((sum, item) => sum + item.text.length, 0) / Math.max(count, 1);
  let copies = count === 1 ? 12 : count === 2 ? 10 : count === 3 ? 8 : count === 4 ? 6 : 4;
  if (avgChars <= 16) copies += 2;
  if (avgChars <= 10) copies += 2;
  if (large) copies += 2;
  if (large && count <= 2) copies += 2;
  return copies;
}
function buildMarqueeSequence(items, large) {
  if (items.length === 0) return [];
  const copies = getCopiesPerSequence(items, large);
  const expanded = [];
  for (let copy = 0; copy < copies; copy += 1) {
    items.forEach((item) => {
      expanded.push(item);
    });
  }
  return expanded;
}
function MarqueeLine({
  items,
  large = false,
  reverse = false,
  durationSec = 26,
  pauseOnHover = false,
  reducedMotion = false
}) {
  const sequence = (0, import_react24.useMemo)(
    () => buildMarqueeSequence(items, large),
    [items, large]
  );
  const loopItems = (0, import_react24.useMemo)(
    () => [...sequence, ...sequence].map((item, index) => ({
      ...item,
      key: `${item.id || item.text}-${index}`
    })),
    [sequence]
  );
  if (loopItems.length === 0) return null;
  const trackClass = [
    "feature-marquee-track",
    large ? "feature-marquee-track--lg" : "feature-marquee-track--sm",
    reverse ? "feature-marquee-track--reverse" : "",
    pauseOnHover ? "feature-marquee-track--pause-hover" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ import_react24.default.createElement("div", { className: "feature-marquee-row" }, /* @__PURE__ */ import_react24.default.createElement(
    "div",
    {
      className: trackClass,
      style: reducedMotion ? void 0 : {
        animationDuration: `${durationSec}s`
      }
    },
    loopItems.map((item) => /* @__PURE__ */ import_react24.default.createElement("span", { key: item.key, className: "feature-marquee-item", style: item.style }, item.text, /* @__PURE__ */ import_react24.default.createElement("span", { className: "feature-marquee-dot", "aria-hidden": true }, "\u2022")))
  ));
}

// src/sections/marquee-text/FeatureMarqueeBlock.tsx
function FeatureMarqueeBlock({
  marqueeTop,
  marqueeBottom,
  speedTop = 26,
  speedBottom = 30,
  largeTopRow = true,
  largeBottomRow = false,
  pauseOnHover = false,
  reducedMotion = false
}) {
  const hasTopRow = marqueeTop.length > 0;
  const hasBottomRow = marqueeBottom.length > 0;
  if (!hasTopRow && !hasBottomRow) return null;
  const contentKey = (0, import_react25.useMemo)(
    () => `${marqueeTop.map((i) => i.text).join("|")}-${marqueeBottom.map((i) => i.text).join("|")}-marquee`,
    [marqueeTop, marqueeBottom]
  );
  return /* @__PURE__ */ import_react25.default.createElement("div", { className: "feature-marquee-block" }, hasTopRow ? /* @__PURE__ */ import_react25.default.createElement(
    MarqueeLine,
    {
      items: marqueeTop,
      large: largeTopRow,
      durationSec: speedTop,
      pauseOnHover,
      reducedMotion
    }
  ) : null, hasBottomRow ? /* @__PURE__ */ import_react25.default.createElement(
    MarqueeLine,
    {
      items: marqueeBottom,
      large: largeBottomRow,
      reverse: true,
      durationSec: speedBottom,
      pauseOnHover,
      reducedMotion
    }
  ) : null);
}

// src/shared/textStyleDefaults/marqueeTextStyleDefaults.ts
var MARQUEE_TOP_ROW_DEFAULT = {
  color: "#111111",
  fontWeight: "700",
  fontSize: "48px"
};
var MARQUEE_BOTTOM_ROW_DEFAULT = {
  color: "#444444",
  fontWeight: "400",
  fontSize: "18px"
};
var MARQUEE_TEXT_LARGE_DEFAULT = {
  color: "#0b1f2a",
  fontWeight: "600",
  fontSize: "80px"
};
var MARQUEE_TEXT_SMALL_DEFAULT = {
  color: "#0b1f2a",
  fontWeight: "500",
  fontSize: "15px"
};

// src/sections/marquee-text/DualLineFeatureMarquee.tsx
function safeText11(value) {
  return String(value != null ? value : "").trim();
}
function normalizeSpeed2(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return n;
}
function readBlockRow(block) {
  var _a;
  const raw = safeText11(block.row || ((_a = block.props) == null ? void 0 : _a.row)).toLowerCase();
  return raw === "bottom" ? "bottom" : "top";
}
function readBlockText(block) {
  var _a, _b;
  return safeText11((_b = block.text) != null ? _b : (_a = block.props) == null ? void 0 : _a.text);
}
function rowDefaultStyle(row, large) {
  if (row === "top") {
    return large ? MARQUEE_TEXT_LARGE_DEFAULT : MARQUEE_TOP_ROW_DEFAULT;
  }
  return large ? MARQUEE_TEXT_LARGE_DEFAULT : MARQUEE_BOTTOM_ROW_DEFAULT;
}
function buildRowItems(rawBlocks, row, section, theme, large) {
  if (!Array.isArray(rawBlocks)) return [];
  const groupKey = row === "top" ? "topRowText" : "bottomRowText";
  const role = row === "top" ? "heading" : "body";
  const defaultStyle = rowDefaultStyle(row, large);
  const rowStyle = resolvedTextStyleToInlineStyle(
    resolveBlockGroupTextStyle({
      section,
      theme,
      groupKey,
      role,
      defaultStyle
    })
  );
  return rawBlocks.filter((block) => block && typeof block === "object").map((block) => block).filter((block) => readBlockRow(block) === row).map((block) => {
    var _a;
    const text = readBlockText(block);
    if (!text) return null;
    const blockId = String((_a = block.id) != null ? _a : "").trim();
    return {
      id: blockId || `${row}-${text}`,
      text,
      style: rowStyle
    };
  }).filter(Boolean);
}
function DualLineFeatureMarquee({
  section,
  appearance,
  theme
}) {
  var _a, _b, _c;
  if ((section == null ? void 0 : section.enabled) === false) return null;
  const reducedMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const rawBlocks = (_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks;
  const speedTop = normalizeSpeed2(props.speedTop, 26);
  const speedBottom = normalizeSpeed2(props.speedBottom, 30);
  const largeTopRow = props.largeTopRow !== false;
  const largeBottomRow = props.largeBottomRow === true;
  const pauseOnHover = props.pauseOnHover === true;
  const marqueeTop = (0, import_react26.useMemo)(
    () => buildRowItems(rawBlocks, "top", section, theme, largeTopRow),
    [rawBlocks, section, theme, largeTopRow]
  );
  const marqueeBottom = (0, import_react26.useMemo)(
    () => buildRowItems(rawBlocks, "bottom", section, theme, largeBottomRow),
    [rawBlocks, section, theme, largeBottomRow]
  );
  return /* @__PURE__ */ import_react26.default.createElement(
    "section",
    {
      className: "ak-dual-line-marquee",
      style: sectionAppearanceStyle(appearance)
    },
    /* @__PURE__ */ import_react26.default.createElement(
      FeatureMarqueeBlock,
      {
        marqueeTop,
        marqueeBottom,
        speedTop,
        speedBottom,
        largeTopRow,
        largeBottomRow,
        pauseOnHover,
        reducedMotion
      }
    )
  );
}

// src/shared/StorefrontFontLoader.tsx
var import_react27 = require("react");
var GOOGLE_FONTS_MARKER = "data-storefront-fonts";
function ensureGooglePreconnect() {
  const head = window.document.head;
  if (!head.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]')) {
    const preconnect = window.document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.googleapis.com";
    head.appendChild(preconnect);
  }
  if (!head.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com"]')) {
    const preconnect = window.document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.gstatic.com";
    preconnect.crossOrigin = "anonymous";
    head.appendChild(preconnect);
  }
}
function StorefrontFontLoader({
  themeFontId,
  fontIds,
  document: document2
}) {
  const ids = (0, import_react27.useMemo)(() => {
    const fromDoc = document2 ? collectStorefrontFontIdsFromDocument(document2) : [];
    const merged = /* @__PURE__ */ new Set([
      DEFAULT_STOREFRONT_FONT_ID,
      ...fromDoc,
      ...fontIds != null ? fontIds : [],
      String(themeFontId != null ? themeFontId : "").trim()
    ]);
    merged.delete("");
    merged.delete("system");
    return Array.from(merged);
  }, [document2, fontIds, themeFontId]);
  const googleHref = (0, import_react27.useMemo)(() => buildGoogleFontLink(ids), [ids]);
  (0, import_react27.useEffect)(() => {
    if (!googleHref) return void 0;
    ensureGooglePreconnect();
    const head = window.document.head;
    head.querySelectorAll(`link[${GOOGLE_FONTS_MARKER}="google"]`).forEach((el) => el.remove());
    const link = window.document.createElement("link");
    link.rel = "stylesheet";
    link.href = googleHref;
    link.setAttribute(GOOGLE_FONTS_MARKER, "google");
    head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [googleHref]);
  return null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BENEFITS_DESCRIPTION_DEFAULT,
  BENEFITS_EYEBROW_DEFAULT,
  BENEFITS_HEADING_DEFAULT,
  BENEFIT_DESCRIPTION_DEFAULT,
  BENEFIT_POINT_DEFAULT,
  BENEFIT_TITLE_DEFAULT,
  COUPON_CODE_DEFAULT,
  COUPON_HEADING_DEFAULT,
  COUPON_SUBHEADING_DEFAULT,
  COUPON_TITLE_DEFAULT,
  CouponTickerMinimal,
  CreativeCategoryMarquee,
  DEFAULT_STOREFRONT_FONT_ID,
  DEFAULT_TYPOGRAPHY,
  DualLineFeatureMarquee,
  FOOTER_COLUMN_HEADING_DEFAULT,
  FOOTER_MERCHANT_NAME_DEFAULT,
  FOOTER_MERCHANT_SUB_LABEL_DEFAULT,
  FOOTER_POLICY_LINK_TEXT_DEFAULT,
  FOOTER_TAGLINE_DEFAULT,
  FeatureMarqueeBlock,
  FloatingSnackGalleryHero,
  FullImageTypingHero,
  HEADER_BRAND_NAME_DEFAULT,
  HEADER_BRAND_SUBTITLE_DEFAULT,
  HEADER_NAV_LINK_TEXT_DEFAULT,
  HEADER_NAV_LINK_TEXT_LIGHT_DEFAULT,
  HERO_SECTION_LABEL_DEFAULT,
  HERO_SLIDE_DESCRIPTION_DEFAULT,
  HERO_SLIDE_HEADLINE_DEFAULT,
  HeroScrollableSlide,
  HeroSlider,
  LiquidFocusCategories,
  LogoFocusedHeader,
  MARQUEE_BOTTOM_ROW_DEFAULT,
  MARQUEE_TEXT_LARGE_DEFAULT,
  MARQUEE_TEXT_SMALL_DEFAULT,
  MARQUEE_TOP_ROW_DEFAULT,
  MerchantFooterReveal,
  MessageStyleTestimonials,
  MinimalTimelineBenefits,
  NSPSignatureHeroMarquee,
  NSP_FLOATING_SNACK_TITLE_DEFAULT,
  NSP_MARQUEE_CARD_SUBTITLE_DEFAULT,
  NSP_MARQUEE_CARD_TITLE_DEFAULT,
  NSP_MARQUEE_EYEBROW_DEFAULT,
  NSP_MARQUEE_HEADING_DEFAULT,
  NSP_MARQUEE_HERO_BADGE_TEXT_DEFAULT,
  NSP_MARQUEE_SUBHEADING_DEFAULT,
  NSP_POKER_DESCRIPTION_DEFAULT,
  NSP_POKER_EYEBROW_DEFAULT,
  NSP_POKER_HEADING_DEFAULT,
  NSP_SIG_HERO_DESCRIPTION_DEFAULT,
  NSP_SIG_HERO_EYEBROW_DEFAULT,
  NSP_SIG_HERO_HEADING_DEFAULT,
  NSP_SIG_HERO_PRIMARY_BUTTON_TEXT_DEFAULT,
  NSP_SIG_HERO_SECONDARY_BUTTON_TEXT_DEFAULT,
  NSP_TYPING_DESCRIPTION_DEFAULT,
  NSP_TYPING_PRIMARY_BUTTON_TEXT_DEFAULT,
  NSP_TYPING_SECONDARY_BUTTON_TEXT_DEFAULT,
  NSP_TYPING_STATIC_HEADING_DEFAULT,
  NSP_TYPING_WORD_DEFAULT,
  PRODUCT_CARD_DESCRIPTION_DEFAULT,
  PRODUCT_CARD_SUBTITLE_DEFAULT,
  PRODUCT_CARD_TITLE_DEFAULT,
  PRODUCT_CARD_TITLE_OVERLAY_DEFAULT,
  PRODUCT_MARQUEE_DESCRIPTION_DEFAULT,
  PRODUCT_MARQUEE_EYEBROW_DEFAULT,
  PRODUCT_MARQUEE_HEADING_DEFAULT,
  PokerRowRevealHero,
  PortraitTestimonials,
  ProductCardMarquee,
  ProductMarquee,
  SECTION_TYPE_APPEARANCE_DEFAULTS,
  STOREFRONT_FONTS,
  STOREFRONT_FONT_OPTIONS,
  STYLE_APPLE_MARQUEE,
  STYLE_MESSAGE_BUBBLE,
  STYLE_PORTRAIT_TESTIMONIALS,
  STYLE_STACKED_TESTIMONIALS,
  ScrollParallaxSignatureHero,
  StackedTestimonials,
  StorefrontFontLoader,
  SubHeroImageLoop,
  TESTIMONIAL_BACKGROUND_WORD_DEFAULT,
  TESTIMONIAL_BUTTON_TEXT_DEFAULT,
  TESTIMONIAL_CUSTOMER_NAME_DEFAULT,
  TESTIMONIAL_CUSTOMER_ROLE_DEFAULT,
  TESTIMONIAL_DESCRIPTION_DEFAULT,
  TESTIMONIAL_EYEBROW_DEFAULT,
  TESTIMONIAL_HEADING_DEFAULT,
  TESTIMONIAL_HIGHLIGHT_TEXT_DEFAULT,
  TESTIMONIAL_QUOTE_TEXT_DEFAULT,
  TESTIMONIAL_SUBHEADING_DEFAULT,
  TransparentHeroHeader,
  collectStorefrontFontIdsFromDocument,
  collectThemeFontIds,
  getStorefrontFontById,
  normalizeAppearance,
  normalizeBlockGroupStyles,
  normalizeFieldStyles,
  normalizeImageUrl,
  normalizeSectionTypography,
  normalizeSectionTypographyRole,
  normalizeTextStyle,
  normalizeTheme,
  normalizeThemeTypography,
  normalizeTypography,
  resolveBlockGroupTextStyle,
  resolveSectionAppearance,
  resolveStorefrontFontFamily,
  resolveTextStyle,
  resolveThemeFontKey,
  resolvedTextStyleToInlineStyle,
  sectionAppearanceStyle,
  stripFieldOverrideStyle
});
//# sourceMappingURL=index.js.map