import { describe, it, expect } from 'vitest';
import { getRowKey } from '../../src/lib/gun-key.js';

describe('getRowKey', () => {
  it('should use n when id is missing', () => {
    expect(getRowKey({ n: 'X', cal: '9', cat: 'H' })).toBe('X');
  });

  it('should prefer id when set', () => {
    expect(getRowKey({ id: 'c_1', n: 'X', cal: '9', cat: 'H' })).toBe('c_1');
  });
});
