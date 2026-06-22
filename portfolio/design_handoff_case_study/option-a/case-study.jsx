/* Case Study — とれたべ — 2 variants
   Variant 1: Editorial Stack (sidebar TOC + body + sticky image rail)
   Variant 2: Split Frame (left: sticky image, right: scroll body)
*/

/* ───── shared content ───── */
const TORETABE = {
  title: 'とれたべ',
  en: 'TORETABE',
  tag: 'FOOD · APP',
  year: '2024',
  no: '01',
  oneline: '家庭菜園の収穫を、食べるところまでつなげるアプリ。',
  problem: '家庭菜園では、せっかく育てた野菜の食べきれない量が出たり、いつ収穫したかを忘れて鮮度を落としてしまうことがある。育てる楽しさと食べる満足の間に、見えないギャップがある。',
  approach: '収穫した日と量を、写真とともに気軽に記録できるアプリ。レシピの提案ではなく「今あるもの」と「いつ採れたか」を一覧で並べることに集中した。判断は使う人にまかせる、シンプルな道具を目指した。',
  credits: [
    { role: 'Concept / Design / Development', name: 'Miyabayasi Koya' },
    { role: 'Photography', name: 'Self-shot · 自家菜園' },
    { role: 'Stack', name: 'React Native · Supabase' },
  ],
  meta: [
    { k: 'YEAR', v: '2024' },
    { k: 'ROLE', v: 'Solo' },
    { k: 'STATUS', v: 'In Use' },
    { k: 'DOMAIN', v: 'Food / App' },
  ],
};

/* ═══════════════ V1 — Editorial Stack ═══════════════ */
function CSv1Toretabe({ sp }) {
  const scrollEl = React.useContext(FrameCtx);
  const [active, setActive] = React.useState('problem');

  // observe headings
  React.useEffect(() => {
    if (!scrollEl) return;
    const sections = scrollEl.querySelectorAll('[data-cs-section]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.dataset.csSection);
      });
    }, { root: scrollEl, rootMargin: '-30% 0px -55% 0px' });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [scrollEl]);

  useScrollReveal();

  const sections = [
    { id: 'problem',  n: '01', l: 'Problem' },
    { id: 'approach', n: '02', l: 'Approach' },
    { id: 'credits',  n: '03', l: 'Credits' },
  ];

  return (
    <Frame sp={sp} height={sp ? 2200 : 2400} label="06 Case · Editorial">
      <A2Nav active="works" sp={sp} />

      {/* hero */}
      <section style={{ padding: sp ? '32px 18px 0' : '48px 40px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: sp ? 16 : 28 }}>
          <div className="eyebrow">Case Study — N°{TORETABE.no}</div>
          <a className="number" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>← Index / Works</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: sp ? '1fr' : '7fr 5fr', gap: sp ? 22 : 56, alignItems: 'end' }}>
          <div>
            <h1 className="display" style={{ fontSize: sp ? 84 : 200, lineHeight: 0.92 }}>
              {TORETABE.en}
            </h1>
            <div style={{ marginTop: sp ? 10 : 16, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: sp ? 22 : 36, letterSpacing: '-0.015em' }}>
              {TORETABE.title}
            </div>
          </div>
          <p style={{ fontSize: sp ? 14 : 18, lineHeight: 1.85, color: 'var(--ink-2)', maxWidth: 460 }}>
            {TORETABE.oneline}
          </p>
        </div>
      </section>

      <section style={{ padding: sp ? '24px 18px 0' : '40px 40px 0' }}>
        <div className="cs2" style={{ display: 'contents' }}>
          <div className="meta-row">
            {TORETABE.meta.map(m => (
              <div key={m.k}><div className="k">{m.k}</div><div className="v">{m.v}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: sp ? '32px 18px 0' : '56px 40px 0' }}>
        <div className="ph dark reveal" style={{ aspectRatio: sp ? '4/3' : '21/9', padding: sp ? 18 : 28 }}>
          <span className="corner">HERO PLATE</span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em' }}>HARVEST · MIDDAY</span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em', opacity: 0.6 }}>TORETABE_HERO.JPG</span>
        </div>
      </section>

      {/* body — sidebar toc + content + sticky image */}
      <section className="cs2" style={{ padding: sp ? '50px 18px' : '120px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: sp ? '1fr' : '160px 1fr 360px', gap: sp ? 24 : 64, alignItems: 'start' }}>
          {/* TOC */}
          {!sp && (
            <nav className="toc">
              <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.24em', marginBottom: 10 }}>Index</div>
              {sections.map(s => (
                <a key={s.id} className={active === s.id ? 'active' : ''} href={`#${s.id}`}>
                  <span className="n">{s.n}</span><span className="l">{s.l}</span>
                </a>
              ))}
              <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.18em', marginTop: 22, lineHeight: 1.7, textTransform: 'none' }}>
                3 sections · 1 minute read
              </div>
            </nav>
          )}

          {/* body content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: sp ? 56 : 100 }}>
            <article id="problem" data-cs-section="problem" className="reveal">
              <div className="eyebrow" style={{ marginBottom: 14 }}>01 — Problem</div>
              <h2 className="display" style={{ fontSize: sp ? 32 : 56, lineHeight: 1.0, marginBottom: 24 }}>
                育てる楽しさと、<br/>食べる満足の<span className="it">間。</span>
              </h2>
              <p style={{ fontSize: sp ? 14 : 16, lineHeight: 2.0, color: 'var(--ink-2)', maxWidth: 560 }}>
                {TORETABE.problem}
              </p>
            </article>

            <article id="approach" data-cs-section="approach" className="reveal">
              <div className="eyebrow" style={{ marginBottom: 14 }}>02 — Approach</div>
              <h2 className="display" style={{ fontSize: sp ? 32 : 56, lineHeight: 1.0, marginBottom: 24 }}>
                判断は人に。<br/>道具は<span className="it">道具のままで。</span>
              </h2>
              <p style={{ fontSize: sp ? 14 : 16, lineHeight: 2.0, color: 'var(--ink-2)', maxWidth: 560, marginBottom: 28 }}>
                {TORETABE.approach}
              </p>
              {/* device row */}
              <div style={{ display: 'grid', gridTemplateColumns: sp ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: sp ? 10 : 16, marginTop: 16 }}>
                {['LOG · 記録', 'LIST · 一覧', 'DETAIL · 詳細'].slice(0, sp ? 2 : 3).map((label, i) => (
                  <div key={label} className="ph" style={{ aspectRatio: '9/16', padding: 10, border: '1px solid var(--ink)' }}>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 9, letterSpacing: '0.18em' }}>UI / {String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 9, letterSpacing: '0.18em' }}>{label}</span>
                  </div>
                ))}
              </div>
            </article>

            <article id="credits" data-cs-section="credits" className="reveal">
              <div className="eyebrow" style={{ marginBottom: 14 }}>03 — Credits</div>
              <h2 className="display" style={{ fontSize: sp ? 32 : 56, lineHeight: 1.0, marginBottom: 24 }}>
                つくった人と道具。
              </h2>
              <div className="cs2" style={{ display: 'contents' }}>
                {TORETABE.credits.map((c, i) => (
                  <div key={c.role} className="credit-row">
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="role">{c.role}</span>
                    <span className="name">{c.name}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* sticky side image rail */}
          {!sp && (
            <aside style={{ position: 'sticky', top: 90, alignSelf: 'start' }}>
              <div className="ph green" style={{ aspectRatio: '4/5', padding: 18 }}>
                <span className="corner">FIELD</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em' }}>HARVEST · LOG</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em', opacity: 0.6 }}>FRAME_{active.toUpperCase()}.JPG</span>
              </div>
              <div style={{ marginTop: 14, fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>
                NOW VIEWING / {sections.find(s => s.id === active)?.n} {sections.find(s => s.id === active)?.l}
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* next */}
      <section style={{ padding: sp ? '40px 18px 0' : '60px 40px 0', borderTop: '1px solid var(--ink)' }}>
        <a className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: sp ? '24px 0' : '40px 0', cursor: 'pointer' }}>
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 8 }}>NEXT · N°02</div>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: sp ? 32 : 64, letterSpacing: '-0.025em' }}>LIFTLY</div>
            <div style={{ marginTop: 6, fontWeight: 600, fontSize: sp ? 13 : 15 }}>筋トレの積み重ねを見える化する</div>
          </div>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, letterSpacing: '0.22em' }}>→</span>
        </a>
      </section>

      <A2Footer sp={sp} />
    </Frame>
  );
}

/* ═══════════════ V2 — Split Frame ═══════════════ */
function CSv2Toretabe({ sp }) {
  const scrollEl = React.useContext(FrameCtx);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (!scrollEl) return;
    const panels = scrollEl.querySelectorAll('[data-cs-panel]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(Number(e.target.dataset.csPanel));
      });
    }, { root: scrollEl, rootMargin: '-40% 0px -40% 0px' });
    panels.forEach(p => io.observe(p));
    return () => io.disconnect();
  }, [scrollEl]);

  useScrollReveal();

  const panels = [
    { n: '00', label: 'Hero',     bg: 'dark',  caption: 'HARVEST · MIDDAY' },
    { n: '01', label: 'Problem',  bg: 'green', caption: 'BASKET · OVERFLOW' },
    { n: '02', label: 'Approach', bg: '',      caption: 'UI · MAIN LOG SCREEN' },
    { n: '03', label: 'Credits',  bg: 'dark',  caption: 'DESK · BUILD NOTES' },
  ];

  return (
    <Frame sp={sp} height={sp ? 2200 : 2600} label="07 Case · Split">
      <A2Nav active="works" sp={sp} />

      {sp ? (
        // SP: stacked
        <div>
          <section style={{ padding: '28px 18px 0' }}>
            <div className="eyebrow">Case Study — N°{TORETABE.no}</div>
            <h1 className="display" style={{ fontSize: 80, marginTop: 14 }}>{TORETABE.en}</h1>
            <div style={{ marginTop: 8, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22 }}>{TORETABE.title}</div>
            <p style={{ marginTop: 18, fontSize: 14, lineHeight: 1.85, color: 'var(--ink-2)' }}>{TORETABE.oneline}</p>
          </section>
          {panels.map((p, i) => (
            <React.Fragment key={p.n}>
              <div className={`ph ${p.bg}`} style={{ aspectRatio: '4/3', margin: '24px 0', padding: 14 }}>
                <span className="corner">{p.label.toUpperCase()}</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em' }}>{p.caption}</span>
              </div>
              {i === 0 && (
                <section className="cs2" style={{ padding: '0 18px' }}>
                  <div className="meta-row">
                    {TORETABE.meta.map(m => (
                      <div key={m.k}><div className="k">{m.k}</div><div className="v" style={{ fontSize: 12 }}>{m.v}</div></div>
                    ))}
                  </div>
                </section>
              )}
              {i === 1 && (
                <section style={{ padding: '32px 18px' }}>
                  <div className="eyebrow" style={{ marginBottom: 12 }}>01 — Problem</div>
                  <h2 className="display" style={{ fontSize: 32, lineHeight: 1.0, marginBottom: 18 }}>育てると食べるの<span className="it">間。</span></h2>
                  <p style={{ fontSize: 14, lineHeight: 2.0, color: 'var(--ink-2)' }}>{TORETABE.problem}</p>
                </section>
              )}
              {i === 2 && (
                <section style={{ padding: '32px 18px' }}>
                  <div className="eyebrow" style={{ marginBottom: 12 }}>02 — Approach</div>
                  <h2 className="display" style={{ fontSize: 32, lineHeight: 1.0, marginBottom: 18 }}>道具のままで。</h2>
                  <p style={{ fontSize: 14, lineHeight: 2.0, color: 'var(--ink-2)' }}>{TORETABE.approach}</p>
                </section>
              )}
              {i === 3 && (
                <section className="cs2" style={{ padding: '32px 18px' }}>
                  <div className="eyebrow" style={{ marginBottom: 12 }}>03 — Credits</div>
                  {TORETABE.credits.map((c, j) => (
                    <div key={c.role} className="credit-row" style={{ gridTemplateColumns: '40px 1fr 1fr' }}>
                      <span className="num">{String(j + 1).padStart(2, '0')}</span>
                      <span className="role">{c.role}</span>
                      <span className="name" style={{ fontSize: 14 }}>{c.name}</span>
                    </div>
                  ))}
                </section>
              )}
            </React.Fragment>
          ))}
          <A2Footer sp={sp} />
        </div>
      ) : (
        <div className="cs2" style={{ display: 'contents' }}>
          {/* split layout */}
          <div className="split">
            {/* LEFT: sticky image */}
            <div className="split-img">
              {panels.map((p, i) => (
                <div key={p.n} style={{
                  position: 'absolute', inset: 0,
                  opacity: i === active ? 1 : 0,
                  transition: 'opacity .9s ease',
                }}>
                  <div className={`ph ${p.bg}`} style={{ width: '100%', height: '100%', padding: 28, alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.22em', color: p.bg ? 'rgba(244,241,234,0.65)' : 'var(--ink-3)' }}>
                      <span>FRAME · {p.n}</span><span>{p.label.toUpperCase()}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 88, letterSpacing: '-0.035em', color: p.bg ? 'var(--paper)' : 'var(--ink)', lineHeight: 0.9 }}>
                        {p.label.toUpperCase()}
                      </div>
                      <div style={{ marginTop: 14, fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.22em', color: p.bg ? 'rgba(244,241,234,0.55)' : 'var(--ink-3)' }}>{p.caption}</div>
                    </div>
                  </div>
                </div>
              ))}
              {/* progress */}
              <div style={{ position: 'absolute', left: 28, bottom: 28, right: 28, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, zIndex: 5 }}>
                {panels.map((p, i) => (
                  <div key={p.n} style={{ height: 2, background: i <= active ? 'var(--rust)' : 'rgba(244,241,234,0.25)', transition: 'background .4s' }}></div>
                ))}
              </div>
            </div>

            {/* RIGHT: scrolling body */}
            <div>
              <section data-cs-panel="0" style={{ minHeight: '100vh', padding: '70px 56px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="eyebrow">Case Study — N°{TORETABE.no}</div>
                  <h1 className="display" style={{ fontSize: 144, marginTop: 22, lineHeight: 0.9 }}>{TORETABE.en}</h1>
                  <div style={{ marginTop: 12, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 32, letterSpacing: '-0.015em' }}>{TORETABE.title}</div>
                  <p style={{ marginTop: 28, fontSize: 17, lineHeight: 1.9, color: 'var(--ink-2)', maxWidth: 460 }}>{TORETABE.oneline}</p>
                </div>
                <div className="meta-row" style={{ gridTemplateColumns: 'repeat(2, 1fr) repeat(2, 1fr)' }}>
                  {TORETABE.meta.map(m => (
                    <div key={m.k}><div className="k">{m.k}</div><div className="v">{m.v}</div></div>
                  ))}
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>SCROLL ↓ · 3 SECTIONS</div>
              </section>

              <section data-cs-panel="1" style={{ minHeight: '100vh', padding: '90px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: '1px solid var(--line)' }}>
                <div className="eyebrow reveal" style={{ marginBottom: 16 }}>01 — Problem</div>
                <h2 className="display reveal" style={{ fontSize: 64, lineHeight: 1.0, marginBottom: 28 }}>
                  育てる楽しさと、<br/>食べる満足の<span className="it">間。</span>
                </h2>
                <p className="reveal" style={{ fontSize: 17, lineHeight: 2.0, color: 'var(--ink-2)', maxWidth: 480 }}>{TORETABE.problem}</p>
              </section>

              <section data-cs-panel="2" style={{ minHeight: '100vh', padding: '90px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: '1px solid var(--line)' }}>
                <div className="eyebrow reveal" style={{ marginBottom: 16 }}>02 — Approach</div>
                <h2 className="display reveal" style={{ fontSize: 64, lineHeight: 1.0, marginBottom: 28 }}>
                  判断は人に。<br/>道具は<span className="it">道具のままで。</span>
                </h2>
                <p className="reveal" style={{ fontSize: 17, lineHeight: 2.0, color: 'var(--ink-2)', maxWidth: 480 }}>{TORETABE.approach}</p>
              </section>

              <section data-cs-panel="3" style={{ minHeight: '100vh', padding: '90px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: '1px solid var(--line)' }}>
                <div className="eyebrow reveal" style={{ marginBottom: 16 }}>03 — Credits</div>
                <h2 className="display reveal" style={{ fontSize: 56, lineHeight: 1.0, marginBottom: 32 }}>つくった人と道具。</h2>
                <div className="reveal">
                  {TORETABE.credits.map((c, i) => (
                    <div key={c.role} className="credit-row">
                      <span className="num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="role">{c.role}</span>
                      <span className="name">{c.name}</span>
                    </div>
                  ))}
                </div>
                <a className="reveal" style={{ marginTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 6 }}>NEXT · N°02</div>
                    <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 40, letterSpacing: '-0.025em' }}>LIFTLY</div>
                  </div>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, letterSpacing: '0.22em' }}>→</span>
                </a>
              </section>
            </div>
          </div>

          <A2Footer sp={sp} />
        </div>
      )}
    </Frame>
  );
}

Object.assign(window, { CSv1Toretabe, CSv2Toretabe });
