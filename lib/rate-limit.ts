/**
 * Rate limiting en mémoire, par IP.
 * Suffisant pour un site vitrine sur une instance ; pour du multi-région,
 * remplacer par Upstash Ratelimit ou équivalent (voir README).
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, max = 5, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= max) {
    hits.set(key, list);
    return true;
  }
  list.push(now);
  hits.set(key, list);
  return false;
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}
