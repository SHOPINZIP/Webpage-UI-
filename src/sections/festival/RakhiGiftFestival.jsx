import React, { useEffect, useMemo, useState } from "react";

import { resolveBlockImageUrl } from "../../components/HeroSection/heroSectionUtils";
import { resolveStorefrontFontFamily } from "../../shared/fonts/fontRegistry";
import {
  resolveThemeFontKey,
  resolveTextStyle,
  resolveBlockGroupTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";

/* ══════════════════════════════════════════════════════════════
   RakhiGiftFestival — colorful festival landing section.
   Fully prop-driven. All visual colors come from section props with
   safe fallbacks from the reference design. Typography uses the global
   storefront theme font family. Petals are deterministic (no Math.random
   at render) to avoid hydration mismatch. Flip state is component-local
   only and never persisted. Styles live in RakhiGiftFestival.scss.
════════════════════════════════════════════════════════════════ */

const CARD_BLOCK_TYPE = "festival_card";
const PETAL_BLOCK_TYPE = "festival_petal";

/**
 * Non-text (design) color fallbacks — aligned with the areakart-frontend
 * `designPropFields` defaults. Text colors are handled by the global text-style
 * system (per-field "Aa" and card block-group styles), not this map.
 */
const COLOR_FALLBACKS = {
  sectionBackgroundColor: "#0D0805",
  eyebrowLineColor: "#FFB347",
  dividerColor: "#FFB347",
  dividerAccentColor: "#FF6B35",
  glowBlobOneColor: "rgba(255,100,50,.14)",
  glowBlobTwoColor: "rgba(200,0,30,.12)",
  glowBlobThreeColor: "rgba(255,215,0,.07)",
  petalColorOne: "#FF6B35",
  petalColorTwo: "#FFD700",
  petalColorThree: "#FF4757",
  petalColorFour: "#FFB347",
  petalColorFive: "#FF69B4",
  petalColorSix: "#E8501A",
  primaryButtonGradientStart: "#FF6B35",
  primaryButtonGradientEnd: "#C8001E",
  primaryButtonTextColor: "#FFF8E7",
  secondaryButtonBorderColor: "#FFB347",
  secondaryButtonTextColor: "#FFB347",
  secondaryButtonHoverBgColor: "rgba(255,179,71,.09)",
  cardBackgroundColor: "rgba(255,248,220,.03)",
  cardImageBackgroundColor: "#0D0805",
  cardBorderFallbackColor: "#FF6B35",
  cardHoverOverlayColor: "rgba(255,180,60,.07)",
  footerBorderColor: "rgba(255,179,71,.06)",
  footerIconColor: "#FFB347",
};

/** Text-style defaults — must mirror schema `defaultTextStyle` / `blockStyleGroups`. */
const TEXT_DEFAULTS = {
  festivalLabel: { color: "#C09060", fontWeight: "400" },
  heroTitleLineOne: { color: "#FFD700", fontWeight: "700" },
  heroTitleLineTwo: { color: "#FFF8E7", fontWeight: "700" },
  heroSubtitle: { color: "#8A6A48", fontWeight: "300" },
  quoteText: { color: "#8A6A48", fontWeight: "400" },
  quoteSubText: { color: "#3C2818", fontWeight: "400" },
  collectionLabel: { color: "#FF6B35", fontWeight: "800" },
  collectionHeadingLineOne: { color: "#FFF8E7", fontWeight: "700" },
  collectionHeadingLineTwo: { color: "#FFB347", fontWeight: "700" },
  collectionHintText: { color: "#5A4030", fontWeight: "700" },
  footerText: { color: "#2E1A0A", fontWeight: "400" },
};

const CARD_TEXT_DEFAULTS = {
  festivalCardTitle: { color: "#FFF8E7", fontWeight: "700" },
  festivalCardSubtitle: { color: "#8A6A50", fontWeight: "600" },
  festivalCardDescription: { color: "#C4A882", fontWeight: "400" },
  festivalCardPrice: { color: "#FFD700", fontWeight: "700" },
};

const CONTENT_FALLBACKS = {
  festivalLabel: "Raksha Bandhan 2025",
  heroTitleLineOne: "Pyaar Ka",
  heroTitleLineTwo: "Dhaga",
  heroSubtitle: "The thread that binds hearts across any distance",
  primaryButtonText: "🛍 Shop Rakhi Gifts",
  secondaryButtonText: "✉ Send a Rakhi Abroad",
  quoteText: "Ek dhage mein bandha, yeh rishta anmol hai",
  quoteSubText: "One thread · Infinite love",
  collectionLabel: "Curated Collection",
  collectionHeadingLineOne: "Gifts as Sacred",
  collectionHeadingLineTwo: "as Your Bond",
  collectionHintText: "TAP ANY CARD TO DISCOVER MORE →",
  footerText: "Wishing every bond strength & joy this Raksha Bandhan.",
};

/* Deterministic petal layout seeds (position/timing). Colors are applied from
   the six editable petal color props, cycled by index. No Math.random. */
const PETAL_SEEDS = [
  { l: 7, d: 0, dur: 9, s: 13, r: 20 }, { l: 17, d: 2.4, dur: 7, s: 10, r: 140 },
  { l: 29, d: 5.1, dur: 11, s: 17, r: 70 }, { l: 43, d: 1, dur: 8, s: 11, r: 210 },
  { l: 54, d: 3.5, dur: 10, s: 15, r: 300 }, { l: 64, d: 0.6, dur: 7.5, s: 10, r: 50 },
  { l: 74, d: 4, dur: 9, s: 14, r: 180 }, { l: 84, d: 2, dur: 8.5, s: 12, r: 90 },
  { l: 91, d: 6, dur: 11, s: 9, r: 330 }, { l: 13, d: 7, dur: 8, s: 16, r: 260 },
  { l: 47, d: 4.5, dur: 12, s: 9, r: 100 }, { l: 23, d: 1.5, dur: 9.5, s: 12, r: 200 },
  { l: 61, d: 3, dur: 7, s: 14, r: 15 }, { l: 37, d: 6.5, dur: 10, s: 10, r: 280 },
  { l: 79, d: 0.9, dur: 8, s: 13, r: 135 }, { l: 5, d: 5.5, dur: 9, s: 11, r: 320 },
  { l: 89, d: 2.8, dur: 11, s: 9, r: 60 }, { l: 51, d: 7.5, dur: 8, s: 15, r: 240 },
  { l: 69, d: 1.2, dur: 10, s: 12, r: 170 }, { l: 26, d: 4.8, dur: 7.5, s: 10, r: 350 },
];

function safeText(value) {
  return String(value ?? "").trim();
}

function safeUrl(value) {
  return String(value ?? "").trim();
}

/* ═══════════ ILLUSTRATIONS — internal SVG scenes ═══════════ */

const IllRakhi = () => (
  <svg viewBox="0 0 300 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
    <rect width="300" height="300" fill="#100904" />
    <ellipse cx="150" cy="198" rx="90" ry="10" fill="#000" opacity="0.55" />
    <path d="M0 100 C55 92 105 95 142 104" fill="none" stroke="#8B001A" strokeWidth="6" strokeLinecap="round" />
    <path d="M0 106 C55 98 105 101 142 110" fill="none" stroke="#C8960C" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    <path d="M300 100 C245 92 195 95 158 104" fill="none" stroke="#8B001A" strokeWidth="6" strokeLinecap="round" />
    <path d="M300 106 C245 98 195 101 158 110" fill="none" stroke="#C8960C" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    {[[22, 102], [52, 97], [82, 95], [112, 98]].map(([x, y], i) => (
      <g key={i}><circle cx={x} cy={y} r="5.5" fill={i % 2 === 0 ? "#FFD700" : "#D4145A"} stroke="#7A3B00" strokeWidth="0.8" /><circle cx={x - 1.5} cy={y - 1.5} r="1.5" fill="#fff" opacity="0.4" /></g>
    ))}
    {[[278, 102], [248, 97], [218, 95], [188, 98]].map(([x, y], i) => (
      <g key={i}><circle cx={x} cy={y} r="5.5" fill={i % 2 === 0 ? "#FFD700" : "#D4145A"} stroke="#7A3B00" strokeWidth="0.8" /><circle cx={x - 1.5} cy={y - 1.5} r="1.5" fill="#fff" opacity="0.4" /></g>
    ))}
    {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2, px = 150 + 60 * Math.cos(a), py = 107 + 60 * Math.sin(a); return <ellipse key={i} cx={px} cy={py} rx="5.5" ry="8.5" fill={i % 2 === 0 ? "#FFD700" : "#FF6B35"} opacity="0.92" transform={`rotate(${i * 30},${px},${py})`} />; })}
    <circle cx="150" cy="107" r="52" fill="#1A0C04" stroke="#C8960C" strokeWidth="2.5" />
    {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2, px = 150 + 33 * Math.cos(a), py = 107 + 33 * Math.sin(a); return <ellipse key={i} cx={px} cy={py} rx="8" ry="13" fill={i % 2 === 0 ? "#FF6B35" : "#C8001E"} opacity="0.88" transform={`rotate(${i * 45 + 90},${px},${py})`} />; })}
    {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2 + Math.PI / 8, px = 150 + 19 * Math.cos(a), py = 107 + 19 * Math.sin(a); return <ellipse key={i} cx={px} cy={py} rx="4.5" ry="8" fill={i % 2 === 0 ? "#FFD700" : "#FFB347"} opacity="0.82" transform={`rotate(${i * 45 + 90},${px},${py})`} />; })}
    <circle cx="150" cy="107" r="13" fill="#1A0C04" stroke="#FFD700" strokeWidth="1.5" />
    <circle cx="150" cy="107" r="9" fill="#6A1B9A" />
    <circle cx="150" cy="107" r="5.5" fill="#C8001E" />
    <circle cx="150" cy="107" r="2.5" fill="#FFD700" />
    <circle cx="148" cy="105" r="1.3" fill="#fff" opacity="0.65" />
  </svg>
);

const IllMithai = () => (
  <svg viewBox="0 0 300 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
    <rect width="300" height="300" fill="#110509" />
    <ellipse cx="150" cy="208" rx="95" ry="8" fill="#000" opacity="0.6" />
    <rect x="28" y="110" width="244" height="90" rx="10" fill="#4A1E08" stroke="#7A3B10" strokeWidth="1.2" />
    <rect x="28" y="38" width="244" height="84" rx="10" fill="#5C2A0C" stroke="#7A3B10" strokeWidth="1.2" transform="rotate(-12,28,38)" />
    <rect x="32" y="114" width="236" height="82" rx="8" fill="#2A0808" />
    {[[65, 140], [110, 140], [155, 140], [200, 140], [245, 140], [87, 165], [132, 165], [177, 165], [222, 165]].map(([x, y], i) => (
      <g key={i}>
        <polygon points={`${x},${y - 13} ${x + 18},${y} ${x},${y + 13} ${x - 18},${y}`} fill={["#EDD9A3", "#F5E6C8", "#E8D090", "#F0E0B0"][i % 4]} />
        <polygon points={`${x},${y - 13} ${x + 18},${y} ${x},${y + 13} ${x - 18},${y}`} fill="none" stroke="#B8860B" strokeWidth="0.8" opacity="0.5" />
      </g>
    ))}
    {[[42, 148], [258, 148], [42, 182], [258, 182]].map(([x, y], i) => (
      <g key={i}><circle cx={x} cy={y} r="11" fill={["#FF8C00", "#FFA500", "#FF7F00", "#FFB347"][i]} /><circle cx={x - 3} cy={y - 3} r="4" fill="#FFC56B" opacity="0.4" /></g>
    ))}
    <circle cx="150" cy="110" r="6" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
    <rect x="92" y="52" width="96" height="26" rx="4" fill="#FFD700" transform="rotate(-12,92,52)" />
    <text x="140" y="70" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3A1500" fontFamily="sans-serif" transform="rotate(-12,140,70)">PREMIUM MITHAI</text>
  </svg>
);

const IllPuja = () => (
  <svg viewBox="0 0 300 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
    <rect width="300" height="300" fill="#08060F" />
    <ellipse cx="150" cy="208" rx="95" ry="7" fill="#000" opacity="0.65" />
    <ellipse cx="150" cy="171" rx="112" ry="19" fill="#B8960C" stroke="#FFD700" strokeWidth="1" />
    <ellipse cx="150" cy="167" rx="108" ry="16" fill="#120F22" />
    <path d="M126 167 Q123 153 127 143 Q135 129 150 124 Q165 129 173 143 Q177 153 174 167Z" fill="#C87210" />
    <ellipse cx="150" cy="167" rx="24" ry="8" fill="#D4890C" />
    <path d="M143 143 Q140 131 143 119 Q146 108 150 96 Q154 108 157 119 Q160 131 157 143Z" fill="#FF8C00" opacity="0.92" />
    <path d="M146 141 Q143 130 146 119 Q148 111 150 101 Q152 111 154 119 Q157 130 154 141Z" fill="#FFD700" />
    <path d="M148 139 Q147 128 149 118 Q149.5 112 150 104 Q150.5 112 151 118 Q153 128 152 139Z" fill="#fff" opacity="0.85" />
    {[[-88, 167], [-62, 160], [62, 160], [88, 167]].map(([x, y], i) => (
      <g key={i}><circle cx={150 + x} cy={y} r="7" fill={["#FF69B4", "#FFD700", "#FF6B35", "#FF69B4"][i]} opacity="0.65" /><circle cx={150 + x} cy={y} r="2.5" fill="#fff" opacity="0.5" /></g>
    ))}
    <circle cx="150" cy="167" r="5" fill="#C8001E" opacity="0.6" />
  </svg>
);

const IllSilver = () => (
  <svg viewBox="0 0 300 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
    <rect width="300" height="300" fill="#060A0E" />
    <ellipse cx="150" cy="202" rx="88" ry="8" fill="#000" opacity="0.6" />
    <path d="M0 105 C55 97 105 100 142 108" fill="none" stroke="#78909C" strokeWidth="5.5" strokeLinecap="round" />
    <path d="M300 105 C245 97 195 100 158 108" fill="none" stroke="#78909C" strokeWidth="5.5" strokeLinecap="round" />
    {[[22, 106], [52, 101], [82, 99], [112, 102]].map(([x, y], i) => (
      <g key={i}><circle cx={x} cy={y} r="5.5" fill={i % 2 === 0 ? "#E0E0E0" : "#B0BEC5"} stroke="#90A4AE" strokeWidth="0.8" /><circle cx={x - 1.5} cy={y - 1.5} r="1.8" fill="#fff" opacity="0.6" /></g>
    ))}
    {[[278, 106], [248, 101], [218, 99], [188, 102]].map(([x, y], i) => (
      <g key={i}><circle cx={x} cy={y} r="5.5" fill={i % 2 === 0 ? "#E0E0E0" : "#B0BEC5"} stroke="#90A4AE" strokeWidth="0.8" /><circle cx={x - 1.5} cy={y - 1.5} r="1.8" fill="#fff" opacity="0.6" /></g>
    ))}
    {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2, px = 150 + 60 * Math.cos(a), py = 107 + 60 * Math.sin(a); return <ellipse key={i} cx={px} cy={py} rx="5" ry="8" fill={i % 2 === 0 ? "#E0E0E0" : "#90A4AE"} opacity="0.88" transform={`rotate(${i * 30},${px},${py})`} />; })}
    <circle cx="150" cy="107" r="52" fill="#0D1217" stroke="#78909C" strokeWidth="2.5" />
    {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2, px = 150 + 32 * Math.cos(a), py = 107 + 32 * Math.sin(a); return <ellipse key={i} cx={px} cy={py} rx="7.5" ry="13" fill={i % 2 === 0 ? "#B0BEC5" : "#78909C"} opacity="0.85" transform={`rotate(${i * 45 + 90},${px},${py})`} />; })}
    {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2 + Math.PI / 8, px = 150 + 18 * Math.cos(a), py = 107 + 18 * Math.sin(a); return <ellipse key={i} cx={px} cy={py} rx="4" ry="7.5" fill={i % 2 === 0 ? "#CFD8DC" : "#B0BEC5"} opacity="0.8" transform={`rotate(${i * 45 + 90},${px},${py})`} />; })}
    <circle cx="150" cy="107" r="13" fill="#0D1217" stroke="#CFD8DC" strokeWidth="1.5" />
    <circle cx="150" cy="107" r="9" fill="#263238" />
    <circle cx="150" cy="107" r="5.5" fill="#78909C" />
    <circle cx="150" cy="107" r="3" fill="#CFD8DC" />
    <circle cx="148" cy="105" r="1.8" fill="#fff" opacity="0.7" />
  </svg>
);

const IllHamper = () => (
  <svg viewBox="0 0 300 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
    <rect width="300" height="300" fill="#080D05" />
    <ellipse cx="150" cy="208" rx="95" ry="8" fill="#000" opacity="0.6" />
    <rect x="30" y="130" width="240" height="75" rx="14" fill="#4A2E0A" />
    {Array.from({ length: 5 }).map((_, i) => <rect key={i} x="30" y={130 + i * 15} width="240" height="8" rx="3" fill="#5C3A12" opacity="0.55" />)}
    {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={30 + i * 28} y1="130" x2={30 + i * 28} y2="205" stroke="#7A4E20" strokeWidth="1" opacity="0.4" />)}
    <rect x="25" y="124" width="250" height="14" rx="7" fill="#7A4E20" stroke="#C8960C" strokeWidth="1" />
    <rect x="45" y="82" width="60" height="48" rx="7" fill="#7B2D8B" />
    <rect x="45" y="82" width="60" height="14" rx="7" fill="#9C27B0" />
    <text x="75" y="113" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFD700" fontFamily="sans-serif">RAKHI SET</text>
    <rect x="115" y="78" width="70" height="52" rx="7" fill="#8B3A00" />
    <rect x="115" y="78" width="70" height="14" rx="7" fill="#A34500" />
    <text x="150" y="109" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFD700" fontFamily="sans-serif">DRY FRUITS</text>
    <rect x="195" y="82" width="68" height="48" rx="7" fill="#C8001E" />
    <rect x="195" y="82" width="68" height="14" rx="7" fill="#E8001E" />
    <text x="229" y="113" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFD700" fontFamily="sans-serif">MITHAI BOX</text>
    <circle cx="150" cy="124" r="7" fill="#FFD700" stroke="#B8860B" strokeWidth="1.2" />
    <rect x="155" y="74" width="58" height="24" rx="3" fill="#FFD700" />
    <text x="184" y="90" textAnchor="middle" fontSize="8" fill="#3A1500" fontFamily="sans-serif" fontWeight="700">PREMIUM</text>
  </svg>
);

const IllFloral = () => (
  <svg viewBox="0 0 300 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
    <rect width="300" height="300" fill="#100614" />
    <ellipse cx="150" cy="206" rx="90" ry="8" fill="#000" opacity="0.6" />
    <rect x="45" y="120" width="210" height="80" rx="10" fill="#1A0A28" stroke="#9C27B0" strokeWidth="1.2" />
    <rect x="45" y="120" width="210" height="20" rx="10" fill="#7B1FA2" opacity="0.6" />
    {[[80, 115], [120, 108], [150, 105], [180, 108], [220, 115]].map(([x, y], i) => {
      const cols = ["#FF69B4", "#FFD700", "#FF6B35", "#FF69B4", "#FFD700"];
      return <g key={i}>
        {Array.from({ length: 5 }).map((_, j) => { const a = (j / 5) * Math.PI * 2; return <ellipse key={j} cx={x + 9 * Math.cos(a)} cy={y + 7 * Math.sin(a)} rx="7" ry="5" fill={cols[i]} opacity="0.8" transform={`rotate(${j * 72},${x + 9 * Math.cos(a)},${y + 7 * Math.sin(a)})`} />; })}
        <circle cx={x} cy={y} r="5" fill={i % 2 === 0 ? "#FFD700" : "#FF6B35"} />
      </g>;
    })}
    <line x1="150" y1="120" x2="150" y2="200" stroke="#E91E63" strokeWidth="4" opacity="0.7" />
    <line x1="45" y1="160" x2="255" y2="160" stroke="#E91E63" strokeWidth="4" opacity="0.7" />
    <circle cx="150" cy="120" r="9" fill="#FFD700" stroke="#FF8F00" strokeWidth="1.5" />
    <text x="150" y="147" textAnchor="middle" fontSize="11" fontWeight="700" fill="#E1BEE7" fontFamily="serif" fontStyle="italic">With Love</text>
    <text x="150" y="165" textAnchor="middle" fontSize="9" fill="#CE93D8" fontFamily="sans-serif" letterSpacing="2">RAKSHA BANDHAN</text>
  </svg>
);

const ILLUSTRATIONS = {
  rakhi: IllRakhi,
  mithai: IllMithai,
  puja: IllPuja,
  silver: IllSilver,
  hamper: IllHamper,
  floral: IllFloral,
};

function CardIllustration({ type, image, title }) {
  // `image` is already resolved to a usable URL by readCardBlock.
  const src = safeUrl(image);
  if (type === "customImage" && src) {
    return (
      <img
        src={src}
        alt={title || "Festival product"}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  const Ill = ILLUSTRATIONS[type] || IllRakhi;
  return <Ill />;
}

/* ═══════════ DIYA ═══════════ */
const Diya = () => (
  <svg viewBox="0 0 48 66" width="40" height="55">
    <ellipse cx="24" cy="57" rx="16" ry="5" fill="#C8001E" opacity="0.2" />
    <path d="M18 52 Q15 49 14 42 Q12 34 18 28 Q21 24 24 18 Q27 24 30 28 Q36 34 34 42 Q33 49 30 52 Q27 54 24 54 Q21 54 18 52Z" fill="#FF8C00" />
    <path d="M20 50 Q18 46 17 40 Q16 33 21 27 Q22.5 24 24 19 Q25.5 24 27 27 Q32 33 31 40 Q30 46 28 50 Q26.5 52 24 52 Q21.5 52 20 50Z" fill="#FFD700" />
    <path d="M22 48 Q21 43 20 37 Q19 31 23 26 Q23.5 24 24 20 Q24.5 24 25 26 Q29 31 28 37 Q27 43 26 48 Q25.2 50 24 50 Q22.8 50 22 48Z" fill="#fff" opacity="0.85" />
    <ellipse cx="24" cy="53" rx="11" ry="4" fill="#FF8C00" />
    <ellipse cx="24" cy="53" rx="7.5" ry="2.8" fill="#E65100" />
    <ellipse cx="24" cy="54" rx="3.5" ry="1.6" fill="#1A0800" />
    <line x1="24" y1="52" x2="24" y2="56" stroke="#555" strokeWidth="1.2" />
  </svg>
);

function paddingClass(padding) {
  const v = safeText(padding).toLowerCase();
  if (v === "small") return "akf-festival--pad-sm";
  if (v === "medium") return "akf-festival--pad-md";
  return "akf-festival--pad-lg";
}

/* Reads a card block (one product) honoring nested `props` shape from saved data. */
function readCardBlock(block, index) {
  const nested = block && typeof block.props === "object" && block.props ? block.props : {};
  const f = { ...nested, ...block };
  return {
    key: safeText(block?.id) || `festival-card-${index + 1}`,
    productLink: safeUrl(f.productLink),
    title: safeText(f.frontTitle),
    subtitle: safeText(f.frontSubtitle),
    description: safeText(f.frontDescription),
    tag: safeText(f.frontTag),
    tagBg: safeText(f.frontTagBgColor) || "#FF6B35",
    price: safeText(f.frontPrice),
    accent: safeText(f.frontAccentColor) || "#FF6B35",
    illustration: safeText(f.frontIllustrationType) || "rakhi",
    // Resolve the uploaded value (string URL or common object shapes) so custom
    // images render reliably in preview and on the live storefront.
    image: resolveBlockImageUrl(f.frontImage),
    buttonText: safeText(f.frontButtonText) || "Add to Cart",
  };
}

function readPetalBlock(block, index, palette) {
  const nested = block && typeof block.props === "object" && block.props ? block.props : {};
  const f = { ...nested, ...block };
  const num = (v, fallback) => { const n = Number(v); return Number.isFinite(n) ? n : fallback; };
  return {
    key: safeText(block?.id) || `festival-petal-${index + 1}`,
    l: num(f.leftPosition, 20),
    d: num(f.delay, 0),
    dur: num(f.duration, 9),
    s: num(f.size, 13),
    r: num(f.rotation, 20),
    c: safeText(f.color) || palette[index % palette.length],
  };
}

/* ═══════════ MAIN COMPONENT ═══════════ */
export default function RakhiGiftFestival({ section, theme }) {
  const props = section?.settings?.props || {};
  const rawBlocks = Array.isArray(section?.settings?.blocks) ? section.settings.blocks : [];

  // Global storefront theme fonts (used as the section base; per-element text
  // styles from the "Aa" / block-group controls override where set).
  const bodyFont = resolveStorefrontFontFamily(resolveThemeFontKey("body", theme));

  const color = (key) => {
    const v = safeText(props[key]);
    return v || COLOR_FALLBACKS[key];
  };
  const content = (key) => {
    const v = props[key];
    return v === null || v === undefined ? CONTENT_FALLBACKS[key] : String(v);
  };
  const flag = (key) => props[key] !== false;

  // Resolved text styles pull color/font/weight from the global text-style
  // system (field-level "Aa" edits), falling back to the schema defaults.
  const textStyle = (fieldId, role) => {
    const s = resolvedTextStyleToInlineStyle(
      resolveTextStyle({ section, theme, fieldId, role, defaultStyle: TEXT_DEFAULTS[fieldId] })
    );
    return { fontFamily: s.fontFamily, color: s.color, fontWeight: s.fontWeight };
  };
  const groupStyle = (groupKey, role) => {
    const s = resolvedTextStyleToInlineStyle(
      resolveBlockGroupTextStyle({
        section,
        theme,
        groupKey,
        role,
        defaultStyle: CARD_TEXT_DEFAULTS[groupKey],
      })
    );
    return { fontFamily: s.fontFamily, color: s.color, fontWeight: s.fontWeight };
  };

  const petalPalette = useMemo(
    () => [
      color("petalColorOne"), color("petalColorTwo"), color("petalColorThree"),
      color("petalColorFour"), color("petalColorFive"), color("petalColorSix"),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.petalColorOne, props.petalColorTwo, props.petalColorThree, props.petalColorFour, props.petalColorFive, props.petalColorSix]
  );

  // Each festival_card renders one static product card.
  const cards = useMemo(
    () =>
      rawBlocks
        .filter((b) => b && typeof b === "object" && safeText(b.type) !== PETAL_BLOCK_TYPE)
        .map((b, i) => readCardBlock(b, i)),
    [rawBlocks]
  );

  const petalBlocks = useMemo(
    () => rawBlocks.filter((b) => b && typeof b === "object" && safeText(b.type) === PETAL_BLOCK_TYPE),
    [rawBlocks]
  );

  const petals = useMemo(() => {
    if (petalBlocks.length > 0) {
      return petalBlocks.map((b, i) => readPetalBlock(b, i, petalPalette));
    }
    return PETAL_SEEDS.map((seed, i) => ({
      key: `petal-default-${i}`,
      ...seed,
      c: petalPalette[i % petalPalette.length],
    }));
  }, [petalBlocks, petalPalette]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const cardTitleStyle = groupStyle("festivalCardTitle", "heading");
  const cardSubtitleStyle = groupStyle("festivalCardSubtitle", "body");
  const cardDescriptionStyle = groupStyle("festivalCardDescription", "body");
  const cardPriceStyle = groupStyle("festivalCardPrice", "heading");

  const renderCard = (card) => (
    <div
      className="akf-card"
      key={card.key}
      style={{ background: color("cardBackgroundColor"), border: `1px solid ${card.accent || color("cardBorderFallbackColor")}` }}
    >
      <div className="akf-img-box" style={{ background: color("cardImageBackgroundColor") }}>
        <CardIllustration type={card.illustration} image={card.image} title={card.title} />
        <div
          className="akf-img-hover-overlay"
          style={{ background: `linear-gradient(135deg,${color("cardHoverOverlayColor")} 0%,transparent 60%)` }}
        />
      </div>
      {card.tag ? (
        <div style={{ padding: "14px 18px 0", display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              display: "inline-flex", alignItems: "center", fontSize: 9, fontWeight: 800,
              letterSpacing: "2.5px", padding: "5px 14px", borderRadius: 20, color: "#fff",
              textTransform: "uppercase", background: card.tagBg,
            }}
          >
            {card.tag}
          </span>
        </div>
      ) : null}
      <div style={{ padding: "10px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
        {card.title ? <h3 style={{ ...cardTitleStyle, fontSize: 21, margin: 0 }}>{card.title}</h3> : null}
        {card.subtitle ? <p style={{ ...cardSubtitleStyle, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", margin: "4px 0 0" }}>{card.subtitle}</p> : null}
        {card.description ? <p style={{ ...cardDescriptionStyle, fontSize: 13.5, lineHeight: 1.55, margin: "12px 0 0" }}>{card.description}</p> : null}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: "auto", paddingTop: 16 }}>
          {card.price ? <span style={{ ...cardPriceStyle, fontSize: 28, letterSpacing: "-.5px" }}>{card.price}</span> : <span />}
          {card.productLink ? (
            <a className="akf-add-btn" href={card.productLink} style={{ background: card.accent || color("cardBorderFallbackColor") }}>
              {card.buttonText}
            </a>
          ) : (
            <button type="button" className="akf-add-btn" style={{ background: card.accent || color("cardBorderFallbackColor") }}>
              {card.buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (section?.enabled === false) return null;

  return (
    <section
      className={`akf-festival ${paddingClass(props.sectionPadding)}`}
      data-ak-section="festival"
      style={{ fontFamily: bodyFont, background: color("sectionBackgroundColor") }}
    >
      {/* Glow blobs */}
      {flag("showGlowBlobs") ? (
        <>
          <div style={{ position: "absolute", top: "6%", left: "2%", width: 440, height: 440, borderRadius: "50%", background: `radial-gradient(circle,${color("glowBlobOneColor")} 0%,transparent 68%)`, animation: "akf-glow 4.8s ease-in-out infinite", pointerEvents: "none", zIndex: 1 }} />
          <div style={{ position: "absolute", top: "44%", right: "2%", width: 370, height: 370, borderRadius: "50%", background: `radial-gradient(circle,${color("glowBlobTwoColor")} 0%,transparent 68%)`, animation: "akf-glow 5.8s ease-in-out infinite 1.3s", pointerEvents: "none", zIndex: 1 }} />
          <div style={{ position: "absolute", bottom: "12%", left: "26%", width: 540, height: 290, borderRadius: "50%", background: `radial-gradient(circle,${color("glowBlobThreeColor")} 0%,transparent 68%)`, animation: "akf-glow 7.2s ease-in-out infinite 2.6s", pointerEvents: "none", zIndex: 1 }} />
        </>
      ) : null}

      {/* Petals */}
      {flag("showPetals") ? (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, overflow: "hidden" }}>
          {petals.map((p) => (
            <div
              key={p.key}
              style={{
                position: "absolute", left: `${p.l}%`, top: "-28px", width: p.s, height: p.s * 1.45,
                borderRadius: "50% 50% 50% 0", background: p.c, opacity: 0.7,
                animation: `akf-petal ${p.dur}s ${p.d}s infinite linear`,
                transform: `rotate(${p.r}deg)`, filter: "blur(.4px)",
              }}
            />
          ))}
        </div>
      ) : null}

      {/* HERO */}
      <div
        style={{
          position: "relative", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", textAlign: "center", maxWidth: 1200, margin: "0 auto",
          opacity: mounted ? 1 : 0, animation: mounted ? "akf-fadeUp .95s ease forwards" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 34, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ height: 1, width: 68, background: `linear-gradient(to right,transparent,${color("eyebrowLineColor")})` }} />
          <div className="akf-diya-flame"><Diya /></div>
          <span style={{ ...textStyle("festivalLabel", "body"), fontSize: 13, letterSpacing: 6, textTransform: "uppercase" }}>{content("festivalLabel")}</span>
          <div className="akf-diya-flame"><Diya /></div>
          <div style={{ height: 1, width: 68, background: `linear-gradient(to left,transparent,${color("eyebrowLineColor")})` }} />
        </div>

        <h1 style={{ fontSize: "clamp(54px,9vw,112px)", lineHeight: 0.9, marginBottom: 10, letterSpacing: -2 }}>
          <span style={textStyle("heroTitleLineOne", "heading")}>{content("heroTitleLineOne")}</span>
          <br />
          <span style={{ ...textStyle("heroTitleLineTwo", "heading"), fontStyle: "italic" }}>{content("heroTitleLineTwo")}</span>
        </h1>
        <p style={{ ...textStyle("heroSubtitle", "body"), fontSize: "clamp(16px,2.4vw,24px)", marginBottom: 52, letterSpacing: 1.5 }}>
          {content("heroSubtitle")}
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {content("primaryButtonText") ? (
            <a
              className="akf-cta"
              href={safeUrl(props.primaryButtonLink) || undefined}
              style={{ background: `linear-gradient(135deg,${color("primaryButtonGradientStart")},${color("primaryButtonGradientEnd")})`, color: color("primaryButtonTextColor") }}
            >
              {content("primaryButtonText")}
            </a>
          ) : null}
          {content("secondaryButtonText") ? (
            <a
              className="akf-outline"
              href={safeUrl(props.secondaryButtonLink) || undefined}
              style={{ border: `1px solid ${color("secondaryButtonBorderColor")}`, color: color("secondaryButtonTextColor") }}
            >
              {content("secondaryButtonText")}
            </a>
          ) : null}
        </div>
      </div>

      {/* Divider */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", margin: "40px 0 18px" }}>
        <svg viewBox="0 0 700 40" width="100%" height="40" style={{ maxWidth: 700, margin: "0 auto" }}>
          <line x1="0" y1="20" x2="296" y2="20" stroke={color("dividerColor")} strokeWidth=".5" strokeDasharray="4 7" />
          <polygon points="350,7 366,20 350,33 334,20" fill="none" stroke={color("dividerColor")} strokeWidth="1" />
          <circle cx="350" cy="20" r="4.5" fill={color("dividerAccentColor")} />
          {[322, 378].map((x, i) => <circle key={i} cx={x} cy="20" r="2.8" fill={color("dividerColor")} opacity=".5" />)}
          <line x1="404" y1="20" x2="700" y2="20" stroke={color("dividerColor")} strokeWidth=".5" strokeDasharray="4 7" />
        </svg>
      </div>

      {/* Quote */}
      {flag("showQuote") ? (
        <div style={{ position: "relative", zIndex: 3, textAlign: "center", marginBottom: 60 }}>
          <p style={{ ...textStyle("quoteText", "body"), fontSize: "clamp(16px,2.4vw,23px)", fontStyle: "italic", letterSpacing: ".8px" }}>
            &ldquo;{content("quoteText")}&rdquo;
          </p>
          {content("quoteSubText") ? (
            <p style={{ ...textStyle("quoteSubText", "body"), fontSize: 10, marginTop: 8, letterSpacing: 4, textTransform: "uppercase" }}>{content("quoteSubText")}</p>
          ) : null}
        </div>
      ) : null}

      {/* Product cards */}
      {cards.length > 0 ? (
        <div style={{ position: "relative", zIndex: 3, maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            {content("collectionLabel") ? (
              <span style={{ ...textStyle("collectionLabel", "body"), fontSize: 11, letterSpacing: 4, textTransform: "uppercase" }}>{content("collectionLabel")}</span>
            ) : null}
            <h2 style={{ fontSize: "clamp(32px,5vw,56px)", lineHeight: 1, margin: "12px 0 0", letterSpacing: -1 }}>
              <span style={textStyle("collectionHeadingLineOne", "heading")}>{content("collectionHeadingLineOne")} </span>
              <span style={{ ...textStyle("collectionHeadingLineTwo", "heading"), fontStyle: "italic" }}>{content("collectionHeadingLineTwo")}</span>
            </h2>
          </div>

          <div className="akf-cardgrid">
            {cards.map((card) => renderCard(card))}
          </div>

          {content("collectionHintText") ? (
            <p style={{ ...textStyle("collectionHintText", "body"), textAlign: "center", marginTop: 40, fontSize: 11, letterSpacing: 3 }}>{content("collectionHintText")}</p>
          ) : null}
        </div>
      ) : null}

      {/* Footer blessing */}
      {flag("showFooter") ? (
        <footer style={{ position: "relative", zIndex: 3, textAlign: "center", marginTop: 64, paddingTop: 32, borderTop: `1px solid ${color("footerBorderColor")}`, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
          <div className="akf-diya-flame" style={{ display: "inline-flex", justifyContent: "center", color: color("footerIconColor") }}><Diya /></div>
          <p style={{ ...textStyle("footerText", "body"), fontSize: "clamp(14px,2vw,18px)", fontStyle: "italic", marginTop: 12 }}>{content("footerText")}</p>
        </footer>
      ) : null}
    </section>
  );
}
