import React, { useMemo } from "react";

import { usePrefersReducedMotion } from "../MessageStyleTestimonialsSection/hooks";
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

function ProductCard({ item }: { item: ProductMarqueeItemProps }) {
  const title = safeText(item?.title);
  const subtitle = safeText(item?.subtitle);
  const image = safeText(item?.image);

  return (
    <div className="ak-pmc__card">
      <div className="ak-pmc__imgWrap" aria-hidden={!image}>
        {image ? (
          <img className="ak-pmc__img" src={image} alt={title} loading="lazy" />
        ) : (
          <div className="ak-pmc__img ak-pmc__img--fallback" aria-hidden />
        )}
      </div>
      <div className="ak-pmc__meta">
        <div className="ak-pmc__title">
          {title || <span className="ak-pmc__placeholder">Title</span>}
        </div>
        <div className="ak-pmc__subtitle">
          {subtitle || <span className="ak-pmc__placeholder">Subtitle</span>}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  durationSec = 34,
  reduceMotion,
}: {
  items: ProductMarqueeItemProps[];
  reverse?: boolean;
  durationSec?: number;
  reduceMotion: boolean;
}) {
  const loopItems = items.length > 0 ? [...items, ...items] : [];
  const animClass = reverse ? "ak-pmc__track--rev" : "ak-pmc__track";

  if (reduceMotion) {
    return (
      <div className="ak-pmc__row">
        <div className="ak-pmc__track ak-pmc__track--static">
          {items.map((item, index) => (
            <ProductCard key={`${safeText(item.title)}-${index}`} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ak-pmc__row">
      <div className={animClass} style={{ animationDuration: `${durationSec}s` }}>
        {loopItems.map((item, index) => (
          <ProductCard key={`${safeText(item.title)}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function ProductCardMarquee({ section }: ProductMarqueeProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const eyebrow = safeText(props.eyebrow) || "Bestsellers";
  const heading =
    safeText(props.heading) ||
    "Browse products the way modern commerce feels effortless.";
  const description =
    safeText(props.description) ||
    "A quicker-commerce inspired layout with the name neatly placed below the square image and one clean section action.";
  const showButton = props.showButton !== false;
  const buttonText = safeText(props.buttonText) || "Buy Now";
  const buttonLink = safeText(props.buttonLink);

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
    <section className="ak-pmc" aria-label={heading}>
      <div className="ak-pmc__bg" aria-hidden />
      <div className="ak-pmc__glow" aria-hidden />

      <div className="ak-pmc__container">
        <div className="ak-pmc__header">
          {eyebrow ? <div className="ak-pmc__eyebrow">{eyebrow}</div> : null}
          <h2 className="ak-pmc__heading">{heading}</h2>
          {description ? <p className="ak-pmc__desc">{description}</p> : null}
        </div>

        <div className="ak-pmc__rows">
          <div className="ak-pmc__fade ak-pmc__fade--l" aria-hidden />
          <div className="ak-pmc__fade ak-pmc__fade--r" aria-hidden />

          {!hasContent ? (
            <p className="ak-pmc__empty">No items yet.</p>
          ) : (
            <>
              <MarqueeRow items={row1} durationSec={34} reduceMotion={reduceMotion} />
              <MarqueeRow
                items={row2}
                reverse
                durationSec={38}
                reduceMotion={reduceMotion}
              />
              <MarqueeRow items={row3} durationSec={36} reduceMotion={reduceMotion} />
            </>
          )}
        </div>

        {showButton ? (
          <div className="ak-pmc__cta">
            {buttonLink ? (
              <a className="ak-pmc__btn" href={buttonLink}>
                {buttonText} <span aria-hidden>→</span>
              </a>
            ) : (
              <button className="ak-pmc__btn" type="button">
                {buttonText} <span aria-hidden>→</span>
              </button>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

