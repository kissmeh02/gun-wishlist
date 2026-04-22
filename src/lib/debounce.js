/**
 * @param {() => void} fn
 * @param {number} ms
 * @returns {() => void}
 */
export function debounce(fn, ms) {
  let t = 0;
  return () => {
    clearTimeout(t);
    t = setTimeout(() => {
      fn();
    }, ms);
  };
}
