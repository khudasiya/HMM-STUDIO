// Cloudflare R2 / CDN Utility Helper for Hmm Studio

const CLOUDFLARE_CDN_DOMAIN = import.meta.env.VITE_CLOUDFLARE_CDN_URL || 'https://cdn.hmmstudio.com';

/**
 * Returns a full CDN URL for audio or image assets.
 * If path is already an absolute URL (e.g. data URI, https://), returns it unchanged.
 */
export function getCDNUrl(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Ensure path starts with a slash
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  return `${CLOUDFLARE_CDN_DOMAIN}${formattedPath}`;
}

/**
 * Generates audio spectrum visualization sample data arrays for fallback Web Audio rendering.
 */
export function generateWaveformData(seed: number = 42, points: number = 60): number[] {
  const bars: number[] = [];
  let current = Math.sin(seed) * 0.5 + 0.5;
  for (let i = 0; i < points; i++) {
    const val = 0.25 + 0.65 * Math.abs(Math.sin((i + seed) * 0.35) * Math.cos((i * 0.2) + seed));
    bars.push(Math.min(1, Math.max(0.15, val)));
  }
  return bars;
}
