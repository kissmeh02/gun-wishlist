/**
 * @param {HTMLDataListElement | null} datalist
 * @param {import('../data/types.js').GunRow[]} guns
 */
export function syncCategoryDatalist(datalist, guns) {
  if (!datalist) return;
  datalist.replaceChildren();
  const set = new Set();
  for (const g of guns) if (g.cat) set.add(g.cat);
  const cats = [...set].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  for (const c of cats) {
    const opt = document.createElement('option');
    opt.value = c;
    datalist.appendChild(opt);
  }
}

/**
 * @param {Object} p
 * @param {HTMLFormElement | null} p.form
 * @param {(row: { n: string; cal: string; cat: string; nfa: boolean; mil: boolean; note: string }) => void} p.onAdd
 */
export function initAddItemForm({ form, onAdd }) {
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nEl = form.querySelector('[name="n"]');
    const calEl = form.querySelector('[name="cal"]');
    const catEl = form.querySelector('[name="cat"]');
    const noteEl = form.querySelector('[name="note"]');
    const nfaEl = form.querySelector('[name="nfa"]');
    const milEl = form.querySelector('[name="mil"]');
    const n = String(/** @type {HTMLInputElement} */ (nEl)?.value || '').trim();
    if (!n) return;
    const cal = String(/** @type {HTMLInputElement} */ (calEl)?.value || '').trim() || '—';
    const cat = String(/** @type {HTMLInputElement} */ (catEl)?.value || '').trim() || 'Custom';
    const note = String(/** @type {HTMLTextAreaElement} */ (noteEl)?.value || '').trim();
    const nfa = /** @type {HTMLInputElement} */ (nfaEl)?.checked === true;
    const mil = /** @type {HTMLInputElement} */ (milEl)?.checked === true;
    onAdd({ n, cal, cat, nfa, mil, note });
    form.reset();
  });
}
