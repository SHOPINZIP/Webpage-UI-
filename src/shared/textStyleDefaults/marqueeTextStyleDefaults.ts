import type { TextStyle } from "../sectionTypography";

export const MARQUEE_TOP_ROW_DEFAULT: TextStyle = {
  color: "#111111",
  fontWeight: "700",
  fontSize: "48px",
};

export const MARQUEE_BOTTOM_ROW_DEFAULT: TextStyle = {
  color: "#444444",
  fontWeight: "400",
  fontSize: "18px",
};

/** Large row when largeTopRow / largeBottomRow toggles are on. */
export const MARQUEE_TEXT_LARGE_DEFAULT: TextStyle = {
  color: "#0b1f2a",
  fontWeight: "600",
  fontSize: "80px",
};

export const MARQUEE_TEXT_SMALL_DEFAULT: TextStyle = {
  color: "#0b1f2a",
  fontWeight: "500",
  fontSize: "15px",
};
