/**
 * App — composition root.
 *   SiteProvider (controller: DI container, loads the model)
 *   └─ Journey    (controller: scroll choreography + chrome)
 *      └─ Sections(view: vertical flow rendered from the model)
 */

import { SiteProvider, useSiteContent } from './controllers/SiteProvider.jsx';
import { useScrollJourney } from './controllers/useScrollJourney.js';
import { Sections } from './views/Sections.jsx';
import { Hud } from './views/chrome/Hud.jsx';

function Journey() {
  const { content } = useSiteContent();
  const { rootRef, railFillRef, counterRef } = useScrollJourney({
    sectionCount: content.panels.length,
  });

  return (
    <div ref={rootRef}>
      <div className="rail" aria-hidden="true">
        <div className="rail-fill" ref={railFillRef} />
      </div>

      <Hud
        brand={content.brand}
        brandAccent={content.brandAccent}
        counterRef={counterRef}
      />

      <Sections
        panels={content.panels}
        whatsappUrl={content.whatsappUrl}
        whatsappLabel={content.whatsappLabel}
      />
    </div>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <Journey />
    </SiteProvider>
  );
}
