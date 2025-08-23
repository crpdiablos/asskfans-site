import { NextResponse } from 'next/server';
import { CLIPS, clipUrl } from '@/lib/config';
export async function GET(){
  const out: Record<string,string> = {};
  (Object.keys(CLIPS) as (keyof typeof CLIPS)[]).forEach(k=>{
    const file = CLIPS[k]; const bare = file.replace(/\.mp4$/,''); const url = clipUrl(k as any);
    out[bare]=url; out[file]=url;
  });
  return NextResponse.json(out);
}
