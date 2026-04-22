import { allCatalogRows } from './catalog/index.js';

/**
 * @returns {import('./types.js').GunRow[]}
 */
export function getGunCatalog() {
  return allCatalogRows;
}
