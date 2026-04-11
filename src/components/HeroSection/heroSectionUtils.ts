/**
 * Shared helpers for hero layouts (slider + scrollable).
 */

export function normalizeImageUrl(raw: unknown): string {
  const s = String(raw ?? "").trim();
  if (!s) return "";
  if (/^data:/i.test(s)) return s;
  if (/^blob:/i.test(s)) return s;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("//")) return `https:${s}`;
  return `https://${s}`;
}
