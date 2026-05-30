import React, { useMemo } from "react";

import { usePrefersReducedMotion } from "../MessageStyleTestimonialsSection/hooks";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  PRODUCT_CARD_TITLE_DEFAULT,
  PRODUCT_MARQUEE_DESCRIPTION_DEFAULT,
  PRODUCT_MARQUEE_HEADING_DEFAULT,
} from "../../shared/textStyleDefaults/productMarqueeTextStyleDefaults";
import type { ProductMarqueeProps, ProductMarqueeItemProps } from "./types";

function rotate<T>(items: T[], by: number): T[] {
  if (items.length === 0) return [];
  const n = ((by % items.length) + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

function safeText(v: unknown): string {
  return String(v ?? "").trim();
}

function distributeTwoRows(items: ProductMarqueeItemProps[]) {
  const row1 = items;
  const row2 = rotate(items, 3);
  return { row1, row2 };
}

function CategoryCard({
  item,
  cardTitleStyle,
}: {
  item: ProductMarqueeItemProps;
  cardTitleStyle?: React.CSSProperties;
}) {
  const name = safeText(item?.title);
  const image = safeText(item?.image);

  return (
    <div className="ak-ccm__card">
      <div className="ak-ccm__imgOuter">
        <div className="ak-ccm__imgInner" aria-hidden={!image}>
          {image ? (
            <img className="ak-ccm__img" src={image} alt={name} loading="lazy" />
          ) : (
            <div className="ak-ccm__img ak-ccm__img--fallback" aria-hidden />
          )}
          <div className="ak-ccm__imgOverlay" aria-hidden />
        </div>
      </div>

      <p className="ak-ccm__name" style={cardTitleStyle}>
        {name || <span className="ak-ccm__placeholder">Category</span>}
      </p>
    </div>
  );
}

function Row({
  items,
  reverse = false,
  durationSec = 30,
  reduceMotion,
  cardTitleStyle,
}: {
  items: ProductMarqueeItemProps[];
  reverse?: boolean;
  durationSec?: number;
  reduceMotion: boolean;
  cardTitleStyle?: React.CSSProperties;
}) {
  // 3x list + translate -33.3333% for a clean seamless loop
  const loop = items.length > 0 ? [...items, ...items, ...items] : [];

  if (reduceMotion) {
    return (
      <div className="ak-ccm__row">
        <div className="ak-ccm__track ak-ccm__track--static">
          {items.map((item, i) => (
            <CategoryCard
              key={`${safeText(item.title)}-${i}`}
              item={item}
              cardTitleStyle={cardTitleStyle}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ak-ccm__row">
      <div
        className={reverse ? "ak-ccm__track--rev" : "ak-ccm__track"}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {loop.map((item, i) => (
          <CategoryCard
            key={`${safeText(item.title)}-${i}`}
            item={item}
            cardTitleStyle={cardTitleStyle}
          />
        ))}
      </div>
    </div>
  );
}

export default function CreativeCategoryMarquee({
  section,
  appearance,
  theme,
}: ProductMarqueeProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const heading = safeText(props.heading) || "Explore by Category";
  const description =
    safeText(props.description) ||
    "Smooth, scrollable categories designed for quick discovery.";

  const headingStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "heading",
          role: "heading",
          defaultStyle: PRODUCT_MARQUEE_HEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const descriptionStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "description",
          role: "body",
          defaultStyle: PRODUCT_MARQUEE_DESCRIPTION_DEFAULT,
        })
      ),
    [section, theme]
  );

  const cardTitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "cardTitle",
          role: "heading",
          defaultStyle: PRODUCT_CARD_TITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const items = useMemo(() => {
    const blocks = section?.settings?.blocks;
    if (!Array.isArray(blocks)) return [];
    return blocks
      .filter((b) => b && typeof b === "object")
      .map((b) => (b?.props && typeof b.props === "object" ? b.props : {}));
  }, [section?.settings?.blocks]);

  const hasContent = items.some((it) => safeText(it.title) || safeText(it.image));
  const { row1, row2 } = useMemo(() => distributeTwoRows(items), [items]);

  return (
    <section className="ak-ccm" aria-label={heading} style={sectionAppearanceStyle(appearance)}>
      <div className="ak-ccm__container">
        <div className="ak-ccm__header">
          <h2 className="ak-ccm__heading" style={headingStyle}>
            {heading}
          </h2>
          <p className="ak-ccm__desc" style={descriptionStyle}>
            {description}
          </p>
        </div>

        <div className="ak-ccm__rows">
          <div className="ak-ccm__fade ak-ccm__fade--l" aria-hidden />
          <div className="ak-ccm__fade ak-ccm__fade--r" aria-hidden />

          {!hasContent ? (
            <p className="ak-ccm__empty">No categories yet.</p>
          ) : (
            <>
              <Row items={row1} durationSec={30} reduceMotion={reduceMotion} cardTitleStyle={cardTitleStyle} />
              <Row
                items={row2}
                reverse
                durationSec={34}
                reduceMotion={reduceMotion}
                cardTitleStyle={cardTitleStyle}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

