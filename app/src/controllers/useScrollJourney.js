/**
 * Controller layer — scroll choreographer, one language per section.
 * Built on the official GSAP skills (gsap-react / scrolltrigger / performance):
 *  - useGSAP() scoped, Lenis synced to the GSAP ticker
 *  - transform-only tweens; masked line reveals (no plain fades)
 *  - continuous scrub parallax on EVERY section (nothing feels dead)
 *  - single pin (levels) animating a child with ease:"none"
 *  - triggers created top-to-bottom; refresh after webfonts
 */

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, createSmoothScroll } from '../lib/animationEngine.js';

gsap.registerPlugin(useGSAP);

export function useScrollJourney({ sectionCount }) {
  const rootRef = useRef(null);
  const railFillRef = useRef(null);
  const counterRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const smooth = createSmoothScroll();
    return () => smooth.destroy();
  }, []);

  const updateCounter = (index) => {
    if (!counterRef.current) return;
    counterRef.current.textContent = `${String(index).padStart(2, '0')} / ${String(sectionCount).padStart(2, '0')}`;
  };

  useGSAP(
    () => {
      const sections = gsap.utils.toArray('.section');

      sections.forEach((section, i) => {
        // ---- chrome: section counter ----
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => updateCounter(i + 1),
          onEnterBack: () => updateCounter(i + 1),
        });

        // ---- continuous life: scrub parallax on every section ----
        // elements tagged data-depth drift while the section crosses the
        // viewport — the page never sits still
        section.querySelectorAll('[data-depth]').forEach((el) => {
          const d = parseFloat(el.dataset.depth);
          gsap.fromTo(
            el,
            { y: d },
            {
              y: -d,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            },
          );
        });

        // ---- masked heading reveal: line rises from inside its frame ----
        section.querySelectorAll('.mask > *').forEach((line) => {
          gsap.from(line, {
            yPercent: 115,
            duration: 1.15,
            ease: 'power4.out',
            scrollTrigger: { trigger: section, start: 'top 70%', once: true },
          });
        });

        // ---- discrete pops (stamps, buttons): back.out overshoot ----
        section.querySelectorAll('[data-reveal="pop"]').forEach((el) => {
          gsap.from(el, {
            scale: 0.4,
            rotation: -6,
            duration: 0.8,
            ease: 'back.out(2.2)',
            scrollTrigger: { trigger: section, start: 'top 70%', once: true },
          });
        });

        // ---- grouped items enter staggered, skewed, straightening out ----
        section.querySelectorAll('[data-stagger]').forEach((group) => {
          const fromX = group.dataset.stagger === 'left' ? -90 : 90;
          gsap.from(group.children, {
            x: fromX,
            skewX: 5,
            opacity: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 68%', once: true },
          });
        });
      });

      // ---- per-section signature moves ----

      // method: steps fall in with a slight arc, title parallax already
      // tagged; plan rows sweep in from the right with rotation settle
      const planRows = rootRef.current.querySelectorAll('.plan-row');
      if (planRows.length) {
        gsap.from(planRows, {
          x: 140,
          rotation: 1.6,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.section-planos', start: 'top 62%', once: true },
        });
      }

      // levels: pinned hold — strip crosses horizontally (ease:none = 1:1),
      // and each level pops as the pin engages
      const levels = rootRef.current.querySelector('.section-niveis');
      const strip = levels?.querySelector('[data-x]');
      if (levels && strip) {
        gsap.from(levels.querySelectorAll('.lvl'), {
          scale: 0.55,
          y: 60,
          rotation: -5,
          opacity: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: 'back.out(1.9)',
          scrollTrigger: { trigger: levels, start: 'top 55%', once: true },
        });

        gsap.to(strip, {
          x: () => -(strip.scrollWidth - window.innerWidth + 96),
          ease: 'none',
          scrollTrigger: {
            trigger: levels,
            start: 'top top',
            end: '+=120%',
            pin: true,
            anticipatePin: 1,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }

      // cta: meta column slides up staggered while the mega unmask plays
      const cta = rootRef.current.querySelector('.section-cta');
      if (cta) {
        gsap.from(cta.querySelectorAll('.cta-meta-list li'), {
          y: 48,
          x: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: cta, start: 'top 65%', once: true },
        });
      }

      // ---- global journey progress ----
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

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      setReady(true);
    },
    { scope: rootRef },
  );

  return { rootRef, railFillRef, counterRef, ready };
}
