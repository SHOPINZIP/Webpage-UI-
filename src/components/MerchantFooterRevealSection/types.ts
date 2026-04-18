/**
 * Merchant Footer Reveal — storefront section document (Web 1 `footer` + `MerchantFooterReveal`).
 */

export type MerchantFooterRevealSocialPlatform = "instagram" | "facebook" | "website";

export type MerchantFooterRevealPolicyBlockProps = {
  text?: string;
  link?: string;
};

export type MerchantFooterRevealPolicyBlock = {
  id: string;
  type: "policyLink";
  props: MerchantFooterRevealPolicyBlockProps;
};

export type MerchantFooterRevealBlock = MerchantFooterRevealPolicyBlock;

export type MerchantFooterRevealProps = {
  logoText?: string;
  logoImage?: string;
  merchantName?: string;
  merchantSubLabel?: string;
  tagline?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  socialHeading?: string;
  policiesHeading?: string;
  instagramLink?: string;
  facebookLink?: string;
  websiteLink?: string;
};

export type MerchantFooterRevealSettings = {
  props?: MerchantFooterRevealProps;
  blocks?: MerchantFooterRevealBlock[];
};

export type MerchantFooterRevealSectionDoc = {
  settings?: MerchantFooterRevealSettings;
};

export type MerchantFooterRevealPropsComponent = {
  section: MerchantFooterRevealSectionDoc & { settings?: MerchantFooterRevealSettings };
};
