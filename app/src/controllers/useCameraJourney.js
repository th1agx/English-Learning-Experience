/**
 * Controller layer — the camera.
 * The stage is fixed; the whole site lives on a vertical track that the
 * scroll passes THROUGH the camera (one scrubbed transform, buttery).
 *
 * Layers of the same system, never fighting over the same element:
 *  1. track translate3d      → GSAP ScrollTrigger scrub + Lenis (the pass)
 *  2. panel entrances/exits  → Framer Motion variants, reversible,
 *     springed, masked (driven by `active` prop from this controller)
 *  3. in-panel parallax      → [data-depth] drift, driven by each panel's
 *     local progress (written directly as transforms in the same onUpdate)
 *  4. horizontal crossing    → the levels strip [data-x] slides across
 *     the camera while its panel passes
 */

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, createSmoothScroll } from '../lib/animationEngine.js';

gsap.registerPlugin(useGSAP);

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* on narrow screens the levels strip wraps into a grid (CSS) instead of
   crossing the camera — the controller must not fight that layout */
const NARROW = '(max-width: 900px)';
const isNarrow = () => window.matchMedia(NARROW).matches;

export function useCameraJourney({ panelCount }) {
  const scrollSpaceRef = useRef(null);
  const trackRef = useRef(null);
  const railFillRef = useRef(null);
  const smoothRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // smooth scroll, independent lifecycle
  useEffect(() => {
    const smooth = createSmoothScroll();
    smoothRef.current = smooth;
    return () => {
      smoothRef.current = null;
      smooth.destroy();
    };
  }, []);

  // camera-native navigation: center a panel in the lens via Lenis itself
  // (a raw window.scrollTo would fight the lerp and snap back)
  const scrollToPanel = (index) => {
    const panel = trackRef.current?.children[index];
    if (!panel) return;
    const target = Math.max(0, panel.offsetTop + panel.offsetHeight / 2 - window.innerHeight / 2);
    if (smoothRef.current) smoothRef.current.scrollTo(target);
    else window.scrollTo({ top: target });
  };

  useGSAP(
    () => {
      const track = trackRef.current;
      const panels = Array.from(track.children);
      let maxY = 0;
      let offsets = []; // cached centers, recomputed on refresh

      const measure = () => {
        maxY = track.scrollHeight - window.innerHeight;
        // one extra viewport of travel so the finale can center
        scrollSpaceRef.current.style.height = `${track.scrollHeight + window.innerHeight}px`;
        offsets = panels.map((p) => p.offsetTop + p.offsetHeight / 2);
      };
      measure();

      const depthEls = panels.map((p) =>
        Array.from(p.querySelectorAll('[data-depth]')).map((el) => ({
          el,
          depth: parseFloat(el.dataset.depth),
        })),
      );
      const strip = track.querySelector('[data-x]');
      let stripDist = 0;
      if (strip) stripDist = Math.max(0, strip.scrollWidth - window.innerWidth + 96);

      ScrollTrigger.create({
        trigger: scrollSpaceRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        invalidateOnRefresh: true,
        onRefresh: () => {
          measure();
          if (strip) {
            if (isNarrow()) {
              strip.style.transform = '';
              stripDist = 0;
            } else {
              stripDist = Math.max(0, strip.scrollWidth - window.innerWidth + 96);
            }
          }
        },
        onUpdate: (self) => {
          const p = self.progress;
          const travel = p * maxY;

          // 1 — the site passes through the camera
          track.style.transform = `translate3d(0, ${-travel.toFixed(1)}px, 0)`;

          if (railFillRef.current) {
            railFillRef.current.style.transform = `scaleX(${p})`;
          }

          // 2 — which panel owns the lens right now
          const cameraCenter = travel + window.innerHeight / 2;
          let best = 0;
          let bestDist = Infinity;
          offsets.forEach((c, i) => {
            const d = Math.abs(c - cameraCenter);
            if (d < bestDist) { bestDist = d; best = i; }
          });
          setActiveIndex((prev) => (prev === best ? prev : best));

          // 3 — per-panel parallax from local progress
          // damped on narrow screens: full drift slices text at the viewport edge
          const damp = isNarrow() ? 0.45 : 1;
          panels.forEach((panel, i) => {
            const local = (offsets[i] - cameraCenter) / window.innerHeight; // 0 = centered
            depthEls[i].forEach(({ el, depth }) => {
              el.style.transform = `translate3d(0, ${(local * depth * damp).toFixed(1)}px, 0)`;
            });

            // 4 — horizontal crossing for the panel that owns the strip
            if (strip && panel.contains(strip) && !isNarrow()) {
              const t = clamp01((local + 0.9) / 1.8); // 0 before entering, 1 after leaving
              strip.style.transform = `translate3d(${(-t * stripDist).toFixed(1)}px, 0, 0)`;
            }
          });
        },
      });

      document.fonts?.ready.then(() => {
        measure();
        ScrollTrigger.refresh();
      });
    },
    { scope: scrollSpaceRef },
  );

  return { scrollSpaceRef, trackRef, railFillRef, activeIndex, panelCount, scrollToPanel };
}
