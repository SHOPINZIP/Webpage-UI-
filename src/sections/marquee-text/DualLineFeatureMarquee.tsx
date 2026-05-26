import React, { useMemo } from "react";

import { usePrefersReducedMotion } from "../../components/MessageStyleTestimonialsSection/hooks";
import FeatureMarqueeBlock from "./FeatureMarqueeBlock";
import type {
  DualLineFeatureMarqueeProps,
  MarqueeTextBlock,
  MarqueeTextRow,
} from "./types";

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

function normalizeSpeed(value: unknown, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return n;
}

function readBlockRow(block: MarqueeTextBlock): MarqueeTextRow {
  const raw = safeText(block.row || block.props?.row).toLowerCase();
  return raw === "bottom" ? "bottom" : "top";
}

function readBlockText(block: MarqueeTextBlock): string {
  return safeText(block.text ?? block.props?.text);
}

function buildRowItems(rawBlocks: unknown, row: MarqueeTextRow): string[] {
  if (!Array.isArray(rawBlocks)) return [];

  return rawBlocks
    .filter((block) => block && typeof block === "object")
    .map((block) => block as MarqueeTextBlock)
    .filter((block) => readBlockRow(block) === row)
    .map((block) => readBlockText(block))
    .filter(Boolean);
}

export default function DualLineFeatureMarquee({ section }: DualLineFeatureMarqueeProps) {
  if (section?.enabled === false) return null;

  const reducedMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const rawBlocks = section?.settings?.blocks;

  const speedTop = normalizeSpeed(props.speedTop, 26);
  const speedBottom = normalizeSpeed(props.speedBottom, 30);
  const largeTopRow = props.largeTopRow !== false;
  const largeBottomRow = props.largeBottomRow === true;
  const pauseOnHover = props.pauseOnHover === true;

  const marqueeTop = useMemo(
    () => buildRowItems(rawBlocks, "top"),
    [rawBlocks]
  );
  const marqueeBottom = useMemo(
    () => buildRowItems(rawBlocks, "bottom"),
    [rawBlocks]
  );

  return (
    <section className="ak-dual-line-marquee">
      <FeatureMarqueeBlock
        marqueeTop={marqueeTop}
        marqueeBottom={marqueeBottom}
        speedTop={speedTop}
        speedBottom={speedBottom}
        largeTopRow={largeTopRow}
        largeBottomRow={largeBottomRow}
        pauseOnHover={pauseOnHover}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}
