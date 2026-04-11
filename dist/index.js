"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  HeroScrollableSlide: () => HeroScrollableSlide,
  HeroSlider: () => HeroSlider,
  MessageStyleTestimonials: () => MessageStyleTestimonials,
  STYLE_APPLE_MARQUEE: () => STYLE_APPLE_MARQUEE,
  STYLE_MESSAGE_BUBBLE: () => STYLE_MESSAGE_BUBBLE,
  normalizeImageUrl: () => normalizeImageUrl
});
module.exports = __toCommonJS(index_exports);

// src/components/HeroSection/HeroSlider/index.tsx
var import_react = __toESM(require("react"));

// src/components/HeroSection/heroSectionUtils.ts
function normalizeImageUrl(raw) {
  const s = String(raw != null ? raw : "").trim();
  if (!s) return "";
  if (/^data:/i.test(s)) return s;
  if (/^blob:/i.test(s)) return s;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("//")) return `https:${s}`;
  return `https://${s}`;
}

// src/components/HeroSection/HeroSlider/index.tsx
var HEIGHT_PRESETS = {
  default: "default",
  short: "short",
  tall: "tall"
};
var OVERLAY_PRESETS = {
  none: "none",
  light: "light",
  medium: "medium",
  heavy: "heavy"
};
function resolveSlideAlignment(override, sectionDefault) {
  if (!override || override === "inherit") return void 0;
  return override;
}
function sectionBlocksToSlides(blocks, sectionAlignment) {
  const slideBlocks = blocks.filter((b) => b.type === "slide");
  if (slideBlocks.length === 0) return [];
  const out = [];
  slideBlocks.forEach((b, i) => {
    var _a;
    const bp = b.props || {};
    const imageRaw = normalizeImageUrl(bp.image);
    if (!imageRaw) return;
    const imageMobileRaw = normalizeImageUrl(bp.imageMobile);
    const imageMobile = imageMobileRaw !== "" ? imageMobileRaw : void 0;
    out.push({
      id: (_a = b.id) != null ? _a : `slide-${i + 1}`,
      image: imageRaw,
      imageMobile,
      headline: bp.headline,
      subheadline: bp.description,
      buttonText: bp.buttonText,
      buttonHref: bp.buttonLink || "#",
      secondaryButtonText: bp.secondaryButtonText,
      secondaryButtonHref: bp.secondaryButtonLink || "#",
      contentAlignment: resolveSlideAlignment(
        bp.alignmentOverride,
        sectionAlignment
      )
    });
  });
  return out;
}
function preloadImage(src) {
  if (!src) return;
  const img = new Image();
  img.src = src;
}
function SlideImage({
  desktopSrc,
  mobileSrc
}) {
  const [desktop, setDesktop] = (0, import_react.useState)(desktopSrc);
  const [mobile, setMobile] = (0, import_react.useState)(mobileSrc || "");
  (0, import_react.useEffect)(() => {
    setDesktop(desktopSrc);
  }, [desktopSrc]);
  (0, import_react.useEffect)(() => {
    setMobile(mobileSrc || "");
  }, [mobileSrc]);
  if (!desktop) {
    return null;
  }
  if (mobile) {
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: desktop,
        alt: "",
        decoding: "async",
        draggable: false,
        onError: () => setDesktop(""),
        className: "ak-hero__img ak-hero__img--desktop"
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: mobile,
        alt: "",
        decoding: "async",
        draggable: false,
        onError: () => setMobile(""),
        className: "ak-hero__img ak-hero__img--mobile"
      }
    ));
  }
  return /* @__PURE__ */ import_react.default.createElement(
    "img",
    {
      src: desktop,
      alt: "",
      decoding: "async",
      draggable: false,
      onError: () => setDesktop(""),
      className: "ak-hero__img"
    }
  );
}
function HeroSlider({ section }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const p = (_b = (_a = section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const blocks = (_d = (_c = section.settings) == null ? void 0 : _c.blocks) != null ? _d : [];
  const sectionAlignment = (_e = p.alignment) != null ? _e : "left";
  const sectionLabel = p.sectionLabel;
  const heightPreset = (_f = p.height) != null ? _f : "default";
  const overlayPreset = (_g = p.overlay) != null ? _g : "medium";
  const autoPlayProp = p.autoPlay !== false;
  const directionProp = p.direction === "right" ? "right" : "left";
  const intervalSecondsProp = Math.max(1, Number(p.speed) || 4);
  const showArrows = p.showArrows !== false;
  const showDots = p.showDots !== false;
  const baseSlides = (0, import_react.useMemo)(() => {
    return sectionBlocksToSlides(blocks, sectionAlignment);
  }, [blocks, sectionAlignment]);
  const hasMultipleSlides = baseSlides.length > 1;
  const slides = (0, import_react.useMemo)(() => {
    if (!hasMultipleSlides) return baseSlides;
    return [
      { ...baseSlides[baseSlides.length - 1], id: `clone-start-${baseSlides[baseSlides.length - 1].id}` },
      ...baseSlides,
      { ...baseSlides[0], id: `clone-end-${baseSlides[0].id}` }
    ];
  }, [baseSlides, hasMultipleSlides]);
  const trackRef = (0, import_react.useRef)(null);
  const viewportRef = (0, import_react.useRef)(null);
  const autoplayRef = (0, import_react.useRef)(null);
  const resetRafRef = (0, import_react.useRef)(null);
  const [viewportWidth, setViewportWidth] = (0, import_react.useState)(0);
  const [index, setIndex] = (0, import_react.useState)(hasMultipleSlides ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = (0, import_react.useState)(true);
  const [isAnimating, setIsAnimating] = (0, import_react.useState)(false);
  const slideSignature = (0, import_react.useMemo)(
    () => baseSlides.map((s) => {
      var _a2;
      return `${s.id}:${s.image}:${(_a2 = s.imageMobile) != null ? _a2 : ""}`;
    }).join("|"),
    [baseSlides]
  );
  (0, import_react.useLayoutEffect)(() => {
    const el = viewportRef.current;
    if (!el) return;
    const updateWidth = () => {
      const width = el.offsetWidth || 0;
      setViewportWidth(width);
    };
    updateWidth();
    const observer = new ResizeObserver(() => {
      updateWidth();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  (0, import_react.useEffect)(() => {
    baseSlides.forEach((slide) => {
      preloadImage(slide.image);
      preloadImage(slide.imageMobile);
    });
  }, [baseSlides]);
  (0, import_react.useEffect)(() => {
    setIndex(hasMultipleSlides ? 1 : 0);
    setTransitionEnabled(true);
    setIsAnimating(false);
  }, [slideSignature, hasMultipleSlides]);
  const activeIndex = hasMultipleSlides ? ((index - 1) % baseSlides.length + baseSlides.length) % baseSlides.length : 0;
  const currentSlide = baseSlides[activeIndex] || baseSlides[0];
  const activeAlign = (_i = (_h = currentSlide == null ? void 0 : currentSlide.contentAlignment) != null ? _h : sectionAlignment) != null ? _i : "left";
  const heightKey = (_j = HEIGHT_PRESETS[String(heightPreset)]) != null ? _j : "default";
  const overlayKey = (_k = OVERLAY_PRESETS[String(overlayPreset)]) != null ? _k : "medium";
  const displayHeadline = currentSlide == null ? void 0 : currentSlide.headline;
  const displaySub = currentSlide == null ? void 0 : currentSlide.subheadline;
  const displayButton = currentSlide == null ? void 0 : currentSlide.buttonText;
  const primaryHref = (_l = currentSlide == null ? void 0 : currentSlide.buttonHref) != null ? _l : "#";
  const displayBadge = sectionLabel;
  const showSecondary = Boolean(
    (currentSlide == null ? void 0 : currentSlide.secondaryButtonText) && String(currentSlide.secondaryButtonText).trim()
  );
  const secondaryHref = (currentSlide == null ? void 0 : currentSlide.secondaryButtonHref) || "#";
  const clearAutoplay = (0, import_react.useCallback)(() => {
    if (autoplayRef.current) {
      window.clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);
  const goToIndex = (0, import_react.useCallback)(
    (nextIndex) => {
      if (!hasMultipleSlides) return;
      if (isAnimating) return;
      setTransitionEnabled(true);
      setIsAnimating(true);
      setIndex(nextIndex);
    },
    [hasMultipleSlides, isAnimating]
  );
  const goNext = (0, import_react.useCallback)(() => {
    goToIndex(index + 1);
  }, [goToIndex, index]);
  const goPrev = (0, import_react.useCallback)(() => {
    goToIndex(index - 1);
  }, [goToIndex, index]);
  (0, import_react.useEffect)(() => {
    clearAutoplay();
    if (!hasMultipleSlides) return;
    if (!autoPlayProp) return;
    if (isAnimating) return;
    autoplayRef.current = window.setTimeout(() => {
      if (directionProp === "left") {
        setTransitionEnabled(true);
        setIsAnimating(true);
        setIndex((prev) => prev + 1);
      } else {
        setTransitionEnabled(true);
        setIsAnimating(true);
        setIndex((prev) => prev - 1);
      }
    }, intervalSecondsProp * 1e3);
    return clearAutoplay;
  }, [
    index,
    hasMultipleSlides,
    autoPlayProp,
    directionProp,
    intervalSecondsProp,
    isAnimating,
    clearAutoplay
  ]);
  const jumpWithoutAnimation = (0, import_react.useCallback)((targetIndex) => {
    setTransitionEnabled(false);
    setIndex(targetIndex);
    if (resetRafRef.current) {
      cancelAnimationFrame(resetRafRef.current);
    }
    resetRafRef.current = requestAnimationFrame(() => {
      resetRafRef.current = requestAnimationFrame(() => {
        setTransitionEnabled(true);
        setIsAnimating(false);
      });
    });
  }, []);
  const handleTransitionEnd = (0, import_react.useCallback)(() => {
    if (!hasMultipleSlides) {
      setIsAnimating(false);
      return;
    }
    if (index === slides.length - 1) {
      jumpWithoutAnimation(1);
      return;
    }
    if (index === 0) {
      jumpWithoutAnimation(slides.length - 2);
      return;
    }
    setIsAnimating(false);
  }, [hasMultipleSlides, index, slides.length, jumpWithoutAnimation]);
  (0, import_react.useEffect)(() => {
    return () => {
      clearAutoplay();
      if (resetRafRef.current) {
        cancelAnimationFrame(resetRafRef.current);
      }
    };
  }, [clearAutoplay]);
  const trackTranslateX = viewportWidth > 0 ? -(index * viewportWidth) : 0;
  if (section.enabled === false) {
    return null;
  }
  if (baseSlides.length === 0) {
    return null;
  }
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero" }, /* @__PURE__ */ import_react.default.createElement("section", { className: "ak-hero__section" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__container" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__frame" }, /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      ref: viewportRef,
      className: `ak-hero__viewport ak-hero__viewport--${heightKey}`
    },
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        ref: trackRef,
        onTransitionEnd: handleTransitionEnd,
        className: "ak-hero__track",
        style: {
          width: viewportWidth > 0 ? `${slides.length * viewportWidth}px` : `${slides.length * 100}%`,
          transform: `translate3d(${trackTranslateX}px, 0, 0)`,
          transition: hasMultipleSlides && transitionEnabled ? "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          willChange: "transform"
        }
      },
      slides.map((slide, i) => {
        const href = slide.buttonHref || "#";
        return /* @__PURE__ */ import_react.default.createElement(
          "a",
          {
            key: `slot-${i}-${slide.id}`,
            href,
            className: "ak-hero__slide",
            style: {
              width: viewportWidth > 0 ? `${viewportWidth}px` : `${100 / slides.length}%`,
              flex: "0 0 auto"
            },
            "aria-label": "Hero slide"
          },
          /* @__PURE__ */ import_react.default.createElement(
            SlideImage,
            {
              desktopSrc: slide.image,
              mobileSrc: slide.imageMobile
            }
          ),
          /* @__PURE__ */ import_react.default.createElement(
            "div",
            {
              className: `ak-hero__overlay ak-hero__overlay--${overlayKey}`
            }
          ),
          /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__gradient ak-hero__gradient--r" }),
          /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__gradient ak-hero__gradient--t" })
        );
      })
    ),
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: `ak-hero__contentLayer ak-hero__contentLayer--${activeAlign}`
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__contentPadding" }, /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: `ak-hero__contentCard ak-hero__contentCard--${activeAlign}`
        },
        displayHeadline ? /* @__PURE__ */ import_react.default.createElement("h1", { className: "ak-hero__headline" }, displayHeadline) : null,
        displaySub ? /* @__PURE__ */ import_react.default.createElement("p", { className: "ak-hero__subhead" }, displaySub) : null,
        /* @__PURE__ */ import_react.default.createElement(
          "div",
          {
            className: `ak-hero__ctaRow ak-hero__ctaRow--${activeAlign}`
          },
          displayButton ? /* @__PURE__ */ import_react.default.createElement(
            "a",
            {
              href: primaryHref,
              className: "ak-hero__btn ak-hero__btn--primary"
            },
            displayButton
          ) : null,
          showSecondary && (currentSlide == null ? void 0 : currentSlide.secondaryButtonText) ? /* @__PURE__ */ import_react.default.createElement(
            "a",
            {
              href: secondaryHref,
              className: "ak-hero__btn ak-hero__btn--secondary"
            },
            currentSlide.secondaryButtonText
          ) : null
        )
      ))
    ),
    showArrows && hasMultipleSlides && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: goPrev,
        disabled: isAnimating,
        className: "ak-hero__arrow ak-hero__arrow--prev",
        "aria-label": "Previous slide",
        type: "button"
      },
      /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-arrow-left" })
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: goNext,
        disabled: isAnimating,
        className: "ak-hero__arrow ak-hero__arrow--next",
        "aria-label": "Next slide",
        type: "button"
      },
      /* @__PURE__ */ import_react.default.createElement("i", { className: "fa-solid fa-arrow-right" })
    )),
    /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__topbar" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__topbarInner" }, displayBadge ? /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__badge" }, displayBadge) : null, /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__counter" }, "Slide ", String(activeIndex + 1).padStart(2, "0"), " /", " ", String(baseSlides.length).padStart(2, "0"))))
  ), showDots && baseSlides.length > 1 && /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__dotsBar" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__dots" }, baseSlides.map((slide, dotIndex) => /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      key: slide.id,
      type: "button",
      disabled: isAnimating,
      onClick: () => {
        if (isAnimating) return;
        setTransitionEnabled(true);
        setIsAnimating(true);
        setIndex(dotIndex + 1);
      },
      className: `ak-hero__dot ${activeIndex === dotIndex ? "is-active" : ""}`,
      "aria-label": `Go to slide ${dotIndex + 1}`
    }
  ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "ak-hero__dotsCounter" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "ak-hero__dotsCounterStrong" }, String(activeIndex + 1).padStart(2, "0")), /* @__PURE__ */ import_react.default.createElement("span", { className: "ak-hero__dotsCounterSep" }, "/"), /* @__PURE__ */ import_react.default.createElement("span", null, String(baseSlides.length).padStart(2, "0"))))))));
}

// src/components/HeroSection/HeroScrollableSlide/index.tsx
var import_react2 = __toESM(require("react"));
function sectionBlocksToScrollCards(blocks) {
  const slideBlocks = blocks.filter((b) => b.type === "slide");
  if (slideBlocks.length === 0) return [];
  const out = [];
  slideBlocks.forEach((b, i) => {
    var _a, _b, _c, _d, _e;
    const bp = b.props || {};
    const imageRaw = normalizeImageUrl(bp.image);
    if (!imageRaw) return;
    const imageMobileRaw = normalizeImageUrl(bp.imageMobile);
    const imageMobile = imageMobileRaw !== "" ? imageMobileRaw : void 0;
    out.push({
      id: (_a = b.id) != null ? _a : `card-${i + 1}`,
      eyebrow: String((_b = bp.eyebrow) != null ? _b : "").trim(),
      title: String((_c = bp.headline) != null ? _c : "").trim(),
      description: String((_d = bp.description) != null ? _d : "").trim(),
      button: String((_e = bp.buttonText) != null ? _e : "").trim(),
      buttonLink: bp.buttonLink || "#",
      secondaryButtonText: bp.secondaryButtonText,
      secondaryButtonLink: bp.secondaryButtonLink || "#",
      image: imageRaw,
      imageMobile
    });
  });
  return out;
}
function CardImage({
  desktopSrc,
  mobileSrc
}) {
  const desktop = desktopSrc.trim();
  const mobile = mobileSrc == null ? void 0 : mobileSrc.trim();
  if (!desktop) {
    return null;
  }
  if (mobile) {
    return /* @__PURE__ */ import_react2.default.createElement("picture", null, /* @__PURE__ */ import_react2.default.createElement("source", { media: "(max-width: 639px)", srcSet: mobile }), /* @__PURE__ */ import_react2.default.createElement(
      "img",
      {
        src: desktop,
        alt: "",
        decoding: "async",
        draggable: false,
        className: "ak-scroll-cards__img",
        onError: (e) => {
          e.currentTarget.removeAttribute("src");
        }
      }
    ));
  }
  return /* @__PURE__ */ import_react2.default.createElement(
    "img",
    {
      src: desktop,
      alt: "",
      decoding: "async",
      draggable: false,
      className: "ak-scroll-cards__img",
      onError: (e) => {
        e.currentTarget.removeAttribute("src");
      }
    }
  );
}
var CtaArrowIcon = () => /* @__PURE__ */ import_react2.default.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "ak-scroll-cards__ctaIcon",
    "aria-hidden": "true"
  },
  /* @__PURE__ */ import_react2.default.createElement("path", { d: "M7 7h10v10" }),
  /* @__PURE__ */ import_react2.default.createElement("path", { d: "M7 17 17 7" })
);
function HeroScrollableSlide({ section }) {
  var _a, _b, _c, _d, _e, _f;
  const p = (_b = (_a = section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const blocks = (_d = (_c = section.settings) == null ? void 0 : _c.blocks) != null ? _d : [];
  const cards = (0, import_react2.useMemo)(
    () => sectionBlocksToScrollCards(blocks),
    [blocks]
  );
  const toolbarTitle = String((_e = p.sectionLabel) != null ? _e : "").trim();
  const toolbarHint = String((_f = p.toolbarHint) != null ? _f : "").trim();
  if (section.enabled === false) {
    return null;
  }
  if (cards.length === 0) {
    return null;
  }
  return /* @__PURE__ */ import_react2.default.createElement("section", { className: "ak-scroll-cards" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__inner" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__stack" }, cards.map((card, index) => {
    var _a2;
    return /* @__PURE__ */ import_react2.default.createElement(
      "section",
      {
        key: String(card.id),
        className: "ak-scroll-cards__sticky",
        style: { zIndex: index + 1 }
      },
      /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__stickyCenter" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__frame" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__media" }, /* @__PURE__ */ import_react2.default.createElement(
        CardImage,
        {
          desktopSrc: card.image,
          mobileSrc: card.imageMobile
        }
      ), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__overlayTint" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__overlayGradient" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__overlayRadial" })), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__content" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__topRow" }, card.eyebrow ? /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__eyebrow" }, card.eyebrow) : null, /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__index" }, String(index + 1).padStart(2, "0"), " /", " ", String(cards.length).padStart(2, "0"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "ak-scroll-cards__panel" }, card.title ? /* @__PURE__ */ import_react2.default.createElement("h2", { className: "ak-scroll-cards__title" }, card.title) : null, card.description ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "ak-scroll-cards__desc" }, card.description) : null, /* @__PURE__ */ import_react2.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center"
          }
        },
        card.button ? /* @__PURE__ */ import_react2.default.createElement(
          "a",
          {
            href: card.buttonLink || "#",
            className: "ak-scroll-cards__cta"
          },
          card.button,
          /* @__PURE__ */ import_react2.default.createElement(CtaArrowIcon, null)
        ) : null,
        ((_a2 = card.secondaryButtonText) == null ? void 0 : _a2.trim()) ? /* @__PURE__ */ import_react2.default.createElement(
          "a",
          {
            href: card.secondaryButtonLink || "#",
            style: {
              marginTop: 0,
              display: "inline-flex",
              alignItems: "center",
              borderRadius: 9999,
              padding: "12px 20px",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.85)",
              color: "#fff"
            }
          },
          card.secondaryButtonText
        ) : null
      )))))
    );
  }))));
}

// src/components/MessageStyleTestimonialsSection/MessageStyleTestimonials.tsx
var import_react6 = __toESM(require("react"));

// src/components/MessageStyleTestimonialsSection/variants/AppleMessageMarquee.tsx
var import_react4 = __toESM(require("react"));

// src/components/MessageStyleTestimonialsSection/hooks.ts
var import_react3 = require("react");
function usePrefersReducedMotion() {
  const [reduced, setReduced] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    if (typeof window === "undefined" || !window.matchMedia) return void 0;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

// src/components/MessageStyleTestimonialsSection/shared.ts
var STYLE_MESSAGE_BUBBLE = "message_bubble";
var STYLE_APPLE_MARQUEE = "apple_message_marquee";
function getVisibleTestimonialItems(blocks) {
  if (!Array.isArray(blocks)) return [];
  const out = [];
  for (const b of blocks) {
    const p = b == null ? void 0 : b.props;
    if (!p) continue;
    if (p.isVisible === false) continue;
    out.push(p);
  }
  return out;
}
function buildMarqueeLoop(items, minItems = 4) {
  if (items.length === 0) return [];
  let base = [...items];
  while (base.length < minItems) {
    base = [...base, ...items];
  }
  return [...base, ...base];
}
function resolveHeading(props) {
  var _a, _b;
  const h = String((_b = (_a = props == null ? void 0 : props.heading) != null ? _a : props == null ? void 0 : props.header) != null ? _b : "").trim();
  return h;
}

// src/components/MessageStyleTestimonialsSection/variants/AppleMessageMarquee.tsx
function parsePx(n, fallback) {
  const v = Number(n);
  return Number.isFinite(v) ? v : fallback;
}
function parseDurationSec(n, fallback) {
  const v = Number(n);
  if (!Number.isFinite(v) || v < 8) return fallback;
  return Math.min(120, v);
}
function StarRating({
  rating,
  visible
}) {
  if (!visible) return null;
  const r = Math.min(5, Math.max(1, Math.round(rating || 5)));
  return /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-mst-apple__stars", "aria-hidden": true }, Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ import_react4.default.createElement(
    "span",
    {
      key: i,
      className: i < r ? "ak-mst-apple__star ak-mst-apple__star--on" : "ak-mst-apple__star"
    },
    "\u2605"
  )));
}
function AppleCard({
  item,
  showStars
}) {
  var _a, _b, _c;
  const name = String((_a = item == null ? void 0 : item.name) != null ? _a : "").trim();
  const role = String((_b = item == null ? void 0 : item.role) != null ? _b : "").trim();
  const quote = String((_c = item == null ? void 0 : item.quote) != null ? _c : "").trim();
  const rating = Number(item == null ? void 0 : item.rating);
  const stars = Number.isFinite(rating) ? rating : 5;
  return /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-mst-apple__card-wrap" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-mst-apple__card" }, /* @__PURE__ */ import_react4.default.createElement(StarRating, { rating: stars, visible: showStars }), /* @__PURE__ */ import_react4.default.createElement("p", { className: "ak-mst-apple__quote" }, quote ? /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, /* @__PURE__ */ import_react4.default.createElement("span", { className: "ak-mst-apple__q" }, "\u201C"), quote, /* @__PURE__ */ import_react4.default.createElement("span", { className: "ak-mst-apple__q" }, "\u201D")) : /* @__PURE__ */ import_react4.default.createElement("span", { className: "ak-mst-apple__placeholder" }, "Add a quote")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-mst-apple__footer" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "ak-mst-apple__name" }, name || "Name"), role ? /* @__PURE__ */ import_react4.default.createElement("span", { className: "ak-mst-apple__role" }, role) : null)));
}
function AppleMessageMarquee({
  section
}) {
  var _a, _b, _c, _d, _e;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const heading = resolveHeading(props);
  const sub = String((_c = props.subheading) != null ? _c : "").trim();
  const bg = String((_d = props.backgroundColor) != null ? _d : "").trim() || "#f5f5f7";
  const row1 = parseDurationSec(props.rowOneSpeed, 34);
  const row2 = parseDurationSec(props.rowTwoSpeed, 38);
  const pauseOnHover = Boolean(props.pauseOnHover);
  const showStars = props.showStars !== false;
  const padTop = parsePx(props.sectionPaddingTop, 72);
  const padBot = parsePx(props.sectionPaddingBottom, 72);
  const blocks = (_e = section == null ? void 0 : section.settings) == null ? void 0 : _e.blocks;
  const items = (0, import_react4.useMemo)(
    () => getVisibleTestimonialItems(blocks),
    [blocks]
  );
  const loop = (0, import_react4.useMemo)(
    () => items.length > 0 ? buildMarqueeLoop(items, 6) : [],
    [items]
  );
  const sectionStyle = {
    background: bg,
    paddingTop: padTop,
    paddingBottom: padBot
  };
  const cls = [
    "ak-mst-apple",
    pauseOnHover ? "ak-mst-apple--pause-hover" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ import_react4.default.createElement(
    "section",
    {
      className: cls,
      style: sectionStyle,
      "aria-label": heading || "Testimonials"
    },
    /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-mst-apple__inner" }, /* @__PURE__ */ import_react4.default.createElement("header", { className: "ak-mst-apple__intro" }, /* @__PURE__ */ import_react4.default.createElement("h2", { className: "ak-mst-apple__title" }, heading || "Loved by merchants."), sub ? /* @__PURE__ */ import_react4.default.createElement("p", { className: "ak-mst-apple__sub" }, sub) : null), items.length === 0 ? /* @__PURE__ */ import_react4.default.createElement("p", { className: "ak-mst-apple__empty" }, "No testimonials yet.") : reduceMotion ? /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-mst-apple__static-grid" }, items.map((item, i) => /* @__PURE__ */ import_react4.default.createElement(AppleCard, { key: i, item, showStars }))) : /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-mst-apple__marquee" }, /* @__PURE__ */ import_react4.default.createElement(
      "div",
      {
        className: "ak-mst-apple__track ak-mst-apple__track--1",
        style: {
          ["--ak-mst-apple-dur"]: `${row1}s`
        }
      },
      loop.map((item, index) => /* @__PURE__ */ import_react4.default.createElement(
        AppleCard,
        {
          key: `r1-${index}`,
          item,
          showStars
        }
      ))
    )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-mst-apple__marquee ak-mst-apple__marquee--second" }, /* @__PURE__ */ import_react4.default.createElement(
      "div",
      {
        className: "ak-mst-apple__track ak-mst-apple__track--2",
        style: {
          ["--ak-mst-apple-dur"]: `${row2}s`
        }
      },
      loop.map((item, index) => /* @__PURE__ */ import_react4.default.createElement(
        AppleCard,
        {
          key: `r2-${index}`,
          item,
          showStars
        }
      ))
    ))))
  );
}

// src/components/MessageStyleTestimonialsSection/variants/MessageBubbleMarquee.tsx
var import_react5 = __toESM(require("react"));
function MessageBubble({ item }) {
  var _a, _b, _c;
  const name = String((_a = item == null ? void 0 : item.name) != null ? _a : "").trim();
  const role = String((_b = item == null ? void 0 : item.role) != null ? _b : "").trim();
  const quote = String((_c = item == null ? void 0 : item.quote) != null ? _c : "").trim();
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-mst__bubble-wrap" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-mst__bubble" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-mst__tail", "aria-hidden": true }), /* @__PURE__ */ import_react5.default.createElement("p", { className: "ak-mst__quote" }, quote ? /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("span", { className: "ak-mst__quote-mark" }, "\u201C"), quote, /* @__PURE__ */ import_react5.default.createElement("span", { className: "ak-mst__quote-mark" }, "\u201D")) : /* @__PURE__ */ import_react5.default.createElement("span", { className: "ak-mst__quote-placeholder" }, "Add a quote")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-mst__meta" }, name || role ? /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, name, name && role ? /* @__PURE__ */ import_react5.default.createElement("span", { className: "ak-mst__meta-sep" }, " \u2022 ") : null, role) : /* @__PURE__ */ import_react5.default.createElement("span", { className: "ak-mst__meta-placeholder" }, "Name \u2022 Role"))));
}
function MessageBubbleMarquee({
  section
}) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const heading = resolveHeading(props);
  const blocks = (_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks;
  const items = (0, import_react5.useMemo)(
    () => getVisibleTestimonialItems(blocks),
    [blocks]
  );
  const trackItems = (0, import_react5.useMemo)(
    () => items.length > 0 ? buildMarqueeLoop(items) : [],
    [items]
  );
  const durationSec = Math.max(18, items.length * 5);
  return /* @__PURE__ */ import_react5.default.createElement("section", { className: "ak-mst", "aria-label": heading || "Testimonials" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-mst__inner" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-mst__header-wrap" }, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "ak-mst__heading" }, heading || "What merchants say.")), items.length === 0 ? /* @__PURE__ */ import_react5.default.createElement("p", { className: "ak-mst__empty" }, "No testimonials yet.") : reduceMotion ? /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-mst__row ak-mst__row--static" }, items.map((item, index) => {
    var _a2;
    return /* @__PURE__ */ import_react5.default.createElement(
      MessageBubble,
      {
        key: `${String((_a2 = item.name) != null ? _a2 : index)}-${index}`,
        item
      }
    );
  })) : /* @__PURE__ */ import_react5.default.createElement("div", { className: "ak-mst__marquee" }, /* @__PURE__ */ import_react5.default.createElement(
    "div",
    {
      className: "ak-mst__track ak-mst__track--animate",
      style: {
        ["--ak-mst-duration"]: `${durationSec}s`
      }
    },
    trackItems.map((item, index) => {
      var _a2, _b2;
      return /* @__PURE__ */ import_react5.default.createElement(
        MessageBubble,
        {
          key: `${index}-${String((_a2 = item.name) != null ? _a2 : "")}-${String((_b2 = item.quote) != null ? _b2 : "").slice(0, 12)}`,
          item
        }
      );
    })
  ))));
}

// src/components/MessageStyleTestimonialsSection/MessageStyleTestimonials.tsx
function MessageStyleTestimonials(props) {
  var _a, _b, _c, _d;
  const style = (_d = (_c = (_b = (_a = props.section) == null ? void 0 : _a.settings) == null ? void 0 : _b.props) == null ? void 0 : _c.testimonialStyle) != null ? _d : STYLE_MESSAGE_BUBBLE;
  if (style === STYLE_APPLE_MARQUEE) {
    return /* @__PURE__ */ import_react6.default.createElement(AppleMessageMarquee, { ...props });
  }
  return /* @__PURE__ */ import_react6.default.createElement(MessageBubbleMarquee, { ...props });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HeroScrollableSlide,
  HeroSlider,
  MessageStyleTestimonials,
  STYLE_APPLE_MARQUEE,
  STYLE_MESSAGE_BUBBLE,
  normalizeImageUrl
});
//# sourceMappingURL=index.js.map