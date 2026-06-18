import React from "react";
import AppleFlipCardTestimonials from "./variants/AppleFlipCardTestimonials";
import AppleMessageTestimonials from "./variants/AppleMessageTestimonials";
import AppleMessageMarquee from "./variants/AppleMessageMarquee";
import MessageBubbleMarquee from "./variants/MessageBubbleMarquee";
import {
  STYLE_APPLE_FLIP_CARD_TESTIMONIALS,
  STYLE_APPLE_MARQUEE,
  STYLE_APPLE_MESSAGE_TESTIMONIALS,
  STYLE_MESSAGE_BUBBLE,
  STYLE_STACKED_TESTIMONIALS,
  STYLE_PORTRAIT_TESTIMONIALS,
  VARIANT_APPLE_FLIP_CARD_TESTIMONIALS,
  VARIANT_APPLE_MESSAGE_TESTIMONIALS,
  resolveTestimonialsStyle,
  resolveTestimonialsVariant,
} from "./shared";
import StackedTestimonials from "../StackedTestimonialsSection";
import PortraitTestimonials from "../PortraitTestimonialsSection";
import type { MessageStyleTestimonialsProps } from "./types";

export default function MessageStyleTestimonials({
  section,
  appearance,
  theme,
}: MessageStyleTestimonialsProps) {
  const variant = resolveTestimonialsVariant(section);
  const style =
    resolveTestimonialsStyle(section) || STYLE_MESSAGE_BUBBLE;

  if (
    variant === VARIANT_APPLE_FLIP_CARD_TESTIMONIALS ||
    style === STYLE_APPLE_FLIP_CARD_TESTIMONIALS
  ) {
    return <AppleFlipCardTestimonials section={section} appearance={appearance} theme={theme} />;
  }

  if (
    variant === VARIANT_APPLE_MESSAGE_TESTIMONIALS ||
    style === STYLE_APPLE_MESSAGE_TESTIMONIALS
  ) {
    return <AppleMessageTestimonials section={section} appearance={appearance} theme={theme} />;
  }

  if (style === STYLE_STACKED_TESTIMONIALS) {
    return (
      <StackedTestimonials section={section as any} appearance={appearance} theme={theme} />
    );
  }

  if (style === STYLE_PORTRAIT_TESTIMONIALS) {
    return (
      <PortraitTestimonials section={section as any} appearance={appearance} theme={theme} />
    );
  }

  if (style === STYLE_APPLE_MARQUEE) {
    return <AppleMessageMarquee section={section} appearance={appearance} theme={theme} />;
  }

  return <MessageBubbleMarquee section={section} appearance={appearance} theme={theme} />;
}
