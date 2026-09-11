/**
 * View layer — renders the panel flow from the model via the registry.
 * Each panel receives `active` (owns the camera lens) to drive its
 * Framer Motion variants. Pure composition: no GSAP, no scroll.
 */

import { PANEL_REGISTRY } from './panelRegistry.js';

export function Sections({ panels, activeIndex, whatsappUrl, whatsappLabel }) {
  return (
    <>
      {panels.map((panel, i) => {
        const View = PANEL_REGISTRY[panel.type];
        if (!View) throw new Error(`Unknown panel type: ${panel.type}`);
        const props =
          panel.type === 'cta'
            ? { ...panel.props, whatsappUrl, whatsappLabel }
            : panel.props;
        return <View key={panel.id} active={i === activeIndex} {...props} />;
      })}
    </>
  );
}
