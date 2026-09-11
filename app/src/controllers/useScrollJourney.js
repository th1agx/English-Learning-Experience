/**
 * Controller layer — scroll choreographer (vertical pins + dynamic reveals).
 * Owns every GSAP side effect so views stay pure.
 *
 * Motion language (no plain fade-ins):
 *  - wipe  : headings unmask sideways via clip-path (power4.inOut)
 *  - slide : blocks enter skewed from the side, straightening out
 *  - pop   : stamps/labels scale+rotate into place
 *  - pin   : each section holds the camera while its layers parallax at
 *            their own speeds; tagged strips cross horizontally mid-pin
 *
 * Performance: only transform/clip-path animate (GPU-friendly),
 * anticipatePin avoids pin jumps, triggers refresh once fonts settle.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/animationEngine.js';

const PIN_TRAVEL = '+=100%';

export function useScrollJourney({ sectionCount }) {
  const rootRef = useRef(null);
  const railFillRef = useRef(null);
  const counterRef = useRef(null);
  const [ready, setReady] = useState(false);

  const updateCounter = useCallback(
    (index) => {
      if (!counterRef.current) return;
      counterRef.current.textContent = `${String(index).padStart(2, '0')} / ${String(sectionCount).padStart(2, '0')}`;
    },
    [sectionCount],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.section');

      const reveal = (el, trigger) => {
        const kind = el.dataset.reveal || 'slide';
        const start = { trigger: trigger || el, start: 'top 78%' };

        if (kind === 'wipe') {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power4.inOut', scrollTrigger: start },
          );
        } else if (kind === 'pop') {
          gsap.from(el, {
            scale: 0.4,
            rotation: el.dataset.revealRot ? parseFloat(el.dataset.revealRot) : -8,
            duration: 0.8,
            ease: 'back.out(2)',
            scrollTrigger: start,
          });
        } else {
          // slide: enters skewed from the left, straightens as it lands
          gsap.from(el, {
            x: -90,
            skewY: 4,
            opacity: 0.001,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: start,
          });
        }
      };

      sections.forEach((section, i) => {
        const isFinale = section.classList.contains('section-cta');

        section.querySelectorAll('[data-reveal], .reveal').forEach((el) => reveal(el, section));

        if (isFinale) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: PIN_TRAVEL,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.4,
            invalidateOnRefresh: true,
            onToggle: (self) => self.isActive && updateCounter(i + 1),
          },
        });

        section.querySelectorAll('[data-depth]').forEach((el) => {
          const depth = parseFloat(el.dataset.depth);
          tl.fromTo(el, { y: depth }, { y: -depth, duration: 1, ease: 'none' }, 0);
        });

        const xEl = section.querySelector('[data-x]');
        if (xEl) {
          tl.fromTo(
            xEl,
            { x: 0 },
            { x: () => -(xEl.scrollWidth - window.innerWidth + 96), duration: 1, ease: 'none' },
            0,
          );
        }
      });

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (railFillRef.current) {
            railFillRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });

      // triggers settle only after webfonts size the headings correctly
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      setReady(true);
    }, rootRef);

    return () => ctx.revert();
  }, [updateCounter]);

  return { rootRef, railFillRef, counterRef, ready };
}
