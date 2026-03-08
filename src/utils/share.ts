import { HUNT_MARKS, type HuntMark } from '../data/hunts';

const HASH_PREFIX = 'share=';

interface SharePayload {
  t: string[];  // tracked IDs
  g: string;    // groupBy
}

export function encodeShareHash(tracked: HuntMark[], groupBy: string): string {
  const payload: SharePayload = {
    t: tracked.map((m) => m.id),
    g: groupBy,
  };
  return HASH_PREFIX + btoa(JSON.stringify(payload));
}

export interface DecodeResult {
  marks: HuntMark[];
  groupBy: string;
}

export function decodeShareHash(hash: string): DecodeResult | null {
  try {
    const raw = hash.startsWith('#') ? hash.slice(1) : hash;
    if (!raw.startsWith(HASH_PREFIX)) return null;
    const payload: SharePayload = JSON.parse(atob(raw.slice(HASH_PREFIX.length)));
    if (!Array.isArray(payload.t)) return null;

    const idMap = new Map(HUNT_MARKS.map((m) => [m.id, m]));
    const marks = payload.t.flatMap((id) => {
      const m = idMap.get(id);
      return m ? [m] : [];
    });

    return { marks, groupBy: payload.g ?? 'zone' };
  } catch {
    return null;
  }
}

export function copyShareUrl(tracked: HuntMark[], groupBy: string): void {
  const hash = encodeShareHash(tracked, groupBy);
  const url = `${window.location.origin}${window.location.pathname}#${hash}`;
  navigator.clipboard.writeText(url);
}
