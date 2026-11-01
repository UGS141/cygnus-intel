import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FadeUp, Kicker, Ph } from './Reveal';

export const CareersBand = () => (
  <section id="careers" data-testid="careers-band" className="border-y border-linedark bg-navysurface/80 text-cream">
    <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 lg:py-24">
      <Kicker num="06">Careers</Kicker>
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <FadeUp className="lg:col-span-7">
          <h2 className="f-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.12]">
            Do the most careful work of your career.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/70">
            Cygnus is small on purpose and ambitious on a long clock. If the work on this page
            sounds like yours, we would like to meet you.
          </p>
        </FadeUp>
        <FadeUp delay={0.12} className="lg:col-span-4 lg:col-start-9">
          <Link
            to="/careers"
            data-testid="careers-band-cta"
            className="f-mono inline-flex items-center gap-3 rounded-[2px] bg-gold px-7 py-4 text-xs uppercase tracking-[0.18em] text-navy transition-colors duration-300 hover:bg-cream"
          >
            Explore careers
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <p className="f-mono mt-5 text-[11px] uppercase leading-loose tracking-[0.16em] text-cream/50">
            Hiring status: actively hiring <Ph>(sample — replace)</Ph>
          </p>
        </FadeUp>
      </div>
    </div>
  </section>
);
