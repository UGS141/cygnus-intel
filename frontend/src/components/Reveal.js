import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export const FadeUp = ({ children, delay = 0, y = 26, className = '' }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Star4 = ({ size = 10, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 0c.9 7.1 4.9 11.1 12 12-7.1.9-11.1 4.9-12 12-.9-7.1-4.9-11.1-12-12C7.1 11.1 11.1 7.1 12 0Z" />
  </svg>
);

export const Kicker = ({ num, children, tone = 'dark' }) => (
  <FadeUp>
    <div
      className={`f-mono flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] ${
        tone === 'dark' ? 'text-cream/60' : 'text-navy/60'
      }`}
    >
      <Star4 size={9} className="text-gold" />
      <span className="text-gold">{num}</span>
      <span className={`h-px w-8 ${tone === 'dark' ? 'bg-cream/30' : 'bg-navy/30'}`} />
      <span>{children}</span>
    </div>
  </FadeUp>
);

export const Ph = ({ children }) => (
  <span className="f-mono text-gold">{children}</span>
);
