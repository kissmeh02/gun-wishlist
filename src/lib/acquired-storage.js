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
 * @param {string[]} names
 */
export function saveAcquiredNames(names) {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
  } catch (err) {
    console.error('saveAcquiredNames failed', err);
  }
}

/**
 * @param {import('../data/types.js').GunRow[]} allGuns
 * @param {string[]} names
 * @returns {Set<string>}
 */
export function toAcquiredSet(allGuns, names) {
  const valid = new Set(allGuns.map((g) => g.n));
  const s = new Set();
  for (const n of names) {
    if (valid.has(n)) s.add(n);
  }
  return s;
}
