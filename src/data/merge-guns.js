import { allCatalogRows } from './catalog/index.js';

/**
 * @param {import('./types.js').GunRow[]} customRows
 * @returns {import('./types.js').GunRow[]}
 */
export function mergeStaticAndCustom(customRows) {
  const all = [...allCatalogRows, ...customRows];
  all.sort((a, b) => {
    const c = a.cat.localeCompare(b.cat, undefined, { sensitivity: 'base' });
    if (c !== 0) return c;
    return a.n.localeCompare(b.n, undefined, { sensitivity: 'base' });
  });
  return all;
}
