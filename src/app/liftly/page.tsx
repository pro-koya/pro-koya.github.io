'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef } from 'react';
import { FamilyBar, FamilyBand, FamilyFooter } from '../../components/muscle-family';

const SHOTS = [5, 4, 2, 1, 3]; // real App Store screenshots, ordered light→dark

const TRANSLATIONS = {
  ja: {
    nav: { features: '機能', screens: '画面', video: '動画' },
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
    gallery: { eye: 'THE APP', h: '実際の画面で、確かめてください。', p: '記録・履歴・成長グラフ・タイマーまで。実際のアプリ画面です。' },
    growth: { eye: 'PROGRESS', h: '続けるほど、\n線は上を向く。', p: '種目別の推移をグラフで。続けた成果が、ひと目で分かる。', stat: '半年で 1RM', unit: '%' },
    pillars: {
      title: '記録に悩まず、トレーニングに集中。',
      items: [
        { t: '速く、記録', d: '種目を選んで重量と回数を入れるだけ。前回のセットはワンタップで再現。' },
        { t: '成長が、見える', d: '種目別に重量・回数・ボリュームをグラフ化。1ヶ月から5年まで俯瞰できる。' },
        { t: 'ずっと、続く', d: 'シンプルだから続く。データは端末内に保存され、あなたの手の中にある。' },
      ],
    },
    features: {
      title: '続けるための、ぜんぶ。',
      items: [
        { t: 'ワンタップ再現', d: '前回のセットを1タップで呼び出し、数字を直すだけ。' },
        { t: '成長グラフ', d: '種目別に重量・回数・ボリュームの推移を可視化。' },
        { t: 'セット間タイマー', d: 'バックグラウンドでも動く、休憩タイマー。' },
        { t: '体重管理', d: '体重の推移と月間の変化を記録できる。' },
        { t: 'バックアップ', d: 'JSON / CSV で書き出し・読み込み。データは常にあなたの手元に。' },
        { t: 'カスタマイズ', d: 'テーマ・単位（kg/lb）・言語（日本語/English）を切替。' },
      ],
    },
    video: { eye: 'IN ACTION', h: '30秒で、伝わる。', p: '実際の記録の流れを、動画でどうぞ。' },
    final: { h: '今日から、記録を始める。', p: '無料。サインイン不要で、すぐに使えます。', cta: 'App Store でダウンロード' },
    urls: {
      appStore: 'https://apps.apple.com/app/liftly-simple-workout-log/id6757798075',
      youtube: 'https://www.youtube.com/embed/s2aB3qd8uTo',
    },
  },
  en: {
    nav: { features: 'Features', screens: 'Screens', video: 'Video' },
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
    gallery: { eye: 'THE APP', h: 'See it in the real screens.', p: 'Logging, history, progress graphs and timers — actual screens from the app.' },
    growth: { eye: 'PROGRESS', h: 'Keep going.\nThe line goes up.', p: 'Your trend per exercise, in a graph. Consistency you can see at a glance.', stat: '1RM in 6 months', unit: '%' },
    pillars: {
      title: 'Less fiddling with your log. More training.',
      items: [
        { t: 'Log fast', d: 'Pick an exercise, enter weight and reps. Repeat your last set in one tap.' },
        { t: 'See progress', d: 'Charts for weight, reps and volume per exercise — from 1 month to 5 years.' },
        { t: 'Keep going', d: 'Simple enough to stick with. Data stays on your device, in your hands.' },
      ],
    },
    features: {
      title: 'Everything that keeps you going.',
      items: [
        { t: 'Repeat last set', d: 'Recall your last set in one tap, then just adjust the numbers.' },
        { t: 'Progress graphs', d: 'Visualize weight, reps and volume over time, per exercise.' },
        { t: 'Rest timer', d: 'A rest timer that keeps running in the background.' },
        { t: 'Weight tracking', d: 'Log your weight and see monthly changes.' },
        { t: 'Backup', d: 'Export and import as JSON / CSV. Your data is always yours.' },
        { t: 'Customization', d: 'Switch theme, units (kg/lb) and language (Japanese / English).' },
      ],
    },
    video: { eye: 'IN ACTION', h: 'See it in 30 seconds.', p: 'The real logging flow, in a short clip.' },
    final: { h: 'Start logging today.', p: 'Free. No sign-in required — just open and go.', cta: 'Download on the App Store' },
    urls: {
      appStore: 'https://apps.apple.com/app/liftly-simple-workout-log/id6757798075',
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

const FEATURE_ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m7 14 4-4 3 3 5-6" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M6 8h12M9 12h6M8 21h8" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>,
];
const PILLAR_ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m7 14 4-4 3 3 5-6" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" /></svg>,
];

function LiftlyContent() {
  const searchParams = useSearchParams();
  const lang: Lang = searchParams.get('lang')?.toLowerCase() === 'en' ? 'en' : 'ja';
  const t = TRANSLATIONS[lang];
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // CSS shows everything; no .js hiding
    el.classList.add('js'); // hide [data-rv] immediately (avoid FOUC) before gsap loads

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
        // refined reveals
        gsap.utils.toArray<HTMLElement>('[data-rv]').forEach((n) => {
          gsap.fromTo(
            n,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              delay: parseFloat(n.dataset.delay || '0'),
              scrollTrigger: { trigger: n, start: 'top 88%' },
            }
          );
        });

        // count-up numbers
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((n) => {
          const target = parseFloat(n.dataset.count || '0');
          const o = { v: 0 };
          gsap.to(o, {
            v: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: n, start: 'top 85%' },
            onUpdate: () => { n.textContent = Math.round(o.v).toString(); },
          });
        });

        // signature: pinned horizontal screenshot gallery
        const gal = el.querySelector<HTMLElement>('[data-gallery]');
        const track = el.querySelector<HTMLElement>('[data-gallery-track]');
        if (gal && track) {
          gal.classList.add('is-pinned');
          const amount = () => Math.max(0, track.scrollWidth - el.clientWidth + 40);
          gsap.to(track, {
            x: () => -amount(),
            ease: 'none',
            scrollTrigger: {
              trigger: gal,
              start: 'top top',
              end: () => `+=${amount()}`,
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }

        // signature: growth line draws itself on scroll
        const path = el.querySelector<SVGPathElement>('[data-draw]');
        const growth = el.querySelector<HTMLElement>('[data-growth]');
        if (path && growth) {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: { trigger: growth, start: 'top 72%', end: 'bottom 65%', scrub: 0.8 },
          });
        }

        (ScrollTrigger as { refresh: () => void }).refresh();
      }, root);
    })();

    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  const langUrl = (l: Lang) => `/liftly/?lang=${l}`;

  return (
    <>
      <FamilyBar current="liftly" />
      <main className="lf" ref={root}>
        <nav className="lf-nav">
          <div className="lf-nav-inner">
            <a className="lf-logo" href="#top">
              <img src="/assets/media/liftly-icon.png" alt="" width={26} height={26} />
              Liftly
            </a>
            <div className="lf-nav-right">
              <div className="lf-nav-links">
                <a href="#screens">{t.nav.screens}</a>
                <a href="#features">{t.nav.features}</a>
                <a href="#video">{t.nav.video}</a>
              </div>
              <div className="lf-lang">
                <a href={langUrl('ja')} className={lang === 'ja' ? 'is-active' : ''}>{t.lang.ja}</a>
                <a href={langUrl('en')} className={lang === 'en' ? 'is-active' : ''}>{t.lang.en}</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero (centered) */}
        <header className="lf-hero" id="top">
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
        </header>

        {/* Real screenshots gallery — pinned horizontal scroll */}
        <section className="lf-gallery" id="screens" data-gallery>
          <div className="lf-gallery-head" data-rv>
            <p className="lf-eyebrow">{t.gallery.eye}</p>
            <h2 className="lf-h2">{t.gallery.h}</h2>
            <p className="lf-lead">{t.gallery.p}</p>
          </div>
          <div className="lf-gallery-track" data-gallery-track>
            {SHOTS.map((n, i) => (
              <figure className="lf-shot" key={n}>
                <img
                  src={`/assets/media/liftly/shot-${n}.jpg`}
                  alt={`Liftly のアプリ画面 ${i + 1}`}
                  width={1600}
                  height={739}
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              </figure>
            ))}
          </div>
        </section>

        {/* pillars */}
        <section className="lf-section">
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

        {/* signature: growth line draws on scroll */}
        <section className="lf-growth" data-growth>
          <div className="lf-growth-inner">
            <div className="lf-growth-copy" data-rv>
              <p className="lf-eyebrow">{t.growth.eye}</p>
              <h2 className="lf-h2 lf-pre">{t.growth.h}</h2>
              <p className="lf-lead">{t.growth.p}</p>
              <div className="lf-growth-stat">
                <span className="lf-growth-plus">+</span>
                <span className="lf-count" data-count="30">0</span>
                <em>{t.growth.unit}</em>
                <small>{t.growth.stat}</small>
              </div>
            </div>
            <div className="lf-growth-chart" data-rv data-delay="0.1s" aria-hidden="true">
              <svg viewBox="0 0 520 300" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lfGrowthArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(47,107,255,0.26)" />
                    <stop offset="100%" stopColor="rgba(47,107,255,0)" />
                  </linearGradient>
                </defs>
                {[60, 120, 180, 240].map((y) => (
                  <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="rgba(12,14,20,0.06)" strokeWidth="1" />
                ))}
                <path d="M8,258 L98,232 L178,242 L262,182 L344,150 L430,92 L512,38 L512,300 L8,300 Z" fill="url(#lfGrowthArea)" />
                <path className="lf-growth-line" data-draw d="M8,258 L98,232 L178,242 L262,182 L344,150 L430,92 L512,38"
                  fill="none" stroke="#2f6bff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle className="lf-growth-dot" cx="512" cy="38" r="7" fill="#2f6bff" />
              </svg>
            </div>
          </div>
        </section>

        {/* feature grid */}
        <section className="lf-section" id="features" style={{ paddingTop: 0 }}>
          <p className="lf-eyebrow" data-rv>FEATURES</p>
          <h2 className="lf-h2" data-rv data-delay="0.05s">{t.features.title}</h2>
          <div className="lf-grid">
            {t.features.items.map((f, i) => (
              <article className="lf-grid-card" key={f.t} data-rv data-delay={`${(i % 3) * 0.07}s`}>
                <span className="lf-pillar-ic">{FEATURE_ICONS[i]}</span>
                <h4>{f.t}</h4>
                <p>{f.d}</p>
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
        <section className="lf-final">
          <div className="lf-final-inner">
            <h2 data-rv>{t.final.h}</h2>
            <p data-rv data-delay="0.05s">{t.final.p}</p>
            <a className="lf-btn" href={t.urls.appStore} target="_blank" rel="noopener" data-rv data-delay="0.1s">
              <AppleSvg /> {t.final.cta}
            </a>
          </div>
        </section>
      </main>

      <FamilyBand current="liftly" />
      <FamilyFooter current="liftly" privacyHref="#features" />
    </>
  );
}

export default function LiftlyPage() {
  return (
    <Suspense>
      <LiftlyContent />
    </Suspense>
  );
}
