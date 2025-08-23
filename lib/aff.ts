export function getAffiliateId(): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(/(?:^|; )assk_aff=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}
