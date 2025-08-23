import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AFF_KEYS = ['ref','aff','affiliate','utm_source','utm_campaign','utm_medium'];

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const res = NextResponse.next();

  // If any affiliate param exists, set/refresh cookie (30 days)
  let affVal: string | null = null;
  for (const k of AFF_KEYS) {
    const v = url.searchParams.get(k);
    if (v) { affVal = v; break; }
  }
  if (affVal) {
    res.cookies.set('assk_aff', affVal, { path: '/', maxAge: 60 * 60 * 24 * 30 });
  }
  return res;
}

export const config = { matcher: ['/:path*'] };
