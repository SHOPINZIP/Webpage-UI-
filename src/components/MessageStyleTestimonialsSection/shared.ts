import type { MessageStyleTestimonialItemProps } from "./types";

export const STYLE_MESSAGE_BUBBLE = "message_bubble";
export const STYLE_APPLE_MARQUEE = "apple_message_marquee";
export const STYLE_APPLE_MESSAGE_TESTIMONIALS = "apple_message_testimonials";
export const STYLE_APPLE_FLIP_CARD_TESTIMONIALS = "apple_flip_card_testimonials";
export const STYLE_STACKED_TESTIMONIALS = "stacked_testimonials";
export const STYLE_PORTRAIT_TESTIMONIALS = "portrait_testimonials";
export const VARIANT_APPLE_MESSAGE_TESTIMONIALS = "AppleMessageTestimonials";
export const VARIANT_APPLE_FLIP_CARD_TESTIMONIALS = "AppleFlipCardTestimonials";

function clampRating(value: unknown): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 5;
  return Math.min(5, Math.max(0, Math.round(numeric)));
}

/** Visible blocks with merged props; skips isVisible === false. */
export function getVisibleTestimonialItems(
  blocks: { props?: MessageStyleTestimonialItemProps }[] | undefined
): MessageStyleTestimonialItemProps[] {
  if (!Array.isArray(blocks)) return [];
  const out: MessageStyleTestimonialItemProps[] = [];
  for (const block of blocks) {
    const props = block?.props;
    if (!props) continue;
    if (props.isVisible === false) continue;
    const quote = String(props.quote ?? props.message ?? "").trim();
    const message = String(props.message ?? quote).trim();
    const description = String(props.description ?? "").trim();
    const borderColor = String(props.borderColor ?? props.border ?? "").trim();
    out.push({
      ...props,
      name: String(props.name ?? "").trim(),
      role: String(props.role ?? props.post ?? "").trim(),
      quote,
      message,
      description,
      borderColor,
      rating: clampRating(props.rating),
    });
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
  return String(props?.heading ?? props?.header ?? "").trim();
}

export function resolveTestimonialsVariant(section: {
  variant?: string;
  variantName?: string;
}): string {
  return String(section?.variant ?? section?.variantName ?? "").trim();
}

export function resolveTestimonialsStyle(section: {
  settings?: { props?: { testimonialStyle?: string } };
}): string {
  return String(section?.settings?.props?.testimonialStyle ?? "").trim();
}
