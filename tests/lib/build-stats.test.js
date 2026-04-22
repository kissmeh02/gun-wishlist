import { describe, it, expect } from 'vitest';
import { buildStatsModel } from '../../src/lib/build-stats.js';

const allGuns = [
  { n: 'A', cal: '9mm', cat: 'H', nfa: true },
  { n: 'B', cal: '9mm', cat: 'H' },
  { n: 'C', cal: '9mm', cat: 'H' },
];

describe('buildStatsModel', () => {
  it('should compute shown, totals, and nfa in view', () => {
    const acquired = new Set(['A']);
    const filtered = allGuns.filter((g) => g.n !== 'C');
    const m = buildStatsModel(filtered, allGuns, acquired);
    expect(m.shown).toBe(2);
    expect(m.totalCatalog).toBe(3);
    expect(m.acquiredInView).toBe(1);
    expect(m.remainingInCatalog).toBe(2);
    expect(m.nfaShown).toBe(1);
  });
});
