import React from "react";
import AppleMessageMarquee from "./variants/AppleMessageMarquee";
import MessageBubbleMarquee from "./variants/MessageBubbleMarquee";
import { STYLE_APPLE_MARQUEE, STYLE_MESSAGE_BUBBLE } from "./shared";
import type { MessageStyleTestimonialsProps } from "./types";

export default function MessageStyleTestimonials(
  props: MessageStyleTestimonialsProps
) {
  const style =
    props.section?.settings?.props?.testimonialStyle ?? STYLE_MESSAGE_BUBBLE;

  if (style === STYLE_APPLE_MARQUEE) {
    return <AppleMessageMarquee {...props} />;
  }

  return <MessageBubbleMarquee {...props} />;
}
