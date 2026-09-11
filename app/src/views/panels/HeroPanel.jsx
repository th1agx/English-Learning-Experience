/**
 * View layer — Hero section. Pure presentation.
 * Mount animation via Framer Motion; scroll choreography (wipe/slide/pop
 * reveals, parallax) is tagged with data-attributes owned by the controller.
 */

import { motion } from 'framer-motion';

const lineVariants = {
  hidden: { y: 110 },
  show: (i) => ({
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HeroPanel({ id, kicker, titleLines, lede, facts, stamp }) {
  return (
    <section className="section">
      <div className="frame">
        <span className="hero-stamp" data-reveal="pop" data-reveal-rot="6">{stamp}</span>

        <div className="mono-label" data-reveal="slide" data-depth="26">
          <span>{kicker}</span>
          <span className="n">— {id}</span>
        </div>

        <h1 className="mega" data-reveal="wipe">
          {titleLines.map((line, i) => (
            <span key={i}>
              <motion.span
                className={`${line.accent ? 'accent' : ''} ${line.block ? 'block' : ''} ${line.outline ? 'outline' : ''}`}
                variants={lineVariants}
                custom={i}
                initial="hidden"
                animate="show"
                style={{ display: 'inline-block', overflow: 'hidden' }}
              >
                {line.text}
              </motion.span>
              <br />
            </span>
          ))}
        </h1>

        <p className="lede" data-reveal="slide" data-depth="48" style={{ marginTop: 56 }}>
          {lede}
        </p>

        <div className="hero-foot" data-reveal="slide" data-depth="24">
          {facts.map((f) => (
            <div key={f.label}>
              <b>{f.value}</b>
              {f.label}
            </div>
          ))}
        </div>

        <span className="side-no">01</span>
      </div>
    </section>
  );
}
