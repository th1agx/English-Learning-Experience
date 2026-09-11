/** View layer — Plans panel: title masked left, rows sweep in from the right. */

import { motion } from 'framer-motion';
import { panel, lineUp, slideL, slideR, rise } from '../motion.js';

export function PlansPanel({ active, id, kicker, title, rows, note }) {
  return (
    <motion.section
      className="section section-planos"
      variants={panel}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
    >
      <div className="frame">
        <motion.div className="mono-label" variants={slideL}>
          <span>{kicker}</span>
          <span className="n">— {id}</span>
        </motion.div>

        <div data-depth="50">
          <div className="line-mask">
            <motion.h2
              className="mega"
              variants={lineUp}
              style={{ maxWidth: '12ch', fontSize: 'clamp(40px, 5vw, 72px)' }}
            >
              {title}
            </motion.h2>
          </div>
        </div>

        <motion.div className="plan-list" variants={panel} data-depth="26">
          {rows.map((row) => (
            <motion.div
              className="plan-row"
              key={row.freq}
              variants={{
                hidden: { x: 140, rotate: 1.5, opacity: 0 },
                show: {
                  x: 0, rotate: 0, opacity: 1,
                  transition: { type: 'spring', stiffness: 120, damping: 17 },
                },
              }}
            >
              <span className="freq">{row.freq}</span>
              <span className="desc">{row.desc}</span>
              <span className="unit">{row.unit}</span>
              <span className="price">{row.price}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.p className="plan-note" variants={rise}>{note}</motion.p>

        <span className="side-no" data-depth="90">04</span>
      </div>
    </motion.section>
  );
}
