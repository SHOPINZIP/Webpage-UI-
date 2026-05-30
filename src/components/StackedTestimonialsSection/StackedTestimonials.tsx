import React, { useMemo } from "react";

import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  TESTIMONIAL_BACKGROUND_WORD_DEFAULT,
  TESTIMONIAL_CUSTOMER_NAME_DEFAULT,
  TESTIMONIAL_CUSTOMER_ROLE_DEFAULT,
  TESTIMONIAL_QUOTE_TEXT_DEFAULT,
} from "../../shared/textStyleDefaults/testimonialTextStyleDefaults";
import { usePrefersReducedMotion } from "../MessageStyleTestimonialsSection/hooks";
import type { StackedTestimonialsProps, StackedTestimonialItemProps } from "./types";

function clampStars(raw: string | undefined): number {
  const n = Number.parseInt(String(raw ?? "5"), 10);
  if (!Number.isFinite(n)) return 5;
  return Math.min(5, Math.max(1, n));
}

function StarRow({ count }: { count: number }) {
  const n = Math.min(5, Math.max(0, count));
  return (
    <div className="ak-stacked-t__stars" aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        <svg
          key={i}
          className="ak-stacked-t__star"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          role="presentation"
        >
          <path
            fill="currentColor"
            d="M12 2.5l2.9 6.1 6.8.6-5.1 4.5 1.5 6.7L12 17.9 5.9 20.4l1.5-6.7-5.1-4.5 6.8-.6L12 2.5z"
          />
        </svg>
      ))}
    </div>
  );
}

const DESKTOP_OFFSETS = [
  "ak-stacked-t__card-pos--d0",
  "ak-stacked-t__card-pos--d1",
  "ak-stacked-t__card-pos--d2",
  "ak-stacked-t__card-pos--d3",
  "ak-stacked-t__card-pos--d4",
];

const MOBILE_OFFSETS = [
  "ak-stacked-t__card-pos--m0",
  "ak-stacked-t__card-pos--m1",
  "ak-stacked-t__card-pos--m2",
  "ak-stacked-t__card-pos--m3",
  "ak-stacked-t__card-pos--m4",
];

function StackedCard({
  item,
  index,
  reduceMotion,
  quoteStyle,
  nameStyle,
  roleStyle,
}: {
  item: StackedTestimonialItemProps;
  index: number;
  reduceMotion: boolean;
  quoteStyle?: React.CSSProperties;
  nameStyle?: React.CSSProperties;
  roleStyle?: React.CSSProperties;
}) {
  const name = String(item?.name ?? "").trim();
  const role = String(item?.role ?? "").trim();
  const quote = String(item?.quote ?? "").trim();
  const stars = clampStars(item?.stars);

  const posClass = `${MOBILE_OFFSETS[index % MOBILE_OFFSETS.length]} ${DESKTOP_OFFSETS[index % DESKTOP_OFFSETS.length]}`;

  return (
    <div
      className={`ak-stacked-t__card-wrap ${posClass} ${
        reduceMotion ? "ak-stacked-t__card-wrap--static" : ""
      }`}
      style={{ zIndex: 10 + index }}
    >
      <div className="ak-stacked-t__card">
        <div className="ak-stacked-t__card-shine" aria-hidden />
        <div className="ak-stacked-t__card-inner">
          <StarRow count={stars} />

          <p className="ak-stacked-t__quote" style={quoteStyle}>
            {quote ? (
              <>
                <span className="ak-stacked-t__quote-mark">“</span>
                {quote}
                <span className="ak-stacked-t__quote-mark">”</span>
              </>
            ) : (
              <span className="ak-stacked-t__placeholder">Add a quote</span>
            )}
          </p>

          <div className="ak-stacked-t__footer">
            <div className="ak-stacked-t__name" style={nameStyle}>
              {name || <span className="ak-stacked-t__placeholder">Name</span>}
            </div>
            <div className="ak-stacked-t__role" style={roleStyle}>
              {role || <span className="ak-stacked-t__placeholder">Role</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StackedTestimonials({
  section,
  appearance,
  theme,
}: StackedTestimonialsProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const headingWord = String(props.backgroundWord ?? "Testimonial").trim() || "Testimonial";
  const showWord = props.showBackgroundWord !== false;

  const blocks = useMemo(
    () =>
      Array.isArray(section?.settings?.blocks)
        ? section.settings.blocks.filter((b) => b && typeof b === "object")
        : [],
    [section?.settings?.blocks]
  );

  const hasContent = blocks.some((b) => {
    const p = b?.props;
    if (!p || typeof p !== "object") return false;
    return (
      String(p.quote ?? "").trim() !== "" ||
      String(p.name ?? "").trim() !== "" ||
      String(p.role ?? "").trim() !== ""
    );
  });

  const backgroundWordStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "backgroundWord",
          role: "heading",
          defaultStyle: TESTIMONIAL_BACKGROUND_WORD_DEFAULT,
        })
      ),
    [section, theme]
  );

  const quoteTextStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "quoteText",
          role: "body",
          defaultStyle: TESTIMONIAL_QUOTE_TEXT_DEFAULT,
        })
      ),
    [section, theme]
  );

  const customerNameStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "customerName",
          role: "heading",
          defaultStyle: TESTIMONIAL_CUSTOMER_NAME_DEFAULT,
        })
      ),
    [section, theme]
  );

  const customerRoleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "customerRole",
          role: "body",
          defaultStyle: TESTIMONIAL_CUSTOMER_ROLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  return (
    <section
      className="ak-stacked-t"
      aria-label={headingWord}
      style={sectionAppearanceStyle(appearance)}
    >
      <div className="ak-stacked-t__bg" aria-hidden />

      <div className="ak-stacked-t__container">
        {showWord ? (
          <div className="ak-stacked-t__wordmark-wrap">
            <div
              className="ak-stacked-t__wordmark ak-stacked-t__wordmark--sm"
              style={backgroundWordStyle}
            >
              {headingWord}
            </div>
            <div
              className="ak-stacked-t__wordmark ak-stacked-t__wordmark--lg"
              style={backgroundWordStyle}
            >
              {headingWord}
            </div>
          </div>
        ) : null}

        <div className="ak-stacked-t__stage">
          {!hasContent ? (
            <p className="ak-stacked-t__empty">No testimonials yet.</p>
          ) : (
            blocks.map((block, index) => (
              <StackedCard
                key={String(block.id ?? index)}
                item={block.props ?? {}}
                index={index}
                reduceMotion={reduceMotion}
                quoteStyle={quoteTextStyle}
                nameStyle={customerNameStyle}
                roleStyle={customerRoleStyle}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
