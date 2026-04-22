const STORAGE_KEY = 'gunCustom';

/**
 * @param {unknown} u
 * @returns {u is import('../data/types.js').GunRow}
 */
function isGunRow(u) {
  if (!u || typeof u !== 'object') return false;
  const o = /** @type {Object} */ (u);
  return (
    typeof o.n === 'string' &&
    typeof o.cal === 'string' &&
    typeof o.cat === 'string' &&
    (o.id == null || typeof o.id === 'string')
  );
}

/**
 * @returns {import('../data/types.js').GunRow[]}
 */
export function loadCustomGuns() {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY) ?? '[]';
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    let needPersist = false;
    const out = parsed
      .filter((x) => isGunRow(x))
      .map((x) => {
        const g = /** @type {import('../data/types.js').GunRow} */ (x);
        if (!g.id) needPersist = true;
        return { ...g, isCustom: true, id: g.id || newCustomId() };
      });
    if (needPersist) saveCustomGuns(out);
    return out;
  } catch (err) {
    console.error('loadCustomGuns failed', err);
    return [];
  }
}

/**
 * @param {import('../data/types.js').GunRow[]} rows
 */
export function saveCustomGuns(rows) {
  try {
    if (typeof localStorage === 'undefined') return;
    const cleaned = rows.map(
      (g) => /** @type {import('../data/types.js').GunRow} */ ({
        id: g.id,
        n: g.n,
        cal: g.cal,
        cat: g.cat,
        nfa: !!g.nfa,
        hist: !!g.hist,
        mil: !!g.mil,
        note: g.note || '',
        isCustom: true,
      })
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  } catch (err) {
    console.error('saveCustomGuns failed', err);
  }
}

/**
 * @returns {string}
 */
export function newCustomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `c_${crypto.randomUUID()}`;
  }
  return `c_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}
