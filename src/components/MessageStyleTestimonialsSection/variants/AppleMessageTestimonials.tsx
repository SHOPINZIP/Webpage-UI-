import React, { useEffect, useMemo, useState } from "react";
import { sectionAppearanceStyle } from "../../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../../shared/sectionTypography";
import {
  TESTIMONIAL_CUSTOMER_NAME_DEFAULT,
  TESTIMONIAL_CUSTOMER_ROLE_DEFAULT,
  TESTIMONIAL_DESCRIPTION_DEFAULT,
  TESTIMONIAL_EYEBROW_DEFAULT,
  TESTIMONIAL_HEADING_DEFAULT,
  TESTIMONIAL_QUOTE_TEXT_DEFAULT,
  TESTIMONIAL_SUBHEADING_DEFAULT,
} from "../../../shared/textStyleDefaults/testimonialTextStyleDefaults";
import { usePrefersReducedMotion } from "../hooks";
import {
  getVisibleTestimonialItems,
  resolveHeading,
} from "../shared";
import type {
  MessageStyleTestimonialsProps,
  MessageStyleTestimonialItemProps,
} from "../types";

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

function paddingClass(value: unknown): string {
  const raw = safeText(value).toLowerCase();
  if (raw === "small") return "ak-mst-grouped--pad-sm";
  if (raw === "medium") return "ak-mst-grouped--pad-md";
  return "ak-mst-grouped--pad-lg";
}

function normalizeCardsPerGroup(value: unknown): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 3;
  return Math.min(6, Math.max(1, Math.round(numeric)));
}

function normalizeRotationDuration(value: unknown): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 4200;
  return Math.min(20000, Math.max(1200, Math.round(numeric)));
}

function chunkItems<T>(items: T[], size: number): T[][] {
  if (items.length === 0) return [];
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function StarRating({ rating, visible }: { rating: number; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="ak-mst-grouped__stars" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={
            index < rating
              ? "ak-mst-grouped__star ak-mst-grouped__star--on"
              : "ak-mst-grouped__star"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
  cardIndex,
  absoluteIndex,
  showRating,
  showFooter,
  footerLabel,
  quoteStyle,
  nameStyle,
  roleStyle,
  footerStyle,
}: {
  item: MessageStyleTestimonialItemProps;
  cardIndex: number;
  absoluteIndex: number;
  showRating: boolean;
  showFooter: boolean;
  footerLabel: string;
  quoteStyle?: React.CSSProperties;
  nameStyle?: React.CSSProperties;
  roleStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
}) {
  const isMiddle = cardIndex === 1;
  const message = safeText(item.message ?? item.quote);
  const name = safeText(item.name);
  const role = safeText(item.role);
  const rating = Math.min(5, Math.max(0, Math.round(Number(item.rating) || 0)));

  return (
    <article
      className={`ak-mst-grouped__card${isMiddle ? " ak-mst-grouped__card--middle" : ""}`}
    >
      <div>
        <div className="ak-mst-grouped__cardTop">
          <div className="ak-mst-grouped__person">
            <h3 className="ak-mst-grouped__name" style={nameStyle}>
              {name || "Name"}
            </h3>
            {role ? (
              <p className="ak-mst-grouped__role" style={roleStyle}>
                {role}
              </p>
            ) : null}
          </div>

          <StarRating rating={rating} visible={showRating} />
        </div>

        <p className="ak-mst-grouped__message" style={quoteStyle}>
          {message ? (
            <>
              <span className="ak-mst-grouped__quoteMark">"</span>
              {message}
              <span className="ak-mst-grouped__quoteMark">"</span>
            </>
          ) : (
            <span className="ak-mst-grouped__placeholder">Add a testimonial message</span>
          )}
        </p>
      </div>

      {showFooter ? (
        <div className="ak-mst-grouped__footer">
          <span className="ak-mst-grouped__footerLabel" style={footerStyle}>
            {footerLabel}
          </span>
          <span className="ak-mst-grouped__index">
            {String(absoluteIndex + 1).padStart(2, "0")}
          </span>
        </div>
      ) : null}
    </article>
  );
}

export default function AppleMessageTestimonials({
  section,
  appearance,
  theme,
}: MessageStyleTestimonialsProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const heading = resolveHeading(props);
  const kicker = safeText(props.kicker);
  const subheading = safeText(props.subheading);
  const footerLabel = safeText(props.footerLabel) || "Verified story";
  const showKicker = props.showKicker !== false;
  const showSubheading = props.showSubheading !== false;
  const showDots = props.showDots !== false;
  const showRating = props.showRating !== false;
  const showFooter = props.showFooter !== false;
  const autoRotate = !reduceMotion && props.autoRotate !== false;
  const cardsPerGroup = normalizeCardsPerGroup(props.cardsPerGroup);
  const rotationDuration = normalizeRotationDuration(props.rotationDuration);
  const items = useMemo(
    () => getVisibleTestimonialItems(section?.settings?.blocks),
    [section?.settings?.blocks]
  );
  const groups = useMemo(() => chunkItems(items, cardsPerGroup), [cardsPerGroup, items]);
  const [activeGroup, setActiveGroup] = useState(0);

  useEffect(() => {
    setActiveGroup((current) => (current >= groups.length ? 0 : current));
  }, [groups.length]);

  useEffect(() => {
    if (!autoRotate || groups.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveGroup((current) => (current + 1) % groups.length);
    }, rotationDuration);
    return () => window.clearInterval(timer);
  }, [autoRotate, groups.length, rotationDuration]);

  const visibleGroup = groups[activeGroup] ?? [];

  const kickerStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "kicker",
          role: "body",
          defaultStyle: TESTIMONIAL_EYEBROW_DEFAULT,
        })
      ),
    [section, theme]
  );

  const headingStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "heading",
          role: "heading",
          defaultStyle: TESTIMONIAL_HEADING_DEFAULT,
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
          defaultStyle: TESTIMONIAL_SUBHEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const footerLabelStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "footerLabel",
          role: "body",
          defaultStyle: TESTIMONIAL_DESCRIPTION_DEFAULT,
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

  return (
    <section
      className={`ak-mst-grouped ${paddingClass(props.sectionPadding)}`}
      style={sectionAppearanceStyle(appearance)}
      aria-label={heading || kicker || "Testimonials"}
    >
      <div className="ak-mst-grouped__inner">
        {(heading || (showKicker && kicker) || (showSubheading && subheading)) ? (
          <header className="ak-mst-grouped__header">
            {showKicker && kicker ? (
              <p className="ak-mst-grouped__kicker" style={kickerStyle}>
                {kicker}
              </p>
            ) : null}
            {heading ? (
              <h2 className="ak-mst-grouped__heading" style={headingStyle}>
                {heading}
              </h2>
            ) : null}
            {showSubheading && subheading ? (
              <p className="ak-mst-grouped__subheading" style={subheadingStyle}>
                {subheading}
              </p>
            ) : null}
          </header>
        ) : null}

        {visibleGroup.length > 0 ? (
          <div
            className="ak-mst-grouped__cards"
            key={activeGroup}
            style={{
              gridTemplateColumns: `repeat(${Math.max(visibleGroup.length, 1)}, minmax(0, 1fr))`,
            }}
          >
            {visibleGroup.map((item, index) => (
              <TestimonialCard
                key={`${activeGroup}-${index}-${item.name || "testimonial"}`}
                item={item}
                cardIndex={index}
                absoluteIndex={activeGroup * cardsPerGroup + index}
                showRating={showRating}
                showFooter={showFooter}
                footerLabel={footerLabel}
                quoteStyle={quoteTextStyle}
                nameStyle={customerNameStyle}
                roleStyle={customerRoleStyle}
                footerStyle={footerLabelStyle}
              />
            ))}
          </div>
        ) : null}

        {showDots && groups.length > 1 ? (
          <div className="ak-mst-grouped__controls">
            {groups.map((_, index) => (
              <button
                key={`group-${index}`}
                type="button"
                className={`ak-mst-grouped__dot${index === activeGroup ? " is-active" : ""}`}
                onClick={() => setActiveGroup(index)}
                aria-label={`Show testimonial group ${index + 1}`}
              >
                <span
                  key={index === activeGroup ? `${activeGroup}-${rotationDuration}` : `idle-${index}`}
                  style={
                    {
                      ...(autoRotate
                        ? ({ ["--ak-mst-grouped-progress" as string]: `${rotationDuration}ms` } as React.CSSProperties)
                        : null),
                      transform:
                        index === activeGroup && !autoRotate ? "scaleX(1)" : undefined,
                    } as React.CSSProperties
                  }
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
