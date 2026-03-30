/**
 * TempleBackground
 * Absolute-positioned SVG overlay that renders a South Indian temple
 * gopuram silhouette + Vedic astrology symbols (zodiac wheel, Om, moon,
 * sun, nakshatras). Dropped into the hero section on the right side.
 * All elements are faint (low opacity) so they don't overshadow the text.
 */
export default function TempleBackground() {
  const M = (o) => `rgba(139,26,26,${o})`;   // maroon
  const G = (o) => `rgba(201,150,12,${o})`;   // gold

  // Gopuram tiers: [xLeft-bottom, xRight-bottom, xLeft-top, xRight-top, y-bottom, y-top]
  const tiers = [
    [130, 470, 148, 452, 705, 667],
    [148, 452, 164, 436, 667, 632],
    [164, 436, 178, 422, 632, 600],
    [178, 422, 190, 410, 600, 571],
    [190, 410, 200, 400, 571, 545],
    [200, 400, 209, 391, 545, 522],
    [209, 391, 217, 383, 522, 501],
    [217, 383, 224, 376, 501, 483],
    [224, 376, 230, 370, 483, 467],
  ];

  // Points for a 4-pointed star at (cx, cy) with outer radius `r` and inner `ir`
  const star4 = (cx, cy, r, ir) => {
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45 - 90) * (Math.PI / 180);
      const rad = i % 2 === 0 ? r : ir;
      pts.push(`${cx + rad * Math.cos(angle)},${cy + rad * Math.sin(angle)}`);
    }
    return pts.join(' ');
  };

  return (
    <svg
      viewBox="0 0 600 720"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: '-4%',
        top: 0,
        height: '100%',
        width: '58%',
        pointerEvents: 'none',
        zIndex: 1,
        userSelect: 'none',
      }}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        {/* Radial glow behind temple */}
        <radialGradient id="tbGlow" cx="50%" cy="75%" r="45%">
          <stop offset="0%"   stopColor={G(0.13)} />
          <stop offset="60%"  stopColor={G(0.05)} />
          <stop offset="100%" stopColor={G(0)}    />
        </radialGradient>
        {/* Faint vignette for mandala */}
        <radialGradient id="tbMandala" cx="50%" cy="55%" r="50%">
          <stop offset="0%"   stopColor={M(0.04)} />
          <stop offset="100%" stopColor={M(0)}    />
        </radialGradient>
      </defs>

      {/* ── Warm glow behind the temple ─────────────────────── */}
      <ellipse cx="300" cy="560" rx="220" ry="200" fill="url(#tbGlow)" />

      {/* ── Zodiac wheel ─────────────────────────────────────── */}
      {/* Outer ring */}
      <circle cx="300" cy="390" r="285" fill="none" stroke={G(0.08)} strokeWidth="0.9" />
      <circle cx="300" cy="390" r="274" fill="none" stroke={M(0.04)} strokeWidth="0.4" />
      <circle cx="300" cy="390" r="255" fill="none" stroke={G(0.05)} strokeWidth="0.5" />

      {/* 12 major zodiac ticks */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i * 30) - 90) * (Math.PI / 180);
        return (
          <line key={i}
            x1={300 + 268 * Math.cos(a)} y1={390 + 268 * Math.sin(a)}
            x2={300 + 285 * Math.cos(a)} y2={390 + 285 * Math.sin(a)}
            stroke={G(0.22)} strokeWidth="1.4"
          />
        );
      })}

      {/* 36 minor ticks */}
      {Array.from({ length: 36 }, (_, i) => {
        const a = ((i * 10) - 90) * (Math.PI / 180);
        return (
          <line key={i}
            x1={300 + 277 * Math.cos(a)} y1={390 + 277 * Math.sin(a)}
            x2={300 + 285 * Math.cos(a)} y2={390 + 285 * Math.sin(a)}
            stroke={M(0.1)} strokeWidth="0.5"
          />
        );
      })}

      {/* 12 sign dots */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i * 30 + 15) - 90) * (Math.PI / 180);
        const r = 248;
        return (
          <circle key={i}
            cx={300 + r * Math.cos(a)} cy={390 + r * Math.sin(a)}
            r="2.8"
            fill={i % 2 === 0 ? G(0.18) : M(0.14)}
          />
        );
      })}

      {/* ── Inner mandala ────────────────────────────────────── */}
      <circle cx="300" cy="390" r="230" fill="none" stroke={M(0.045)} strokeWidth="0.5" strokeDasharray="5 9" />
      <circle cx="300" cy="390" r="196" fill="none" stroke={G(0.05)}  strokeWidth="0.5" />
      <circle cx="300" cy="390" r="158" fill="none" stroke={M(0.04)}  strokeWidth="0.4" strokeDasharray="3 7" />
      <circle cx="300" cy="390" r="120" fill="none" stroke={G(0.05)}  strokeWidth="0.4" />
      <circle cx="300" cy="390" r="80"  fill="none" stroke={M(0.04)}  strokeWidth="0.4" strokeDasharray="2 5" />

      {/* 8 spokes */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = ((i * 45) - 90) * (Math.PI / 180);
        return (
          <line key={i}
            x1={300 + 158 * Math.cos(a)} y1={390 + 158 * Math.sin(a)}
            x2={300 + 230 * Math.cos(a)} y2={390 + 230 * Math.sin(a)}
            stroke={G(0.07)} strokeWidth="0.6"
          />
        );
      })}

      {/* 8 large lotus petals */}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45} 300 390)`}>
          <path
            d="M300,194 Q320,292 300,390 Q280,292 300,194"
            fill={i % 2 === 0 ? G(0.04) : M(0.03)}
            stroke={i % 2 === 0 ? G(0.08) : M(0.06)}
            strokeWidth="0.5"
          />
        </g>
      ))}

      {/* 8 inner petals (offset 22.5°) */}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45 + 22.5} 300 390)`}>
          <path
            d="M300,272 Q310,331 300,390 Q290,331 300,272"
            fill={i % 2 === 0 ? G(0.03) : M(0.025)}
            stroke={i % 2 === 0 ? G(0.06) : M(0.04)}
            strokeWidth="0.4"
          />
        </g>
      ))}

      {/* ── Floating Vedic symbols ────────────────────────────── */}
      {/* Om ॐ */}
      <text x="300" y="106" textAnchor="middle" fontSize="30"
        fill={G(0.22)} fontFamily="serif" fontStyle="italic">ॐ</text>

      {/* Crescent moon */}
      <text x="116" y="158" textAnchor="middle" fontSize="26"
        fill={M(0.18)} fontFamily="serif">☽</text>

      {/* Sun */}
      <text x="486" y="148" textAnchor="middle" fontSize="24"
        fill={G(0.22)} fontFamily="serif">☀</text>

      {/* Jupiter ♃ */}
      <text x="75" y="300" textAnchor="middle" fontSize="17"
        fill={G(0.18)} fontFamily="serif">♃</text>

      {/* Saturn ♄ */}
      <text x="526" y="285" textAnchor="middle" fontSize="17"
        fill={M(0.16)} fontFamily="serif">♄</text>

      {/* 4-pointed stars (✦) scattered */}
      {[
        [82, 248, 7, 3],
        [516, 232, 8, 3.5],
        [58, 390, 6, 2.5],
        [543, 370, 6, 2.5],
        [155, 118, 5, 2],
        [445, 108, 5, 2],
        [212, 82, 4, 1.8],
        [388, 78, 4, 1.8],
      ].map(([cx, cy, r, ir], i) => (
        <polygon key={i}
          points={star4(cx, cy, r, ir)}
          fill={i % 2 === 0 ? G(0.22) : M(0.18)}
        />
      ))}

      {/* Nakshatra dots (constellation-like clusters) */}
      {[
        [98,212],[112,198],[90,230],[126,208],[484,200],[496,185],[510,218],[470,228],
        [72,328],[86,314],[80,342],[540,308],[524,296],[548,330],
        [168,136],[182,124],[158,150],[412,126],[426,112],[402,142],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.6"
          fill={i % 3 === 0 ? G(0.22) : i % 3 === 1 ? M(0.16) : G(0.14)} />
      ))}

      {/* ── Temple gopuram ───────────────────────────────────── */}
      {/* Shadow / ground glow */}
      <ellipse cx="300" cy="718" rx="200" ry="8"
        fill={M(0.08)} />

      {/* Base slab */}
      <rect x="110" y="706" width="380" height="12" rx="3"
        fill={M(0.13)} stroke={G(0.18)} strokeWidth="0.6" />

      {/* Tiers */}
      {tiers.map(([x1b, x2b, x1t, x2t, yb, yt], i) => {
        const isGold = i % 2 === 0;
        const midY   = yb + (yt - yb) * 0.52;
        const dotCount = Math.max(2, Math.floor((x2b - x1b) / 36));
        return (
          <g key={i}>
            {/* Tier body */}
            <polygon
              points={`${x1b},${yb} ${x2b},${yb} ${x2t},${yt} ${x1t},${yt}`}
              fill={isGold ? G(0.07) : M(0.065)}
              stroke={isGold ? G(0.16) : M(0.13)}
              strokeWidth="0.6"
            />
            {/* Horizontal moulding line */}
            <line
              x1={x1b + (x1t - x1b) * 0.5} y1={midY}
              x2={x2b + (x2t - x2b) * 0.5} y2={midY}
              stroke={G(0.12)} strokeWidth="0.5"
            />
            {/* Deity niche dots across each tier */}
            {Array.from({ length: dotCount }, (_, j) => {
              const spacing = (x2b - x1b) / (dotCount + 1);
              const dotX = x1b + spacing * (j + 1);
              const dotY = yb + (yt - yb) * 0.27;
              return (
                <g key={j}>
                  <circle cx={dotX} cy={dotY} r="2.2"
                    fill={isGold ? G(0.14) : M(0.12)}
                    stroke={isGold ? G(0.2) : M(0.17)}
                    strokeWidth="0.4"
                  />
                  {/* Small arc above each niche dot (miniature arch) */}
                  <path
                    d={`M${dotX - 4},${dotY + 3} Q${dotX},${dotY - 4} ${dotX + 4},${dotY + 3}`}
                    fill="none"
                    stroke={isGold ? G(0.12) : M(0.1)}
                    strokeWidth="0.4"
                  />
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Barrel top (sukanasi vestibule) */}
      <rect x="238" y="413" width="124" height="56" rx="30"
        fill={G(0.09)} stroke={G(0.19)} strokeWidth="0.8" />
      <line x1="238" y1="441" x2="362" y2="441"
        stroke={M(0.12)} strokeWidth="0.5" />
      {/* Barrel centre rosette */}
      <circle cx="300" cy="441" r="14" fill="none"
        stroke={M(0.12)} strokeWidth="0.5" />
      <circle cx="300" cy="441" r="6"
        fill={G(0.1)} stroke={G(0.18)} strokeWidth="0.5" />

      {/* Neck column */}
      <rect x="291" y="396" width="18" height="18"
        fill={M(0.1)} stroke={G(0.16)} strokeWidth="0.5" />

      {/* Kalasha (pot / urn) */}
      <ellipse cx="300" cy="382" rx="17" ry="14"
        fill={G(0.13)} stroke={G(0.24)} strokeWidth="0.9" />
      {/* Kalasha neck */}
      <rect x="295" y="369" width="10" height="9"
        fill={M(0.1)} stroke={G(0.17)} strokeWidth="0.5" />
      {/* Decorative band around kalasha */}
      <line x1="283" y1="382" x2="317" y2="382"
        stroke={G(0.18)} strokeWidth="0.5" />

      {/* Lotus bud final */}
      <ellipse cx="300" cy="363" rx="12" ry="9"
        fill={G(0.16)} stroke={G(0.28)} strokeWidth="0.8" />
      <circle cx="300" cy="353" r="7"
        fill={G(0.2)} stroke={G(0.32)} strokeWidth="0.9" />
      {/* Top finial spike */}
      <line x1="300" y1="346" x2="300" y2="330"
        stroke={M(0.22)} strokeWidth="0.8" />
      {/* Victory flag */}
      <polygon
        points="300,330 316,339 300,348"
        fill={G(0.2)} stroke={G(0.3)} strokeWidth="0.6"
      />
    </svg>
  );
}
