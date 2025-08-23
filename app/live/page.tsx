'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

// If you want to control tiles via manifest later, you can.
// For now we ship a working default that uses your existing media files.
type Tile =
  | { kind: 'mp4'; name: string; src: string }
  | { kind: 'webcam'; name: string };

export default function LivePage() {
  const [mediaMap, setMediaMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch('/api/media/list', { cache: 'no-store' });
        const j = await r.json();
        if (!alive) return;
        setMediaMap(j || {});
      } catch {
        // ignore, page will still render webcam tile
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const tiles: Tile[] = useMemo(() => {
    // Map existing media names to tiles, fallback if files not present
    const mp4 = (k: string): string | undefined => mediaMap[k] || mediaMap[k.replace(/\.(mp4|webm|mov)$/i,'')] || undefined;

    const t: Tile[] = [];
    const king = mp4('assking_postlogin_cinematic.mp4');       if (king)  t.push({ kind:'mp4', name:'Ass King Cam', src: king });
    const rosie = mp4('rosie_intro_login.mp4');                 if (rosie) t.push({ kind:'mp4', name:'Rosie Cam', src: rosie });
    const diddler = mp4('diddler_miniscene.mp4');               if (diddler) t.push({ kind:'mp4', name:'Diddler Cam', src: diddler });
    const laq = mp4('laqueefa_teaser_polished.mp4');            if (laq)   t.push({ kind:'mp4', name:'LaQueefa Cam', src: laq });
    const group = mp4('group_chaos.mp4');                       if (group) t.push({ kind:'mp4', name:'Penthouse Party', src: group });

    // Always include a dev webcam tile so you can test the grid without uploads.
    t.push({ kind:'webcam', name:'Your Webcam (Dev Test)' });
    return t;
  }, [mediaMap]);

  return (
    <main style={{ minHeight:'100dvh', background:'#000', color:'#fff', padding:'24px' }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:16 }}>
        <h1 style={{ margin:0 }}>Live Penthouse</h1>
        <small style={{ opacity:0.8 }}>{tiles.length} tiles</small>
      </header>

      <p style={{ opacity:0.8, marginTop:0 }}>
        Demo mode: MP4 loops act as “cams”, plus your local webcam tile for testing. (Audio is muted by default—click unmute on a tile.)
      </p>

      {loading && <div style={{ opacity:0.7, margin:'16px 0' }}>Loading media…</div>}

      <section style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',
        gap:'12px'
      }}>
        {tiles.map((t, i) => <TileCard key={i} tile={t} />)}
      </section>
    </main>
  );
}

function TileCard({ tile }: { tile: Tile }) {
  return (
    <div style={{
      border:'1px solid rgba(255,255,255,0.12)',
      borderRadius:12,
      padding:12,
      background:'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.02))'
    }}>
      <div style={{ fontWeight:700, marginBottom:8 }}>{tile.name}</div>
      {tile.kind === 'mp4'
        ? <MP4Tile src={tile.src} />
        : <WebcamTile />
      }
    </div>
  );
}

function MP4Tile({ src }: { src: string }) {
  return (
    <video
      src={src}
      controls
      muted
      playsInline
      loop
      preload="metadata"
      style={{ width:'100%', borderRadius:8, background:'#111' }}
    />
  );
}

function WebcamTile() {
  const vref = useRef<HTMLVideoElement>(null);
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video:true, audio:false });
        if (vref.current) vref.current.srcObject = stream;
      } catch (e: any) {
        setErr(e?.message || 'Webcam denied');
      }
    })();
    return () => { stream?.getTracks().forEach(t => t.stop()); };
  }, []);

  return (
    <>
      <video ref={vref} autoPlay playsInline muted style={{ width:'100%', borderRadius:8, background:'#111' }}/>
      {err && <div style={{ color:'#f88', fontSize:12, marginTop:6 }}>{err}</div>}
    </>
  );
}
