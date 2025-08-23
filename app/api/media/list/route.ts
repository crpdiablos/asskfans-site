import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(new URL('/media/manifest.json', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
    const manifest = await res.json();
    return NextResponse.json(manifest);
  } catch {
    // fallback: empty manifest
    return NextResponse.json({});
  }
}
