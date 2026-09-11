/**
 * View layer — panel registry (Open/Closed Principle).
 * Adding a new panel type = register it here; the renderer (Stage)
 * never changes. Keyed by the domain model's `type` field.
 */

import { HeroPanel } from './panels/HeroPanel.jsx';
import { MethodPanel } from './panels/MethodPanel.jsx';
import { LevelsPanel } from './panels/LevelsPanel.jsx';
import { PlansPanel } from './panels/PlansPanel.jsx';
import { CtaPanel } from './panels/CtaPanel.jsx';

export const PANEL_REGISTRY = Object.freeze({
  hero: HeroPanel,
  method: MethodPanel,
  levels: LevelsPanel,
  plans: PlansPanel,
  cta: CtaPanel,
});
