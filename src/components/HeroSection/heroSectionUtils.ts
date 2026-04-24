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

/**
 * Picks the nav label whose `link` matches the current path (exact or prefix).
 * Returns null when no item has a matching same-origin link — callers keep prior / first tab.
 */
export function resolveHeaderNavActiveLabel(pathname: string, items: NavItemForMatch[]): string | null {
  if (!items.length) return null;
  let best: { label: string; len: number } | null = null;
  const pathRaw = pathname || "/";
  let pathNorm = pathRaw;
  if (pathNorm.length > 1 && pathNorm.endsWith("/")) pathNorm = pathNorm.slice(0, -1);

  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";

  for (const item of items) {
    const href = String(item.link ?? "").trim();
    if (!href) continue;
    try {
      const isAbsolute = /^https?:\/\//i.test(href);
      const normalized =
        !isAbsolute && href && !href.startsWith("/") && !href.startsWith("#")
          ? `/${href.replace(/^\.\//, "")}`
          : href;
      const url = new URL(normalized, origin);
      if (typeof window !== "undefined" && url.origin !== window.location.origin) continue;
      let p = url.pathname || "/";
      if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);

      const matches = p === "/" ? pathNorm === "/" : pathNorm === p || pathNorm.startsWith(`${p}/`);
      if (matches && (!best || p.length > best.len)) {
        best = { label: item.label, len: p.length };
      }
    } catch {
      // ignore invalid href
    }
  }
  return best ? best.label : null;
}
