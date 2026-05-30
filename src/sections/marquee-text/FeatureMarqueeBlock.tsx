import React, { useMemo } from "react";

import MarqueeLine from "./MarqueeLine";
import type { MarqueeRenderItem } from "./types";

export type FeatureMarqueeBlockProps = {
  marqueeTop: MarqueeRenderItem[];
  marqueeBottom: MarqueeRenderItem[];
  speedTop?: number;
  speedBottom?: number;
  largeTopRow?: boolean;
  largeBottomRow?: boolean;
  pauseOnHover?: boolean;
  reducedMotion?: boolean;
};

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

  const contentKey = useMemo(
    () =>
      `${marqueeTop.map((i) => i.text).join("|")}-${marqueeBottom.map((i) => i.text).join("|")}-marquee`,
    [marqueeTop, marqueeBottom]
  );

  return (
    <div className="feature-marquee-block">
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
    </div>
  );
}
