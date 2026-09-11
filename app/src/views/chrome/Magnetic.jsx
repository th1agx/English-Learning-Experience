/**
 * View layer — Magnetic: wraps any clickable so it leans toward the cursor
 * with spring physics and springs back on leave. Reusable hover language.
 */

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function Magnetic({ children, strength = 0.35, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 14, mass: 0.4 });

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: 'inline-block', x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
