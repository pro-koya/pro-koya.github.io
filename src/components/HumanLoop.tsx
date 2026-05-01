'use client';

import { useEffect, useState } from 'react';

const PHASES = [
  { key: 'MOVE', jp: '走る・鍛える', sub: '心拍が、思考の輪郭をくっきりさせる。' },
  { key: 'GROW', jp: '土に触れる', sub: '芽吹きは、待つことで返ってくる。' },
  { key: 'SHARE', jp: '感じたことを残す', sub: '言葉にすると、輪郭が見えてくる。' },
  { key: 'BUILD', jp: 'たまに仕組みにする', sub: '実感を、誰かの暮らしへつなぐ。' },
] as const;

const PERIOD = 14;
const PHASE_DUR = PERIOD / 4;

/* ── MOVE: runner dots ── */
function PhaseMove({ local }: { local: number }) {
  const dots = 28;
  return (
    <svg viewBox="0 0 1280 620" preserveAspectRatio="xMidYMid slice" className="hl-svg">
      <line x1="0" y1="340" x2="1280" y2="340" stroke="rgba(244,241,234,0.2)" strokeWidth="1" />
      {Array.from({ length: dots }).map((_, i) => {
        const x = (i / (dots - 1)) * 1280;
        const passed = local * dots;
        const lit = i < passed;
        return <circle key={i} cx={x} cy={340} r={lit ? 4 : 2} fill={lit ? 'var(--rust)' : 'rgba(244,241,234,0.3)'} />;
      })}
      <circle cx={local * 1280} cy={340} r={9} fill="var(--rust)">
        <animate attributeName="r" values="9;12;9" dur="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx={local * 1280} cy={340} r={20} fill="none" stroke="var(--rust)" strokeWidth="1" opacity="0.35" />
      {[0.25, 0.5, 0.75].map((m) => (
        <g key={m}>
          <line x1={m * 1280} y1={330} x2={m * 1280} y2={350} stroke="rgba(244,241,234,0.35)" strokeWidth="1" />
          <text x={m * 1280} y={370} fill="rgba(244,241,234,0.4)" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="2">
            {(m * 10).toFixed(1)}KM
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ── GROW: organic ring growth ── */
function PhaseGrow({ local }: { local: number }) {
  const cx = 640;
  const cy = 320;
  const ease = (x: number) => x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;
  const t = ease(local);

  const ringCount = 5;
  const maxR = 180;
  const particles = 12;

  return (
    <svg viewBox="0 0 1280 620" preserveAspectRatio="xMidYMid slice" className="hl-svg">
      {/* Soil line */}
      <line x1="200" y1="480" x2="1080" y2="480" stroke="rgba(244,241,234,0.15)" strokeWidth="1" strokeDasharray="4 6" />

      {/* Concentric growing rings */}
      {Array.from({ length: ringCount }).map((_, i) => {
        const delay = i * 0.12;
        const progress = Math.max(0, Math.min(1, (t - delay) / (1 - delay)));
        const r = progress * maxR * ((i + 1) / ringCount);
        const opacity = (1 - i / ringCount) * 0.4 * progress;
        return (
          <circle
            key={`ring-${i}`}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={i === 0 ? 'var(--rust)' : 'rgba(244,241,234,0.5)'}
            strokeWidth={i === 0 ? 1.5 : 0.8}
            opacity={opacity}
          />
        );
      })}

      {/* Center seed */}
      <circle cx={cx} cy={cy} r={4 + t * 4} fill="var(--rust)" opacity={0.6 + t * 0.4} />

      {/* Orbiting particles - leaves/seeds */}
      {Array.from({ length: particles }).map((_, i) => {
        const angle = (i / particles) * Math.PI * 2 + t * Math.PI * 1.2;
        const orbitR = 30 + t * (60 + (i % 3) * 40);
        const px = cx + Math.cos(angle) * orbitR;
        const py = cy + Math.sin(angle) * orbitR * 0.7;
        const size = 2 + (i % 3);
        const opacity = Math.max(0, Math.min(0.7, t * 1.5 - i * 0.05));
        return (
          <circle
            key={`p-${i}`}
            cx={px} cy={py} r={size}
            fill={i % 4 === 0 ? 'var(--rust)' : 'rgba(244,241,234,0.6)'}
            opacity={opacity}
          />
        );
      })}

      {/* Rising stems — center reaches the seed, sides shorter */}
      {[-120, 0, 120].map((offsetX, i) => {
        const isCenter = i === 1;
        const stemDelay = isCenter ? 0 : 0.12 + Math.abs(i - 1) * 0.1;
        const stemProgress = Math.max(0, Math.min(1, (t - stemDelay) * 1.6));
        const stemX = cx + offsetX;
        const stemBase = 480;
        const stemTarget = isCenter ? cy : stemBase - stemProgress * 80;
        const stemTop = isCenter ? stemBase - stemProgress * (stemBase - cy) : stemTarget;
        return (
          <g key={`stem-${i}`} opacity={stemProgress * 0.8}>
            <line
              x1={stemX} y1={stemBase}
              x2={stemX} y2={stemTop}
              stroke={isCenter ? 'var(--rust)' : 'rgba(244,241,234,0.45)'}
              strokeWidth={isCenter ? 2 : 1}
            />
            {!isCenter && (
              <circle cx={stemX} cy={stemTop} r={3} fill="rgba(244,241,234,0.5)" />
            )}
          </g>
        );
      })}

      <text x={cx} y={508} textAnchor="middle" fill="rgba(244,241,234,0.4)" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
        SOIL · D+{String(Math.floor(local * 28)).padStart(2, '0')}
      </text>
    </svg>
  );
}

/* ── SHARE: radiating waves ── */
function PhaseShare({ local }: { local: number }) {
  return (
    <svg viewBox="0 0 1280 620" preserveAspectRatio="xMidYMid slice" className="hl-svg">
      <circle cx={640} cy={280} r={6} fill="var(--rust)" />
      {[0, 1, 2, 3, 4].map((i) => {
        const p = (local + i * 0.2) % 1;
        const r = p * 400;
        return <circle key={i} cx={640} cy={280} r={r} fill="none" stroke="rgba(244,241,234,0.5)" strokeWidth="1" opacity={1 - p} />;
      })}
    </svg>
  );
}

/* ── BUILD: stacking blocks ── */
function PhaseBuild({ local }: { local: number }) {
  const blocks = 7;
  return (
    <svg viewBox="0 0 1280 620" preserveAspectRatio="xMidYMid slice" className="hl-svg">
      <line x1="0" y1="420" x2="1280" y2="420" stroke="rgba(244,241,234,0.2)" strokeWidth="1" />
      {Array.from({ length: blocks }).map((_, i) => {
        const progress = local * blocks - i;
        if (progress < 0) return null;
        const eased = Math.min(1, progress);
        const w = 80;
        const h = 24;
        const gap = 8;
        const x = 640 - (blocks * (w + gap) - gap) / 2 + i * (w + gap);
        const y = 420 - h - i * (h + 4) * eased;
        const rotate = (1 - eased) * -8;
        return (
          <g key={i} transform={`translate(${x + w / 2}, ${y + h / 2}) rotate(${rotate}) translate(${-w / 2}, ${-h / 2})`} opacity={eased}>
            <rect x="0" y="0" width={w} height={h} fill={i === blocks - 1 ? 'var(--rust)' : 'rgba(244,241,234,0.92)'} />
          </g>
        );
      })}
    </svg>
  );
}

export default function HumanLoop() {
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const phaseRaw = (t % PERIOD) / PERIOD;
  const idx = Math.min(3, Math.max(0, Math.floor(phaseRaw * 4)));
  const local = (t % PHASE_DUR) / PHASE_DUR;
  const cur = PHASES[idx];

  return (
    <div className="human-loop">
      {/* Grid background */}
      <svg viewBox="0 0 1280 620" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}>
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="620" stroke="rgba(244,241,234,0.5)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="1280" y2={i * 100} stroke="rgba(244,241,234,0.5)" strokeWidth="0.5" />
        ))}
      </svg>

      {/* Crossfading typography — positioned in upper area */}
      {PHASES.map((phase, i) => (
        <div
          key={phase.key}
          className="hl-typo-layer"
          style={{
            opacity: i === idx ? 1 : 0,
            transition: 'opacity .9s ease',
          }}
        >
          <div
            className="hl-typo-text"
            style={{ transform: `translateY(${(1 - local) * 6}px)` }}
          >
            {phase.key}
          </div>
        </div>
      ))}

      {/* Phase motion — constrained to upper zone */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {idx === 0 && <PhaseMove local={local} />}
        {idx === 1 && <PhaseGrow local={local} />}
        {idx === 2 && <PhaseShare local={local} />}
        {idx === 3 && <PhaseBuild local={local} />}
      </div>

      {/* Bottom gradient for text readability */}
      <div className="hl-bottom-fade" />

      {/* Meta bar top */}
      <div className="hl-meta-top">
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.24em', color: 'rgba(244,241,234,0.55)' }}>
          FIELD LOOP / {String(idx + 1).padStart(2, '0')} OF 04
        </div>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.24em', color: 'rgba(244,241,234,0.55)' }}>
          NO.001 / KOYA
        </div>
      </div>

      {/* Sub label */}
      <div className="hl-sub-label">
        <div className="hl-sub-jp">{cur.jp}</div>
        <div className="hl-sub-copy">{cur.sub}</div>
      </div>

      {/* Phase strip */}
      <div className="hl-strip">
        {PHASES.map((phase, i) => (
          <div
            key={phase.key}
            className="hl-strip-item"
            style={{
              borderRight: i < 3 ? '1px solid rgba(244,241,234,0.18)' : 'none',
              opacity: i === idx ? 1 : 0.42,
              transition: 'opacity .4s',
              background: i === idx ? 'rgba(244,241,234,0.04)' : 'transparent',
            }}
          >
            <div className="hl-phase-label" style={{ fontFamily: 'var(--f-display)', fontWeight: 800, letterSpacing: '0.16em' }}>
              {String(i + 1).padStart(2, '0')} · {phase.key}
            </div>
            {i === idx && (
              <div style={{ position: 'absolute', left: 0, bottom: 0, height: 2, background: 'var(--rust)', width: `${local * 100}%` }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
