import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { scrollToId, useSectionNav, EMAIL } from '../lib/scroll';
import { SERVICES } from '../data/services';

const CAREERS_MENU = [
  { title: 'Careers at Cygnus', tag: 'Why work here', to: '/careers' },
  { title: 'Open roles', tag: 'Engineering & delivery roles', to: '/careers#open-roles' },
  { title: 'Career areas', tag: 'Engineering · Research · Operations', to: '/careers#career-areas' },
  { title: 'People & culture', tag: 'How we work, plainly', to: '/careers#culture' },
  { title: 'Apply directly', tag: 'business@cygnuslabs.si', to: '/careers#apply' },
];

const SERVICES_MENU = SERVICES.map((s) => ({
  title: s.title,
  tag: s.tagline,
  to: `/services/${s.slug}`,
  n: s.n,
}));

const NavDrop = ({ id, label, header, items, open, setOpen, alignRight = false }) => {
  const isOpen = open === id;
  return (
    <div
      className={`nav-drop group relative inline-flex items-center ${isOpen ? 'open' : ''}`}
      data-testid={`nav-${id}-group`}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setOpen(null);
          e.currentTarget.querySelector('button')?.focus();
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        data-testid={`nav-link-${id}`}
        onClick={() => setOpen(isOpen ? null : id)}
        className="u-line f-mono inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] uppercase tracking-[0.16em] xl:tracking-[0.18em] text-cream/65 transition-colors duration-200 hover:text-gold cursor-pointer"
      >
        <span>{label}</span>
        <ChevronDown
          size={12}
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'group-hover:rotate-180'}`}
        />
      </button>
      <div className={`nav-drop-panel ${alignRight ? 'nav-drop-panel-right' : ''}`}>
        <div className="w-80 border border-linedark bg-navy py-2 shadow-2xl">
          <p className="f-mono px-5 pb-1 pt-3 text-[9px] uppercase tracking-[0.22em] text-cream/40">
            {header}
          </p>
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-testid={`nav-${id}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              onClick={() => setOpen(null)}
              className="group/item flex items-baseline gap-3 px-5 py-3 transition-colors duration-150 hover:bg-navysurface focus-visible:bg-navysurface"
            >
              {item.n && <span className="f-mono text-[10px] text-gold">{item.n}</span>}
              <span>
                <span className="f-display block text-sm font-bold tracking-tight text-cream transition-colors group-hover/item:text-gold">
                  {item.title}
                </span>
                <span className="block text-[11px] leading-snug text-cream/50">{item.tag}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(null);
  const location = useLocation();
  const goSection = useSectionNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      window.__cygnusLenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      window.__cygnusLenis?.start();
      document.body.style.overflow = '';
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setDropOpen(null);
  }, [location.pathname]);

  return (
    <>
      <header
        data-testid="main-nav-header"
        className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300 ${
          scrolled || open ? 'bg-navy/95 backdrop-blur-md border-b border-linedark' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
          <Link to="/" data-testid="nav-home-link" className="flex shrink-0 items-center gap-3" aria-label="Cygnus AI Labs — home">
            <img src="/brand/cygnus-emblem-300.png" alt="" aria-hidden="true" className="h-10 w-10 shrink-0" />
            <span className="leading-tight">
              <span className="f-display block text-[15px] font-bold tracking-tight text-cream">
                Cygnus AI Labs
              </span>
              <span className="f-mono block text-[9px] uppercase tracking-[0.22em] text-cream/50">
                AI Automation &amp; Intelligence
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden shrink-0 items-center gap-4 lg:flex xl:gap-6 2xl:gap-7">
            <NavDrop id="services" label="Services" header="Four disciplines" items={SERVICES_MENU} open={dropOpen} setOpen={setDropOpen} />
            <a
              href="/#point-of-view"
              data-testid="nav-link-point-of-view"
              onClick={(e) => {
                e.preventDefault();
                goSection('#point-of-view');
              }}
              className="u-line f-mono inline-flex items-center whitespace-nowrap text-[11px] uppercase tracking-[0.16em] xl:tracking-[0.18em] text-cream/65 transition-colors duration-200 hover:text-gold"
            >
              Point of view
            </a>
            <a
              href="/#work"
              data-testid="nav-link-work"
              onClick={(e) => {
                e.preventDefault();
                goSection('#work');
              }}
              className="u-line f-mono inline-flex items-center whitespace-nowrap text-[11px] uppercase tracking-[0.16em] xl:tracking-[0.18em] text-cream/65 transition-colors duration-200 hover:text-gold"
            >
              Work
            </a>
            <NavDrop id="careers" label="Careers" header="Work at Cygnus" items={CAREERS_MENU} open={dropOpen} setOpen={setDropOpen} alignRight />
            <a
              href="/#contact"
              data-testid="nav-cta"
              onClick={(e) => {
                e.preventDefault();
                goSection('#contact');
              }}
              className="f-mono inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[2px] border border-cream/25 px-3.5 py-2 xl:px-4 xl:py-2.5 text-[11px] uppercase tracking-[0.16em] xl:tracking-[0.18em] text-cream transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              Start a conversation
              <ArrowUpRight size={13} aria-hidden="true" className="shrink-0" />
            </a>
          </nav>

          <button
            type="button"
            data-testid="nav-menu-button"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 shrink-0 items-center justify-center text-cream lg:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-linedark bg-navy px-6 pb-10 pt-8 lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex min-h-full flex-col justify-between gap-10">
              <nav aria-label="Mobile" className="flex flex-col">
                <p className="f-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">Services</p>
                {SERVICES.map((s, i) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    data-testid={`mobile-service-${s.slug}`}
                    className="f-display flex items-baseline gap-4 border-b border-linedark py-4 text-xl font-bold tracking-tight text-cream"
                  >
                    <span className="f-mono text-[11px] text-gold">0{i + 1}</span>
                    {s.title}
                  </Link>
                ))}

                <p className="f-mono mt-8 text-[10px] uppercase tracking-[0.22em] text-cream/45">Careers</p>
                {CAREERS_MENU.map((c, i) => (
                  <Link
                    key={c.to}
                    to={c.to}
                    data-testid={`mobile-careers-${c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className={`f-display flex items-baseline gap-4 border-b border-linedark py-4 font-bold tracking-tight text-cream ${
                      i === 0 ? 'text-xl' : 'pl-9 text-base text-cream/80'
                    }`}
                  >
                    {i === 0 && <span className="f-mono text-[11px] text-gold">05</span>}
                    {c.title}
                  </Link>
                ))}

                <p className="f-mono mt-8 text-[10px] uppercase tracking-[0.22em] text-cream/45">Site</p>
                <a
                  href="/#point-of-view"
                  data-testid="mobile-link-point-of-view"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    setTimeout(() => goSection('#point-of-view'), 60);
                  }}
                  className="f-display flex items-baseline gap-4 border-b border-linedark py-4 text-xl font-bold tracking-tight text-cream"
                >
                  <span className="f-mono text-[11px] text-gold">06</span>
                  Point of view
                </a>
                <a
                  href="/#work"
                  data-testid="mobile-link-work"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    setTimeout(() => goSection('#work'), 60);
                  }}
                  className="f-display flex items-baseline gap-4 border-b border-linedark py-4 text-xl font-bold tracking-tight text-cream"
                >
                  <span className="f-mono text-[11px] text-gold">07</span>
                  Work
                </a>
                <a
                  href="/#contact"
                  data-testid="mobile-link-contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    setTimeout(() => goSection('#contact'), 60);
                  }}
                  className="f-mono mt-8 inline-flex items-center justify-center gap-2 rounded-[2px] bg-gold px-6 py-4 text-xs uppercase tracking-[0.18em] text-navy"
                >
                  Start a conversation
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </nav>
              <a
                href={`mailto:${EMAIL}`}
                data-testid="mobile-menu-email"
                className="f-mono text-[11px] uppercase tracking-[0.18em] text-cream/50"
              >
                {EMAIL}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
