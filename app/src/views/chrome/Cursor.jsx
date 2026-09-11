/**
 * View layer — Cursor: pixel-art arrow + lagging brutalist frame.
 * The arrow tracks the pointer exactly; the butter frame trails with a
 * spring and spins into a diamond over anything clickable.
 * Only mounted for fine pointers (mouse); touch keeps native behavior.
 */

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* classic blocky arrow as a bitmap (1 = pixel), tip at top-left */
const BITMAP = [
  'X......',
  'XX.....',
  'X.X....',
  'X..X...',
  'X...X..',
  'X....X.',
  'X..XXX.',
  'X.X....',
  'XX.....',
  'X......',
];

function PixelArrow({ size = 3, fill }) {
  return (
    <svg
      width={BITMAP[0].length * size + 2}
      height={BITMAP.length * size + 2}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {BITMAP.map((row, y) =>
        row.split('').map((cell, x) =>
          cell === 'X' ? (
            <rect key={`${x}-${y}`} x={x * size + 1} y={y * size + 1} width={size} height={size} fill={fill} />
          ) : null,
        ),
      )}
    </svg>
  );
}

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const arrowX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.2 });
  const arrowY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.2 });
  const frameX = useSpring(x, { stiffness: 160, damping: 18, mass: 0.5 });
  const frameY = useSpring(y, { stiffness: 160, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e) => {
      setHovering(!!e.target.closest?.('a, button, [data-hover]'));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing brutalist frame — spins to a diamond over clickables */}
      <motion.div
        className="cursor-frame"
        style={{ x: frameX, y: frameY }}
        animate={{
          scale: hovering ? 1.5 : 1,
          rotate: hovering ? 45 : 0,
          backgroundColor: hovering ? 'var(--butter)' : 'rgba(245, 197, 24, 0)',
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        aria-hidden="true"
      />
      {/* pixel arrow exactly at the pointer */}
      <motion.div
        className="cursor-arrow"
        style={{ x: arrowX, y: arrowY, opacity: visible ? 1 : 0 }}
        animate={{ scale: hovering ? 1.35 : 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 16 }}
        aria-hidden="true"
      >
        <PixelArrow fill="var(--paper)" size={3} />
        <span className="cursor-arrow-ink">
          <PixelArrow fill="var(--ink)" size={3} />
        </span>
      </motion.div>
    </>
  );
}
