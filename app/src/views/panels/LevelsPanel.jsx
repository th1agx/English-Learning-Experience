/** View layer — Levels panel: levels pop in; the strip crosses the camera
 *  horizontally (controller-driven via data-x, tied to the panel's pass). */

import { motion } from 'framer-motion';
import { panel, lineUp, slideL, pop } from '../motion.js';

export function LevelsPanel({ active, id, kicker, title, levels }) {
  return (
    <motion.section
      className="section section-niveis"
      variants={panel}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
    >
      <div className="frame">
        <motion.div className="mono-label" variants={slideL}>
          <span>{kicker}</span>
        </motion.div>

        <div data-depth="60">
          <div className="line-mask">
            <motion.h2 className="mega" variants={lineUp}>{title}</motion.h2>
          </div>
        </div>

      </div>

      <div className="lvl-strip" data-x>
        {levels.map((lvl, i) => (
          <span key={lvl.code} style={{ display: 'contents' }}>
            {i > 0 && <span className="lvl-arrow">→</span>}
            <motion.div
              className="lvl"
              variants={{
                hidden: { scale: 0.5, y: 60, rotate: -5, opacity: 0 },
                show: {
                  scale: 1, y: 0, rotate: 0, opacity: 1,
                  transition: { type: 'spring', stiffness: 240, damping: 17 },
                },
              }}
            >
              <b>{lvl.code}</b>
              <span>{lvl.name}</span>
              {lvl.desc && <span className="lvl-desc">{lvl.desc}</span>}
            </motion.div>
          </span>
        ))}
      </div>
    </motion.section>
  );
}
