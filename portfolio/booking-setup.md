# Booking Setup（日程予約）

ポートフォリオの `/booking` ページは、**Google カレンダーベースの予約**です。
フロントは Next.js（静的書き出し）、バックエンドは contact と同じく **Google Apps Script + Google カレンダー + Gmail** で構成しています。

## 仕組み

1. 訪問者が `/booking/` で「方式（Meet / Zoom / 対面）」と「空いている日時」を選ぶ
2. 空き枠は GAS が **Google カレンダーの予定（busy）を読んで** 計算して返す（受付時間 × 60分枠 から、予定とかぶる枠を除外）
3. 予約を確定すると GAS が **Google カレンダーに予定を書き込み**、相手をゲスト招待
4. Meet を選んだ場合は **Meet リンクを自動生成**して招待に添付
5. `koyablog.1104@gmail.com` に通知、予約者に確認メール、`portfolio-contact` スプレッドシートの `bookings` シートに1行追加

## 1. GAS プロジェクトを作る

1. [script.new](https://script.new) で新しい Apps Script プロジェクトを作成
2. `gas/portfolio-booking/Code.gs` の内容を貼り付ける
3. マニフェスト（appsscript.json）を `gas/portfolio-booking/appsscript.json` の内容で置き換える
   - 「プロジェクトの設定」→「`appsscript.json` をエディタで表示する」にチェックを入れると編集できます

> **重要:** このマニフェストは Calendar 拡張サービス（advanced service）を有効化しています。
> これがないと Meet リンクの自動生成と空き枠計算ができません。
> エディタ左の「サービス +」から **Calendar API（v3）** が追加されていることも確認してください。

## 2. 設定値を入れる

`Code.gs` 先頭の `BOOKING_CONFIG` を編集します。

```js
const BOOKING_CONFIG = {
  availabilityCalendarIds: ["primary"], // 空き判定に使うカレンダー
  writeCalendarId: "primary",           // 予約を書き込むカレンダー
  openHour: 7,                          // 受付開始（毎日 7:00）
  closeHour: 20,                        // 受付終了（最後の枠は 19:00 開始）
  slotMinutes: 60,                      // 1枠 60分
  minLeadHours: 12,                     // 何時間先から予約可にするか
  // 提示範囲は「翌月末日まで」（例: 5月→6月末 / 6月→7月末）。horizonEnd_() で制御
  methods: {
    meet: { label: "Google Meet" },
    zoom: { label: "Zoom", url: "https://zoom.us/j/..." }, // フォールバック用（通常は使わない）
    inperson: { label: "対面", location: "大阪近辺（確定後に詳細をご連絡します）" },
  },
  // ...
};
```

- **Zoom** は予約ごとに自動発行します（後述の「5. Zoom API 連携」を設定）。`url` は認証情報を入れない場合のフォールバックなので、通常はそのままで構いません。
- 受付時間や日数を変えたい場合はここを調整

## 3. Web アプリとしてデプロイ

1. 右上「デプロイ」→「新しいデプロイ」
2. 種類「ウェブアプリ」
3. 実行ユーザー: `自分` / アクセス: `全員`
4. デプロイ → 初回は権限承認（カレンダー・メール・スプレッドシート）を進める
5. 発行された **ウェブアプリ URL** を控える（`page.tsx` の `GAS_BOOKING_ENDPOINT` に入れる値）

## 4. サイト側に URL を入れる

`src/app/booking/page.tsx` の `GAS_BOOKING_ENDPOINT` を、上の URL に置き換えます。

```ts
const GAS_BOOKING_ENDPOINT = 'https://script.google.com/macros/s/XXXXXXXX/exec';
```

その後 `npm run build` で再書き出し → デプロイ。

## 5. Zoom を予約ごとに自動発行する（Zoom API 連携）

> **現在 Zoom は無効化中**（無料 Basic プランは1ミーティング40分の上限があり、60分相談に不向きなため **Meet＋対面のみ**で運用）。
> 連携コード・Script Properties はそのまま残してあるので、Zoom Pro 等にする場合は `Code.gs` の `methods.zoom` のコメントアウトを戻し、フロント `page.tsx` の `METHODS` に `zoom` を追加すれば再開できます。
> 以下は再開時の参考手順です。

Zoom は固定リンクではなく、**予約ごとにユニークなミーティングを自動発行**します
（待機室ON・ホスト不在時の参加不可・パスコード付き）。Server-to-Server OAuth アプリを使います。

### 5-1. Zoom 側でアプリを作る

1. [marketplace.zoom.us](https://marketplace.zoom.us) に koya のアカウントでサインイン
2. 右上 **「Develop」→「Build App」**
3. **「Server-to-Server OAuth」** を選んで **Create**
4. アプリ名（例: `portfolio-booking`）を入力
5. **「App Credentials」** タブに出る次の3つを控える
   - **Account ID**
   - **Client ID**
   - **Client Secret**
6. **「Information」** タブの必須項目（会社名・連絡先など）を埋める
7. **「Scopes」** タブ → **Add Scopes** → `meeting` カテゴリの
   **「View and manage all user meetings」（`meeting:write:admin`）** を追加
   - 新しい粒度のスコープ表記の場合は `meeting:write:meeting:admin` を選ぶ
8. **「Activate your app」** で有効化

### 5-2. GAS 側に認証情報を入れる（直書きしない）

Apps Script エディタ左の **「プロジェクトの設定」→「スクリプト プロパティ」** で、以下を追加：

| プロパティ | 値 |
|---|---|
| `ZOOM_ACCOUNT_ID` | 5-1 の Account ID |
| `ZOOM_CLIENT_ID` | 5-1 の Client ID |
| `ZOOM_CLIENT_SECRET` | 5-1 の Client Secret |
| `ZOOM_USER_ID` | （任意）koya の Zoom ログインメール。未設定なら `me` |

- **Code.gs には秘密情報を書きません**（GitHub に載らないように）。
- 3つ（ACCOUNT_ID / CLIENT_ID / CLIENT_SECRET）が揃うと自動で「予約ごと発行」に切り替わります。
- 未設定の間は `BOOKING_CONFIG.methods.zoom.url` の固定URLにフォールバックします。
- 「ユーザーが見つからない」系のエラーが出る場合は、`ZOOM_USER_ID` に **koya の Zoom ログインメール**を設定してください（`me` で解決しない環境向け）。

> プロパティを変えたら再デプロイは不要（次の予約から反映）。ただし `Code.gs` 本体を変えたときは再デプロイが必要です。

## 6. 動作確認

1. `/booking/` を開き、空き枠が表示されることを確認（GET `?action=slots` が動いている）
2. 自分のテスト枠を1件予約してみる
3. Google カレンダーに予定が入り、ゲスト招待が届くことを確認
4. **Meet** を選んだ予約に Meet リンクが付くことを確認
5. **Zoom** を選んだ予約で、Zoom に新しいミーティングが作られ、参加URL＋パスコードがメール／カレンダーに入ることを確認
6. 通知メール・確認メールが届くことを確認
7. `bookings` シートに行が追加されることを確認
8. テスト予定はカレンダーから削除（削除すればその枠は再び予約可能に戻る）

## 補足・設計メモ

- **CORS:** 空き枠取得は GET、予約は `Content-Type: text/plain` の POST にしている。
  これは GAS の preflight 制約を避けつつ、レスポンス JSON をブラウザから読めるようにするため。
  （contact フォームは `no-cors` でレスポンスを読まないが、予約は空き確認・確定結果を読む必要があるためこの方式）
- **二重予約防止:** 予約確定時に `LockService` でロックし、確定直前にもう一度カレンダーの busy を再確認している。
- **honeypot + 送信タイミング** による簡易スパム対策入り。
- Code.gs を更新したら、`デプロイを管理` から既存デプロイのバージョンを更新（新規デプロイすると URL が変わる）。
