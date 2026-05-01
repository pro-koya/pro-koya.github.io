# Handoff: Miyabayasi Koya — Case Study Page (V2 / Split Frame)

## Overview

個人サイト内のケーススタディ詳細ページのデザインです。
代表として「**とれたべ**」を高解像度で設計しました。
他の3プロジェクト（Liftly / セッツマルシェ / 草八興業）も**同じテンプレート構造**で展開してください。

レイアウトは **V2 — Split Frame** 方針：
- 左半分：スティッキー画像が章ごとに切り替わる映画的なフレーム
- 右半分：本文がスクロール
- 1分で読み切れる **3セクション構成**（Problem / Approach / Credits）

サイト全体のデザイン基盤（Option A v2 / Athlete Editorial）の延長線上にあります。
**先に渡したサイト本体のハンドオフ（`design_handoff_personal_site/`）と合わせて読んでください。**
このREADMEはケーススタディページ固有の差分のみ詳述します。

---

## ⚠️ About the Design Files

このフォルダの HTML/CSS/JSX は **デザインリファレンス** です。
そのまま本番コードとしてコピーするためのものではありません。

サイト本体と同じ環境（**Next.js (App Router) + TypeScript + CSS Modules または Tailwind CSS** を推奨）で、
このデザインを再現してください。

リファレンスファイル：
- `Case Study — Toretabe.html` — V1 / V2 の両案をキャンバスに並べたエントリーポイント（**V2 を採用**）
- `option-a/case-study.css` — ケーススタディ固有のCSS（目次、スプリットレイアウト、メタ行、クレジット行）
- `option-a/case-study.jsx` — V1 / V2 両方のコンポーネント（**実装は V2 = `CSv2Toretabe` のみ参照**）
- `option-a/styles.v2.css` — サイト本体共通のCSS（**変更しないこと、サイト本体と共有**）
- `option-a/pages.v2.jsx` — サイト本体のNav / Footer / Frame等を提供（共通利用）
- `design-canvas.jsx` — キャンバス用（実装には不要）

ローカル確認は `Case Study — Toretabe.html` をブラウザで開いてください。
**V2（右側のセクション、Split Frame）を実装対象として参照してください。**

---

## Fidelity

**High-fidelity（ハイファイ）** です。色、タイポグラフィ、余白、章遷移アニメーションは最終仕様。
コピーは「とれたべ」用に書いた最終文。他プロジェクトは差し替え（後述）。

実装フェーズで差し替え／追加：

- **画像** — Hero / 各章のキービジュアル（4枚）。プレースホルダー（斜線パターン）から実写へ
- **「NEXT → LIFTLY」リンク先** — 隣のケーススタディの実URL
- **本文** — Liftly / セッツマルシェ / 草八興業 用のコピーは未執筆

---

## Layout — V2 Split Frame

### PC（>= 768px）

```
┌─────────── Nav (sticky, sub-section uses サイト本体のA2Nav) ──────────┐
│                                                                       │
├──────────────────────────────┬────────────────────────────────────────┤
│  LEFT (50%)                  │  RIGHT (50%)                           │
│  position: sticky; top: 0    │  自然に縦スクロール                       │
│  height: 100vh               │                                        │
│  4枚のフレームがクロスフェード   │                                        │
│  下端に4分割の進捗バー           │                                        │
│                              │  Section 0: Hero                       │
│                              │    eyebrow / 巨大タイトル / 副題 / メタ   │
│                              │    min-height: 100vh                   │
│                              ├────────────────────────────────────────┤
│  active=0: Hero画像（dark）   │  Section 1: Problem (data-cs-panel="1")│
│  active=1: Problem画像（green）│    eyebrow / 見出し / 本文              │
│  active=2: Approach画像        │    min-height: 100vh                   │
│  active=3: Credits画像（dark） │                                        │
│                              ├────────────────────────────────────────┤
│  各画像: 巨大ラベル（PROBLEM等）│  Section 2: Approach                   │
│  + メタ FRAME · 0X            │    min-height: 100vh                   │
│                              ├────────────────────────────────────────┤
│                              │  Section 3: Credits                    │
│                              │    + NEXT → LIFTLY リンク              │
│                              │    min-height: 100vh                   │
└──────────────────────────────┴────────────────────────────────────────┤
│                          Footer (サイト本体と共通)                       │
└───────────────────────────────────────────────────────────────────────┘
```

各右セクションに `data-cs-panel="0"〜"3"` を付与。
`IntersectionObserver` でビューポート中央付近にあるセクションを `active` として、
左画像のクロスフェード（`opacity` 0/1, `transition: opacity .9s ease`）と進捗バーの色を切り替える。

### SP（< 768px）

スプリットを諦めて **縦積み**：
- Hero（タイトル＋メタ行）
- Hero画像
- Problem見出し＋本文
- Problem画像（または Approach画像をその位置に）
- Approach見出し＋本文
- Approach画像
- Credits（番号付きリスト）
- Footer

SPでは左右並列のスティッキーは効かない（縦が長すぎる）ので、画像と本文を交互に置く構成に。

---

## Sections（コンテンツ仕様）

### Section 0 — Hero (`data-cs-panel="0"`)

右ペイン上部、`min-height: 100vh`、`padding: 70px 56px 80px`。

- **Eyebrow**: `Case Study — N°01`（`var(--f-display)`, 11px, letter-spacing 0.26em, uppercase, `--ink-3`）
- **巨大英語タイトル**: `TORETABE`（Archivo 800 / 144px / line-height 0.9 / letter-spacing -0.045em）
- **日本語タイトル**: `とれたべ`（Archivo 700 / 32px / letter-spacing -0.015em）
- **副題（oneline）**: `家庭菜園の収穫を、食べるところまでつなげるアプリ。`（17px / line-height 1.9 / `--ink-2`）
- **メタ行**: 4項目を 2×2 グリッドに（PCは横一列、ここでは縦長レイアウトの都合で 2×2）
  - YEAR: `2024`
  - ROLE: `Solo`
  - STATUS: `In Use`
  - DOMAIN: `Food / App`
- 最下: `SCROLL ↓ · 3 SECTIONS`（mono 10px / letter-spacing 0.22em）

### Section 1 — Problem (`data-cs-panel="1"`)

`min-height: 100vh`、`padding: 90px 56px`、上に `1px solid var(--line)` の境界線。

- Eyebrow: `01 — Problem`
- 見出し: `育てる楽しさと、食べる満足の間。`（Archivo 800 / 64px / line-height 1.0 / 「間。」だけイタリック）
- 本文: 

```
家庭菜園では、せっかく育てた野菜の食べきれない量が出たり、
いつ収穫したかを忘れて鮮度を落としてしまうことがある。
育てる楽しさと食べる満足の間に、見えないギャップがある。
```

（17px / line-height 2.0 / `--ink-2` / max-width 480px）

### Section 2 — Approach (`data-cs-panel="2"`)

同上のレイアウト。

- Eyebrow: `02 — Approach`
- 見出し: `判断は人に。道具は道具のままで。`（「道具のままで。」だけイタリック）
- 本文:

```
収穫した日と量を、写真とともに気軽に記録できるアプリ。
レシピの提案ではなく「今あるもの」と「いつ採れたか」を一覧で並べることに集中した。
判断は使う人にまかせる、シンプルな道具を目指した。
```

### Section 3 — Credits (`data-cs-panel="3"`)

- Eyebrow: `03 — Credits`
- 見出し: `つくった人と道具。`（Archivo 800 / 56px）
- クレジットリスト（`.credit-row` を3行）：
  - 01 / Concept / Design / Development / **Miyabayasi Koya**
  - 02 / Photography / **Self-shot · 自家菜園**
  - 03 / Stack / **React Native · Supabase**
- その下に **NEXT → LIFTLY** リンク（上下罫線、Archivo 800 / 40px）

---

## Sticky Image Frame (Left Pane)

各 `panel` に対応する 1枚絵を全画面表示し、active 切り替えで `opacity` クロスフェード（`.9s ease`）。

各フレームの中身：

| index | Label | Background | Caption |
|---|---|---|---|
| 0 | HERO | dark (`--ink`) | `HARVEST · MIDDAY` |
| 1 | PROBLEM | green (`--green`) | `BASKET · OVERFLOW` |
| 2 | APPROACH | (paper) | `UI · MAIN LOG SCREEN` |
| 3 | CREDITS | dark | `DESK · BUILD NOTES` |

各フレーム内の構成：

- 左上: `FRAME · 0X`（mono 10px）
- 右上: `HERO` / `PROBLEM` / `APPROACH` / `CREDITS`（mono 10px、ラベル）
- 中央〜下: 巨大ラベル（Archivo 800 / 88px / letter-spacing -0.035em / line-height 0.9）
- 巨大ラベル下: caption（mono 10px）

下端の進捗バー：
- 4つの 2px height ストリップ、`gap: 8px`
- `i <= active` のものは `--rust`、未到達は `rgba(244,241,234,0.25)`
- `transition: background .4s`

実画像差し替え時は、各フレームを背景全画面の `<img>` または `<video>` にし、その上にラベル・キャプションを白文字でオーバーレイ。

---

## Interactions

### Active section detection

```ts
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) setActive(Number(e.target.dataset.csPanel));
  });
}, { rootMargin: '-40% 0px -40% 0px' });
panels.forEach(p => observer.observe(p));
```

`rootMargin: '-40% 0px -40% 0px'` がポイント — ビューポート中央20%にセクションが入ったときだけ active 扱い。
これで「次のセクションが見え始めた瞬間」ではなく「中心に来た瞬間」で画像が切り替わる。

### Reveal animations

`.reveal` クラスを持つ見出し・本文は、ビューポートに入ったら `opacity 0 → 1`, `translateY(20px) → 0`、`transition .8s`。
サイト本体と同じパターン（`useScrollReveal()` フック）。

### Scroll experience

各右セクションに `min-height: 100vh` を持たせることで、
**1セクションがほぼ1スクリーンを占有 → ゆっくり読ませる映画的体験**になる。
中身が短いセクションでも縦余白で1画面分を確保するのが意図。

---

## Design Tokens（差分）

サイト本体（`option-a/styles.v2.css`）のトークンをそのまま使用。
ケーススタディ固有のクラスは `option-a/case-study.css` に分離：

### `.toc`（V1で使用、V2では未使用）

V2方針なので無視してOK。V1のサイドバー追従目次のスタイル。

### `.split` / `.split-img`

```css
.cs2 .split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}
.cs2 .split-img {
  position: sticky; top: 0; height: 100vh;
  background: var(--ink);
  overflow: hidden;
}
```

### `.meta-row`

4項目（または2×2）の横並びメタ表示。
- 上下 `1px solid var(--ink)` ボーダー
- 各セルに `padding: 18px 22px`、右に `1px solid var(--line)` 区切り
- ラベル（`.k`）: mono 10px / letter-spacing 0.22em / uppercase / `--ink-3`
- 値（`.v`）: Archivo 700 / 15px

### `.credit-row`

```
[番号 60px] [役割 1fr] [名前 1fr]
```
- 上罫線 `1px solid var(--line)`、最終行に下罫線
- `padding: 20px 0`、`gap: 24px`、`align-items: baseline`
- 番号 `.num`: mono 11px
- 役割 `.role`: mono 11px / uppercase / `--ink-2`
- 名前 `.name`: Archivo 700 / 18px

---

## Routing / URL Structure

Next.js App Router 想定：

```
app/
  works/
    page.tsx                    ← Worksインデックス（サイト本体に既出）
    [slug]/
      page.tsx                  ← ケーススタディ詳細（このデザイン）
```

`slug` は `toretabe`, `liftly`, `settsu-marche`, `sohachi`。

データソースは MDX または Headless CMS（microCMS / Newt / Sanity）が候補。
コンテンツモデル：

```ts
type CaseStudy = {
  slug: string;
  title: string;          // とれたべ
  en: string;             // TORETABE
  no: string;             // 01
  oneline: string;        // 副題（1行）
  problem: string;        // 課題（80–150字程度）
  approach: string;       // アプローチ（80–150字程度）
  meta: {
    year: string;         // 2024
    role: string;         // Solo / Lead Designer 等
    status: string;       // In Use / Archived / In Progress
    domain: string;       // Food / App / Local 等
  };
  credits: { role: string; name: string }[];
  images: {
    hero: string;
    problem: string;
    approach: string;
    credits: string;
  };
  next: { slug: string; en: string; no: string };  // 次のケース
};
```

---

## State Management

- `active`（number 0〜3）: `useState`
- IntersectionObserver: `useEffect`、cleanup で `disconnect`
- スクロールリビール: 同上

`framer-motion` を使うなら：
- 左フレームの切り替えは `<AnimatePresence>` + `motion.div` の `initial/animate/exit`
- 進捗バーは `motion.div` の `animate={{ background }}`
- リビールは `whileInView`

---

## Implementation Tips

1. **Server Component で OK**：本文は静的なので RSC で配信。`IntersectionObserver` まわりだけを Client Component に切り出す（`'use client'` のラッパーコンポーネント）
2. **画像最適化**：左フレームは画面の半分を占める高解像度画像 × 4枚。`next/image` で `priority` を Hero（index 0）に、残りは lazy。WebP 推奨
3. **アクセシビリティ**：
   - 各右セクションに `<section aria-labelledby="...">` を付ける
   - 巨大タイトルは `<h1>`、各章見出しは `<h2>`
   - 左フレームは装飾扱い → `aria-hidden="true"` でOK
4. **Reduced Motion**：`prefers-reduced-motion: reduce` のときは画像のクロスフェードと reveal を無効化（`transition: none`）
5. **印刷スタイル**：左フレームを非表示、右セクションを縦に流す `@media print` を入れておくと取材依頼やPDF配布で便利
6. **OGP**：各ケーススタディに固有OGP画像（Hero画像 + タイトル）を Vercel OG Image API で動的生成

---

## Files in this bundle

```
design_handoff_case_study/
├── README.md                              ← このファイル
├── Case Study — Toretabe.html             ← V1 / V2 両案のキャンバス（V2を採用）
├── design-canvas.jsx                      ← キャンバス用（実装不要）
└── option-a/
    ├── styles.v2.css                      ← サイト本体共通CSS（変更しない）
    ├── case-study.css                     ← ケーススタディ固有CSS
    ├── pages.v2.jsx                       ← サイト本体のNav/Footer/Frame等
    └── case-study.jsx                     ← V1 = CSv1Toretabe / V2 = CSv2Toretabe
                                             ★ 実装は CSv2Toretabe のみ参照
```

ローカル確認：
1. このフォルダをそのまま配置
2. `Case Study — Toretabe.html` をブラウザで開く
3. キャンバスに V1（参考）と V2（採用）が並ぶ
4. **V2 のアートボード**を見ながら実装

---

## Open Questions for Implementation

1. **コンテンツモデル**：MDX で書くか、CMS で管理するか
2. **他3ケースの本文**：Liftly / セッツマルシェ / 草八興業 の Problem / Approach を執筆する必要あり
3. **画像枚数**：1ケースあたり 4枚（Hero + Problem + Approach + Credits）で確定でよいか
4. **動画の利用**：左フレームを動画にするオプションはあるか（重くなるが訴求力UP）
5. **目次（TOC）の必要性**：3セクション構成なので不要と判断したが、ロングフォームにする可能性があるか
6. **「Next」ナビ**：常に時系列順か、関連プロジェクト順か、ランダムか
