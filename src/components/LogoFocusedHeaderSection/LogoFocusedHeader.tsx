import React, { useEffect, useMemo, useRef, useState } from "react";

import { normalizeImageUrl, resolveHeaderNavActiveLabel } from "../HeroSection/heroSectionUtils";

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
  props?: LogoFocusedHeaderControls;
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
  cartCount?: number | string;
  onSearchChnage?: (search?: string) => void;
  onProfileClick?: (data?: any) => void;
  onCartClick?: (data?: any) => void;
};

function safeText(v: unknown): string {
  return String(v ?? "").trim();
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
};

function NavToggle({ items, active, onSelect }: NavToggleProps) {
  if (items.length === 0) return null;

  return (
    <div className="ak-lfh__navToggle" role="tablist" aria-label="Primary navigation">
      {items.map((item, idx) => {
        const isActive = active === item.label;
        const href = safeText(item.link);
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
              onClick={(e) => {
                onSelect(item.label);
                // Keep default link behavior for new-tab / new-window / context menu.
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

                // If the host app uses a client-side router, updating history is enough
                // for it to respond without a full page reload.
                try {
                  const raw = href.trim();
                  const isAbsolute = /^https?:\/\//i.test(raw);

                  // Treat "store/..." as "/store/..." to avoid path-appending like
                  // /store/.../store/... when clicked from a nested route.
                  const normalized = !isAbsolute && raw && !raw.startsWith("/") && !raw.startsWith("#")
                    ? `/${raw.replace(/^\.\//, "")}`
                    : raw;

                  // Full URL support: if it’s same-origin we can pushState; otherwise
                  // fall back to normal browser navigation.
                  const base = window.location.origin;
                  const url = new URL(normalized, base);

                  if (url.origin !== window.location.origin) return;

                  e.preventDefault();
                  window.history.pushState({}, "", url.pathname + url.search + url.hash);
                  window.dispatchEvent(new PopStateEvent("popstate"));
                } catch {
                  // If URL parsing fails, fall back to normal browser navigation.
                }
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

export default function LogoFocusedHeader({ section, cartCount, onSearchChnage, onProfileClick, onCartClick }: LogoFocusedHeaderProps) {
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

  useEffect(() => {
    setActiveLabel((prev) => {
      const matched = resolveHeaderNavActiveLabel(pathname, navItems);
      if (matched !== null) return matched;
      if (navItems.some((n) => n.label === prev)) return prev;
      return navItems[0]?.label ?? "";
    });
  }, [pathname, navItems]);

  const logoText = safeText(props.logoText) || "Logo";
  const brandName = safeText(props.brandName) || "";
  const brandSubtitle = safeText(props.brandSubtitle) || "";
  const logoSrc = normalizeImageUrl(props.logoImage);
  const showSubtitle = props.showBrandSubtitle !== false;
  const showProfile = props.showProfileIcon !== false;
  const showCart = props.showCartIcon !== false;
  const cartBadge = safeText(props.cartCount);
  const sticky = props.stickyHeader !== false;

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
      <div className="ak-lfh__bar">
        <div className="ak-lfh__row">
          <div className="ak-lfh__brand">
            <div className="ak-lfh__logoBadge" aria-hidden={Boolean(logoSrc)}>
              {logoSrc ? (
                <img
                  className="ak-lfh__logoImg"
                  src={logoSrc}
                  alt={brandName}
                  loading="lazy"
                />
              ) : (
                <span className="ak-lfh__logoText">{logoText}</span>
              )}
            </div>
            <div className="ak-lfh__brandText">
              <div className="ak-lfh__brandName">{brandName}</div>
              {showSubtitle ? (
                <div className="ak-lfh__brandSub">{brandSubtitle}</div>
              ) : null}
            </div>
          </div>

          <div className="ak-lfh__center">
            <NavToggle items={navItems} active={activeLabel} onSelect={setActiveLabel} />
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
                onClick={() => onCartClick?.()}
              >
                <IconBag />
                <span className="ak-lfh__badge">{cartCount ?? 0}</span>
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
