/**
 * @param {import('../data/types.js').GunRow} g
 * @returns {string}
 */
export function getRowKey(g) {
  if (g.id) return g.id;
  return g.n;
}
