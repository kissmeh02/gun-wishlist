import { getRowKey } from '../lib/gun-key.js';
import { filterGuns } from '../lib/filter-guns.js';
import { buildStatsModel } from '../lib/build-stats.js';

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
  let lastCat = '';
  for (const g of filtered) {
    if (g.cat !== lastCat) {
      const hr = document.createElement('tr');
      hr.className = 'cat-head';
      const td = document.createElement('td');
      td.colSpan = 6;
      td.textContent = g.cat;
      hr.appendChild(td);
      tbody.appendChild(hr);
      lastCat = g.cat;
    }
    const rowKey = getRowKey(g);
    const tr = document.createElement('tr');
    const td0 = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'checkbox';
    if (acquired.has(rowKey)) input.checked = true;
    input.addEventListener('change', () => {
      onToggle(rowKey, input.checked);
    });
    td0.appendChild(input);

    const tdName = document.createElement('td');
    tdName.textContent = g.n;

    const tdCal = document.createElement('td');
    tdCal.style.cssText = 'color:#888;white-space:nowrap';
    tdCal.textContent = g.cal || '—';

    const tdTags = document.createElement('td');
    tdTags.style.whiteSpace = 'nowrap';
    if (g.nfa) tdTags.appendChild(makeBadge('NFA', 'b-nfa'));
    if (g.hist) tdTags.appendChild(makeBadge('Historic', 'b-hist'));
    if (g.mil) tdTags.appendChild(makeBadge('Military', 'b-mil'));
    if (g.isCustom) tdTags.appendChild(makeBadge('Custom', 'b-custom'));
    if (acquired.has(rowKey)) tdTags.appendChild(makeBadge('Acquired', 'b-got'));

    const tdNote = document.createElement('td');
    tdNote.className = 'note';
    tdNote.textContent = g.note || '';

    const tdAction = document.createElement('td');
    tdAction.className = 'td-action';
    if (g.isCustom && g.id && onDeleteCustom) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-row-delete';
      btn.textContent = 'Remove';
      btn.addEventListener('click', () => onDeleteCustom(g.id));
      tdAction.appendChild(btn);
    } else {
      tdAction.appendChild(document.createTextNode(''));
    }

    tr.append(td0, tdName, tdCal, tdTags, tdNote, tdAction);
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
  s.style.marginRight = '3px';
  return s;
}
