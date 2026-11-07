import { ArrowUpRight } from 'lucide-react';
import { FadeUp, Kicker } from './Reveal';
import { EMAIL } from '../lib/scroll';

export const Contact = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = (f.get('name') || '').toString().trim();
    const org = (f.get('org') || '').toString().trim();
    const email = (f.get('email') || '').toString().trim();
    const message = (f.get('message') || '').toString().trim();
    const subject = `Project inquiry${name ? ` — ${name}` : ''}`;
    const body = [message, '', '—', `Name: ${name}`, `Organization: ${org}`, `Email: ${email}`]
      .filter((l) => l !== undefined)
      .join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" data-testid="contact-section" className="text-cream">
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 lg:py-32">
        <Kicker num="07">Contact</Kicker>

        <FadeUp>
          <h2 className="f-display mt-12 max-w-3xl text-[clamp(2.4rem,5.4vw,4.6rem)] font-extrabold leading-[1.04]">
            Start the <span className="text-gold">conversation.</span>
          </h2>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FadeUp>
              <p className="max-w-md text-[15px] leading-relaxed text-cream/75">
                Tell us what work should look like when the machines carry more of it. Projects,
                questions, and skeptical inquiries are all welcome.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <a
                href={`mailto:${EMAIL}`}
                data-testid="direct-business-mailto-link"
                className="f-mono mt-9 inline-flex items-center gap-3 border-b border-gold/50 pb-2 text-lg tracking-wide text-gold transition-colors duration-300 hover:border-gold md:text-xl"
              >
                {EMAIL}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </FadeUp>
            <FadeUp delay={0.18}>
              <p className="f-mono mt-10 text-[11px] uppercase leading-loose tracking-[0.16em] text-cream/45">
                Direct inquiries and technical consultations via email
              </p>
            </FadeUp>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <FadeUp delay={0.12}>
              <form onSubmit={onSubmit} data-testid="contact-visual-placeholder-form" className="border border-linedark p-7 md:p-10">
                <p className="f-mono text-[11px] uppercase tracking-[0.2em] text-cream/55">
                  Open a draft — nothing is sent or stored from this page
                </p>
                <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="f-mono block text-[10px] uppercase tracking-[0.2em] text-cream/50">
                      Your name
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Ada Byron"
                      data-testid="contact-input-name"
                      className="mt-2 w-full border-b border-linedark bg-transparent py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-org" className="f-mono block text-[10px] uppercase tracking-[0.2em] text-cream/50">
                      Organization
                    </label>
                    <input
                      id="c-org"
                      name="org"
                      type="text"
                      autoComplete="organization"
                      placeholder="Company or team"
                      data-testid="contact-input-org"
                      className="mt-2 w-full border-b border-linedark bg-transparent py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-email" className="f-mono block text-[10px] uppercase tracking-[0.2em] text-cream/50">
                      Your email
                    </label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="ada@domain.com"
                      data-testid="contact-input-email"
                      className="mt-2 w-full border-b border-linedark bg-transparent py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-msg" className="f-mono block text-[10px] uppercase tracking-[0.2em] text-cream/50">
                      What are you building or trying to solve?
                    </label>
                    <textarea
                      id="c-msg"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about the workflow, technical constraints, or system you want to automate..."
                      data-testid="contact-input-message"
                      className="mt-2 w-full border-b border-linedark bg-transparent py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  data-testid="contact-submit-button"
                  className="f-mono mt-10 inline-flex items-center gap-3 rounded-[2px] bg-gold px-8 py-4 text-xs uppercase tracking-[0.18em] text-navy transition-colors duration-300 hover:bg-cream cursor-pointer"
                >
                  Draft inquiry email
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
