import { mergeStaticAndCustom } from './data/merge-guns.js';
import { NOTION_DOCS_URL, CATALOG_REFRESH_DATE } from './config.js';
import { getRowKey } from './lib/gun-key.js';
import {
  loadAcquiredNames,
  saveAcquiredNames,
  toAcquiredSet,
} from './lib/acquired-storage.js';
import {
  loadCustomGuns,
  saveCustomGuns,
  newCustomId,
} from './lib/custom-guns-storage.js';
import { initControls, syncCategoryOptions } from './ui/init-controls.js';
import { initAddItemForm, syncCategoryDatalist } from './ui/add-item-form.js';
import { renderApp } from './ui/render-app.js';

let customGuns = loadCustomGuns();
let allGuns = mergeStaticAndCustom(customGuns);
let acquired = toAcquiredSet(allGuns, loadAcquiredNames());

/**
 * Remove acquired keys that no longer exist in the list.
 * @param {Set<string>} set
 * @param {import('./data/types.js').GunRow[]} guns
 */
function pruneAcquiredToCatalog(set, guns) {
  const valid = new Set(guns.map((g) => getRowKey(g)));
  for (const k of [...set]) {
    if (!valid.has(k)) set.delete(k);
  }
}

function syncLists() {
  const catFilter = document.getElementById('catFilter');
  const dl = document.getElementById('add-cat-dl');
  if (catFilter) syncCategoryOptions(catFilter, allGuns);
  syncCategoryDatalist(dl, allGuns);
}

function getFilterState() {
  const catFilter = document.getElementById('catFilter');
  const nfaFilter = document.getElementById('nfaFilter');
  return {
    category: catFilter?.value ?? '',
    nfa: /** @type {'' | 'nfa' | 'standard'} */ (nfaFilter?.value ?? ''),
  };
}

function getSearchText() {
  const el = document.getElementById('search');
  return el?.value ?? '';
}

function persistAndRender() {
  const statsEl = document.getElementById('stats');
  const tbody = document.getElementById('tbody');
  if (!statsEl || !tbody) return;

  allGuns = mergeStaticAndCustom(customGuns);
  pruneAcquiredToCatalog(acquired, allGuns);
  saveAcquiredNames([...acquired]);

  syncLists();

  renderApp(
    allGuns,
    getFilterState(),
    getSearchText(),
    acquired,
    statsEl,
    tbody,
    (rowKey, checked) => {
      if (checked) acquired.add(rowKey);
      else acquired.delete(rowKey);
      saveAcquiredNames([...acquired]);
      persistAndRender();
    },
    (id) => {
      customGuns = customGuns.filter((g) => g.id !== id);
      saveCustomGuns(customGuns);
      acquired.delete(id);
      saveAcquiredNames([...acquired]);
      persistAndRender();
    }
  );
}

const notionLink = document.getElementById('notion-link');
if (notionLink) notionLink.href = NOTION_DOCS_URL;

const subEl = document.getElementById('catalog-dates');
if (subEl) {
  const today = new Date().toLocaleDateString(undefined, { dateStyle: 'long' });
  subEl.textContent = `Catalog data curated ${CATALOG_REFRESH_DATE} — open today ${today}`;
}

const catFilter = document.getElementById('catFilter');
const nfaFilter = document.getElementById('nfaFilter');
const search = document.getElementById('search');
if (catFilter && nfaFilter && search) {
  syncCategoryOptions(catFilter, allGuns);
  initControls({
    catFilter,
    nfaFilter,
    search,
    onChange: persistAndRender,
  });
}

initAddItemForm({
  form: document.getElementById('add-gun-form'),
  onAdd: ({ n, cal, cat, nfa, mil, note }) => {
    const row = /** @type {import('./data/types.js').GunRow} */ ({
      id: newCustomId(),
      n,
      cal,
      cat,
      nfa,
      mil,
      hist: false,
      note: note || '',
      isCustom: true,
    });
    customGuns = [...customGuns, row];
    saveCustomGuns(customGuns);
    persistAndRender();
  },
});

syncCategoryDatalist(document.getElementById('add-cat-dl'), allGuns);
persistAndRender();
