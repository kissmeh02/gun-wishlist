import { loadAcquiredNames, saveAcquiredNames } from './acquired-storage.js';
import { loadCustomGuns, saveCustomGuns, newCustomId } from './custom-guns-storage.js';

export const BACKUP_VERSION = 1;

/**
 * @param {import('../data/types.js').GunRow[]} customGuns
 * @param {string[]} acquiredKeys
 */
export function buildBackupObject(customGuns, acquiredKeys) {
  return {
    v: BACKUP_VERSION,
    app: 'gun-wishlist',
    exportedAt: new Date().toISOString(),
    customGuns,
    acquiredKeys: [...acquiredKeys],
  };
}

/**
 * @param {unknown} o
 */
function isBackupShape(o) {
  if (!o || typeof o !== 'object') return false;
  return 'v' in o && 'customGuns' in o && 'acquiredKeys' in o;
}

/**
 * @param {string} text
 */
export function parseBackupJson(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, error: 'Not valid JSON' };
  }
  if (!isBackupShape(parsed)) {
    return { ok: false, error: 'Missing fields' };
  }
  if (parsed.v !== BACKUP_VERSION) {
    return { ok: false, error: `Unsupported version ${String(parsed.v)}` };
  }
  if (!Array.isArray(parsed.customGuns) || !Array.isArray(parsed.acquiredKeys)) {
    return { ok: false, error: 'Invalid arrays' };
  }
  for (const k of parsed.acquiredKeys) {
    if (typeof k !== 'string') {
      return { ok: false, error: 'Invalid acquired key' };
    }
  }
  for (const row of parsed.customGuns) {
    if (
      !row ||
      typeof row !== 'object' ||
      typeof (/** @type {Object} */ (row).n) !== 'string' ||
      typeof (/** @type {Object} */ (row).cat) !== 'string' ||
      typeof (/** @type {Object} */ (row).cal) !== 'string'
    ) {
      return { ok: false, error: 'Invalid custom row' };
    }
  }
  return { ok: true, data: /** @type {import('../data/types.js').BackupV1} */ (parsed) };
}

/**
 * @param {import('../data/types.js').BackupV1} data
 */
export function applyBackupFromObject(data) {
  const fixed = data.customGuns.map((g) => {
    const row = /** @type {import('../data/types.js').GunRow} */ ({
      ...g,
      isCustom: true,
      id: g.id || newCustomId(),
    });
    return row;
  });
  saveCustomGuns(fixed);
  saveAcquiredNames(data.acquiredKeys);
  window.location.reload();
}

/**
 */
export function buildCurrentBackup() {
  return buildBackupObject(loadCustomGuns(), loadAcquiredNames());
}

/**
 * @param {import('../data/types.js').BackupV1} data
 * @param {string} fileBase
 */
export function downloadBackupFile(data, fileBase) {
  const stamp =
    data.exportedAt && typeof data.exportedAt === 'string'
      ? data.exportedAt.slice(0, 10)
      : 'backup';
  const name = `${fileBase}-${stamp}.json`;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.rel = 'noopener';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 30_000);
}
