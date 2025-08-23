'use client';
export default function BuyCreditsButton({ email, priceId }: { email: string; priceId: string }){
  async function go(){ const res=await fetch('/api/stripe/create-checkout-session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,priceId})}); const j=await res.json(); if(j.url) window.location.href=j.url; }
  return (<button onClick={go} style={{padding:'8px 12px',borderRadius:12,background:'#fff',color:'#000'}}>Buy</button>);
}
