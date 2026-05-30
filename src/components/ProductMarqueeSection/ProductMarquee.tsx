import React, { useMemo } from "react";

import { usePrefersReducedMotion } from "../MessageStyleTestimonialsSection/hooks";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  PRODUCT_CARD_SUBTITLE_DEFAULT,
  PRODUCT_CARD_TITLE_DEFAULT,
  PRODUCT_MARQUEE_DESCRIPTION_DEFAULT,
  PRODUCT_MARQUEE_EYEBROW_DEFAULT,
  PRODUCT_MARQUEE_HEADING_DEFAULT,
} from "../../shared/textStyleDefaults/productMarqueeTextStyleDefaults";
import type { ProductMarqueeProps, ProductMarqueeItemProps } from "./types";

function rotate<T>(items: T[], by: number): T[] {
  if (items.length === 0) return [];
  const n = ((by % items.length) + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

function distributeRows(items: ProductMarqueeItemProps[]) {
  const row1 = items;
  const row2 = rotate(items, 2);
  const row3 = rotate(items, 1).reverse();
  return { row1, row2, row3 };
}

function safeText(v: unknown): string {
  return String(v ?? "").trim();
}

function ProductPill({
  item,
  cardTitleStyle,
  cardSubtitleStyle,
}: {
  item: ProductMarqueeItemProps;
  cardTitleStyle?: React.CSSProperties;
  cardSubtitleStyle?: React.CSSProperties;
}) {
  const title = safeText(item?.title);
  const subtitle = safeText(item?.subtitle);
  const image = safeText(item?.image);

  return (
    <div className="ak-pm__pill">
      <div className="ak-pm__pill-imgWrap" aria-hidden={!image}>
        {image ? (
          <img
            className="ak-pm__pill-img"
            src={image}
            alt={title}
            loading="lazy"
          />
        ) : (
          <div className="ak-pm__pill-img ak-pm__pill-img--fallback" aria-hidden />
        )}
      </div>

      <div className="ak-pm__pill-text">
        <span className="ak-pm__pill-title" style={cardTitleStyle}>
          {title || <span className="ak-pm__placeholder">Title</span>}
        </span>
        <span className="ak-pm__pill-subtitle" style={cardSubtitleStyle}>
          {subtitle || <span className="ak-pm__placeholder">Subtitle</span>}
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  durationSec = 34,
  reduceMotion,
  cardTitleStyle,
  cardSubtitleStyle,
}: {
  items: ProductMarqueeItemProps[];
  reverse?: boolean;
  durationSec?: number;
  reduceMotion: boolean;
  cardTitleStyle?: React.CSSProperties;
  cardSubtitleStyle?: React.CSSProperties;
}) {
  const loopItems = items.length > 0 ? [...items, ...items] : [];
  const animClass = reverse ? "ak-pm__track--rev" : "ak-pm__track";

  if (reduceMotion) {
    return (
      <div className="ak-pm__row">
        <div className="ak-pm__track ak-pm__track--static">
          {items.map((item, index) => (
            <ProductPill
              key={`${safeText(item.title)}-${index}`}
              item={item}
              cardTitleStyle={cardTitleStyle}
              cardSubtitleStyle={cardSubtitleStyle}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ak-pm__row">
      <div className={animClass} style={{ animationDuration: `${durationSec}s` }}>
        {loopItems.map((item, index) => (
          <ProductPill
            key={`${safeText(item.title)}-${index}`}
            item={item}
            cardTitleStyle={cardTitleStyle}
            cardSubtitleStyle={cardSubtitleStyle}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductMarquee({ section, appearance, theme }: ProductMarqueeProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const eyebrow = safeText(props.eyebrow);
  const heading = safeText(props.heading);
  const description = safeText(props.description);
  const showButton = props.showButton !== false;
  const buttonText = safeText(props.buttonText);
  const buttonLink = safeText(props.buttonLink);

  const eyebrowStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "eyebrow",
          role: "body",
          defaultStyle: PRODUCT_MARQUEE_EYEBROW_DEFAULT,
        })
      ),
    [section, theme]
  );

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

  const cardSubtitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "cardSubtitle",
          role: "body",
          defaultStyle: PRODUCT_CARD_SUBTITLE_DEFAULT,
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

  const hasContent = items.some(
    (it) => safeText(it.title) || safeText(it.subtitle) || safeText(it.image)
  );

  const { row1, row2, row3 } = useMemo(() => distributeRows(items), [items]);

  return (
    <section className="ak-pm" aria-label={heading || "Products"} style={sectionAppearanceStyle(appearance)}>
      <div className="ak-pm__bg" aria-hidden />
      <div className="ak-pm__glow" aria-hidden />

      <div className="ak-pm__container">
        <div className="ak-pm__header">
          {eyebrow ? (
            <div className="ak-pm__eyebrow" style={eyebrowStyle}>
              {eyebrow}
            </div>
          ) : null}
          <h2 className="ak-pm__heading" style={headingStyle}>
            {heading || "Explore handpicked products."}
          </h2>
          {description ? (
            <p className="ak-pm__desc" style={descriptionStyle}>
              {description}
            </p>
          ) : null}
        </div>

        <div className="ak-pm__rows">
          <div className="ak-pm__fade ak-pm__fade--l" aria-hidden />
          <div className="ak-pm__fade ak-pm__fade--r" aria-hidden />

          {!hasContent ? (
            <p className="ak-pm__empty">No items yet.</p>
          ) : (
            <>
              <MarqueeRow
                items={row1}
                durationSec={34}
                reduceMotion={reduceMotion}
                cardTitleStyle={cardTitleStyle}
                cardSubtitleStyle={cardSubtitleStyle}
              />
              <MarqueeRow
                items={row2}
                reverse
                durationSec={38}
                reduceMotion={reduceMotion}
                cardTitleStyle={cardTitleStyle}
                cardSubtitleStyle={cardSubtitleStyle}
              />
              <MarqueeRow
                items={row3}
                durationSec={36}
                reduceMotion={reduceMotion}
                cardTitleStyle={cardTitleStyle}
                cardSubtitleStyle={cardSubtitleStyle}
              />
            </>
          )}
        </div>

        {showButton ? (
          <div className="ak-pm__cta">
            {buttonLink ? (
              <a className="ak-pm__btn" href={buttonLink}>
                {buttonText || "Buy Now"} <span aria-hidden>→</span>
              </a>
            ) : (
              <button className="ak-pm__btn" type="button">
                {buttonText || "Buy Now"} <span aria-hidden>→</span>
              </button>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

