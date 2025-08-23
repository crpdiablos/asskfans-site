import { NextResponse } from 'next/server';

function siteBase() {
  // Prefer explicit public site URL (set this in Vercel env)
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/,'');
  // Fallback to Vercel URL if available
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // Local dev fallback
  return 'http://localhost:3000';
}

export async function GET() {
  const base = siteBase();
  const mediaBase = (process.env.NEXT_PUBLIC_MEDIA_BASE || '/media').replace(/\/+$/,'');
  try {
    // Pull the manifest directly from /public
    const res = await fetch(`${base}/media/manifest.json`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`manifest ${res.status}`);
    const manifest = (await res.json()) as Record<string, string[]>;

    // Flatten manifest to a simple map the frontend already expects:
    // { 'filename.mp4': '<MEDIA_BASE>/filename.mp4', 'filename': '<MEDIA_BASE>/filename.mp4' }
    const out: Record<string, string> = {};
    Object.values(manifest).forEach(arr => {
      (arr || []).forEach(filename => {
        const bare = filename.replace(/\.(mp4|webm|mov)$/i, '');
        const url = `${mediaBase}/${filename}`;
        out[filename] = url;
        out[bare] = url;
      });
    });

    return NextResponse.json(out);
  } catch (_e) {
    // Safe empty response if manifest is missing
    return NextResponse.json({});
  }
}
