/**
 * Controller layer — scroll choreographer (vertical pins + dynamic reveals).
 * Owns every GSAP side effect so views stay pure:
 *  - each section pins while the camera "holds", its layers parallax past it;
 *  - content reveals stagger in as a section approaches the viewport;
 *  - the levels strip translates horizontally *inside* its vertical pin;
 *  - chrome state: progress rail + section counter.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/animationEngine.js';

const PIN_TRAVEL = '+=140%'; // scroll distance each pinned section holds the camera

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

      sections.forEach((section, i) => {
        const isFinale = section.classList.contains('section-cta');
        if (isFinale) {
          // finale: rises into place as the reader arrives, then rests
          gsap.from(section.querySelectorAll('.reveal'), {
            scrollTrigger: { trigger: section, start: 'top 75%' },
            y: 80,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
          });
          return;
        }

        // dynamic entrance as the section approaches the camera
        gsap.from(section.querySelectorAll('.reveal'), {
          scrollTrigger: { trigger: section, start: 'top 65%' },
          y: 70,
          opacity: 0,
          duration: 0.95,
          stagger: 0.09,
          ease: 'power3.out',
        });

        // pinned hold: layers drift through the camera at their own speeds
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: PIN_TRAVEL,
            pin: true,
            scrub: 0.6,
            onToggle: (self) => self.isActive && updateCounter(i + 1),
          },
        });

        section.querySelectorAll('[data-depth]').forEach((el) => {
          const depth = parseFloat(el.dataset.depth);
          tl.fromTo(el, { y: depth }, { y: -depth, duration: 1, ease: 'none' }, 0);
        });

        // horizontal moment: tagged strips cross the camera mid-pin
        const xEl = section.querySelector('[data-x]');
        if (xEl) {
          tl.fromTo(
            xEl,
            { x: 0 },
            { x: () => -(xEl.scrollWidth - window.innerWidth + 72), duration: 1, ease: 'none' },
            0,
          );
        }
      });

      // global journey progress for the top rail
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

      ScrollTrigger.refresh();
      setReady(true);
    }, rootRef);

    return () => ctx.revert();
  }, [updateCounter]);

  return { rootRef, railFillRef, counterRef, ready };
}
