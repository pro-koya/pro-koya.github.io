import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const CONTACT_EMAIL = 'koyablog.1104@gmail.com';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Aruki 歩',
  description: 'iOSアプリ「Aruki（歩）」のプライバシーポリシーです。健康データはすべて端末内で処理され、外部に送信されません。',
};

export default function ArukiPrivacyPage() {
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
        <p className="ar-eyebrow">Privacy Policy</p>
        <h1 className="ar-mincho">プライバシーポリシー</h1>
        <p>
          このプライバシーポリシーは、iOSアプリ「Aruki（歩）」（以下「本アプリ」）における
          データの取り扱いについて説明するものです。本アプリは、ユーザーのプライバシーを最優先します。
        </p>
        <span>最終更新日：2026年6月6日</span>
      </header>

      <article className="ar-legal__card">
        <section>
          <h2>1. 基本方針</h2>
          <p>
            本アプリは、健康データを含むすべての個人データを<strong>お使いの端末内でのみ処理</strong>します。
            開発者を含むいかなる外部サーバーにも、データを送信・収集・共有しません。
            本アプリの利用にあたって、アカウント登録は必要ありません。
          </p>
        </section>

        <section>
          <h2>2. 取得・利用するデータ</h2>
          <p>本アプリが扱うデータと、その用途・保存場所は次のとおりです。</p>
          <table className="ar-table">
            <thead>
              <tr>
                <th>データ</th>
                <th>用途</th>
                <th>保存場所</th>
                <th>外部送信</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>心拍数（HealthKit・任意）</td>
                <td>運動強度（ゾーン2）の判定</td>
                <td>端末内のみ</td>
                <td>なし</td>
              </tr>
              <tr>
                <td>歩数（HealthKit・任意）</td>
                <td>セッション記録の補助</td>
                <td>端末内のみ</td>
                <td>なし</td>
              </tr>
              <tr>
                <td>ワークアウト記録（HealthKitへ書き込み）</td>
                <td>アクティビティリングへの反映</td>
                <td>Apple ヘルスケア</td>
                <td>なし</td>
              </tr>
              <tr>
                <td>セッション履歴・連続日数・設定</td>
                <td>アプリ機能の提供</td>
                <td>端末内（SwiftData / App Group）</td>
                <td>なし</td>
              </tr>
            </tbody>
          </table>
          <p>
            HealthKitから取得したデータを、広告・マーケティング目的で使用することは一切ありません。
            HealthKitの許可は任意です。許可しなくても、インターバルタイマー等の主要機能はご利用いただけます。
          </p>
        </section>

        <section>
          <h2>3. 課金について</h2>
          <p>
            本アプリの「Aruki Pro」は、AppleのApp内課金（StoreKit）を通じて提供されます。
            購入処理はAppleが行い、本アプリがクレジットカード情報等を取得・保存することはありません。
          </p>
        </section>

        <section>
          <h2>4. トラッキング・広告について</h2>
          <p>
            本アプリは、ユーザーをまたいで追跡（トラッキング）する技術を一切使用しません。
            第三者の解析SDKや広告SDKは組み込んでいません。
          </p>
        </section>

        <section>
          <h2>5. データの削除</h2>
          <p>
            すべてのアプリ内データは端末内にあります。本アプリを削除すると、アプリ内データも削除されます。
            HealthKitに書き込んだワークアウトは、Appleの「ヘルスケア」アプリから個別に削除できます。
          </p>
        </section>

        <section>
          <h2>6. 医療上の注意</h2>
          <p>
            本アプリは医療機器ではありません。表示される情報（心拍ゾーン等）は一般的な目安です。
            持病がある場合や運動に不安がある場合は、開始前に医師にご相談ください。
          </p>
        </section>

        <section>
          <h2>7. ポリシーの変更</h2>
          <p>
            本ポリシーは必要に応じて改定されることがあります。重要な変更がある場合は、
            本ページまたはアプリ内で通知します。変更後のポリシーは、本ページに掲載した時点から効力を生じます。
          </p>
        </section>

        <section>
          <h2>8. お問い合わせ</h2>
          <p>
            本ポリシーに関するお問い合わせ、データ削除の依頼、その他プライバシーに関するご相談は、
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            までご連絡ください。提供者：宮林 幸也（Koya Miyabayasi）
          </p>
        </section>
      </article>
    </main>
  );
}
