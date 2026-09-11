/**
 * Data layer — in-memory implementation.
 * Today it serves the bundled model; tomorrow the same interface
 * can be backed by a headless CMS with zero controller/view changes.
 */

import { SITE_CONTENT } from '../model/siteContent.js';
import { SiteContentRepository } from './SiteContentRepository.js';

export class InMemorySiteContentRepository extends SiteContentRepository {
  async getSiteContent() {
    // async by contract so a network-backed implementation drops in later
    return structuredClone(SITE_CONTENT);
  }
}
