'use client';

import { useEffect, useRef } from 'react';

export function HeroSection() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ns = 'http://www.w3.org/2000/svg';
    const groups = svg.querySelectorAll<SVGGElement>('.hl-stalks');
    const baseY = 330;

    const configs = [
      { startX: 5,  step: 18, count: 18, dy: 0  },
      { startX: 14, step: 18, count: 18, dy: -1 },
      { startX: 22, step: 54, count: 6,  dy: -4 },
    ];

    groups.forEach((group, gi) => {
      const cfg = configs[gi] || configs[0];
      for (let i = 0; i < cfg.count; i++) {
        const x = cfg.startX + i * cfg.step + (Math.random() * 3.5 - 1.75);
        const h = 16 + Math.random() * 8;
        const tilt = (Math.random() - 0.5) * 3.5;
        const droop = 3 + Math.random() * 4;
        const base = baseY + cfg.dy;
        const path = document.createElementNS(ns, 'path');
        path.setAttribute(
          'd',
          `M${x.toFixed(1)},${base} L${(x + tilt).toFixed(1)},${(base - h).toFixed(1)} Q${(x + tilt + droop).toFixed(1)},${(base - h - 3).toFixed(1)} ${(x + tilt + droop - 1).toFixed(1)},${(base - h - 7).toFixed(1)}`,
        );
        path.setAttribute('class', 'hl-stalk');
        group.appendChild(path);
      }
    });

    requestAnimationFrame(() =>
      requestAnimationFrame(() => svg.classList.add('is-visible')),
    );
  }, []);

  return (
    <section className="hero hero--home">
      <div className="hero__shell reveal is-visible">
        {/* SVG landscape */}
        <div className="hero-home__abstract" aria-hidden="true">
          {/* <svg
            ref={svgRef}
            className="hero-landscape"
            viewBox="0 0 560 400"
            role="presentation"
            focusable={false}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="hl-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d8c9b5" />
                <stop offset="42%" stopColor="#e9dfd4" />
                <stop offset="100%" stopColor="#f6f2ee" />
              </linearGradient>
              <radialGradient id="hl-glow" cx="480" cy="72" r="140" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f8c840" stopOpacity="0.52" />
                <stop offset="55%" stopColor="#f0a030" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#f0a030" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="hl-water" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a4bdd0" stopOpacity="0.68" />
                <stop offset="100%" stopColor="#86a8be" stopOpacity="0.38" />
              </linearGradient>
            </defs>
            <rect width="560" height="400" fill="url(#hl-sky)" />
            <circle cx="480" cy="72" r="140" fill="url(#hl-glow)" />
            <circle className="hl-sun" cx="480" cy="72" r="20" fill="#f2b535" opacity="0.80" />
            <path d="M0,222 Q88,165 172,185 Q244,160 324,176 Q394,156 460,170 Q510,152 560,165 L560,272 L0,272 Z" fill="rgba(140,150,172,0.22)" />
            <path d="M0,255 Q52,210 124,228 Q200,208 276,222 Q348,204 420,220 Q484,206 560,224 L560,305 L0,305 Z" fill="rgba(102,116,138,0.34)" />
            <path d="M0,290 Q40,260 100,276 Q176,255 250,270 Q322,254 392,270 Q460,254 536,268 L560,274 L560,330 L0,330 Z" fill="rgba(70,86,105,0.47)" />
            <rect x="0" y="328" width="560" height="9" fill="rgba(82,98,78,0.42)" />
            <rect x="0" y="337" width="560" height="11" fill="url(#hl-water)" opacity="0.92" />
            <line x1="0" y1="348" x2="560" y2="348" stroke="rgba(112,142,165,0.44)" strokeWidth="0.8" />
            <rect x="0" y="352" width="560" height="10" fill="url(#hl-water)" opacity="0.74" />
            <line x1="0" y1="362" x2="560" y2="362" stroke="rgba(112,142,165,0.36)" strokeWidth="0.7" />
            <rect x="0" y="366" width="560" height="9" fill="url(#hl-water)" opacity="0.57" />
            <line x1="0" y1="375" x2="560" y2="375" stroke="rgba(112,142,165,0.28)" strokeWidth="0.6" />
            <rect x="0" y="379" width="560" height="8" fill="url(#hl-water)" opacity="0.42" />
            <rect x="0" y="390" width="560" height="10" fill="url(#hl-water)" opacity="0.28" />
            <g className="hl-stalks hl-stalks--a" />
            <g className="hl-stalks hl-stalks--b" />
            <g className="hl-stalks hl-stalks--c" />
          </svg> */}
        </div>

        {/* Main hero content */}
        <div className="hero-home">
          <div className="hero-home__aside">
            <p className="hero-home__aside-label">かたちを、問う。</p>
            <p className="hero-home__aside-text">
              完成した瞬間に閉じるものではなく、人や現場の営みの中に自然に溶け込み、使われながら育っていくこと。
              それが、私にとっての「息をする形」と考えています。
            </p>
          </div>

          <div className="hero-home__main">
            <span className="eyebrow">Web App Engineer</span>
            <h1 className="hero-title hero-title--home">
              <span className="title-line">営みの中で、</span>
              <span className="title-line hero-title__accent">息をするものを。</span>
            </h1>
            <p className="hero-lead">
              機能をつくること以上に、人や仕事の流れの中で自然に使われ続ける形を大切にしています。
            </p>
            <p className="hero-subcopy">
              人と人のあいだで生まれる価値が、
              ちゃんと前に進む形になるように。
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#works">実績を見る</a>
              <a className="button button--ghost" href="#contact">問い合わせる</a>
            </div>
          </div>
        </div>

        <div className="hero-home__notes reveal reveal-delay-1">
          <div className="hero-note">
            <span className="hero-note__label">Now working with</span>
            <p>Next.js / React / Node.js / PostgreSQL / Supabase</p>
          </div>
          <div className="hero-note">
            <span className="hero-note__label">Good for</span>
            <p>要件整理 / 管理画面 / 認証 / 決済 / 業務導線 / 改善設計</p>
          </div>
        </div>
      </div>
    </section>
  );
}
