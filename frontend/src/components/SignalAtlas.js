import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FadeUp, Kicker } from './Reveal';
import { PROJECTS } from '../data/projects';
import { EMAIL } from '../lib/scroll';

export const SignalAtlas = () => {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const total = PROJECTS.length;
  const activeProject = PROJECTS[activeIdx];

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + total) % total);

  return (
    <section
      id="work"
      data-testid="signal-atlas-section"
      className="relative bg-navy text-cream py-24 md:py-32 border-t border-linedark"
      role="region"
      aria-label="Signal Atlas — Selected Projects"
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Kicker num="04" tone="dark">
          Signal Atlas
        </Kicker>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <FadeUp className="lg:col-span-7">
            <h2 className="f-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.12]">
              Selected projects and{' '}
              <span className="text-gold">digital work.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.12} className="lg:col-span-5">
            <p className="f-mono text-[11px] uppercase tracking-[0.16em] text-cream/70 leading-relaxed">
              Selected digital work organized across specialized industry sectors.
            </p>
          </FadeUp>
        </div>

        {/* Signal Node Selector Bar */}
        <div className="mt-12 flex flex-wrap items-center gap-3 border-b border-linedark pb-6">
          <span className="f-mono text-[10px] uppercase tracking-[0.22em] text-cream/40 mr-2">
            Select Project:
          </span>
          {PROJECTS.map((proj, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={proj.id}
                type="button"
                data-testid={`signal-node-${proj.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                aria-pressed={isSelected}
                aria-label={`Project ${proj.id}: ${proj.title}`}
                onClick={() => setActiveIdx(idx)}
                className={`f-mono flex items-center gap-2.5 px-4 py-2 text-xs uppercase tracking-[0.16em] border transition-all duration-200 rounded-[2px] cursor-pointer ${
                  isSelected
                    ? 'border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(250,151,32,0.2)]'
                    : 'border-linedark bg-navysurface text-cream/60 hover:border-cream/40 hover:text-cream'
                }`}
              >
                <span className="font-semibold">{proj.id}</span>
                <span className="hidden sm:inline opacity-80">· {proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Case Panel */}
        <div className="mt-8 border border-linedark bg-navysurface p-8 md:p-12 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-linedark pb-6">
            <div className="flex items-center gap-3">
              <span className="f-mono text-xs font-bold uppercase tracking-[0.2em] text-gold">
                {activeProject.id}
              </span>
              <span className="h-1 w-1 rounded-full bg-cream/30" aria-hidden="true" />
              <span className="f-mono text-[11px] uppercase tracking-[0.16em] text-cream/60">
                {activeProject.industry}
              </span>
            </div>

            <span className="f-mono inline-flex items-center gap-1.5 border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gold">
              Selected Digital Work
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-8"
            >
              <h3 className="f-display text-2xl font-bold tracking-tight md:text-4xl text-cream">
                {activeProject.title}
              </h3>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div>
                    <h4 className="f-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
                      Industry Sector
                    </h4>
                    <p className="f-mono mt-2 text-xs uppercase tracking-[0.14em] text-cream/80">
                      {activeProject.industry}
                    </p>
                  </div>

                  <div>
                    <h4 className="f-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
                      Project Description
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-cream/80">
                      {activeProject.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`project-external-link-${activeProject.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="f-mono inline-flex items-center gap-2 rounded-[2px] bg-gold px-6 py-3 text-xs uppercase tracking-[0.18em] text-navy transition-colors duration-200 hover:bg-cream"
                    >
                      Visit Website
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="space-y-6 md:border-l md:border-linedark md:pl-8">
                  <div>
                    <h4 className="f-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
                      Domain Focus
                    </h4>
                    <div className="mt-2 rounded-[2px] border border-linedark bg-navy/60 p-4">
                      <p className="text-sm font-medium leading-relaxed text-cream">
                        {activeProject.focus}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="f-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
                      Core Areas
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="f-mono rounded-[2px] border border-linedark bg-navy/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-cream/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Inquiry regarding ${activeProject.title} (${activeProject.industry})`)}`}
                      className="f-mono inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold hover:text-cream transition-colors duration-200 border-b border-gold/40 hover:border-cream pb-1"
                    >
                      Discuss this implementation
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Footer */}
          <div className="mt-12 flex items-center justify-between border-t border-linedark pt-6">
            <span className="f-mono text-xs tracking-[0.2em] text-cream/50">
              {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                data-testid="signal-atlas-prev"
                aria-label="Previous project"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-linedark text-cream/70 hover:border-gold hover:text-gold transition-colors duration-200 cursor-pointer"
              >
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                data-testid="signal-atlas-next"
                aria-label="Next project"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-linedark text-cream/70 hover:border-gold hover:text-gold transition-colors duration-200 cursor-pointer"
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Overview Grid of All Projects Organized by Industry */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => setActiveIdx(idx)}
              data-testid={`project-card-${proj.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className={`flex flex-col justify-between border p-6 transition-all duration-200 cursor-pointer ${
                activeIdx === idx
                  ? 'border-gold bg-white/[0.04]'
                  : 'border-linedark bg-white/[0.015] hover:border-cream/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="f-mono font-bold text-gold">{proj.id}</span>
                  <span className="f-mono text-[10px] uppercase text-cream/40">{proj.industry}</span>
                </div>
                <h4 className="f-display mt-3 text-lg font-bold text-cream">{proj.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-cream/65">
                  {proj.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-linedark/60 flex items-center justify-between">
                <span className="f-mono text-[10px] uppercase tracking-[0.14em] text-cream/40">
                  {proj.industry}
                </span>
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Visit ${proj.title} website`}
                  className="f-mono inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-gold hover:text-cream transition-colors duration-200"
                >
                  Visit <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignalAtlas;
