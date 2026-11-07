import { useEffect, useRef, useState } from 'react';
import { ArrowUp, AtSign, Bot, Sparkles, Linkedin, Instagram, Twitter } from 'lucide-react';
import { usePointerFine } from './Motion';

// Official Cygnus social channels (configured when available)
const SOCIALS = [
  { label: 'LinkedIn', href: null, icon: Linkedin },
  { label: 'Instagram', href: null, icon: Instagram },
  { label: 'X / Twitter', href: null, icon: Twitter },
];

export const ReturnTop = () => {
  const fine = usePointerFine();
  const [open, setOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSocialOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setSocialOpen(false);
      }
    };
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const toTop = () => {
    if (window.__cygnusLenis) window.__cygnusLenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onMain = () => {
    if (fine) {
      toTop();
      return;
    }
    if (!open) setOpen(true);
    else {
      toTop();
      setOpen(false);
      setSocialOpen(false);
    }
  };

  const optionTab = open ? 0 : -1;

  return (
    <div
      ref={ref}
      className={`rt ${open ? 'open' : ''}`}
      onMouseEnter={() => fine && setOpen(true)}
      onMouseLeave={() => {
        if (fine) {
          setOpen(false);
          setSocialOpen(false);
        }
      }}
      onFocusCapture={() => fine && setOpen(true)}
      onBlurCapture={(e) => {
        if (fine && ref.current && !ref.current.contains(e.relatedTarget)) {
          setOpen(false);
          setSocialOpen(false);
        }
      }}
      data-testid="return-top-control"
    >
      <div className="rt-options">
        <div
          className={`rt-option rt-social ${socialOpen ? 'open' : ''}`}
          style={{ transitionDelay: open ? '0.12s' : '0s' }}
        >
          <span className="rt-label">Social</span>
          <span className="rt-social-links">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href || '#'}
                onClick={s.href ? undefined : (e) => e.preventDefault()}
                tabIndex={open && socialOpen ? 0 : -1}
                aria-label={s.href ? `Cygnus AI Labs on ${s.label}` : `${s.label} — placeholder, add profile URL`}
                title={s.href ? s.label : `${s.label} — add profile URL`}
                className={`rt-soc ${s.href ? '' : 'is-ph'}`}
                data-testid={`rt-social-${s.label.split(' ')[0].toLowerCase()}`}
              >
                <s.icon size={14} aria-hidden="true" />
              </a>
            ))}
          </span>
          <button
            type="button"
            className="rt-btn"
            aria-expanded={socialOpen}
            aria-label="Social links"
            tabIndex={optionTab}
            onClick={() => setSocialOpen((v) => !v)}
            data-testid="rt-social-toggle"
          >
            <AtSign size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="rt-option" style={{ transitionDelay: open ? '0.06s' : '0s' }}>
          <span className="rt-label">
            Cygnus Agent <em className="rt-ph">add link</em>
          </span>
          <button
            type="button"
            className="rt-btn is-ph"
            aria-label="Cygnus Agent — placeholder, add destination"
            title="Cygnus Agent — add destination"
            tabIndex={optionTab}
            onClick={(e) => e.preventDefault()}
            data-testid="rt-agent"
          >
            <Bot size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="rt-option" style={{ transitionDelay: '0s' }}>
          <span className="rt-label">Experience Cygnus</span>
          <a
            className="rt-btn"
            href="/landing/index.html"
            aria-label="Experience Cygnus"
            tabIndex={optionTab}
            data-testid="rt-experience"
          >
            <Sparkles size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <button
        type="button"
        className="rt-main"
        onClick={onMain}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Return to top — hover, focus or tap for more options"
        data-testid="return-top-button"
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>
    </div>
  );
};
