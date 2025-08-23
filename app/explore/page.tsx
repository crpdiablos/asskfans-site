'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadMediaMap } from '@/lib/media';
const CARDS = [
  { name:'Rosie Palms', slug:'rosie', keyName:'rosieLogin', blurb:'Flirty, funny, dangerously distracting.' },
  { name:'The Ass King', slug:'assking', keyName:'asskingBurst', blurb:'Larger-than-life. Louder-than-legal.' },
  { name:'The Diddler', slug:'diddler', keyName:'diddlerMini', blurb:'Musicals, mischief, towel moments.' },
  { name:'Queen LaQueefa', slug:'laqueefa', keyName:'laqueefaTeaser', blurb:'Polished raunch. Weapons of ass destruction.' },
  { name:'Bates Bros', slug:'batesbros', keyName:'groupChaos', blurb:'Duo banter and roast sessions.' },
];
export default function Explore(){
  const [map,setMap] = useState<Record<string,string>>({});
  useEffect(()=>{ loadMediaMap().then(m=>setMap(m as any)); },[]);
  return (
    <main style={{minHeight:'100dvh',background:'linear-gradient(180deg,#000,#5a165a)',padding:24}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <h1 style={{fontSize:36,marginTop:0}}>Explore the Penthouse</h1>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16}}>
          {CARDS.map(card => (
            <Link key={card.slug} href={`/rooms/${card.slug}`} style={{display:'block',border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,overflow:'hidden',background:'rgba(255,255,255,0.05)'}}>
              <div style={{aspectRatio:'16/9',background:'#000'}}>
                {map[card.keyName] ? <video src={map[card.keyName]} muted playsInline autoPlay loop style={{width:'100%',height:'100%',objectFit:'cover'}}/> : null}
              </div>
              <div style={{padding:12}}><div style={{fontSize:18,fontWeight:600}}>{card.name}</div><div style={{opacity:0.8,fontSize:14}}>{card.blurb}</div></div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
