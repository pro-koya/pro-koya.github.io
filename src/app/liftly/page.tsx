'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef } from 'react';
import { FamilyBar, FamilyBand, FamilyFooter } from '../../components/muscle-family';

const TRANSLATIONS = {
  ja: {
    nav: { features: '機能', howto: '使い方', video: '動画', contact: 'お問い合わせ' },
    lang: { ja: '日本語', en: 'EN' },
    hero: {
      badge: '筋トレ記録アプリ',
      h1a: '記録は、シンプル。',
      h1b: '成長は、確かに。',
      tagline: '種目を選んで、重さと回数を入れるだけ。あなたの積み上げを、いちばん続く形で。',
      appStore: 'App Store でダウンロード',
      video: '30秒で見る',
      meta: ['無料', 'iOS 17+', '日本語 / English', 'オフライン対応'],
    },
    pillars: {
      title: '記録に悩まず、トレーニングに集中。',
      items: [
        { t: '速く、記録', d: '種目を選んで重量と回数を入れるだけ。前回のセットはワンタップで再現。' },
        { t: '成長が、見える', d: '種目別に重量・回数・ボリュームをグラフ化。1ヶ月から5年まで俯瞰できる。' },
        { t: 'ずっと、続く', d: 'シンプルだから続く。データは端末内に保存され、あなたの手の中にある。' },
      ],
    },
    feats: [
      {
        eye: 'RECORD',
        h: '考えずに、記録できる。',
        p: 'ジムでスマホと格闘しない。前回の記録をワンタップで呼び出し、重さと回数を直すだけ。セット間の操作は最小限に。',
        list: ['前回のセットをワンタップで再現', 'セット追加は1タップ', '種目はお気に入りに登録'],
      },
      {
        eye: 'PROGRESS',
        h: '数字が、伸びていく。',
        p: '続けた成果は、グラフが教えてくれる。種目ごとに重量・回数・ボリュームの推移を、期間を切り替えて確認できる。',
        list: ['種目別の成長グラフ', '重量・回数・ボリュームを切替', '1M〜5Y で期間を俯瞰'],
      },
      {
        eye: 'FOCUS',
        h: '休憩も、逃さない。',
        p: 'セット間の休憩を自動で計測。バックグラウンドでも動くから、スマホを置いて、次のセットに集中できる。',
        list: ['セット間タイマー', 'バックグラウンドでも動作', 'スマホを置いて次のセットへ'],
      },
    ],
    mini: {
      title: '続けるための、細部まで。',
      items: [
        { t: '体重管理', d: '体重の推移と月間の変化を記録。トレーニング頻度との関係も見える。' },
        { t: 'バックアップ', d: 'JSON / CSV で書き出し・読み込み。データはいつでもあなたの手元に。' },
        { t: 'カスタマイズ', d: 'テーマ・単位（kg/lb）・言語（日本語/English）を切り替え。' },
      ],
    },
    video: { eye: 'IN ACTION', h: '30秒で、伝わる。', p: '実際の記録の流れを、動画でどうぞ。' },
    final: { h: '今日から、記録を始める。', p: '無料。サインイン不要で、すぐに使えます。', cta: 'App Store でダウンロード' },
    contact: { eye: 'CONTACT', h: 'ご質問・ご要望', p: '改善のヒントは、いつも使う人の声から。', btn: 'お問い合わせフォーム' },
    urls: {
      appStore: 'https://apps.apple.com/app/liftly-simple-workout-log/id6757798075',
      contactForm: 'https://forms.gle/kwtwF2FkEDE12ZcX8',
      youtube: 'https://www.youtube.com/embed/s2aB3qd8uTo',
    },
  },
  en: {
    nav: { features: 'Features', howto: 'How', video: 'Video', contact: 'Contact' },
    lang: { ja: '日本語', en: 'EN' },
    hero: {
      badge: 'Workout Log App',
      h1a: 'Logging, made simple.',
      h1b: 'Progress, made clear.',
      tagline: 'Pick an exercise, enter weight and reps. Your hard work, in the form most likely to last.',
      appStore: 'Download on the App Store',
      video: 'Watch 30s',
      meta: ['Free', 'iOS 17+', 'JA / English', 'Works offline'],
    },
    pillars: {
      title: 'Less fiddling with your log. More training.',
      items: [
        { t: 'Log fast', d: 'Pick an exercise, enter weight and reps. Repeat your last set in one tap.' },
        { t: 'See progress', d: 'Charts for weight, reps and volume per exercise — from 1 month to 5 years.' },
        { t: 'Keep going', d: 'Simple enough to stick with. Data stays on your device, in your hands.' },
      ],
    },
    feats: [
      {
        eye: 'RECORD',
        h: 'Log without thinking.',
        p: 'No wrestling with your phone at the gym. Recall your last set in one tap, adjust the numbers, done. Minimal taps between sets.',
        list: ['One tap to repeat last set', 'Add a set in one tap', 'Save exercises as favorites'],
      },
      {
        eye: 'PROGRESS',
        h: 'Watch the numbers climb.',
        p: 'Your consistency shows up in the graph. Track weight, reps and volume per exercise, switching the time range as you like.',
        list: ['Progress graph per exercise', 'Switch weight / reps / volume', 'See 1M–5Y at a glance'],
      },
      {
        eye: 'FOCUS',
        h: "Don't miss your rest.",
        p: 'Times your rest automatically and keeps running in the background — put the phone down and focus on the next set.',
        list: ['Rest timer between sets', 'Runs in the background', 'Put it down, lift again'],
      },
    ],
    mini: {
      title: 'The details that keep you going.',
      items: [
        { t: 'Weight tracking', d: 'Log your weight and monthly changes, and how training relates to it.' },
        { t: 'Backup', d: 'Export and import as JSON / CSV. Your data is always yours.' },
        { t: 'Customization', d: 'Switch theme, units (kg/lb) and language (Japanese / English).' },
      ],
    },
    video: { eye: 'IN ACTION', h: 'See it in 30 seconds.', p: 'The real logging flow, in a short clip.' },
    final: { h: 'Start logging today.', p: 'Free. No sign-in required — just open and go.', cta: 'Download on the App Store' },
    contact: { eye: 'CONTACT', h: 'Questions & feedback', p: 'The best improvements come from the people who use it.', btn: 'Open contact form' },
    urls: {
      appStore: 'https://apps.apple.com/app/liftly-simple-workout-log/id6757798075',
      contactForm: 'https://forms.gle/4xBiNdntNHTSyRWc6',
      youtube: 'https://www.youtube.com/embed/s2aB3qd8uTo',
    },
  },
} as const;

type Lang = keyof typeof TRANSLATIONS;

function AppleSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

/* ── Crafted phone mockups (light UI) ── */
function StatusBar() {
  return (
    <div className="lf-screen-status">
      <span>9:41</span>
      <span className="lf-dots">●●● ▾ ▮</span>
    </div>
  );
}

function LoggingPhone() {
  return (
    <div className="lf-phone" aria-hidden="true">
      <div className="lf-screen">
        <StatusBar />
        <div className="lf-screen-body">
          <div>
            <div className="lf-sc-h">Today&apos;s Workout</div>
            <div className="lf-sc-sub">Push Day · 3 exercises</div>
          </div>
          <div className="lf-ex">
            <div className="lf-ex-top">
              <span className="lf-ex-name">Bench Press</span>
              <span className="lf-ex-pr">NEW PR</span>
            </div>
            <div className="lf-set"><i>1</i><b>60</b> kg × <b>10</b><em>prev 57.5</em></div>
            <div className="lf-set"><i>2</i><b>62.5</b> kg × <b>8</b><em>prev 60</em></div>
            <div className="lf-set"><i>3</i><b>65</b> kg × <b>6</b><em>prev 62.5</em></div>
            <div className="lf-ex-add">＋ Add set</div>
          </div>
          <div className="lf-ex">
            <div className="lf-ex-top"><span className="lf-ex-name">Incline DB Press</span></div>
            <div className="lf-set"><i>1</i><b>22</b> kg × <b>12</b><em>prev 22</em></div>
          </div>
          <div className="lf-sc-cta">Finish workout</div>
        </div>
      </div>
    </div>
  );
}

function GraphPhone() {
  return (
    <div className="lf-phone" aria-hidden="true">
      <div className="lf-screen">
        <StatusBar />
        <div className="lf-screen-body">
          <div>
            <div className="lf-sc-h">Progress</div>
            <div className="lf-sc-sub">Bench Press · est. 1RM</div>
          </div>
          <div className="lf-graph">
            <div className="lf-graph-top">
              <span className="lf-graph-val">82.5<small>+14%</small></span>
              <span className="lf-ex-pr">6M</span>
            </div>
            <svg className="lf-graph-svg" viewBox="0 0 240 84" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lfArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(47,107,255,0.28)" />
                  <stop offset="100%" stopColor="rgba(47,107,255,0)" />
                </linearGradient>
              </defs>
              <path d="M0,70 L40,64 L80,58 L120,44 L160,40 L200,24 L240,14 L240,84 L0,84 Z" fill="url(#lfArea)" />
              <path d="M0,70 L40,64 L80,58 L120,44 L160,40 L200,24 L240,14" fill="none" stroke="#2f6bff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="240" cy="14" r="4" fill="#2f6bff" />
            </svg>
            <div className="lf-chips"><span>1M</span><span className="on">6M</span><span>1Y</span><span>5Y</span></div>
          </div>
          <div className="lf-graph">
            <div className="lf-graph-top">
              <span className="lf-graph-val" style={{ fontSize: 16 }}>Volume <small>+22%</small></span>
            </div>
            <div className="lf-set" style={{ marginTop: 6 }}><i>W</i><b>18,400</b> kg this week<em>+3,200</em></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimerPhone() {
  const C = 2 * Math.PI * 70;
  return (
    <div className="lf-phone" aria-hidden="true">
      <div className="lf-screen">
        <StatusBar />
        <div className="lf-screen-body">
          <div>
            <div className="lf-sc-h">Rest</div>
            <div className="lf-sc-sub">Between sets · Bench Press</div>
          </div>
          <div className="lf-timer-wrap">
            <div className="lf-timer">
              <svg viewBox="0 0 158 158">
                <circle cx="79" cy="79" r="70" fill="none" stroke="#eef1f7" strokeWidth="10" />
                <circle cx="79" cy="79" r="70" fill="none" stroke="#2f6bff" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={C * 0.34} />
              </svg>
              <div style={{ textAlign: 'center' }}>
                <div className="lf-timer-num">1:30</div>
                <div className="lf-timer-lb">REST</div>
              </div>
            </div>
          </div>
          <div className="lf-sc-cta">Skip rest</div>
        </div>
      </div>
    </div>
  );
}

const FEAT_VISUALS = [<LoggingPhone key="l" />, <GraphPhone key="g" />, <TimerPhone key="t" />];

function LiftlyContent() {
  const searchParams = useSearchParams();
  const lang: Lang = searchParams.get('lang')?.toLowerCase() === 'en' ? 'en' : 'ja';
  const t = TRANSLATIONS[lang];
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('js');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transitionDelay =
              (e.target as HTMLElement).dataset.delay || '0s';
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    el.querySelectorAll('[data-rv]').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const langUrl = (l: Lang) => `/liftly/?lang=${l}`;

  return (
    <main className="lf" ref={root}>
      <FamilyBar current="liftly" />

      <nav className="lf-nav">
        <div className="lf-nav-inner">
          <a className="lf-logo" href="#top">
            <img src="/assets/media/liftly-icon.png" alt="" width={26} height={26} />
            Liftly
          </a>
          <div className="lf-nav-right">
            <div className="lf-nav-links">
              <a href="#features">{t.nav.features}</a>
              <a href="#howto">{t.nav.howto}</a>
              <a href="#video">{t.nav.video}</a>
            </div>
            <div className="lf-lang">
              <a href={langUrl('ja')} className={lang === 'ja' ? 'is-active' : ''}>{t.lang.ja}</a>
              <a href={langUrl('en')} className={lang === 'en' ? 'is-active' : ''}>{t.lang.en}</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="lf-hero" id="top">
        <div className="lf-hero-copy">
          <span className="lf-badge" data-rv>● {t.hero.badge}</span>
          <h1 data-rv data-delay="0.05s">
            {t.hero.h1a}<br />
            <span className="lf-accent">{t.hero.h1b}</span>
          </h1>
          <p className="lf-hero-tagline" data-rv data-delay="0.1s">{t.hero.tagline}</p>
          <div className="lf-hero-actions" data-rv data-delay="0.15s">
            <a className="lf-btn lf-btn-primary" href={t.urls.appStore} target="_blank" rel="noopener">
              <AppleSvg /> {t.hero.appStore}
            </a>
            <a className="lf-btn lf-btn-ghost" href="#video">▶ {t.hero.video}</a>
          </div>
          <div className="lf-hero-meta" data-rv data-delay="0.2s">
            {t.hero.meta.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
        <div className="lf-hero-visual" data-rv data-delay="0.1s">
          <LoggingPhone />
        </div>
      </header>

      {/* spec strip */}
      <div className="lf-spec" data-rv>
        <div className="lf-spec-inner">
          {t.hero.meta.map((m) => <span key={m}>{m}</span>)}
          <span>JSON / CSV エクスポート</span>
        </div>
      </div>

      {/* pillars */}
      <section className="lf-section" id="features">
        <p className="lf-eyebrow" data-rv>WHY LIFTLY</p>
        <h2 className="lf-h2" data-rv data-delay="0.05s">{t.pillars.title}</h2>
        <div className="lf-pillars">
          {t.pillars.items.map((p, i) => (
            <article className="lf-pillar" key={p.t} data-rv data-delay={`${i * 0.08}s`}>
              <span className="lf-pillar-ic">{PILLAR_ICONS[i]}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* feature deep-dives */}
      <section className="lf-section" id="howto" style={{ paddingTop: 0 }}>
        {t.feats.map((f, i) => (
          <div className={`lf-feat${i % 2 === 1 ? ' rev' : ''}`} key={f.eye}>
            <div className="lf-feat-copy" data-rv>
              <p className="lf-eyebrow">{f.eye}</p>
              <h3 style={{ marginTop: 12 }}>{f.h}</h3>
              <p>{f.p}</p>
              <ul className="lf-feat-list">
                {f.list.map((li) => <li key={li}>{li}</li>)}
              </ul>
            </div>
            <div className="lf-feat-visual" data-rv data-delay="0.08s">{FEAT_VISUALS[i]}</div>
          </div>
        ))}

        <div className="lf-mini">
          {t.mini.items.map((m, i) => (
            <article className="lf-mini-card" key={m.t} data-rv data-delay={`${i * 0.07}s`}>
              <span className="lf-pillar-ic">{MINI_ICONS[i]}</span>
              <h4>{m.t}</h4>
              <p>{m.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* video */}
      <section className="lf-section lf-video" id="video">
        <p className="lf-eyebrow" data-rv>{t.video.eye}</p>
        <h2 className="lf-h2" data-rv data-delay="0.05s">{t.video.h}</h2>
        <div className="lf-video-frame" data-rv data-delay="0.1s">
          <iframe
            src={t.urls.youtube}
            title="Liftly"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      {/* final CTA */}
      <section className="lf-final" id="contact">
        <div className="lf-final-inner">
          <h2 data-rv>{t.final.h}</h2>
          <p data-rv data-delay="0.05s">{t.final.p}</p>
          <a className="lf-btn" href={t.urls.appStore} target="_blank" rel="noopener" data-rv data-delay="0.1s">
            <AppleSvg /> {t.final.cta}
          </a>
        </div>
      </section>

      <FamilyBand current="liftly" />
      <FamilyFooter current="liftly" privacyHref="#features" />
    </main>
  );
}

const PILLAR_ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m7 14 4-4 3 3 5-6" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" /></svg>,
];
const MINI_ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18" /><path d="M6 8h12M9 12h6M8 21h8" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>,
];

export default function LiftlyPage() {
  return (
    <Suspense>
      <LiftlyContent />
    </Suspense>
  );
}
