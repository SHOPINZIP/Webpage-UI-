export type CouponStripBlockProps = {
  code?: string;
  title?: string;
};

export type CouponStripBlock = {
  id?: string;
  type?: string;
  props?: CouponStripBlockProps;
};

export type CouponStripsControls = {
  heading?: string;
  subheading?: string;
  showSubheading?: boolean;
  showSecondaryStrip?: boolean;
  stripSpeedPrimary?: number;
  stripSpeedSecondary?: number;
};

export type CouponStripsSettings = {
  props?: CouponStripsControls;
  blocks?: CouponStripBlock[];
};

export type CouponStripsSectionDoc = {
  id?: string;
  type?: "coupon_strips" | string;
  enabled?: boolean;
  settings?: CouponStripsSettings;
};

export type CouponTickerMinimalProps = {
  section: CouponStripsSectionDoc;
};

