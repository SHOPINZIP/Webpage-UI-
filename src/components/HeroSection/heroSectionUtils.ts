/**
 * Shared helpers for hero layouts (slider + scrollable).
 */

export function normalizeImageUrl(raw: unknown): string {
  const s = String(raw ?? "").trim();
  if (!s) return "";
  if (/^data:/i.test(s)) return s;
  if (/^blob:/i.test(s)) return s;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("//")) return `https://${s}`;
  return `https://${s}`;
}

type NavItemForMatch = { label: string; link?: string };

function normalizePathname(pathname: string): string {
  let p = pathname || "/";
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

/**
 * Resolves a nav `link` (path, relative segment, or same-origin URL) to a pathname.
 * Returns null for empty, hash-only, invalid, or cross-origin links.
 */
export function normalizeNavLinkPath(href: string, baseOrigin?: string): string | null {
  const raw = String(href ?? "").trim();
  if (!raw || raw.startsWith("#")) return null;

  const origin =
    baseOrigin ?? (typeof window !== "undefined" ? window.location.origin : "http://localhost");

  try {
    const isAbsolute = /^https?:\/\//i.test(raw);
    const normalized =
      !isAbsolute && !raw.startsWith("/")
        ? `/${raw.replace(/^\.\//, "")}`
        : raw;
    const url = new URL(normalized, origin);
    if (typeof window !== "undefined" && url.origin !== window.location.origin) return null;
    return normalizePathname(url.pathname || "/");
  } catch {
    return null;
  }
}

/**
 * Picks the nav label whose `link` matches the current path (exact or prefix).
 * Returns null when no item matches — callers should show no active tab.
 */
export function resolveHeaderNavActiveLabel(pathname: string, items: NavItemForMatch[]): string | null {
  if (!items.length) return null;
  let best: { label: string; len: number } | null = null;
  const pathNorm = normalizePathname(pathname);

  for (const item of items) {
    const p = normalizeNavLinkPath(String(item.link ?? ""));
    if (!p) continue;

    const matches = p === "/" ? pathNorm === "/" : pathNorm === p || pathNorm.startsWith(`${p}/`);
    if (matches && (!best || p.length > best.len)) {
      best = { label: item.label, len: p.length };
    }
  }
  return best ? best.label : null;
}

/** Sync pathname when the host app uses pushState/replaceState or the browser back/forward buttons. */
export function subscribeToPathname(onPathname: (pathname: string) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const notify = () => onPathname(window.location.pathname ?? "");
  notify();

  window.addEventListener("popstate", notify);

  const { pushState, replaceState } = history;
  const wrap =
    (original: typeof pushState) =>
    function (this: History, ...args: Parameters<typeof pushState>) {
      const result = original.apply(this, args);
      notify();
      return result;
    };

  history.pushState = wrap(pushState);
  history.replaceState = wrap(replaceState);

  return () => {
    window.removeEventListener("popstate", notify);
    history.pushState = pushState;
    history.replaceState = replaceState;
  };
}
