import { getRowKey } from './gun-key.js';

const STORAGE_KEY = 'gunAcq';

/**
 * @returns {string[]}
 */
export function loadAcquiredNames() {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY) ?? '[]';
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x === 'string');
  } catch (err) {
    console.error('loadAcquiredNames failed', err);
    return [];
  }
}

/**
 * @param {string[]} keys
 */
export function saveAcquiredNames(keys) {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  } catch (err) {
    console.error('saveAcquiredNames failed', err);
  }
}

/**
 * @param {import('../data/types.js').GunRow[]} allGuns
 * @param {string[]} rawKeys
 * @returns {Set<string>}
 */
export function toAcquiredSet(allGuns, rawKeys) {
  const keySet = new Set(allGuns.map((g) => getRowKey(g)));
  const s = new Set();
  for (const k of rawKeys) {
    if (keySet.has(k)) s.add(k);
  }
  return s;
}
