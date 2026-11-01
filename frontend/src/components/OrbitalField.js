import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CREAM = 'rgba(244,240,230,';
const MONO = { fontFamily: "'IBM Plex Mono', monospace" };

export const OrbitalField = ({ x, y, paused }) => {
  const reduce = useReducedMotion();
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !svg.pauseAnimations) return;
    if (paused) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [paused]);

  const draw = (delay) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 1.8, delay, ease: 'easeOut' },
        };

  return (
    <motion.div
      style={{ x, y }}
      className={`relative mx-auto aspect-square w-full max-w-[500px] ${paused ? 'motion-paused' : ''}`}
      data-testid="hero-orbital-svg-container"
    >
      <img
        src="/brand/cygnus-emblem.png"
        alt=""
        aria-hidden="true"
        draggable="false"
        className="absolute left-1/2 top-1/2 w-[37%] -translate-x-1/2 -translate-y-1/2 select-none"
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 800"
        fill="none"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Diagram of the Cygnus emblem inside concentric orbital paths with plotted points and a four-point star"
      >
        <motion.circle cx="400" cy="400" r="324" stroke={CREAM + '0.16)'} strokeWidth="1" {...draw(0.5)} />
        <motion.circle cx="400" cy="400" r="196" stroke={CREAM + '0.14)'} strokeWidth="1" {...draw(0.7)} />
        <motion.circle
          cx="400"
          cy="400"
          r="132"
          strokeDasharray="2 9"
          stroke={CREAM + '0.28)'}
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        />
        <g transform="rotate(-16 400 400)">
          <motion.path
            id="ell-orbit"
            d="M 52 400 a 348 190 0 1 0 696 0 a 348 190 0 1 0 -696 0"
            stroke={CREAM + '0.2)'}
            strokeWidth="1"
            fill="none"
            {...draw(0.9)}
          />
          {!reduce && (
            <>
              <circle r="7" fill="#0287DF">
                <animateMotion dur="28s" repeatCount="indefinite">
                  <mpath href="#ell-orbit" />
                </animateMotion>
              </circle>
              <circle r="3" fill="#FB5040" opacity="0.9">
                <animateMotion dur="28s" begin="-2.4s" repeatCount="indefinite">
                  <mpath href="#ell-orbit" />
                </animateMotion>
              </circle>
            </>
          )}
        </g>
        {!reduce && (
          <>
            <g className="orb-spin" style={{ '--dur': '38s' }}>
              <circle cx="400" cy="204" r="6" fill="#FA9720" />
            </g>
            <g className="orb-spin-rev" style={{ '--dur': '64s' }}>
              <circle cx="400" cy="140" r="5" fill="#01A498" />
            </g>
            <g className="orb-spin" style={{ '--dur': '24s' }}>
              <circle cx="400" cy="268" r="3.5" fill="rgba(244,240,230,0.7)" />
            </g>
          </>
        )}
        {reduce && (
          <>
            <circle cx="400" cy="204" r="6" fill="#FA9720" />
            <circle cx="400" cy="140" r="5" fill="#01A498" />
          </>
        )}
        <g className={reduce ? '' : 'star-glow'}>
          <path
            d="M646 128 c1.8 14.2 9.8 22.2 24 24 -14.2 1.8 -22.2 9.8 -24 24 -1.8 -14.2 -9.8 -22.2 -24 -24 14.2 -1.8 22.2 -9.8 24 -24 Z"
            fill="#FA9720"
          />
        </g>
        <line x1="646" y1="182" x2="646" y2="212" stroke={CREAM + '0.35)'} strokeWidth="1" />
        <text x="646" y="232" textAnchor="middle" fill={CREAM + '0.85)'} fontSize="11" letterSpacing="2" style={MONO}>
          STAR, FOUR-POINT
        </text>
        <text x="40" y="92" fill={CREAM + '0.9)'} fontSize="12" letterSpacing="3" style={MONO}>
          CYGNUS — THE SWAN
        </text>
        <text x="40" y="114" fill={CREAM + '0.72)'} fontSize="11" style={MONO}>
          α Cygni · Deneb · northern sky
        </text>
        <text x="40" y="760" fill={CREAM + '0.75)'} fontSize="11" letterSpacing="3" style={MONO}>
          FIG. 01 — ORBITAL FIELD
        </text>
        <line x1="40" y1="774" x2="190" y2="774" stroke={CREAM + '0.35)'} strokeWidth="1" />
      </svg>
    </motion.div>
  );
};
