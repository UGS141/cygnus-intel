import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FadeUp, Kicker, Ph, Star4 } from '../components/Reveal';
import { ServiceVisual } from '../components/ServiceVisual';
import { useSectionNav, EMAIL } from '../lib/scroll';
import { SERVICES } from '../data/services';

const TEXTURES = {
  grid: {
    backgroundImage:
      'linear-gradient(rgba(244,240,230,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(244,240,230,0.045) 1px, transparent 1px)',
    backgroundSize: '72px 72px',
  },
  dots: {
    backgroundImage: 'radial-gradient(rgba(244,240,230,0.1) 1px, transparent 1px)',
    backgroundSize: '26px 26px',
  },
  tracks: {
    backgroundImage:
      'repeating-linear-gradient(0deg, rgba(244,240,230,0.05) 0 1px, transparent 1px 56px)',
  },
  plain: {},
};

const Narrative = ({ num, title, tone, children, testid }) => (
  <section data-testid={testid} className={tone === 'paper' ? 'bg-paper text-navy' : 'bg-navy text-cream'}>
    <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 lg:py-28">
      <Kicker num={num} tone={tone === 'paper' ? 'light' : 'dark'}>
        {title}
      </Kicker>
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-3">{children}</div>
      </div>
    </div>
  </section>
);

export default function ServicePage() {
  const { slug } = useParams();
  const goSection = useSectionNav();
  const idx = SERVICES.findIndex((s) => s.slug === slug);
  if (idx === -1) return <Navigate to="/" replace />;
  const s = SERVICES[idx];
  const prev = SERVICES[(idx + SERVICES.length - 1) % SERVICES.length];
  const next = SERVICES[(idx + 1) % SERVICES.length];
  const visualLeft = s.layout === 'left';

  return (
    <>
      <section
        className="relative overflow-hidden bg-navy pb-20 pt-36 text-cream lg:pb-28"
        style={TEXTURES[s.texture]}
        data-testid="service-hero"
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-12">
          <div className={visualLeft ? 'lg:order-2 lg:col-span-6' : 'lg:col-span-6'}>
            <FadeUp>
              <p className="f-mono flex items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-cream/70">
                <Star4 size={9} style={{ color: s.accent }} className="text-gold" />
                Services — {s.n}
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1
                className="f-display mt-7 text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.02em]"
                data-testid="service-title"
              >
                {s.title}
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
                {s.tagline}
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(`${s.title} — inquiry`)}`}
                  data-testid="service-contact-cta"
                  className="f-mono inline-flex items-center gap-3 rounded-[2px] bg-gold px-7 py-4 text-xs uppercase tracking-[0.18em] text-navy transition-colors duration-300 hover:bg-cream"
                >
                  Talk to us about {s.title.toLowerCase()}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <a
                  href="/#work"
                  data-testid="service-related-cta"
                  onClick={(e) => {
                    e.preventDefault();
                    goSection('#work');
                  }}
                  className="f-mono inline-flex items-center gap-3 rounded-[2px] border border-cream/30 px-7 py-4 text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  See related work
                </a>
              </div>
            </FadeUp>
          </div>
          <FadeUp
            delay={0.15}
            className={visualLeft ? 'lg:order-1 lg:col-span-6' : 'lg:col-span-6'}
          >
            <div className="border border-linedark p-6 md:p-10" data-testid="service-visual">
              <ServiceVisual kind={s.visual} accent={s.accent} />
            </div>
          </FadeUp>
        </div>
      </section>

      <Narrative num="01" title="What it is" tone="paper" testid="service-what">
        <FadeUp>
          <p className="text-xl leading-relaxed text-navy/85 md:text-2xl md:leading-relaxed">
            {s.what}
          </p>
          <p className="f-mono mt-8 text-[11px] uppercase leading-loose tracking-[0.16em] text-navy/55">
            Detail: <Ph>{s.detail}</Ph>
          </p>
        </FadeUp>
      </Narrative>

      <Narrative num="02" title="The problem it addresses" tone="navy" testid="service-problem">
        <FadeUp>
          <p className="f-display border-l-2 pl-6 text-xl font-semibold leading-relaxed text-cream/90 md:text-2xl" style={{ borderColor: s.accent }}>
            {s.problem}
          </p>
        </FadeUp>
      </Narrative>

      <Narrative num="03" title="How Cygnus approaches it" tone="paper" testid="service-approach">
        <FadeUp>
          <p className="text-lg leading-relaxed text-navy/85">{s.approach}</p>
        </FadeUp>
      </Narrative>

      <Narrative num="04" title="Where it connects" tone="navy" testid="service-connection">
        <FadeUp>
          <p className="text-lg leading-relaxed text-cream/85">{s.connection}</p>
          <div className="f-mono mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-cream/50">
            <span className="h-px w-10" style={{ background: s.accent }} aria-hidden="true" />
            Part of AI automation &amp; intelligence at Cygnus
          </div>
        </FadeUp>
      </Narrative>

      <section className="bg-paper py-20 text-navy lg:py-28" data-testid="service-related">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Kicker num="05" tone="light">Related work</Kicker>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <FadeUp className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-navy/85">
                The Signal Atlas carries sample projects in this area — clearly labeled as samples
                until verified work replaces them.
              </p>
              <p className="f-mono mt-5 text-[11px] uppercase leading-loose tracking-[0.16em] text-navy/55">
                Sample: related work is shown in the Signal Atlas —{' '}
                <Ph>add real engagements here when available</Ph>
              </p>
            </FadeUp>
            <FadeUp delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <a
                href="/#work"
                data-testid="service-atlas-link"
                onClick={(e) => {
                  e.preventDefault();
                  goSection('#work');
                }}
                className="f-mono inline-flex items-center gap-3 rounded-[2px] border border-navy/30 px-7 py-4 text-xs uppercase tracking-[0.18em] text-navy transition-colors duration-300 hover:border-cobalt hover:text-cobalt"
              >
                Open the Signal Atlas
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-cream lg:py-24" data-testid="service-next-step">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-6 border-y border-linedark py-10">
            <FadeUp>
              <h2 className="f-display text-2xl font-bold tracking-tight md:text-3xl">
                Put <span style={{ color: s.accent }}>{s.title.toLowerCase()}</span> to work.
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(`${s.title} — inquiry`)}`}
                data-testid="service-bottom-cta"
                className="f-mono inline-flex items-center gap-3 rounded-[2px] bg-gold px-7 py-4 text-xs uppercase tracking-[0.18em] text-navy transition-colors duration-300 hover:bg-cream"
              >
                Start the conversation
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </FadeUp>
          </div>
          <div className="f-mono mt-8 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
            <Link
              to={`/services/${prev.slug}`}
              data-testid="service-prev-link"
              className="flex items-center gap-2 text-cream/60 transition-colors duration-200 hover:text-gold"
            >
              <ArrowLeft size={13} aria-hidden="true" />
              {prev.title}
            </Link>
            <Link
              to={`/services/${next.slug}`}
              data-testid="service-next-link"
              className="flex items-center gap-2 text-cream/60 transition-colors duration-200 hover:text-gold"
            >
              {next.title}
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
