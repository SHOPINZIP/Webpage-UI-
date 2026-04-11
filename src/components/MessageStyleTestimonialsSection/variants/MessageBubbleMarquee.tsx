import React, { useMemo } from "react";
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

function MessageBubble({ item }: { item: MessageStyleTestimonialItemProps }) {
  const name = String(item?.name ?? "").trim();
  const role = String(item?.role ?? "").trim();
  const quote = String(item?.quote ?? "").trim();

  return (
    <div className="ak-mst__bubble-wrap">
      <div className="ak-mst__bubble">
        <div className="ak-mst__tail" aria-hidden />
        <p className="ak-mst__quote">
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
              {name}
              {name && role ? <span className="ak-mst__meta-sep"> • </span> : null}
              {role}
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

  return (
    <section className="ak-mst" aria-label={heading || "Testimonials"}>
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
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
