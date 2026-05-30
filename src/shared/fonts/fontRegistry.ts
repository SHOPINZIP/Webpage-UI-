export const DEFAULT_STOREFRONT_FONT_ID = "inter";

export const SYSTEM_FONT_FAMILY =
  'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export type StorefrontFontSource = "system" | "google" | "local";

export type StorefrontFontDefinition = {
  value: string;
  label: string;
  cssFamily: string;
  source: StorefrontFontSource;
  googleFamily?: string;
  files?: string[];
};

export const STOREFRONT_FONTS: StorefrontFontDefinition[] = [
  {
    value: "system",
    label: "System Default",
    cssFamily: SYSTEM_FONT_FAMILY,
    source: "system",
  },
  {
    value: "inter",
    label: "Inter (Google)",
    cssFamily: '"Inter", system-ui, sans-serif',
    source: "google",
    googleFamily: "Inter:wght@400;500;600;700;800",
  },
  {
    value: "maharani",
    label: "Maharani",
    cssFamily: '"Maharani", serif',
    source: "local",
    files: ["Maharani-Regular.woff2", "Maharani-Regular.woff"],
  },
  {
    value: "bongita",
    label: "Bongita",
    cssFamily: '"Bongita", cursive',
    source: "local",
    files: ["Bongita.woff2", "Bongita.woff"],
  },
  {
    value: "girlkick",
    label: "Girlkick",
    cssFamily: '"Girlkick", cursive',
    source: "local",
    files: ["Girlkick.woff2", "Girlkick.woff"],
  },
  {
    value: "glamoure-everyday",
    label: "Glamoure Everyday",
    cssFamily: '"Glamoure Everyday", cursive',
    source: "local",
    files: ["GlamoureEveryday.woff2", "GlamoureEveryday.woff"],
  },
  {
    value: "kirome",
    label: "Kirome",
    cssFamily: '"Kirome", sans-serif',
    source: "local",
    files: ["Kirome.woff"],
  },
  {
    value: "aesthetic",
    label: "Aesthetic",
    cssFamily: '"Aesthetic", cursive',
    source: "local",
    files: ["Aesthetic.woff2", "Aesthetic.woff"],
  },
  {
    value: "royal",
    label: "Royal",
    cssFamily: '"Royal", serif',
    source: "local",
    files: ["Royal.woff2", "Royal.woff"],
  },
  {
    value: "sabrine",
    label: "Sabrine",
    cssFamily: '"Sabrine", cursive',
    source: "local",
    files: ["Sabrine.woff2", "Sabrine.woff"],
  },
  {
    value: "fresh-mango",
    label: "Fresh Mango",
    cssFamily: '"Fresh Mango", cursive',
    source: "local",
    files: ["FreshMango.ttf"],
  },
  {
    value: "rounding",
    label: "Rounding",
    cssFamily: '"Rounding", sans-serif',
    source: "local",
    files: ["Rounding.ttf"],
  },
];

export const STOREFRONT_FONT_OPTIONS = STOREFRONT_FONTS.map(({ value, label }) => ({
  value,
  label,
}));

const fontById = Object.fromEntries(STOREFRONT_FONTS.map((f) => [f.value, f]));

function isDevelopment() {
  const g = globalThis as typeof globalThis & {
    process?: { env?: { NODE_ENV?: string } };
  };
  return g.process?.env?.NODE_ENV !== "production";
}

export function getStorefrontFontById(fontId?: string | null) {
  const id = String(fontId ?? "").trim();
  if (id && !fontById[id] && isDevelopment()) {
    console.warn(`[storefrontFonts] Unknown font id "${id}". Falling back to default.`);
  }
  return fontById[id] ?? fontById[DEFAULT_STOREFRONT_FONT_ID] ?? STOREFRONT_FONTS[0];
}

export function resolveStorefrontFontFamily(fontId?: string | null) {
  return getStorefrontFontById(fontId).cssFamily;
}

function collectFontIdsFromTextStyle(style?: { fontFamily?: string } | null) {
  if (!style || typeof style !== "object") return [];
  const id = String(style.fontFamily ?? "").trim();
  return id ? [id] : [];
}

function collectFontIdsFromTypography(typography?: {
  heading?: { fontFamily?: string };
  body?: { fontFamily?: string };
}) {
  if (!typography || typeof typography !== "object") return [];
  return [
    ...collectFontIdsFromTextStyle(typography.heading),
    ...collectFontIdsFromTextStyle(typography.body),
  ];
}

function collectFontIdsFromStyleMap(
  styleMap?: Record<string, { fontFamily?: string } | undefined> | null
) {
  if (!styleMap || typeof styleMap !== "object") return [];
  const ids: string[] = [];
  Object.values(styleMap).forEach((style) => {
    ids.push(...collectFontIdsFromTextStyle(style));
  });
  return ids;
}

export function collectStorefrontFontIdsFromDocument(doc?: {
  theme?: {
    fontFamily?: string;
    typography?: { heading?: { fontFamily?: string }; body?: { fontFamily?: string } };
  };
  sections?: Array<{
    settings?: {
      props?: {
        appearance?: {
          typography?: { heading?: { fontFamily?: string }; body?: { fontFamily?: string } };
          fieldStyles?: Record<string, { fontFamily?: string }>;
          blockGroupStyles?: Record<string, { fontFamily?: string }>;
        };
      };
    };
  }>;
}) {
  const ids = new Set<string>();
  const theme = doc?.theme;
  if (theme?.fontFamily) ids.add(String(theme.fontFamily).trim());
  collectFontIdsFromTypography(theme?.typography).forEach((id) => ids.add(id));

  (doc?.sections ?? []).forEach((section) => {
    const appearance = section?.settings?.props?.appearance;
    if (!appearance) return;
    collectFontIdsFromTypography(appearance.typography).forEach((id) => ids.add(id));
    collectFontIdsFromStyleMap(appearance.fieldStyles).forEach((id) => ids.add(id));
    collectFontIdsFromStyleMap(appearance.blockGroupStyles).forEach((id) => ids.add(id));
  });

  ids.delete("");
  return Array.from(ids);
}

export const STOREFONT_LOCAL_FONT_WEIGHTS = [400, 500, 600, 700, 800];

function fontFileFormat(file: string) {
  if (file.endsWith(".woff2")) return "woff2";
  if (file.endsWith(".woff")) return "woff";
  if (file.endsWith(".ttf")) return "truetype";
  if (file.endsWith(".otf")) return "opentype";
  return "woff2";
}

function localFontFamilyName(cssFamily: string) {
  const first = String(cssFamily ?? "").split(",")[0].trim();
  return first.replace(/^["']+|["']+$/g, "");
}

export function buildFontFaceCss(fontId: string, basePath = "/fonts") {
  const font = getStorefrontFontById(fontId);
  if (font.source !== "local" || !font.files?.length) return "";

  const familyName = localFontFamilyName(font.cssFamily);
  const pathPrefix =
    basePath === "." || basePath === "./"
      ? `./${font.value}`
      : `${basePath.replace(/\/$/, "")}/${font.value}`;
  const src = font.files
    .map((file) => {
      const format = fontFileFormat(file);
      return `url("${pathPrefix}/${file}") format("${format}")`;
    })
    .join(", ");

  return STOREFONT_LOCAL_FONT_WEIGHTS.map(
    (weight) =>
      `@font-face{font-family:"${familyName}";src:${src};font-display:swap;font-weight:${weight};font-style:normal;}`
  ).join("\n");
}

/** Webpack-bundled @font-face (relative paths under src/assets/storefront-fonts/). */
export function buildAllBundledLocalFontFaceCss() {
  return buildAllLocalFontFaceCss(".");
}

export function buildAllLocalFontFaceCss(basePath = "/fonts") {
  return STOREFRONT_FONTS.filter((f) => f.source === "local")
    .map((f) => buildFontFaceCss(f.value, basePath))
    .filter(Boolean)
    .join("\n");
}

export function buildGoogleFontLink(fontIds: string[]) {
  const families = new Set<string>();
  fontIds.forEach((id) => {
    const font = getStorefrontFontById(id);
    if (font.source === "google" && font.googleFamily) {
      families.add(font.googleFamily);
    }
  });
  if (families.size === 0) return null;
  const query = Array.from(families)
    .map((family) => `family=${family.replace(/ /g, "+")}`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${query}&display=swap`;
}
