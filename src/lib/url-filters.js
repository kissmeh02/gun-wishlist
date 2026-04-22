/**
 * @returns {{ cat: string, nfa: string, q: string }}
 */
export function readUrlFilterParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    cat: p.get('cat') ?? '',
    nfa: p.get('nfa') ?? '',
    q: p.get('q') ?? '',
  };
}

/**
 * @param {string} n
 * @returns {n is ''|'nfa'|'standard'}
 */
export function isValidNfaParam(n) {
  return n === '' || n === 'nfa' || n === 'standard';
}

/**
 * @param {string} basePath
 * @param {string} cat
 * @param {string} nfa
 * @param {string} q
 * @returns {string}
 */
export function buildListUrl(basePath, cat, nfa, q) {
  const p = new URLSearchParams();
  if (cat) p.set('cat', cat);
  if (nfa) p.set('nfa', nfa);
  if (q) p.set('q', q);
  const qs = p.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
