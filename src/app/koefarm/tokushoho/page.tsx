import type { Metadata } from 'next';
import '../legal.css';

export const metadata: Metadata = {
  title: 'コエファーム 特定商取引法に基づく表記',
  description: 'iOSアプリ「コエファーム」の特定商取引法に基づく表記。',
};

export default function KoeFarmTokushoho() {
  return (
    <main className="kf-legal">
      <nav className="kf-nav">
        <a href="/koefarm/privacy/">プライバシーポリシー</a>
        <a href="/koefarm/terms/">利用規約</a>
        <a href="/koefarm/tokushoho/">特定商取引法</a>
      </nav>

      <h1>特定商取引法に基づく表記</h1>
      <p className="kf-meta">制定日: 2026-07-12 ／ コエファーム</p>

      <table>
        <tbody>
          <tr><th>販売事業者</th><td>みや小屋（宮林幸也）</td></tr>
          <tr><th>運営統括責任者</th><td>宮林幸也</td></tr>
          <tr><th>所在地</th><td>請求があれば遅滞なく開示します。</td></tr>
          <tr><th>電話番号</th><td>請求があれば遅滞なく開示します。</td></tr>
          <tr><th>メールアドレス</th><td>koya@miya-koya.com</td></tr>
          <tr><th>販売URL</th><td>App Store（コエファーム アプリ内）</td></tr>
          <tr><th>販売価格</th><td>プレミアム：月額 ¥680／年額 ¥6,800（消費税込）。無料トライアル7日間。</td></tr>
          <tr><th>商品代金以外の必要料金</th><td>通信料（インターネット接続料金は利用者負担）</td></tr>
          <tr><th>支払方法</th><td>Apple ID を通じたApp内課金</td></tr>
          <tr><th>支払時期</th><td>購入時（サブスクは各更新日）。無料トライアルは期間終了時に課金開始。</td></tr>
          <tr><th>役務の提供時期</th><td>決済完了後、直ちに利用可能</td></tr>
          <tr><th>自動更新・解約</th><td>期間終了の24時間前までに解約しない限り自動更新。解約はApp Storeのアカウント設定から。</td></tr>
          <tr><th>返品・キャンセル</th><td>デジタルコンテンツの性質上、購入後の返金は原則不可。返金はAppleの規約・手続きによる。</td></tr>
          <tr><th>動作環境</th><td>iOS 18.0 以上</td></tr>
        </tbody>
      </table>

      <p className="kf-foot">制定日: 2026-07-12 ／ コエファーム（みや小屋）</p>
    </main>
  );
}
