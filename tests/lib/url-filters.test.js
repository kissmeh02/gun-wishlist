import { describe, it, expect } from 'vitest';
import { isValidNfaParam, buildListUrl } from '../../src/lib/url-filters.js';

describe('url-filters', () => {
  it('should validate nfa param', () => {
    expect(isValidNfaParam('nfa')).toBe(true);
    expect(isValidNfaParam('standard')).toBe(true);
    expect(isValidNfaParam('')).toBe(true);
    expect(isValidNfaParam('x')).toBe(false);
  });

  it('should build list URL with query', () => {
    expect(buildListUrl('/g/', 'Handguns', 'nfa', 'glock')).toBe(
      '/g/?cat=Handguns&nfa=nfa&q=glock'
    );
  });
});
