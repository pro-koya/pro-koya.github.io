import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const CONTACT_FORM_URL = 'https://forms.gle/7FKcm5zv6F6Ci8Wa6';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | 筋肉ごめん',
  description: 'iOSアプリ「筋肉ごめん」のプライバシーポリシーです。',
};

export default function SorryGainsPrivacyPage() {
  return (
    <main className="sg-legal">
      <nav className="sg-legal__nav" aria-label="筋肉ごめん">
        <Link href="/sorrygains/" className="sg-brand">
          <Image src="/assets/media/sorrygains/icon.png" alt="" width={34} height={34} />
          <span>筋肉ごめん</span>
        </Link>
        <Link href="/sorrygains/" className="sg-legal__nav-link">
          公式ページへ
        </Link>
      </nav>

      <header className="sg-legal__hero">
        <p className="sg-eyebrow">Privacy Policy</p>
        <h1>プライバシーポリシー</h1>
        <p>
          このプライバシーポリシーは、iOSアプリ「筋肉ごめん」におけるデータの取り扱いについて説明するものです。
        </p>
        <span>最終更新日：2026年4月27日</span>
      </header>

      <article className="sg-legal__card">
        <section>
          <h2>1. 本アプリについて</h2>
          <p>
            「筋肉ごめん」は、飲酒とトレーニングの関係をユーモラスに表現するエンターテインメントアプリです。
            本アプリに表示される数値や助言は、医学的根拠に基づくものではなく、エンターテインメント目的の表示です。
            健康に関する判断は医師などの専門家にご相談ください。
          </p>
        </section>

        <section>
          <h2>2. 端末内に保存するデータ</h2>
          <p>本アプリは、以下のデータをユーザーの端末内に保存します。</p>
          <ul>
            <li>飲酒記録</li>
            <li>体重</li>
            <li>週のトレーニング回数</li>
            <li>リカバリー行動の完了状況</li>
            <li>オンボーディングや表示設定</li>
          </ul>
          <p>
            これらのデータは、筋肉ごめん度、努力回収率、回復目安などを表示するために利用します。
            任意の外部連携を利用しない限り、本アプリがこれらのアプリ内記録を外部サーバーへ送信することはありません。
          </p>
        </section>

        <section>
          <h2>3. Liftly連携を利用する場合</h2>
          <p>
            ユーザーが任意でLiftly連携を利用する場合、本アプリはApple/Google/Supabase認証を通じて、
            認証に必要なメールアドレスおよびユーザーIDを扱います。
            また、筋肉ごめん度の算出や仙人の助言などのアプリ機能のために、Liftlyのトレーニング要約を取得します。
          </p>
          <p>Liftly連携は任意です。連携しなくても、本アプリの基本機能を利用できます。</p>
        </section>

        <section>
          <h2>4. 利用目的</h2>
          <p>取得または保存するデータは、以下の目的で利用します。</p>
          <ul>
            <li>本アプリの機能提供、表示、記録管理のため</li>
            <li>筋肉ごめん度、努力回収率、回復目安、仙人の助言を表示するため</li>
            <li>Liftly連携時の認証およびトレーニング要約の取得のため</li>
            <li>お問い合わせ対応、不具合調査、品質改善のため</li>
          </ul>
        </section>

        <section>
          <h2>5. 広告・トラッキングについて</h2>
          <p>
            本アプリは、ユーザーのデータを第三者広告やトラッキング目的で利用しません。
            現時点で広告配信SDKは利用していません。
          </p>
        </section>

        <section>
          <h2>6. 第三者サービス</h2>
          <p>
            本アプリは、任意のLiftly連携および認証機能のために、Sign in with Apple、Google Sign-InおよびSupabaseを利用します。
            これらのサービスにおけるデータの取り扱いは、各サービス提供者のポリシーにも従います。
          </p>
        </section>

        <section>
          <h2>7. 情報の削除</h2>
          <p>
            端末内に保存されたアプリ内記録は、アプリの削除またはアプリ内の操作により削除できます。
            Liftly連携に関するアカウント情報や外部連携データは、アプリ内の設定画面から削除を開始できます。
            削除が正常に完了しない場合や追加の確認が必要な場合は、お問い合わせ窓口までご連絡ください。
            本人確認のうえ、合理的な範囲で対応します。
          </p>
        </section>

        <section>
          <h2>8. 未成年の利用</h2>
          <p>
            本アプリは20歳以上の方を対象としています。20歳未満の方は本アプリを利用しないでください。
            飲酒は法令を守り、節度を持って楽しみましょう。
          </p>
        </section>

        <section>
          <h2>9. ポリシーの変更</h2>
          <p>
            運営者は、必要に応じて本ポリシーを変更することがあります。
            重要な変更がある場合は、本ページまたは本アプリ内で通知します。
            変更後のポリシーは、本ページに掲載した時点から効力を生じます。
          </p>
        </section>

        <section>
          <h2>10. お問い合わせ</h2>
          <p>
            本ポリシーに関するお問い合わせ、データ削除の依頼、その他プライバシーに関するご相談は、
            <a href={CONTACT_FORM_URL} target="_blank" rel="noreferrer">
              お問い合わせフォーム
            </a>
            からご連絡ください。
          </p>
        </section>
      </article>
    </main>
  );
}
