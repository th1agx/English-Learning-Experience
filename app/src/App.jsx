/**
 * App — composition root.
 *   SiteProvider (controller: DI container, loads the model)
 *   └─ Journey    (controller: the camera — track pass, parallax, crossing)
 *      └─ Stage   (view: fixed camera + track of panels)
 */

import { SiteProvider, useSiteContent } from './controllers/SiteProvider.jsx';
import { useCameraJourney } from './controllers/useCameraJourney.js';
import { Sections } from './views/Sections.jsx';
import { Hud } from './views/chrome/Hud.jsx';

function Journey() {
  const { content } = useSiteContent();
  const { scrollSpaceRef, trackRef, railFillRef, activeIndex } = useCameraJourney({
    panelCount: content.panels.length,
  });

  return (
    <>
      <div className="rail" aria-hidden="true">
        <div className="rail-fill" ref={railFillRef} />
      </div>

      <Hud
        brand={content.brand}
        brandAccent={content.brandAccent}
        index={activeIndex}
        total={content.panels.length}
      />

      {/* the camera: fixed; the site passes through it */}
      <div className="stage">
        <div className="track" ref={trackRef}>
          <Sections
            panels={content.panels}
            activeIndex={activeIndex}
            whatsappUrl={content.whatsappUrl}
            whatsappLabel={content.whatsappLabel}
          />
        </div>
      </div>

      {/* invisible element whose height funds the scroll journey */}
      <div className="scroll-space" ref={scrollSpaceRef} aria-hidden="true" />
    </>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <Journey />
    </SiteProvider>
  );
}
