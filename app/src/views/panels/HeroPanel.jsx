/** View layer — Hero panel: framer entrances; parallax on wrappers (data-depth). */

import { motion } from 'framer-motion';
import { panel, lineUp, slideL, pop, rise } from '../motion.js';

export function HeroPanel({ active, kicker, titleLines, lede, facts, stamp, band }) {
  const bandItems = [...band, ...band]; // duplicated for the seamless loop
  return (
    <motion.section
      className="section section-hero"
      variants={panel}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
    >
      <div className="frame">
        <motion.span className="hero-stamp" variants={pop}>{stamp}</motion.span>

        <motion.div className="mono-label" variants={slideL} data-depth="26">
          <span>{kicker}</span>
          <span className="n">— 01</span>
        </motion.div>

        <h1 className="mega">
          {titleLines.map((line, i) => (
            <div className="line-mask" key={i}>
              <motion.span
                className={`mega ${line.accent ? 'accent' : ''} ${line.block ? 'block' : ''} ${line.outline ? 'outline' : ''}`}
                variants={lineUp}
                style={{ display: 'inline-block' }}
              >
                {line.text}
              </motion.span>
            </div>
          ))}
        </h1>

        <motion.p className="lede" variants={rise} data-depth="48" style={{ marginTop: 56 }}>
          {lede}
        </motion.p>

        <motion.div className="hero-foot" variants={panel} data-depth="24">
          {facts.map((f) => (
            <motion.div key={f.label} variants={slideL}>
              <b>{f.value}</b>
              {f.label}
            </motion.div>
          ))}
        </motion.div>

        <span className="side-no" data-depth="90">01</span>
      </div>

      {/* marquee band pinned to the section's bottom edge */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {bandItems.map((item, i) => (
            <span key={i}>
              {item} <i className="star">★</i>
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
