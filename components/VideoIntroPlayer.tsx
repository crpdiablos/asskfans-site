'use client';
import { useEffect, useRef, useState } from 'react';
export default function VideoIntroPlayer({ src, poster, onEnded, unmuteHint }: { src: string; poster?: string; onEnded?: ()=>void; unmuteHint?: boolean; }){
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  return (
    <div style={{position:'relative',width:'100%',height:'100dvh',background:'#000'}}>
      <video ref={ref} src={src} poster={poster} playsInline className="w-full h-full object-contain" autoPlay muted={muted} onEnded={onEnded} />
      <button onClick={()=>setMuted(m=>!m)} style={{position:'absolute',bottom:16,right:16,padding:'8px 12px',borderRadius:12,background:'rgba(255,255,255,0.2)',color:'#fff'}}>{muted?'Unmute':'Mute'}</button>
      {unmuteHint && muted && (<div style={{position:'absolute',bottom:16,left:16,color:'rgba(255,255,255,0.8)'}}>🔊 Tap Unmute for audio</div>)}
    </div>
  );
}
