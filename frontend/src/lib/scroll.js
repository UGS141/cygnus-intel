import { useLocation, useNavigate } from 'react-router-dom';

export const EMAIL = 'business@cygnuslabs.si';

export const scrollToId = (hash) => {
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = window.__cygnusLenis;
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.2 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Site-wide section navigation: smooth-scroll on the homepage,
// navigate home first when on another route.
export const useSectionNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (hash) => {
    if (location.pathname === '/') scrollToId(hash);
    else {
      navigate('/');
      setTimeout(() => scrollToId(hash), 400);
    }
  };
};
