import { getRowKey } from './gun-key.js';

/**
 * @param {import('../data/types.js').GunRow[]} filtered
 * @param {import('../data/types.js').GunRow[]} allGuns
 * @param {Set<string>} acquired
 */
export function buildStatsModel(filtered, allGuns, acquired) {
  const total = filtered.length;
  const got = filtered.filter((g) => acquired.has(getRowKey(g))).length;
  const nfaCount = filtered.filter((g) => g.nfa).length;
  return {
    shown: total,
    totalCatalog: allGuns.length,
    acquiredInView: got,
    remainingInCatalog: allGuns.length - acquired.size,
    nfaShown: nfaCount,
  };
}
