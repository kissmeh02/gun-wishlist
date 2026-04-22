import { getGunCatalog } from './data/gun-catalog.js';
import { NOTION_DOCS_URL } from './config.js';
import {
  loadAcquiredNames,
  saveAcquiredNames,
  toAcquiredSet,
} from './lib/acquired-storage.js';
import { initControls, fillCategoryOptions } from './ui/init-controls.js';
import { renderApp } from './ui/render-app.js';

const guns = getGunCatalog();
let acquired = toAcquiredSet(guns, loadAcquiredNames());

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

  renderApp(
    guns,
    getFilterState(),
    getSearchText(),
    acquired,
    statsEl,
    tbody,
    (name, checked) => {
      if (checked) acquired.add(name);
      else acquired.delete(name);
      saveAcquiredNames([...acquired]);
      persistAndRender();
    }
  );
}

const notionLink = document.getElementById('notion-link');
if (notionLink) notionLink.href = NOTION_DOCS_URL;

const catFilter = document.getElementById('catFilter');
const nfaFilter = document.getElementById('nfaFilter');
const search = document.getElementById('search');
if (catFilter && nfaFilter && search) {
  fillCategoryOptions(catFilter, guns);
  initControls({
    catFilter,
    nfaFilter,
    search,
    onChange: persistAndRender,
  });
}

persistAndRender();
