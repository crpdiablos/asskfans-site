export const DEBUG = (typeof window !== 'undefined') && (
  localStorage.getItem('assk_debug') === '1' || process.env.NEXT_PUBLIC_DEBUG === '1'
);
export type EventPayload = { name: string; data?: Record<string, any> };
export function logEvent(name: string, data: Record<string, any> = {}) {
  if (!DEBUG || typeof window === 'undefined') return;
  // eslint-disable-next-line no-console
  console.log(`[assk] ${name}`, data);
  window.dispatchEvent(new CustomEvent('assk:event', { detail: { name, data } } as any));
}
