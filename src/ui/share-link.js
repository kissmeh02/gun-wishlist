/**
 * "Copy this view" — includes ?cat= &nfa= &q= when set.
 */
export function initShareLink() {
  const btn = document.getElementById('copy-view-link');
  const msg = document.getElementById('copy-feedback');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const u = window.location.href;
    try {
      await navigator.clipboard.writeText(u);
      if (msg) {
        msg.textContent = 'Link copied';
        setTimeout(() => {
          if (msg) msg.textContent = '';
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      window.prompt('Copy this URL (Ctrl+C):', u);
    }
  });
}
