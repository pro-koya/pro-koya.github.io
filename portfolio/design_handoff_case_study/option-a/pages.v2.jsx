// Option A v2 — Athlete Editorial · brushed-up pages
// All 5 pages, PC + SP. Scroll-reveal, parallax title rows, richer human-loop.

/* ═══════════════ shared helpers ═══════════════ */
function useScrollReveal(rootSelector) {
  React.useEffect(() => {
    const root = rootSelector ? document.querySelector(rootSelector) : null;
    const targets = (root || document).querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.12, root: root && root.classList.contains('scroll') ? root : null });
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, [rootSelector]);
}

function useScrollY(scrollEl) {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    if (!scrollEl) return;
    const on = () => setY(scrollEl.scrollTop);
    scrollEl.addEventListener('scroll', on, { passive: true });
    on();
    return () => scrollEl.removeEventListener('scroll', on);
  }, [scrollEl]);
  return y;
}

function Frame({ sp, height, children, label }) {
  const W = sp ? 390 : 1280;
  const ref = React.useRef(null);
  const [el, setEl] = React.useState(null);
  React.useEffect(() => { setEl(ref.current); }, []);
  return (
    <div className={`opa2 frame ${sp ? 'sp' : ''}`} style={{ width: W, height: height || (sp ? 1800 : 2400) }} data-screen-label={label}>
      <div className="scroll" ref={ref}>
        <FrameCtx.Provider value={el}>{children}</FrameCtx.Provider>
      </div>
    </div>
  );
}
const FrameCtx = React.createContext(null);

/* ═══════════════ NAV / TICKER / FOOTER ═══════════════ */
const A2_NAV = [
  { label: 'About', key: 'about', n: '01' },
  { label: 'Works', key: 'works', n: '02' },
  { label: 'Journal', key: 'journal', n: '03' },
  { label: 'Contact', key: 'contact', n: '04' },
];

function A2Nav({ active, sp }) {
  return (
    <header className="nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: sp ? 14 : 32 }}>
        <div className="brand">
          <span className="brand-dot"></span>
          <span>MIYABAYASI&nbsp;KOYA</span>
        </div>
        {!sp && <span className="nav-meta">N°001 / Personal Field</span>}
      </div>
      <nav className="nav-links">
        {A2_NAV.map(n => (
          <a key={n.key} href="#" className={active === n.key ? 'active' : ''}>
            <span className="num">{n.n}</span>{n.label}
          </a>
        ))}
      </nav>
      <div className="nav-burger" aria-hidden><span></span><span></span><span></span></div>
    </header>
  );
}

function A2Ticker() {
  const items = ['MOVE', 'GROW', 'SHARE', 'BUILD', 'よく動き、よく食べ、よくつくる', 'EST. KOYA', 'PERSONAL FIELD', 'NO.001'];
  const all = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-inner">{all.map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  );
}

function A2Footer({ sp }) {
  const scrollEl = React.useContext(FrameCtx);
  const y = useScrollY(scrollEl);
  const par = Math.min(80, y * 0.04);
  return (
    <footer className="footer">
      <div className="footer-display" style={{ transform: `translateX(${-par}px)` }}>
        MOVE.<br/>EAT.<br/>MAKE.
      </div>
      <div style={{ fontFamily: 'var(--f-jp)', fontWeight: 600, fontSize: sp ? 16 : 20, marginBottom: 32, opacity: 0.85 }}>
        よく動き、よく食べ、よくつくる。
      </div>
      <div className="footer-row">
        <div>
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>MIYABAYASI KOYA</div>
          <div className="footer-links">
            <a>Instagram</a><a>X</a><a>note</a><a>GitHub</a><a>Contact</a>
          </div>
        </div>
        <div className="meta" style={{ textAlign: sp ? 'left' : 'right' }}>
          © 2026 — KOYA<br/>NO.001 / VOL.A
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════ HUMAN LOOP v2 ═══════════════ */
/* Four phases on a black field. Each phase has its own iconographic motion:
   MOVE — runner ticks across a horizon
   GROW — sprout climbs upward, leaves unfurl
   SHARE — sound waves radiate
   BUILD — blocks stack into a structure
   With huge MOVE/GROW/SHARE/BUILD typography crossfading. */

function HumanLoop2({ sp }) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, start = performance.now();
    const tick = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const period = 14; // total
  const phaseDur = period / 4;
  const phaseRaw = (t % period) / period; // 0..1
  const idx = Math.min(3, Math.max(0, Math.floor(phaseRaw * 4)));
  const local = (t % phaseDur) / phaseDur; // 0..1 within the active phase

  const phases = [
    { key: 'MOVE',  jp: '走る・鍛える',       sub: '心拍が、思考の輪郭をくっきりさせる。' },
    { key: 'GROW',  jp: '土に触れる',         sub: '芽吹きは、待つことで返ってくる。' },
    { key: 'SHARE', jp: '感じたことを残す',    sub: '言葉にすると、輪郭が見えてくる。' },
    { key: 'BUILD', jp: 'たまに仕組みにする',  sub: '実感を、誰かの暮らしへつなぐ。' },
  ];
  const cur = phases[idx];

  const H = sp ? 480 : 620;

  return (
    <div style={{ position: 'relative', height: H, background: 'var(--ink)', color: 'var(--paper)', overflow: 'hidden' }}>
      {/* grid background */}
      <svg viewBox="0 0 1280 620" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}>
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={'v' + i} x1={i * 100} y1="0" x2={i * 100} y2="620" stroke="rgba(244,241,234,0.5)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={'h' + i} x1="0" y1={i * 100} x2="1280" y2={i * 100} stroke="rgba(244,241,234,0.5)" strokeWidth="0.5" />
        ))}
      </svg>

      {/* huge crossfading typography */}
      {phases.map((p, i) => (
        <div key={p.key} style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: i === idx ? 1 : 0,
          transition: 'opacity .9s ease',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: 'var(--f-display)', fontWeight: 800,
            fontSize: sp ? 130 : 360, letterSpacing: '-0.045em', lineHeight: 0.85,
            color: 'var(--paper)',
            transform: `translateY(${(1 - local) * 6}px)`,
            opacity: 0.95,
          }}>{p.key}</div>
        </div>
      ))}

      {/* per-phase motion overlay */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {idx === 0 && <PhaseMove sp={sp} local={local} />}
        {idx === 1 && <PhaseGrow sp={sp} local={local} />}
        {idx === 2 && <PhaseShare sp={sp} local={local} />}
        {idx === 3 && <PhaseBuild sp={sp} local={local} />}
      </div>

      {/* meta bar top */}
      <div style={{
        position: 'absolute', top: sp ? 18 : 28, left: sp ? 20 : 40, right: sp ? 20 : 40,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, zIndex: 5,
      }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.24em', color: 'rgba(244,241,234,0.55)' }}>
          FIELD LOOP / {String(idx + 1).padStart(2, '0')} OF 04
        </div>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.24em', color: 'rgba(244,241,234,0.55)' }}>
          NO.001 / KOYA
        </div>
      </div>

      {/* sub label */}
      <div style={{
        position: 'absolute', left: sp ? 20 : 40, bottom: sp ? 70 : 100, zIndex: 5,
        maxWidth: sp ? '85%' : 360,
      }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--rust-2)', marginBottom: 8 }}>
          {cur.jp}
        </div>
        <div style={{ fontFamily: 'var(--f-jp)', fontSize: sp ? 14 : 16, lineHeight: 1.85, color: 'rgba(244,241,234,0.85)' }}>
          {cur.sub}
        </div>
      </div>

      {/* phase strip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 5,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid rgba(244,241,234,0.18)',
      }}>
        {phases.map((p, i) => (
          <div key={p.key} style={{
            padding: sp ? '12px 12px' : '16px 18px',
            borderRight: i < 3 ? '1px solid rgba(244,241,234,0.18)' : 'none',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            opacity: i === idx ? 1 : 0.42, transition: 'opacity .4s',
            background: i === idx ? 'rgba(244,241,234,0.04)' : 'transparent',
            position: 'relative',
          }}>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: sp ? 14 : 18, letterSpacing: '0.16em' }}>
              {String(i + 1).padStart(2, '0')} · {p.key}
            </div>
            {i === idx && (
              <div style={{ position: 'absolute', left: 0, bottom: 0, height: 2, background: 'var(--rust)', width: `${local * 100}%` }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* MOVE: dotted track + runner ticks */
function PhaseMove({ sp, local }) {
  const dots = 28;
  return (
    <svg viewBox="0 0 1280 620" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <line x1="0" y1="430" x2="1280" y2="430" stroke="rgba(244,241,234,0.25)" strokeWidth="1" />
      {Array.from({ length: dots }).map((_, i) => {
        const x = (i / (dots - 1)) * 1280;
        const passed = local * dots;
        const lit = i < passed;
        return <circle key={i} cx={x} cy={430} r={lit ? 4 : 2} fill={lit ? 'var(--rust)' : 'rgba(244,241,234,0.4)'} />;
      })}
      <circle cx={local * 1280} cy={430} r={9} fill="var(--rust)">
        <animate attributeName="r" values="9;11;9" dur="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx={local * 1280} cy={430} r={18} fill="none" stroke="var(--rust)" strokeWidth="1" opacity="0.4" />
      {/* mile markers */}
      {[0.25, 0.5, 0.75].map(m => (
        <g key={m}>
          <line x1={m * 1280} y1={420} x2={m * 1280} y2={440} stroke="rgba(244,241,234,0.4)" strokeWidth="1" />
          <text x={m * 1280} y={460} fill="rgba(244,241,234,0.5)" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="2">{(m * 10).toFixed(1)}KM</text>
        </g>
      ))}
    </svg>
  );
}

/* GROW: sprout climbs */
function PhaseGrow({ sp, local }) {
  const baseY = 540, topY = baseY - local * 280;
  return (
    <svg viewBox="0 0 1280 620" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {/* soil line */}
      <line x1="0" y1={baseY} x2="1280" y2={baseY} stroke="rgba(244,241,234,0.3)" strokeWidth="1" strokeDasharray="6 4" />
      {/* center sprout */}
      <g transform="translate(640, 0)">
        <line x1="0" y1={baseY} x2="0" y2={topY} stroke="var(--rust)" strokeWidth="2" />
        {/* leaves */}
        {local > 0.35 && (
          <path d={`M 0 ${baseY - (baseY - topY) * 0.6} Q -40 ${baseY - (baseY - topY) * 0.65} -50 ${baseY - (baseY - topY) * 0.5}`} stroke="rgba(244,241,234,0.85)" strokeWidth="1.5" fill="none" />
        )}
        {local > 0.55 && (
          <path d={`M 0 ${baseY - (baseY - topY) * 0.75} Q 40 ${baseY - (baseY - topY) * 0.8} 50 ${baseY - (baseY - topY) * 0.65}`} stroke="rgba(244,241,234,0.85)" strokeWidth="1.5" fill="none" />
        )}
        <circle cx={0} cy={topY} r="5" fill="var(--paper)" />
      </g>
      {/* secondary sprouts */}
      {[300, 980].map((x, i) => {
        const ll = Math.max(0, local - 0.15 - i * 0.08);
        const y2 = baseY - ll * 200;
        return (
          <g key={x}>
            <line x1={x} y1={baseY} x2={x} y2={y2} stroke="rgba(244,241,234,0.5)" strokeWidth="1.5" />
            <circle cx={x} cy={y2} r="3" fill="rgba(244,241,234,0.7)" />
          </g>
        );
      })}
      <text x={640} y={baseY + 28} textAnchor="middle" fill="rgba(244,241,234,0.5)" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="2">SOIL · D+{String(Math.floor(local * 28)).padStart(2, '0')}</text>
    </svg>
  );
}

/* SHARE: radiating waves from a point */
function PhaseShare({ sp, local }) {
  return (
    <svg viewBox="0 0 1280 620" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <circle cx={640} cy={310} r={6} fill="var(--rust)" />
      {[0, 1, 2, 3, 4].map(i => {
        const p = (local + i * 0.2) % 1;
        const r = p * 480;
        return <circle key={i} cx={640} cy={310} r={r} fill="none" stroke="rgba(244,241,234,0.6)" strokeWidth="1" opacity={1 - p} />;
      })}
      <text x={640} y={580} textAnchor="middle" fill="rgba(244,241,234,0.5)" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="2">SIGNAL · TX</text>
    </svg>
  );
}

/* BUILD: blocks stack */
function PhaseBuild({ sp, local }) {
  const blocks = 7;
  return (
    <svg viewBox="0 0 1280 620" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <line x1="0" y1="500" x2="1280" y2="500" stroke="rgba(244,241,234,0.3)" strokeWidth="1" />
      {Array.from({ length: blocks }).map((_, i) => {
        const t = local * blocks - i;
        if (t < 0) return null;
        const eased = Math.min(1, t);
        const w = 80, h = 24, gap = 8;
        const x = 640 - (blocks * (w + gap) - gap) / 2 + i * (w + gap);
        const y = 500 - h - i * (h + 4) * eased;
        const rotate = (1 - eased) * -8;
        return (
          <g key={i} transform={`translate(${x + w / 2}, ${y + h / 2}) rotate(${rotate}) translate(${-w / 2}, ${-h / 2})`} opacity={eased}>
            <rect x="0" y="0" width={w} height={h} fill={i === blocks - 1 ? 'var(--rust)' : 'rgba(244,241,234,0.92)'} />
          </g>
        );
      })}
      <text x={640} y={560} textAnchor="middle" fill="rgba(244,241,234,0.5)" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="2">BUILD · STEP {Math.min(blocks, Math.ceil(local * blocks))}/{blocks}</text>
    </svg>
  );
}

/* ═══════════════ HOME ═══════════════ */
function A2Home({ sp }) {
  const ref = React.useRef(null);
  useScrollReveal();
  return (
    <Frame sp={sp} height={sp ? 2000 : 2700} label="01 Home">
      <A2Nav active="" sp={sp} />
      <HeroV2 sp={sp} />
      <HumanLoop2 sp={sp} />
      <ConceptV2 sp={sp} />
      <A2Ticker />
      <JournalSectionV2 sp={sp} />
      <div className="rule-strong"></div>
      <WorksSectionV2 sp={sp} />
      <ContactPreviewV2 sp={sp} />
      <A2Footer sp={sp} />
    </Frame>
  );
}

function HeroV2({ sp }) {
  const scrollEl = React.useContext(FrameCtx);
  const y = useScrollY(scrollEl);
  return (
    <section style={{ padding: sp ? '32px 18px 0' : '48px 40px 0', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp ? 24 : 36 }}>
        <div className="eyebrow">Vol.01 · Personal Field</div>
        <div className="number" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>2026 / SPRING</div>
      </div>
      <h1 className="display reveal" style={{ fontSize: sp ? 60 : 184, transform: `translateX(${-y * 0.05}px)` }}>
        MOVE.<br/>EAT.<br/><span className="it">MAKE.</span>
      </h1>
      <div style={{ display: 'flex', flexDirection: sp ? 'column' : 'row', justifyContent: 'space-between', alignItems: sp ? 'flex-start' : 'flex-end', gap: 24, marginTop: sp ? 28 : 60 }}>
        <div className="reveal delay-1" style={{ maxWidth: sp ? '100%' : 420, fontSize: sp ? 14 : 16, lineHeight: 1.95 }}>
          <strong style={{ fontWeight: 700 }}>よく動き、よく食べ、よくつくる。</strong><br/>
          身体を動かし、土に触れ、日々の実感を発信。<br/>
          たまに、Webサービスやアプリへ変換。
        </div>
        <div className="reveal delay-2" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn btn-fill">Journalを見る <span className="arrow"></span></button>
          <button className="btn">Worksを見る <span className="arrow"></span></button>
        </div>
      </div>
      <div className="reveal delay-3" style={{ marginTop: sp ? 32 : 60, display: 'grid', gridTemplateColumns: sp ? '1fr' : '7fr 5fr', gap: sp ? 12 : 18 }}>
        <div className="ph" style={{ aspectRatio: sp ? '4/3' : '16/9' }}>
          <span className="corner">PLATE 01</span>
          <span>RUNNING · DAWN</span><span style={{ opacity: 0.6 }}>HERO_001.JPG</span>
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: sp ? 12 : 18 }}>
          <div className="ph green" style={{ aspectRatio: sp ? '4/3' : '16/7' }}>
            <span className="corner">PLATE 02</span>
            <span>SOIL · HANDS</span><span style={{ opacity: 0.6 }}>HERO_002.JPG</span>
          </div>
          <div className="ph dark" style={{ aspectRatio: sp ? '4/3' : '16/7' }}>
            <span className="corner">PLATE 03</span>
            <span>DESK · BUILD</span><span style={{ opacity: 0.6 }}>HERO_003.JPG</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: sp ? 32 : 56, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--ink)', paddingTop: 18 }}>
        <span className="number" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>SCROLL ↓</span>
        <span className="number" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>4 FIELDS · 4 PRACTICES · 1 PERSON</span>
      </div>
    </section>
  );
}

function ConceptV2({ sp }) {
  return (
    <section style={{ padding: sp ? '70px 18px' : '160px 40px', display: 'grid', gridTemplateColumns: sp ? '1fr' : '5fr 7fr', gap: sp ? 24 : 80, alignItems: 'start' }}>
      <div className="reveal">
        <div className="eyebrow" style={{ marginBottom: 22 }}>02 — Concept</div>
        <h2 className="display" style={{ fontSize: sp ? 32 : 64, lineHeight: 1.0 }}>
          AI時代に、<br/>身体でわかることを<br/>大事にしたい。
        </h2>
      </div>
      <div className="reveal delay-1" style={{ fontSize: sp ? 14 : 16, lineHeight: 2.05, paddingTop: sp ? 0 : 12 }}>
        <p style={{ marginBottom: '1.4em' }}>AIが文章を書き、コードを書き、仕事の進め方まで変えていく時代。</p>
        <p style={{ marginBottom: '1.4em' }}>だからこそ、走ること、鍛えること、土に触れること、食べるものを育てることを大事にしたい。</p>
        <p style={{ marginBottom: '1.4em', borderLeft: '2px solid var(--rust)', paddingLeft: 18, fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: sp ? 17 : 22, lineHeight: 1.55 }}>
          便利なものは使う。<br/>でも、生きる感覚までは手放さない。
        </p>
        <p>運動、農業、発信、ものづくり。<br/>その実践を、このサイトに残していきます。</p>
      </div>
    </section>
  );
}

const A2_WORKS = [
  { t: 'とれたべ', en: 'TORETABE', tag: 'FOOD · APP', d: '家庭菜園の収穫を、食べるところまでつなげるアプリ。', y: '2024', no: '01' },
  { t: 'Liftly', en: 'LIFTLY', tag: 'FITNESS · APP', d: '筋トレの積み重ねを見える化する記録アプリ。', y: '2024', no: '02' },
  { t: 'セッツマルシェ', en: 'SETTSU MARCHE', tag: 'LOCAL · WEB', d: '地域の食材を届けるためのWebサービス。', y: '2023', no: '03' },
  { t: '草八興業株式会社', en: 'SOHACHI INC.', tag: 'CORPORATE', d: '友人の会社の魅力を伝えるコーポレートサイト。', y: '2023', no: '04' },
];

function JournalSectionV2({ sp }) {
  return (
    <section style={{ padding: sp ? '70px 18px' : '160px 40px' }}>
      <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: sp ? 28 : 60, gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>03 — Journal</div>
          <h2 className="display" style={{ fontSize: sp ? 40 : 96 }}>日々の記録</h2>
        </div>
        <p style={{ fontSize: sp ? 13 : 14, color: 'var(--ink-2)', lineHeight: 1.85, maxWidth: 360 }}>
          運動、農業、生活、制作。感じたことを、Instagramを中心に発信しています。
        </p>
      </div>
      <div className="reveal delay-1" style={{ display: 'grid', gridTemplateColumns: sp ? '1fr' : '8fr 4fr 4fr', gap: 1, background: 'var(--ink)', border: '1px solid var(--ink)' }}>
        <a className="ph dark" style={{ aspectRatio: sp ? '4/3' : '16/9', padding: sp ? 22 : 36, alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="number" style={{ fontSize: 10, letterSpacing: '0.24em', color: 'rgba(244,241,234,0.55)' }}>PRIMARY · 主導線</div>
          <div>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: sp ? 48 : 88, color: 'var(--paper)', letterSpacing: '-0.03em', lineHeight: 0.92 }}>Instagram</div>
            <div style={{ marginTop: 18, fontFamily: 'var(--f-jp)', fontSize: 13, color: 'rgba(244,241,234,0.75)', lineHeight: 1.75, textTransform: 'none', letterSpacing: 0, maxWidth: 380 }}>運動、農業、暮らし、制作のことを中心に発信しています。</div>
            <div style={{ marginTop: 22, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.24em', color: 'var(--rust-2)' }}>VIEW @KOYA →</div>
          </div>
        </a>
        <a className="ph" style={{ aspectRatio: sp ? '4/3' : '4/5', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', padding: sp ? 18 : 26 }}>
          <div className="number" style={{ fontSize: 10, letterSpacing: '0.24em' }}>NOTES</div>
          <div>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: sp ? 36 : 56, color: 'var(--ink)', letterSpacing: '-0.02em' }}>X</div>
            <div style={{ marginTop: 12, fontFamily: 'var(--f-jp)', fontSize: 12, color: 'var(--ink-2)', textTransform: 'none', letterSpacing: 0, lineHeight: 1.7 }}>短い気づき、制作ログ。</div>
            <div style={{ marginTop: 14, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 10, letterSpacing: '0.24em', color: 'var(--ink)' }}>VIEW →</div>
          </div>
        </a>
        <a className="ph" style={{ aspectRatio: sp ? '4/3' : '4/5', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', padding: sp ? 18 : 26 }}>
          <div className="number" style={{ fontSize: 10, letterSpacing: '0.24em' }}>ESSAYS</div>
          <div>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: sp ? 36 : 56, color: 'var(--ink)', letterSpacing: '-0.02em' }}>note</div>
            <div style={{ marginTop: 12, fontFamily: 'var(--f-jp)', fontSize: 12, color: 'var(--ink-2)', textTransform: 'none', letterSpacing: 0, lineHeight: 1.7 }}>長く残したい考えと振り返り。</div>
            <div style={{ marginTop: 14, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 10, letterSpacing: '0.24em', color: 'var(--ink)' }}>VIEW →</div>
          </div>
        </a>
      </div>
    </section>
  );
}

function WorksSectionV2({ sp }) {
  return (
    <section style={{ padding: sp ? '70px 18px' : '160px 40px' }}>
      <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: sp ? 28 : 60, gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>04 — Works</div>
          <h2 className="display" style={{ fontSize: sp ? 40 : 96 }}>つくったもの</h2>
        </div>
        <a className="btn">すべてのWorks <span className="arrow"></span></a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: sp ? '1fr' : '1fr 1fr', gap: sp ? 28 : 48 }}>
        {A2_WORKS.map((w, i) => <WorkCardV2 key={w.t} w={w} i={i} sp={sp} />)}
      </div>
    </section>
  );
}

function WorkCardV2({ w, i, sp }) {
  const variants = ['', 'dark', 'green', ''];
  return (
    <a className="reveal" style={{ display: 'block', position: 'relative' }}>
      <div className={`ph ${variants[i]}`} style={{ aspectRatio: '4/3', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'space-between', padding: sp ? 16 : 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em' }}>
          <span>N°{w.no} / {w.tag}</span>
          <span>{w.y}</span>
        </div>
        <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: sp ? 32 : 56, letterSpacing: '-0.025em', color: variants[i] ? 'var(--paper)' : 'var(--ink)', textTransform: 'none', lineHeight: 0.95 }}>{w.en}</div>
      </div>
      <div style={{ paddingTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, borderBottom: '1px solid var(--ink)', paddingBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: sp ? 16 : 18, marginBottom: 6 }}>{w.t}</div>
          <div style={{ fontSize: sp ? 12.5 : 13, color: 'var(--ink-2)', lineHeight: 1.75 }}>{w.d}</div>
        </div>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.22em' }}>→</span>
      </div>
    </a>
  );
}

function ContactPreviewV2({ sp }) {
  return (
    <section style={{ padding: sp ? '70px 18px 40px' : '160px 40px 80px', background: 'var(--paper-2)' }}>
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: sp ? '1fr' : '6fr 6fr', gap: sp ? 32 : 56, alignItems: 'end' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>05 — Contact</div>
          <h2 className="display" style={{ fontSize: sp ? 40 : 84, marginBottom: 24 }}>関心が、<br/>重なるなら。</h2>
          <p style={{ fontSize: sp ? 14 : 15, lineHeight: 1.9, maxWidth: 520, color: 'var(--ink-2)' }}>
            制作、開発、協業、取材などの相談があればご連絡ください。<br/>関心が重なるものは特にうれしいです。
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, alignItems: sp ? 'flex-start' : 'flex-end' }}>
          <button className="btn btn-fill" style={{ padding: '20px 32px', fontSize: 13 }}>相談する <span className="arrow"></span></button>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.24em', color: 'var(--ink-3)', textTransform: 'uppercase', display: 'flex', gap: 18 }}>
            <a>IG</a><a>X</a><a>NOTE</a><a>GH</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ ABOUT ═══════════════ */
function A2About({ sp }) {
  useScrollReveal();
  return (
    <Frame sp={sp} height={sp ? 1900 : 2400} label="02 About">
      <A2Nav active="about" sp={sp} />
      <section style={{ padding: sp ? '32px 18px 0' : '48px 40px 0' }}>
        <div className="eyebrow" style={{ marginBottom: sp ? 22 : 36 }}>About — N°001</div>
        <h1 className="display" style={{ fontSize: sp ? 84 : 240 }}>ABOUT</h1>
        <div style={{ marginTop: sp ? 28 : 56, display: 'grid', gridTemplateColumns: sp ? '1fr' : '4fr 6fr', gap: sp ? 24 : 64, alignItems: 'end' }}>
          <div className="ph reveal" style={{ aspectRatio: '4/5' }}>
            <span className="corner">PORTRAIT</span>
            <span>BACK · STILL</span><span style={{ opacity: 0.6 }}>001</span>
          </div>
          <div className="reveal delay-1">
            <h2 className="display" style={{ fontSize: sp ? 32 : 60, marginBottom: 26, lineHeight: 1.0 }}>
              よく動き、<br/>よく食べ、<br/><span className="it">よくつくる。</span>
            </h2>
            <p style={{ fontSize: sp ? 14 : 16, lineHeight: 2.0, maxWidth: 540 }}>
              Miyabayasi Koya は、身体を動かし、土に触れ、日々の実感を発信しながら、ときどきWebサービスやアプリ、システムを作っています。
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: sp ? '70px 18px' : '160px 40px' }}>
        <div className="eyebrow reveal" style={{ marginBottom: 18 }}>02 — Concept</div>
        <h2 className="display reveal" style={{ fontSize: sp ? 36 : 76, lineHeight: 1.0, marginBottom: sp ? 32 : 56 }}>
          実感のある<br/>生き方を<br/><span className="it">大事にしたい。</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: sp ? '1fr' : '5fr 7fr', gap: sp ? 24 : 64 }}>
          <p className="reveal" style={{ fontSize: sp ? 14 : 16, lineHeight: 2.05 }}>
            AIやテクノロジーが進化するほど、人間が自分の身体を通して感じることの価値は大きくなると思っています。
          </p>
          <ul className="reveal delay-1" style={{ listStyle: 'none', display: 'grid', gap: 0, padding: 0 }}>
            {['走ること。', '鍛えること。', '土に触れること。', '食べるものを育てること。', '自分で試して、自分の言葉で残すこと。'].map((x, i) => (
              <li key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16, alignItems: 'baseline', borderTop: '1px solid var(--line-strong)', padding: '16px 0' }}>
                <span className="number" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.16em' }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: sp ? 20 : 28, letterSpacing: '-0.01em' }}>{x}</span>
              </li>
            ))}
            <li style={{ borderTop: '1px solid var(--line-strong)' }}></li>
          </ul>
        </div>
        <p className="reveal delay-2" style={{ marginTop: sp ? 32 : 48, fontSize: sp ? 14 : 16, lineHeight: 2.0, maxWidth: 720, borderLeft: '2px solid var(--rust)', paddingLeft: 22 }}>
          効率だけではなく、実感のある生き方を大事にしたい。<br/>このサイトは、その実践の記録です。
        </p>
      </section>

      <div className="rule-strong"></div>

      <section style={{ padding: sp ? '70px 18px' : '140px 40px' }}>
        <div className="eyebrow reveal" style={{ marginBottom: 18 }}>03 — Activities</div>
        <h2 className="display reveal" style={{ fontSize: sp ? 40 : 88, marginBottom: sp ? 32 : 64 }}>日々やっていること</h2>
        <div>
          {[
            { n: '01', en: 'MOVE', jp: '運動', body: '運動は、自分を整えるための習慣です。筋トレ、ランニングを軸に、これからクロスフィットやHYROXにも挑戦したいと思っています。' },
            { n: '02', en: 'GROW', jp: '農業', body: '農業は、食べることの根っこに近づくための学びです。自分で育て、自分で食べる暮らしに少しずつ近づきたいと思っています。' },
            { n: '03', en: 'SHARE', jp: '発信', body: '発信は、感じたことを残すための手段です。Instagramを中心に、日々の運動、農業、暮らし、制作のことを発信しています。' },
          ].map((row) => (
            <div key={row.n} className="reveal" style={{ display: 'grid', gridTemplateColumns: sp ? '40px 1fr' : '60px 220px 1fr 80px', gap: sp ? 14 : 36, padding: sp ? '24px 0' : '40px 0', borderTop: '1px solid var(--ink)', alignItems: 'baseline' }}>
              <div className="number" style={{ fontSize: 13 }}>{row.n}</div>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: sp ? 26 : 44, letterSpacing: '-0.025em', lineHeight: 1 }}>
                {row.en}
                {!sp && <div style={{ fontFamily: 'var(--f-jp)', fontWeight: 600, fontSize: 14, marginTop: 6, color: 'var(--ink-3)', letterSpacing: 0 }}>{row.jp}</div>}
              </div>
              <div style={{ gridColumn: sp ? '1 / -1' : 'auto', fontSize: sp ? 13.5 : 14.5, lineHeight: 1.9, color: 'var(--ink-2)' }}>{row.body}</div>
              {!sp && <span className="number" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.18em', textAlign: 'right' }}>READ →</span>}
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--ink)' }}></div>
        </div>
      </section>

      <section style={{ padding: sp ? '70px 18px' : '140px 40px', background: 'var(--ink)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
        <div className="eyebrow reveal" style={{ marginBottom: 18, color: 'rgba(244,241,234,0.55)' }}>04 — Making</div>
        <h2 className="display reveal" style={{ fontSize: sp ? 44 : 112, marginBottom: sp ? 28 : 48 }}>たまに、<br/><span className="it">仕組みにする。</span></h2>
        <div className="reveal delay-1" style={{ display: 'grid', gridTemplateColumns: sp ? '1fr' : '1fr 1fr', gap: sp ? 16 : 56, maxWidth: 1100 }}>
          <p style={{ fontSize: sp ? 14 : 16, lineHeight: 2.0 }}>
            感じた課題や面白さは、ときどきWebサービスやアプリ、システムとして形にしています。
          </p>
          <p style={{ fontSize: sp ? 14 : 16, lineHeight: 2.0, color: 'rgba(244,241,234,0.78)' }}>
            作ることは目的ではなく、実感を誰かの行動や暮らしにつなげるための手段です。
          </p>
        </div>
      </section>

      <section style={{ padding: sp ? '70px 18px' : '140px 40px' }}>
        <div className="eyebrow reveal" style={{ marginBottom: 18 }}>05 — Profile</div>
        <div style={{ display: 'grid', gridTemplateColumns: sp ? '1fr' : '5fr 7fr', gap: sp ? 24 : 64 }}>
          <div className="display reveal" style={{ fontSize: sp ? 32 : 44 }}>Miyabayasi<br/><span className="it">Koya</span></div>
          <div className="reveal delay-1">
            <p style={{ fontSize: sp ? 14 : 15, lineHeight: 2.0, marginBottom: 32 }}>
              運動、農業、発信、ものづくりを軸に活動。<br/>Webサービス、アプリ、業務システムの設計・開発にも取り組んでいます。
            </p>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Interest</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Fitness', 'Farming', 'Food', 'Lifestyle', 'Web Service', 'App', 'System'].map(x => (
                <span key={x} style={{ border: '1px solid var(--ink)', padding: '8px 14px', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.12em' }}>{x}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <A2Footer sp={sp} />
    </Frame>
  );
}

/* ═══════════════ WORKS ═══════════════ */
function A2Works({ sp }) {
  useScrollReveal();
  return (
    <Frame sp={sp} height={sp ? 1900 : 2300} label="03 Works">
      <A2Nav active="works" sp={sp} />
      <section style={{ padding: sp ? '32px 18px 0' : '48px 40px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div className="eyebrow">Works — Index</div>
          <div className="number" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>04 PROJECTS</div>
        </div>
        <h1 className="display" style={{ fontSize: sp ? 84 : 240, marginTop: sp ? 16 : 24 }}>WORKS</h1>
        <div style={{ marginTop: sp ? 18 : 32, display: 'grid', gridTemplateColumns: sp ? '1fr' : '4fr 8fr', gap: sp ? 16 : 64, alignItems: 'end' }}>
          <h2 className="display" style={{ fontSize: sp ? 24 : 38 }}>つくったもの</h2>
          <p style={{ fontSize: sp ? 14 : 15, lineHeight: 2.0, maxWidth: 580 }}>
            食、運動、地域、仕事。<br/>身近な関心や課題から、Webサービス、アプリ、システムを作っています。
          </p>
        </div>
      </section>
      <section style={{ padding: sp ? '40px 0 0' : '80px 0 0' }}>
        {A2_WORKS.map((w, i) => (
          <a key={w.t} className="reveal" style={{ display: 'block', borderTop: '1px solid var(--ink)', borderBottom: i === A2_WORKS.length - 1 ? '1px solid var(--ink)' : 'none', padding: sp ? '24px 18px' : '48px 40px', position: 'relative', transition: 'background .25s' }}
             onMouseEnter={e => e.currentTarget.style.background = 'var(--paper-2)'}
             onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ display: 'grid', gridTemplateColumns: sp ? '1fr' : '60px 1fr 1fr 100px', gap: sp ? 14 : 36, alignItems: 'center' }}>
              <div className="number" style={{ fontSize: 13 }}>{w.no}</div>
              <div>
                <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: sp ? 32 : 64, letterSpacing: '-0.03em', lineHeight: 0.95 }}>{w.en}</div>
                <div style={{ marginTop: 8, fontWeight: 700, fontSize: sp ? 14 : 16 }}>{w.t}</div>
              </div>
              <div style={{ fontSize: sp ? 13 : 14, lineHeight: 1.85, color: 'var(--ink-2)' }}>{w.d}</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.22em', textAlign: sp ? 'left' : 'right' }}>{w.tag}<br/>{w.y} →</div>
            </div>
          </a>
        ))}
      </section>
      <A2Footer sp={sp} />
    </Frame>
  );
}

/* ═══════════════ JOURNAL ═══════════════ */
function A2Journal({ sp }) {
  useScrollReveal();
  return (
    <Frame sp={sp} height={sp ? 1700 : 2100} label="04 Journal">
      <A2Nav active="journal" sp={sp} />
      <section style={{ padding: sp ? '32px 18px 0' : '48px 40px 0' }}>
        <div className="eyebrow">Journal — Feed</div>
        <h1 className="display" style={{ fontSize: sp ? 84 : 240, marginTop: 18 }}>JOURNAL</h1>
        <h2 className="display" style={{ fontSize: sp ? 22 : 38, marginTop: sp ? 14 : 24, fontWeight: 700 }}>動いたこと、育てたこと、考えたこと。</h2>
        <p style={{ marginTop: sp ? 18 : 28, fontSize: sp ? 14 : 15, lineHeight: 2.0, maxWidth: 600 }}>
          運動、農業、暮らし、制作の記録。<br/>日々の実践で感じたことを、Instagramを中心に発信しています。
        </p>
      </section>

      <section style={{ padding: sp ? '50px 18px 0' : '90px 40px 0' }}>
        <div className="reveal" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: sp ? '36px 22px' : '64px 56px', display: 'grid', gridTemplateColumns: sp ? '1fr' : '1fr 1fr', gap: sp ? 28 : 56, alignItems: 'end' }}>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(244,241,234,0.55)', marginBottom: 16 }}>Primary · 主導線</div>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: sp ? 64 : 168, letterSpacing: '-0.045em', lineHeight: 0.88, marginBottom: 28 }}>Instagram</div>
            <p style={{ fontSize: sp ? 14 : 16, lineHeight: 2.0, color: 'rgba(244,241,234,0.8)', maxWidth: 480 }}>
              日々の記録。運動、農業、暮らし、制作のことを中心に発信しています。
            </p>
            <button className="btn" style={{ marginTop: 32, color: 'var(--paper)', borderColor: 'var(--paper)' }}>Instagramを見る <span className="arrow"></span></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="ph" style={{ aspectRatio: '1/1', padding: 8 }}>
                <span style={{ fontSize: 9 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 9 }}>IG</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: sp ? '20px 18px 0' : '32px 40px 0', display: 'grid', gridTemplateColumns: sp ? '1fr' : '1fr 1fr', gap: sp ? 16 : 24 }}>
        {[
          { n: 'X', d: '短い気づき、制作ログ、考えたことを投稿しています。', label: 'NOTES', cta: 'Xを見る' },
          { n: 'note', d: '長く残したい考えや制作の振り返りをまとめています。', label: 'ESSAYS', cta: 'noteを見る' },
        ].map(p => (
          <a key={p.n} className="reveal" style={{ border: '1px solid var(--ink)', padding: sp ? 24 : 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: sp ? 220 : 300 }}>
            <div className="eyebrow">{p.label}</div>
            <div>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: sp ? 48 : 80, letterSpacing: '-0.03em' }}>{p.n}</div>
              <p style={{ fontSize: sp ? 13 : 14, lineHeight: 1.85, marginTop: 12, marginBottom: 18, maxWidth: 380 }}>{p.d}</p>
              <span className="number" style={{ fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase' }}>{p.cta} →</span>
            </div>
          </a>
        ))}
      </section>
      <div style={{ height: sp ? 60 : 100 }}></div>
      <A2Footer sp={sp} />
    </Frame>
  );
}

/* ═══════════════ CONTACT ═══════════════ */
function A2Contact({ sp }) {
  useScrollReveal();
  return (
    <Frame sp={sp} height={sp ? 1800 : 2100} label="05 Contact">
      <A2Nav active="contact" sp={sp} />
      <section style={{ padding: sp ? '32px 18px 0' : '48px 40px 0' }}>
        <div className="eyebrow">Contact</div>
        <h1 className="display" style={{ fontSize: sp ? 84 : 240, marginTop: 18 }}>CONTACT</h1>
        <h2 className="display" style={{ fontSize: sp ? 26 : 48, marginTop: sp ? 18 : 32 }}>関心が重なる<br/>相談があれば。</h2>
        <p style={{ marginTop: sp ? 18 : 28, fontSize: sp ? 14 : 15, lineHeight: 2.0, maxWidth: 640 }}>
          制作、開発、協業、取材などの相談があればご連絡ください。<br/>
          Webサービス、アプリ、業務システム、農業・食・運動に関わる企画など、関心が重なるものは特にうれしいです。
        </p>
      </section>

      <section style={{ padding: sp ? '40px 18px 0' : '80px 40px 0' }}>
        <form style={{ display: 'grid', gap: sp ? 24 : 32, maxWidth: 760 }}>
          {[
            { l: '01 / お名前', t: 'text', ph: 'Your name' },
            { l: '02 / メールアドレス', t: 'email', ph: 'name@domain' },
          ].map(f => (
            <label key={f.l} className="reveal" style={{ display: 'block', borderBottom: '1px solid var(--ink)', paddingBottom: 12 }}>
              <div className="number" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>{f.l}</div>
              <input type={f.t} placeholder={f.ph} style={{ border: 'none', background: 'transparent', font: 'inherit', fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: sp ? 18 : 22, width: '100%', padding: 4, outline: 'none' }} />
            </label>
          ))}
          <div className="reveal">
            <div className="number" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>03 / 相談内容</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['制作・開発の相談', 'Webサービス・アプリの相談', '業務システムの相談', '協業・取材', 'その他'].map((x, i) => (
                <span key={x} style={{ border: '1px solid var(--ink)', padding: sp ? '9px 14px' : '11px 18px', fontSize: sp ? 12 : 13, background: i === 0 ? 'var(--ink)' : 'transparent', color: i === 0 ? 'var(--paper)' : 'var(--ink)', cursor: 'pointer' }}>{x}</span>
              ))}
            </div>
          </div>
          <label className="reveal" style={{ display: 'block', borderBottom: '1px solid var(--ink)', paddingBottom: 12 }}>
            <div className="number" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>04 / メッセージ</div>
            <textarea placeholder="ご相談内容をどうぞ" rows={6} style={{ border: 'none', background: 'transparent', font: 'inherit', fontFamily: 'var(--f-jp)', fontSize: sp ? 14 : 16, width: '100%', padding: 4, outline: 'none', resize: 'none', lineHeight: 1.85 }}></textarea>
          </label>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--ink-3)', textTransform: 'uppercase', display: 'flex', gap: 14 }}>
              DM OK — <a>IG</a><a>X</a><a>NOTE</a><a>GH</a>
            </div>
            <button className="btn btn-fill" style={{ padding: '20px 32px' }}>送信する <span className="arrow"></span></button>
          </div>
        </form>
      </section>
      <div style={{ height: sp ? 60 : 100 }}></div>
      <A2Footer sp={sp} />
    </Frame>
  );
}

Object.assign(window, { A2Home, A2About, A2Works, A2Journal, A2Contact });
