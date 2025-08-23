'use client';
import { useRouter } from 'next/navigation';
import { setUser } from '@/lib/auth';
export default function Landing(){
  const r = useRouter();
  function enter(){ setUser({ email:'user@example.com', vip:false }); r.replace('/login'); }
  return (
    <main style={{minHeight:'100dvh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(180deg,#000,#5a165a)'}}>
      <div style={{border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,padding:24,maxWidth:420}}>
        <h1 style={{fontSize:28,margin:0,marginBottom:8}}>AsskFans Access</h1>
        <p style={{opacity:0.8}}>Tap below to enter (18+)</p>
        <button onClick={enter} style={{marginTop:12,padding:'10px 16px',borderRadius:12,background:'#fff',color:'#000'}}>Enter</button>
      </div>
    </main>
  );
}
