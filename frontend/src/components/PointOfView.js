import { FadeUp, Kicker, Ph } from './Reveal';

export const PointOfView = () => (
  <section id="point-of-view" data-testid="company-pov-section" className="bg-paper text-navy">
    <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 lg:py-32">
      <Kicker num="01" tone="light">
        Point of view
      </Kicker>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FadeUp>
            <h2
              data-testid="company-pov-headline-text"
              className="f-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.12]"
            >
              Most automation saves labour. The interesting kind changes what a team can{' '}
              <span className="text-cobalt">attempt</span>.
            </h2>
          </FadeUp>
        </div>
        <div className="space-y-6 text-[15px] leading-relaxed text-navy/80 lg:col-span-4 lg:col-start-9">
          <FadeUp delay={0.1}>
            <p>
              Cygnus AI Labs exists because machine intelligence is finally good enough to do real
              work — and because most organizations are still using it like a toy. We build systems
              that take work off people&rsquo;s plates: the repetitive, the slow, the impossible to
              scale.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <p>
              We are not interested in demos that impress and then evaporate. An intelligent system
              should earn its place the way a good colleague does — by understanding the job, doing
              it reliably, and knowing when to ask a human.
            </p>
          </FadeUp>
          <FadeUp delay={0.26}>
            <p>
              And we are honest about where this leads. Automation compounds. Every system we ship
              is a step toward intelligence that can plan, reason and act over long horizons — what
              many now call superintelligence. We think that destination deserves sober
              engineering, not slogans.
            </p>
          </FadeUp>
        </div>
      </div>

      <FadeUp>
        <div className="mt-16 flex flex-col items-start gap-8 border border-linelight bg-white/60 p-8 md:flex-row md:items-center md:p-10">
          <img
            src="/brand/cygnus-logo.png"
            alt="Cygnus AI Labs logo — a swan-shaped emblem inside an orbital ring above the words Cygnus Labs, AI Automation and Intelligence"
            className="h-28 w-auto md:h-32"
            data-testid="brand-logo-plate"
          />
          <div className="h-px w-full bg-linelight md:h-16 md:w-px" aria-hidden="true" />
          <p className="f-mono text-[11px] uppercase leading-loose tracking-[0.18em] text-navy/60">
            The mark, unchanged — a swan in orbit, a star ahead.
            <br />
            Founded 2024 by a small team of engineers and researchers.{' '}
            <span className="text-cobalt">(Sample — replace with the real story)</span>
          </p>
        </div>
      </FadeUp>
    </div>
  </section>
);
