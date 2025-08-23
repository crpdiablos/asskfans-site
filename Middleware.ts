import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AFF_KEYS = ['ref','aff','affiliate','utm_source','utm_campaign','utm_medium'];

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const res = NextResponse.next();

  // --- Affiliate capture ---
  for (const k of AFF_KEYS) {
    const v = searchParams.get(k);
    if (v) {
      res.cookies.set('assk_aff', v, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      break;
    }
  }

  // --- Age gate ---
  const isAllowedPath =
    pathname.startsWith('/gate') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public');

  const ageCookie = req.cookies.get('assk_age');
  if (!ageCookie && !isAllowedPath) {
    return NextResponse.redirect(new URL('/gate', req.url));
  }

  return res;
}
