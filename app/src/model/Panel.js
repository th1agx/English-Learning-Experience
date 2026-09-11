/**
 * Model layer — domain entities.
 * Pure data contracts. No React, no GSAP, no DOM.
 */

/**
 * @typedef {Object} Panel
 * @property {'hero'|'method'|'levels'|'plans'|'cta'} type
 * @property {string}   id        — anchor/kicker number
 * @property {Object}   props     — view-specific payload
 */

/**
 * @typedef {Object} SiteContent
 * @property {string}  brand
 * @property {string}  whatsappUrl
 * @property {Panel[]} panels
 */

/** Factory with defaults so every panel satisfies the view contract. */
export function createPanel(overrides = {}) {
  return {
    id: '',
    type: 'hero',
    props: {},
    ...overrides,
  };
}
