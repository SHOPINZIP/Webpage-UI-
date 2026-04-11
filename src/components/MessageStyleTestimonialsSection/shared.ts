import type { MessageStyleTestimonialItemProps } from "./types";

export const STYLE_MESSAGE_BUBBLE = "message_bubble";
export const STYLE_APPLE_MARQUEE = "apple_message_marquee";

/** Visible blocks with merged props; skips isVisible === false. */
export function getVisibleTestimonialItems(
  blocks: { props?: MessageStyleTestimonialItemProps }[] | undefined
): MessageStyleTestimonialItemProps[] {
  if (!Array.isArray(blocks)) return [];
  const out: MessageStyleTestimonialItemProps[] = [];
  for (const b of blocks) {
    const p = b?.props;
    if (!p) continue;
    if (p.isVisible === false) continue;
    out.push(p);
  }
  return out;
}

/** Duplicate until long enough for seamless -50% translate loop. */
export function buildMarqueeLoop<T>(items: T[], minItems = 4): T[] {
  if (items.length === 0) return [];
  let base = [...items];
  while (base.length < minItems) {
    base = [...base, ...items];
  }
  return [...base, ...base];
}

export function resolveHeading(props: {
  heading?: string;
  header?: string;
}): string {
  const h = String(props?.heading ?? props?.header ?? "").trim();
  return h;
}
