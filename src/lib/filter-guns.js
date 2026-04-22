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
    if (
      q &&
      !g.n.toLowerCase().includes(q) &&
      !(g.cal || '').toLowerCase().includes(q)
    ) {
      return false;
    }
    return true;
  });
}
