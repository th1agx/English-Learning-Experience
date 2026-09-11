/**
 * Infrastructure — smooth scroll + animation engine adapters.
 * Lenis (lerp wheel/touch smoothing) drives the scroll, GSAP ScrollTrigger
 * reads it via the shared ticker. Both are only imported here (DIP).
 */

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Creates a Lenis instance synced with the GSAP ticker. */
export function createSmoothScroll() {
  const lenis = new Lenis({
    lerp: 0.12,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return {
    destroy: () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    },
  };
}

export { gsap, ScrollTrigger };
