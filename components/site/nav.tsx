'use client';
import Link from 'next/link';
export default function SiteNav(){
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,backdropFilter:'blur(4px)',background:'rgba(0,0,0,0.6)',borderBottom:'1px solid rgba(255,255,255,0.1)',zIndex:40}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 16px',height:48,display:'flex',alignItems:'center',gap:12,fontSize:14}}>
        <Link href="/home">Home</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/rooms/rosie">Rosie</Link>
        <Link href="/rooms/assking">Ass King</Link>
        <Link href="/rooms/batesbros">Bates Bros</Link>
        <Link href="/rooms/diddler">Diddler</Link>
        <Link href="/rooms/laqueefa">LaQueefa</Link>
      </div>
    </nav>
  );
}
