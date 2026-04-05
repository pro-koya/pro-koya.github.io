# GitHub Pages 用（app-ads.txt 設置）

ポートフォリオの問い合わせフォーム設定は [contact-form-setup.md](/Users/koya1104/Desktop/app-pages/contact-form-setup.md) を参照してください。

このフォルダの内容を GitHub Pages で公開し、AdMob の app-ads.txt 検証に使います

## 1. 事前にやること

### app-ads.txt のパブリッシャー ID を書き換える

1. [AdMob](https://admob.google.com/) にログイン
2. **設定（歯車）** → **アカウント情報** で、`pub-` で始まる **パブリッシャー ID** を確認
3. `app-ads.txt` を開き、`pub-XXXXXXXXXXXXXXXX` を **あなたのパブリッシャー ID** に置き換えて保存

例（パブリッシャー ID が `pub-1234567890123456` の場合）:

```
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

## 2. GitHub Pages の出し方（2通り）

### 方法A: このリポジトリの `/docs` で公開する場合

1. この `for_githubPages` フォルダの中身（`app-ads.txt` と `index.html`）を、リポジトリ直下の **`docs`** フォルダにコピーする
   - 例: `docs/app-ads.txt`, `docs/index.html`
2. GitHub のリポジトリページで **Settings** → **Pages**
3. **Source** で「Deploy from a branch」を選び、**Branch** で `main`、**Folder** で **/docs** を選択して Save
4. 数分後、`https://<あなたのユーザー名>.github.io/<リポジトリ名>/` で公開される
   - app-ads.txt の URL は `https://<あなたのユーザー名>.github.io/<リポジトリ名>/app-ads.txt`

**注意**: Play Store / App Store の「開発者ウェブサイト」には、
`https://<あなたのユーザー名>.github.io/<リポジトリ名>` を指定する（末尾のスラッシュはあってもなくても可）。
AdMob はこのドメインから `https://.../<リポジトリ名>/app-ads.txt` を取得します。

---

### 方法B: 専用リポジトリで公開する場合（ルートに app-ads.txt を置きたいとき）

1. GitHub で **新しいリポジトリ** を作成（例: `yourname.github.io` または `app-website`）
2. そのリポジトリに、このフォルダの **中身だけ** をプッシュする
   - リポジトリの**ルート**に `app-ads.txt` と `index.html` がある状態にする
3. そのリポジトリの **Settings** → **Pages** で、**Source** を「Deploy from a branch」、**Branch** を `main`、**Folder** を **/ (root)** にして Save
4. 公開 URL の例:
   - `https://<あなたのユーザー名>.github.io`（リポジトリ名が `yourname.github.io` の場合）
   - または `https://<あなたのユーザー名>.github.io/<リポジトリ名>/`
5. app-ads.txt の URL は次のどちらか:
   - `https://<あなたのユーザー名>.github.io/app-ads.txt`
   - または `https://<あなたのユーザー名>.github.io/<リポジトリ名>/app-ads.txt`

Play Store / App Store の「開発者ウェブサイト」には、上記の**サイトのルートURL**（app-ads.txt のディレクトリ部分）を設定します。

## 3. 動作確認

ブラウザで次の URL を開き、1行だけのテキスト（`google.com, pub-...`）が表示されればOKです。

- 方法A: `https://<ユーザー名>.github.io/<リポジトリ名>/app-ads.txt`
- 方法B: `https://<ユーザー名>.github.io/app-ads.txt` など（リポジトリ構成による）

## 4. AdMob での確認

1. Play Store / App Store の開発者ウェブサイトに、上記の GitHub Pages の**ルートURL**を登録
2. AdMob の「アプリ」→ 該当アプリ → **app-ads.txt** の「更新を確認」を実行
3. 反映まで数日かかることがあります

## 参考

- [AdMob - app-ads.txt の設定](https://support.google.com/admob/answer/9363762)
- [GitHub Pages のドキュメント](https://docs.github.com/ja/pages)
