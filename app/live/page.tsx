'use client';
import { useEffect, useRef, useState } from 'react';

type Tile = { name: string; mode: 'mp4'|'webcam'; src?: string };

const TILES: Tile[] = [
  { name:'Ass King Cam', mode:'mp4', src:'/media/assking_postlogin_cinematic.mp4' },
  { name:'Rosie Cam',    mode:'mp4', src:'/media/rosie_intro_login.mp4' },
  { name:'Dev Webcam',   mode:'webcam' }
];

export default function LivePage(){
  return (
    <main style={{minHeight:'100dvh',background:'#000',color:'#fff',padding:24}}>
      <h1 style={{marginTop:0}}>Live Penthouse</h1>
      <p style={{opacity:0.8}}>VIP-only demo: MP4 loops + your local webcam for testing.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12}}>
        {TILES.map(t => <LiveTile key={t.name} tile={t}/>)}
      </div>
    </main>
  );
}

function LiveTile({ tile }: { tile: Tile }){
  const vref = useRef<HTMLVideoElement>(null);
  const sref = useRef<MediaStream|null>(null);
  const [err,setErr] = useState<string>('');
  useEffect(()=>{
    if (tile.mode !== 'webcam') return;
    (async()=>{
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video:true, audio:false });
        sref.current = s;
        if (vref.current) vref.current.srcObject = s;
      } catch(e:any){ setErr(e?.message || 'Webcam denied'); }
    })();
    return ()=>{ sref.current?.getTracks().forEach(t=>t.stop()); };
  },[tile.mode]);

  return (
    <div style={{border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:12}}>
      <div style={{fontWeight:600,marginBottom:8}}>{tile.name}</div>
      {tile.mode === 'mp4' ? (
        <video src={tile.src} controls muted playsInline loop style={{width:'100%',borderRadius:8}}/>
      ) : (
        <>
          <video ref={vref} autoPlay playsInline muted style={{width:'100%',borderRadius:8,background:'#111'}}/>
          {err && <div style={{color:'#f88',fontSize:12,marginTop:6}}>{err}</div>}
        </>
      )}
    </div>
  );
}
