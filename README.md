# みや小屋 / MIYA-KOYA — 会社ホームページ

業務改善・自動化・AI活用支援。「現場の仕事を、使われ続ける仕組みに整えます。」

[Astro](https://astro.build/) で構築した静的サイトです。GitHub Pages + 独自ドメイン（`miya-koya.com`）での公開を想定しています。

---

## 構成（モノレポ）

1つのリポジトリで、会社サイト（Astro）と個人ポートフォリオ（Next.js）を合成して公開します。

```
miya-koya-site/
├ src/ , public/        … 会社サイト（Astro）= ルート配信
├ portfolio/            … 個人ポートフォリオ（Next.js）= /members/koya/portfolio で配信
├ scripts/integrate.mjs … 2つのビルドを1サイトに合成（+ 旧URLリダイレクト生成）
└ .github/workflows/deploy.yml … GitHub Pages へ自動デプロイ
```

- 公開先は GitHub の **ユーザーページ `pro-koya/pro-koya.github.io`**（ルート配信 → base は常に `/`）。
- 個人ポートフォリオは `next.config.ts` の `basePath:'/members/koya/portfolio'` でサブパス配信。
- 旧ポートフォリオのURL（`/forge/privacy` など、ストア参照URL）は新URLへ**自動リダイレクト**（`scripts/integrate.mjs` が生成）。会社が使うURL（about/contact/works 等）は会社ページ優先。

## ローカルで動かす

```bash
# 会社サイトのみ（高速。ポートフォリオは含まれません）
npm install
npm run dev          # http://localhost:4321

# 会社サイト＋ポートフォリオを合成してフル確認
npm install
npm --prefix portfolio ci
npm run build:all    # astro build → next build → 合成（dist/ に出力）
npm run preview      # http://localhost:4321 で /members/koya/portfolio/ も確認可
```

Node.js 20 / 22 以上（確認済み環境：Node 24）。

---

## ページ構成

| URL | 内容 | ファイル |
|---|---|---|
| `/` | トップ | `src/pages/index.astro` |
| `/about` | 会社について（理念・つくる そだてる つながる・代表・みや小屋ファーム・会社概要） | `src/pages/about.astro` |
| `/services` | サービス（BUILD・メニュー・進め方・補助金・FAQ） | `src/pages/services.astro` |
| `/works` | 導入事例一覧 | `src/pages/works/index.astro` |
| `/works/<slug>` | 事例記事 | `src/pages/works/[...slug].astro` |
| `/members` | メンバー一覧 | `src/pages/members/index.astro` |
| `/members/koya` | 宮林幸也 プロフィール | `src/pages/members/koya.astro` |
| `/contact` | 相談・見積もり・問い合わせ | `src/pages/contact.astro` |
| `/privacy` | プライバシーポリシー | `src/pages/privacy.astro` |

---

## ✅ 公開前にやること（要記入チェックリスト）

`src/data/site.ts` の以下を実際の情報に差し替えてください。

- [ ] `tel` / `telLink` … 電話番号（現在 `090-XXXX-XXXX` の仮置き）
- [ ] `address` … 番地まで（現在「大阪府摂津市（番地は要記入）」）
- [ ] `instagram` … 実際のアカウントURL
- [ ] `line` … LINE公式アカウントの友だち追加URL（現在 `https://lin.ee/XXXXXXX` の仮置き。問い合わせ・スマホ固定バー・フッターで使用）
- [ ] 法人化したら `about.astro` の会社概要に「法人名・設立日」を追記

その他：
- [ ] お問い合わせフォームの有効化 … 初回送信時に `contact@miya-koya.com` 宛に届く FormSubmit の承認メールのリンクをクリック（`src/data/site.ts` の `FORM_ACTION`）。別サービス（Googleフォーム等）に変える場合もここを編集
- [ ] 代表プロフィール・スキル・実績の文言確認（`src/pages/members/koya.astro`）

---

## 導入事例（記事）の追加方法

`src/content/works/` に Markdown を追加するだけで記事が増えます。

```markdown
---
title: "記事タイトル"
client: "顧客名（社名・屋号）"
industry: "業種"
area: "大阪府◯◯市"
summary: "一覧に出る要約"
services: ["業務整理相談", "DX導入支援"]
result: "転記作業を月20時間削減"   # 任意
interviewee: "代表 ◯◯ 様"        # 任意
date: 2026-09-01
heroImage: "./画像ファイル名.jpg"  # 任意（同フォルダに置く）
draft: false                       # true の間は本番非公開
---

## 導入前の課題
本文…
```

- `draft: true` の記事は `npm run dev` では見えますが、本番ビルド（`npm run build`）では出力されません。
- 現在 `_sample-fukushi.md` / `_sample-local-shop.md` は **サンプル（draft）** です。実際のインタビューに差し替え、`draft` を外して公開してください。

---

## 集客・SEOまわり（実装済み）

- **初回ヒアリング無料**を全導線で訴求（ヒーロー／サービス／CTA／問い合わせの3ステップ）
- **LINE相談ボタン**（問い合わせ・フッター）＋**スマホ追従の相談バー**（`MobileCTA`）
- 電話は **タップで発信**（`tel:`）
- **オンライン予約**：`src/data/site.ts` の `booking` に予約ツール（TimeRex等）のURLを入れると、問い合わせページに「日程を選んで予約」ボタンが表示されます（空なら非表示）
- トップに**「こんな方へ」**、サービスに**Before→After**を掲載
- 構造化データ **JSON-LD（ProfessionalService）**、`sitemap-index.xml`、`robots.txt`、`og.png`、`404`、`/build`→`/services` リダイレクト
- 名刺・印刷物のQRは `miya-koya.com`（トップ）でOK。サービス詳細に飛ばす場合は `/build` または `/services` を使用

## デザイン / ブランド

実物のロゴ・名刺・ブランドガイドラインに準拠。

- **カラー**：クリーム `#faf6f3` × トープ/ブラウン `#8a7763` × ダークブラウン `#3a322b`、差し色に淡いセージ。定義は `src/styles/global.css` の `:root`
- **書体**：Zen Kaku Gothic New ＋ Zen Maru Gothic（見出し・タグライン）
- **ロゴ**：`public/brand/`（実ロゴから背景透過で生成。`logo-horizontal` / `logo-vertical` / `logo-mark` / `logo-mark-light`）
- **タグライン**：つくる、そだてる、つながる。
- **理念**：ITが分からない現場に、もう一人の仲間として。

---

## GitHub Pages へのデプロイ

リポジトリ `pro-koya/pro-koya.github.io` の `main` に push すると、`.github/workflows/deploy.yml` が
`npm run build:all`（Astro + Next 合成）を実行し、`dist/` を Pages へ自動デプロイします。

- リポジトリ Settings → Pages → Source は「GitHub Actions」。
- 現在は **独自ドメイン未取得のため `https://pro-koya.github.io/` で配信**（CNAMEファイルは置かない）。

### 独自ドメイン `miya-koya.com` に切り替えるとき

1. ドメインを取得し、DNS（Cloudflare等）を GitHub Pages 向けに設定
2. リポジトリ Settings → Pages → Custom domain に `miya-koya.com` を設定（CNAMEファイルが自動生成される）
   - 手動の場合は `CNAME.future` の内容（`miya-koya.com`）を `public/CNAME` に作成
3. ユーザーページ＝ルート配信のため base は不変。**コード修正は不要**でそのまま動きます。

---

## 個人ポートフォリオの統合（完了）

`pro-koya.github.io` の旧ポートフォリオ（Next.js）は `portfolio/` として取り込み済みで、
`/members/koya/portfolio/` で配信されます。会社のメンバーページ `/members/koya` から誘導します。
旧URL（`/forge/privacy` 等）は自動リダイレクトで維持しています。
