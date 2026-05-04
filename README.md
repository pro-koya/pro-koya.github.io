# pro-koya.github.io

Miyabayasi Koya のポートフォリオと各アプリのランディングページを管理する Next.js 静的サイトです。

公開URL: https://pro-koya.github.io/

## 構成

- `src/`: Next.js App Router のソース
- `public/`: 画像、`app-ads.txt`、単体HTMLなどの静的アセット
- `.github/workflows/pages.yml`: GitHub Pages へのビルド・デプロイ
- `gas/`: 問い合わせフォーム用 Google Apps Script
- `supabase/`: Supabase 関連ファイル
- `design_handoff_*` / `*.md`: 制作メモ、デザイン検討資料

`docs/`, `out/`, `.next/`, `output/`, `.playwright-cli/` は生成物または検証ログとして扱い、正本にはしません。

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

`next.config.ts` で `output: 'export'` を指定しているため、ビルド結果は `out/` に生成されます。GitHub Actions はこの `out/` を GitHub Pages にアップロードします。

## 公開アセット

AdMob の検証用 `app-ads.txt` は `public/app-ads.txt` を正本にします。アプリ個別の検証ファイルが必要な場合は `public/<app-slug>/app-ads.txt` に置きます。

問い合わせフォーム設定は [contact-form-setup.md](/Users/koya1104/Desktop/app-pages/contact-form-setup.md) を参照してください。
