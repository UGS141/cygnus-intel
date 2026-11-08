import { useEffect, useRef } from 'react';

// Living field: subtle orbital arcs, gentle drifting micro-particles, and
// sparse 4-point Cygnus star accents that softly brighten and twinkle.
// Respects prefers-reduced-motion by rendering a single still frame without animation.
const BLUE = [2, 135, 223];
const TEAL = [1, 164, 152];
const GOLD = [250, 151, 32];
const CREAM = [244, 240, 230];

export const LivingField = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let paused = false;
    let points = [];
    let stars = [];
    let arcs = [];
    let time = 0;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const pickColor = () => {
      const r = Math.random();
      if (r < 0.2) return GOLD;
      if (r < 0.4) return CREAM;
      if (r < 0.65) return TEAL;
      return BLUE;
    };

    const drawCygnusStar = (context, cx, cy, radius, alpha, color) => {
      context.save();
      context.translate(cx, cy);
      const s = radius / 12;
      const [r, g, b] = color;

      // Soft ambient glow when brightening
      if (alpha > 0.45) {
        const glow = context.createRadialGradient(0, 0, 0, 0, 0, radius * 2.2);
        glow.addColorStop(0, `rgba(${r},${g},${b},${(alpha - 0.45) * 0.6})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(0, 0, radius * 2.2, 0, Math.PI * 2);
        context.fill();
      }

      // Cygnus 4-point star path: M12 0c.9 7.1 4.9 11.1 12 12-7.1.9-11.1 4.9-12 12-.9-7.1-4.9-11.1-12-12C7.1 11.1 11.1 7.1 12 0Z
      context.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      context.beginPath();
      context.moveTo(0, -12 * s);
      context.bezierCurveTo(0.9 * s, -4.9 * s, 4.9 * s, -0.9 * s, 12 * s, 0);
      context.bezierCurveTo(4.9 * s, 0.9 * s, 0.9 * s, 4.9 * s, 0, 12 * s);
      context.bezierCurveTo(-0.9 * s, 4.9 * s, -4.9 * s, 0.9 * s, -12 * s, 0);
      context.bezierCurveTo(-4.9 * s, -0.9 * s, -0.9 * s, -4.9 * s, 0, -12 * s);
      context.closePath();
      context.fill();
      context.restore();
    };

    const seed = () => {
      const isMobile = w < 768;
      // Refined, sparse particle count — never dense or distracting
      const count = isMobile
        ? Math.min(35, Math.max(20, Math.floor((w * h) / 32000)))
        : Math.min(65, Math.max(35, Math.floor((w * h) / 22000)));

      points = Array.from({ length: count }, () => ({
        cx: Math.random() * w,
        cy: Math.random() * h,
        r: 20 + Math.random() * 140,
        a: Math.random() * Math.PI * 2,
        speed: (0.015 + Math.random() * 0.035) * (Math.random() < 0.5 ? 1 : -1),
        size: 0.65 + Math.random() * 1.1,
        alpha: 0.12 + Math.random() * 0.18,
        color: pickColor(),
      }));

      // Sparse star glints (only 6-9 on desktop, 4 on mobile)
      const starCount = isMobile ? 4 : 8;
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.06,
        size: 3.5 + Math.random() * 2.5,
        baseAlpha: 0.2 + Math.random() * 0.25,
        twinkleSpeed: 0.018 + Math.random() * 0.022,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() < 0.65 ? GOLD : CREAM,
      }));

      // Faint orbital background arcs
      arcs = Array.from({ length: isMobile ? 3 : 5 }, () => ({
        cx: w * (0.25 + Math.random() * 0.5),
        cy: h * (0.2 + Math.random() * 0.6),
        rx: w * (0.28 + Math.random() * 0.45),
        ry: h * (0.16 + Math.random() * 0.32),
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.0003,
        alpha: 0.025 + Math.random() * 0.02,
      }));
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);
      time += 1;

      // 1. Faint orbital arcs
      for (const arc of arcs) {
        if (!reduce) arc.rot += arc.spin;
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

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      // 2. Drifting micro-particles
      for (const p of points) {
        if (!reduce) p.a += p.speed / 60;
        let x = p.cx + Math.cos(p.a) * p.r;
        let y = p.cy + Math.sin(p.a) * p.r * 0.62;
        let alpha = p.alpha;

        if (fine && pointer.x > -999) {
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const d = Math.hypot(dx, dy);
          if (d < 160 && d > 0.001) {
            const pull = 1 - d / 160;
            x += dx * pull * 0.08;
            y += dy * pull * 0.08;
            alpha = Math.min(0.48, alpha + pull * 0.25);
          }
        }

        const [cr, cg, cb] = p.color;
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Sparse Cygnus 4-point star glints
      for (const st of stars) {
        if (!reduce) {
          st.x += st.vx;
          st.y += st.vy;
          if (st.x < -20) st.x = w + 20;
          if (st.x > w + 20) st.x = -20;
          if (st.y < -20) st.y = h + 20;
          if (st.y > h + 20) st.y = -20;
        }

        const twinkle = Math.sin(time * st.twinkleSpeed + st.phase);
        const alpha = Math.max(0.12, Math.min(0.72, st.baseAlpha + twinkle * 0.3));
        drawCygnusStar(ctx, st.x, st.y, st.size, alpha, st.color);
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

export default LivingField;
