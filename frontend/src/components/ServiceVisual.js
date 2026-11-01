const MONO = { fontFamily: "'IBM Plex Mono', monospace" };
const CREAM = 'rgba(244,240,230,';

const FigLabel = ({ children }) => (
  <text x="20" y="286" fontSize="9" letterSpacing="2" fill={CREAM + '0.55)'} style={MONO}>
    {children}
  </text>
);

// Four original SVG scenes — one per service page. Lightweight CSS/SVG motion only.
export const ServiceVisual = ({ kind, accent = '#FA9720' }) => {
  if (kind === 'orbit')
    return (
      <svg viewBox="0 0 400 300" fill="none" role="img" aria-label="Animated orbital paths around a central point" className="h-auto w-full">
        <ellipse cx="200" cy="150" rx="170" ry="100" stroke={CREAM + '0.18)'} />
        <ellipse cx="200" cy="150" rx="120" ry="64" stroke={CREAM + '0.14)'} strokeDasharray="2 7" />
        <g className="orb-spin" style={{ '--dur': '26s' }}>
          <circle cx="200" cy="50" r="5" fill={accent} />
        </g>
        <g className="orb-spin-rev" style={{ '--dur': '40s' }}>
          <circle cx="200" cy="214" r="3.5" fill={CREAM + '0.65)'} />
        </g>
        <circle cx="200" cy="150" r="7" fill={accent} />
        <circle cx="200" cy="150" r="15" stroke={accent} strokeOpacity="0.4" fill="none" />
        <FigLabel>FIG. S — AUTOMATION LOOP</FigLabel>
      </svg>
    );

  if (kind === 'plot')
    return (
      <svg viewBox="0 0 400 300" fill="none" role="img" aria-label="A plotted curve with a scanning line moving across it" className="h-auto w-full">
        <line x1="30" y1="270" x2="380" y2="270" stroke={CREAM + '0.18)'} />
        <line x1="30" y1="270" x2="30" y2="30" stroke={CREAM + '0.18)'} />
        <path d="M 30 250 C 90 190, 140 230, 190 150 C 230 90, 300 110, 370 50" stroke={accent} strokeWidth="1.5" fill="none" />
        <circle cx="90" cy="196" r="4" fill={accent} />
        <circle cx="190" cy="150" r="4" fill={CREAM + '0.7)'} />
        <circle cx="280" cy="98" r="4" fill={accent} />
        <circle cx="370" cy="50" r="4" fill={CREAM + '0.7)'} />
        <line x1="0" y1="30" x2="0" y2="270" stroke={accent} strokeOpacity="0.5" className="scan-line" />
        <FigLabel>FIG. S — PLOTTED ANALYSIS</FigLabel>
      </svg>
    );

  if (kind === 'tracks')
    return (
      <svg viewBox="0 0 400 300" fill="none" role="img" aria-label="Three parallel tracks with points moving along them and connecting links" className="h-auto w-full">
        <line x1="20" y1="70" x2="380" y2="70" stroke={CREAM + '0.16)'} />
        <line x1="20" y1="150" x2="380" y2="150" stroke={CREAM + '0.16)'} />
        <line x1="20" y1="230" x2="380" y2="230" stroke={CREAM + '0.16)'} />
        <circle cy="70" r="4" fill={accent} className="dash-dot" style={{ '--dur': '7s', '--delay': '0s' }} />
        <circle cy="150" r="4" fill={CREAM + '0.7)'} className="dash-dot" style={{ '--dur': '9s', '--delay': '-3s' }} />
        <circle cy="230" r="4" fill={accent} className="dash-dot" style={{ '--dur': '11s', '--delay': '-6s' }} />
        <line x1="200" y1="70" x2="200" y2="150" stroke={accent} className="track-pulse" />
        <line x1="290" y1="150" x2="290" y2="230" stroke={accent} className="track-pulse" style={{ animationDelay: '-1.5s' }} />
        <FigLabel>FIG. S — CONNECTED TRACKS</FigLabel>
      </svg>
    );

  return (
    <svg viewBox="0 0 400 300" fill="none" role="img" aria-label="A dashed arc rising above a horizon line toward a four-point star" className="h-auto w-full">
      <line x1="20" y1="220" x2="380" y2="220" stroke={CREAM + '0.2)'} />
      <path d="M 70 220 A 130 130 0 0 1 330 220" stroke={CREAM + '0.12)'} strokeDasharray="2 8" />
      <path d="M 30 220 A 170 170 0 0 1 370 220" stroke={CREAM + '0.09)'} strokeDasharray="2 8" />
      <path d="M 20 220 C 140 220, 240 180, 380 70" stroke={accent} strokeWidth="1.5" strokeDasharray="6 8" className="arc-flow" />
      <g className="star-glow">
        <path d="M380 56 c1.2 9.8 6.6 15.2 16.4 16.4 -9.8 1.2 -15.2 6.6 -16.4 16.4 -1.2 -9.8 -6.6 -15.2 -16.4 -16.4 9.8 -1.2 15.2 -6.6 16.4 -16.4 Z" fill={accent} />
      </g>
      <FigLabel>FIG. S — LONG HORIZON</FigLabel>
    </svg>
  );
};
