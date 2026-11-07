import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FadeUp, Kicker, Star4 } from '../components/Reveal';
import { scrollToId, EMAIL } from '../lib/scroll';
import { OPEN_ROLES, CAREER_AREAS, CULTURE } from '../data/careers';

const RolesCarousel = () => {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const n = OPEN_ROLES.length;

  return (
    <div data-testid="role-carousel" role="region" aria-roledescription="carousel" aria-label="Open roles">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${idx * 100}%` }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 30 }}
        >
          {OPEN_ROLES.map((r, i) => (
            <article
              key={r.id}
              data-testid={`role-slide-${i + 1}`}
              aria-roledescription="slide"
              aria-label={`Role ${i + 1} of ${n}`}
              aria-hidden={idx !== i}
              className="w-full shrink-0 px-0.5"
            >
              <div className="border border-linelight bg-white/60 p-8 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="f-mono text-[11px] uppercase tracking-[0.2em] text-cobalt">{r.id}</p>
                  <p className="f-mono text-[10px] uppercase tracking-[0.16em] text-navy/50">{r.area}</p>
                </div>
                <h3 className="f-display mt-5 text-2xl font-bold tracking-tight text-navy md:text-3xl">
                  {r.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy/75">
                  {r.description}
                </p>
                <div className="f-mono mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[10px] uppercase tracking-[0.16em] text-navy/55">
                  <span>Location: {r.location}</span>
                  <span>Type: {r.type}</span>
                </div>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Application — open role ${r.id} (${r.title})`)}`}
                  data-testid={`role-apply-${i + 1}`}
                  className="f-mono mt-7 inline-flex items-center gap-2 border-b border-cobalt/50 pb-1 text-[11px] uppercase tracking-[0.18em] text-cobalt transition-colors duration-200 hover:border-cobalt"
                >
                  Apply via email
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="f-mono text-[11px] tracking-[0.2em] text-navy/55" aria-live="polite">
          {String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            data-testid="role-carousel-prev"
            aria-label="Previous role"
            onClick={() => setIdx((idx + n - 1) % n)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/30 text-navy transition-colors duration-200 hover:border-cobalt hover:text-cobalt cursor-pointer"
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            data-testid="role-carousel-next"
            aria-label="Next role"
            onClick={() => setIdx((idx + 1) % n)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/30 text-navy transition-colors duration-200 hover:border-cobalt hover:text-cobalt cursor-pointer"
          >
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CareerAreas = () => {
  const [active, setActive] = useState(0);

  const onKeyDown = (e) => {
    const n = CAREER_AREAS.length;
    let t = null;
    if (e.key === 'ArrowRight') t = (active + 1) % n;
    if (e.key === 'ArrowLeft') t = (active - 1 + n) % n;
    if (e.key === 'Home') t = 0;
    if (e.key === 'End') t = n - 1;
    if (t !== null) {
      e.preventDefault();
      setActive(t);
      document.getElementById(`career-area-tab-${t}`)?.focus();
    }
  };

  return (
    <div>
      <div role="tablist" aria-label="Career areas" onKeyDown={onKeyDown} className="flex flex-wrap gap-3">
        {CAREER_AREAS.map((a, i) => (
          <button
            key={a.id}
            id={`career-area-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls="career-area-panel"
            data-testid={`career-area-tab-${i + 1}`}
            onClick={() => setActive(i)}
            className={`f-mono border px-5 py-3 text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 cursor-pointer ${
              active === i
                ? 'border-gold text-gold'
                : 'border-linedark text-cream/60 hover:border-cream/40 hover:text-cream'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>
      <div
        id="career-area-panel"
        role="tabpanel"
        aria-labelledby={`career-area-tab-${active}`}
        data-testid="career-area-panel"
        className="mt-8 border border-linedark bg-navysurface p-8 md:p-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h3 className="f-display text-xl font-bold tracking-tight md:text-2xl">
              {CAREER_AREAS[active].label}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/80">
              {CAREER_AREAS[active].description}
            </p>
            <p className="f-mono mt-6 text-[11px] uppercase tracking-[0.16em] text-cream/55">
              Typical roles: {CAREER_AREAS[active].roles}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function CareersPage() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return undefined;
    const t = setTimeout(() => scrollToId(location.hash), 450);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <section className="bg-navy pb-24 pt-36 text-cream lg:pb-32" data-testid="careers-hero">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <FadeUp>
            <p className="f-mono flex items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-cream/70">
              <Star4 size={9} className="text-gold" />
              Careers at Cygnus
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="f-display mt-7 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              Do the most careful work of your <span className="text-gold">career.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">
              Cygnus AI Labs is building practical AI automation today and researching what comes
              after. The work is exacting, the horizon is long, and people set the direction — the
              systems follow.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#open-roles"
                data-testid="careers-explore-roles-cta"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId('#open-roles');
                }}
                className="f-mono inline-flex items-center gap-3 rounded-[2px] bg-gold px-7 py-4 text-xs uppercase tracking-[0.18em] text-navy transition-colors duration-300 hover:bg-cream"
              >
                Explore open roles
              </a>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent('Working at Cygnus')}`}
                data-testid="careers-write-us-cta"
                className="f-mono inline-flex items-center gap-3 rounded-[2px] border border-cream/30 px-7 py-4 text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                Write to us
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="open-roles" className="bg-paper py-24 text-navy lg:py-32" data-testid="open-roles-section">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Kicker num="01" tone="light">Open roles</Kicker>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <FadeUp className="lg:col-span-7">
              <h2 className="f-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.12]">
                Roles we are shaping.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <p className="f-mono text-[11px] uppercase leading-loose tracking-[0.16em] text-navy/55">
                Opportunities across engineering and research
              </p>
            </FadeUp>
          </div>
          <FadeUp className="mt-12">
            <RolesCarousel />
          </FadeUp>
        </div>
      </section>

      <section id="career-areas" className="bg-navy py-24 text-cream lg:py-32" data-testid="career-areas-section">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Kicker num="02">Career areas</Kicker>
          <FadeUp>
            <h2 className="f-display mt-10 text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.12]">
              Find your area.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-10">
            <CareerAreas />
          </FadeUp>
        </div>
      </section>

      <section id="culture" className="bg-paper py-24 text-navy lg:py-32" data-testid="culture-section">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Kicker num="03" tone="light">People &amp; culture</Kicker>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <FadeUp className="lg:col-span-7">
              <h2 className="f-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.12]">
                The people part.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <p className="text-[15px] leading-relaxed text-navy/75">
                Culture is what happens when nobody is performing it. We would rather show you than
                tell you — built on clarity, craft, and mutual respect.
              </p>
            </FadeUp>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-px bg-linelight md:grid-cols-3">
            {CULTURE.map((c, i) => (
              <FadeUp key={c.label} delay={i * 0.1} className="bg-paper">
                <div className="h-full border border-linelight bg-paper p-8" data-testid={`culture-card-${i + 1}`}>
                  <h3 className="f-display text-lg font-bold tracking-tight">{c.label}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-navy/75">
                    {c.detail}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="bg-navy py-24 text-cream lg:py-32" data-testid="apply-section">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Kicker num="04">Apply</Kicker>
          <FadeUp>
            <h2 className="f-display mt-10 max-w-3xl text-[clamp(2rem,4.4vw,3.8rem)] font-extrabold leading-[1.08]">
              Introduce <span className="text-gold">yourself.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream/75">
              If the work on this site sounds like yours, write to us and say what you would build.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent('Working at Cygnus — introduction')}`}
              data-testid="careers-apply-link"
              className="f-mono mt-9 inline-flex items-center gap-3 border-b border-gold/50 pb-2 text-lg tracking-wide text-gold transition-colors duration-300 hover:border-gold md:text-xl"
            >
              {EMAIL}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <p className="f-mono mt-8 text-[11px] uppercase leading-loose tracking-[0.16em] text-cream/50">
              Direct inquiries and introductions: {EMAIL}
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
