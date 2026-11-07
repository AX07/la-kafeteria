/**
 * Optional short "being served" clips, keyed by menu item id.
 *
 * Drop a vertical or square clip (muted, 3 to 6 s, loop-friendly) into
 * /public/assets/menu/motion/ and register it here. LiveMedia plays it only
 * while the dish is on screen and falls back to the photo (with steam and
 * light) for any item that has no clip.
 *
 *   'benedict-jamon-serrano': { mp4: '/assets/menu/motion/benedict-jamon-serrano.mp4',
 *                               webm: '/assets/menu/motion/benedict-jamon-serrano.webm' },
 *
 * Category-level clips (the large chapter stage) are keyed by chapter id:
 *   'chapter:huevos-benedict': { mp4: '...' }
 */
export interface MotionClip {
  mp4?: string;
  webm?: string;
}

export const MOTION_CLIPS: Record<string, MotionClip> = {};
