'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FamilyBar } from '../../components/muscle-family';

/* ────────────────────────────────────────────────
   Muscle360 — 統合構想 LP
   Apple風スクロールアニメーション (GSAP ScrollTrigger)
   narrative: Hero → 記録だけでは弱い → 記録·解釈·行動
            → 360°ドメイン軌道 → 3アプリ → 筋トレ仙人
            → 共通ID → ロードマップ → CTA
──────────────────────────────────────────────── */

const DOMAINS = [
  { key: 'identity', label: 'Identity', jp: '人', desc: '共通ID・プロフィール', tone: 'core' },
  { key: 'training', label: 'Training', jp: '努力', desc: 'トレーニングの記録', tone: 'live' },
  { key: 'alcohol', label: 'Alcohol', jp: '逆風', desc: '飲酒による損失', tone: 'live' },
  { key: 'nutrition', label: 'Nutrition', jp: '材料', desc: '食事・栄養', tone: 'soon' },
  { key: 'body', label: 'Body', jp: '身体', desc: '体重・体組成', tone: 'soon' },
  { key: 'condition', label: 'Condition', jp: '調子', desc: '睡眠・コンディション', tone: 'soon' },
  { key: 'insight', label: 'Insight', jp: '解釈', desc: '助言・行動提案', tone: 'live' },
];

const APPS = [
  {
    key: 'forge',
    name: 'Forge',
    role: '追い込みの記録',
    domain: 'TRAINING',
    desc: 'CrossFit と Hyrox を1つで。タイマーを止めたら即記録、Roxzone まで自動算出。',
    href: '/forge/',
    shot: '/assets/media/forge/forge-2-timer.webp',
    accent: 'forge',
  },
  {
    key: 'liftly',
    name: 'Liftly',
    role: '積み上げの可視化',
    domain: 'TRAINING',
    desc: 'シンプルで美しい筋トレ記録。重量・回数・種目別の成長を、ひとつに。',
    href: '/liftly/',
    shot: '/assets/media/liftly-page.png',
    accent: 'liftly',
  },
  {
    key: 'sorrygains',
    name: '筋肉ごめん',
    role: '逆風の可視化',
    domain: 'ALCOHOL',
    desc: '飲んだ夜の筋肉に、そっと謝る。飲酒による損失を、少し笑える記録に。',
    href: '/sorrygains/',
    shot: '/assets/media/sorrygains/home-lv3.png',
    accent: 'sorrygains',
  },
];

const SAGE_LINES = [
  '今日は飲みすぎた。でも、脚トレの蓄積は本物だ。',
  '昨日は高強度だった。今日は回復に寄せろ。',
  '食事が足りていない。飲酒より先に、補給しろ。',
];

const PHASES = [
  {
    tag: 'PHASE 1',
    state: 'NOW',
    title: '3つのアプリを、共通IDでつなぐ',
    body: 'Forge・Liftly・筋肉ごめん を1つのアカウントで。Muscle360 Pro なら、1購読で3アプリの Pro が解放される。',
  },
  {
    tag: 'PHASE 2',
    state: 'NEXT',
    title: '身体の状態を、文脈に加える',
    body: '体重・体脂肪率などの Body Metrics を追加。助言の文脈を増やし、統合ビューを試作する。',
  },
  {
    tag: 'PHASE 3',
    state: 'VISION',
    title: '筋トレ仙人が、統合アドバイザーになる',
    body: '食事・睡眠を統合。点と点がつながり、「今の自分」を一言で返す統合ホームへ。',
  },
];

export default function Muscle360Page() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      if (cancelled || !root.current) return;
      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const q = (sel: string) => Array.from(root.current!.querySelectorAll(sel));

        if (prefersReduced) {
          gsap.set('[data-reveal], [data-orbit-node], [data-stagger] > *', {
            opacity: 1,
            y: 0,
            scale: 1,
            clearProps: 'all',
          });
          return;
        }

        // Hero entrance
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-hero-line]', { yPercent: 120, opacity: 0, duration: 1.1, stagger: 0.12 })
          .from('[data-hero-sub]', { y: 24, opacity: 0, duration: 0.9 }, '-=0.6')
          .from('[data-hero-cue]', { opacity: 0, duration: 0.8 }, '-=0.4');

        // Hero orb: dramatic assemble + scroll-reactive rotation (alive, dimensional)
        gsap.from('.m360-hero-orb', { scale: 0.55, opacity: 0, duration: 1.5, ease: 'power3.out', delay: 0.15 });
        gsap.to('.m360-hero-orb', {
          rotate: 42,
          ease: 'none',
          scrollTrigger: { trigger: '.m360-hero', start: 'top top', end: 'bottom top', scrub: 1 },
        });

        // Generic reveal-on-enter
        q('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          });
        });

        // Staggered groups
        q('[data-stagger]').forEach((group) => {
          gsap.from((group as HTMLElement).children, {
            y: 32,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: { trigger: group, start: 'top 80%' },
          });
        });

        // Signature: the 360° orbit — scattered data unifies around YOU
        const orbitSection = root.current!.querySelector('[data-orbit-section]');
        const ring = root.current!.querySelector('[data-orbit-ring]');
        if (orbitSection && ring) {
          const nodes = Array.from(orbitSection.querySelectorAll('[data-orbit-node]'));
          const spokes = Array.from(orbitSection.querySelectorAll('[data-spoke]'));
          gsap.set(nodes, { opacity: 0, scale: 0.35 });
          gsap.set(spokes, { strokeDasharray: 50, strokeDashoffset: 50 });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: orbitSection,
              start: 'top top',
              end: '+=185%',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });
          tl.to(ring, { rotate: 300, ease: 'none', duration: 6 }, 0)
            .from('[data-orbit-center]', { opacity: 0, scale: 0.5, duration: 1.1, ease: 'power3.out' }, 0.1)
            // connection lines draw from あなた outward, one per domain
            .to(spokes, { strokeDashoffset: 0, ease: 'power2.out', stagger: 0.5, duration: 1.3 }, 0.35)
            // domains snap into place with a back-ease pop, in sync with their spoke
            .to(nodes, { opacity: 1, scale: 1, ease: 'back.out(1.5)', stagger: 0.5, duration: 1.2 }, 0.5)
            // YOU intensifies as the system completes
            .to('[data-orbit-center]', { scale: 1.06, ease: 'power1.inOut', duration: 4.5 }, 0.4)
            .to('[data-orbit-caption]', { opacity: 1, y: 0, duration: 1 }, 3.2);
        }

        // App panels — screenshot parallax
        q('[data-app-shot]').forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 8 },
            {
              yPercent: -8,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        });

        // Sage advice lines — sequential reveal
        gsap.from('[data-sage-line]', {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.5,
          scrollTrigger: { trigger: '[data-sage]', start: 'top 70%' },
        });

        ScrollTrigger.refresh();
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <main className="m360" ref={root} id="top">
      <FamilyBar />
      <div className="m360-bg" aria-hidden="true">
        <span className="m360-bg-grid" />
        <span className="m360-bg-glow m360-bg-glow--a" />
        <span className="m360-bg-glow m360-bg-glow--b" />
      </div>

      {/* ── HERO ────────────────────────────── */}
      <section className="m360-hero" aria-labelledby="m360-hero-title">
        <div className="m360-hero-orb-wrap" data-hero-cue aria-hidden="true">
          <svg className="m360-hero-orb" viewBox="0 0 400 400" role="presentation">
            <defs>
              <radialGradient id="m360OrbGlow" cx="50%" cy="44%" r="55%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
                <stop offset="38%" stopColor="rgba(76,141,255,0.16)" />
                <stop offset="72%" stopColor="rgba(229,68,59,0.1)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <linearGradient id="m360Ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e5443b" />
                <stop offset="38%" stopColor="#f3a83c" />
                <stop offset="70%" stopColor="#4c8dff" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="168" fill="url(#m360OrbGlow)" />
            <circle className="m360-orb-core" cx="200" cy="200" r="9" fill="#fff" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <g className="m360-ring m360-ring--1">
              <ellipse cx="200" cy="200" rx="150" ry="54" fill="none" stroke="url(#m360Ring)" strokeWidth="1.2" opacity="0.85" />
              <circle className="m360-orb-node" cx="350" cy="200" r="4.5" fill="#f3a83c" />
            </g>
            <g className="m360-ring m360-ring--2">
              <ellipse cx="200" cy="200" rx="150" ry="112" fill="none" stroke="url(#m360Ring)" strokeWidth="1.1" opacity="0.6" />
              <circle className="m360-orb-node" cx="50" cy="200" r="4" fill="#4c8dff" />
            </g>
            <g className="m360-ring m360-ring--3">
              <ellipse cx="200" cy="200" rx="116" ry="150" fill="none" stroke="url(#m360Ring)" strokeWidth="1" opacity="0.5" />
              <circle className="m360-orb-node" cx="200" cy="50" r="3.5" fill="#34d399" />
            </g>
          </svg>
        </div>
        <p className="m360-kicker" data-hero-cue>
          <span className="m360-dot" /> MUSCLE360 — 統合構想
        </p>
        <h1 id="m360-hero-title" className="m360-hero-title">
          <span className="m360-line"><span data-hero-line>体づくりのすべてを、</span></span>
          <span className="m360-line"><span data-hero-line className="m360-grad">ひとつの文脈に。</span></span>
        </h1>
        <p className="m360-hero-sub" data-hero-sub>
          筋トレも、飲酒も、食事も、体組成も。
          <span className="m360-nb">バラバラの記録を共通IDでつなぎ</span>、
          <span className="m360-nb">「今の自分への意味」</span>と
          <span className="m360-nb">「次の一手」</span>に変える。
        </p>
        <div className="m360-hero-cue" data-hero-cue aria-hidden="true">
          <span>SCROLL</span>
          <span className="m360-cue-bar" />
        </div>
      </section>

      {/* ── 記録だけでは弱い ────────────────── */}
      <section className="m360-section m360-weak" aria-labelledby="m360-weak-title">
        <p className="m360-eyebrow" data-reveal>THE PROBLEM</p>
        <h2 id="m360-weak-title" className="m360-h2" data-reveal>
          記録は、それだけでは<br />意味にならない。
        </h2>
        <div className="m360-weak-frags" data-stagger>
          <span>飲酒量だけ。</span>
          <span>トレ回数だけ。</span>
          <span>体重だけ。</span>
        </div>
        <p className="m360-weak-note" data-reveal>
          点のままのデータは、行動を変えない。意味は、点と点の<em>あいだ</em>に生まれる。
        </p>
      </section>

      {/* ── 記録 → 解釈 → 行動 ──────────────── */}
      <section className="m360-section m360-loop" aria-labelledby="m360-loop-title">
        <p className="m360-eyebrow" data-reveal>RECORD · INTERPRET · ACT</p>
        <h2 id="m360-loop-title" className="m360-h2" data-reveal>
          記録で、終わらせない。
        </h2>
        <div className="m360-loop-grid" data-stagger>
          {[
            ['01', '記録', 'Record', '各アプリが、それぞれの努力と逆風を残す。単独でも、ちゃんと役に立つ。'],
            ['02', '解釈', 'Interpret', '共通基盤が、点と点をつなぐ。高強度トレ後の飲酒、睡眠不足、補給の不足。'],
            ['03', '行動', 'Act', '今の自分への意味と、次の一手が返る。「記録しただけ」を超える。'],
          ].map(([num, jp, en, body]) => (
            <article className="m360-loop-card" key={num}>
              <span className="m360-loop-num">{num}</span>
              <h3>{jp}<em>{en}</em></h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── 360° ドメイン軌道 (signature) ───── */}
      <section className="m360-orbit-section" data-orbit-section aria-labelledby="m360-orbit-title">
        <div className="m360-orbit-stage">
          <div className="m360-orbit-head">
            <p className="m360-eyebrow">ONE BODY · EVERY SIGNAL</p>
            <h2 id="m360-orbit-title" className="m360-h2">
              体づくりは、<span className="m360-grad">360°</span>。
            </h2>
          </div>

          <div className="m360-orbit">
            <div className="m360-orbit-center" data-orbit-center>
              <span className="m360-orbit-center-jp">あなた</span>
              <span className="m360-orbit-center-en">ONE ACCOUNT</span>
            </div>
            <div className="m360-orbit-ring" data-orbit-ring>
              <span className="m360-orbit-track" aria-hidden="true" />
              <svg className="m360-orbit-spokes" viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                  <radialGradient id="m360Spoke" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                    <stop offset="55%" stopColor="rgba(160,180,255,0.28)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
                  </radialGradient>
                </defs>
                {DOMAINS.map((d, i) => {
                  const a = ((360 / DOMAINS.length) * i * Math.PI) / 180;
                  return (
                    <line
                      key={d.key}
                      className="m360-spoke"
                      data-spoke
                      x1="50"
                      y1="50"
                      x2={(50 + 50 * Math.cos(a)).toFixed(2)}
                      y2={(50 + 50 * Math.sin(a)).toFixed(2)}
                      stroke="url(#m360Spoke)"
                      strokeWidth="0.5"
                    />
                  );
                })}
              </svg>
              {DOMAINS.map((d, i) => {
                const angle = (360 / DOMAINS.length) * i;
                return (
                  <span
                    key={d.key}
                    className={`m360-orbit-node is-${d.tone}`}
                    data-orbit-node
                    style={{
                      transform: `rotate(${angle}deg) translate(var(--orbit-r)) rotate(-${angle}deg)`,
                    }}
                  >
                    <span className="m360-orbit-node-inner">
                      <em>{d.label}</em>
                      <strong>{d.jp}</strong>
                      <small>{d.desc}</small>
                      {d.tone === 'soon' ? <i className="m360-soon">SOON</i> : null}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          <p className="m360-orbit-caption" data-orbit-caption>
            7つのドメインを、ひとつのIDで束ねる。今あるのは3つ。残りは、これから。
          </p>
        </div>
      </section>

      {/* ── 3アプリ (接点) ─────────────────── */}
      <section className="m360-section m360-apps" aria-labelledby="m360-apps-title">
        <div className="m360-apps-head">
          <p className="m360-eyebrow" data-reveal>THE TOUCHPOINTS</p>
          <h2 id="m360-apps-title" className="m360-h2" data-reveal>
            単独で強い。<br />つなぐと、もっと。
          </h2>
          <p className="m360-apps-lead" data-reveal>
            各アプリは、それぞれ単独で成立する。統合前提でしか価値が出ない構造は、つくらない。
          </p>
        </div>

        <div className="m360-app-list">
          {APPS.map((app, i) => (
            <a
              className={`m360-app-card is-${app.accent}`}
              href={app.href}
              key={app.key}
              data-reveal
            >
              <div className="m360-app-copy">
                <span className="m360-app-domain">{app.domain}</span>
                <h3>{app.name}</h3>
                <p className="m360-app-role">{app.role}</p>
                <p className="m360-app-desc">{app.desc}</p>
                <span className="m360-app-link">開く →</span>
              </div>
              <div className="m360-app-visual">
                <div className="m360-app-shot" data-app-shot>
                  <Image
                    src={app.shot}
                    alt={`${app.name} のスクリーン`}
                    width={420}
                    height={900}
                    sizes="(max-width: 760px) 60vw, 320px"
                    priority={i === 0}
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── 筋トレ仙人 (解釈レイヤー) ────────── */}
      <section className="m360-section m360-sage" data-sage aria-labelledby="m360-sage-title">
        <div className="m360-sage-portrait" data-reveal>
          <Image
            src="/assets/media/muscle360/sage-dark.png"
            alt="筋トレ仙人"
            width={561}
            height={701}
          />
        </div>
        <div className="m360-sage-copy">
          <p className="m360-eyebrow">THE INTERPRETATION LAYER</p>
          <h2 id="m360-sage-title" className="m360-h2">
            データに、<br />人格を。
          </h2>
          <p className="m360-sage-lead">
            筋トレ仙人は、統合された記録を「感情に届く一言」に変える。
            現実を見せつつ、前を向かせる。これが、Muscle360 の解釈レイヤーの姿だ。
          </p>
          <div className="m360-sage-lines">
            {SAGE_LINES.map((line) => (
              <p className="m360-sage-line" data-sage-line key={line}>
                <span className="m360-sage-quote">「</span>{line}<span className="m360-sage-quote">」</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 共通ID ───────────────────────────── */}
      <section className="m360-section m360-id" aria-labelledby="m360-id-title">
        <p className="m360-eyebrow" data-reveal>ONE ACCOUNT</p>
        <h2 id="m360-id-title" className="m360-h2 m360-id-title" data-reveal>
          ひとつのアカウント。<br />
          <span className="m360-grad">つなぐほど、精度が上がる。</span>
        </h2>
        <p className="m360-id-note" data-reveal>
          アプリごとに別人格としてデータを持たない。あなたは唯一で、アプリはそのあなたへの接点にすぎない。
          だから、新しいドメインを足すほど、助言は自分に近づく。
        </p>
      </section>

      {/* ── ロードマップ ─────────────────────── */}
      <section className="m360-section m360-road" aria-labelledby="m360-road-title">
        <p className="m360-eyebrow" data-reveal>THE ROADMAP</p>
        <h2 id="m360-road-title" className="m360-h2" data-reveal>
          完成形へ、段階で。
        </h2>
        <div className="m360-road-list" data-stagger>
          {PHASES.map((p) => (
            <article className={`m360-road-item is-${p.state.toLowerCase()}`} key={p.tag}>
              <div className="m360-road-meta">
                <span className="m360-road-tag">{p.tag}</span>
                <span className="m360-road-state">{p.state}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="m360-cta" aria-labelledby="m360-cta-title">
        <h2 id="m360-cta-title" className="m360-cta-title" data-reveal>
          まずは、<span className="m360-grad">1つ</span>から。
        </h2>
        <p className="m360-cta-sub" data-reveal>
          Muscle360 Pro なら、1つの購読で Forge・Liftly・筋肉ごめん 3アプリの Pro が解放される。
        </p>
        <div className="m360-cta-apps" data-stagger>
          <a className="m360-cta-app is-forge" href="/forge/">Forge<em>CrossFit & Hyrox</em></a>
          <a className="m360-cta-app is-liftly" href="/liftly/">Liftly<em>筋トレ記録</em></a>
          <a className="m360-cta-app is-sorrygains" href="/sorrygains/">筋肉ごめん<em>飲酒 × 筋トレ</em></a>
        </div>
        <footer className="m360-footer">
          <span>MUSCLE360 — 統合構想 / 2026</span>
          <a href="/">制作: Miyabayasi Koya</a>
        </footer>
      </section>
    </main>
  );
}
