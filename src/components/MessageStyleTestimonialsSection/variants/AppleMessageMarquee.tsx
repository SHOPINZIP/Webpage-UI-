import React, { useMemo } from "react";
import { sectionAppearanceStyle } from "../../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../../shared/sectionTypography";
import {
  TESTIMONIAL_CUSTOMER_NAME_DEFAULT,
  TESTIMONIAL_CUSTOMER_ROLE_DEFAULT,
  TESTIMONIAL_QUOTE_TEXT_DEFAULT,
  TESTIMONIAL_SUBHEADING_DEFAULT,
} from "../../../shared/textStyleDefaults/testimonialTextStyleDefaults";
import { usePrefersReducedMotion } from "../hooks";
import {
  buildMarqueeLoop,
  getVisibleTestimonialItems,
  resolveHeading,
} from "../shared";
import type {
  MessageStyleTestimonialsProps,
  MessageStyleTestimonialItemProps,
} from "../types";

function parsePx(n: unknown, fallback: number): number {
  const v = Number(n);
  return Number.isFinite(v) ? v : fallback;
}

function parseDurationSec(n: unknown, fallback: number): number {
  const v = Number(n);
  if (!Number.isFinite(v) || v < 8) return fallback;
  return Math.min(120, v);
}

function StarRating({
  rating,
  visible,
}: {
  rating: number;
  visible: boolean;
}) {
  if (!visible) return null;
  const r = Math.min(5, Math.max(1, Math.round(rating || 5)));
  return (
    <div className="ak-mst-apple__stars" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={
            i < r
              ? "ak-mst-apple__star ak-mst-apple__star--on"
              : "ak-mst-apple__star"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

function AppleCard({
  item,
  showStars,
  quoteStyle,
  nameStyle,
  roleStyle,
}: {
  item: MessageStyleTestimonialItemProps;
  showStars: boolean;
  quoteStyle?: React.CSSProperties;
  nameStyle?: React.CSSProperties;
  roleStyle?: React.CSSProperties;
}) {
  const name = String(item?.name ?? "").trim();
  const role = String(item?.role ?? "").trim();
  const quote = String(item?.quote ?? "").trim();
  const rating = Number(item?.rating);
  const stars = Number.isFinite(rating) ? rating : 5;

  return (
    <div className="ak-mst-apple__card-wrap">
      <div className="ak-mst-apple__card">
        <StarRating rating={stars} visible={showStars} />
        <p className="ak-mst-apple__quote" style={quoteStyle}>
          {quote ? (
            <>
              <span className="ak-mst-apple__q">“</span>
              {quote}
              <span className="ak-mst-apple__q">”</span>
            </>
          ) : (
            <span className="ak-mst-apple__placeholder">Add a quote</span>
          )}
        </p>
        <div className="ak-mst-apple__footer">
          <span className="ak-mst-apple__name" style={nameStyle}>
            {name || "Name"}
          </span>
          {role ? (
            <span className="ak-mst-apple__role" style={roleStyle}>
              {role}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function AppleMessageMarquee({
  section,
  appearance,
  theme,
}: MessageStyleTestimonialsProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const heading = resolveHeading(props);
  const sub = String(props.subheading ?? "").trim();
  const bg = String(props.backgroundColor ?? "").trim() || "#f5f5f7";
  const row1 = parseDurationSec(props.rowOneSpeed, 34);
  const row2 = parseDurationSec(props.rowTwoSpeed, 38);
  const pauseOnHover = Boolean(props.pauseOnHover);
  const showStars = props.showStars !== false;
  const padTop = parsePx(props.sectionPaddingTop, 72);
  const padBot = parsePx(props.sectionPaddingBottom, 72);

  const blocks = section?.settings?.blocks;
  const items = useMemo(
    () => getVisibleTestimonialItems(blocks),
    [blocks]
  );

  const loop = useMemo(
    () => (items.length > 0 ? buildMarqueeLoop(items, 6) : []),
    [items]
  );

  const subheadingStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "subheading",
          role: "body",
          defaultStyle: TESTIMONIAL_SUBHEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const quoteTextStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "quoteText",
          role: "body",
          defaultStyle: TESTIMONIAL_QUOTE_TEXT_DEFAULT,
        })
      ),
    [section, theme]
  );

  const customerNameStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "customerName",
          role: "heading",
          defaultStyle: TESTIMONIAL_CUSTOMER_NAME_DEFAULT,
        })
      ),
    [section, theme]
  );

  const customerRoleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "customerRole",
          role: "body",
          defaultStyle: TESTIMONIAL_CUSTOMER_ROLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const sectionStyle: React.CSSProperties = {
    ...sectionAppearanceStyle(appearance),
    background: bg,
    paddingTop: padTop,
    paddingBottom: padBot,
  };

  const cls = [
    "ak-mst-apple",
    pauseOnHover ? "ak-mst-apple--pause-hover" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={cls}
      style={sectionStyle}
      aria-label={heading || "Testimonials"}
    >
      <div className="ak-mst-apple__inner">
        <header className="ak-mst-apple__intro">
          <h2 className="ak-mst-apple__title">
            {heading || "Loved by merchants."}
          </h2>
          {sub ? (
            <p className="ak-mst-apple__sub" style={subheadingStyle}>
              {sub}
            </p>
          ) : null}
        </header>

        {items.length === 0 ? (
          <p className="ak-mst-apple__empty">No testimonials yet.</p>
        ) : reduceMotion ? (
          <div className="ak-mst-apple__static-grid">
            {items.map((item, i) => (
              <AppleCard
                key={i}
                item={item}
                showStars={showStars}
                quoteStyle={quoteTextStyle}
                nameStyle={customerNameStyle}
                roleStyle={customerRoleStyle}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="ak-mst-apple__marquee">
              <div
                className="ak-mst-apple__track ak-mst-apple__track--1"
                style={
                  {
                    ["--ak-mst-apple-dur" as string]: `${row1}s`,
                  } as React.CSSProperties
                }
              >
                {loop.map((item, index) => (
                  <AppleCard
                    key={`r1-${index}`}
                    item={item}
                    showStars={showStars}
                    quoteStyle={quoteTextStyle}
                    nameStyle={customerNameStyle}
                    roleStyle={customerRoleStyle}
                  />
                ))}
              </div>
            </div>
            <div className="ak-mst-apple__marquee ak-mst-apple__marquee--second">
              <div
                className="ak-mst-apple__track ak-mst-apple__track--2"
                style={
                  {
                    ["--ak-mst-apple-dur" as string]: `${row2}s`,
                  } as React.CSSProperties
                }
              >
                {loop.map((item, index) => (
                  <AppleCard
                    key={`r2-${index}`}
                    item={item}
                    showStars={showStars}
                    quoteStyle={quoteTextStyle}
                    nameStyle={customerNameStyle}
                    roleStyle={customerRoleStyle}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
