import { FadeUp, Kicker, Ph } from './Reveal';

const PRINCIPLES = [
  {
    n: '01',
    title: 'Human direction',
    body: 'People decide what a system is for, what it may do, and when it must stop. That is a design requirement, not a preference.',
  },
  {
    n: '02',
    title: 'Honesty about capability',
    body: 'We would rather lose a project than oversell one. If a system cannot do something yet, we say so in writing.',
  },
  {
    n: '03',
    title: 'Long-horizon responsibility',
    body: 'Ambition toward advanced intelligence raises the stakes on alignment, oversight and reversibility. We treat them as engineering problems, from the first prototype onward.',
  },
];

export const Trust = () => (
  <section id="trust" data-testid="trust-responsibility-section" className="bg-paper text-navy">
    <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 lg:py-32">
      <Kicker num="05" tone="light">
        Trust &amp; responsibility
      </Kicker>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <FadeUp className="lg:col-span-7">
          <h2 className="f-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.12]">
            Serious power, plainly governed.
          </h2>
        </FadeUp>
        <FadeUp delay={0.12} className="lg:col-span-4 lg:col-start-9">
          <p className="text-[15px] leading-relaxed text-navy/75">
            What follows are points of view we hold — not certifications, audits or guarantees.
            No customers, metrics or case studies are claimed on this page; only what we can stand
            behind.
          </p>
        </FadeUp>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-px bg-linelight md:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <FadeUp key={p.n} delay={i * 0.1} className="bg-paper">
            <div className="h-full border border-linelight bg-paper p-8 md:p-10" data-testid={`trust-principle-card-${i + 1}`}>
              <p className="f-mono text-xs text-cobalt">{p.n}</p>
              <h3 className="f-display mt-5 text-xl font-bold tracking-tight md:text-2xl">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-navy/75">{p.body}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp>
        <p
          data-testid="trust-placeholder-note"
          className="f-mono mt-12 text-[11px] leading-relaxed tracking-[0.14em] text-navy/55"
        >
          <span className="f-mono text-gold">Sample:</span> model cards for every deployed system;
          quarterly capability and alignment reviews.{' '}
          <span className="text-cobalt">(replace with approved details)</span>
        </p>
      </FadeUp>
    </div>
  </section>
);
