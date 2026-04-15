import React, { useMemo } from "react";

import { usePrefersReducedMotion } from "../MessageStyleTestimonialsSection/hooks";
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

function CategoryCard({ item }: { item: ProductMarqueeItemProps }) {
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

      <p className="ak-ccm__name">
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
}: {
  items: ProductMarqueeItemProps[];
  reverse?: boolean;
  durationSec?: number;
  reduceMotion: boolean;
}) {
  // 3x list + translate -33.3333% for a clean seamless loop
  const loop = items.length > 0 ? [...items, ...items, ...items] : [];

  if (reduceMotion) {
    return (
      <div className="ak-ccm__row">
        <div className="ak-ccm__track ak-ccm__track--static">
          {items.map((item, i) => (
            <CategoryCard key={`${safeText(item.title)}-${i}`} item={item} />
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
          <CategoryCard key={`${safeText(item.title)}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function CreativeCategoryMarquee({ section }: ProductMarqueeProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const heading = safeText(props.heading) || "Explore by Category";
  const description =
    safeText(props.description) ||
    "Smooth, scrollable categories designed for quick discovery.";

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
    <section className="ak-ccm" aria-label={heading}>
      <div className="ak-ccm__container">
        <div className="ak-ccm__header">
          <h2 className="ak-ccm__heading">{heading}</h2>
          <p className="ak-ccm__desc">{description}</p>
        </div>

        <div className="ak-ccm__rows">
          <div className="ak-ccm__fade ak-ccm__fade--l" aria-hidden />
          <div className="ak-ccm__fade ak-ccm__fade--r" aria-hidden />

          {!hasContent ? (
            <p className="ak-ccm__empty">No categories yet.</p>
          ) : (
            <>
              <Row items={row1} durationSec={30} reduceMotion={reduceMotion} />
              <Row items={row2} reverse durationSec={34} reduceMotion={reduceMotion} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

