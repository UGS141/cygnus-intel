import { useEffect, useRef } from 'react';

// Living field: fine orbital arcs + drifting points of light with short
// trails. Pointer gently brightens and pulls nearby points. Ambient-only on
// touch; renders one complete still frame under prefers-reduced-motion.
const BLUE = [2, 135, 223];
const TEAL = [1, 164, 152];
const GOLD = [250, 151, 32];

export const LivingField = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let paused = false;
    let points = [];
    let arcs = [];
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const pickColor = () => {
      const r = Math.random();
      if (r < 0.1) return GOLD;
      if (r < 0.32) return TEAL;
      return BLUE;
    };

    const seed = () => {
      const count = Math.min(110, Math.max(45, Math.floor((w * h) / 16000)));
      points = Array.from({ length: count }, () => ({
        cx: Math.random() * w,
        cy: Math.random() * h,
        r: 18 + Math.random() * 150,
        a: Math.random() * Math.PI * 2,
        speed: (0.02 + Math.random() * 0.055) * (Math.random() < 0.5 ? 1 : -1),
        size: 0.6 + Math.random() * 1.2,
        alpha: 0.13 + Math.random() * 0.2,
        color: pickColor(),
      }));
      arcs = Array.from({ length: 6 }, () => ({
        cx: w * (0.25 + Math.random() * 0.5),
        cy: h * (0.2 + Math.random() * 0.6),
        rx: w * (0.28 + Math.random() * 0.5),
        ry: h * (0.16 + Math.random() * 0.35),
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.0005,
        alpha: 0.035 + Math.random() * 0.03,
      }));
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);

      for (const arc of arcs) {
        arc.rot += arc.spin;
        ctx.save();
        ctx.translate(arc.cx, arc.cy);
        ctx.rotate(arc.rot);
        ctx.strokeStyle = `rgba(2,135,223,${arc.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, arc.rx, arc.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      for (const p of points) {
        p.a += p.speed / 60;
        let x = p.cx + Math.cos(p.a) * p.r;
        let y = p.cy + Math.sin(p.a) * p.r * 0.62;
        let alpha = p.alpha;

        if (fine && pointer.x > -999) {
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const d = Math.hypot(dx, dy);
          if (d < 180 && d > 0.001) {
            const pull = 1 - d / 180;
            x += dx * pull * 0.1;
            y += dy * pull * 0.1;
            alpha = Math.min(0.55, alpha + pull * 0.3);
          }
        }

        const [cr, cg, cb] = p.color;
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha * 0.35})`;
        ctx.lineWidth = Math.max(0.5, p.size * 0.7);
        ctx.beginPath();
        ctx.ellipse(p.cx, p.cy, p.r, p.r * 0.62, 0, p.a - 0.4, p.a);
        ctx.stroke();

        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduce) drawFrame();
    };

    const loop = () => {
      if (!paused) drawFrame();
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
    };
    const onToggle = (e) => {
      paused = Boolean(e.detail && e.detail.paused);
    };

    resize();
    window.addEventListener('resize', resize);
    if (fine) window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('cygnus:motion', onToggle);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('cygnus:motion', onToggle);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      data-testid="living-field"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
};
