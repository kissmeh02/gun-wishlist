/**
 * @typedef {import('../data/types.js').GunRow} GunRow
 * @typedef {import('../data/types.js').FilterState} FilterState
 */

/**
 * @param {GunRow[]} guns
 * @param {FilterState} state
 * @param {string} query
 * @returns {GunRow[]}
 */
export function filterGuns(guns, state, query) {
  const q = query.trim().toLowerCase();
  return guns.filter((g) => {
    if (state.category && g.cat !== state.category) return false;
    if (state.nfa === 'nfa' && !g.nfa) return false;
    if (state.nfa === 'standard' && g.nfa) return false;
    if (q) {
      const n = g.n.toLowerCase();
      const cal = (g.cal || '').toLowerCase();
      const note = (g.note || '').toLowerCase();
      const price = (g.targetPrice || '').toLowerCase();
      const pdate = (g.purchaseDate || '').toLowerCase();
      const url = (g.productUrl || '').toLowerCase();
      const hay = `${n} ${cal} ${note} ${price} ${pdate} ${url}`;
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
