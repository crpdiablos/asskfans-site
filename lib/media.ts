import { CLIPS, MEDIA_BASE, type ClipKey } from './config';
export type MediaMap = Partial<Record<ClipKey, string>>;
export async function loadMediaMap(): Promise<MediaMap> {
  try {
    const res = await fetch(`/api/media/list`, { cache: 'no-store' });
    if (!res.ok) throw new Error('bad status');
    const j = await res.json() as Record<string,string>;
    const map: MediaMap = {};
    (Object.keys(CLIPS) as ClipKey[]).forEach(k => {
      const file = CLIPS[k];
      const bare = file.replace(/\.mp4$/,''); 
      map[k] = j[bare] ?? j[file] ?? `${MEDIA_BASE}/${file}`;
    });
    return map;
  } catch {
    const map: MediaMap = {};
    (Object.keys(CLIPS) as ClipKey[]).forEach(k => map[k] = `${MEDIA_BASE}/${CLIPS[k]}`);
    return map;
  }
}
