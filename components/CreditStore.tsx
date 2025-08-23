'use client';
import { getCreditPacks } from '@/lib/store';
export default function CreditStore({ email }: { email: string }){
  async function buy(priceId: string){
    const res = await fetch('/api/stripe/create-checkout-session', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, priceId }) });
    const j = await res.json(); if (j.url) window.location.href = j.url; else alert(j.error ?? 'Checkout failed');
  }
  const packs = getCreditPacks();
  return (<div style={{border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,padding:16}}>
    <div style={{fontWeight:600,marginBottom:8}}>Buy Credits</div>
    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
      {packs.map(p => (<button key={p.priceId} onClick={()=>buy(p.priceId)} style={{padding:'8px 12px',borderRadius:12,background:'#fff',color:'#000'}}>{p.label}</button>))}
    </div>
    <div style={{opacity:0.7,fontSize:12,marginTop:8}}>Credits fuel premium clips.</div>
  </div>);
}
