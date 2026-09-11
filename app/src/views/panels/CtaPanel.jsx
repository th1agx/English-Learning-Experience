/** View layer — CTA finale: masked mega, magnetic button, meta column stagger. */

import { motion } from 'framer-motion';
import { panel, lineUp, slideL, slideR, pop, rise } from '../motion.js';
import { Magnetic } from '../chrome/Magnetic.jsx';

export function CtaPanel({ active, kicker, titleTop, titleHighlight, titleBottom, lede, whatsappUrl, whatsappLabel, meta }) {
  const metaItems = meta.split('·').map((m) => m.trim());

  return (
    <motion.section
      className="section section-cta"
      aria-label="Contato"
      variants={panel}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
    >
      <div className="frame">
        <motion.div className="mono-label" variants={slideL}>
          <span>{kicker}</span>
          <span>→ whatsapp</span>
        </motion.div>

        <div className="cta-cols">
          <div data-depth="40">
            <div className="line-mask">
              <motion.h2 className="mega" variants={lineUp}>
                {titleTop}
              </motion.h2>
            </div>
            <div className="line-mask">
              <motion.h2 className="mega" variants={lineUp}>
                <em>{titleHighlight}</em> {titleBottom}
              </motion.h2>
            </div>
            <motion.p className="lede" variants={rise}>{lede}</motion.p>
            <Magnetic strength={0.4}>
              <motion.a
                className="cta-button"
                variants={pop}
                initial="hidden"
                animate={active ? 'show' : 'hidden'}
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.94, rotate: 0 }}
              >
                {whatsappLabel}
              </motion.a>
            </Magnetic>
          </div>

          <ul className="cta-meta-list">
            {metaItems.map((m) => (
              <motion.li key={m} variants={slideR}>
                <b>{m}</b>ceff education — english class
              </motion.li>
            ))}
          </ul>
        </div>

      </div>
    </motion.section>
  );
}
