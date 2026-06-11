import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | DogWalk',
  description:
    'iOSアプリ「DogWalk」のプライバシーポリシー。取り扱う情報・第三者サービス・データの削除について説明します。',
};

export default function DogWalkPrivacyPage() {
  return (
    <main className="dw-doc">
      <Link className="dw-doc__back" href="/dogwalk/">
        ← DogWalk トップへ
      </Link>
      <h1>プライバシーポリシー</h1>
      <p className="dw-doc__updated">制定日: 2026年6月11日</p>

      <p>
        DogWalk（以下「本アプリ」）は、個人開発者 宮林幸也（以下「開発者」）が提供する犬の散歩記録アプリです。
        本ポリシーは、本アプリが取り扱う情報と、その利用目的を説明するものです。
      </p>

      <h2>1. アカウント不要・データは端末内</h2>
      <p>
        本アプリの利用にアカウント登録は不要です。散歩の記録（ルート・距離・時間）、愛犬のプロフィール、写真、
        トイレ・健康記録などの利用データは、<strong>すべてお使いの端末内にのみ保存され</strong>、
        開発者のサーバーに送信・保存されることはありません。アプリを削除すると、これらのデータも端末から削除されます。
      </p>

      <h2>2. 取り扱う情報</h2>
      <table>
        <thead>
          <tr>
            <th>情報</th>
            <th>利用目的</th>
            <th>外部送信</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>位置情報（正確な位置）</td>
            <td>散歩中のルート・距離・速度の記録。画面消灯中も記録を継続するために使用</td>
            <td>なし（端末内のみ。天気取得時に座標をOpen-Meteo APIへ送信しますが、保存されません）</td>
          </tr>
          <tr>
            <td>写真・カメラ</td>
            <td>愛犬のプロフィール写真・散歩中の写真の保存</td>
            <td>
              なし（AI似顔絵生成を利用した場合のみ、選択した写真1枚を生成処理のため開発者のサーバー経由でOpenAIに送信。
              生成後は保存されません）
            </td>
          </tr>
          <tr>
            <td>音声（マイク・音声認識）</td>
            <td>声による散歩記録。原則として端末内で認識</td>
            <td>
              端末内認識が使えない場合のみ、変換済みテキストを構造化のため開発者のサーバー経由でOpenAIに送信。
              音声・テキストとも保存されません
            </td>
          </tr>
          <tr>
            <td>購入情報</td>
            <td>プレミアム購読の管理（Apple / RevenueCat）</td>
            <td>App内課金の処理に必要な範囲でAppleおよびRevenueCat（購読管理サービス）が処理</td>
          </tr>
          <tr>
            <td>広告関連情報</td>
            <td>無料版でのバナー広告表示（Google AdMob）</td>
            <td>AdMob SDKがデバイス情報・おおよその位置情報等を広告配信のため収集します（下記参照）</td>
          </tr>
        </tbody>
      </table>

      <h2>3. 第三者サービス</h2>
      <p>
        本アプリは以下の第三者サービスを利用しています。各サービスのデータの取り扱いは、それぞれのプライバシーポリシーに従います。
      </p>
      <ul>
        <li>
          Google AdMob（広告）—{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            Google プライバシーポリシー
          </a>
        </li>
        <li>
          RevenueCat（購読管理）—{' '}
          <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noreferrer">
            RevenueCat Privacy Policy
          </a>
        </li>
        <li>
          OpenAI（音声構造化・AI似顔絵。上記の場合のみ）—{' '}
          <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noreferrer">
            OpenAI Privacy Policy
          </a>
        </li>
        <li>Open-Meteo（天気情報）／ OpenStreetMap・CARTO（地図タイル）</li>
      </ul>
      <p>本アプリは、ユーザーを横断的に追跡（トラッキング）する目的でのデータ収集は行いません。</p>

      <h2>4. データの削除</h2>
      <p>
        本アプリのデータはすべて端末内にあるため、アプリを削除することで全データが削除されます。
        開発者がユーザーデータを保持していないため、個別の削除依頼は不要です。
      </p>

      <h2>5. 子どものプライバシー</h2>
      <p>本アプリは13歳未満の子どもを対象としていません。</p>

      <h2>6. 改定</h2>
      <p>本ポリシーを改定する場合は、本ページで告知します。</p>

      <h2>7. お問い合わせ</h2>
      <p>koyablog.1104@gmail.com</p>
    </main>
  );
}
