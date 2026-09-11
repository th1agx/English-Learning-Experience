/**
 * View layer — Hero section. Pure presentation.
 * Mount animation via Framer Motion; scroll choreography (reveal,
 * parallax) is tagged with classes/data-attributes owned by the controller.
 */

import { motion } from 'framer-motion';

const lineVariants = {
  hidden: { y: 90, opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.15 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HeroPanel({ id, kicker, titleLines, lede, facts, stamp }) {
  return (
    <section className="section section-hero">
      <span className="hero-stamp">{stamp}</span>

      <div className="mono-label reveal" data-depth="26">
        <span>{kicker}</span>
        <span className="n">— {id}</span>
      </div>

      <h1 className="mega">
        {titleLines.map((line, i) => (
          <motion.span
            key={i}
            className={`${line.accent ? 'accent' : ''} ${line.block ? 'block' : ''} ${line.outline ? 'outline' : ''}`}
            variants={lineVariants}
            custom={i}
            initial="hidden"
            animate="show"
            style={{ display: 'inline-block' }}
          >
            {line.text}
            <br />
          </motion.span>
        ))}
      </h1>

      <p className="lede reveal" data-depth="48" style={{ margin: '48px auto 0' }}>
        {lede}
      </p>

      <div className="hero-foot reveal" data-depth="24">
        {facts.map((f) => (
          <div key={f.label}>
            <b>{f.value}</b>
            {f.label}
          </div>
        ))}
      </div>
    </section>
  );
}
