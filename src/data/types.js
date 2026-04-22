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
 * @property {string} [targetPrice] Optional, custom rows (e.g. "$1,200").
 * @property {string} [purchaseDate] Optional, ISO or display string (custom).
 * @property {string} [productUrl] Optional, https link (custom).
 */

/**
 * @typedef {Object} FilterState
 * @property {string} [category] '' or category name
 * @property {''|'nfa'|'standard'} nfa
 */

/**
 * @typedef {Object} BackupV1
 * @property {1} v
 * @property {string} [app]
 * @property {string} [exportedAt]
 * @property {GunRow[]} customGuns
 * @property {string[]} acquiredKeys
 */

export {};
