import React, { useMemo } from "react";

import { usePrefersReducedMotion } from "../MessageStyleTestimonialsSection/hooks";
import type { CouponTickerMinimalProps } from "./types";

type CouponTickerItem = {
  key: string;
  code: string;
  title: string;
};

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

function normalizeSpeed(value: unknown, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return n;
}

function buildTickerItems(rawBlocks: unknown): CouponTickerItem[] {
  if (!Array.isArray(rawBlocks)) return [];

  const baseItems = rawBlocks
    .filter((block) => block && typeof block === "object")
    .map((block, index) => {
      const props =
        (block as { props?: { code?: unknown; title?: unknown } })?.props ?? {};
      const code = safeText(props.code);
      const title = safeText(props.title);
      return {
        key: safeText((block as { id?: unknown }).id) || `coupon-${index + 1}`,
        code,
        title,
      };
    })
    .filter((item) => item.code || item.title);

  if (baseItems.length === 0) return [];

  // Lightweight static expansion to avoid visible gaps when coupon count is low.
  // No DOM measurements/observers; purely data-side duplication for marquee continuity.
  const copiesPerSequence =
    baseItems.length === 1
      ? 8
      : baseItems.length === 2
        ? 6
        : baseItems.length === 3
          ? 4
          : baseItems.length === 4
            ? 3
            : 2;

  const expanded: CouponTickerItem[] = [];
  for (let copy = 0; copy < copiesPerSequence; copy += 1) {
    baseItems.forEach((item, index) => {
      expanded.push({
        ...item,
        key: `${item.key}-s${copy}-i${index}`,
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
}: {
  items: CouponTickerItem[];
  reverse?: boolean;
  durationSec: number;
  reducedMotion: boolean;
  secondary?: boolean;
}) {
  const loopItems = useMemo(
    () =>
      [...items, ...items].map((item, index) => ({
        ...item,
        key: `${item.key}-${index}`,
      })),
    [items]
  );

  const trackClass = secondary
    ? "ak-coupon-ticker__track ak-coupon-ticker__track--secondary"
    : "ak-coupon-ticker__track";

  const animationName = reverse
    ? "ak-coupon-ticker-scroll-reverse"
    : "ak-coupon-ticker-scroll";

  return (
    <div className="ak-coupon-ticker__row">
      <div
        className={trackClass}
        style={
          reducedMotion
            ? undefined
            : {
                animationName,
                animationDuration: `${durationSec}s`,
              }
        }
      >
        {loopItems.map((item) => (
          <div key={item.key} className="ak-coupon-ticker__item">
            {secondary ? (
              <span className="ak-coupon-ticker__code ak-coupon-ticker__code--secondary">
                {item.code}
              </span>
            ) : (
              <span className="ak-coupon-ticker__pill">{item.code}</span>
            )}

            <span
              className={
                secondary
                  ? "ak-coupon-ticker__title ak-coupon-ticker__title--secondary"
                  : "ak-coupon-ticker__title"
              }
            >
              {item.title}
            </span>

            <span
              className={
                secondary
                  ? "ak-coupon-ticker__divider ak-coupon-ticker__divider--secondary"
                  : "ak-coupon-ticker__divider"
              }
              aria-hidden
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CouponTickerMinimal({ section }: CouponTickerMinimalProps) {
  if (section?.enabled === false) return null;

  const reducedMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};

  const heading = safeText(props.heading) || "Active Offers";
  const subheading = safeText(props.subheading);
  const showSubheading = props.showSubheading !== false;
  const showSecondaryStrip = props.showSecondaryStrip !== false;
  const stripSpeedPrimary = normalizeSpeed(props.stripSpeedPrimary, 20);
  const stripSpeedSecondary = normalizeSpeed(props.stripSpeedSecondary, 28);

  const items = useMemo(
    () => buildTickerItems(section?.settings?.blocks),
    [section?.settings?.blocks]
  );

  const showTicker = items.length > 0;

  return (
    <section className="ak-coupon-ticker">
      <span className="ak-coupon-ticker__divider-line ak-coupon-ticker__divider-line--top" aria-hidden />
      <span className="ak-coupon-ticker__divider-line ak-coupon-ticker__divider-line--bottom" aria-hidden />

      <div className="ak-coupon-ticker__header">
        <h2 className="ak-coupon-ticker__heading">{heading}</h2>
        {showSubheading && subheading ? (
          <p className="ak-coupon-ticker__subheading">{subheading}</p>
        ) : null}
      </div>

      {showTicker ? (
        <div className="ak-coupon-ticker__strips">
          <div className="ak-coupon-ticker__fade ak-coupon-ticker__fade--left" aria-hidden />
          <div className="ak-coupon-ticker__fade ak-coupon-ticker__fade--right" aria-hidden />

          <TickerRow
            items={items}
            durationSec={stripSpeedPrimary}
            reducedMotion={reducedMotion}
          />

          {showSecondaryStrip ? (
            <div className="ak-coupon-ticker__secondary-wrap">
              <TickerRow
                items={items}
                reverse
                secondary
                durationSec={stripSpeedSecondary}
                reducedMotion={reducedMotion}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
