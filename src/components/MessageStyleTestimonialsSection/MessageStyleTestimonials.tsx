import React from "react";
import AppleMessageMarquee from "./variants/AppleMessageMarquee";
import MessageBubbleMarquee from "./variants/MessageBubbleMarquee";
import {
  STYLE_APPLE_MARQUEE,
  STYLE_MESSAGE_BUBBLE,
  STYLE_STACKED_TESTIMONIALS,
  STYLE_PORTRAIT_TESTIMONIALS,
} from "./shared";
import StackedTestimonials from "../StackedTestimonialsSection";
import PortraitTestimonials from "../PortraitTestimonialsSection";
import type { MessageStyleTestimonialsProps } from "./types";

export default function MessageStyleTestimonials({
  section,
  appearance,
  theme,
}: MessageStyleTestimonialsProps) {
  const style =
    section?.settings?.props?.testimonialStyle ?? STYLE_MESSAGE_BUBBLE;

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
