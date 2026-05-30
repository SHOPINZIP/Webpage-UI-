import React, { useMemo } from "react";
import { sectionAppearanceStyle } from "../../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../../shared/sectionTypography";
import {
  TESTIMONIAL_CUSTOMER_NAME_DEFAULT,
  TESTIMONIAL_CUSTOMER_ROLE_DEFAULT,
  TESTIMONIAL_QUOTE_TEXT_DEFAULT,
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

function MessageBubble({
  item,
  quoteStyle,
  nameStyle,
  roleStyle,
}: {
  item: MessageStyleTestimonialItemProps;
  quoteStyle?: React.CSSProperties;
  nameStyle?: React.CSSProperties;
  roleStyle?: React.CSSProperties;
}) {
  const name = String(item?.name ?? "").trim();
  const role = String(item?.role ?? "").trim();
  const quote = String(item?.quote ?? "").trim();

  return (
    <div className="ak-mst__bubble-wrap">
      <div className="ak-mst__bubble">
        <div className="ak-mst__tail" aria-hidden />
        <p className="ak-mst__quote" style={quoteStyle}>
          {quote ? (
            <>
              <span className="ak-mst__quote-mark">“</span>
              {quote}
              <span className="ak-mst__quote-mark">”</span>
            </>
          ) : (
            <span className="ak-mst__quote-placeholder">Add a quote</span>
          )}
        </p>
        <div className="ak-mst__meta">
          {name || role ? (
            <>
              {name ? <span style={nameStyle}>{name}</span> : null}
              {name && role ? <span className="ak-mst__meta-sep"> • </span> : null}
              {role ? <span style={roleStyle}>{role}</span> : null}
            </>
          ) : (
            <span className="ak-mst__meta-placeholder">Name • Role</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MessageBubbleMarquee({
  section,
  appearance,
  theme,
}: MessageStyleTestimonialsProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const heading = resolveHeading(props);
  const blocks = section?.settings?.blocks;

  const items = useMemo(
    () => getVisibleTestimonialItems(blocks),
    [blocks]
  );

  const trackItems = useMemo(
    () => (items.length > 0 ? buildMarqueeLoop(items) : []),
    [items]
  );

  const durationSec = Math.max(18, items.length * 5);

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
      className="ak-mst"
      aria-label={heading || "Testimonials"}
      style={sectionAppearanceStyle(appearance)}
    >
      <div className="ak-mst__inner">
        <div className="ak-mst__header-wrap">
          <h2 className="ak-mst__heading">
            {heading || "What merchants say."}
          </h2>
        </div>

        {items.length === 0 ? (
          <p className="ak-mst__empty">No testimonials yet.</p>
        ) : reduceMotion ? (
          <div className="ak-mst__row ak-mst__row--static">
            {items.map((item, index) => (
              <MessageBubble
                key={`${String(item.name ?? index)}-${index}`}
                item={item}
                quoteStyle={quoteTextStyle}
                nameStyle={customerNameStyle}
                roleStyle={customerRoleStyle}
              />
            ))}
          </div>
        ) : (
          <div className="ak-mst__marquee">
            <div
              className="ak-mst__track ak-mst__track--animate"
              style={
                {
                  ["--ak-mst-duration" as string]: `${durationSec}s`,
                } as React.CSSProperties
              }
            >
              {trackItems.map((item, index) => (
                <MessageBubble
                  key={`${index}-${String(item.name ?? "")}-${String(item.quote ?? "").slice(0, 12)}`}
                  item={item}
                  quoteStyle={quoteTextStyle}
                  nameStyle={customerNameStyle}
                  roleStyle={customerRoleStyle}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
