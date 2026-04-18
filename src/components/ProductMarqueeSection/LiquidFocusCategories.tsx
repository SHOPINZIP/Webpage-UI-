import React, { useEffect, useMemo, useState } from "react";

import { usePrefersReducedMotion } from "../MessageStyleTestimonialsSection/hooks";
import type { ProductMarqueeProps, ProductMarqueeItemProps } from "./types";

function safeText(v: unknown): string {
  return String(v ?? "").trim();
}

function clampIndex(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(3, Math.floor(n)));
}

function parseDefaultActiveIndex(raw: unknown): number {
  const s = String(raw ?? "1").trim();
  if (s === "0" || s === "1" || s === "2" || s === "3") {
    return parseInt(s, 10);
  }
  const n = parseInt(s, 10);
  return clampIndex(Number.isFinite(n) ? n : 1);
}

function padToFour(items: ProductMarqueeItemProps[]): ProductMarqueeItemProps[] {
  const next = items.slice(0, 4);
  while (next.length < 4) next.push({});
  return next;
}

export default function LiquidFocusCategories({ section }: ProductMarqueeProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const heading =
    safeText(props.heading) || "Crafted for every taste";
  const description = safeText(props.description);
  const resetToDefaultOnLeave = props.resetToDefaultOnLeave !== false;
  const defaultActiveIndex = parseDefaultActiveIndex(props.defaultActiveIndex);

  const [active, setActive] = useState(defaultActiveIndex);

  useEffect(() => {
    setActive(defaultActiveIndex);
  }, [defaultActiveIndex]);

  const items = useMemo(() => {
    const blocks = section?.settings?.blocks;
    if (!Array.isArray(blocks)) return padToFour([]);
    const mapped = blocks
      .filter((b) => b && typeof b === "object")
      .map((b) =>
        b?.props && typeof b.props === "object" ? b.props : {},
      ) as ProductMarqueeItemProps[];
    return padToFour(mapped);
  }, [section?.settings?.blocks]);

  const transitionMs = reduceMotion ? 120 : 700;

  return (
    <section className="ak-lfc" aria-label={heading}>
      <div className="ak-lfc__inner">
        <div className="ak-lfc__header">
          <h2 className="ak-lfc__heading">{heading}</h2>
          {description ? <p className="ak-lfc__sub">{description}</p> : null}
        </div>

        <div className="ak-lfc__desktop">
          <div
            className="ak-lfc__strip"
            onMouseLeave={() => {
              if (resetToDefaultOnLeave) setActive(defaultActiveIndex);
            }}
          >
            {items.map((item, index) => {
              const title = safeText(item?.title);
              const image = safeText(item?.image);
              const alt = safeText(item?.alt) || title || "Category";
              const cardDescription = safeText(item?.description);
              const isActive = index === active;

              return (
                <button
                  key={`lfc-${index}`}
                  type="button"
                  className={
                    isActive
                      ? "ak-lfc__card ak-lfc__card--active"
                      : "ak-lfc__card"
                  }
                  style={{ transitionDuration: `${transitionMs}ms` }}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-pressed={isActive}
                  aria-label={title || `Card ${index + 1}`}
                >
                  <div className="ak-lfc__cardMedia" aria-hidden={!image}>
                    {image ? (
                      <img
                        className="ak-lfc__img"
                        src={image}
                        alt={alt}
                        loading="lazy"
                      />
                    ) : (
                      <div className="ak-lfc__img ak-lfc__img--fallback" />
                    )}
                  </div>
                  <div className="ak-lfc__grad" aria-hidden />
                  <div className="ak-lfc__grad2" aria-hidden />
                  <div className="ak-lfc__cardBody">
                    <h3
                      className={
                        isActive
                          ? "ak-lfc__title ak-lfc__title--active"
                          : "ak-lfc__title"
                      }
                      style={{ transitionDuration: `${transitionMs}ms` }}
                    >
                      {title || (
                        <span className="ak-lfc__placeholder">Title</span>
                      )}
                    </h3>
                    <p
                      className={
                        isActive
                          ? "ak-lfc__desc ak-lfc__desc--visible"
                          : "ak-lfc__desc"
                      }
                      style={{ transitionDuration: `${transitionMs}ms` }}
                    >
                      {cardDescription}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ak-lfc__mobile">
          <div className="ak-lfc__scroll">
            <div className="ak-lfc__scrollRow">
              {items.map((item, index) => {
                const title = safeText(item?.title);
                const image = safeText(item?.image);
                const alt = safeText(item?.alt) || title || "Category";
                const cardDescription = safeText(item?.description);

                return (
                  <div key={`lfc-m-${index}`} className="ak-lfc__mcard">
                    <div className="ak-lfc__mcardMedia" aria-hidden={!image}>
                      {image ? (
                        <img
                          className="ak-lfc__img"
                          src={image}
                          alt={alt}
                          loading="lazy"
                        />
                      ) : (
                        <div className="ak-lfc__img ak-lfc__img--fallback" />
                      )}
                    </div>
                    <div className="ak-lfc__mgrad" aria-hidden />
                    <div className="ak-lfc__mbody">
                      <h3 className="ak-lfc__mtitle">
                        {title || (
                          <span className="ak-lfc__placeholder">Title</span>
                        )}
                      </h3>
                      <p className="ak-lfc__mdesc">{cardDescription}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
