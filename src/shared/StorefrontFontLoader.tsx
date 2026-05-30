import React, { useEffect, useMemo } from "react";

import {

  buildGoogleFontLink,

  collectStorefrontFontIdsFromDocument,

  DEFAULT_STOREFRONT_FONT_ID,

  getStorefrontFontById,

} from "./fonts/fontRegistry";



type StorefrontFontLoaderProps = {

  themeFontId?: string | null;

  fontIds?: string[];

  document?: Parameters<typeof collectStorefrontFontIdsFromDocument>[0] | null;

};



const GOOGLE_FONTS_MARKER = "data-storefront-fonts";



function ensureGooglePreconnect() {

  const head = window.document.head;

  if (!head.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]')) {

    const preconnect = window.document.createElement("link");

    preconnect.rel = "preconnect";

    preconnect.href = "https://fonts.googleapis.com";

    head.appendChild(preconnect);

  }

  if (!head.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com"]')) {

    const preconnect = window.document.createElement("link");

    preconnect.rel = "preconnect";

    preconnect.href = "https://fonts.gstatic.com";

    preconnect.crossOrigin = "anonymous";

    head.appendChild(preconnect);

  }

}



export default function StorefrontFontLoader({

  themeFontId,

  fontIds,

  document,

}: StorefrontFontLoaderProps) {

  const ids = useMemo(() => {

    const fromDoc = document ? collectStorefrontFontIdsFromDocument(document) : [];

    const merged = new Set([

      DEFAULT_STOREFRONT_FONT_ID,

      ...fromDoc,

      ...(fontIds ?? []),

      String(themeFontId ?? "").trim(),

    ]);

    merged.delete("");

    merged.delete("system");

    return Array.from(merged);

  }, [document, fontIds, themeFontId]);



  const googleHref = useMemo(() => buildGoogleFontLink(ids), [ids]);



  useEffect(() => {

    if (!googleHref) return undefined;

    ensureGooglePreconnect();

    const head = window.document.head;

    head.querySelectorAll(`link[${GOOGLE_FONTS_MARKER}="google"]`).forEach((el) => el.remove());



    const link = window.document.createElement("link");

    link.rel = "stylesheet";

    link.href = googleHref;

    link.setAttribute(GOOGLE_FONTS_MARKER, "google");

    head.appendChild(link);

    return () => {

      link.remove();

    };

  }, [googleHref]);



  return null;

}



export { getStorefrontFontById };


