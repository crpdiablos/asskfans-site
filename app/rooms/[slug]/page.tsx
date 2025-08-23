'use client';
import { useParams, useRouter } from 'next/navigation';
import { ROOM_BY_SLUG } from '@/lib/rooms';
import RoomPlayer from '@/components/RoomPlayer';
export default function DynamicRoom(){
  const params = useParams(); const router = useRouter();
  const slug = String((params as any)?.slug ?? '');
  const room = ROOM_BY_SLUG[slug];
  if (!room){ if (typeof window!=='undefined') router.replace('/explore'); return null; }
  return <main style={{minHeight:'100dvh',background:'#000'}}><RoomPlayer room={room} onEnded={()=>router.replace('/home')} /></main>;
}
