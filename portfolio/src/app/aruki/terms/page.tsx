import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const CONTACT_EMAIL = 'koyablog.1104@gmail.com';

export const metadata: Metadata = {
  title: '利用規約 | Aruki 歩',
  description: 'iOSアプリ「Aruki（歩）」の利用規約です。サブスクリプションの自動更新・解約方法・価格について定めています。',
};

export default function ArukiTermsPage() {
  return (
    <main className="ar-legal aruki-root">
      <nav className="ar-legal__nav" aria-label="Aruki 歩">
        <Link href="/aruki/" className="ar-brand">
          <Image src="/assets/media/aruki/icon.png" alt="" width={34} height={34} />
          <span>Aruki 歩</span>
        </Link>
        <Link href="/aruki/" className="ar-legal__nav-link">
          公式ページへ
        </Link>
      </nav>

      <header className="ar-legal__hero">
        <p className="ar-eyebrow">Terms of Use</p>
        <h1 className="ar-mincho">利用規約</h1>
        <p>
          本規約は、iOSアプリ「Aruki（歩）」（以下「本アプリ」）の利用条件を定めるものです。
          本アプリを利用することで、本規約に同意したものとみなされます。
        </p>
        <span>最終更新日：2026年6月6日</span>
      </header>

      <article className="ar-legal__card">
        <section>
          <h2>1. 提供者</h2>
          <p>
            提供者：宮林 幸也（Koya Miyabayasi）／ 連絡先：
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </section>

        <section>
          <h2>2. サブスクリプション（Aruki Pro）</h2>
          <p>本アプリは、以下の有料プランを提供します。</p>
          <table className="ar-table">
            <thead>
              <tr>
                <th>プラン</th>
                <th>価格</th>
                <th>期間</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>月額プラン</td>
                <td>¥980</td>
                <td>1か月（自動更新）</td>
              </tr>
              <tr>
                <td>年額プラン</td>
                <td>¥4,800（7日間の無料トライアル付き）</td>
                <td>1年（自動更新）</td>
              </tr>
              <tr>
                <td>買い切り</td>
                <td>¥9,800</td>
                <td>永続（更新なし）</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>3. 自動更新について</h2>
          <ul>
            <li>お支払いは、購入確定時にApp Store / Apple IDアカウントに請求されます。</li>
            <li>
              現在の期間の終了24時間前までに自動更新をオフにしない限り、サブスクリプションは自動的に更新されます。
            </li>
            <li>更新料金は、期間終了前の24時間以内に請求されます。</li>
            <li>
              無料トライアル付きプランは、トライアル終了の24時間前までに解約しない限り、自動的に有料に移行します。
            </li>
          </ul>
        </section>

        <section>
          <h2>4. 解約方法</h2>
          <ul>
            <li>「設定 App ＞ あなたの名前 ＞ サブスクリプション」からいつでも管理・解約できます。</li>
            <li>
              解約は次回更新日の前までに行ってください。期間途中の解約による日割り返金はありません
              （Appleのポリシーに準じます）。
            </li>
          </ul>
        </section>

        <section>
          <h2>5. 健康に関する免責</h2>
          <p>
            本アプリは医療機器ではなく、提供する情報（心拍ゾーン等）は一般的な目安です。
            持病がある方、運動に不安がある方は、利用開始前に医師にご相談ください。
            本アプリの利用により生じたいかなる損害についても、提供者は責任を負いません。
          </p>
        </section>

        <section>
          <h2>6. 禁止事項</h2>
          <p>法令違反、リバースエンジニアリング、本アプリの不正利用を禁止します。</p>
        </section>

        <section>
          <h2>7. 規約の変更</h2>
          <p>
            本規約は必要に応じて改定されることがあります。重要な変更は、本ページまたはアプリ内で通知します。
          </p>
        </section>

        <section>
          <h2>8. 準拠法</h2>
          <p>本規約は日本法に準拠します。</p>
        </section>

        <section>
          <h2>9. お問い合わせ</h2>
          <p>
            本規約に関するお問い合わせは、
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            までご連絡ください。
          </p>
        </section>
      </article>
    </main>
  );
}
