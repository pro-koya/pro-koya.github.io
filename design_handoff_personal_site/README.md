# Handoff: Miyabayasi Koya — Personal Site (Option A v2 / Athlete Editorial)

## Overview

Miyabayasi Koya（みやばやし こうや）さんの個人サイトのデザイン一式です。
コンセプトは **「よく動き、よく食べ、よくつくる」**。
運動・農業・発信・ものづくりという4つの実践を軸にした、エディトリアル寄りのスポーツブランド調デザインです。

ページ構成：
- Home
- About
- Works
- Journal
- Contact

PC（1280px幅）とSP（390px幅）両方のモックを含みます。

---

## ⚠️ About the Design Files

このフォルダに含まれる **HTML/CSS/JSX ファイルは「デザインリファレンス」** です。
プロトタイプとして見た目と挙動を示すために HTML + React (Babel inline) で書かれていますが、
**そのまま本番コードとしてコピーする目的のものではありません。**

本番実装にあたっては、対象コードベースの既存環境（Next.js / Astro / Nuxt / Vite + React など）と
そのプロジェクトで採用されている規約・スタイリング手法（CSS Modules / Tailwind / vanilla-extract / styled-components など）に従って、
**このデザインを再現してください。**

まだフレームワークが決まっていない場合は、以下を推奨します：
- **Next.js (App Router) + TypeScript + CSS Modules または Tailwind CSS**
  - 静的ページが中心なので SSG / ISR が向いている
  - `next/font` で Google Fonts を最適化できる
  - `next/image` で画像最適化
- アニメーションは **Framer Motion** または素の `IntersectionObserver`
- アイコンは不要（テキストとレイアウトで成立）

リファレンスファイル：
- `Option A v2 — Athlete Editorial.html` — 全ページを並べたキャンバスのエントリーポイント
- `option-a/styles.v2.css` — 全ページ共通のCSS（変数・タイポ・コンポーネント）
- `option-a/pages.v2.jsx` — 全ページのReactコンポーネント（Home / About / Works / Journal / Contact）
- `design-canvas.jsx` — キャンバス表示用（実装には不要）

ローカルで確認したい場合は、`Option A v2 — Athlete Editorial.html` をブラウザで開いてください。

---

## Fidelity

**High-fidelity（ハイファイ）** です。
色・タイポグラフィ・余白・アニメーションは最終仕様のつもりで作成しています。
コピー（本文）も実際に使う想定の文章を入れているので、原則そのまま使ってください。

ただし以下は実装フェーズで差し替え／追加してください：

- **画像** — 全てプレースホルダー（斜線パターン）です。実写の写真に差し替え
- **SNSリンク** — Instagram / X / note / GitHub の実URL
- **Worksの実コンテンツ** — 詳細ページや実画像
- **Contactフォームの送信先** — メール送信処理（Resend / SendGrid / Formspree など）

---

## Design System / Tokens

`option-a/styles.v2.css` の `:root` に全トークンが定義されています。

### Colors

| Token | Hex | 用途 |
|---|---|---|
| `--ink` | `#14130f` | メインの黒（テキスト・反転背景） |
| `--ink-2` | `#2b2926` | 本文テキスト（やや薄い） |
| `--ink-3` | `#6b6863` | サブテキスト、メタ |
| `--ink-4` | `#9a958c` | 最も薄いテキスト |
| `--paper` | `#f4f1ea` | メイン背景（生成り） |
| `--paper-2` | `#e8e3d8` | セカンダリ背景 |
| `--paper-3` | `#ddd6c5` | 第三背景 |
| `--line` | `rgba(20,19,15,0.14)` | 罫線（薄） |
| `--line-2` | `rgba(20,19,15,0.06)` | 罫線（極薄） |
| `--line-strong` | `rgba(20,19,15,0.4)` | 罫線（強） |
| `--green` | `#233529` | 深い森緑（アクセント・農業セクション） |
| `--green-2` | `#3a4f3e` | 緑系セカンダリ |
| `--rust` | `#a94a2c` | 錆色（メインアクセント） |
| `--rust-2` | `#c25b35` | 錆色ハイライト |
| `--olive` | `#6e6c3a` | オリーブ |
| `--ochre` | `#c47a3d` | オーカー |
| `--beige` | `#cbb89a` | ベージュ |

**運用ルール：**
- 通常背景は `--paper`、テキストは `--ink`
- 反転セクション（フッター、HumanLoop、Aboutの「Making」セクション）は背景 `--ink`、テキスト `--paper`
- アクセントカラーは `--rust` のみを使用（リンクのhover、ボタン塗り、強調記号、アニメ要素）
- `--green` は HumanLoop 内 GROW フェーズや一部Worksカードの背景にだけ使用

### Typography

| Family | Variable | 用途 | Weight |
|---|---|---|---|
| **Archivo** | `--f-display` | 見出し・タイトル・ナビ・ボタン・大文字英語 | 500/600/700/800（italic も使用） |
| **Inter** | `--f-sans` | 補助的な英文サンス（あまり使っていない） | 400/500/600 |
| **JetBrains Mono** | `--f-mono` | 番号、メタ情報、ラベル、数字 | 400/500 |
| **Noto Sans JP** | `--f-jp` | 日本語本文 | 400/500/600/700 |

Google Fonts から読み込んでいます。`next/font/google` で同じファミリー・ウェイトを指定してください。

**スケール（PC基準・主要なものだけ）：**

| 用途 | サイズ | 例 |
|---|---|---|
| Hero display | 184px / line-height 0.92 / letter-spacing -0.025em | "MOVE. EAT. MAKE." |
| Page title (About/Works/Journal/Contact) | 240px | "ABOUT" |
| Section display | 64–112px | "AI時代に、..." |
| Subsection | 32–60px | サブ見出し |
| Body | 14–16px / line-height 1.95–2.05 | 本文 |
| Eyebrow | 11px / letter-spacing 0.26em / uppercase | "01 — Concept" |
| Mono meta | 9–11px / letter-spacing 0.18–0.24em / uppercase | "N°001 / KOYA" |

SPでは1段〜2段階小さく（`option-a/pages.v2.jsx` の `sp ? X : Y` パターンを参照）。

**和欧混植：**
- 英文は Archivo（italic 多用）、日本語は Noto Sans JP
- `font-feature-settings: "palt"` を全体に適用してプロポーショナルメトリクスを有効化
- 見出しの一部単語をイタリック（`<span class="it">MAKE.</span>` のように）にしてリズムを作る

### Spacing

明示的なトークンは持たず、ピクセル直書きですが、ベースは **8px グリッド**：
- セクション縦間隔: PC `160px`、SP `70px`
- セクション内ブロック間: `24–60px`
- カード内パディング: PC `36–56px`、SP `22–24px`
- ナビ高: PC `padding 18px 40px`、SP `padding 14px 18px`

### Borders / Radius / Shadows

- **角丸はゼロ。** 全要素 sharp corner（エディトリアル感の中核）
- 影もほぼ使わない（ナビ背景の `backdrop-filter: blur(12px)` 程度）
- 罫線が主役。`1px solid var(--ink)` / `1px solid var(--line)` を多用

### Buttons

```css
.btn {
  padding: 14px 22px;
  border: 1px solid var(--ink);
  background: transparent;
  color: var(--ink);
  font-family: Archivo;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.btn:hover { background: var(--ink); color: var(--paper); }
.btn-fill { background: var(--ink); color: var(--paper); }
.btn-fill:hover { background: var(--rust); border-color: var(--rust); }
```

矢印は `<span class="arrow"></span>` で `1px width line + rotated 7px square` を組んで描画しています。

### Placeholder Image (`.ph`)

実画像が入る前のプレースホルダー。実装時はこの構造の `<div>` を `<Image>` / `<img>` に差し替え：

```html
<div class="ph">                  <!-- 通常（生成り背景） -->
<div class="ph dark">             <!-- ダーク（黒背景） -->
<div class="ph green">            <!-- 緑（深森緑背景） -->
```

斜線パターン + 角に `corner` ラベル + 下部にメタテキスト2点。

---

## Screens / Views

### 共通

#### Nav（`A2Nav`）

- `position: sticky; top: 0` で吊るし
- 背景 `color-mix(in oklab, var(--paper) 78%, transparent)` + `backdrop-filter: blur(12px)`
- 下罫線 `1px solid var(--line)`
- 左：ブランド（黒丸 + "MIYABAYASI KOYA"）+ メタ "N°001 / Personal Field"
- 右：4リンク（About / Works / Journal / Contact）— 各リンクに `01–04` の番号付き
- アクティブ判定：URLパスから判定。アクティブ時は下に `2px` 黒帯
- SP では右リンクをハンバーガー（`<span> × 3`）に置き換え

#### Footer（`A2Footer`）

- 背景 `--ink`、文字 `--paper`、上下 `padding 80px 40px 30px`
- 巨大ディスプレイ "MOVE. EAT. MAKE."（96px、PC）— **スクロール量に応じて X方向に最大 -80px パララックス移動**
- 日本語コピー「よく動き、よく食べ、よくつくる。」
- 下部：ブランド名 + SNSリンク列（Instagram / X / note / GitHub / Contact）
- 右下メタ：`© 2026 — KOYA  /  NO.001 / VOL.A`

#### Ticker（`A2Ticker`）

- 横スクロール文字列（`@keyframes opa2-tick`、38秒/サイクル、infinite）
- 背景 `--ink`、文字 `--paper`、Archivo 800 / 14px / letter-spacing 0.24em / uppercase
- アイテム間のセパレータは `--rust` の小さな丸（`6×6px`）
- 内容: `MOVE / GROW / SHARE / BUILD / よく動き、よく食べ、よくつくる / EST. KOYA / PERSONAL FIELD / NO.001`
- 実装：同じ配列を2回連結し、`translateX(0 → -50%)` でループ

---

### 1. Home

縦に積むセクション順：

1. **Hero**（`HeroV2`）
   - Eyebrow "Vol.01 · Personal Field" / 右上メタ "2026 / SPRING"
   - Hero display "MOVE. / EAT. / *MAKE.*"（184px、3行、3行目だけイタリック）
   - **スクロール量に応じて X方向 `-y * 0.05` パララックス**
   - 下に2カラム：左に本文 + ブランドコピー、右にCTAボタン2つ（"Journalを見る" / "Worksを見る"）
   - その下に画像3枚グリッド（左7fr：1枚 / 右5fr：2枚縦並び）
   - 最下："SCROLL ↓" / "4 FIELDS · 4 PRACTICES · 1 PERSON"

2. **HumanLoop（人間感アニメーション）**（`HumanLoop2`）— **ページのハイライト**
   - 黒背景の高さ620px（SPは480px）のフルブリードセクション
   - 4フェーズが14秒で1周（各3.5秒）：
     - **MOVE**：横一直線のドット28個を左→右に走るランナー（赤い円が脈動、通過済みドットは赤、未通過は薄白）+ "0KM / 2.5KM / 5KM / 7.5KM" のマイル表記
     - **GROW**：中央から芽が垂直に伸び、葉が左右に展開（local > 0.35 で左葉、> 0.55 で右葉）+ 左右に小さなサブ芽 + 下に "SOIL · D+nn"
     - **SHARE**：中央から同心円の信号波が5本、位相をずらして外側へ消えていく
     - **BUILD**：7個のブロックが左下から積み上がる。最後のブロックだけ赤
   - 各フェーズで巨大タイポ "MOVE / GROW / SHARE / BUILD"（360px）がクロスフェード
   - 上：`FIELD LOOP / 01 OF 04` / `NO.001 / KOYA`
   - 左下：日本語サブラベル（"走る・鍛える" など）+ 詩的なコピー
   - 下端：4タブ進捗バー（アクティブタブ下に `--rust` の進捗線）
   - 背景に薄い10×10グリッド線（opacity 0.18）
   - 実装：`useState + requestAnimationFrame` で `t` を秒で更新、`Math.floor((t % 14) / 3.5)` でフェーズ判定

3. **Concept**（`ConceptV2`）
   - 5fr / 7fr の2カラム
   - 左：eyebrow "02 — Concept" + 大見出し "AI時代に、身体でわかることを大事にしたい。"
   - 右：本文段落 + 引用ブロック（左に `--rust` の `2px` ボーダー、Archivo 600）

4. **Ticker** — 上記参照

5. **Journal Section**（`JournalSectionV2`）
   - 8fr / 4fr / 4fr の3カラム（タイル風 `gap: 1px; background: var(--ink)` で罫線を表現）
   - メインタイル：Instagram（黒背景・"Instagram" 168px・赤の "VIEW @KOYA →"）
   - サブタイル2つ：X / note（生成り背景・56px見出し・黒の "VIEW →"）

6. **Works Section**（`WorksSectionV2`）
   - 2×2 グリッド（PC）/ 1列（SP）
   - カード4枚：とれたべ / Liftly / セッツマルシェ / 草八興業株式会社
   - 各カードは `<a>` で全体クリッカブル、画像エリア（プレースホルダー、4:3）+ 下に番号 + プロジェクト英語名 + 説明
   - 1番目：通常 / 2番目：dark / 3番目：green / 4番目：通常 — でリズムを作る

7. **Contact Preview**（`ContactPreviewV2`）
   - 背景 `--paper-2`
   - 6fr / 6fr の2カラム
   - 左：見出し "関心が、重なるなら。" + 本文
   - 右：CTAボタン "相談する"（`btn-fill`）+ SNSアイコン省略形 "IG / X / NOTE / GH"

8. **Footer** — 上記参照

---

### 2. About

1. **Hero**：Eyebrow "About — N°001" + 巨大 "ABOUT"（240px）
2. **Portrait + コピー**：4fr / 6fr — 左にポートレート画像（4:5）、右に "よく動き、よく食べ、よくつくる。"
3. **Concept**：見出し "実感のある生き方を大事にしたい。" + 5項目リスト（番号付き、罫線で区切る）+ 引用ブロック（左 `--rust` ボーダー）
4. **Activities**：3行（MOVE / GROW / SHARE）。各行 `60px / 220px / 1fr / 80px` の4カラムで `番号 / 英語名+和名 / 本文 / READ →`
5. **Making**（黒背景セクション）：見出し "たまに、*仕組みにする。*"（112px）+ 2カラム本文
6. **Profile**：5fr / 7fr — 左に名前 "Miyabayasi *Koya*"、右に略歴 + Interest タグ群（7個、`1px solid` の四角で囲む）
7. **Footer**

---

### 3. Works

1. **Hero**：Eyebrow + "WORKS"（240px）+ "04 PROJECTS" メタ + 4fr/8fr で見出し+説明
2. **Works List**：4プロジェクトを縦リストで並べる
   - 各行 `60px / 1fr / 1fr / 100px` のグリッド
   - `番号 / 英語名(64px) + 和名 / 説明 / タグ + 年`
   - hover で背景 `--paper-2`
   - 上下罫線 `1px solid var(--ink)` で区切る
3. **Footer**

---

### 4. Journal

1. **Hero**：Eyebrow + "JOURNAL"（240px）+ 副見出し "動いたこと、育てたこと、考えたこと。"
2. **Instagram フィーチャー**（黒背景）
   - 1fr / 1fr の2カラム
   - 左：Eyebrow "Primary · 主導線" + "Instagram"（168px）+ 説明 + ボタン
   - 右：3×3 グリッド（9枚のIG投稿プレースホルダー、`gap: 6px`、`aspect-ratio: 1/1`）
3. **X / note カード**：1fr / 1fr の2カラム、各カード `1px solid` ボーダー、`min-height: 300px`
4. **Footer**

---

### 5. Contact

1. **Hero**：Eyebrow + "CONTACT"（240px）+ "関心が重なる相談があれば。"（48px）+ 説明
2. **Form**：単一カラム最大760px幅
   - 各フィールドは `番号 + ラベル / 入力欄 / 下罫線` の構造（`borderBottom: 1px solid var(--ink)`、border なしの input）
   - 01: お名前（text）
   - 02: メールアドレス（email）
   - 03: 相談内容（5タグ：制作・開発の相談 / Webサービス・アプリの相談 / 業務システムの相談 / 協業・取材 / その他、ピル選択、選択中は黒背景白文字）
   - 04: メッセージ（textarea, rows=6）
   - 送信ボタン（`btn-fill`、`padding: 20px 32px`）+ 左に "DM OK — IG / X / NOTE / GH"
3. **Footer**

---

## Interactions & Behavior

### Scroll-driven

- **Reveal アニメーション**：`.reveal` クラスを持つ要素は初期 `opacity: 0; transform: translateY(24px)`。`IntersectionObserver` でビューポートに入ったら `.in` クラス付与で `opacity: 1; transform: none` に。`transition: opacity .9s ease, transform .9s cubic-bezier(.2,.7,.3,1)`。`delay-1 / delay-2 / delay-3` で `0.08s / 0.16s / 0.24s` のスタガー
- **Hero タイトル**：`translateX(${-scrollY * 0.05}px)` で軽いパララックス
- **Footer 巨大タイポ**：`translateX(${-Math.min(80, scrollY * 0.04)}px)` で右→左に流れる
- **Sticky nav**：常時固定、背景は半透明＋ぼかし

### HumanLoop

- 14秒ループ、4フェーズで巨大タイポ + 個別アニメーションをクロスフェード（フェード `.9s ease`）
- アクティブタブ下の進捗線は `width: ${local * 100}%` で滑らかに伸びる
- `requestAnimationFrame` で動かしているので、タブが背面化されるとブラウザが間引く（OK）

### Hover states

- ナビリンク：アクティブ時のみ下線
- ボタン：`.btn` 背景反転、`.btn-fill` は `--rust` に変わる
- Worksリスト行：背景 `--paper-2` に切り替わる（`transition: .25s`）

### Responsive

- ブレークポイント：実質 PC（>= 768px 想定）と SP（< 768px）の2段階
- 実装時は `@media (max-width: 768px)` でSPスタイルに切り替え（リファレンスでは `sp` プロップで分岐しているが、本番は CSS で）
- グリッドのカラム数、フォントサイズ、パディングがSPで縮小される（`option-a/pages.v2.jsx` の `sp ? X : Y` パターン参照）

---

## State Management

ほぼ全て静的ページなので大きな状態管理は不要。

- **HumanLoop**：`t`（時間、秒）を持ち `requestAnimationFrame` で更新。`useEffect` のクリーンアップで `cancelAnimationFrame`
- **Scroll Y**：パララックス用にウィンドウの `scrollY` を購読。`useEffect` で `scroll` イベントリスナを追加、`{ passive: true }`、クリーンアップ必須
- **Reveal**：`IntersectionObserver` をマウント時に作成、全 `.reveal` 要素を observe。クリーンアップで `disconnect`
- **Contact form**：name / email / topic / message の4状態。送信処理は実装側で（メール送信API or 外部フォームサービス連携）

実装フレームワーク次第で：
- Next.js なら Server Action か API Route で送信処理
- Astro なら外部フォームサービス（Formspree, Netlify Forms 等）が手軽

---

## Assets

### 画像（全て要差し替え）

- Hero画像3点：①ランニング・夜明け / ②土・手 / ③デスク・制作
- About ポートレート1点：背中向き
- Works画像4点：とれたべ / Liftly / セッツマルシェ / 草八興業
- Journal Instagram画像9点（3×3 グリッド）

リファレンスでは `.ph` クラスで斜線パターンに置き換えています。本番では `<Image>` / `<img>` に差し替え、必要に応じてオブジェクトフィット指定。

### Fonts

Google Fonts から読み込み。Next.js なら `next/font/google` で：

```ts
import { Archivo, Inter, JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';

const archivo = Archivo({ subsets: ['latin'], weight: ['500','600','700','800'], style: ['normal','italic'] });
const noto = Noto_Sans_JP({ subsets: ['latin'], weight: ['400','500','600','700'] });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500'] });
```

### Icons

**アイコンライブラリは使用していません。** SNSも文字（"Instagram" / "X" / "note" / "GitHub"）で表現。意図的にミニマル。

---

## Files in this bundle

```
design_handoff_personal_site/
├── README.md                                    ← このファイル
├── Option A v2 — Athlete Editorial.html         ← 全ページキャンバスのエントリーポイント
├── design-canvas.jsx                            ← キャンバス用（実装には不要）
└── option-a/
    ├── styles.v2.css                            ← 全ページ共通CSS（トークン + コンポーネント）
    └── pages.v2.jsx                             ← Home / About / Works / Journal / Contact のReactコンポーネント
```

ローカルで確認するには：
1. このフォルダをそのままどこかに置く
2. `Option A v2 — Athlete Editorial.html` をブラウザで開く
3. キャンバス上に PC 5ページ + SP 5ページが並びます。各アートボードはダブルクリックでフルスクリーン表示

---

## Implementation Tips

- **ナビとフッターは共通レイアウト**として切り出してください（Next.js なら `app/layout.tsx`）
- **HumanLoop は SVG で組んでいます。** Framer Motion で書き換えると保守しやすくなります（フェーズ切り替えは `AnimatePresence`、進捗バーは `motion.div` の `width` アニメ）
- **スクロールパララックス** は `framer-motion` の `useScroll` + `useTransform` でクリーンに書けます
- **ティッカー** は CSS の `@keyframes` で十分。JSは不要
- **罫線が主役の設計** なので、Tailwind で書くなら `border-ink` のようにカラートークンをきちんと拡張してください
- **font-feature-settings: "palt"** はトラッキングが詰まりすぎる箇所もあるので、見出し以外は適宜調整
- **「悪役」は無い**：派手なシャドウ・グラデーション・大きな角丸は使わない方針です。素材感とタイポで成立させてください

---

## Open Questions for Implementation

実装着手前にプロダクトオーナー（Miyabayasi さん）に確認すると良い項目：

1. 写真素材の準備状況（誰が撮影 / 用意するか）
2. CMS 要否（Journal / Works を増やしていくなら microCMS / Newt / Sanity あたり）
3. Contact フォームの送信先（メール？ Notion へ？ Slack へ？）
4. ドメイン・ホスティング（Vercel / Netlify / Cloudflare Pages など）
5. アナリティクス（GA4 / Plausible / Vercel Analytics）
6. OGP 画像の用意（自動生成するか、手動か）
7. SP 横向き・タブレット対応の要否（現状 PC/SP の2段階のみ）
8. ダークモード対応の要否（黒×生成りなのでダークモードは作りやすい）
