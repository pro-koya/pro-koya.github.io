'use client';

import { useEffect, useRef } from 'react';
import { FamilyBar, FamilyBand, FamilyFooter } from '../../components/muscle-family';

const APP_STORE_URL = 'https://apps.apple.com/app/id6766134975';

type DocSectionProps = {
  num: string;
  title: string;
  jp: string;
  children: React.ReactNode;
};

const specStrip = [
  ['VERSION', '1.0.1'],
  ['PLATFORM', 'iOS 17+'],
  ['LANGUAGES', 'JA / EN'],
  ['SIZE', '38.4 MB'],
  ['OFFLINE', 'YES'],
  ['ADS', 'OPT-OUT'],
];

const principles = [
  ['1.01', '止めたら記録', 'タイマー終了から保存画面へ。WOD 後の面倒な転記をなくす。'],
  ['1.02', '3タップで保存', '種目を選ぶ、結果を入れる、保存する。ジムではそれで十分。'],
  ['1.03', 'Hyroxを分割', 'Run / Station / Roxzone を分けて残し、どこで詰まったかを見る。'],
  ['1.04', 'PRを自動判定', 'For Time、AMRAP、Hyrox の更新を履歴から自動で拾う。'],
  ['1.05', 'オフライン優先', '電波が弱いジムでもローカル保存。復帰後に同期する。'],
  ['1.06', '硬派なUI', '黒、数字、紅。追い込む時に邪魔をしない画面だけを置く。'],
];

const valueCards = [
  ['3 TAPS', 'WOD後すぐ保存', 'タイマーを止めたら、そのまま結果入力へ。記録のために集中を切らさない。'],
  ['1 APP', 'CrossFit / Hyrox対応', 'AMRAP、EMOM、For Time、Tabata と Hyrox レースを一つにまとめる。'],
  ['ROXZONE', '弱点が見える', 'Run と Workout の遷移時間まで自動算出。次に削る場所がわかる。'],
];

const timerSpecs = [
  ['MODES', 'AMRAP / EMOM / FOR TIME / TABATA'],
  ['ENGINE', 'DATE-BASED ELAPSED TIME'],
  ['DIGIT SIZE', '≥ 50% OF VIEWPORT HEIGHT'],
  ['LANDSCAPE LOCK', 'ENABLED — DIGITS SCALE UP'],
  ['HAPTIC CUES', 'T-10s · T-3s · COMPLETE'],
  ['ACTIONS', 'PAUSE / END / +ROUND'],
  ['MIN TAP TARGET', '64pt × 64pt'],
];

const splitRows = [
  ['01', '1KM RUN', '4:32', '−0:08'],
  ['02', 'SKIERG / 1KM', '4:18', '+0:02'],
  ['03', '1KM RUN', '4:41', '+0:01'],
  ['04', 'SLED PUSH / 50M', '2:54', '−0:11'],
  ['05', '1KM RUN', '4:38', ''],
  ['06', 'SLED PULL / 50M', '3:02', ''],
  ['07', '1KM RUN', '-', ''],
  ['08', 'BURPEE BJ / 80M', '-', ''],
  ['--', 'ROXZONE TOTAL', '0:42', ''],
];

const typeRows = [
  ['DISPLAY / L', '96-144pt', 'BOLD', '00:42:18', 'sample-display-l'],
  ['DISPLAY / M', '56-72pt', 'BOLD', 'NEW PR', 'sample-display-m'],
  ['TITLE / L', '32-40pt', 'BOLD', '今日のWOD', 'sample-title-l'],
  ['TITLE / M', '22-26pt', 'SEMIBOLD', 'Hyrox Sim', 'sample-title-m'],
  ['BODY', '15-17pt', 'REGULAR', '本文。読み込ませず、見せる。', 'sample-body'],
  ['CAPTION', '12-13pt', 'REGULAR', 'AMRAP / 20:00', 'sample-caption'],
];

const baseColors = [
  ['BG / PRIMARY', '#0A0A0B'],
  ['BG / SURFACE', '#15161A'],
  ['BG / ELEVATED', '#1E1F24'],
  ['BORDER', '#2A2B30'],
  ['TEXT / HI', '#F5F5F6'],
  ['TEXT / MED', '#A1A2A8'],
];

const accentColors = [
  ['CRIMSON', '#C8102E', 'DEFAULT'],
  ['BLOOD RED', '#7A0E1F', 'DEEP'],
  ['VERMILLION', '#E34234', 'BRIGHT'],
  ['WINE', '#5B1A1A', 'HEAVY'],
  ['NEON RED', '#FF003C', 'HOT'],
];

const faqs = [
  ['Q.01', '広告は出ますか？', '無料版は控えめに表示。Muscle360 Pro バンドル（月額¥250 / 年額¥2,500）の購読で全て非表示にできます。'],
  ['Q.02', 'Apple Watch 対応？', 'Phase 1.x で対応予定。Phase 0 は iPhone のみ。'],
  ['Q.03', 'データはクラウド？', 'Supabase 経由で同期。オフライン時はローカル優先。'],
  ['Q.04', '他アプリと連携？', 'Liftly / SorryGains と同じ Muscle360 ファミリー。Muscle360 Pro バンドルなら 1 つの購読で 3 アプリの Pro 機能が解放されます。'],
  ['Q.05', 'CSV エクスポート？', '履歴画面から JSON / CSV を共有シート経由で出力。'],
];

function ForgeMark() {
  return (
    <div className="forge-mark" aria-label="Forge">
      <span className="forge-mark-block" aria-hidden="true" />
      <span>FORGE</span>
    </div>
  );
}

function AppStoreBadge({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`forge-store-badge${compact ? ' is-compact' : ''}`} href={APP_STORE_URL} aria-label="App Store で Forge を開く">
      <svg viewBox="0 0 24 28" aria-hidden="true">
        <path d="M18.7 14.3c0-3.1 2.5-4.6 2.6-4.7-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.7 1.1-4.6 1.1-1 0-2.4-1.1-4-1.1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.2 1.5 12.2 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 4-1s2.4 1 4 1c1.6 0 2.7-1.5 3.7-3 .8-1.2 1.2-2.4 1.2-2.5-.1 0-2.8-1.1-2.8-5.6ZM15.7 5.3c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.8.9-1.5 2.4-1.3 3.8 1.4.1 2.8-.7 3.6-1.8Z" />
      </svg>
      <span>
        <span className="forge-store-small">Download on the</span>
        <span className="forge-store-large">App Store</span>
      </span>
    </a>
  );
}

function DocSection({ num, title, jp, children }: DocSectionProps) {
  return (
    <section className="forge-doc-section" aria-labelledby={`forge-section-${num}`}>
      <div className="forge-section-head">
        <span className="forge-section-num" data-rv>{num}</span>
        <div className="forge-section-title-wrap" data-rv>
          <h2 id={`forge-section-${num}`}>{title}</h2>
          <p>- {jp}</p>
        </div>
        <span className="forge-rule" data-rule aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}

function TimerPhone() {
  return (
    <div className="ios-device" aria-hidden="true">
      <div className="ios-screen">
        <div className="ios-notch" />
        <div className="ios-status"><span>9:41</span><span>▮▮ WiFi ▱</span></div>
        <div className="timer-screen">
          <div className="phone-line"><span>AMRAP / 20:00</span><span className="rec">REC</span></div>
          <div className="round">ROUND 3 / 5</div>
          <div className="timer-digits" data-timer>08:42</div>
          <div className="progress"><span data-progress /></div>
          <div className="pace">PACE 1:24 / RD / AVG +0:03</div>
          <div className="phone-actions">
            <span>PAUSE</span>
            <span>+ ROUND</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HyroxPhone() {
  const rows = [
    ['01', '1km Run', '4:32', '−0:08', ''],
    ['02', 'SkiErg 1km', '4:18', '+0:02', ''],
    ['03', '1km Run', '4:41', '+0:01', ''],
    ['04', 'Sled Push 50m', '2:54', '−0:11', 'PR'],
    ['05', '1km Run', '4:38', '', ''],
    ['06', 'Sled Pull 50m', '3:02', '', ''],
    ['07', '1km Run', '-', '', 'muted'],
    ['08', 'Burpee BJ 80m', '-', '', 'muted'],
  ];

  return (
    <div className="ios-device" aria-hidden="true">
      <div className="ios-screen">
        <div className="ios-notch" />
        <div className="ios-status"><span>9:41</span><span>▮▮ WiFi ▱</span></div>
        <div className="hyrox-screen">
          <div className="hyrox-kicker">HYROX / STATION 6 / 8</div>
          <div className="hyrox-total"><span>32:07</span><em>-0:14 vs PR</em></div>
          <div className="hyrox-rox">ROXZONE 0:42 / AVG</div>
          <div className="hyrox-list" data-split-group>
            {rows.map(([n, label, time, delta, tag]) => (
              <div className={`hyrox-row${tag === 'muted' ? ' is-muted' : ''}`} data-split-row key={`${n}-${label}`}>
                <span>{n}</span>
                <strong>{label}</strong>
                <b>{time}</b>
                <em className={delta.startsWith('−') ? 'minus' : ''}>{delta}</em>
                {tag === 'PR' ? <i>PR</i> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForgePage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('js');
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gm = await import('gsap');
      const sm = await import('gsap/ScrollTrigger');
      if (cancelled || !root.current) return;
      const gsap = (gm as { gsap?: typeof import('gsap').gsap }).gsap ?? gm.default;
      const ScrollTrigger = (sm as { ScrollTrigger?: unknown }).ScrollTrigger ?? sm.default;
      gsap.registerPlugin(ScrollTrigger as Parameters<typeof gsap.registerPlugin>[0]);

      ctx = gsap.context(() => {
        // sharp, fast reveals (硬派)
        gsap.utils.toArray<HTMLElement>('[data-rv]').forEach((n) => {
          gsap.fromTo(n, { opacity: 0, y: 16 }, {
            opacity: 1, y: 0, duration: 0.5, ease: 'power4.out',
            scrollTrigger: { trigger: n, start: 'top 90%' },
          });
        });
        // crimson rule lines draw across
        gsap.utils.toArray<HTMLElement>('[data-rule]').forEach((n) => {
          gsap.fromTo(n, { scaleX: 0 }, {
            scaleX: 1, duration: 0.7, ease: 'power3.inOut', transformOrigin: 'left center',
            scrollTrigger: { trigger: n, start: 'top 94%' },
          });
        });
        // the timer RUNS: count up to 08:42 + progress fills
        const timer = el.querySelector<HTMLElement>('[data-timer]');
        if (timer) {
          const o = { s: 0 };
          gsap.to(o, {
            s: 8 * 60 + 42, duration: 2.4, ease: 'power1.inOut',
            scrollTrigger: { trigger: timer, start: 'top 82%' },
            onUpdate: () => {
              const m = Math.floor(o.s / 60), sec = Math.floor(o.s % 60);
              timer.textContent = `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
            },
          });
        }
        const prog = el.querySelector<HTMLElement>('[data-progress]');
        if (prog) {
          gsap.fromTo(prog, { width: '0%' }, {
            width: '64%', duration: 2.4, ease: 'power1.inOut',
            scrollTrigger: { trigger: prog, start: 'top 84%' },
          });
        }
        // Hyrox splits stamp in, one row at a time (like live race data)
        gsap.utils.toArray<HTMLElement>('[data-split-group]').forEach((group) => {
          gsap.fromTo(group.querySelectorAll('[data-split-row]'), { opacity: 0, x: -14 }, {
            opacity: 1, x: 0, duration: 0.34, ease: 'power3.out', stagger: 0.085,
            scrollTrigger: { trigger: group, start: 'top 82%' },
          });
        });

        (ScrollTrigger as { refresh: () => void }).refresh();
      }, root);
    })();

    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <>
      <FamilyBar current="forge" />
      <main className="forge-page" id="top" ref={root}>
      <div className="forge-shell">
        <header className="forge-topbar">
          <div><span className="dot">●</span><span>FORGE.LP / DOCUMENT v1.0</span></div>
          <span className="topbar-time">05.04.2026 / TOKYO / 23:42 JST</span>
          <a href="#top">[ ESC ] CLOSE</a>
        </header>

        <section className="forge-hero" aria-labelledby="forge-hero-title">
          <div className="hero-meta">
            <div>
              <p>SECTION 00 - PRODUCT</p>
              <ForgeMark />
            </div>
            <p className="bundle">
              BUNDLE / com.muscle360.forge<br />
              iOS 17+ / SwiftUI<br />
              SUPABASE / STOREKIT2
            </p>
          </div>
          <h1 id="forge-hero-title" data-rv>
            RECORD WOD.<br />
            <span>CRUSH HYROX.</span>
          </h1>
          <div className="hero-bottom" data-rv data-delay="0.08s">
            <p>
              タイマーを止めたら、そのまま記録。CrossFit と Hyrox の履歴、PR、Roxzone まで一つにまとめる iPhone アプリ。
            </p>
            <AppStoreBadge />
          </div>
        </section>

        <section className="spec-strip" aria-label="Forge product specifications">
          {specStrip.map(([key, value]) => (
            <div key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </section>

        <section className="value-strip" aria-label="Forge の主な価値">
          {valueCards.map(([label, title, body]) => (
            <article key={label} data-rv>
              <span>{label}</span>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </section>

        <DocSection num="01" title="WHY FORGE" jp="このアプリでできること">
          <div className="principle-grid">
            {principles.map(([num, title, body]) => (
              <article key={num}>
                <div><span>{num}</span><h3>{title}</h3></div>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </DocSection>

        <DocSection num="02" title="TIMER UI" jp="タイマー画面">
          <div className="timer-layout">
            <div className="forge-table">
              <div className="forge-table-head">FIG.02 - TIMER SPECIFICATION</div>
              {timerSpecs.map(([key, value]) => (
                <div className="spec-row" key={key}><span>{key}</span><strong>{value}</strong></div>
              ))}
            </div>
            <div className="phone-figure">
              <span>FIG.02 / 1:1</span>
              <TimerPhone />
            </div>
          </div>
        </DocSection>

        <DocSection num="03" title="HYROX DATA MODEL" jp="ハイロックス / 24+ データポイント">
          <div className="hyrox-layout">
            <div>
              <div className="forge-table split-table" data-split-group>
                <div className="forge-table-head">FIG.03 - HYROX SPLIT TABLE</div>
                {splitRows.map(([num, label, time, delta], index) => (
                  <div className={`split-row${index === splitRows.length - 1 ? ' is-total' : ''}`} data-split-row key={`${num}-${label}`}>
                    <span>{num}</span>
                    <strong>{label}</strong>
                    <b>{time}</b>
                    <em className={delta.startsWith('−') ? 'minus' : ''}>{delta}</em>
                  </div>
                ))}
              </div>
              <p className="table-note">
                Run / Workout の遷移時間 = Roxzone を自動算出。他アプリで誰もできていなかった領域を、自動的に。Race は 16 セクション、Practice は任意長のスプリットまで保存する。
              </p>
            </div>
            <div className="phone-holder">
              <HyroxPhone />
            </div>
          </div>
        </DocSection>

        <DocSection num="04" title="TYPE SCALE" jp="タイポグラフィ">
          <div className="type-table">
            {typeRows.map(([role, size, weight, sample, className]) => (
              <div className="type-row" key={role}>
                <span>{role}</span>
                <span>{size}</span>
                <span>{weight}</span>
                <strong className={className}>{sample}</strong>
              </div>
            ))}
          </div>
        </DocSection>

        <DocSection num="05" title="COLOR SYSTEM" jp="カラートークン">
          <div className="color-layout">
            <div className="color-panel">
              <div className="forge-table-head">BASE / MONOCHROME</div>
              {baseColors.map(([name, hex]) => (
                <div className="color-row" key={name}>
                  <span className="swatch is-bordered" style={{ backgroundColor: hex }} />
                  <strong>{name}</strong>
                  <em>{hex}</em>
                </div>
              ))}
            </div>
            <div className="color-panel">
              <div className="forge-table-head">ACCENT / USER-SELECTABLE</div>
              {accentColors.map(([name, hex, note]) => (
                <div className="color-row" key={name}>
                  <span className="swatch" style={{ backgroundColor: hex }} />
                  <strong>{name}</strong>
                  <em>{hex}</em>
                  <b>{note}</b>
                </div>
              ))}
            </div>
          </div>
        </DocSection>

        <DocSection num="06" title="FAQ" jp="仕様上の確認">
          <div className="faq-table">
            {faqs.map(([num, q, a]) => (
              <div className="faq-row" key={num}>
                <span>{num}</span>
                <strong>{q}</strong>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </DocSection>

        <section className="install-section" id="install" aria-labelledby="install-title">
          <p>07 - INSTALL</p>
          <h2 id="install-title">$ <span>install</span> forge</h2>
          <pre>{`> downloading FORGE v1.0.1 ...
> OK / iOS 17+
> ready to record.`}</pre>
          <div className="install-actions">
            <AppStoreBadge compact />
            <span>無料 / 広告任意 / オフライン完動</span>
            <a href="/forge/privacy/">PRIVACY POLICY</a>
          </div>
        </section>

      </div>
      </main>
      <FamilyBand current="forge" />
      <FamilyFooter current="forge" privacyHref="/forge/privacy/" />
    </>
  );
}
