'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ParticleSystem } from './ParticleSystem';
import { extractPointsFromSVG } from './extractPoints';
import { SCENES, SCENE_BREAKPOINTS, PHASE_RATIOS } from './sceneConfig';
import type { Point, SceneState, AnimationPhase } from './types';

// ────────────────────────────────────────────────────────────
// 調整用定数
// ────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 20000;
const SCENE_DURATION_MS = 8000; // 1シーンあたりの表示時間
const TOTAL_MS = SCENE_DURATION_MS * SCENES.length;

// スワイプ判定のしきい値
const SWIPE_MIN_X = 40;   // 横移動の最小px
const WHEEL_MIN_X = 30;   // horizontalホイールの最小delta
const WHEEL_COOLDOWN_MS = 800; // シーン切替後のクールダウン

// ────────────────────────────────────────────────────────────
// スクロール進行率 → SceneState 変換
// ────────────────────────────────────────────────────────────
function getSceneState(progress: number): SceneState {
  const p = Math.max(0, Math.min(1, progress));
  const lastScene = SCENE_BREAKPOINTS.length - 2;
  let sceneIndex = lastScene;
  for (let i = 0; i < lastScene; i++) {
    if (p < SCENE_BREAKPOINTS[i + 1]) { sceneIndex = i; break; }
  }

  const sceneStart = SCENE_BREAKPOINTS[sceneIndex];
  const sceneEnd = SCENE_BREAKPOINTS[sceneIndex + 1] ?? 1;
  const sceneProgress = (p - sceneStart) / (sceneEnd - sceneStart);
  const { gather, scatter } = PHASE_RATIOS;
  const holdEnd = 1 - scatter;
  const isLast = sceneIndex === lastScene;

  let phase: AnimationPhase;
  let phaseProgress: number;
  if (sceneProgress < gather) {
    phase = 'gather'; phaseProgress = sceneProgress / gather;
  } else if (sceneProgress < holdEnd) {
    phase = 'hold'; phaseProgress = (sceneProgress - gather) / (holdEnd - gather);
  } else if (!isLast) {
    phase = 'scatter'; phaseProgress = (sceneProgress - holdEnd) / scatter;
  } else {
    phase = 'hold'; phaseProgress = 1;
  }
  return { sceneIndex, phase, phaseProgress };
}

// ────────────────────────────────────────────────────────────
export function WorkStyleSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const pointsRef = useRef<Point[][]>([]);
  const progressRef = useRef(0);
  const startTimeRef = useRef(performance.now());
  const prevSceneIndexRef = useRef(-1);
  const targetsSetForRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const currentSceneRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const wheelCooldownRef = useRef(false);
  const timerStartedRef = useRef(false);

  const [loadedCount, setLoadedCount] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ── モバイル判定（レイアウト切り替えのみ）──────────────
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const check = () => setIsMobile(mql.matches);
    check();
    mql.addEventListener('change', check);
    return () => mql.removeEventListener('change', check);
  }, []);

  // ── 粒子システム初期化 ──────────────────────────
  useEffect(() => {
    particleSystemRef.current = new ParticleSystem(PARTICLE_COUNT);
  }, []);

  // ── SVG 点群の非同期ロード ────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const loaded: Point[][] = [];
      for (let i = 0; i < SCENES.length; i++) {
        if (cancelled) return;
        try {
          const pts = await extractPointsFromSVG(SCENES[i].svgUrl, {
            renderSize: 624,
            sampleStep: SCENES[i].sampleStep,
            maxPoints: SCENES[i].maxPoints,
          });
          loaded.push(pts);
          pointsRef.current = [...loaded];
          setLoadedCount(i + 1);
        } catch (err) {
          console.warn(`[WorkStyle] scene ${i} load failed:`, err);
          loaded.push([]);
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ── Canvas リサイズ ────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w;
    canvas.height = h;
    particleSystemRef.current?.setCanvas(w, h);
    targetsSetForRef.current = -1;
  }, []);

  // ── タイマー（startTimeRef ベースで goToScene からリセット可能）──
  useEffect(() => {
    const id = setInterval(() => {
      if (!timerStartedRef.current) return;
      progressRef.current = ((performance.now() - startTimeRef.current) % TOTAL_MS) / TOTAL_MS;
    }, 50);
    return () => clearInterval(id);
  }, []);

  // ── セクション初回表示でタイマースタート（gather アニメから始める）──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !timerStartedRef.current) {
          timerStartedRef.current = true;
          startTimeRef.current = performance.now();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── シーンジャンプ ────────────────────────────────
  const goToScene = useCallback((idx: number) => {
    const clamped = ((idx % SCENES.length) + SCENES.length) % SCENES.length;
    const targetElapsed = SCENE_BREAKPOINTS[clamped] * TOTAL_MS;
    startTimeRef.current = performance.now() - targetElapsed;
    progressRef.current = SCENE_BREAKPOINTS[clamped];
  }, []);

  const goToNextScene = useCallback(() => {
    goToScene(currentSceneRef.current + 1);
  }, [goToScene]);

  const goToPrevScene = useCallback(() => {
    goToScene(currentSceneRef.current - 1);
  }, [goToScene]);

  // ── 横ホイール（PC トラックパッド）────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaX) < WHEEL_MIN_X) return;
      e.preventDefault();
      if (wheelCooldownRef.current) return;
      wheelCooldownRef.current = true;
      if (e.deltaX > 0) goToNextScene(); else goToPrevScene();
      setTimeout(() => { wheelCooldownRef.current = false; }, WHEEL_COOLDOWN_MS);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [goToNextScene, goToPrevScene]);

  // ── タッチスワイプ（モバイル・タッチスクリーン）──
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (Math.abs(dx) > SWIPE_MIN_X && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goToNextScene(); else goToPrevScene();
    }
  }, [goToNextScene, goToPrevScene]);

  // ── アニメーションループ ──────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      const newState = getSceneState(progressRef.current);

      if (newState.sceneIndex !== prevSceneIndexRef.current) {
        prevSceneIndexRef.current = newState.sceneIndex;
        currentSceneRef.current = newState.sceneIndex;
        setCurrentScene(newState.sceneIndex);
      }

      if (targetsSetForRef.current !== newState.sceneIndex) {
        const pts = pointsRef.current[newState.sceneIndex];
        if (pts && pts.length > 0 && particleSystemRef.current) {
          particleSystemRef.current.setTargets(pts, canvas.width, canvas.height);
          targetsSetForRef.current = newState.sceneIndex;
        }
      }

      if (particleSystemRef.current) {
        particleSystemRef.current.update(newState.phase, newState.phaseProgress);
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particleSystemRef.current?.draw(ctx);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas, isMobile]);

  // ────────────────────────────────────────────────────
  const isLoading = loadedCount < SCENES.length;
  const scene = SCENES[currentScene];

  // ── Canvas パネル（共通）──────────────────────────
  const canvasPanel = (
    <div className="philosophy-canvas-panel">
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      />
      {isLoading && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '1rem',
          pointerEvents: 'none',
        }}>
          <div style={{
            width: 120, height: 2, background: 'rgba(255,255,255,0.1)',
            borderRadius: 1, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(loadedCount / SCENES.length) * 100}%`,
              background: 'rgba(255,255,255,0.4)',
              transition: 'width 0.3s ease',
            }} />
          </div>
          <span style={{
            fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em', fontFamily: 'monospace',
          }}>
            {loadedCount} / {SCENES.length} loaded
          </span>
        </div>
      )}
    </div>
  );

  // ── シーンインジケーター（共通）──────────────────
  const sceneIndicators = (
    <div className="philosophy-indicators">
      {SCENES.map((_, i) => (
        <div
          key={i}
          className={`philosophy-indicator${i === currentScene ? ' is-active' : ''}`}
          style={{ width: i === currentScene ? '1.5rem' : '0.75rem' }}
        />
      ))}
    </div>
  );

  // ────────────────────────────────────────────────────
  // PC レイアウト（通常セクション + 2カラムグリッド）
  // ────────────────────────────────────────────────────
  if (!isMobile) {
    return (
      <section
        className="section--philosophy"
        id="philosophy"
        ref={sectionRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="container">
          <div className="philosophy-pc-grid">
            {/* 左: 仕事観テキスト（既存文章） */}
            <div className="philosophy-text-panel">
              <div className="philosophy-static-heading">
                <p className="philosophy-static-eyebrow">仕事観</p>
                <h2 className="philosophy-static-title">
                  <span style={{ display: 'block' }}>使われ続けるものを、</span>
                  <span style={{ display: 'block' }}>丁寧につくる。</span>
                </h2>
              </div>
              <div className="philosophy-static-body">
                <p>
                  ただ機能を増やすのではなく、実際の仕事や生活の中で使いやすい形にすることを大切にしています。
                </p>
                <p>
                  背景にある関係や流れを見ながら、必要なものを一つずつ整えていく。
                  その感覚を、設計や実装にも持ち込んでいます。
                </p>
              </div>
            </div>

            {/* 右: Canvas + シーン情報 */}
            <div className="philosophy-canvas-col">
              {canvasPanel}
              <div className="philosophy-pc-scene-info">
                <div className="philosophy-pc-scene-label">
                  <span className="philosophy-mobile-scene-num">{scene.label}</span>
                  <span className="philosophy-pc-scene-title">{scene.title}</span>
                </div>
                <p className="philosophy-mobile-scene-desc" style={{ textAlign: 'left', maxWidth: 'none' }}>
                  {scene.description}
                </p>
                {sceneIndicators}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ────────────────────────────────────────────────────
  // モバイル レイアウト（タイマー自動再生 + 横スワイプ）
  // ────────────────────────────────────────────────────
  return (
    <section
      className="section--philosophy"
      id="philosophy"
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="philosophy-sticky">
        {/* 静的哲学テキスト */}
        <div className="philosophy-text-panel">
          <div className="philosophy-static-heading">
            <p className="philosophy-static-eyebrow">仕事観</p>
            <h2 className="philosophy-static-title">
              <span style={{ display: 'block' }}>使われ続けるものを、</span>
              <span style={{ display: 'block' }}>丁寧につくる。</span>
            </h2>
          </div>
          <div className="philosophy-static-body">
            <p>
              ただ機能を増やすのではなく、実際の仕事や生活の中で使いやすい形にすることを大切にしています。
            </p>
            <p>
              背景にある関係や流れを見ながら、必要なものを一つずつ整えていく。
              その感覚を、設計や実装にも持ち込んでいます。
            </p>
          </div>
        </div>

        {/* Canvas */}
        {canvasPanel}

        {/* シーンラベル */}
        <div className="philosophy-mobile-label">
          <span className="philosophy-mobile-scene-num">{scene.label}</span>
          <span className="philosophy-mobile-scene-title">{scene.title}</span>
          <p className="philosophy-mobile-scene-desc">{scene.description}</p>
          {sceneIndicators}
        </div>
      </div>
    </section>
  );
}
