import type { CSSProperties } from "react";

import type { SectionAppearance, StorefrontTheme } from "./sectionAppearance";
import {
  normalizeSectionTypography,
  normalizeThemeTypography,
  pickNonEmpty,
} from "./sectionTypography";

export type HeaderAppearance = {
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

export type ResolvedHeaderAppearance = Required<HeaderAppearance>;

export const HEADER_APPEARANCE_KEYS: (keyof HeaderAppearance)[] = [
  "navContainerBackground",
  "navTextColor",
  "navActiveBackground",
  "navActiveTextColor",
  "navBorderColor",
  "iconButtonBackground",
  "iconButtonColor",
  "iconButtonBorderColor",
  "cartBadgeBackground",
  "cartBadgeTextColor",
];

/** Matches LogoFocusedHeader SCSS defaults. */
export const HEADER_APPEARANCE_DEFAULTS: ResolvedHeaderAppearance = {
  navContainerBackground: "rgba(255, 255, 255, 0.9)",
  navTextColor: "rgba(0, 0, 0, 0.6)",
  navActiveBackground: "#0a0a0a",
  navActiveTextColor: "#ffffff",
  navBorderColor: "rgba(0, 0, 0, 0.06)",
  iconButtonBackground: "#ffffff",
  iconButtonColor: "#0a0a0a",
  iconButtonBorderColor: "rgba(0, 0, 0, 0.06)",
  cartBadgeBackground: "#0a0a0a",
  cartBadgeTextColor: "#ffffff",
};

export function normalizeHeaderAppearance(raw?: HeaderAppearance | null): HeaderAppearance {
  if (!raw || typeof raw !== "object") return {};
  const next: HeaderAppearance = {};
  HEADER_APPEARANCE_KEYS.forEach((key) => {
    const value = pickNonEmpty(raw[key]);
    if (value) next[key] = value;
  });
  return next;
}

export function pruneHeaderAppearanceForPersistence(
  header?: HeaderAppearance | null
): HeaderAppearance {
  return normalizeHeaderAppearance(header);
}

export type ResolveHeaderAppearanceInput = {
  section?: {
    settings?: {
      props?: {
        appearance?: SectionAppearance & { header?: HeaderAppearance };
      };
    };
  } | null;
  theme?: StorefrontTheme | null;
};

export function resolveHeaderAppearance({
  section,
  theme,
}: ResolveHeaderAppearanceInput): ResolvedHeaderAppearance {
  const appearance = section?.settings?.props?.appearance;
  const header = normalizeHeaderAppearance(appearance?.header);
  const sectionTypo = normalizeSectionTypography(appearance?.typography);
  const themeTypo = normalizeThemeTypography(theme?.typography);

  const navTextColor = pickNonEmpty(
    header.navTextColor,
    sectionTypo.body?.color,
    themeTypo.body?.color,
    HEADER_APPEARANCE_DEFAULTS.navTextColor
  );

  const navActiveTextColor = pickNonEmpty(
    header.navActiveTextColor,
    header.navTextColor,
    HEADER_APPEARANCE_DEFAULTS.navActiveTextColor
  );

  const iconButtonColor = pickNonEmpty(
    header.iconButtonColor,
    sectionTypo.body?.color,
    themeTypo.body?.color,
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
    ),
  };
}

/** CSS custom properties for LogoFocusedHeader (`ak-lfh`). */
export function logoFocusedHeaderAppearanceCssVars(
  resolved: ResolvedHeaderAppearance
): CSSProperties {
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
    "--ak-lfh-badge-text": resolved.cartBadgeTextColor,
  } as CSSProperties;
}

/** CSS custom properties for TransparentHeroHeader (`ak-thh`). */
export function transparentHeroHeaderAppearanceCssVars(
  resolved: ResolvedHeaderAppearance
): CSSProperties {
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
    "--ak-thh-badge-text": resolved.cartBadgeTextColor,
  } as CSSProperties;
}

export type HeaderChromeStyles = {
  navShell: CSSProperties;
  inactivePill: CSSProperties;
  activePill: CSSProperties;
  iconButton: CSSProperties;
  cartBadge: CSSProperties;
};

export function headerChromeStyles(resolved: ResolvedHeaderAppearance): HeaderChromeStyles {
  return {
    navShell: {
      background: resolved.navContainerBackground,
      border: `1px solid ${resolved.navBorderColor}`,
    },
    inactivePill: {
      color: resolved.navTextColor,
      background: "transparent",
    },
    activePill: {
      color: resolved.navActiveTextColor,
      background: resolved.navActiveBackground,
    },
    iconButton: {
      background: resolved.iconButtonBackground,
      color: resolved.iconButtonColor,
      border: `1px solid ${resolved.iconButtonBorderColor}`,
    },
    cartBadge: {
      background: resolved.cartBadgeBackground,
      color: resolved.cartBadgeTextColor,
    },
  };
}

export function hasHeaderAppearanceOverrides(
  section?: ResolveHeaderAppearanceInput["section"]
): boolean {
  const header = normalizeHeaderAppearance(
    section?.settings?.props?.appearance?.header
  );
  return Object.keys(header).length > 0;
}
