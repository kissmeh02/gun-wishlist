/**
 * @typedef {Object} GunRow
 * @property {string} [id] Stable id for custom rows; catalog rows omit (key is n).
 * @property {string} n
 * @property {string} cal
 * @property {string} cat
 * @property {boolean} [nfa]
 * @property {boolean} [hist]
 * @property {boolean} [mil]
 * @property {boolean} [isCustom] User-added from the form (stored in localStorage).
 * @property {string} [note]
 */

/**
 * @typedef {Object} FilterState
 * @property {string} [category] '' or category name
 * @property {''|'nfa'|'standard'} nfa
 */

export {};
