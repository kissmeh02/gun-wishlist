import {
  buildCurrentBackup,
  downloadBackupFile,
  parseBackupJson,
  applyBackupFromObject,
} from '../lib/backup.js';

/**
 * @param {HTMLInputElement | null} fileInput
 */
export function initBackupControls(fileInput) {
  document.getElementById('export-backup')?.addEventListener('click', () => {
    downloadBackupFile(buildCurrentBackup(), 'gun-wishlist-backup');
  });

  document.getElementById('import-backup')?.addEventListener('click', () => {
    fileInput?.click();
  });

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const f = fileInput.files?.[0];
      fileInput.value = '';
      if (!f) return;
      if (f.size > 2 * 1024 * 1024) {
        window.alert('File is too large (max 2 MB)');
        return;
      }
      f.text()
        .then((text) => {
          const r = parseBackupJson(text);
          if (!r.ok) {
            window.alert(r.error);
            return;
          }
          if (
            !window.confirm(
              'Replace all custom wishlist items and acquired checkmarks with this backup? This cannot be undone.'
            )
          ) {
            return;
          }
          applyBackupFromObject(r.data);
        })
        .catch((err) => {
          console.error(err);
          window.alert('Could not read file');
        });
    });
  }
}
