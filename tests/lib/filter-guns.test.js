import { describe, it, expect } from 'vitest';
import { filterGuns } from '../../src/lib/filter-guns.js';

const sample = [
  { n: 'A', cal: '9mm', cat: 'Handguns', nfa: true },
  { n: 'B', cal: '12 gauge', cat: 'Shotguns' },
];

describe('filterGuns', () => {
  it('should return all when filters are empty and query is empty', () => {
    const r = filterGuns(sample, { category: '', nfa: '' }, '');
    expect(r).toHaveLength(2);
  });

  it('should filter by category when set', () => {
    const r = filterGuns(sample, { category: 'Handguns', nfa: '' }, '');
    expect(r).toHaveLength(1);
    expect(r[0].n).toBe('A');
  });

  it('should filter nfa only when nfa is nfa', () => {
    const r = filterGuns(sample, { category: '', nfa: 'nfa' }, '');
    expect(r).toHaveLength(1);
    expect(r[0].n).toBe('A');
  });

  it('should filter standard when nfa is standard', () => {
    const r = filterGuns(sample, { category: '', nfa: 'standard' }, '');
    expect(r).toHaveLength(1);
    expect(r[0].n).toBe('B');
  });

  it('should match search on name and caliber', () => {
    const r = filterGuns(sample, { category: '', nfa: '' }, 'gauge');
    expect(r).toHaveLength(1);
  });

  it('should match search in optional fields on custom rows', () => {
    const rows = [
      { n: 'X', cal: '9', cat: 'H', targetPrice: '$500' },
    ];
    const r = filterGuns(/** @type {import('../../src/data/types.js').GunRow[]} */ (rows), { category: '', nfa: '' }, '500');
    expect(r).toHaveLength(1);
  });
});
