'use client';
import { useEffect, useMemo, useState } from 'react';
import type { Room } from '@/lib/rooms';
import { RotationEngine, type ChainMap } from '@/lib/rotate';
import { loadMediaMap } from '@/lib/media';
import VideoIntroPlayer from '@/components/VideoIntroPlayer';
import type { ClipKey } from '@/lib/config';

export default function RoomPlayer({ room, onEnded }: { room: Room; onEnded?: ()=>void }){
  const [src,setSrc] = useState('');
  const eng = useMemo(()=> new RotationEngine(`room_${room.slug}`, 0.8), [room.slug]);
  const key = useMemo<ClipKey>(()=> eng.next(room.clips as ClipKey[], room.weights as number[], room.chains as ChainMap), [eng, room]);
  useEffect(()=>{ let ok=true; loadMediaMap().then(map=>{ if(!ok) return; const s = map[key] ?? ''; setSrc(s); }); return ()=>{ ok=false; }; },[key, room.slug]);
  if(!src) return <div style={{width:'100%',height:'100dvh',background:'#000'}}/>;
  return <VideoIntroPlayer src={src} onEnded={()=>{ onEnded?.(); }} />;
}
