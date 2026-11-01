import { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { scrollToId } from '../lib/scroll';
import { OrbitalField } from './OrbitalField';

const EASE = [0.16, 1, 0.3, 1];

const H1Line = ({ i, children }) => {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? { y: 0 } : { y: '112%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, delay: 0.15 + i * 0.13, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export const Hero = () => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const contentX = useTransform(sx, (v) => v * -0.35);

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 30);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 24);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      data-testid="hero-section"
      className="relative overflow-hidden text-cream"
      style={{
        backgroundImage:
          'linear-gradient(rgba(244,240,230,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(244,240,230,0.045) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }}
    >
      <div className="relative mx-auto grid min-h-screen max-w-[1240px] grid-cols-1 items-center gap-8 px-6 pb-24 pt-24 md:px-10 lg:grid-cols-12 lg:gap-4 lg:pb-20">
        <motion.div
          style={reduce ? undefined : { y: yContent, opacity: opacityContent, x: contentX }}
          className="lg:col-span-7"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.6 }}
            className="f-mono flex items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-cream/90"
            data-testid="hero-eyebrow"
          >
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            CYGNUS AI LABS — AI Automation &amp; Intelligence
          </motion.p>
          <h1
            data-testid="hero-headline-text"
            className="f-display mt-6 text-[clamp(2.6rem,6.4vw,5.1rem)] font-extrabold leading-[1.03] tracking-[-0.02em]"
          >
            <H1Line i={0}>Intelligence</H1Line>
            <H1Line i={1}>with a long</H1Line>
            <H1Line i={2}>
              <span className="text-gold">horizon.</span>
            </H1Line>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: EASE }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream/80 md:text-base"
            data-testid="hero-subline"
          >
            Cygnus AI Labs builds AI automation and intelligence systems: software that takes
            real work off human hands today — and a serious, step-by-step path toward machines
            that plan, reason and act over longer horizons. Practical now, ambitious on purpose.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              data-testid="hero-explore-projects-cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('#work');
              }}
              className="f-mono inline-flex items-center gap-3 rounded-[2px] bg-gold px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-navy transition-colors duration-300 hover:bg-cream"
            >
              Explore projects
              <ArrowDown size={14} aria-hidden="true" />
            </a>
            <a
              href="#approach"
              data-testid="hero-discover-approach-cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('#approach');
              }}
              className="f-mono inline-flex items-center gap-3 rounded-[2px] border border-cream/30 px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Discover our approach
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5">
          <OrbitalField x={reduce ? 0 : sx} y={reduce ? 0 : sy} paused={paused} />
        </div>
      </div>

      {!reduce && (
        <button
          type="button"
          data-testid="hero-motion-toggle"
          aria-pressed={paused}
          onClick={() =>
            setPaused((p) => {
              window.dispatchEvent(new CustomEvent('cygnus:motion', { detail: { paused: !p } }));
              return !p;
            })
          }
          className="f-mono absolute bottom-[64px] right-6 z-10 inline-flex items-center gap-2 border border-cream/25 px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] text-cream/70 transition-colors duration-200 hover:border-gold hover:text-gold md:right-10"
        >
          {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
          {paused ? 'Resume motion' : 'Pause motion'}
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 border-t border-linedark">
        <div className="f-mono mx-auto flex max-w-[1240px] items-center justify-between px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-cream/60 md:px-10">
          <span>Fig. 01 — Orbital field</span>
          <span className="hidden md:inline">Named for Cygnus — the swan</span>
          <span className="flex items-center gap-3">
            Scroll
            <span className="relative block h-9 w-px overflow-hidden bg-cream/15" aria-hidden="true">
              <span className="scroll-cue absolute inset-x-0 top-0 h-3.5 bg-gold" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};
