export type User = { email: string; vip?: boolean };
export function getUser(): User | null { if (typeof window==='undefined') return null; const raw=localStorage.getItem('assk_user'); return raw?JSON.parse(raw) as User:null; }
export function setUser(u: User){ if (typeof window!=='undefined') localStorage.setItem('assk_user', JSON.stringify(u)); }
export function requireUser(): User { const u=getUser(); if(!u) throw new Error('NO_USER'); return u; }
