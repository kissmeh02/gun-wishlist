import { describe, it, expect } from 'vitest';
import { parseBackupJson, buildBackupObject, BACKUP_VERSION } from '../../src/lib/backup.js';

describe('backup', () => {
  it('should parse valid backup', () => {
    const b = buildBackupObject(
      [
        { id: 'c_1', n: 'A', cal: '9', cat: 'H', isCustom: true },
      ],
      ['A']
    );
    const text = JSON.stringify(b);
    const r = parseBackupJson(text);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.v).toBe(BACKUP_VERSION);
      expect(r.data.customGuns).toHaveLength(1);
    }
  });

  it('should reject bad JSON', () => {
    const r = parseBackupJson('{');
    expect(r.ok).toBe(false);
  });

  it('should reject wrong version', () => {
    const r = parseBackupJson(JSON.stringify({ v: 0, customGuns: [], acquiredKeys: [] }));
    expect(r.ok).toBe(false);
  });
});
