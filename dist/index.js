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
  CreativeCategoryMarquee: () => CreativeCategoryMarquee,
  HeroScrollableSlide: () => HeroScrollableSlide,
  HeroSlider: () => HeroSlider,
  LogoFocusedHeader: () => LogoFocusedHeader,
  MessageStyleTestimonials: () => MessageStyleTestimonials,
  PortraitTestimonials: () => PortraitTestimonials,
  ProductCardMarquee: () => ProductCardMarquee,
  ProductMarquee: () => ProductMarquee,
  STYLE_APPLE_MARQUEE: () => STYLE_APPLE_MARQUEE,
  STYLE_MESSAGE_BUBBLE: () => STYLE_MESSAGE_BUBBLE,
  STYLE_PORTRAIT_TESTIMONIALS: () => STYLE_PORTRAIT_TESTIMONIALS,
  STYLE_STACKED_TESTIMONIALS: () => STYLE_STACKED_TESTIMONIALS,
  StackedTestimonials: () => StackedTestimonials,
  TransparentHeroHeader: () => TransparentHeroHeader,
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

// src/components/LogoFocusedHeaderSection/LogoFocusedHeader.tsx
var import_react3 = __toESM(require("react"));
function safeText(v) {
  return String(v != null ? v : "").trim();
}
function IconUser() {
  return /* @__PURE__ */ import_react3.default.createElement(
    "svg",
    {
      className: "ak-lfh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react3.default.createElement("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ import_react3.default.createElement("circle", { cx: "12", cy: "7", r: "4" })
  );
}
function IconBag() {
  return /* @__PURE__ */ import_react3.default.createElement(
    "svg",
    {
      className: "ak-lfh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react3.default.createElement("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }),
    /* @__PURE__ */ import_react3.default.createElement("path", { d: "M3 6h18" }),
    /* @__PURE__ */ import_react3.default.createElement("path", { d: "M16 10a4 4 0 0 1-8 0" })
  );
}
function NavToggle({ items, active, onSelect }) {
  if (items.length === 0) return null;
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-lfh__navToggle", role: "tablist", "aria-label": "Primary navigation" }, items.map((item, idx) => {
    const isActive = active === item.label;
    const href = safeText(item.link);
    return href ? /* @__PURE__ */ import_react3.default.createElement(
      "a",
      {
        key: `${item.label}-${idx}`,
        href,
        role: "tab",
        "aria-selected": isActive,
        className: isActive ? "ak-lfh__navPill ak-lfh__navPill--active" : "ak-lfh__navPill",
        onClick: () => onSelect(item.label)
      },
      item.label
    ) : /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        key: `${item.label}-${idx}`,
        type: "button",
        role: "tab",
        "aria-selected": isActive,
        className: isActive ? "ak-lfh__navPill ak-lfh__navPill--active" : "ak-lfh__navPill",
        onClick: () => onSelect(item.label)
      },
      item.label
    );
  }));
}
function LogoFocusedHeader({ section }) {
  var _a, _b, _c;
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const rawBlocks = (_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks;
  const navItems = (0, import_react3.useMemo)(() => {
    const blocks = Array.isArray(rawBlocks) ? rawBlocks : [];
    return blocks.slice(0, 2).map((b, i) => {
      var _a2, _b2;
      return {
        label: safeText((_a2 = b == null ? void 0 : b.props) == null ? void 0 : _a2.label) || (i === 0 ? "Home" : "Shop"),
        link: safeText((_b2 = b == null ? void 0 : b.props) == null ? void 0 : _b2.link)
      };
    });
  }, [rawBlocks]);
  const [activeLabel, setActiveLabel] = (0, import_react3.useState)(() => {
    var _a2, _b2;
    return (_b2 = (_a2 = navItems[0]) == null ? void 0 : _a2.label) != null ? _b2 : "";
  });
  (0, import_react3.useEffect)(() => {
    setActiveLabel((prev) => {
      var _a2, _b2;
      if (navItems.some((n) => n.label === prev)) return prev;
      return (_b2 = (_a2 = navItems[0]) == null ? void 0 : _a2.label) != null ? _b2 : "";
    });
  }, [navItems]);
  const logoText = safeText(props.logoText) || "Logo";
  const brandName = safeText(props.brandName) || "";
  const brandSubtitle = safeText(props.brandSubtitle) || "";
  const logoSrc = normalizeImageUrl(props.logoImage);
  const showSubtitle = props.showBrandSubtitle !== false;
  const showProfile = props.showProfileIcon !== false;
  const showCart = props.showCartIcon !== false;
  const cartBadge = safeText(props.cartCount);
  const sticky = props.stickyHeader !== false;
  return /* @__PURE__ */ import_react3.default.createElement("header", { className: `ak-lfh ${sticky ? "ak-lfh__bar--sticky" : ""}` }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-lfh__bar" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-lfh__row" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-lfh__brand" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-lfh__logoBadge", "aria-hidden": Boolean(logoSrc) }, logoSrc ? /* @__PURE__ */ import_react3.default.createElement(
    "img",
    {
      className: "ak-lfh__logoImg",
      src: logoSrc,
      alt: brandName,
      loading: "lazy"
    }
  ) : /* @__PURE__ */ import_react3.default.createElement("span", { className: "ak-lfh__logoText" }, logoText)), /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-lfh__brandText" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-lfh__brandName" }, brandName), showSubtitle ? /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-lfh__brandSub" }, brandSubtitle) : null)), /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-lfh__center" }, /* @__PURE__ */ import_react3.default.createElement(NavToggle, { items: navItems, active: activeLabel, onSelect: setActiveLabel })), /* @__PURE__ */ import_react3.default.createElement("div", { className: "ak-lfh__actions" }, showProfile ? /* @__PURE__ */ import_react3.default.createElement(
    "button",
    {
      type: "button",
      className: "ak-lfh__iconBtn ak-lfh__iconBtn--profileDesktop",
      "aria-label": "Account"
    },
    /* @__PURE__ */ import_react3.default.createElement(IconUser, null)
  ) : null, showCart ? /* @__PURE__ */ import_react3.default.createElement("button", { type: "button", className: "ak-lfh__iconBtn", "aria-label": "Shopping cart" }, /* @__PURE__ */ import_react3.default.createElement(IconBag, null), cartBadge ? /* @__PURE__ */ import_react3.default.createElement("span", { className: "ak-lfh__badge" }, cartBadge) : null) : null))));
}

// src/components/TransparentHeroHeaderSection/TransparentHeroHeader.tsx
var import_react4 = __toESM(require("react"));
function safeText2(v) {
  return String(v != null ? v : "").trim();
}
function parseOpacity(v, fallback) {
  const n = parseFloat(String(v != null ? v : ""));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(1, Math.max(0, n));
}
function parseBlurPx(v, fallback) {
  const n = parseFloat(String(v != null ? v : ""));
  if (!Number.isFinite(n) || n < 0) return fallback;
  return n;
}
function IconUser2() {
  return /* @__PURE__ */ import_react4.default.createElement(
    "svg",
    {
      className: "ak-thh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react4.default.createElement("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "12", cy: "7", r: "4" })
  );
}
function IconBag2() {
  return /* @__PURE__ */ import_react4.default.createElement(
    "svg",
    {
      className: "ak-thh__icon",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    /* @__PURE__ */ import_react4.default.createElement("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }),
    /* @__PURE__ */ import_react4.default.createElement("path", { d: "M3 6h18" }),
    /* @__PURE__ */ import_react4.default.createElement("path", { d: "M16 10a4 4 0 0 1-8 0" })
  );
}
function NavPills({ items, active, onSelect, scrolled }) {
  if (items.length === 0) return null;
  return /* @__PURE__ */ import_react4.default.createElement(
    "div",
    {
      className: [
        "ak-thh__navShell",
        scrolled ? "ak-thh__navShell--scrolled" : "ak-thh__navShell--top"
      ].join(" "),
      role: "tablist",
      "aria-label": "Primary navigation"
    },
    items.map((item, idx) => {
      const isActive = active === item.label;
      const href = safeText2(item.link);
      const pillClass = [
        "ak-thh__navPill",
        isActive ? "ak-thh__navPill--active" : "",
        scrolled ? "ak-thh__navPill--scrolled" : "ak-thh__navPill--top"
      ].filter(Boolean).join(" ");
      return href ? /* @__PURE__ */ import_react4.default.createElement(
        "a",
        {
          key: `${item.label}-${idx}`,
          href,
          role: "tab",
          "aria-selected": isActive,
          className: pillClass,
          onClick: () => onSelect(item.label)
        },
        item.label
      ) : /* @__PURE__ */ import_react4.default.createElement(
        "button",
        {
          key: `${item.label}-${idx}`,
          type: "button",
          role: "tab",
          "aria-selected": isActive,
          className: pillClass,
          onClick: () => onSelect(item.label)
        },
        item.label
      );
    })
  );
}
function TransparentHeroHeader({ section }) {
  var _a, _b, _c;
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const rawBlocks = (_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks;
  const navItems = (0, import_react4.useMemo)(() => {
    const blocks = Array.isArray(rawBlocks) ? rawBlocks : [];
    return blocks.slice(0, 2).map((b, i) => {
      var _a2, _b2;
      return {
        label: safeText2((_a2 = b == null ? void 0 : b.props) == null ? void 0 : _a2.label) || (i === 0 ? "Home" : "Shop"),
        link: safeText2((_b2 = b == null ? void 0 : b.props) == null ? void 0 : _b2.link)
      };
    });
  }, [rawBlocks]);
  const [activeLabel, setActiveLabel] = (0, import_react4.useState)(() => {
    var _a2, _b2;
    return (_b2 = (_a2 = navItems[0]) == null ? void 0 : _a2.label) != null ? _b2 : "";
  });
  const [scrollY, setScrollY] = (0, import_react4.useState)(0);
  (0, import_react4.useEffect)(() => {
    setActiveLabel((prev) => {
      var _a2, _b2;
      if (navItems.some((n) => n.label === prev)) return prev;
      return (_b2 = (_a2 = navItems[0]) == null ? void 0 : _a2.label) != null ? _b2 : "";
    });
  }, [navItems]);
  const enableTransition = props.enableScrollTransition !== false;
  const sticky = props.stickyHeader !== false;
  (0, import_react4.useEffect)(() => {
    if (typeof window === "undefined") return void 0;
    if (!sticky && !enableTransition) {
      setScrollY(0);
      return void 0;
    }
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableTransition, sticky]);
  const scrolled = scrollY > 24;
  const progress = (0, import_react4.useMemo)(
    () => enableTransition ? Math.min(scrollY / 120, 1) : 0,
    [scrollY, enableTransition]
  );
  const initialAlpha = parseOpacity(props.initialTransparency, 0.04);
  const maxAlpha = parseOpacity(props.maxTransparency, 0.32);
  const maxBlurPx = parseBlurPx(props.maxBlur, 18);
  const bgAlpha = enableTransition ? initialAlpha + progress * Math.max(0, maxAlpha - initialAlpha) : initialAlpha;
  const blurPx = enableTransition ? progress * maxBlurPx : 0;
  const borderAlpha = enableTransition ? progress * 0.08 : 0;
  const logoText = safeText2(props.logoText) || "Logo";
  const logoSrc = normalizeImageUrl(props.logoImage);
  const showProfile = props.showProfileIcon !== false;
  const showCart = props.showCartIcon !== false;
  const cartBadge = safeText2(props.cartCount);
  const headerStyle = {
    backgroundColor: `rgba(10, 10, 12, ${bgAlpha})`,
    backdropFilter: blurPx > 0 ? `blur(${blurPx}px)` : void 0,
    WebkitBackdropFilter: blurPx > 0 ? `blur(${blurPx}px)` : void 0,
    boxShadow: `inset 0 -1px 0 rgba(255,255,255,${borderAlpha})`
  };
  const positionClass = sticky ? "ak-thh__bar--sticky" : "ak-thh__bar--static";
  return /* @__PURE__ */ import_react4.default.createElement("header", { className: `ak-thh ${positionClass}`, style: headerStyle }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-thh__inner" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-thh__logo" }, /* @__PURE__ */ import_react4.default.createElement(
    "div",
    {
      className: [
        "ak-thh__logoBadge",
        scrolled ? "ak-thh__logoBadge--scrolled" : "ak-thh__logoBadge--top"
      ].join(" "),
      "aria-hidden": Boolean(logoSrc)
    },
    logoSrc ? /* @__PURE__ */ import_react4.default.createElement(
      "img",
      {
        className: "ak-thh__logoImg",
        src: logoSrc,
        alt: logoText,
        loading: "lazy"
      }
    ) : /* @__PURE__ */ import_react4.default.createElement("span", { className: "ak-thh__logoText" }, logoText)
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-thh__center" }, /* @__PURE__ */ import_react4.default.createElement(
    NavPills,
    {
      items: navItems,
      active: activeLabel,
      onSelect: setActiveLabel,
      scrolled
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "ak-thh__actions" }, showProfile ? /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      type: "button",
      className: [
        "ak-thh__iconBtn",
        scrolled ? "ak-thh__iconBtn--scrolled" : "ak-thh__iconBtn--top"
      ].join(" "),
      "aria-label": "Account"
    },
    /* @__PURE__ */ import_react4.default.createElement(IconUser2, null)
  ) : null, showCart ? /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      type: "button",
      className: [
        "ak-thh__iconBtn",
        scrolled ? "ak-thh__iconBtn--scrolled" : "ak-thh__iconBtn--top"
      ].join(" "),
      "aria-label": "Shopping cart"
    },
    /* @__PURE__ */ import_react4.default.createElement(IconBag2, null),
    cartBadge ? /* @__PURE__ */ import_react4.default.createElement("span", { className: "ak-thh__badge" }, cartBadge) : null
  ) : null)));
}

// src/components/MessageStyleTestimonialsSection/MessageStyleTestimonials.tsx
var import_react10 = __toESM(require("react"));

// src/components/MessageStyleTestimonialsSection/variants/AppleMessageMarquee.tsx
var import_react6 = __toESM(require("react"));

// src/components/MessageStyleTestimonialsSection/hooks.ts
var import_react5 = require("react");
function usePrefersReducedMotion() {
  const [reduced, setReduced] = (0, import_react5.useState)(false);
  (0, import_react5.useEffect)(() => {
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
var STYLE_STACKED_TESTIMONIALS = "stacked_testimonials";
var STYLE_PORTRAIT_TESTIMONIALS = "portrait_testimonials";
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
  return /* @__PURE__ */ import_react6.default.createElement("div", { className: "ak-mst-apple__stars", "aria-hidden": true }, Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ import_react6.default.createElement(
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
  return /* @__PURE__ */ import_react6.default.createElement("div", { className: "ak-mst-apple__card-wrap" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "ak-mst-apple__card" }, /* @__PURE__ */ import_react6.default.createElement(StarRating, { rating: stars, visible: showStars }), /* @__PURE__ */ import_react6.default.createElement("p", { className: "ak-mst-apple__quote" }, quote ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("span", { className: "ak-mst-apple__q" }, "\u201C"), quote, /* @__PURE__ */ import_react6.default.createElement("span", { className: "ak-mst-apple__q" }, "\u201D")) : /* @__PURE__ */ import_react6.default.createElement("span", { className: "ak-mst-apple__placeholder" }, "Add a quote")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "ak-mst-apple__footer" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "ak-mst-apple__name" }, name || "Name"), role ? /* @__PURE__ */ import_react6.default.createElement("span", { className: "ak-mst-apple__role" }, role) : null)));
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
  const items = (0, import_react6.useMemo)(
    () => getVisibleTestimonialItems(blocks),
    [blocks]
  );
  const loop = (0, import_react6.useMemo)(
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
  return /* @__PURE__ */ import_react6.default.createElement(
    "section",
    {
      className: cls,
      style: sectionStyle,
      "aria-label": heading || "Testimonials"
    },
    /* @__PURE__ */ import_react6.default.createElement("div", { className: "ak-mst-apple__inner" }, /* @__PURE__ */ import_react6.default.createElement("header", { className: "ak-mst-apple__intro" }, /* @__PURE__ */ import_react6.default.createElement("h2", { className: "ak-mst-apple__title" }, heading || "Loved by merchants."), sub ? /* @__PURE__ */ import_react6.default.createElement("p", { className: "ak-mst-apple__sub" }, sub) : null), items.length === 0 ? /* @__PURE__ */ import_react6.default.createElement("p", { className: "ak-mst-apple__empty" }, "No testimonials yet.") : reduceMotion ? /* @__PURE__ */ import_react6.default.createElement("div", { className: "ak-mst-apple__static-grid" }, items.map((item, i) => /* @__PURE__ */ import_react6.default.createElement(AppleCard, { key: i, item, showStars }))) : /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "ak-mst-apple__marquee" }, /* @__PURE__ */ import_react6.default.createElement(
      "div",
      {
        className: "ak-mst-apple__track ak-mst-apple__track--1",
        style: {
          ["--ak-mst-apple-dur"]: `${row1}s`
        }
      },
      loop.map((item, index) => /* @__PURE__ */ import_react6.default.createElement(
        AppleCard,
        {
          key: `r1-${index}`,
          item,
          showStars
        }
      ))
    )), /* @__PURE__ */ import_react6.default.createElement("div", { className: "ak-mst-apple__marquee ak-mst-apple__marquee--second" }, /* @__PURE__ */ import_react6.default.createElement(
      "div",
      {
        className: "ak-mst-apple__track ak-mst-apple__track--2",
        style: {
          ["--ak-mst-apple-dur"]: `${row2}s`
        }
      },
      loop.map((item, index) => /* @__PURE__ */ import_react6.default.createElement(
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
var import_react7 = __toESM(require("react"));
function MessageBubble({ item }) {
  var _a, _b, _c;
  const name = String((_a = item == null ? void 0 : item.name) != null ? _a : "").trim();
  const role = String((_b = item == null ? void 0 : item.role) != null ? _b : "").trim();
  const quote = String((_c = item == null ? void 0 : item.quote) != null ? _c : "").trim();
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst__bubble-wrap" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst__bubble" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst__tail", "aria-hidden": true }), /* @__PURE__ */ import_react7.default.createElement("p", { className: "ak-mst__quote" }, quote ? /* @__PURE__ */ import_react7.default.createElement(import_react7.default.Fragment, null, /* @__PURE__ */ import_react7.default.createElement("span", { className: "ak-mst__quote-mark" }, "\u201C"), quote, /* @__PURE__ */ import_react7.default.createElement("span", { className: "ak-mst__quote-mark" }, "\u201D")) : /* @__PURE__ */ import_react7.default.createElement("span", { className: "ak-mst__quote-placeholder" }, "Add a quote")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst__meta" }, name || role ? /* @__PURE__ */ import_react7.default.createElement(import_react7.default.Fragment, null, name, name && role ? /* @__PURE__ */ import_react7.default.createElement("span", { className: "ak-mst__meta-sep" }, " \u2022 ") : null, role) : /* @__PURE__ */ import_react7.default.createElement("span", { className: "ak-mst__meta-placeholder" }, "Name \u2022 Role"))));
}
function MessageBubbleMarquee({
  section
}) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const heading = resolveHeading(props);
  const blocks = (_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks;
  const items = (0, import_react7.useMemo)(
    () => getVisibleTestimonialItems(blocks),
    [blocks]
  );
  const trackItems = (0, import_react7.useMemo)(
    () => items.length > 0 ? buildMarqueeLoop(items) : [],
    [items]
  );
  const durationSec = Math.max(18, items.length * 5);
  return /* @__PURE__ */ import_react7.default.createElement("section", { className: "ak-mst", "aria-label": heading || "Testimonials" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst__inner" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst__header-wrap" }, /* @__PURE__ */ import_react7.default.createElement("h2", { className: "ak-mst__heading" }, heading || "What merchants say.")), items.length === 0 ? /* @__PURE__ */ import_react7.default.createElement("p", { className: "ak-mst__empty" }, "No testimonials yet.") : reduceMotion ? /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst__row ak-mst__row--static" }, items.map((item, index) => {
    var _a2;
    return /* @__PURE__ */ import_react7.default.createElement(
      MessageBubble,
      {
        key: `${String((_a2 = item.name) != null ? _a2 : index)}-${index}`,
        item
      }
    );
  })) : /* @__PURE__ */ import_react7.default.createElement("div", { className: "ak-mst__marquee" }, /* @__PURE__ */ import_react7.default.createElement(
    "div",
    {
      className: "ak-mst__track ak-mst__track--animate",
      style: {
        ["--ak-mst-duration"]: `${durationSec}s`
      }
    },
    trackItems.map((item, index) => {
      var _a2, _b2;
      return /* @__PURE__ */ import_react7.default.createElement(
        MessageBubble,
        {
          key: `${index}-${String((_a2 = item.name) != null ? _a2 : "")}-${String((_b2 = item.quote) != null ? _b2 : "").slice(0, 12)}`,
          item
        }
      );
    })
  ))));
}

// src/components/StackedTestimonialsSection/StackedTestimonials.tsx
var import_react8 = __toESM(require("react"));
function clampStars(raw) {
  const n = Number.parseInt(String(raw != null ? raw : "5"), 10);
  if (!Number.isFinite(n)) return 5;
  return Math.min(5, Math.max(1, n));
}
function StarRow({ count }) {
  const n = Math.min(5, Math.max(0, count));
  return /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__stars", "aria-hidden": true }, Array.from({ length: n }).map((_, i) => /* @__PURE__ */ import_react8.default.createElement(
    "svg",
    {
      key: i,
      className: "ak-stacked-t__star",
      viewBox: "0 0 24 24",
      width: "16",
      height: "16",
      role: "presentation"
    },
    /* @__PURE__ */ import_react8.default.createElement(
      "path",
      {
        fill: "currentColor",
        d: "M12 2.5l2.9 6.1 6.8.6-5.1 4.5 1.5 6.7L12 17.9 5.9 20.4l1.5-6.7-5.1-4.5 6.8-.6L12 2.5z"
      }
    )
  )));
}
var DESKTOP_OFFSETS = [
  "ak-stacked-t__card-pos--d0",
  "ak-stacked-t__card-pos--d1",
  "ak-stacked-t__card-pos--d2",
  "ak-stacked-t__card-pos--d3",
  "ak-stacked-t__card-pos--d4"
];
var MOBILE_OFFSETS = [
  "ak-stacked-t__card-pos--m0",
  "ak-stacked-t__card-pos--m1",
  "ak-stacked-t__card-pos--m2",
  "ak-stacked-t__card-pos--m3",
  "ak-stacked-t__card-pos--m4"
];
function StackedCard({
  item,
  index,
  reduceMotion
}) {
  var _a, _b, _c;
  const name = String((_a = item == null ? void 0 : item.name) != null ? _a : "").trim();
  const role = String((_b = item == null ? void 0 : item.role) != null ? _b : "").trim();
  const quote = String((_c = item == null ? void 0 : item.quote) != null ? _c : "").trim();
  const stars = clampStars(item == null ? void 0 : item.stars);
  const posClass = `${MOBILE_OFFSETS[index % MOBILE_OFFSETS.length]} ${DESKTOP_OFFSETS[index % DESKTOP_OFFSETS.length]}`;
  return /* @__PURE__ */ import_react8.default.createElement(
    "div",
    {
      className: `ak-stacked-t__card-wrap ${posClass} ${reduceMotion ? "ak-stacked-t__card-wrap--static" : ""}`,
      style: { zIndex: 10 + index }
    },
    /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__card" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__card-shine", "aria-hidden": true }), /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__card-inner" }, /* @__PURE__ */ import_react8.default.createElement(StarRow, { count: stars }), /* @__PURE__ */ import_react8.default.createElement("p", { className: "ak-stacked-t__quote" }, quote ? /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement("span", { className: "ak-stacked-t__quote-mark" }, "\u201C"), quote, /* @__PURE__ */ import_react8.default.createElement("span", { className: "ak-stacked-t__quote-mark" }, "\u201D")) : /* @__PURE__ */ import_react8.default.createElement("span", { className: "ak-stacked-t__placeholder" }, "Add a quote")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__footer" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__name" }, name || /* @__PURE__ */ import_react8.default.createElement("span", { className: "ak-stacked-t__placeholder" }, "Name")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__role" }, role || /* @__PURE__ */ import_react8.default.createElement("span", { className: "ak-stacked-t__placeholder" }, "Role")))))
  );
}
function StackedTestimonials({ section }) {
  var _a, _b, _c, _d;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const headingWord = String((_c = props.backgroundWord) != null ? _c : "Testimonial").trim() || "Testimonial";
  const showWord = props.showBackgroundWord !== false;
  const blocks = (0, import_react8.useMemo)(
    () => {
      var _a2;
      return Array.isArray((_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks) ? section.settings.blocks.filter((b) => b && typeof b === "object") : [];
    },
    [(_d = section == null ? void 0 : section.settings) == null ? void 0 : _d.blocks]
  );
  const hasContent = blocks.some((b) => {
    var _a2, _b2, _c2;
    const p = b == null ? void 0 : b.props;
    if (!p || typeof p !== "object") return false;
    return String((_a2 = p.quote) != null ? _a2 : "").trim() !== "" || String((_b2 = p.name) != null ? _b2 : "").trim() !== "" || String((_c2 = p.role) != null ? _c2 : "").trim() !== "";
  });
  return /* @__PURE__ */ import_react8.default.createElement("section", { className: "ak-stacked-t", "aria-label": headingWord }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__bg", "aria-hidden": true }), /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__container" }, showWord ? /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__wordmark-wrap" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__wordmark ak-stacked-t__wordmark--sm" }, headingWord), /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__wordmark ak-stacked-t__wordmark--lg" }, headingWord)) : null, /* @__PURE__ */ import_react8.default.createElement("div", { className: "ak-stacked-t__stage" }, !hasContent ? /* @__PURE__ */ import_react8.default.createElement("p", { className: "ak-stacked-t__empty" }, "No testimonials yet.") : blocks.map((block, index) => {
    var _a2, _b2;
    return /* @__PURE__ */ import_react8.default.createElement(
      StackedCard,
      {
        key: String((_a2 = block.id) != null ? _a2 : index),
        item: (_b2 = block.props) != null ? _b2 : {},
        index,
        reduceMotion
      }
    );
  }))));
}

// src/components/PortraitTestimonialsSection/PortraitTestimonials.tsx
var import_react9 = __toESM(require("react"));
var DESKTOP_POS = [
  { posClass: "ak-pt__p0", rotate: -5, delayMs: 0 },
  { posClass: "ak-pt__p1", rotate: 2, delayMs: 100 },
  { posClass: "ak-pt__p2", rotate: -3, delayMs: 220 },
  { posClass: "ak-pt__p3", rotate: 3, delayMs: 320 },
  { posClass: "ak-pt__p4", rotate: -2, delayMs: 420 },
  { posClass: "ak-pt__p5", rotate: 5, delayMs: 520 },
  { posClass: "ak-pt__p6", rotate: 4, delayMs: 620 },
  { posClass: "ak-pt__p7", rotate: -4, delayMs: 720 }
];
function safeText3(v) {
  return String(v != null ? v : "").trim();
}
function computeMagneticOffset(pointerX, pointerY, centerX, centerY, radius = 220, maxPull = 14) {
  const dx = pointerX - centerX;
  const dy = pointerY - centerY;
  const distance = Math.hypot(dx, dy) || 1;
  if (distance > radius) return { x: 0, y: 0 };
  const strength = (1 - distance / radius) * maxPull;
  return { x: dx / distance * strength, y: dy / distance * strength };
}
function easeOffset(offset, factor = 0.84) {
  const x = Math.abs(offset.x) < 0.12 ? 0 : offset.x * factor;
  const y = Math.abs(offset.y) < 0.12 ? 0 : offset.y * factor;
  return { x, y };
}
function PortraitTestimonials({
  section
}) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const eyebrow = safeText3(props.eyebrow) || "TESTIMONIALS";
  const heading = safeText3(props.heading) || "Trusted by leaders";
  const highlightText = safeText3(props.highlightText) || "from various industries";
  const description = safeText3(props.description) || "Learn why professionals trust thoughtful digital experiences to elevate customer journeys.";
  const showButton = props.showButton !== false;
  const buttonText = safeText3(props.buttonText) || "Read Success Stories";
  const buttonLink = safeText3(props.buttonLink);
  const enableMagnetic = props.enableMagneticEffect !== false;
  const blocks = (0, import_react9.useMemo)(() => {
    var _a2;
    const raw = (_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks;
    if (!Array.isArray(raw)) return [];
    return raw.slice(0, 8);
  }, [(_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks]);
  const [loaded, setLoaded] = (0, import_react9.useState)(false);
  const [offsets, setOffsets] = (0, import_react9.useState)(
    () => Object.fromEntries(DESKTOP_POS.map((_, i) => [i, { x: 0, y: 0 }]))
  );
  const sectionRef = (0, import_react9.useRef)(null);
  const cardRefs = (0, import_react9.useRef)({});
  const restFrameRef = (0, import_react9.useRef)(null);
  (0, import_react9.useEffect)(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, []);
  (0, import_react9.useEffect)(() => {
    if (reduceMotion) return void 0;
    const sectionEl = sectionRef.current;
    if (!sectionEl) return void 0;
    if (!enableMagnetic) return void 0;
    const stopRest = () => {
      if (restFrameRef.current !== null) {
        window.cancelAnimationFrame(restFrameRef.current);
        restFrameRef.current = null;
      }
    };
    const animateBack = () => {
      setOffsets((prev) => {
        var _a2;
        const next = {};
        let moving = false;
        for (let i = 0; i < DESKTOP_POS.length; i += 1) {
          const eased = easeOffset((_a2 = prev[i]) != null ? _a2 : { x: 0, y: 0 });
          next[i] = eased;
          if (eased.x !== 0 || eased.y !== 0) moving = true;
        }
        if (moving) {
          restFrameRef.current = window.requestAnimationFrame(animateBack);
        } else {
          restFrameRef.current = null;
        }
        return next;
      });
    };
    const updateFromPointer = (clientX, clientY) => {
      setOffsets(() => {
        const next = {};
        for (let i = 0; i < DESKTOP_POS.length; i += 1) {
          const el = cardRefs.current[i];
          if (!el) {
            next[i] = { x: 0, y: 0 };
            continue;
          }
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          next[i] = computeMagneticOffset(clientX, clientY, cx, cy);
        }
        return next;
      });
    };
    const onMove = (e) => {
      stopRest();
      updateFromPointer(e.clientX, e.clientY);
    };
    const onLeave = () => {
      stopRest();
      restFrameRef.current = window.requestAnimationFrame(animateBack);
    };
    sectionEl.addEventListener("pointermove", onMove);
    sectionEl.addEventListener("pointerleave", onLeave);
    return () => {
      sectionEl.removeEventListener("pointermove", onMove);
      sectionEl.removeEventListener("pointerleave", onLeave);
      stopRest();
    };
  }, [enableMagnetic, reduceMotion]);
  return /* @__PURE__ */ import_react9.default.createElement("section", { ref: sectionRef, className: "ak-pt", "aria-label": heading }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-pt__container" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-pt__desktop" }, DESKTOP_POS.map((pos, index) => {
    var _a2, _b2, _c2;
    const p = (_b2 = (_a2 = blocks[index]) == null ? void 0 : _a2.props) != null ? _b2 : {};
    const img = safeText3(p.image);
    const alt = safeText3(p.alt) || "Testimonial portrait";
    const magnetic = (_c2 = offsets[index]) != null ? _c2 : { x: 0, y: 0 };
    return /* @__PURE__ */ import_react9.default.createElement(
      "div",
      {
        key: index,
        className: `ak-pt__portrait ${pos.posClass}`,
        style: {
          transition: "transform 1400ms cubic-bezier(0.22,1,0.36,1), opacity 1200ms cubic-bezier(0.22,1,0.36,1), filter 1400ms cubic-bezier(0.22,1,0.36,1)",
          transitionDelay: `${pos.delayMs}ms`,
          opacity: loaded ? 1 : 0,
          filter: loaded ? "blur(0px)" : "blur(10px)",
          transform: loaded ? "translate3d(0px, 0px, 0px) scale(1)" : "translate3d(0px, 48px, 0px) scale(0.9)"
        }
      },
      /* @__PURE__ */ import_react9.default.createElement(
        "div",
        {
          ref: (node) => {
            cardRefs.current[index] = node;
          },
          className: "ak-pt__card",
          style: {
            transform: `translate3d(${magnetic.x}px, ${magnetic.y}px, 0) rotate(${pos.rotate}deg)`,
            transition: "transform 320ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms cubic-bezier(0.22,1,0.36,1)",
            boxShadow: magnetic.x !== 0 || magnetic.y !== 0 ? "0 34px 84px rgba(0,0,0,0.16)" : "0 26px 70px rgba(0,0,0,0.14)",
            willChange: "transform"
          }
        },
        img ? /* @__PURE__ */ import_react9.default.createElement(
          "img",
          {
            src: img,
            alt,
            className: "ak-pt__img",
            style: {
              transform: loaded ? "scale(1)" : "scale(1.08)",
              transitionDelay: `${pos.delayMs + 60}ms`
            },
            loading: "lazy"
          }
        ) : /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-pt__img ak-pt__img--fallback", "aria-hidden": true })
      )
    );
  })), /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-pt__mobile" }, blocks.slice(0, 8).map((b, index) => {
    var _a2, _b2, _c2, _d, _e;
    const p = (_a2 = b == null ? void 0 : b.props) != null ? _a2 : {};
    const img = safeText3(p.image);
    const alt = safeText3(p.alt) || "Testimonial portrait";
    const settledY = index % 2 === 0 ? 16 : -4;
    const startY = index % 2 === 0 ? 36 : 12;
    return /* @__PURE__ */ import_react9.default.createElement(
      "div",
      {
        key: `m-${index}`,
        className: `ak-pt__mcard ${index % 2 === 0 ? "ak-pt__mcard--down" : "ak-pt__mcard--up"}`,
        style: {
          transitionDelay: `${(_c2 = (_b2 = DESKTOP_POS[index]) == null ? void 0 : _b2.delayMs) != null ? _c2 : 0}ms`,
          transform: loaded ? `translateY(${settledY}px) scale(1)` : `translateY(${startY}px) scale(0.92)`,
          opacity: loaded ? 1 : 0,
          filter: loaded ? "blur(0px)" : "blur(4px)"
        }
      },
      img ? /* @__PURE__ */ import_react9.default.createElement(
        "img",
        {
          src: img,
          alt,
          className: "ak-pt__mimg",
          style: {
            transform: loaded ? "scale(1)" : "scale(1.06)",
            transitionDelay: `${((_e = (_d = DESKTOP_POS[index]) == null ? void 0 : _d.delayMs) != null ? _e : 0) + 60}ms`
          },
          loading: "lazy"
        }
      ) : /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-pt__mimg ak-pt__mimg--fallback", "aria-hidden": true })
    );
  })), /* @__PURE__ */ import_react9.default.createElement("div", { className: "ak-pt__center" }, /* @__PURE__ */ import_react9.default.createElement(
    "div",
    {
      className: "ak-pt__eyebrow",
      style: {
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(16px)"
      }
    },
    eyebrow
  ), /* @__PURE__ */ import_react9.default.createElement(
    "h2",
    {
      className: "ak-pt__heading",
      style: {
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(24px)"
      }
    },
    heading,
    /* @__PURE__ */ import_react9.default.createElement("br", null),
    /* @__PURE__ */ import_react9.default.createElement("span", { className: "ak-pt__highlight" }, highlightText)
  ), /* @__PURE__ */ import_react9.default.createElement(
    "p",
    {
      className: "ak-pt__desc",
      style: {
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(24px)"
      }
    },
    description
  ), showButton ? buttonLink ? /* @__PURE__ */ import_react9.default.createElement(
    "a",
    {
      className: "ak-pt__btn",
      href: buttonLink,
      style: {
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(24px)"
      }
    },
    buttonText,
    " ",
    /* @__PURE__ */ import_react9.default.createElement("span", { "aria-hidden": true }, "\u2192")
  ) : /* @__PURE__ */ import_react9.default.createElement(
    "button",
    {
      className: "ak-pt__btn",
      type: "button",
      style: {
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(24px)"
      }
    },
    buttonText,
    " ",
    /* @__PURE__ */ import_react9.default.createElement("span", { "aria-hidden": true }, "\u2192")
  ) : null)));
}

// src/components/MessageStyleTestimonialsSection/MessageStyleTestimonials.tsx
function MessageStyleTestimonials(props) {
  var _a, _b, _c, _d;
  const style = (_d = (_c = (_b = (_a = props.section) == null ? void 0 : _a.settings) == null ? void 0 : _b.props) == null ? void 0 : _c.testimonialStyle) != null ? _d : STYLE_MESSAGE_BUBBLE;
  if (style === STYLE_STACKED_TESTIMONIALS) {
    return /* @__PURE__ */ import_react10.default.createElement(StackedTestimonials, { section: props.section });
  }
  if (style === STYLE_PORTRAIT_TESTIMONIALS) {
    return /* @__PURE__ */ import_react10.default.createElement(PortraitTestimonials, { section: props.section });
  }
  if (style === STYLE_APPLE_MARQUEE) {
    return /* @__PURE__ */ import_react10.default.createElement(AppleMessageMarquee, { ...props });
  }
  return /* @__PURE__ */ import_react10.default.createElement(MessageBubbleMarquee, { ...props });
}

// src/components/ProductMarqueeSection/ProductMarquee.tsx
var import_react11 = __toESM(require("react"));
function rotate(items, by) {
  if (items.length === 0) return [];
  const n = (by % items.length + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}
function distributeRows(items) {
  const row1 = items;
  const row2 = rotate(items, 2);
  const row3 = rotate(items, 1).reverse();
  return { row1, row2, row3 };
}
function safeText4(v) {
  return String(v != null ? v : "").trim();
}
function ProductPill({ item }) {
  const title = safeText4(item == null ? void 0 : item.title);
  const subtitle = safeText4(item == null ? void 0 : item.subtitle);
  const image = safeText4(item == null ? void 0 : item.image);
  return /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__pill" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__pill-imgWrap", "aria-hidden": !image }, image ? /* @__PURE__ */ import_react11.default.createElement(
    "img",
    {
      className: "ak-pm__pill-img",
      src: image,
      alt: title,
      loading: "lazy"
    }
  ) : /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__pill-img ak-pm__pill-img--fallback", "aria-hidden": true })), /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__pill-text" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "ak-pm__pill-title" }, title || /* @__PURE__ */ import_react11.default.createElement("span", { className: "ak-pm__placeholder" }, "Title")), /* @__PURE__ */ import_react11.default.createElement("span", { className: "ak-pm__pill-subtitle" }, subtitle || /* @__PURE__ */ import_react11.default.createElement("span", { className: "ak-pm__placeholder" }, "Subtitle"))));
}
function MarqueeRow({
  items,
  reverse = false,
  durationSec = 34,
  reduceMotion
}) {
  const loopItems = items.length > 0 ? [...items, ...items] : [];
  const animClass = reverse ? "ak-pm__track--rev" : "ak-pm__track";
  if (reduceMotion) {
    return /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__row" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__track ak-pm__track--static" }, items.map((item, index) => /* @__PURE__ */ import_react11.default.createElement(ProductPill, { key: `${safeText4(item.title)}-${index}`, item }))));
  }
  return /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__row" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: animClass, style: { animationDuration: `${durationSec}s` } }, loopItems.map((item, index) => /* @__PURE__ */ import_react11.default.createElement(ProductPill, { key: `${safeText4(item.title)}-${index}`, item }))));
}
function ProductMarquee({ section }) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const eyebrow = safeText4(props.eyebrow);
  const heading = safeText4(props.heading);
  const description = safeText4(props.description);
  const showButton = props.showButton !== false;
  const buttonText = safeText4(props.buttonText);
  const buttonLink = safeText4(props.buttonLink);
  const items = (0, import_react11.useMemo)(() => {
    var _a2;
    const blocks = (_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks;
    if (!Array.isArray(blocks)) return [];
    return blocks.filter((b) => b && typeof b === "object").map((b) => (b == null ? void 0 : b.props) && typeof b.props === "object" ? b.props : {});
  }, [(_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks]);
  const hasContent = items.some(
    (it) => safeText4(it.title) || safeText4(it.subtitle) || safeText4(it.image)
  );
  const { row1, row2, row3 } = (0, import_react11.useMemo)(() => distributeRows(items), [items]);
  return /* @__PURE__ */ import_react11.default.createElement("section", { className: "ak-pm", "aria-label": heading || "Products" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__bg", "aria-hidden": true }), /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__glow", "aria-hidden": true }), /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__container" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__header" }, eyebrow ? /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__eyebrow" }, eyebrow) : null, /* @__PURE__ */ import_react11.default.createElement("h2", { className: "ak-pm__heading" }, heading || "Explore handpicked products."), description ? /* @__PURE__ */ import_react11.default.createElement("p", { className: "ak-pm__desc" }, description) : null), /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__rows" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__fade ak-pm__fade--l", "aria-hidden": true }), /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__fade ak-pm__fade--r", "aria-hidden": true }), !hasContent ? /* @__PURE__ */ import_react11.default.createElement("p", { className: "ak-pm__empty" }, "No items yet.") : /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null, /* @__PURE__ */ import_react11.default.createElement(MarqueeRow, { items: row1, durationSec: 34, reduceMotion }), /* @__PURE__ */ import_react11.default.createElement(
    MarqueeRow,
    {
      items: row2,
      reverse: true,
      durationSec: 38,
      reduceMotion
    }
  ), /* @__PURE__ */ import_react11.default.createElement(MarqueeRow, { items: row3, durationSec: 36, reduceMotion }))), showButton ? /* @__PURE__ */ import_react11.default.createElement("div", { className: "ak-pm__cta" }, buttonLink ? /* @__PURE__ */ import_react11.default.createElement("a", { className: "ak-pm__btn", href: buttonLink }, buttonText || "Buy Now", " ", /* @__PURE__ */ import_react11.default.createElement("span", { "aria-hidden": true }, "\u2192")) : /* @__PURE__ */ import_react11.default.createElement("button", { className: "ak-pm__btn", type: "button" }, buttonText || "Buy Now", " ", /* @__PURE__ */ import_react11.default.createElement("span", { "aria-hidden": true }, "\u2192"))) : null));
}

// src/components/ProductMarqueeSection/ProductCardMarquee.tsx
var import_react12 = __toESM(require("react"));
function rotate2(items, by) {
  if (items.length === 0) return [];
  const n = (by % items.length + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}
function distributeRows2(items) {
  const row1 = items;
  const row2 = rotate2(items, 2);
  const row3 = rotate2(items, 1).reverse();
  return { row1, row2, row3 };
}
function safeText5(v) {
  return String(v != null ? v : "").trim();
}
function ProductCard({ item }) {
  const title = safeText5(item == null ? void 0 : item.title);
  const subtitle = safeText5(item == null ? void 0 : item.subtitle);
  const image = safeText5(item == null ? void 0 : item.image);
  return /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__card" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__imgWrap", "aria-hidden": !image }, image ? /* @__PURE__ */ import_react12.default.createElement("img", { className: "ak-pmc__img", src: image, alt: title, loading: "lazy" }) : /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__img ak-pmc__img--fallback", "aria-hidden": true })), /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__meta" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__title" }, title || /* @__PURE__ */ import_react12.default.createElement("span", { className: "ak-pmc__placeholder" }, "Title")), /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__subtitle" }, subtitle || /* @__PURE__ */ import_react12.default.createElement("span", { className: "ak-pmc__placeholder" }, "Subtitle"))));
}
function MarqueeRow2({
  items,
  reverse = false,
  durationSec = 34,
  reduceMotion
}) {
  const loopItems = items.length > 0 ? [...items, ...items] : [];
  const animClass = reverse ? "ak-pmc__track--rev" : "ak-pmc__track";
  if (reduceMotion) {
    return /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__row" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__track ak-pmc__track--static" }, items.map((item, index) => /* @__PURE__ */ import_react12.default.createElement(ProductCard, { key: `${safeText5(item.title)}-${index}`, item }))));
  }
  return /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__row" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: animClass, style: { animationDuration: `${durationSec}s` } }, loopItems.map((item, index) => /* @__PURE__ */ import_react12.default.createElement(ProductCard, { key: `${safeText5(item.title)}-${index}`, item }))));
}
function ProductCardMarquee({ section }) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const eyebrow = safeText5(props.eyebrow) || "Bestsellers";
  const heading = safeText5(props.heading) || "Browse products the way modern commerce feels effortless.";
  const description = safeText5(props.description) || "A quicker-commerce inspired layout with the name neatly placed below the square image and one clean section action.";
  const showButton = props.showButton !== false;
  const buttonText = safeText5(props.buttonText) || "Buy Now";
  const buttonLink = safeText5(props.buttonLink);
  const items = (0, import_react12.useMemo)(() => {
    var _a2;
    const blocks = (_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks;
    if (!Array.isArray(blocks)) return [];
    return blocks.filter((b) => b && typeof b === "object").map((b) => (b == null ? void 0 : b.props) && typeof b.props === "object" ? b.props : {});
  }, [(_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks]);
  const hasContent = items.some(
    (it) => safeText5(it.title) || safeText5(it.subtitle) || safeText5(it.image)
  );
  const { row1, row2, row3 } = (0, import_react12.useMemo)(() => distributeRows2(items), [items]);
  return /* @__PURE__ */ import_react12.default.createElement("section", { className: "ak-pmc", "aria-label": heading }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__bg", "aria-hidden": true }), /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__glow", "aria-hidden": true }), /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__container" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__header" }, eyebrow ? /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__eyebrow" }, eyebrow) : null, /* @__PURE__ */ import_react12.default.createElement("h2", { className: "ak-pmc__heading" }, heading), description ? /* @__PURE__ */ import_react12.default.createElement("p", { className: "ak-pmc__desc" }, description) : null), /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__rows" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__fade ak-pmc__fade--l", "aria-hidden": true }), /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__fade ak-pmc__fade--r", "aria-hidden": true }), !hasContent ? /* @__PURE__ */ import_react12.default.createElement("p", { className: "ak-pmc__empty" }, "No items yet.") : /* @__PURE__ */ import_react12.default.createElement(import_react12.default.Fragment, null, /* @__PURE__ */ import_react12.default.createElement(MarqueeRow2, { items: row1, durationSec: 34, reduceMotion }), /* @__PURE__ */ import_react12.default.createElement(
    MarqueeRow2,
    {
      items: row2,
      reverse: true,
      durationSec: 38,
      reduceMotion
    }
  ), /* @__PURE__ */ import_react12.default.createElement(MarqueeRow2, { items: row3, durationSec: 36, reduceMotion }))), showButton ? /* @__PURE__ */ import_react12.default.createElement("div", { className: "ak-pmc__cta" }, buttonLink ? /* @__PURE__ */ import_react12.default.createElement("a", { className: "ak-pmc__btn", href: buttonLink }, buttonText, " ", /* @__PURE__ */ import_react12.default.createElement("span", { "aria-hidden": true }, "\u2192")) : /* @__PURE__ */ import_react12.default.createElement("button", { className: "ak-pmc__btn", type: "button" }, buttonText, " ", /* @__PURE__ */ import_react12.default.createElement("span", { "aria-hidden": true }, "\u2192"))) : null));
}

// src/components/ProductMarqueeSection/CreativeCategoryMarquee.tsx
var import_react13 = __toESM(require("react"));
function rotate3(items, by) {
  if (items.length === 0) return [];
  const n = (by % items.length + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}
function safeText6(v) {
  return String(v != null ? v : "").trim();
}
function distributeTwoRows(items) {
  const row1 = items;
  const row2 = rotate3(items, 3);
  return { row1, row2 };
}
function CategoryCard({ item }) {
  const name = safeText6(item == null ? void 0 : item.title);
  const image = safeText6(item == null ? void 0 : item.image);
  return /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__card" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__imgOuter" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__imgInner", "aria-hidden": !image }, image ? /* @__PURE__ */ import_react13.default.createElement("img", { className: "ak-ccm__img", src: image, alt: name, loading: "lazy" }) : /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__img ak-ccm__img--fallback", "aria-hidden": true }), /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__imgOverlay", "aria-hidden": true }))), /* @__PURE__ */ import_react13.default.createElement("p", { className: "ak-ccm__name" }, name || /* @__PURE__ */ import_react13.default.createElement("span", { className: "ak-ccm__placeholder" }, "Category")));
}
function Row({
  items,
  reverse = false,
  durationSec = 30,
  reduceMotion
}) {
  const loop = items.length > 0 ? [...items, ...items, ...items] : [];
  if (reduceMotion) {
    return /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__row" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__track ak-ccm__track--static" }, items.map((item, i) => /* @__PURE__ */ import_react13.default.createElement(CategoryCard, { key: `${safeText6(item.title)}-${i}`, item }))));
  }
  return /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__row" }, /* @__PURE__ */ import_react13.default.createElement(
    "div",
    {
      className: reverse ? "ak-ccm__track--rev" : "ak-ccm__track",
      style: { animationDuration: `${durationSec}s` }
    },
    loop.map((item, i) => /* @__PURE__ */ import_react13.default.createElement(CategoryCard, { key: `${safeText6(item.title)}-${i}`, item }))
  ));
}
function CreativeCategoryMarquee({ section }) {
  var _a, _b, _c;
  const reduceMotion = usePrefersReducedMotion();
  const props = (_b = (_a = section == null ? void 0 : section.settings) == null ? void 0 : _a.props) != null ? _b : {};
  const heading = safeText6(props.heading) || "Explore by Category";
  const description = safeText6(props.description) || "Smooth, scrollable categories designed for quick discovery.";
  const items = (0, import_react13.useMemo)(() => {
    var _a2;
    const blocks = (_a2 = section == null ? void 0 : section.settings) == null ? void 0 : _a2.blocks;
    if (!Array.isArray(blocks)) return [];
    return blocks.filter((b) => b && typeof b === "object").map((b) => (b == null ? void 0 : b.props) && typeof b.props === "object" ? b.props : {});
  }, [(_c = section == null ? void 0 : section.settings) == null ? void 0 : _c.blocks]);
  const hasContent = items.some((it) => safeText6(it.title) || safeText6(it.image));
  const { row1, row2 } = (0, import_react13.useMemo)(() => distributeTwoRows(items), [items]);
  return /* @__PURE__ */ import_react13.default.createElement("section", { className: "ak-ccm", "aria-label": heading }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__container" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__header" }, /* @__PURE__ */ import_react13.default.createElement("h2", { className: "ak-ccm__heading" }, heading), /* @__PURE__ */ import_react13.default.createElement("p", { className: "ak-ccm__desc" }, description)), /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__rows" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__fade ak-ccm__fade--l", "aria-hidden": true }), /* @__PURE__ */ import_react13.default.createElement("div", { className: "ak-ccm__fade ak-ccm__fade--r", "aria-hidden": true }), !hasContent ? /* @__PURE__ */ import_react13.default.createElement("p", { className: "ak-ccm__empty" }, "No categories yet.") : /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement(Row, { items: row1, durationSec: 30, reduceMotion }), /* @__PURE__ */ import_react13.default.createElement(Row, { items: row2, reverse: true, durationSec: 34, reduceMotion })))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreativeCategoryMarquee,
  HeroScrollableSlide,
  HeroSlider,
  LogoFocusedHeader,
  MessageStyleTestimonials,
  PortraitTestimonials,
  ProductCardMarquee,
  ProductMarquee,
  STYLE_APPLE_MARQUEE,
  STYLE_MESSAGE_BUBBLE,
  STYLE_PORTRAIT_TESTIMONIALS,
  STYLE_STACKED_TESTIMONIALS,
  StackedTestimonials,
  TransparentHeroHeader,
  normalizeImageUrl
});
//# sourceMappingURL=index.js.map