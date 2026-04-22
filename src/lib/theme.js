const STORAGE_KEY = 'gunWishlistTheme';

/**
 * @returns {'dark'|'light'}
 */
export function getStoredTheme() {
  try {
    if (typeof localStorage === 'undefined') return 'dark';
    const t = localStorage.getItem(STORAGE_KEY);
    return t === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

/**
 * @param {'dark'|'light'} theme
 */
export function applyTheme(theme) {
  const next = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', next === 'light' ? '#e8e8ed' : '#0c0c0e');
  }
}

/**
 * Binds the header toggle; persists preference.
 */
export function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const label = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    btn.textContent = isLight ? 'Dark mode' : 'Light mode';
  };
  label();
  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (err) {
      console.error(err);
    }
    applyTheme(next);
    label();
  });
}
