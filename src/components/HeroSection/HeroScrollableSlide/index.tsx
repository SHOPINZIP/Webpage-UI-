import React, { useMemo } from "react";

import type { HeroSection, HeroSlideBlock } from "../HeroSlider";
import { normalizeImageUrl } from "../heroSectionUtils";

export type HeroScrollableSlideProps = {
  section: HeroSection;
};

type NormalizedScrollCard = {
  id: string | number;
  eyebrow: string;
  title: string;
  description: string;
  button: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  image: string;
  imageMobile?: string;
};

function sectionBlocksToScrollCards(blocks: HeroSlideBlock[]): NormalizedScrollCard[] {
  const slideBlocks = blocks.filter((b) => b.type === "slide");
  if (slideBlocks.length === 0) return [];

  const out: NormalizedScrollCard[] = [];
  slideBlocks.forEach((b, i) => {
    const bp = b.props || {};
    const imageRaw = normalizeImageUrl(bp.image);
    if (!imageRaw) return;

    const imageMobileRaw = normalizeImageUrl(bp.imageMobile);
    const imageMobile = imageMobileRaw !== "" ? imageMobileRaw : undefined;

    out.push({
      id: b.id ?? `card-${i + 1}`,
      eyebrow: String(bp.eyebrow ?? "").trim(),
      title: String(bp.headline ?? "").trim(),
      description: String(bp.description ?? "").trim(),
      button: String(bp.buttonText ?? "").trim(),
      buttonLink: bp.buttonLink || "#",
      secondaryButtonText: bp.secondaryButtonText,
      secondaryButtonLink: bp.secondaryButtonLink || "#",
      image: imageRaw,
      imageMobile,
    });
  });
  return out;
}

function CardImage({
  desktopSrc,
  mobileSrc,
}: {
  desktopSrc: string;
  mobileSrc?: string;
}) {
  const desktop = desktopSrc.trim();
  const mobile = mobileSrc?.trim();

  if (!desktop) {
    return null;
  }

  if (mobile) {
    return (
      <picture>
        <source media="(max-width: 639px)" srcSet={mobile} />
        <img
          src={desktop}
          alt=""
          decoding="async"
          draggable={false}
          className="ak-scroll-cards__img"
          onError={(e) => {
            e.currentTarget.removeAttribute("src");
          }}
        />
      </picture>
    );
  }

  return (
    <img
      src={desktop}
      alt=""
      decoding="async"
      draggable={false}
      className="ak-scroll-cards__img"
      onError={(e) => {
        e.currentTarget.removeAttribute("src");
      }}
    />
  );
}

const CtaArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ak-scroll-cards__ctaIcon"
    aria-hidden="true"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

/**
 * Stacked full-screen scroll cards — same `HeroSection` document shape as {@link HeroSlider}.
 * All copy and media must come from `section.settings` (no built-in demo data).
 */
export default function HeroScrollableSlide({ section }: HeroScrollableSlideProps) {
  const p = section.settings?.props ?? {};
  const blocks = section.settings?.blocks ?? [];

  const cards = useMemo(
    () => sectionBlocksToScrollCards(blocks),
    [blocks]
  );

  const toolbarTitle = String(p.sectionLabel ?? "").trim();
  const toolbarHint = String(p.toolbarHint ?? "").trim();

  if (section.enabled === false) {
    return null;
  }

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="ak-scroll-cards">
      <div className="ak-scroll-cards__inner">

        <div className="ak-scroll-cards__stack">
          {cards.map((card, index) => (
            <section
              key={String(card.id)}
              className="ak-scroll-cards__sticky"
              style={{ zIndex: index + 1 }}
            >
              <div className="ak-scroll-cards__stickyCenter">
                <div className="ak-scroll-cards__frame">
                  <div className="ak-scroll-cards__media">
                    <CardImage
                      desktopSrc={card.image}
                      mobileSrc={card.imageMobile}
                    />
                    <div className="ak-scroll-cards__overlayTint" />
                    <div className="ak-scroll-cards__overlayGradient" />
                    <div className="ak-scroll-cards__overlayRadial" />
                  </div>

                  <div className="ak-scroll-cards__content">
                    <div className="ak-scroll-cards__topRow">
                      {card.eyebrow ? (
                        <div className="ak-scroll-cards__eyebrow">{card.eyebrow}</div>
                      ) : null}
                      <div className="ak-scroll-cards__index">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(cards.length).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="ak-scroll-cards__panel">
                      {card.title ? (
                        <h2 className="ak-scroll-cards__title">{card.title}</h2>
                      ) : null}

                      {card.description ? (
                        <p className="ak-scroll-cards__desc">{card.description}</p>
                      ) : null}

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 12,
                          alignItems: "center",
                        }}
                      >
                        {card.button ? (
                          <a
                            href={card.buttonLink || "#"}
                            className="ak-scroll-cards__cta"
                          >
                            {card.button}
                            <CtaArrowIcon />
                          </a>
                        ) : null}
                        {card.secondaryButtonText?.trim() ? (
                          <a
                            href={card.secondaryButtonLink || "#"}
                            style={{
                              marginTop: 0,
                              display: "inline-flex",
                              alignItems: "center",
                              borderRadius: 9999,
                              padding: "12px 20px",
                              fontSize: 14,
                              fontWeight: 500,
                              textDecoration: "none",
                              border: "1px solid rgba(255,255,255,0.85)",
                              color: "#fff",
                            }}
                          >
                            {card.secondaryButtonText}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
