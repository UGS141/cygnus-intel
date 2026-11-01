import { Star4 } from './Reveal';

const ITEMS = [
  'AI Automation',
  'Applied Intelligence',
  'Human Direction',
  'Long Horizon',
  'Careful Engineering',
  'Systems That Learn',
];

export const Marquee = () => (
  <section
    data-testid="editorial-marquee-ribbon"
    aria-label="Cygnus focus areas"
    className="border-y border-navy/30 bg-gold text-navy"
  >
    <div className="marquee-viewport overflow-hidden py-4 md:py-5">
      <div className="marquee-track flex w-max items-center">
        {[false, true].map((dup) => (
          <ul key={dup} aria-hidden={dup || undefined} className="flex shrink-0 items-center">
            {ITEMS.map((it) => (
              <li key={it} className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
                <Star4 size={11} className="shrink-0 text-navy/70" />
                <span className="f-display whitespace-nowrap text-sm font-bold uppercase tracking-[0.1em] md:text-base">
                  {it}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  </section>
);
