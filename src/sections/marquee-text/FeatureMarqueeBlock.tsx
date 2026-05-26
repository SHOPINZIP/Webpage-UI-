import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import MarqueeLine from "./MarqueeLine";

export type FeatureMarqueeBlockProps = {
  marqueeTop: string[];
  marqueeBottom: string[];
  speedTop?: number;
  speedBottom?: number;
  largeTopRow?: boolean;
  largeBottomRow?: boolean;
  pauseOnHover?: boolean;
  reducedMotion?: boolean;
};

const AnimatePresenceWait = AnimatePresence as React.ComponentType<
  React.ComponentProps<typeof AnimatePresence> & {
    mode?: "wait" | "sync" | "popLayout";
  }
>;

export default function FeatureMarqueeBlock({
  marqueeTop,
  marqueeBottom,
  speedTop = 26,
  speedBottom = 30,
  largeTopRow = true,
  largeBottomRow = false,
  pauseOnHover = false,
  reducedMotion = false,
}: FeatureMarqueeBlockProps) {
  const hasTopRow = marqueeTop.length > 0;
  const hasBottomRow = marqueeBottom.length > 0;

  if (!hasTopRow && !hasBottomRow) return null;

  const contentKey = `${marqueeTop.join("|")}-${marqueeBottom.join("|")}-marquee`;

  return (
    <div className="feature-marquee-block">
      <AnimatePresenceWait mode="wait">
        <motion.div
          key={contentKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="feature-marquee-content"
        >
          {hasTopRow ? (
            <MarqueeLine
              items={marqueeTop}
              large={largeTopRow}
              durationSec={speedTop}
              pauseOnHover={pauseOnHover}
              reducedMotion={reducedMotion}
            />
          ) : null}

          {hasBottomRow ? (
            <MarqueeLine
              items={marqueeBottom}
              large={largeBottomRow}
              reverse
              durationSec={speedBottom}
              pauseOnHover={pauseOnHover}
              reducedMotion={reducedMotion}
            />
          ) : null}
        </motion.div>
      </AnimatePresenceWait>
    </div>
  );
}
