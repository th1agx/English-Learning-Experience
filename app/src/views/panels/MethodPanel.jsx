/** View layer — Method panel: title masked left, steps spring from the left. */

import { motion } from 'framer-motion';
import { panel, lineUp, slideL, slideR, rise } from '../motion.js';

export function MethodPanel({ active, id, kicker, title, steps }) {
  return (
    <motion.section
      className="section"
      variants={panel}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
    >
      <div className="frame">
        <motion.div className="mono-label" variants={slideL}>
          <span>{kicker}</span>
          <span className="n">— {id}</span>
        </motion.div>

        <div className="metodo-cols">
          <div data-depth="50">
            <div className="line-mask">
              <motion.h2 className="mega" variants={lineUp} style={{ fontSize: 'clamp(44px, 5.5vw, 84px)' }}>
                {title}
              </motion.h2>
            </div>
            <motion.p className="lede" variants={rise} style={{ marginTop: 40 }}>
              O conteúdo das aulas nasce do teste de nivelamento — cada etapa acontece no seu ritmo.
            </motion.p>
          </div>
          <div>
            {steps.map((s) => (
              <motion.div className="metodo-item" key={s.n} variants={slideR}>
                <span className="n">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <span className="side-no" data-depth="90">02</span>
      </div>
    </motion.section>
  );
}
