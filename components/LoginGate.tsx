'use client';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import VideoKeyPlayer from '@/components/VideoKeyPlayer';
import type { ClipKey } from '@/lib/config';
import { RotationEngine } from '@/lib/rotate';

const KING_INTROS: ClipKey[] = ['asskingBurst','asskingPreacher','fourthWall'];
const KING_WEIGHTS = [50,25,25];

export default function LoginGate(){
  const router = useRouter();
  const engine = useMemo(()=> new RotationEngine('login', 0.8), []);
  const key = useMemo(()=> engine.next(KING_INTROS, KING_WEIGHTS), [engine]);
  return (
    <VideoKeyPlayer keyName={key} onEnded={()=>{ router.replace('/home'); }} />
  );
}
