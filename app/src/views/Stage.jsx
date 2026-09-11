/**
 * View layer — the "camera".
 * Fixed full-viewport stage; the track of panels slides past it.
 * Renders any panel sequence from the model via the registry.
 */

import { PANEL_REGISTRY } from './panelRegistry.js';

export function Stage({ trackRef, panels, whatsappUrl, whatsappLabel }) {
  return (
    <div className="stage" aria-role="presentation">
      <div className="track" ref={trackRef}>
        {panels
          .filter((p) => p.type !== 'cta') // CTA lives on the vertical finale layer
          .map((panel) => {
            const View = PANEL_REGISTRY[panel.type];
            if (!View) throw new Error(`Unknown panel type: ${panel.type}`);
            const props =
              panel.type === 'cta'
                ? { ...panel.props, whatsappUrl, whatsappLabel }
                : panel.props;
            return <View key={panel.id} {...props} />;
          })}
      </div>
    </div>
  );
}
