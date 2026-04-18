import React, { useEffect, useMemo, useState } from "react";

import { normalizeImageUrl } from "../HeroSection/heroSectionUtils";

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

export default function LogoFocusedHeader({ section }: LogoFocusedHeaderProps) {
  const props = section?.settings?.props ?? {};
  const rawBlocks = section?.settings?.blocks;

  const navItems = useMemo(() => {
    const blocks = Array.isArray(rawBlocks) ? rawBlocks : [];
    return blocks.slice(0, 2).map((b, i) => ({
      label: safeText(b?.props?.label) || (i === 0 ? "Home" : "Shop"),
      link: safeText(b?.props?.link),
    }));
  }, [rawBlocks]);

  const [activeLabel, setActiveLabel] = useState(() => navItems[0]?.label ?? "");

  useEffect(() => {
    setActiveLabel((prev) => {
      if (navItems.some((n) => n.label === prev)) return prev;
      return navItems[0]?.label ?? "";
    });
  }, [navItems]);

  const logoText = safeText(props.logoText) || "Logo";
  const brandName = safeText(props.brandName) || "";
  const brandSubtitle = safeText(props.brandSubtitle) || "";
  const logoSrc = normalizeImageUrl(props.logoImage);
  const showSubtitle = props.showBrandSubtitle !== false;
  const showProfile = props.showProfileIcon !== false;
  const showCart = props.showCartIcon !== false;
  const cartBadge = safeText(props.cartCount);
  const sticky = props.stickyHeader !== false;

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
            {showProfile ? (
              <button
                type="button"
                className="ak-lfh__iconBtn ak-lfh__iconBtn--profileDesktop"
                aria-label="Account"
              >
                <IconUser />
              </button>
            ) : null}
            {showCart ? (
              <button type="button" className="ak-lfh__iconBtn" aria-label="Shopping cart">
                <IconBag />
                {cartBadge ? <span className="ak-lfh__badge">{cartBadge}</span> : null}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
