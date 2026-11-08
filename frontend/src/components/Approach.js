import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FadeUp, Kicker } from './Reveal';

const STEPS = [
  {
    n: '01',
    title: 'Map',
    body: 'Understand the work as it actually happens — watch, measure, and find where the hours truly go.',
  },
  {
    n: '02',
    title: 'Design',
    body: 'Architect the system on paper first: what the AI does, what humans decide, where the guardrails sit.',
  },
  {
    n: '03',
    title: 'Build',
    body: 'Build narrow, ship early, and put the automation in front of real work under real constraints.',
  },
  {
    n: '04',
    title: 'Direct',
    body: 'Measure against the original problem, correct course, and widen the system’s range only as trust is earned.',
  },
];

const PlottedLine = () => {
  const reduce = useReducedMotion();
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const lineRef = useRef(null);
  const starRef = useRef(null);
  const glowRef = useRef(null);
  const [inView, setInView] = useState(true);

  // IntersectionObserver to pause loop off-screen (saving battery & CPU)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const line = lineRef.current;
    const star = starRef.current;
    const glow = glowRef.current;
    if (!path || !line || !star) return undefined;

    const totalLen = path.getTotalLength ? path.getTotalLength() : 1162;
    line.style.strokeDasharray = `${totalLen}`;

    // Under prefers-reduced-motion, show a static line and star
    if (reduce) {
      line.style.strokeDashoffset = '0';
      line.style.opacity = '1';
      const endPt = path.getPointAtLength ? path.getPointAtLength(totalLen) : { x: 1150, y: 45 };
      star.setAttribute('transform', `translate(${endPt.x}, ${endPt.y}) scale(0.65)`);
      star.style.opacity = '1';
      if (glow) glow.style.opacity = '0';
      return undefined;
    }

    let raf = 0;
    let startTime = null;
    let paused = false;

    const onMotion = (e) => {
      paused = Boolean(e.detail && e.detail.paused);
    };
    window.addEventListener('cygnus:motion', onMotion);

    // Timing configuration (seconds):
    // 0.0s - 2.0s: Travel phase (star at leading edge, line drawing from left to right)
    // 2.0s - 3.2s: Pause at end (star pauses at (1150, 45) and emits one soft, elegant glint)
    // 3.2s - 3.8s: Gentle fade out
    // 3.8s - 4.2s: Seamless reset and repeat
    const TRAVEL_DUR = 2.0;
    const GLINT_START = 2.2;
    const GLINT_DUR = 0.7;
    const PAUSE_END = 3.2;
    const FADE_DUR = 0.6;
    const TOTAL_CYCLE = 4.2;
    const BASE_SCALE = 0.65;

    const tick = (now) => {
      if (!inView || paused) {
        startTime = null;
        raf = requestAnimationFrame(tick);
        return;
      }

      if (!startTime) startTime = now;
      const elapsed = ((now - startTime) / 1000) % TOTAL_CYCLE;

      if (elapsed < TRAVEL_DUR) {
        // --- 1. TRAVEL PHASE ---
        const p = elapsed / TRAVEL_DUR;
        // Smooth easeInOut curve matching original animation pacing
        const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const dist = ease * totalLen;
        const pt = path.getPointAtLength(dist);

        line.style.strokeDashoffset = `${totalLen - dist}`;
        line.style.opacity = '1';

        star.setAttribute('transform', `translate(${pt.x}, ${pt.y}) scale(${BASE_SCALE})`);
        star.style.opacity = '1';
        if (glow) glow.style.opacity = '0';
      } else if (elapsed < PAUSE_END) {
        // --- 2. PAUSE & SOFT GLINT PHASE ---
        const endPt = path.getPointAtLength(totalLen);
        line.style.strokeDashoffset = '0';
        line.style.opacity = '1';

        if (elapsed >= GLINT_START && elapsed < GLINT_START + GLINT_DUR) {
          const gp = (elapsed - GLINT_START) / GLINT_DUR;
          const glintPulse = Math.sin(gp * Math.PI);
          const scale = BASE_SCALE + glintPulse * 0.28; // Softly expands to ~0.93 and settles
          star.setAttribute('transform', `translate(${endPt.x}, ${endPt.y}) scale(${scale})`);
          star.style.opacity = '1';
          if (glow) glow.style.opacity = `${glintPulse * 0.7}`;
        } else {
          star.setAttribute('transform', `translate(${endPt.x}, ${endPt.y}) scale(${BASE_SCALE})`);
          star.style.opacity = '1';
          if (glow) glow.style.opacity = '0';
        }
      } else {
        // --- 3. FADE & RESET PHASE ---
        const endPt = path.getPointAtLength(totalLen);
        const fadeP = (elapsed - PAUSE_END) / FADE_DUR;
        const alpha = Math.max(0, 1 - fadeP);

        line.style.strokeDashoffset = '0';
        line.style.opacity = `${alpha}`;

        star.setAttribute('transform', `translate(${endPt.x}, ${endPt.y}) scale(${BASE_SCALE})`);
        star.style.opacity = `${alpha}`;
        if (glow) glow.style.opacity = '0';
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('cygnus:motion', onMotion);
    };
  }, [reduce, inView]);

  return (
    <div ref={containerRef} className="absolute inset-x-0 top-0 h-[200px] w-full pointer-events-none">
      <svg
        viewBox="0 0 1200 200"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <radialGradient id="approachStarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FA9720" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#FA9720" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FA9720" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Faint reference guide track */}
        <path
          ref={pathRef}
          d="M 50 150 C 250 20, 420 20, 600 100 C 780 180, 960 180, 1150 45"
          stroke="rgba(1,6,25,0.08)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Active animated line drawn progressively */}
        <path
          ref={lineRef}
          d="M 50 150 C 250 20, 420 20, 600 100 C 780 180, 960 180, 1150 45"
          stroke="rgba(1,6,25,0.4)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Cygnus 4-point star traveling at the leading edge */}
        <g ref={starRef} style={{ willChange: 'transform, opacity' }}>
          {/* Subtle soft glint halo when pausing at the end */}
          <circle
            ref={glowRef}
            cx="0"
            cy="0"
            r="22"
            fill="url(#approachStarGlow)"
            style={{ transition: 'opacity 0.1s linear' }}
          />
          {/* Cygnus logo star asset centered at (0, 0) */}
          <g transform="translate(-12, -12)">
            <path
              d="M12 0c.9 7.1 4.9 11.1 12 12-7.1.9-11.1 4.9-12 12-.9-7.1-4.9-11.1-12-12C7.1 11.1 11.1 7.1 12 0Z"
              fill="#FA9720"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const Approach = () => (
  <section id="approach" data-testid="how-cygnus-works-section" className="bg-paper text-navy">
    <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 lg:py-32">
      <Kicker num="03" tone="light">
        How Cygnus works
      </Kicker>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <FadeUp className="lg:col-span-7">
          <h2 className="f-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.12]">
            A working method, plotted before it is built.
          </h2>
        </FadeUp>
        <FadeUp delay={0.12} className="lg:col-span-4 lg:col-start-9">
          <p className="text-[15px] leading-relaxed text-navy/75">
            Four moves, in order. Simple enough to explain, strict enough to run.
          </p>
        </FadeUp>
      </div>

      <div className="relative mt-16 hidden lg:block">
        <PlottedLine />
        <div className="grid grid-cols-4 gap-10 pt-2">
          {STEPS.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.12}>
              <div
                data-testid={`process-step-node-${i + 1}`}
                className="f-mono flex h-12 w-12 items-center justify-center rounded-full border border-navy/40 bg-paper text-xs"
              >
                {s.n}
              </div>
              <h3 className="f-display mt-7 text-xl font-bold tracking-tight md:text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/75">{s.body}</p>
            </FadeUp>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-10 border-l border-linelight pl-7 lg:hidden">
        {STEPS.map((s, i) => (
          <FadeUp key={s.n} delay={i * 0.08}>
            <div className="flex items-baseline gap-4">
              <span className="f-mono text-xs text-cobalt" data-testid={`process-step-node-${i + 1}`}>
                {s.n}
              </span>
              <h3 className="f-display text-xl font-bold tracking-tight">{s.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-navy/75">{s.body}</p>
          </FadeUp>
        ))}
      </div>

      <FadeUp>
        <p
          data-testid="approach-methodology-note"
          className="f-mono mt-16 border-t border-linelight pt-5 text-[11px] leading-relaxed tracking-[0.14em] text-navy/55"
        >
          Engineered for production reliability: structured discovery, architectural review, staged delivery, and continuous measurement.
        </p>
      </FadeUp>
    </div>
  </section>
);

export default Approach;
