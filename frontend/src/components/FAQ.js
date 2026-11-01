import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';
import { FadeUp, Kicker } from './Reveal';
import { FAQS } from '../data/faq';
import { EMAIL } from '../lib/scroll';

export const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" data-testid="faq-section" className="bg-paper text-navy border-t border-linelight">
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 lg:py-32">
        <Kicker num="06" tone="light">
          Frequently asked questions
        </Kicker>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <FadeUp className="lg:col-span-7">
            <h2 className="f-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.12]">
              Answers on automation, integration, and{' '}
              <span className="text-cobalt">delivery.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.12} className="lg:col-span-5">
            <p className="text-[15px] leading-relaxed text-navy/75">
              Clear answers to common questions about our technical capabilities, security
              standards, pilot timelines, and research approach.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 divide-y divide-linelight border-y border-linelight">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={faq.id} delay={i * 0.05}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    data-testid={`faq-toggle-${i + 1}`}
                    className="group flex w-full items-baseline justify-between gap-6 py-7 text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-baseline gap-4 md:gap-6">
                      <span className="f-mono text-xs text-cobalt font-medium">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3
                        className={`f-display text-lg font-bold tracking-tight transition-colors duration-200 md:text-xl ${
                          isOpen ? 'text-cobalt' : 'text-navy group-hover:text-cobalt'
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                    <span
                      className="shrink-0 text-navy/60 transition-transform duration-300 group-hover:text-cobalt"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                      aria-hidden="true"
                    >
                      <Plus size={18} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-toggle-${i + 1}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-8 md:pl-12 max-w-3xl">
                          <p className="text-sm md:text-[15px] leading-relaxed text-navy/80">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-[2px] border border-linelight bg-white/60 p-6 md:p-8">
            <div>
              <p className="f-display text-base font-bold text-navy">Have a specific question about your workflow?</p>
              <p className="mt-1 text-xs text-navy/65">
                We review technical constraints and pilot feasibility directly.
              </p>
            </div>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent('Technical question about AI automation')}`}
              data-testid="faq-email-cta"
              className="f-mono inline-flex items-center gap-2 border-b border-cobalt/50 pb-1 text-xs uppercase tracking-[0.16em] text-cobalt hover:border-cobalt transition-colors"
            >
              Ask an engineering question
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default FAQ;
