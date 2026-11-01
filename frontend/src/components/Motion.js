import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Gates: pointer-capable (fine) devices only. Cheap, no re-layout.
export const usePointerFine = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
};

export const useMousePos = () => {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const fine = usePointerFine();

  useEffect(() => {
    if (!fine) return undefined;
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [fine, mx, my]);

  return { mx, my, fine };
};

// Soft localized gold glow that follows the pointer across the whole site.
export const Spotlight = () => {
  const { mx, my, fine } = useMousePos();
  const x = useSpring(mx, { stiffness: 42, damping: 16, mass: 0.9 });
  const y = useSpring(my, { stiffness: 42, damping: 16, mass: 0.9 });
  const left = useTransform(x, (v) => `${(v * 100).toFixed(2)}%`);
  const top = useTransform(y, (v) => `${(v * 100).toFixed(2)}%`);
  const bg = useTransform(
    [left, top],
    ([l, t]) =>
      `radial-gradient(560px circle at ${l} ${t}, rgba(250,151,32,0.07), transparent 62%)`
  );

  if (!fine || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{ background: bg, transform: 'translateZ(0)' }}
    />
  );
};
