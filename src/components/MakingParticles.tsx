'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ── Types ──────────────────────────────────────────────────

interface Point {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  r: number;
  g: number;
  b: number;
  targetR: number;
  targetG: number;
  targetB: number;
  size: number;
  opacity: number;
}

type Phase = 'gather' | 'hold' | 'scatter';

// ── Scene Config ───────────────────────────────────────────

const SCENES = [
  { svgUrl: '/work-style/scene1_plow.svg',    label: '01', title: '耕す',   desc: '課題を分解し、\n必要な土台を整理する。',       sampleStep: 3, maxPoints: 14000 },
  { svgUrl: '/work-style/scene2_plant.svg',    label: '02', title: '植える', desc: '優先順位を決め、\n小さく作り始める。',           sampleStep: 3, maxPoints: 15000 },
  { svgUrl: '/work-style/scene3_grow.svg',     label: '03', title: '育てる', desc: '使いながら直し、\n改善しやすい状態にする。',     sampleStep: 3, maxPoints: 15000 },
  { svgUrl: '/work-style/scene4_deliver.svg',  label: '04', title: '届ける', desc: '使う人に届く形で、\n運用へつなげる。',           sampleStep: 2, maxPoints: 15000 },
] as const;

const SCENE_COUNT = SCENES.length;
const SCENE_DURATION_MS = 7000;
const TOTAL_MS = SCENE_DURATION_MS * SCENE_COUNT;
const PARTICLE_COUNT = 16000;

// ── Phase ratios ───────────────────────────────────────────

const GATHER_RATIO = 0.15;
const SCATTER_RATIO = 0.20;

// ── Physics ────────────────────────────────────────────────

const SPRING_GATHER = 0.06;
const SPRING_HOLD = 0.04;
const DAMPING = 0.85;

const ORBITAL_FORCE = 0.9;
const JITTER = 0.10;
const MAX_ORBITAL_SPEED = 5.0;
const DAMPING_SCATTER = 0.96;

const SIZE_BASE = 1.8;
const SIZE_SCATTER = 1.6;
const SCATTER_OPACITY = 0.22;

// Warm-toned scatter color to match the site's earthy palette on dark bg
const SCATTER_COLOR = { r: 180, g: 168, b: 148 };

// ── Helpers ────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ── Point extraction ───────────────────────────────────────

function extractPointsFromSVG(
  svgUrl: string,
  sampleStep: number,
  maxPoints: number,
): Promise<Point[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const renderSize = 624;
      const canvas = document.createElement('canvas');
      canvas.width = renderSize;
      canvas.height = renderSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('No 2D context')); return; }
      ctx.drawImage(img, 0, 0, renderSize, renderSize);
      const { data } = ctx.getImageData(0, 0, renderSize, renderSize);
      const points: Point[] = [];
      for (let y = 0; y < renderSize; y += sampleStep) {
        for (let x = 0; x < renderSize; x += sampleStep) {
          const idx = (y * renderSize + x) * 4;
          if (data[idx + 3] >= 40) {
            points.push({ x: x / renderSize, y: y / renderSize, r: data[idx], g: data[idx + 1], b: data[idx + 2] });
          }
        }
      }
      // Fisher-Yates shuffle
      for (let i = points.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [points[i], points[j]] = [points[j], points[i]];
      }
      resolve(points.slice(0, maxPoints));
    };
    img.onerror = () => reject(new Error(`SVG load failed: ${svgUrl}`));
    img.src = svgUrl;
  });
}

// ── Particle system ────────────────────────────────────────

function createParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => {
    const x = Math.random() * w;
    const y = Math.random() * h;
    return {
      x, y, vx: 0, vy: 0, targetX: x, targetY: y,
      r: 180, g: 168, b: 148, targetR: 180, targetG: 168, targetB: 148,
      size: SIZE_BASE, opacity: 0,
    };
  });
}

function setTargets(particles: Particle[], points: Point[], cw: number, ch: number): void {
  const size = Math.min(cw, ch) * 0.82;
  const ox = (cw - size) / 2;
  const oy = (ch - size) / 2;
  for (let i = 0; i < particles.length; i++) {
    const pt = points[i % points.length];
    const p = particles[i];
    p.targetX = ox + pt.x * size;
    p.targetY = oy + pt.y * size;
    p.targetR = pt.r;
    p.targetG = pt.g;
    p.targetB = pt.b;
  }
}

function updateParticles(particles: Particle[], phase: Phase, progress: number, cw: number, ch: number): void {
  const cx = cw / 2;
  const cy = ch / 2;

  if (phase === 'gather') {
    const springScale = 0.2 + 0.8 * Math.min(1, progress / 0.25);
    const opacityRate = 0.03 + 0.05 * Math.min(1, progress / 0.3);
    for (const p of particles) {
      p.vx = (p.vx + (p.targetX - p.x) * SPRING_GATHER * springScale) * DAMPING;
      p.vy = (p.vy + (p.targetY - p.y) * SPRING_GATHER * springScale) * DAMPING;
      p.x += p.vx;
      p.y += p.vy;
      p.opacity = lerp(p.opacity, 0.88, opacityRate);
      p.size = lerp(p.size, SIZE_BASE, 0.1);
      p.r = lerp(p.r, p.targetR, 0.6);
      p.g = lerp(p.g, p.targetG, 0.6);
      p.b = lerp(p.b, p.targetB, 0.6);
    }
  } else if (phase === 'hold') {
    for (const p of particles) {
      p.vx = (p.vx + (p.targetX - p.x) * SPRING_HOLD) * DAMPING;
      p.vy = (p.vy + (p.targetY - p.y) * SPRING_HOLD) * DAMPING;
      p.x += p.vx;
      p.y += p.vy;
      p.opacity = lerp(p.opacity, 0.88, 0.05);
      p.size = SIZE_BASE;
      p.r = lerp(p.r, p.targetR, 0.5);
      p.g = lerp(p.g, p.targetG, 0.5);
      p.b = lerp(p.b, p.targetB, 0.5);
    }
  } else {
    const easeIn = Math.min(1, progress / 0.20);
    const easeOut = Math.max(0, 1 - Math.max(0, (progress - 0.70) / 0.30));
    const force = easeIn * easeOut;
    for (const p of particles) {
      const px = p.x - cx;
      const py = p.y - cy;
      const r = Math.sqrt(px * px + py * py) || 1;
      const tx = -py / r;
      const ty = px / r;
      p.vx += tx * ORBITAL_FORCE * force + (Math.random() - 0.5) * JITTER;
      p.vy += ty * ORBITAL_FORCE * force + (Math.random() - 0.5) * JITTER;
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > MAX_ORBITAL_SPEED) {
        const inv = MAX_ORBITAL_SPEED / speed;
        p.vx *= inv;
        p.vy *= inv;
      }
      p.vx *= DAMPING_SCATTER;
      p.vy *= DAMPING_SCATTER;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) * 0.5; }
      else if (p.x > cw) { p.x = cw; p.vx = -Math.abs(p.vx) * 0.5; }
      if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) * 0.5; }
      else if (p.y > ch) { p.y = ch; p.vy = -Math.abs(p.vy) * 0.5; }
      p.opacity = lerp(p.opacity, SCATTER_OPACITY, 0.04 + progress * 0.03);
      p.size = lerp(p.size, SIZE_SCATTER, 0.04);
      p.r = lerp(p.r, SCATTER_COLOR.r, 0.3);
      p.g = lerp(p.g, SCATTER_COLOR.g, 0.3);
      p.b = lerp(p.b, SCATTER_COLOR.b, 0.3);
    }
  }
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]): void {
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.r | 0},${p.g | 0},${p.b | 0},${p.opacity.toFixed(3)})`;
    ctx.fill();
  }
}

// ── Phase resolver ─────────────────────────────────────────

function resolvePhase(timeMs: number): { sceneIndex: number; phase: Phase; phaseProgress: number } {
  const looped = ((timeMs % TOTAL_MS) + TOTAL_MS) % TOTAL_MS;
  const sceneIndex = Math.min(SCENE_COUNT - 1, Math.floor(looped / SCENE_DURATION_MS));
  const sceneElapsed = (looped - sceneIndex * SCENE_DURATION_MS) / SCENE_DURATION_MS;

  const isLast = sceneIndex === SCENE_COUNT - 1;
  const gatherEnd = GATHER_RATIO;
  const holdEnd = isLast ? 1.0 : 1.0 - SCATTER_RATIO;

  if (sceneElapsed < gatherEnd) {
    return { sceneIndex, phase: 'gather', phaseProgress: sceneElapsed / gatherEnd };
  }
  if (sceneElapsed < holdEnd) {
    return { sceneIndex, phase: 'hold', phaseProgress: (sceneElapsed - gatherEnd) / (holdEnd - gatherEnd) };
  }
  return { sceneIndex, phase: 'scatter', phaseProgress: (sceneElapsed - holdEnd) / (1.0 - holdEnd) };
}

// ── Component ──────────────────────────────────────────────

export default function MakingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointCloudsRef = useRef<(Point[] | null)[]>(SCENES.map(() => null));
  const startTimeRef = useRef<number | null>(null);
  const prevSceneRef = useRef(-1);
  const rafRef = useRef(0);
  const visibleRef = useRef(false);
  // CSS pixel dimensions (not DPR-scaled) — used for physics & drawing
  const cssDimsRef = useRef({ w: 400, h: 400 });

  const [activeScene, setActiveScene] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Load all SVG point clouds
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      SCENES.map((s) => extractPointsFromSVG(s.svgUrl, s.sampleStep, s.maxPoints)),
    ).then((clouds) => {
      if (cancelled) return;
      pointCloudsRef.current = clouds;
      setLoaded(true);
    });
    return () => { cancelled = true; };
  }, []);

  // Animation loop
  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visibleRef.current) { rafRef.current = requestAnimationFrame(tick); return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const now = performance.now();
    if (startTimeRef.current === null) startTimeRef.current = now;
    const elapsed = now - startTimeRef.current;

    const { sceneIndex, phase, phaseProgress } = resolvePhase(elapsed);

    const { w: cw, h: ch } = cssDimsRef.current;

    // Scene changed → set new targets
    if (sceneIndex !== prevSceneRef.current) {
      const cloud = pointCloudsRef.current[sceneIndex];
      if (cloud) {
        setTargets(particlesRef.current, cloud, cw, ch);
      }
      prevSceneRef.current = sceneIndex;
      setActiveScene(sceneIndex);
    }

    updateParticles(particlesRef.current, phase, phaseProgress, cw, ch);

    ctx.clearRect(0, 0, cw, ch);
    drawParticles(ctx, particlesRef.current);

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // Setup canvas, particles, observer
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);

      // Store CSS pixel dimensions for physics/draw (not DPR-scaled)
      cssDimsRef.current = { w, h };

      if (particlesRef.current.length === 0) {
        particlesRef.current = createParticles(PARTICLE_COUNT, w, h);
      }
      const cloud = pointCloudsRef.current[prevSceneRef.current >= 0 ? prevSceneRef.current : 0];
      if (cloud) {
        setTargets(particlesRef.current, cloud, w, h);
      }
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && startTimeRef.current === null) {
          startTimeRef.current = performance.now();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(wrap);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, [loaded, tick]);

  const scene = SCENES[activeScene];

  return (
    <div className="making-particles-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} className="making-particles-canvas" />

      {/* Scene indicator overlay */}
      <div className="making-particles-overlay">
        <div className="making-particles-label">
          <span className="number" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.45)' }}>
            {scene.label}
          </span>
          <span style={{ fontFamily: 'var(--f-jp)', fontWeight: 700, fontSize: 22, color: 'var(--paper)', letterSpacing: '0.04em' }}>
            {scene.title}
          </span>
        </div>
        <p className="making-particles-desc">
          {scene.desc.split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </p>

        {/* Dot indicators */}
        <div className="making-particles-dots">
          {SCENES.map((_, i) => (
            <span
              key={i}
              className={`making-dot${i === activeScene ? ' active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
