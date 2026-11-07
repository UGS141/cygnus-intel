import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';
import { FadeUp, Kicker } from './Reveal';

const CAPABILITIES = [
  {
    n: '01',
    slug: 'ai-automation',
    title: 'AI Automation',
    line: 'Systems that take repetitive, rule-bound work off your team — reliably, measurably, around the clock.',
    body: 'We look for work that follows a pattern: handoffs, data entry, document processing, monitoring, follow-ups. Then we build automation that executes the way a careful person would — faster, without fatigue, and with a clear trail of what it did and when.',
    detail: 'Core capabilities: workflow automation, document processing, intelligent routing, monitoring & alerting.',
  },
  {
    n: '02',
    slug: 'applied-intelligence',
    title: 'Applied Intelligence',
    line: 'Decision support and analysis — systems that read the situation, surface what matters, and explain their reasoning.',
    body: 'Intelligence is only useful when it is legible. We build systems that can be questioned, audited, and corrected, so the people accountable for business outcomes stay in control of them.',
    detail: 'Core capabilities: decision briefs, analyst copilots, structured operational insights, auditable recommendations.',
  },
  {
    n: '03',
    slug: 'systems-integration',
    title: 'Systems Integration & Web Development',
    line: 'Custom AI solutions, web applications, and technical delivery wired into your existing production stack.',
    body: 'The hard part of AI adoption is rarely model capability; it is the production engineering: data privacy, security permissions, edge-case routing, web applications, and connecting siloed systems without disruption.',
    detail: 'Core capabilities: web application development, API & webhook pipelines, database wiring, production hardening.',
  },
  {
    n: '04',
    slug: 'long-horizon-research',
    title: 'Long-Horizon Research',
    line: 'Directed research toward advanced planning and evaluations, with safety and human agency treated as design constraints.',
    body: 'Every capability we ship teaches us something about systems that plan and act over longer stretches of time. We hold ourselves to a plain standard: if we cannot explain what a system does, we do not deploy it.',
    detail: 'Research areas: multi-step planning, evaluation harnesses, oversight mechanisms, safety verification.',
  },
];

export const Capabilities = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="capabilities" data-testid="capabilities-index-section" className="text-cream">
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 lg:py-32">
        <Kicker num="02">Capabilities</Kicker>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <FadeUp className="lg:col-span-7">
            <h2 className="f-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.12]">
              Two disciplines, one practice: automation that does the work, intelligence that
              decides how.
            </h2>
          </FadeUp>
          <FadeUp delay={0.12} className="lg:col-span-4 lg:col-start-9">
            <p className="f-mono text-[11px] uppercase leading-loose tracking-[0.18em] text-cream/50">
              Engineering AI automation, intelligent workflows, and technical delivery
            </p>
          </FadeUp>
        </div>

        <div className="mt-16">
          {CAPABILITIES.map((c, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={c.n} delay={i * 0.06}>
                <div className={`border-t border-linedark ${i === CAPABILITIES.length - 1 ? 'border-b' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`capability-panel-${i}`}
                    data-testid={`capability-accordion-item-${i + 1}`}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-5 py-7 text-left md:gap-10 cursor-pointer"
                  >
                    <span className="f-mono text-xs text-gold">{c.n}</span>
                    <span>
                      <span
                        className={`f-display block text-2xl font-bold tracking-tight transition-colors duration-300 md:text-3xl ${
                          isOpen ? 'text-bright' : 'group-hover:text-bright'
                        }`}
                      >
                        {c.title}
                      </span>
                      <span className="mt-2 block max-w-xl text-sm leading-relaxed text-cream/60 md:mt-1.5">
                        {c.line}
                      </span>
                    </span>
                    <span
                      className="justify-self-end text-cream/60 transition-transform duration-300 group-hover:text-gold"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                      aria-hidden="true"
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                  <motion.div
                    id={`capability-panel-${i}`}
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-9 pl-9 pr-2 md:pl-16 md:pr-24">
                      <p className="max-w-2xl text-[15px] leading-relaxed text-cream/80">{c.body}</p>
                      <p
                        className="f-mono mt-5 text-[11px] tracking-[0.16em] text-cream/60"
                        data-testid="capability-placeholder-tag"
                      >
                        <span className="text-gold">FOCUS</span> · {c.detail}
                      </p>
                      <Link
                        to={`/services/${c.slug}`}
                        data-testid={`capability-service-link-${i + 1}`}
                        className="f-mono mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold transition-colors duration-200 hover:text-cream"
                      >
                        Open the {c.title} page
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
