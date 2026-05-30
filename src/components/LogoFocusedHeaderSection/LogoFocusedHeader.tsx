import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  normalizeImageUrl,
  normalizeNavLinkPath,
  resolveHeaderNavActiveLabel,
  subscribeToPathname,
} from "../HeroSection/heroSectionUtils";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import type { ResolvedSectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";
import {
  headerChromeStyles,
  logoFocusedHeaderAppearanceCssVars,
  resolveHeaderAppearance,
} from "../../shared/headerAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  HEADER_BRAND_NAME_DEFAULT,
  HEADER_BRAND_SUBTITLE_DEFAULT,
  HEADER_NAV_LINK_TEXT_DEFAULT,
} from "../../shared/textStyleDefaults/headerTextStyleDefaults";

export type LogoFocusedHeaderNavBlockProps = {
  label?: string;
  link?: string;
};

export type LogoFocusedHeaderNavBlock = {
  id: string;
  type: "navItem";
  props: LogoFocusedHeaderNavBlockProps;
};

export type LogoFocusedHeaderControls = {
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

export type LogoFocusedHeaderSettings = {
  props?: LogoFocusedHeaderControls & {
    appearance?: import("../../shared/sectionAppearance").SectionAppearance;
  };
  blocks?: LogoFocusedHeaderNavBlock[];
};

export type LogoFocusedHeaderSectionDoc = {
  id: string;
  type: "header";
  enabled?: boolean;
  settings: LogoFocusedHeaderSettings;
};

export type LogoFocusedHeaderProps = {
  section: LogoFocusedHeaderSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
  cartCount?: number | string;
  onSearchChnage?: (search?: string) => void;
  onProfileClick?: (data?: any) => void;
  onCartClick?: (data?: any) => void;
};

function safeText(v: unknown): string {
  return String(v ?? "").trim();
}

function handleClientNavClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  options?: { scrollToTop?: boolean },
) {
  if (
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  ) {
    return;
  }

  try {
    const navPath = normalizeNavLinkPath(href);
    if (!navPath) return;

    e.preventDefault();
    window.history.pushState({}, "", navPath);
    window.dispatchEvent(new PopStateEvent("popstate"));

    if (options?.scrollToTop) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  } catch {
    // If URL parsing fails, fall back to normal browser navigation.
  }
}

function IconUser() {
  return (
    <svg
      className="ak-lfh__icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg
      className="ak-lfh__icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg
      className="ak-lfh__icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconX() {
  return (
    <svg
      className="ak-lfh__icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

type NavToggleProps = {
  items: { label: string; link?: string }[];
  active: string;
  onSelect: (label: string) => void;
  linkFontStyle?: React.CSSProperties;
  navShellStyle?: React.CSSProperties;
  inactivePillStyle?: React.CSSProperties;
  activePillStyle?: React.CSSProperties;
};

function NavToggle({
  items,
  active,
  onSelect,
  linkFontStyle,
  navShellStyle,
  inactivePillStyle,
  activePillStyle,
}: NavToggleProps) {
  if (items.length === 0) return null;

  return (
    <div
      className="ak-lfh__navToggle"
      role="tablist"
      aria-label="Primary navigation"
      style={navShellStyle}
    >
      {items.map((item, idx) => {
        const isActive = active === item.label;
        const href = safeText(item.link);
        const pillStyle = {
          ...linkFontStyle,
          ...(isActive ? activePillStyle : inactivePillStyle),
        };
        return (
          href ? (
            <a
              key={`${item.label}-${idx}`}
              href={href}
              role="tab"
              aria-selected={isActive}
              className={
                isActive
                  ? "ak-lfh__navPill ak-lfh__navPill--active"
                  : "ak-lfh__navPill"
              }
              style={pillStyle}
              onClick={(e) => {
                onSelect(item.label);
                handleClientNavClick(e, href);
              }}
            >
              {item.label}
            </a>
          ) : (
            <button
              key={`${item.label}-${idx}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={
                isActive
                  ? "ak-lfh__navPill ak-lfh__navPill--active"
                  : "ak-lfh__navPill"
              }
              style={pillStyle}
              onClick={() => onSelect(item.label)}
            >
              {item.label}
            </button>
          )
        );
      })}
    </div>
  );
}

export default function LogoFocusedHeader({
  section,
  appearance,
  theme,
  cartCount,
  onSearchChnage,
  onProfileClick,
  onCartClick,
}: LogoFocusedHeaderProps) {
  const props = section?.settings?.props ?? {};
  const rawBlocks = section?.settings?.blocks;

  const [pathname, setPathname] = useState<string>(() => {
    try {
      return window.location.pathname ?? "";
    } catch {
      return "";
    }
  });

  useEffect(() => subscribeToPathname(setPathname), []);

  const navItems = useMemo(() => {
    const blocks = Array.isArray(rawBlocks) ? rawBlocks : [];
    return blocks.slice(0, 2).map((b, i) => ({
      label: safeText(b?.props?.label) || (i === 0 ? "Home" : "Shop"),
      link: safeText(b?.props?.link),
    }));
  }, [rawBlocks]);

  const [activeLabel, setActiveLabel] = useState(() => {
    try {
      const p = window.location.pathname ?? "";
      return resolveHeaderNavActiveLabel(p, navItems) ?? "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    setActiveLabel(resolveHeaderNavActiveLabel(pathname, navItems) ?? "");
  }, [pathname, navItems]);

  const logoText = safeText(props.logoText) || "Logo";
  const brandName = safeText(props.brandName) || "";
  const brandSubtitle = safeText(props.brandSubtitle) || "";
  const logoSrc = normalizeImageUrl(props.logoImage);
  const showSubtitle = props.showBrandSubtitle !== false;
  const showProfile = props.showProfileIcon !== false;
  const showCart = props.showCartIcon !== false;
  const sticky = props.stickyHeader !== false;

  const brandNameStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "brandName",
          role: "heading",
          defaultStyle: HEADER_BRAND_NAME_DEFAULT,
        })
      ),
    [section, theme]
  );

  const brandSubtitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "brandSubtitle",
          role: "body",
          defaultStyle: HEADER_BRAND_SUBTITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const navLinkFontStyle = useMemo(
    () => {
      const resolved = resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey: "navLinkText",
        role: "body",
        defaultStyle: HEADER_NAV_LINK_TEXT_DEFAULT,
      });
      return {
        fontFamily: resolved.fontFamily,
        fontWeight: resolved.fontWeight,
        fontSize: resolved.fontSize,
      };
    },
    [section, theme]
  );

  const resolvedHeaderAppearance = useMemo(
    () => resolveHeaderAppearance({ section, theme }),
    [section, theme]
  );

  const headerChrome = useMemo(
    () => headerChromeStyles(resolvedHeaderAppearance),
    [resolvedHeaderAppearance]
  );

  const headerBarStyle = useMemo(
    () => ({
      ...sectionAppearanceStyle(appearance),
      ...logoFocusedHeaderAppearanceCssVars(resolvedHeaderAppearance),
    }),
    [appearance, resolvedHeaderAppearance]
  );

  const showSearch = pathname?.startsWith("/store");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const desktopSearchRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);
  const desktopInputRef = useRef<HTMLInputElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimerRef = useRef<number | undefined>(undefined);

  const setSearchOpen = (next: boolean) => {
    setIsSearchOpen(next);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    // When navigating away from the store, reset search UI/state.
    if (showSearch) return;
    if (!isSearchOpen && searchValue.trim() === "") return;

    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    setIsSearchOpen(false);
    setSearchValue("");
    onSearchChnage?.("");
  }, [showSearch, isSearchOpen, searchValue, onSearchChnage]);

  useEffect(() => {
    if (!showSearch || !isSearchOpen) return;

    const raf = window.requestAnimationFrame(() => {
      const isMobile = window.matchMedia?.("(max-width: 768px)")?.matches ?? false;
      const el = (isMobile ? mobileInputRef.current : desktopInputRef.current) ?? desktopInputRef.current ?? mobileInputRef.current;
      el?.focus();
    });

    return () => window.cancelAnimationFrame(raf);
  }, [isSearchOpen, showSearch]);

  useEffect(() => {
    if (!showSearch || !isSearchOpen) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      const insideDesktop = desktopSearchRef.current?.contains(target) ?? false;
      const insideMobile = mobileSearchRef.current?.contains(target) ?? false;
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

  const handleSearchChange = (next: string) => {
    setSearchValue(next);

    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(() => {
      if (onSearchChnage)
        onSearchChnage(next);
    }, 300);
  };

  const clearSearch = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setSearchValue("");
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    onSearchChnage?.("");

    const isMobile = window.matchMedia?.("(max-width: 768px)")?.matches ?? false;
    const el = (isMobile ? mobileInputRef.current : desktopInputRef.current) ?? desktopInputRef.current ?? mobileInputRef.current;
    el?.focus();
  };

  return (
    <header className={`ak-lfh ${sticky ? "ak-lfh__bar--sticky" : ""}`}>
      <div className="ak-lfh__bar" style={headerBarStyle}>
        <div className="ak-lfh__row">
          <div className="ak-lfh__brand">
            <div className="ak-lfh__brandMark">
              <a
                href="/"
                className="ak-lfh__logoBadge"
                aria-label={brandName ? `Go to ${brandName} home` : "Go to home"}
                onClick={(e) => handleClientNavClick(e, "/", { scrollToTop: true })}
              >
                {logoSrc ? (
                  <img
                    className="ak-lfh__logoImg"
                    src={logoSrc}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <span className="ak-lfh__logoText">{logoText}</span>
                )}
              </a>
              {showProfile ? (
                <button
                  type="button"
                  className="ak-lfh__iconBtn ak-lfh__iconBtn--profileMobile"
                  aria-label="Account"
                  style={headerChrome.iconButton}
                  onClick={() => onProfileClick?.()}
                >
                  <IconUser />
                </button>
              ) : null}
            </div>
            <div className="ak-lfh__brandText">
              <div className="ak-lfh__brandName" style={brandNameStyle}>
                {brandName}
              </div>
              {showSubtitle ? (
                <div className="ak-lfh__brandSub" style={brandSubtitleStyle}>
                  {brandSubtitle}
                </div>
              ) : null}
            </div>
          </div>

          <div className="ak-lfh__center">
            <NavToggle
              items={navItems}
              active={activeLabel}
              onSelect={setActiveLabel}
              linkFontStyle={navLinkFontStyle}
              navShellStyle={headerChrome.navShell}
              inactivePillStyle={headerChrome.inactivePill}
              activePillStyle={headerChrome.activePill}
            />
          </div>

          <div className="ak-lfh__actions">
            {showSearch ? (
              <div
                ref={desktopSearchRef}
                className={isSearchOpen ? "ak-lfh__search ak-lfh__search--open" : "ak-lfh__search"}
              >
                {!isSearchOpen ? (
                  <button
                    type="button"
                    className="ak-lfh__iconBtn"
                    aria-label="Search"
                    aria-expanded={false}
                    style={headerChrome.iconButton}
                    onClick={() => setSearchOpen(true)}
                  >
                    <IconSearch />
                  </button>
                ) : null}
                {isSearchOpen ? (
                  <span
                    className="ak-lfh__searchIconSpacer"
                    aria-hidden
                    onClick={(e) => {
                      // Prevent mobile taps on the old icon area from being treated
                      // as an outside click (which would close when empty).
                      e.stopPropagation();
                    }}
                  />
                ) : null}

                <div className="ak-lfh__searchField" aria-hidden={!isSearchOpen}>
                  <div className="ak-lfh__searchInputWrap">
                    <span className="ak-lfh__searchInputIcon" aria-hidden>
                      <IconSearch />
                    </span>
                    <input
                      ref={desktopInputRef}
                      className="ak-lfh__searchInput"
                      type="search"
                      inputMode="search"
                      autoComplete="off"
                      placeholder="Search products..."
                      value={searchValue}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.preventDefault();
                      }}
                    />
                    {searchValue.trim() ? (
                      <button
                        type="button"
                        className="ak-lfh__searchClear"
                        aria-label="Clear search"
                        onClick={(e) => clearSearch(e)}
                      >
                        <IconX />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
            {showProfile ? (
              <button
                type="button"
                id="profile-button"
                className="ak-lfh__iconBtn ak-lfh__iconBtn--profileDesktop"
                aria-label="Account"
                style={headerChrome.iconButton}
                onClick={() => onProfileClick?.()}
              >
                <IconUser />
              </button>
            ) : null}
            {showCart ? (
              <button
                type="button"
                className="ak-lfh__iconBtn"
                aria-label="Shopping cart"
                style={headerChrome.iconButton}
                onClick={() => onCartClick?.()}
              >
                <IconBag />
                <span className="ak-lfh__badge" style={headerChrome.cartBadge}>
                  {cartCount ?? 0}
                </span>
              </button>
            ) : null}
          </div>
        </div>

        {showSearch ? (
          <div
            ref={mobileSearchRef}
            className={isSearchOpen ? "ak-lfh__searchMobile ak-lfh__searchMobile--open" : "ak-lfh__searchMobile"}
            aria-hidden={!isSearchOpen}
          >
            <div className="ak-lfh__searchMobileInner">
              <div className="ak-lfh__searchInputWrap">
                <span className="ak-lfh__searchInputIcon" aria-hidden>
                  <IconSearch />
                </span>
                <input
                  ref={mobileInputRef}
                  className="ak-lfh__searchInput"
                  type="search"
                  inputMode="search"
                  autoComplete="off"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                />
                {searchValue.trim() ? (
                  <button
                    type="button"
                    className="ak-lfh__searchClear"
                    aria-label="Clear search"
                    onClick={(e) => clearSearch(e)}
                  >
                    <IconX />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>

    </header>
  );
}
