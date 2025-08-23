'use client';
import { MERCH_PRODUCTS } from '@/lib/store';
export default function MerchStore({ email }: { email: string }){
  async function buy(priceId: string){
    const res = await fetch('/api/stripe/create-checkout-session', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, priceId }) });
    const j = await res.json(); if (j.url) window.location.href = j.url; else alert(j.error ?? 'Checkout failed');
  }
  return (<div style={{border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,padding:16}}>
    <div style={{fontWeight:600,marginBottom:8}}>Merch Store</div>
    <ul style={{listStyle:'none',padding:0,margin:0}}>
      {MERCH_PRODUCTS.map(m => (
        <li key={m.sku} style={{display:'flex',justifyContent:'space-between',gap:12,marginBottom:8}}>
          <div><div style={{fontSize:14,fontWeight:500}}>{m.label}</div><div style={{opacity:0.7,fontSize:12}}>{m.note}</div></div>
          <button onClick={()=>buy(m.priceId)} style={{padding:'6px 10px',borderRadius:10,background:'#fff',color:'#000'}}>Buy</button>
        </li>
      ))}
    </ul>
  </div>);
}
