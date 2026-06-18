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
import { getVisibleTestimonialItems, resolveHeading } from "../shared";
import type {
  MessageStyleTestimonialsProps,
  MessageStyleTestimonialItemProps,
} from "../types";

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

function paddingClass(value: unknown): string {
  const raw = safeText(value).toLowerCase();
  if (raw === "small") return "ak-mst-flip--pad-sm";
  if (raw === "medium") return "ak-mst-flip--pad-md";
  return "ak-mst-flip--pad-lg";
}

function normalizeInterval(value: unknown): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 780;
  return Math.min(6000, Math.max(240, Math.round(numeric)));
}

function buildFlipSequence(count: number): boolean[][] {
  if (count <= 0) return [[]];
  const empty = Array.from({ length: count }, () => false);
  const full = Array.from({ length: count }, () => true);
  const sequence: boolean[][] = [empty];

  for (let index = 0; index < count; index += 1) {
    sequence.push(
      Array.from({ length: count }, (_, itemIndex) => itemIndex <= index)
    );
  }

  sequence.push(full, full);

  for (let index = count - 2; index >= 0; index -= 1) {
    sequence.push(
      Array.from({ length: count }, (_, itemIndex) => itemIndex <= index)
    );
  }

  sequence.push(empty, empty);
  return sequence;
}

function resolveBorderColor(
  item: MessageStyleTestimonialItemProps,
  showCardBorder: boolean
): string {
  if (!showCardBorder) return "rgba(17, 17, 17, 0.08)";
  return safeText(item.borderColor) || "rgba(17, 17, 17, 0.16)";
}

export default function AppleFlipCardTestimonials({
  section,
  appearance,
  theme,
}: MessageStyleTestimonialsProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const heading = resolveHeading(props);
  const kicker = safeText(props.kicker);
  const subheading = safeText(props.subheading);
  const showKicker = props.showKicker !== false;
  const showSubheading = props.showSubheading !== false;
  const autoAnimate = !reduceMotion && props.autoAnimate !== false;
  const animationInterval = normalizeInterval(props.animationInterval);
  const showCardNumber = props.showCardNumber !== false;
  const showCardBorder = props.showCardBorder !== false;
  const items = useMemo(
    () => getVisibleTestimonialItems(section?.settings?.blocks),
    [section?.settings?.blocks]
  );
  const sequence = useMemo(() => buildFlipSequence(items.length), [items.length]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, [items.length, autoAnimate, animationInterval]);

  useEffect(() => {
    if (!autoAnimate || items.length === 0 || sequence.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % sequence.length);
    }, animationInterval);
    return () => window.clearInterval(timer);
  }, [animationInterval, autoAnimate, items.length, sequence.length]);

  const flipState = autoAnimate ? sequence[step] ?? [] : [];

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

  const quoteStyle = useMemo(
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

  const descriptionStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "subheading",
          role: "body",
          defaultStyle: TESTIMONIAL_DESCRIPTION_DEFAULT,
        })
      ),
    [section, theme]
  );

  const nameStyle = useMemo(
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

  const roleStyle = useMemo(
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
      className={`ak-mst-flip ${paddingClass(props.sectionPadding)}`}
      style={sectionAppearanceStyle(appearance)}
      aria-label={heading || kicker || "Testimonials"}
    >
      <div className="ak-mst-flip__wrap">
        {(heading || (showKicker && kicker) || (showSubheading && subheading)) ? (
          <header className="ak-mst-flip__header">
            <div>
              {showKicker && kicker ? (
                <span className="ak-mst-flip__kicker" style={kickerStyle}>
                  {kicker}
                </span>
              ) : null}
              {heading ? (
                <h2 className="ak-mst-flip__title" style={headingStyle}>
                  {heading}
                </h2>
              ) : null}
            </div>
            {showSubheading && subheading ? (
              <p className="ak-mst-flip__copy" style={subheadingStyle}>
                {subheading}
              </p>
            ) : null}
          </header>
        ) : null}

        {items.length > 0 ? (
          <div
            className="ak-mst-flip__grid"
            style={
              {
                ["--ak-mst-flip-columns" as string]: String(
                  Math.min(Math.max(items.length, 1), 5)
                ),
              } as React.CSSProperties
            }
          >
            {items.map((item, index) => {
              const borderColor = resolveBorderColor(item, showCardBorder);
              const isFlipped = autoAnimate ? Boolean(flipState[index]) : false;
              const quote = safeText(item.quote);
              const description = safeText(item.description);

              return (
                <article
                  className="ak-mst-flip__outer"
                  key={`${item.name || "testimonial"}-${index}`}
                  style={
                    {
                      ["--ak-mst-flip-border" as string]: borderColor,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className={`ak-mst-flip__card${isFlipped ? " is-flipped" : ""}`}
                  >
                    {[0, 1].map((faceIndex) => (
                      <div
                        key={faceIndex}
                        className={`ak-mst-flip__face${
                          faceIndex === 1 ? " ak-mst-flip__face--back" : ""
                        }`}
                      >
                        {showCardNumber ? (
                          <span className="ak-mst-flip__number">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        ) : null}

                        <div className="ak-mst-flip__content">
                          {quote ? (
                            <h3 className="ak-mst-flip__quote" style={quoteStyle}>
                              "{quote}"
                            </h3>
                          ) : null}
                          {description ? (
                            <p className="ak-mst-flip__description" style={descriptionStyle}>
                              {description}
                            </p>
                          ) : null}
                        </div>

                        <div className="ak-mst-flip__person">
                          <div className="ak-mst-flip__line" />
                          <h4 className="ak-mst-flip__name" style={nameStyle}>
                            {safeText(item.name) || "Name"}
                          </h4>
                          {safeText(item.role) ? (
                            <p className="ak-mst-flip__role" style={roleStyle}>
                              {item.role}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
