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
import { Cursor } from './views/chrome/Cursor.jsx';

function Journey() {
  const { content } = useSiteContent();
  const { scrollSpaceRef, trackRef, railFillRef, activeIndex, scrollToPanel } = useCameraJourney({
    panelCount: content.panels.length,
  });

  // short labels from the panel kickers, dropping leading articles:
  // "O método" → "Método", "Dúvidas frequentes" → "Dúvidas"
  const nav = content.panels
    .map((p, index) => ({ index, kicker: p.props.kicker }))
    .filter((item) => item.index > 0 && item.index < content.panels.length - 1)
    .map((item) => ({
      index: item.index,
      label: item.kicker.replace(/^(o|a|os|as)\s+/i, '').split(' ')[0],
    }));

  return (
    <>
      <div className="rail" aria-hidden="true">
        <div className="rail-fill" ref={railFillRef} />
      </div>

      <Hud
        brand={content.brand}
        nav={nav}
        activeIndex={activeIndex}
        total={content.panels.length}
        onNavigate={scrollToPanel}
      />

      <Cursor />

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
