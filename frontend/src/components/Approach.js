import { motion } from 'framer-motion';
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
        <svg
          viewBox="0 0 1200 200"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 h-[200px] w-full"
        >
          <motion.path
            d="M 50 150 C 250 20, 420 20, 600 100 C 780 180, 960 180, 1150 45"
            stroke="rgba(1,6,25,0.35)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </svg>
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
          data-testid="proposed-approach-disclaimer-footnote"
          className="f-mono mt-16 border-t border-linelight pt-5 text-[11px] leading-relaxed tracking-[0.14em] text-navy/55"
        >
          <span className="text-cobalt">[PROPOSED APPROACH — CONFIRM]</span> · Shown as a proposal
          for discussion — not yet a documented company process.
        </p>
      </FadeUp>
    </div>
  </section>
);
