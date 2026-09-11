/**
 * View layer — renders the section flow from the model via the registry.
 * Pure composition: no scroll, no GSAP, no data fetching.
 */

import { PANEL_REGISTRY } from './panelRegistry.js';

export function Sections({ panels, whatsappUrl, whatsappLabel }) {
  return (
    <main>
      {panels.map((panel) => {
        const View = PANEL_REGISTRY[panel.type];
        if (!View) throw new Error(`Unknown panel type: ${panel.type}`);
        const props =
          panel.type === 'cta'
            ? { ...panel.props, whatsappUrl, whatsappLabel }
            : panel.props;
        return <View key={panel.id} {...props} />;
      })}
    </main>
  );
}
