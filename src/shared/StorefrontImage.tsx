import React, { useEffect, useState } from "react";

type StorefrontImageProps = {
  alt: string;
  className?: string;
  decoding?: "async" | "auto" | "sync";
  desktopSrc: string;
  draggable?: boolean;
  fallback?: React.ReactNode;
  loading?: "eager" | "lazy";
  pictureClassName?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  sizes?: string;
  mobileMedia?: string;
  mobileSrc?: string;
  style?: React.CSSProperties;
};

export default function StorefrontImage({
  alt,
  className,
  decoding = "async",
  desktopSrc,
  draggable = false,
  fallback = null,
  loading = "lazy",
  pictureClassName,
  referrerPolicy,
  sizes,
  mobileMedia = "(max-width: 767px)",
  mobileSrc,
  style,
}: StorefrontImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [desktopSrc, mobileSrc]);

  if (!desktopSrc || failed) {
    return <>{fallback}</>;
  }

  const sharedImgProps = {
    alt,
    className,
    decoding,
    draggable,
    loading,
    onError: () => setFailed(true),
    referrerPolicy,
    sizes,
    style,
  };

  if (mobileSrc) {
    return (
      <picture className={pictureClassName}>
        <source media={mobileMedia} srcSet={mobileSrc} sizes={sizes} />
        <img src={desktopSrc} {...sharedImgProps} />
      </picture>
    );
  }

  return <img src={desktopSrc} {...sharedImgProps} />;
}
