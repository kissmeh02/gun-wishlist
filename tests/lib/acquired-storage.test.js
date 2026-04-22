import { describe, it, expect } from 'vitest';
import { toAcquiredSet } from '../../src/lib/acquired-storage.js';

const allGuns = [
  { n: 'A', cal: '9mm', cat: 'H' },
  { n: 'B', cal: '9mm', cat: 'H' },
];

describe('toAcquiredSet', () => {
  it('should keep only names that exist in the catalog', () => {
    const s = toAcquiredSet(allGuns, ['A', 'C', 'B']);
    expect([...s].sort()).toEqual(['A', 'B']);
  });

  it('should match custom rows by id', () => {
    const guns = [
      { id: 'c_1', n: 'X', cal: '9', cat: 'H' },
    ];
    const s = toAcquiredSet(guns, ['c_1', 'A']);
    expect(s.has('c_1')).toBe(true);
  });
});
