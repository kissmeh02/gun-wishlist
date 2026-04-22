/**
 * @param {Object} p
 * @param {HTMLSelectElement} p.catFilter
 * @param {HTMLSelectElement} p.nfaFilter
 * @param {HTMLInputElement} p.search
 * @param {() => void} p.onChange
 */
export function initControls({ catFilter, nfaFilter, search, onChange }) {
  catFilter.addEventListener('change', onChange);
  nfaFilter.addEventListener('change', onChange);
  search.addEventListener('input', onChange);
}

/**
 * @param {HTMLSelectElement} catFilter
 * @param {import('../data/types.js').GunRow[]} guns
 */
export function fillCategoryOptions(catFilter, guns) {
  syncCategoryOptions(catFilter, guns);
}

/**
 * Rebuild category options, keeping "All" and the current selection if still valid.
 * @param {HTMLSelectElement} catFilter
 * @param {import('../data/types.js').GunRow[]} guns
 */
export function syncCategoryOptions(catFilter, guns) {
  const current = catFilter.value;
  const existing = new Set();
  for (const g of guns) {
    if (g.cat) existing.add(g.cat);
  }
  const cats = [...existing].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  catFilter.length = 1;
  for (const c of cats) {
    const o = document.createElement('option');
    o.value = c;
    o.textContent = c;
    catFilter.appendChild(o);
  }
  if (current && existing.has(current)) catFilter.value = current;
  else catFilter.value = '';
}
