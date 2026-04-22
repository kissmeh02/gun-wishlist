/**
 * Press / to focus the main search (when not already typing in a field).
 */
export function initSearchHotkey() {
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    const el = e.target;
    if (!el || typeof el !== 'object') return;
    const t = /** @type {EventTarget} */ (el);
    if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return;
    if (t instanceof HTMLSelectElement) return;
    if (t instanceof HTMLElement && t.isContentEditable) return;
    e.preventDefault();
    document.getElementById('search')?.focus();
  });
}
