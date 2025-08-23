'use client';
import { useEffect, useState } from 'react';
import { getUser } from '@/lib/auth';
export default function VipGate({ children }: { children: React.ReactNode }){
  const [ok,setOk] = useState(false);
  useEffect(()=>{ const u=getUser(); setOk(!!u?.vip); },[]);
  if (ok) return <>{children}</>;
  return (<div style={{border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,padding:16}}>
    <div style={{fontWeight:600,marginBottom:8}}>VIP Only</div>
    <div style={{opacity:0.8}}>This live room requires VIP.</div>
  </div>);
}
