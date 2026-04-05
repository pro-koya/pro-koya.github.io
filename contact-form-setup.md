# Contact Form Setup

このポートフォリオの問い合わせフォームは、フロント側を `docs/`、送信処理を `Google Apps Script + Google Spreadsheet + Gmail` で構成しています。

## 構成

1. サイト上のフォームから送信
2. GAS Webアプリが受信
3. Spreadsheet に1行追加
4. `koyablog.1104@gmail.com` に通知メール送信
5. 送信者へ自動返信メール送信

## 1. Spreadsheet を作る

1. Google Drive で新しい Spreadsheet を作成
2. 名前は `portfolio-contact` などでOK
3. URL の `/d/` と `/edit` の間にある文字列を控える
  - これが `spreadsheetId` です

## 2. GAS プロジェクトを作る

1. [script.new](https://script.new) を開く
2. 新しい Apps Script プロジェクトを作成
3. [Code.gs](/Users/koya1104/Desktop/app-pages/gas/portfolio-contact/Code.gs) の内容を貼り付ける
4. [appsscript.json](/Users/koya1104/Desktop/app-pages/gas/portfolio-contact/appsscript.json) の内容でマニフェストを置き換える

## 3. GAS の設定値を入れる

`Code.gs` の先頭にある `PORTFOLIO_CONTACT_CONFIG` を編集します。

```js
const PORTFOLIO_CONTACT_CONFIG = {
  spreadsheetId: "ここにSpreadsheetのID",
  sheetName: "contacts",
  notifyTo: "koyablog.1104@gmail.com",
  serviceName: "koya portfolio",
  replySignature: "koya",
  autoReplyEnabled: true,
};
```

## 4. Webアプリとしてデプロイする

1. 右上の `デプロイ` を押す
2. `新しいデプロイ` を選ぶ
3. 種類で `ウェブアプリ` を選ぶ
4. 設定は以下
  - 実行ユーザー: `自分`
  - アクセスできるユーザー: `全員`
5. `デプロイ` を押す
6. 初回は権限承認を進める
7. 発行された `ウェブアプリ URL` を控える

URL は次のような形です。

```text
https://script.google.com/macros/s/XXXXXXXXXXXX/exec
https://script.google.com/macros/s/AKfycbwNH3P0TNGcGSGEnp0wzkJws5ezGai6dOapJXPGmmMWp3-x2MmMq6l_VkuNNUEnCq4Wkg/exec
```

## 5. サイト側に Webアプリ URL を入れる

[site-config.js](/Users/koya1104/Desktop/app-pages/docs/assets/site-config.js) の `contactEndpoint` に、上で取得した URL を入れます。

```js
contactEndpoint: "https://script.google.com/macros/s/XXXXXXXXXXXX/exec"
```

## 6. 動作確認

1. サイトの問い合わせフォームからテスト送信する
2. Spreadsheet に1行追加されることを確認する
3. `koyablog.1104@gmail.com` に通知メールが届くことを確認する
4. 送信者側に自動返信メールが届くことを確認する

## 補足

- フォームには honeypot と簡易的な送信速度チェックを入れています
- 送信履歴は Spreadsheet に残るので、問い合わせ管理がしやすいです
- `autoReplyEnabled: false` にすると自動返信を止められます
- 初回デプロイ後にコードを変更した場合は、`新しいデプロイ` ではなく既存の `デプロイを管理` からバージョン更新して最新コードを反映してください
- 今回の実装は `iframe` 経由で送信完了を受け取るため、`Code.gs` を更新したら必ず再デプロイしてください

