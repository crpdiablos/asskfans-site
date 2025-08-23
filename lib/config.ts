export const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_BASE ?? '/media';
export const CLIPS = {
  rosieLogin: 'rosie_intro_login.mp4',
  asskingBurst: 'assking_postlogin_cinematic.mp4',
  diddlerMini: 'diddler_miniscene.mp4',
  laqueefaTeaser: 'laqueefa_teaser_polished.mp4',
  groupChaos: 'group_chaos.mp4',
  rosieBinoculars: 'rosie_binoculars_gone_wrong.mp4',
  asskingPreacher: 'assking_preacher_mode.mp4',
  diddlerRomance: 'diddler_romance_interlude.mp4',
  almostKiss: 'rosie_king_almost_kiss.mp4',
  fourthWall: 'breaking_fourth_wall.mp4',
} as const;
export type ClipKey = keyof typeof CLIPS;
export const clipUrl = (key: ClipKey) => `${MEDIA_BASE}/${CLIPS[key]}`;
