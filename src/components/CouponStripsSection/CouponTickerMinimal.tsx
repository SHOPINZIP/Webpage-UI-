import React, { useMemo } from "react";

import { usePrefersReducedMotion } from "../MessageStyleTestimonialsSection/hooks";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  COUPON_CODE_DEFAULT,
  COUPON_HEADING_DEFAULT,
  COUPON_SUBHEADING_DEFAULT,
  COUPON_TITLE_DEFAULT,
} from "../../shared/textStyleDefaults/couponTextStyleDefaults";
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
  codeStyle,
  titleStyle,
}: {
  items: CouponTickerItem[];
  reverse?: boolean;
  durationSec: number;
  reducedMotion: boolean;
  secondary?: boolean;
  codeStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
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
              <span
                className="ak-coupon-ticker__code ak-coupon-ticker__code--secondary"
                style={codeStyle}
              >
                {item.code}
              </span>
            ) : (
              <span className="ak-coupon-ticker__pill" style={codeStyle}>
                {item.code}
              </span>
            )}

            <span
              className={
                secondary
                  ? "ak-coupon-ticker__title ak-coupon-ticker__title--secondary"
                  : "ak-coupon-ticker__title"
              }
              style={titleStyle}
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

export default function CouponTickerMinimal({
  section,
  appearance,
  theme,
}: CouponTickerMinimalProps) {
  if (section?.enabled === false) return null;

  const reducedMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};

  const heading = safeText(props.heading) || "Active Offers";
  const subheading = safeText(props.subheading);
  const showSubheading = props.showSubheading !== false;
  const showSecondaryStrip = props.showSecondaryStrip !== false;
  const stripSpeedPrimary = normalizeSpeed(props.stripSpeedPrimary, 20);
  const stripSpeedSecondary = normalizeSpeed(props.stripSpeedSecondary, 28);

  const headingStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "heading",
          role: "heading",
          defaultStyle: COUPON_HEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const subheadingStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "subheading",
          role: "body",
          defaultStyle: COUPON_SUBHEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const couponCodeStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "couponCode",
          role: "body",
          defaultStyle: COUPON_CODE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const couponTitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "couponTitle",
          role: "body",
          defaultStyle: COUPON_TITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const items = useMemo(
    () => buildTickerItems(section?.settings?.blocks),
    [section?.settings?.blocks]
  );

  const showTicker = items.length > 0;

  return (
    <section className="ak-coupon-ticker" style={sectionAppearanceStyle(appearance)}>
      <span className="ak-coupon-ticker__divider-line ak-coupon-ticker__divider-line--top" aria-hidden />
      <span className="ak-coupon-ticker__divider-line ak-coupon-ticker__divider-line--bottom" aria-hidden />

      <div className="ak-coupon-ticker__header">
        <h2 className="ak-coupon-ticker__heading" style={headingStyle}>
          {heading}
        </h2>
        {showSubheading && subheading ? (
          <p className="ak-coupon-ticker__subheading" style={subheadingStyle}>
            {subheading}
          </p>
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
            codeStyle={couponCodeStyle}
            titleStyle={couponTitleStyle}
          />

          {showSecondaryStrip ? (
            <div className="ak-coupon-ticker__secondary-wrap">
              <TickerRow
                items={items}
                reverse
                secondary
                durationSec={stripSpeedSecondary}
                reducedMotion={reducedMotion}
                codeStyle={couponCodeStyle}
                titleStyle={couponTitleStyle}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
