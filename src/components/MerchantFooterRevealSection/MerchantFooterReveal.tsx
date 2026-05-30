import React, { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { normalizeImageUrl } from "../HeroSection/heroSectionUtils";
import { usePrefersReducedMotion } from "../MessageStyleTestimonialsSection/hooks";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import type { ResolvedSectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  FOOTER_COLUMN_HEADING_DEFAULT,
  FOOTER_CONTACT_TEXT_DEFAULT,
  FOOTER_LOGO_TEXT_DEFAULT,
  FOOTER_MERCHANT_NAME_DEFAULT,
  FOOTER_MERCHANT_SUB_LABEL_DEFAULT,
  FOOTER_POLICY_LINK_TEXT_DEFAULT,
  FOOTER_TAGLINE_DEFAULT,
} from "../../shared/textStyleDefaults/footerTextStyleDefaults";
import type {
  MerchantFooterRevealPolicyBlockProps,
  MerchantFooterRevealPropsComponent,
  MerchantFooterRevealSocialPlatform,
} from "./types";

function safeText(v: unknown): string {
  return String(v ?? "").trim();
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBase({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </IconBase>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path
        d="M13.15 20V13.15H15.55L15.95 10.45H13.15V8.65C13.15 7.88 13.38 7.36 14.48 7.36H16V5.02C15.29 4.93 14.58 4.89 13.87 4.9C11.66 4.9 10.22 6.22 10.22 8.64V10.45H8V13.15H10.22V20H13.15Z"
        fill="currentColor"
      />
    </IconBase>
  );
}

function WebsiteIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M12 4C14.3 6.45 15.55 9.08 15.55 12C15.55 14.92 14.3 17.55 12 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 4C9.7 6.45 8.45 9.08 8.45 12C8.45 14.92 9.7 17.55 12 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path
        d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.85" />
    </IconBase>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path
        d="M8.5 3h2l1.5 4-2.2 1.2a11 11 0 0 0 5 5L16 11l4 1.5v2a2 2 0 0 1-2 2h-.5C9.6 16.5 4.5 11.4 4.5 4.5V4a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function MessageCircleIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

const PLATFORM_META: Record<
  MerchantFooterRevealSocialPlatform,
  { label: string; Icon: React.FC<{ className?: string }> }
> = {
  instagram: { label: "Instagram", Icon: InstagramIcon },
  facebook: { label: "Facebook", Icon: FacebookIcon },
  website: { label: "Website", Icon: WebsiteIcon },
};

function normalizeExternalHref(raw: unknown): string {
  const s = safeText(raw);
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("//")) return `https:${s}`;
  if (s.startsWith("/") || s.startsWith("#")) return s;
  return `https://${s}`;
}

function normalizePolicyHref(raw: unknown): string {
  const s = safeText(raw);
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/") || s.startsWith("#")) return s;
  if (/^mailto:/i.test(s) || /^tel:/i.test(s)) return s;
  if (/^www\./i.test(s)) return `https://${s}`;
  return s;
}

function InfoRow({
  icon: Icon,
  text,
  style,
}: {
  icon: React.FC<{ className?: string }>;
  text: string;
  style?: React.CSSProperties;
}) {
  if (!text) return null;
  return (
    <div className="ak-mf__info-row">
      <span className="ak-mf__info-icon" aria-hidden>
        <Icon className="ak-mf__info-icon-svg" />
      </span>
      <p className="ak-mf__info-text" style={style}>
        {text}
      </p>
    </div>
  );
}

function collectPolicies(blocks: unknown): MerchantFooterRevealPolicyBlockProps[] {
  const policies: MerchantFooterRevealPolicyBlockProps[] = [];
  if (!Array.isArray(blocks)) return policies;
  for (const b of blocks) {
    if (!b || typeof b !== "object" || (b as { type?: string }).type !== "policyLink") continue;
    policies.push((b as { props?: MerchantFooterRevealPolicyBlockProps }).props ?? {});
  }
  return policies;
}

const FIXED_SOCIAL_ORDER: MerchantFooterRevealSocialPlatform[] = ["instagram", "facebook", "website"];

export default function MerchantFooterReveal({
  section,
  appearance,
  theme,
}: MerchantFooterRevealPropsComponent) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  const props = section?.settings?.props ?? {};
  const rawBlocks = section?.settings?.blocks;

  const logoText = safeText(props.logoText) || "M";
  const logoImage = normalizeImageUrl(props.logoImage);
  const merchantName = safeText(props.merchantName);
  const merchantSubLabel = safeText(props.merchantSubLabel);
  const tagline = safeText(props.tagline);
  const address = safeText(props.address);
  const phone = safeText(props.phone);
  const whatsapp = safeText(props.whatsapp);
  const socialHeading = safeText(props.socialHeading) || "Social";
  const policiesHeading = safeText(props.policiesHeading) || "Policies";

  const linkByPlatform: Record<MerchantFooterRevealSocialPlatform, string> = {
    instagram: normalizeExternalHref(props.instagramLink),
    facebook: normalizeExternalHref(props.facebookLink),
    website: normalizeExternalHref(props.websiteLink),
  };

  const enableRevealMotion = !reduceMotion;

  const rawPolicies = useMemo(() => collectPolicies(rawBlocks), [rawBlocks]);

  const policyItems = useMemo(() => {
    return rawPolicies
      .map((p) => ({
        text: safeText(p?.text),
        link: normalizePolicyHref(p?.link),
      }))
      .filter((p) => p.text);
  }, [rawPolicies]);

  const socialItems = useMemo(() => {
    return FIXED_SOCIAL_ORDER.map((platform) => {
      const link = linkByPlatform[platform];
      if (!link) return null;
      const meta = PLATFORM_META[platform];
      return { link, platform, label: meta.label, Icon: meta.Icon };
    }).filter(Boolean) as Array<{
      link: string;
      platform: MerchantFooterRevealSocialPlatform;
      label: string;
      Icon: React.FC<{ className?: string }>;
    }>;
  }, [props.instagramLink, props.facebookLink, props.websiteLink]);

  const hasPolicies = policyItems.length > 0;
  const hasSocial = socialItems.length > 0;
  const gridModifier =
    hasSocial && hasPolicies ? "ak-mf__grid--3" : hasSocial || hasPolicies ? "ak-mf__grid--2" : "ak-mf__grid--1";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const rawReveal = useTransform(scrollYProgress, [0.82, 1], [0, 1]);
  const reveal = useSpring(rawReveal, {
    stiffness: 185,
    damping: 24,
    mass: 0.42,
  });

  const brandY = useTransform(reveal, [0, 1], ["100%", "0%"]);
  const brandScaleX = useTransform(reveal, [0, 1], [1, 1.02]);
  const topLift = useTransform(reveal, [0, 1], [0, 28]);

  const whatsappLine = whatsapp ? `WhatsApp: ${whatsapp}` : "";

  const merchantNameStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "merchantName",
          role: "heading",
          defaultStyle: FOOTER_MERCHANT_NAME_DEFAULT,
        })
      ),
    [section, theme]
  );

  const merchantSubLabelStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "merchantSubLabel",
          role: "body",
          defaultStyle: FOOTER_MERCHANT_SUB_LABEL_DEFAULT,
        })
      ),
    [section, theme]
  );

  const taglineStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "tagline",
          role: "body",
          defaultStyle: FOOTER_TAGLINE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const socialHeadingStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "socialHeading",
          role: "heading",
          defaultStyle: FOOTER_COLUMN_HEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const policiesHeadingStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "policiesHeading",
          role: "heading",
          defaultStyle: FOOTER_COLUMN_HEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const policyLinkTextStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "policyLinkText",
          role: "body",
          defaultStyle: FOOTER_POLICY_LINK_TEXT_DEFAULT,
        })
      ),
    [section, theme]
  );

  const logoTextStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "logoText",
          role: "heading",
          defaultStyle: FOOTER_LOGO_TEXT_DEFAULT,
        })
      ),
    [section, theme]
  );

  const addressStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "address",
          role: "body",
          defaultStyle: FOOTER_CONTACT_TEXT_DEFAULT,
        })
      ),
    [section, theme]
  );

  const phoneStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "phone",
          role: "body",
          defaultStyle: FOOTER_CONTACT_TEXT_DEFAULT,
        })
      ),
    [section, theme]
  );

  const whatsappStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "whatsapp",
          role: "body",
          defaultStyle: FOOTER_CONTACT_TEXT_DEFAULT,
        })
      ),
    [section, theme]
  );

  const revealInner = (
    <div className="ak-mf__reveal-box">
      <div className="ak-mf__powered-wrap">
        <span className="ak-mf__powered">Powered by</span>
      </div>

      <div className="ak-mf__brand-big-wrap">
        <div className="ak-mf__brand-big">areakart</div>
      </div>

      <div className="ak-mf__reveal-fade" aria-hidden />
    </div>
  );

  return (
    <section ref={sectionRef} className="ak-mf" style={sectionAppearanceStyle(appearance)}>
      <div className="ak-mf__ambient" aria-hidden />
      <div className="ak-mf__top-rule" aria-hidden />

      {enableRevealMotion ? (
        <motion.div style={{ height: topLift }} className="ak-mf__top-spacer" aria-hidden />
      ) : null}

      <div className="ak-mf__inner">
        <div className={`ak-mf__grid ${gridModifier}`}>
          <div className="ak-mf__col ak-mf__col--brand">
            <div className="ak-mf__brand-row">
              {logoImage ? (
                <div className="ak-mf__logo-img-wrap">
                  <img src={logoImage} alt="" className="ak-mf__logo-img" />
                </div>
              ) : (
                <div className="ak-mf__logo-fallback" aria-hidden style={logoTextStyle}>
                  {logoText.slice(0, 3)}
                </div>
              )}

              <div className="ak-mf__brand-text">
                {merchantName ? (
                  <h2 className="ak-mf__merchant-name" style={merchantNameStyle}>
                    {merchantName}
                  </h2>
                ) : null}
                {merchantSubLabel ? (
                  <p className="ak-mf__merchant-sub" style={merchantSubLabelStyle}>
                    {merchantSubLabel}
                  </p>
                ) : null}
              </div>
            </div>

            {tagline ? (
              <p className="ak-mf__tagline" style={taglineStyle}>
                {tagline}
              </p>
            ) : null}

            {address || phone || whatsappLine ? (
              <div className="ak-mf__contact">
                <InfoRow icon={MapPinIcon} text={address} style={addressStyle} />
                <InfoRow icon={PhoneIcon} text={phone} style={phoneStyle} />
                <InfoRow icon={MessageCircleIcon} text={whatsappLine} style={whatsappStyle} />
              </div>
            ) : null}
          </div>

          {hasSocial ? (
            <div className="ak-mf__col ak-mf__col--social">
              <p className="ak-mf__col-heading" style={socialHeadingStyle}>
                {socialHeading}
              </p>
              <div className="ak-mf__link-stack">
                {socialItems.map((item, idx) => (
                  <a
                    key={`social-${idx}-${item.platform}`}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ak-mf__link-row ak-mf__link-row--social"
                  >
                    <span className="ak-mf__social-label">
                      <span className="ak-mf__social-icon">
                        <item.Icon className="ak-mf__social-icon-svg" />
                      </span>
                      {item.label}
                    </span>
                    <ChevronRightIcon className="ak-mf__chev ak-mf__chev--social" />
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {hasPolicies ? (
            <div className="ak-mf__col ak-mf__col--policies">
              <p className="ak-mf__col-heading" style={policiesHeadingStyle}>
                {policiesHeading}
              </p>
              <div className="ak-mf__link-stack">
                {policyItems.map((item, idx) => (
                  <div key={`policy-${idx}-${item.text}`} className="ak-mf__policy-row">
                    {item.link ? (
                      <a href={item.link} className="ak-mf__link-row">
                        <span style={policyLinkTextStyle}>{item.text}</span>
                        <ChevronRightIcon className="ak-mf__chev" />
                      </a>
                    ) : (
                      <div className="ak-mf__link-row ak-mf__link-row--static">
                        <span style={policyLinkTextStyle}>{item.text}</span>
                        <ChevronRightIcon className="ak-mf__chev ak-mf__chev--muted" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="ak-mf__reveal-wrap">
          {enableRevealMotion ? (
            <motion.div className="ak-mf__reveal-motion" style={{ y: brandY, scaleX: brandScaleX }}>
              {revealInner}
            </motion.div>
          ) : (
            <div className="ak-mf__reveal-motion">{revealInner}</div>
          )}
        </div>
      </div>
    </section>
  );
}
