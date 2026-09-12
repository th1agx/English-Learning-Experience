/** View layer — FAQ panel: question rows stagger up from masks, answers rise. */

import { motion } from 'framer-motion';
import { panel, lineUp, slideL, rise } from '../motion.js';

export function FaqPanel({ active, kicker, title, items }) {
  return (
    <motion.section
      className="section section-faq"
      variants={panel}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
    >
      <div className="frame">
        <motion.div className="mono-label" variants={slideL}>
          <span>{kicker}</span>
        </motion.div>

        <div data-depth="50">
          <div className="line-mask">
            <motion.h2 className="mega" variants={lineUp} style={{ fontSize: 'clamp(40px, 5vw, 76px)' }}>
              {title}
            </motion.h2>
          </div>
        </div>

        <motion.ul className="faq-list" variants={panel} data-depth="26">
          {items.map((item) => (
            <motion.li
              className="faq-item"
              key={item.q}
              variants={{
                hidden: { y: 60, opacity: 0 },
                show: {
                  y: 0, opacity: 1,
                  transition: { type: 'spring', stiffness: 140, damping: 18 },
                },
              }}
            >
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
