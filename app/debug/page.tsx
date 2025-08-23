'use client';
import { useEffect, useState } from 'react';
export default function DebugPage(){
  const [lines,setLines] = useState<string[]>([]);
  useEffect(()=>{
    const onEvt = (e:any)=>{ const d = e.detail as any; setLines(p=>[`${new Date().toLocaleTimeString()} • ${d.name} ${JSON.stringify(d.data??{})}`,...p].slice(0,200)); };
    window.addEventListener('assk:event', onEvt as any);
    return ()=> window.removeEventListener('assk:event', onEvt as any);
  },[]);
  return (<main style={{minHeight:'100dvh',background:'#000',color:'#fff',padding:24}}>
    <h1 style={{marginTop:0}}>AsskFans Debug</h1>
    <p>Enable logs with <code>localStorage.assk_debug='1'</code> then reload.</p>
    <div style={{fontFamily:'monospace',fontSize:12,whiteSpace:'pre-wrap'}}>{lines.join('\n')}</div>
  </main>);
}
