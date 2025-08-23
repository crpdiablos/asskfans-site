import type { ClipKey } from '@/lib/config';
export type Room = { slug: string; title: string; blurb?: string; clips: ClipKey[]; weights?: number[]; chains?: Partial<Record<ClipKey, ClipKey[]>>; };
export const ROOMS: Room[] = [
  { slug: 'rosie', title: 'Rosie Lounge', blurb: 'Compilations • HJs • BJs • Cumshots', clips: ['rosieLogin','rosieBinoculars','almostKiss'], weights: [60,25,15] },
  { slug: 'assking', title: 'Ass King Suite', blurb: 'Hype entries • Preacher bits • 4th wall', clips: ['asskingBurst','asskingPreacher','fourthWall'], weights: [65,20,15] },
  { slug: 'batesbros', title: 'Bates Bros — Gay Lounge', blurb: 'Duo banter • roasts • crowd work', clips: ['groupChaos','fourthWall'], weights: [70,30] },
  { slug: 'diddler', title: 'The Diddling Room', blurb: 'Musicals • skin‑flute • towel gag', clips: ['diddlerMini','diddlerRomance'], weights: [70,30] },
  { slug: 'laqueefa', title: 'LaQueefa — Scat Room', blurb: 'Polished raunch • Haji interruptions', clips: ['laqueefaTeaser','fourthWall'], weights: [80,20] },
];
export const ROOM_BY_SLUG: Record<string, Room> = Object.fromEntries(ROOMS.map(r=>[r.slug,r]));
