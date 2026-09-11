/**
 * View layer — shared Framer Motion vocabulary.
 * Entrances are reversible (hidden ↔ show as panels enter/leave the camera),
 * springed and masked — no plain fades.
 */

export const panel = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/** rises from inside its .line-mask wrapper (overflow hidden) */
export const lineUp = {
  hidden: { yPercent: 118 },
  show: {
    yPercent: 0,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
};

/** slides in skewed from the left, straightens with a spring */
export const slideL = {
  hidden: { x: -80, skewX: 6, opacity: 0 },
  show: {
    x: 0,
    skewX: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 130, damping: 18 },
  },
};

/** slides in from the right */
export const slideR = {
  hidden: { x: 90, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 130, damping: 18 },
  },
};

/** elastic pop with overshoot (stamps, buttons, levels) */
export const pop = {
  hidden: { scale: 0.35, rotate: -8, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 280, damping: 15 },
  },
};

/** subtle rise for supporting copy */
export const rise = {
  hidden: { y: 46, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
