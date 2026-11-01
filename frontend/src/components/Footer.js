import { Link } from 'react-router-dom';
import { FadeUp } from './Reveal';
import { useSectionNav, EMAIL } from '../lib/scroll';
import { SERVICES } from '../data/services';

const INDEX = [
  { label: 'Point of view', href: '#point-of-view' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Approach', href: '#approach' },
  { label: 'Work', href: '#work' },
  { label: 'Trust', href: '#trust' },
  { label: 'Contact', href: '#contact' },
];

export const Footer = () => {
  const goSection = useSectionNav();

  return (
    <footer id="site-footer" data-testid="site-footer-container" className="border-t border-linedark bg-[#000410] text-cream">
      <div className="mx-auto max-w-[1240px] px-6 pb-14 pt-20 md:px-10 md:pt-24">
        <FadeUp>
          <p className="f-mono text-[10px] uppercase tracking-[0.24em] text-cream/45">
            The long view
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p
            data-testid="footer-signature"
            className="f-display mt-6 max-w-5xl text-[clamp(1.7rem,6.8vw,6.2rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.02em]"
          >
            Superintelligence should expand{' '}
            <span className="text-gold">human possibility.</span>
          </p>
        </FadeUp>
      </div>

      <div className="border-t border-linedark">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-6 py-14 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-4">
              <img
                src="/brand/cygnus-emblem-300.png"
                alt="Cygnus AI Labs emblem — a swan-shaped mark inside an orbital ring with a four-point star"
                className="h-12 w-12"
                data-testid="footer-emblem"
              />
              <div>
                <p className="f-display text-base font-bold tracking-tight">Cygnus AI Labs</p>
                <p className="f-mono text-[9px] uppercase tracking-[0.22em] text-cream/50">
                  AI Automation &amp; Intelligence
                </p>
              </div>
            </div>
            <a
              href={`mailto:${EMAIL}`}
              data-testid="footer-confirmed-email"
              className="f-mono mt-7 inline-block border-b border-cream/25 pb-1 text-xs tracking-wide text-cream/75 transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              {EMAIL}
            </a>
          </div>

          <nav aria-label="Footer index" className="md:col-span-3">
            <p className="f-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">Index</p>
            <ul className="mt-5 space-y-3">
              {INDEX.map((l) => (
                <li key={l.href}>
                  <a
                    href={`/${l.href}`}
                    data-testid={`footer-link-${l.href.slice(1)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goSection(l.href);
                    }}
                    className="u-line text-sm text-cream/70 transition-colors duration-200 hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services" className="md:col-span-3">
            <p className="f-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">Services</p>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    data-testid={`footer-service-${s.slug}`}
                    className="u-line text-sm text-cream/70 transition-colors duration-200 hover:text-gold"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/careers"
                  data-testid="footer-link-careers"
                  className="u-line text-sm text-cream/70 transition-colors duration-200 hover:text-gold"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </nav>

          <div className="f-mono text-[10px] uppercase leading-loose tracking-[0.16em] text-cream/45 md:col-span-2">
            <p>Named for Cygnus — the swan, a constellation on the Milky Way.</p>
            <p className="mt-4">© {new Date().getFullYear()} Cygnus AI Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
