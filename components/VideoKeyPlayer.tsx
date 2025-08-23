'use client';
import { useEffect, useState } from 'react';
import { loadMediaMap } from '@/lib/media';
import type { ClipKey } from '@/lib/config';
import VideoIntroPlayer from './VideoIntroPlayer';
export default function VideoKeyPlayer({ keyName, onEnded }: { keyName: ClipKey; onEnded?:()=>void }){
  const [src,setSrc] = useState('');
  useEffect(()=>{ let ok=true; loadMediaMap().then(map=>{ if(!ok) return; setSrc(map[keyName] ?? ''); }); return ()=>{ ok=false; }; },[keyName]);
  if(!src) return <div style={{width:'100%',height:'100dvh',background:'#000'}}/>;
  return <VideoIntroPlayer src={src} onEnded={onEnded} unmuteHint />;
}
