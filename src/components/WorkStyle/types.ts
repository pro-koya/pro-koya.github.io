/** 正規化された点（x,y は 0〜1）と pixel color */
export interface Point {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
}

/** 各粒子の状態 */
export interface Particle {
  // 現在位置（canvas pixel 座標）
  x: number;
  y: number;
  // 速度
  vx: number;
  vy: number;
  // 集合先（シーン図形の target）
  targetX: number;
  targetY: number;
  // 散乱フェーズ用（予備領域）
  scatterX: number;
  scatterY: number;
  // 現在色
  r: number;
  g: number;
  b: number;
  // ターゲット色（シーンの pixel color）
  targetR: number;
  targetG: number;
  targetB: number;
  // 描画
  size: number;
  opacity: number;
}

export type AnimationPhase = 'gather' | 'hold' | 'scatter';

export interface SceneState {
  sceneIndex: number;
  phase: AnimationPhase;
  /** 現在フェーズ内の進行率 0〜1 */
  phaseProgress: number;
}

export interface SceneConfig {
  svgUrl: string;
  label: string;
  title: string;
  description: string;
  /** 点群抽出時のサンプリング間隔（px） */
  sampleStep: number;
  /** 最大点数 */
  maxPoints: number;
}
