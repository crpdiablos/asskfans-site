import type { ClipKey } from '@/lib/config';
export type ChainMap = Partial<Record<ClipKey, ClipKey[]>>;
export class RotationEngine {
  ns: string; factor: number;
  constructor(ns: string, factor = 0.8) { this.ns = ns; this.factor = Math.max(0, Math.min(0.95, factor)); }
  private storageKey() { return `assk_hist_${this.ns}`; }
  private readHistory(): ClipKey[] { if (typeof window==='undefined') return []; try{const raw=localStorage.getItem(this.storageKey()); return raw?JSON.parse(raw) as ClipKey[]:[];}catch{return [];} }
  private writeHistory(hist: ClipKey[]) { if (typeof window==='undefined') return; try{ localStorage.setItem(this.storageKey(), JSON.stringify(hist.slice(-200))); }catch{} }
  clearHistory(){ if (typeof window!=='undefined') localStorage.removeItem(this.storageKey()); }
  next(pool: ClipKey[], weights?: number[], chains?: ChainMap): ClipKey {
    if (!pool.length) throw new Error('empty pool');
    const hist = this.readHistory();
    const last = hist[hist.length-1];
    const followers = (last && chains?.[last]) ? chains![last]!.filter(k=>pool.includes(k)) : [];
    if (followers.length){ const choice = followers[Math.floor(Math.random()*followers.length)] as ClipKey; this.push(choice); return choice; }
    const windowSize = Math.min(pool.length-1, Math.max(0, Math.floor(pool.length*this.factor)));
    const recent = new Set(hist.slice(-windowSize));
    const candidates: ClipKey[] = []; const candWeights: number[] = [];
    pool.forEach((k,i)=>{ if(!recent.has(k)){ candidates.push(k); candWeights.push(Math.max(0.0001, weights?.[i]??1)); } });
    const items = candidates.length?candidates:pool;
    const w = candidates.length?candWeights:pool.map((_,i)=>Math.max(0.0001,weights?.[i]??1));
    const total = w.reduce((s,v)=>s+v,0);
    let r = Math.random()*total; let chosen = items[items.length-1];
    for (let i=0;i<items.length;i++){ r -= w[i]; if(r<=0){ chosen = items[i]; break; } }
    this.push(chosen); return chosen as ClipKey;
  }
  push(k: ClipKey){ const hist=this.readHistory(); hist.push(k); this.writeHistory(hist); }
}
