import { Component, useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Spotlight } from './components/Motion';
import { ReturnTop } from './components/ReturnTop';
import HomePage from './pages/HomePage';
import CareersPage from './pages/CareersPage';
import ServicePage from './pages/ServicePage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-navy p-8 text-cream">
          <p className="f-mono text-xs uppercase tracking-widest text-cream/70">
            Something went off-orbit.{' '}
            <button type="button" className="text-gold underline" onClick={() => window.location.reload()}>
              Reload
            </button>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__cygnusLenis) window.__cygnusLenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__cygnusLenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__cygnusLenis;
    };
  }, []);

  return (
    <ErrorBoundary>
      <a
        href="#main"
        className="f-mono sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-widest focus:text-navy"
      >
        Skip to content
      </a>
      <BrowserRouter>
        <ScrollToTop />
        <div className="grain-overlay" aria-hidden="true" />
        <Spotlight />
        <Nav />
        <main id="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ReturnTop />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
