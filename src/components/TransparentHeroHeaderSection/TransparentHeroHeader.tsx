import React, { useEffect, useMemo, useRef, useState } from "react";

import { normalizeImageUrl, resolveHeaderNavActiveLabel } from "../HeroSection/heroSectionUtils";

export type TransparentHeroHeaderNavBlockProps = {
  label?: string;
  link?: string;
};

export type TransparentHeroHeaderNavBlock = {
  id: string;
  type: "navItem";
  props: TransparentHeroHeaderNavBlockProps;
};

export type TransparentHeroHeaderControls = {
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

export type TransparentHeroHeaderSettings = {
  props?: TransparentHeroHeaderControls;
  blocks?: TransparentHeroHeaderNavBlock[];
};

export type TransparentHeroHeaderSectionDoc = {
  id: string;
  type: "header";
  enabled?: boolean;
  settings: TransparentHeroHeaderSettings;
};

export type TransparentHeroHeaderProps = {
  section: TransparentHeroHeaderSectionDoc;
  cartCount?: number | string;
  onSearchChnage?: (search?: string) => void;
  onProfileClick?: (data?: any) => void;
  onCartClick?: (data?: any) => void;
};

function safeText(v: unknown): string {
  return String(v ?? "").trim();
}

function parseOpacity(v: unknown, fallback: number): number {
  const n = parseFloat(String(v ?? ""));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(1, Math.max(0, n));
}

function parseBlurPx(v: unknown, fallback: number): number {
  const n = parseFloat(String(v ?? ""));
  if (!Number.isFinite(n) || n < 0) return fallback;
  return n;
}

function IconUser() {
  return (
    <svg
      className="ak-thh__icon"
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
      className="ak-thh__icon"
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
      className="ak-thh__icon"
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
      className="ak-thh__icon"
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

type NavPillProps = {
  items: { label: string; link?: string }[];
  active: string;
  onSelect: (label: string) => void;
  scrolled: boolean;
};

function NavPills({ items, active, onSelect, scrolled }: NavPillProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={[
        "ak-thh__navShell",
        scrolled ? "ak-thh__navShell--scrolled" : "ak-thh__navShell--top",
      ].join(" ")}
      role="tablist"
      aria-label="Primary navigation"
    >
      {items.map((item, idx) => {
        const isActive = active === item.label;
        const href = safeText(item.link);
        const pillClass = [
          "ak-thh__navPill",
          isActive ? "ak-thh__navPill--active" : "",
          scrolled ? "ak-thh__navPill--scrolled" : "ak-thh__navPill--top",
        ]
          .filter(Boolean)
          .join(" ");

        return href ? (
          <a
            key={`${item.label}-${idx}`}
            href={href}
            role="tab"
            aria-selected={isActive}
            className={pillClass}
            onClick={() => onSelect(item.label)}
          >
            {item.label}
          </a>
        ) : (
          <button
            key={`${item.label}-${idx}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={pillClass}
            onClick={() => onSelect(item.label)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default function TransparentHeroHeader({ section, cartCount, onSearchChnage, onProfileClick, onCartClick }: TransparentHeroHeaderProps) {
  const props = section?.settings?.props ?? {};
  const rawBlocks = section?.settings?.blocks;

  const [pathname, setPathname] = useState<string>(() => {
    try {
      return window.location.pathname ?? "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname ?? "");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

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
      return resolveHeaderNavActiveLabel(p, navItems) ?? navItems[0]?.label ?? "";
    } catch {
      return navItems[0]?.label ?? "";
    }
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setActiveLabel((prev) => {
      const matched = resolveHeaderNavActiveLabel(pathname, navItems);
      if (matched !== null) return matched;
      if (navItems.some((n) => n.label === prev)) return prev;
      return navItems[0]?.label ?? "";
    });
  }, [pathname, navItems]);

  const enableTransition = props.enableScrollTransition !== false;
  const sticky = props.stickyHeader !== false;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (!sticky && !enableTransition) {
      setScrollY(0);
      return undefined;
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
  const progress = useMemo(
    () => (enableTransition ? Math.min(scrollY / 120, 1) : 0),
    [scrollY, enableTransition]
  );

  const initialAlpha = parseOpacity(props.initialTransparency, 0.04);
  const maxAlpha = parseOpacity(props.maxTransparency, 0.32);
  const maxBlurPx = parseBlurPx(props.maxBlur, 18);

  const bgAlpha = enableTransition
    ? initialAlpha + progress * Math.max(0, maxAlpha - initialAlpha)
    : initialAlpha;
  const blurPx = enableTransition ? progress * maxBlurPx : 0;
  const borderAlpha = enableTransition ? progress * 0.08 : 0;

  const logoText = safeText(props.logoText) || "Logo";
  const logoSrc = normalizeImageUrl(props.logoImage);
  const showProfile = props.showProfileIcon !== false;
  const showCart = props.showCartIcon !== false;

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
    if (!showSearch || !isSearchOpen) return;

    const raf = window.requestAnimationFrame(() => {
      const isMobile = window.matchMedia?.("(max-width: 768px)")?.matches ?? false;
      const el =
        (isMobile ? mobileInputRef.current : desktopInputRef.current) ??
        desktopInputRef.current ??
        mobileInputRef.current;
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
      onSearchChnage?.(next);
    }, 300);
  };

  const clearSearch = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setSearchValue("");
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    onSearchChnage?.("");

    const isMobile = window.matchMedia?.("(max-width: 768px)")?.matches ?? false;
    const el =
      (isMobile ? mobileInputRef.current : desktopInputRef.current) ??
      desktopInputRef.current ??
      mobileInputRef.current;
    el?.focus();
  };

  const iconBtnClass = ["ak-thh__iconBtn", scrolled ? "ak-thh__iconBtn--scrolled" : "ak-thh__iconBtn--top"].join(" ");

  const headerStyle: React.CSSProperties = {
    backgroundColor: `rgba(10, 10, 12, ${bgAlpha})`,
    backdropFilter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
    WebkitBackdropFilter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
    boxShadow: `inset 0 -1px 0 rgba(255,255,255,${borderAlpha})`,
  };

  const positionClass = sticky ? "ak-thh__bar--sticky" : "ak-thh__bar--static";

  return (
    <header className={`ak-thh ${positionClass}`} style={headerStyle}>
      <div className="ak-thh__wrap">
        <div className="ak-thh__inner">
          <div className="ak-thh__logo">
            <div
              className={[
                "ak-thh__logoBadge",
                scrolled ? "ak-thh__logoBadge--scrolled" : "ak-thh__logoBadge--top",
              ].join(" ")}
              aria-hidden={Boolean(logoSrc)}
            >
              {logoSrc ? (
                <img
                  className="ak-thh__logoImg"
                  src={logoSrc}
                  alt={logoText}
                  loading="lazy"
                />
              ) : (
                <span className="ak-thh__logoText">{logoText}</span>
              )}
            </div>
          </div>

          <div className="ak-thh__center">
            <NavPills
              items={navItems}
              active={activeLabel}
              onSelect={setActiveLabel}
              scrolled={scrolled}
            />
          </div>

          <div className="ak-thh__actions">
            {showSearch ? (
              <div
                ref={desktopSearchRef}
                className={isSearchOpen ? "ak-thh__search ak-thh__search--open" : "ak-thh__search"}
              >
                {!isSearchOpen ? (
                  <button
                    type="button"
                    className={iconBtnClass}
                    aria-label="Search"
                    aria-expanded={false}
                    onClick={() => setSearchOpen(true)}
                  >
                    <IconSearch />
                  </button>
                ) : null}
                {isSearchOpen ? (
                  <span
                    className="ak-thh__searchIconSpacer"
                    aria-hidden
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                ) : null}

                <div className="ak-thh__searchField" aria-hidden={!isSearchOpen}>
                  <div className="ak-thh__searchInputWrap">
                    <span className="ak-thh__searchInputIcon" aria-hidden>
                      <IconSearch />
                    </span>
                    <input
                      ref={desktopInputRef}
                      className="ak-thh__searchInput"
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
                        className="ak-thh__searchClear"
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
                className={iconBtnClass}
                aria-label="Account"
                onClick={() => onProfileClick?.()}
              >
                <IconUser />
              </button>
            ) : null}
            {showCart ? (
              <button
                type="button"
                className={iconBtnClass}
                aria-label="Shopping cart"
                onClick={() => onCartClick?.()}
              >
                <IconBag />
                <span className="ak-thh__badge">{cartCount ?? 0}</span>
              </button>
            ) : null}
          </div>
        </div>

        {showSearch ? (
          <div
            ref={mobileSearchRef}
            className={isSearchOpen ? "ak-thh__searchMobile ak-thh__searchMobile--open" : "ak-thh__searchMobile"}
            aria-hidden={!isSearchOpen}
          >
            <div className="ak-thh__searchMobileInner">
              <div className="ak-thh__searchInputWrap">
                <span className="ak-thh__searchInputIcon" aria-hidden>
                  <IconSearch />
                </span>
                <input
                  ref={mobileInputRef}
                  className="ak-thh__searchInput"
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
                    className="ak-thh__searchClear"
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
