import React, { useMemo } from "react";

import { usePrefersReducedMotion } from "../../components/MessageStyleTestimonialsSection/hooks";
import FeatureMarqueeBlock from "./FeatureMarqueeBlock";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  MARQUEE_BOTTOM_ROW_DEFAULT,
  MARQUEE_TEXT_LARGE_DEFAULT,
  MARQUEE_TEXT_SMALL_DEFAULT,
  MARQUEE_TOP_ROW_DEFAULT,
} from "../../shared/textStyleDefaults/marqueeTextStyleDefaults";
import type {
  DualLineFeatureMarqueeProps,
  MarqueeRenderItem,
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

function rowDefaultStyle(row: MarqueeTextRow, large: boolean) {
  if (row === "top") {
    return large ? MARQUEE_TEXT_LARGE_DEFAULT : MARQUEE_TOP_ROW_DEFAULT;
  }
  return large ? MARQUEE_TEXT_LARGE_DEFAULT : MARQUEE_BOTTOM_ROW_DEFAULT;
}

function buildRowItems(
  rawBlocks: unknown,
  row: MarqueeTextRow,
  section: DualLineFeatureMarqueeProps["section"],
  theme: DualLineFeatureMarqueeProps["theme"],
  large: boolean
): MarqueeRenderItem[] {
  if (!Array.isArray(rawBlocks)) return [];

  const groupKey = row === "top" ? "topRowText" : "bottomRowText";
  const role = row === "top" ? "heading" : "body";
  const defaultStyle = rowDefaultStyle(row, large);

  const rowStyle = resolvedTextStyleToInlineStyle(
    resolveBlockGroupTextStyle({
      section,
      theme,
      groupKey,
      role,
      defaultStyle,
    })
  );

  return rawBlocks
    .filter((block) => block && typeof block === "object")
    .map((block) => block as MarqueeTextBlock)
    .filter((block) => readBlockRow(block) === row)
    .map((block) => {
      const text = readBlockText(block);
      if (!text) return null;
      const blockId = String(block.id ?? "").trim();
      return {
        id: blockId || `${row}-${text}`,
        text,
        style: rowStyle,
      };
    })
    .filter(Boolean) as MarqueeRenderItem[];
}

export default function DualLineFeatureMarquee({
  section,
  appearance,
  theme,
}: DualLineFeatureMarqueeProps) {
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
    () => buildRowItems(rawBlocks, "top", section, theme, largeTopRow),
    [rawBlocks, section, theme, largeTopRow]
  );
  const marqueeBottom = useMemo(
    () => buildRowItems(rawBlocks, "bottom", section, theme, largeBottomRow),
    [rawBlocks, section, theme, largeBottomRow]
  );

  return (
    <section
      className="ak-dual-line-marquee"
      style={sectionAppearanceStyle(appearance)}
    >
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
