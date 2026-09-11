/**
 * Data layer — repository contract (Dependency Inversion).
 * Views and controllers depend on this interface, never on a
 * concrete source. Swap for a CMS/API client without touching them.
 */

export class SiteContentRepository {
  /** @returns {Promise<import('../model/Panel.js').SiteContent>} */
  async getSiteContent() {
    throw new Error('SiteContentRepository#getSiteContent must be implemented');
  }
}
