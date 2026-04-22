import { getRowKey } from '../lib/gun-key.js';
import { filterGuns } from '../lib/filter-guns.js';
import { buildStatsModel } from '../lib/build-stats.js';

const COLS = 9;

/**
 * @param {HTMLElement} el
 * @param {string} text
 */
function setLabel(el, text) {
  el.setAttribute('data-label', text);
}

/**
 * @param {import('../data/types.js').GunRow[]} allGuns
 * @param {import('../data/types.js').FilterState} filterState
 * @param {string} searchText
 * @param {Set<string>} acquired
 * @param {HTMLElement} statsEl
 * @param {HTMLTableSectionElement} tbody
 * @param {(rowKey: string, checked: boolean) => void} onToggle
 * @param {(id: string) => void} [onDeleteCustom]
 */
export function renderApp(
  allGuns,
  filterState,
  searchText,
  acquired,
  statsEl,
  tbody,
  onToggle,
  onDeleteCustom
) {
  const filtered = filterGuns(allGuns, filterState, searchText);
  const m = buildStatsModel(filtered, allGuns, acquired);

  statsEl.replaceChildren();
  const statSpec = [
    { val: m.shown, label: 'Shown' },
    { val: m.totalCatalog, label: 'Total' },
    { val: m.acquiredInView, label: 'Acquired', valClass: 'stat-got' },
    { val: m.remainingInCatalog, label: 'Remaining' },
    { val: m.nfaShown, label: 'NFA (shown)', valClass: 'stat-nfa' },
  ];
  for (const s of statSpec) {
    const card = document.createElement('div');
    card.className = 'stat';
    card.setAttribute('role', 'listitem');
    const n = document.createElement('div');
    n.className = s.valClass ? `stat-val ${s.valClass}` : 'stat-val';
    n.textContent = String(s.val);
    const lb = document.createElement('div');
    lb.className = 'stat-lbl';
    lb.textContent = s.label;
    card.append(n, lb);
    statsEl.appendChild(card);
  }

  tbody.replaceChildren();
  if (filtered.length === 0) {
    const tr = document.createElement('tr');
    tr.className = 'table-empty';
    const td = document.createElement('td');
    td.colSpan = COLS;
    td.className = 'table-empty-cell';
    td.textContent =
      'No items match these filters. Clear the search, set category to "All categories", or change the NFA filter.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  let lastCat = '';
  for (const g of filtered) {
    if (g.cat !== lastCat) {
      const hr = document.createElement('tr');
      hr.className = 'cat-head';
      const td = document.createElement('td');
      td.colSpan = COLS;
      td.textContent = g.cat;
      hr.appendChild(td);
      tbody.appendChild(hr);
      lastCat = g.cat;
    }
    const rowKey = getRowKey(g);
    const tr = document.createElement('tr');

    const td0 = document.createElement('td');
    td0.className = 'td-check';
    setLabel(td0, 'Acquired');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('aria-label', `Acquired: ${g.n}`);
    if (acquired.has(rowKey)) input.checked = true;
    input.addEventListener('change', () => {
      onToggle(rowKey, input.checked);
    });
    td0.appendChild(input);

    const tdName = document.createElement('td');
    tdName.className = 'td-name';
    setLabel(tdName, 'Name');
    tdName.textContent = g.n;

    const tdCal = document.createElement('td');
    tdCal.className = 'td-cal';
    setLabel(tdCal, 'Caliber');
    tdCal.textContent = g.cal || '—';

    const tdTags = document.createElement('td');
    tdTags.className = 'td-tags';
    setLabel(tdTags, 'Tags');
    const tagsInner = document.createElement('div');
    tagsInner.className = 'td-tags-inner';
    if (g.nfa) tagsInner.appendChild(makeBadge('NFA', 'b-nfa'));
    if (g.hist) tagsInner.appendChild(makeBadge('Historic', 'b-hist'));
    if (g.mil) tagsInner.appendChild(makeBadge('Military', 'b-mil'));
    if (g.isCustom) tagsInner.appendChild(makeBadge('Custom', 'b-custom'));
    if (acquired.has(rowKey)) tagsInner.appendChild(makeBadge('Acquired', 'b-got'));
    tdTags.appendChild(tagsInner);

    const tdPrice = document.createElement('td');
    tdPrice.className = 'td-price td-num';
    setLabel(tdPrice, 'Price');
    const priceStr = (g.targetPrice && String(g.targetPrice).trim()) || '';
    tdPrice.textContent = priceStr || '—';

    const tdDate = document.createElement('td');
    tdDate.className = 'td-pdate';
    setLabel(tdDate, 'Date');
    const dStr = (g.purchaseDate && String(g.purchaseDate).trim()) || '';
    tdDate.textContent = dStr || '—';

    const tdLink = document.createElement('td');
    tdLink.className = 'td-link';
    setLabel(tdLink, 'Link');
    const u = (g.productUrl && String(g.productUrl).trim()) || '';
    if (u && /^https?:\/\//i.test(u)) {
      const a = document.createElement('a');
      a.href = u;
      a.textContent = 'Link';
      a.className = 'link-out';
      a.rel = 'noopener noreferrer';
      a.target = '_blank';
      a.title = u;
      tdLink.appendChild(a);
    } else {
      tdLink.textContent = u || '—';
    }

    const tdNote = document.createElement('td');
    tdNote.className = 'note';
    setLabel(tdNote, 'Notes');
    tdNote.textContent = g.note || '';

    const tdAction = document.createElement('td');
    tdAction.className = 'td-action';
    setLabel(tdAction, 'Action');
    if (g.isCustom && g.id && onDeleteCustom) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-row-delete';
      btn.textContent = 'Remove';
      btn.setAttribute('aria-label', `Remove custom item: ${g.n}`);
      btn.addEventListener('click', () => onDeleteCustom(g.id));
      tdAction.appendChild(btn);
    } else {
      tdAction.appendChild(document.createTextNode(''));
    }

    tr.append(
      td0,
      tdName,
      tdCal,
      tdTags,
      tdPrice,
      tdDate,
      tdLink,
      tdNote,
      tdAction
    );
    tbody.appendChild(tr);
  }
}

/**
 * @param {string} text
 * @param {string} className
 */
function makeBadge(text, className) {
  const s = document.createElement('span');
  s.className = `badge ${className}`;
  s.textContent = text;
  return s;
}
