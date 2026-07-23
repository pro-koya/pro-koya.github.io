# 法人LP（/koefarm/business/）の画像素材

ChatGPT の画像生成でつくったイラスト素材。**文字は画像に焼き込まない**（日本語が崩れるため）。
ラベルや数値はLP側のHTMLで重ねる。

| ファイル | 用途 | 状態 |
|---|---|---|
| `doc-report.png` | S1「4枚の書類」1枚目＝作業日報 | 生成済み（1254×1254） |
| `doc-attendance.png` | S1 2枚目＝勤怠 | 生成済み（1254×1254） |
| `doc-labor.png` | S1 3枚目＝労務費 | **未生成** |
| `doc-ledger.png` | S1 4枚目＝仕訳 | **未生成** |

## 再生成の手順

1. Chrome の ChatGPT ログイン済みセッションで https://chatgpt.com/images を開く
2. 下記テンプレートの「題材」と「上部の図」だけ差し替えて投入する
3. 生成完了（**1024px以上の画像が出るまで待つ**。途中は512pxのプレビューJPEGが出るので掴まないこと）
4. 保存はページ上のJSで行うのが確実（ライトボックスにダウンロードボタンが出ない場合がある）:

```js
const img = Array.from(document.querySelectorAll('img'))
  .filter(i => i.naturalWidth >= 1024)
  .sort((a,b) => b.naturalWidth - a.naturalWidth)[0];
const blob = await (await fetch(img.src)).blob();
const a = document.createElement('a');
a.href = URL.createObjectURL(blob); a.download = 'doc-xxx.png';
document.body.appendChild(a); a.click(); a.remove();
```

## プロンプトのテンプレート（この型で狙いどおりの絵が出た）

> 日本の農業向けWebサイトに載せる、上質なエディトリアルイラスト。題材は「**〈題材〉**」。
> 生成り色の和紙(#f5f1e8)の背景に、白い紙(#fcfbf7)が1枚、わずかに傾いて置かれ、柔らかい落ち影がある。
> 紙の上部には**〈上部の図〉**。その下には行が並ぶ表があり、各行にはゆるやかなグレーの横線が引かれて
> 「手書きで埋まっている」様子を表す。**実際の文字・数字は一切描かない**。
> アクセントに深緑(#2e8b4e)を少しだけ。色は墨黒・生成り・深緑の3色のみ。
> 静かで余白の多い和モダンな作風。人物なし。写真風ではなくフラットなイラスト。正方形。

- 労務費 → 上部の図＝「シンプルな円グラフ。3〜4分割され、うち一つの扇形だけが深緑で塗られている」
- 仕訳 → 上部の図＝「左右2列に分かれた複式簿記の帳簿。中央に縦の罫線」

## 注意

- ChatGPTの画面で **Escape を押すとチャットから離脱する**（入力中のプロンプトが消える）
- 「文字を入れない」指定を外すと日本語が崩れた絵が出る。必ず入れる
