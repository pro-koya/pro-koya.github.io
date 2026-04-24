import type { SceneConfig } from './types';

// ────────────────────────────────────────────────────────────
// シーン定義
// ────────────────────────────────────────────────────────────
export const SCENES: SceneConfig[] = [
  {
    svgUrl: '/work-style/scene1_plow.svg',
    label: '01',
    title: '耕す',
    description:
      '課題を分解し、\n必要な土台を整理する。',
    sampleStep: 3,
    maxPoints: 17000,
  },
  {
    svgUrl: '/work-style/scene2_plant.svg',
    label: '02',
    title: '植える',
    description:
      '優先順位を決め、\n小さく作り始める。',
    sampleStep: 3,
    maxPoints: 18000,
  },
  {
    svgUrl: '/work-style/scene3_grow.svg',
    label: '03',
    title: '育てる',
    description:
      '使いながら直し、\n改善しやすい状態にする。',
    sampleStep: 3,   // 他より密に（粒子多め）
    maxPoints: 18000,
  },
  {
    svgUrl: '/work-style/scene4_deliver.svg',
    label: '04',
    title: '届ける',
    description:
      '使う人に届く形で、\n運用へつなげる。',
    sampleStep: 2,
    maxPoints: 18000,
  },
];

// ────────────────────────────────────────────────────────────
// スクロール進行率のシーン区切り
// 総スクロール量を 1 として、各シーンが占める範囲を定義
// ────────────────────────────────────────────────────────────

/** 各シーンのスクロール開始点（0〜1）*/
export const SCENE_BREAKPOINTS = [0, 0.25, 0.5, 0.75, 1.0];

/**
 * 各シーン内でのフェーズ割合
 *
 * gather: 粒子がシーン形状へ集まる
 * hold  : 形状を維持（ユーザーがテキストを読む時間）
 * scatter: 粒子が散る（次シーンへの準備）
 *
 * gather + hold + scatter = 1.0
 * 最終シーン（Scene4）は scatter なし
 */
export const PHASE_RATIOS = {
  gather: 0.15,
  scatter: 0.20,
  // hold = 1 - gather - scatter = 0.65
} as const;
