# WorkStyle パーティクルアニメーション — 調整ガイド

## ファイル構成

```
WorkStyle/
  types.ts              型定義
  sceneConfig.ts        シーンテキスト・スクロール区切り
  extractPoints.ts      SVG → 点群抽出ユーティリティ
  ParticleSystem.ts     粒子の物理・描画ロジック
  WorkStyleSection.tsx  React コンポーネント（GSAP統合）
```

---

## 粒子数を変える

`WorkStyleSection.tsx` の先頭にある定数:

```ts
const PARTICLE_COUNT = 3500;  // ← ここを変える
```

- 増やす → 密度アップ（2000〜6000 が現実的な範囲）
- 減らす → 軽くなる（スマホ対応なら 1500 前後）

---

## 集まる速さ・散る速さを変える

`ParticleSystem.ts` の定数群:

```ts
const SPRING_GATHER  = 0.10;  // 集合バネ強度。増やすと速く集まる
const SPRING_HOLD    = 0.06;  // ホールド中のバネ（弱め）
const DAMPING        = 0.78;  // 減衰（1に近いほど慣性大きい・ゆっくり）

const SPRING_SCATTER = 0.04;  // 散乱先へ引っ張る力
const DAMPING_SCATTER= 0.90;  // 散乱の減衰（大きいほど遠くまで漂う）
```

**速くしたい場合**: SPRING_GATHER を 0.15〜0.20 に上げ、DAMPING を 0.72 前後に下げる。
**ゆっくりしたい場合**: SPRING_GATHER を 0.06 に下げ、DAMPING を 0.85 前後に上げる。

---

## 拡散量（散る距離）を変える

```ts
const SCATTER_SPREAD = 1.2;  // Canvas 短辺に対する倍率。大きいほど遠くへ飛ぶ
const SCATTER_ANGLE_JITTER = 1.0;  // 散乱方向のランダム角度（ラジアン）
```

- `SCATTER_SPREAD = 0.8` → 画面内に留まりやすい
- `SCATTER_SPREAD = 2.0` → 画面外にバーッと飛ぶ（派手な演出）

---

## 各シーンの粒子密度を変える

`sceneConfig.ts` の `SCENES` 配列内:

```ts
{
  sampleStep: 5,    // ← 小さいほど点が多い（3〜8 が目安）
  maxPoints: 3000,  // ← 最大点数の上限
}
```

- Scene3（育てる）は他シーンより sampleStep を 1 小さく設定（デフォルト）して少し粒子を増やしている

---

## シーン1枚のスクロール長さを変える

`WorkStyleSection.tsx`:

```ts
const SECTION_HEIGHT_VH = 400;  // 全体の高さ（100vh × 4 = 4シーン分）
```

`sceneConfig.ts`:

```ts
export const PHASE_RATIOS = {
  gather: 0.15,   // シーン内の 15% を集合アニメに使う
  scatter: 0.20,  // シーン内の 20% を散乱アニメに使う
  // hold = 1 - 0.15 - 0.20 = 0.65（ユーザーがテキストを読む時間）
};
```

- `gather` を増やす → 集まるまでの時間が長くなる（ゆったり）
- `scatter` を増やす → 散るアニメが長くなる（ドラマチック）
- `SECTION_HEIGHT_VH` を増やす → 全体がよりゆっくりになる

---

## 粒子サイズを変える

```ts
const SIZE_BASE    = 1.4;  // 集合・ホールド時の半径（px）
const SIZE_SCATTER = 2.0;  // 散乱中の半径（px）
```

---

## 点群抽出の解像度を変える

`extractPoints.ts` の `ExtractOptions`:

```ts
renderSize = 512  // SVGをCanvas描画するサイズ。大きいほど精細だが重い
```

`sceneConfig.ts` の `sampleStep`:

- `sampleStep: 4` → 512/4 = 128px グリッド → 最大 128² ≒ 16000 点から maxPoints を抽出
- `sampleStep: 8` → 64px グリッド → 粗め

---

## 使い方

```tsx
// Next.js のページコンポーネントに追加
import { WorkStyleSection } from '@/components/WorkStyle';

export default function AboutPage() {
  return (
    <main>
      {/* ... 他のセクション ... */}
      <WorkStyleSection />
    </main>
  );
}
```

### 必要な依存パッケージ

```bash
npm install gsap
```

GSAP はすでに導入済みなら不要。
`ScrollTrigger` は gsap のサブモジュールなので別途インストール不要。

### SVG の配置

```
public/
  work-style/
    scene1_plow.svg     ← docs/assets/work-style/source/ からコピー済み
    scene2_plant.svg
    scene3_grow.svg
    scene4_deliver.svg
```

---

## 既知の制限と対応策

| 問題 | 対応 |
|------|------|
| SVG ロード中は粒子が散らばったまま | `loadedCount < SCENES.length` のローディングUIを表示済み |
| 4MB × 4 = 16MB のSVGをCanvasに描画 | 初回ロードのみ。描画後はピクセルデータをメモリに保持しない |
| 後ろにスクロールしたとき挙動が不自然 | spring物理なので逆スクロールは完全再現しない（ポートフォリオ用途では許容範囲） |
| スマホで重い | `PARTICLE_COUNT` を 1500 に、`sampleStep` を +2 して軽量化 |
