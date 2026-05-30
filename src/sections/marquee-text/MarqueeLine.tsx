import React, { useMemo } from "react";

import type { MarqueeLineProps } from "./types";

function getCopiesPerSequence(items: { text: string }[], large: boolean): number {
  const count = items.length;
  const avgChars =
    items.reduce((sum, item) => sum + item.text.length, 0) / Math.max(count, 1);

  let copies =
    count === 1
      ? 12
      : count === 2
        ? 10
        : count === 3
          ? 8
          : count === 4
            ? 6
            : 4;

  if (avgChars <= 16) copies += 2;
  if (avgChars <= 10) copies += 2;
  if (large) copies += 2;
  if (large && count <= 2) copies += 2;

  return copies;
}

function buildMarqueeSequence(items: MarqueeLineProps["items"], large: boolean) {
  if (items.length === 0) return [];

  const copies = getCopiesPerSequence(items, large);
  const expanded: MarqueeLineProps["items"] = [];

  for (let copy = 0; copy < copies; copy += 1) {
    items.forEach((item) => {
      expanded.push(item);
    });
  }

  return expanded;
}

export default function MarqueeLine({
  items,
  large = false,
  reverse = false,
  durationSec = 26,
  pauseOnHover = false,
  reducedMotion = false,
}: MarqueeLineProps) {
  const sequence = useMemo(
    () => buildMarqueeSequence(items, large),
    [items, large]
  );

  const loopItems = useMemo(
    () =>
      [...sequence, ...sequence].map((item, index) => ({
        ...item,
        key: `${item.id || item.text}-${index}`,
      })),
    [sequence]
  );

  if (loopItems.length === 0) return null;

  const trackClass = [
    "feature-marquee-track",
    large ? "feature-marquee-track--lg" : "feature-marquee-track--sm",
    reverse ? "feature-marquee-track--reverse" : "",
    pauseOnHover ? "feature-marquee-track--pause-hover" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="feature-marquee-row">
      <div
        className={trackClass}
        style={
          reducedMotion
            ? undefined
            : {
                animationDuration: `${durationSec}s`,
              }
        }
      >
        {loopItems.map((item) => (
          <span key={item.key} className="feature-marquee-item" style={item.style}>
            {item.text}
            <span className="feature-marquee-dot" aria-hidden>
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
