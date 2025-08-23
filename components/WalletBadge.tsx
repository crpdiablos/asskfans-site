'use client';
export default function WalletBadge({ email }: { email: string }){
  return (<div style={{border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:'6px 10px',display:'inline-block',fontSize:12,opacity:0.8}}>
    {email} • Credits: 0
  </div>);
}
