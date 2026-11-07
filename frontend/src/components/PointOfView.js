import { FadeUp, Kicker } from './Reveal';

export const PointOfView = () => (
  <section id="point-of-view" data-testid="point-of-view-section" className="bg-paper text-navy">
    <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 lg:py-32">
      <Kicker num="01" tone="light">
        Point of view
      </Kicker>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <FadeUp>
            <h2 className="f-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-extrabold leading-[1.08] tracking-[-0.01em]">
              Most automation saves labour. The interesting kind changes what a team can{' '}
              <span className="text-cobalt">attempt.</span>
            </h2>
          </FadeUp>
        </div>

        <div className="space-y-6 text-[15px] leading-relaxed text-navy/80 lg:col-span-5 lg:pt-2">
          <FadeUp delay={0.08}>
            <p>
              We treat artificial intelligence not as an ornament on an existing process, but as a
              rethinking of the work itself. When routine cognition becomes abundant, the role of
              human judgement does not diminish — it becomes the limiting factor.
            </p>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p>
              Our work spans AI automation for businesses, applied decision intelligence, custom AI
              solutions, and full-stack web development. Every system we build is designed for production
              reality: auditable, legible, and directly integrated into everyday business operations.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
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
            Engineering purposeful AI automation, intelligent workflows, and robust technical infrastructure.
          </p>
        </div>
      </FadeUp>
    </div>
  </section>
);
