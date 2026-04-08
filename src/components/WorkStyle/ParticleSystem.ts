import type { Particle, Point, AnimationPhase } from './types';

// ────────────────────────────────────────────────────────────
// チューニング定数
// ────────────────────────────────────────────────────────────

/** 集合フェーズのバネ強度 */
const SPRING_GATHER = 0.06;
/** ホールドフェーズのバネ強度 */
const SPRING_HOLD = 0.04;
/** gather/hold の減衰率 */
const DAMPING = 0.85;

/** 軌道フェーズの接線方向の力（時計回り回転の強さ） */
const ORBITAL_FORCE = 1;
/** 軌道フェーズのランダムジッター（ふわふわ感） */
const JITTER = 0.12;
/** 軌道フェーズの速度上限（px/frame） */
const MAX_ORBITAL_SPEED = 5.5;
/** 軌道フェーズの減衰（高めでふわっとした慣性）*/
const DAMPING_SCATTER = 0.96;

/** 粒子の基本サイズ（px）*/
const SIZE_BASE = 2.0;
/** 散乱中の粒子サイズ */
const SIZE_SCATTER = 2.0;
/** 散乱中の不透明度 */
const SCATTER_OPACITY = 0.32;

/** 集合フェーズでの色補間速度 */
const COLOR_LERP_GATHER = 0.6;
/** ホールドフェーズでの色補間速度 */
const COLOR_LERP_HOLD = 0.5;
/** 散乱中の色補間速度 */
const COLOR_LERP_SCATTER = 0.3;
/** 散乱中の中性色 */
const SCATTER_COLOR = { r: 160, g: 160, b: 180 };

// ────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ────────────────────────────────────────────────────────────

export class ParticleSystem {
  private particles: Particle[];
  private canvasW = 800;
  private canvasH = 800;

  constructor(count: number) {
    this.particles = Array.from({ length: count }, () =>
      this.createParticle(800, 800),
    );
  }

  private createParticle(w: number, h: number): Particle {
    const x = Math.random() * w;
    const y = Math.random() * h;
    return {
      x,
      y,
      vx: 0,
      vy: 0,
      targetX: x,
      targetY: y,
      scatterX: x,
      scatterY: y,
      r: 150,
      g: 150,
      b: 160,
      targetR: 150,
      targetG: 150,
      targetB: 160,
      size: SIZE_BASE,
      opacity: 0,
    };
  }

  /** Canvas サイズ変更時に呼ぶ */
  setCanvas(w: number, h: number): void {
    this.canvasW = w;
    this.canvasH = h;
  }

  /**
   * シーン切り替え時に呼ぶ。
   * 正規化された点群（0〜1）から gather の初期値を設定する。
   */
  setTargets(points: Point[], canvasW: number, canvasH: number): void {
    this.canvasW = canvasW;
    this.canvasH = canvasH;

    const size = Math.min(canvasW, canvasH) * 0.82;
    const offsetX = (canvasW - size) / 2;
    const offsetY = (canvasH - size) / 2;

    const count = this.particles.length;

    for (let i = 0; i < count; i++) {
      const pt = points[i % points.length];
      const p = this.particles[i];

      p.targetX = offsetX + pt.x * size;
      p.targetY = offsetY + pt.y * size;
      p.targetR = pt.r;
      p.targetG = pt.g;
      p.targetB = pt.b;

      // scatter 時の基点（現在位置をスナップショット）
      p.scatterX = p.x;
      p.scatterY = p.y;
    }
  }

  /**
   * フレームごとに呼ぶ物理更新。
   * phase と phaseProgress（0〜1）だけで挙動が決まる。
   */
  update(phase: AnimationPhase, phaseProgress: number): void {
    const { particles, canvasW, canvasH } = this;
    const cx = canvasW / 2;
    const cy = canvasH / 2;

    if (phase === 'gather') {
      // フェーズ冒頭だけバネを弱く（20%→100%）して scatter からの慣性を自然に吸収する
      const springScale = 0.2 + 0.8 * Math.min(1, phaseProgress / 0.25);
      // opacity も最初はゆっくり上げる（まだ散らばっている間は薄いまま）
      const opacityRate = 0.03 + 0.05 * Math.min(1, phaseProgress / 0.3);

      for (const p of particles) {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx = (p.vx + dx * SPRING_GATHER * springScale) * DAMPING;
        p.vy = (p.vy + dy * SPRING_GATHER * springScale) * DAMPING;
        p.x += p.vx;
        p.y += p.vy;
        p.opacity = lerp(p.opacity, 0.88, opacityRate);
        p.size = lerp(p.size, SIZE_BASE, 0.1);
        p.r = lerp(p.r, p.targetR, COLOR_LERP_GATHER);
        p.g = lerp(p.g, p.targetG, COLOR_LERP_GATHER);
        p.b = lerp(p.b, p.targetB, COLOR_LERP_GATHER);
      }
    } else if (phase === 'hold') {
      for (const p of particles) {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx = (p.vx + dx * SPRING_HOLD) * DAMPING;
        p.vy = (p.vy + dy * SPRING_HOLD) * DAMPING;
        p.x += p.vx;
        p.y += p.vy;
        p.opacity = lerp(p.opacity, 0.88, 0.05);
        p.size = SIZE_BASE;
        p.r = lerp(p.r, p.targetR, COLOR_LERP_HOLD);
        p.g = lerp(p.g, p.targetG, COLOR_LERP_HOLD);
        p.b = lerp(p.b, p.targetB, COLOR_LERP_HOLD);
      }
    } else {
      // scatter: 時計回り円形軌道
      // ベル曲線で加速・減速（開始20%で立ち上がり、終了30%で静止に戻る）
      const easeIn  = Math.min(1, phaseProgress / 0.20);
      const easeOut = Math.max(0, 1 - Math.max(0, (phaseProgress - 0.70) / 0.30));
      const forceFactor = easeIn * easeOut;

      for (const p of particles) {
        // 中心からの相対位置
        const px = p.x - cx;
        const py = p.y - cy;
        const r = Math.sqrt(px * px + py * py) || 1;

        // スクリーン座標系で時計回りになる接線方向ベクトル
        // top(0,-r) → right(1,0), right(r,0) → bottom(0,1)
        const tx = -py / r;
        const ty =  px / r;

        // 接線力 + ランダムジッター（ふわふわ感）
        p.vx += tx * ORBITAL_FORCE * forceFactor + (Math.random() - 0.5) * JITTER;
        p.vy += ty * ORBITAL_FORCE * forceFactor + (Math.random() - 0.5) * JITTER;

        // 速度上限
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_ORBITAL_SPEED) {
          const inv = MAX_ORBITAL_SPEED / speed;
          p.vx *= inv;
          p.vy *= inv;
        }

        // 高い減衰でふわっとした浮遊感
        p.vx *= DAMPING_SCATTER;
        p.vy *= DAMPING_SCATTER;

        p.x += p.vx;
        p.y += p.vy;

        // 画面端でソフトリフレクション
        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) * 0.5; }
        else if (p.x > canvasW) { p.x = canvasW; p.vx = -Math.abs(p.vx) * 0.5; }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) * 0.5; }
        else if (p.y > canvasH) { p.y = canvasH; p.vy = -Math.abs(p.vy) * 0.5; }

        p.opacity = lerp(p.opacity, SCATTER_OPACITY, 0.04 + phaseProgress * 0.03);
        p.size = lerp(p.size, SIZE_SCATTER, 0.04);
        p.r = lerp(p.r, SCATTER_COLOR.r, COLOR_LERP_SCATTER);
        p.g = lerp(p.g, SCATTER_COLOR.g, COLOR_LERP_SCATTER);
        p.b = lerp(p.b, SCATTER_COLOR.b, COLOR_LERP_SCATTER);
      }
    }
  }

  /** 全粒子を Canvas に描画する */
  draw(ctx: CanvasRenderingContext2D): void {
    const { particles } = this;
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.r | 0},${p.g | 0},${p.b | 0},${p.opacity.toFixed(3)})`;
      ctx.fill();
    }
  }

  get count(): number {
    return this.particles.length;
  }
}
