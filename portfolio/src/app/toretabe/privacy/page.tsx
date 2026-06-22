import type { Metadata } from 'next';
import Link from 'next/link';

const CONTACT_FORM_URL = 'https://forms.gle/7FKcm5zv6F6Ci8Wa6';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | とれたべ',
  description: '家庭菜園のための収穫後アプリ「とれたべ」のプライバシーポリシーです。',
};

export default function ToretabePrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-page__background" aria-hidden="true" />
      <div className="legal-page__container">
        <nav className="legal-page__nav" aria-label="とれたべ">
          <Link href="/toretabe/" className="legal-page__brand">
            <span className="legal-page__brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M20 3c-9 0-15 5-15 12 0 3 1 5 2 6 5-1 9-4 11-8 1-2 2-6 2-10z" />
                <path d="M7 20 15 10" />
              </svg>
            </span>
            とれたべ
          </Link>
          <Link href="/toretabe/terms/" className="legal-page__nav-link">
            利用規約
          </Link>
        </nav>

        <header className="legal-page__hero">
          <p className="legal-page__eyebrow">Privacy Policy</p>
          <h1>プライバシーポリシー</h1>
          <p>
            このプライバシーポリシーは、iOSアプリ「とれたべ」における利用者情報の取得、利用、管理について説明するものです。
          </p>
          <span>最終更新日：2026年4月21日</span>
        </header>

        <article className="legal-page__card">
          <section>
            <h2>1. 取得する情報</h2>
            <p>本アプリでは、提供する機能に応じて、以下の情報を取得または保存する場合があります。</p>
            <ul>
              <li>アカウント情報：ユーザーID、表示名、メールアドレス、認証プロバイダ情報など</li>
              <li>プロフィール情報：アイコン画像、自己紹介、公開設定など利用者が登録した情報</li>
              <li>家庭菜園・収穫に関する記録：野菜名、栽培状況、収穫日、収穫量、保存状態、料理記録、メモ、評価など</li>
              <li>画像データ：プロフィール画像、チーム画像、収穫・料理・投稿に添付された写真など</li>
              <li>共有・投稿に関する情報：チーム、投稿、コメント、フォロー、通知、公開範囲に関する情報など</li>
              <li>AI提案に必要な情報：利用者が入力した条件、栽培・収穫・料理に関する履歴、提案履歴など</li>
              <li>広告・利用状況・診断に関する情報：広告表示に関する情報、端末情報、クラッシュ情報、通信ログなど</li>
              <li>お問い合わせ情報：問い合わせ内容、返信先、対応履歴など</li>
            </ul>
          </section>

          <section>
            <h2>2. 利用目的</h2>
            <p>取得した情報は、以下の目的で利用します。</p>
            <ul>
              <li>本アプリの提供、本人確認、アカウント管理、データ同期のため</li>
              <li>収穫記録、保存管理、料理記録、チーム共有、投稿などの機能を提供するため</li>
              <li>利用者の記録や設定に合わせた献立提案、栽培候補の提案などを行うため</li>
              <li>広告の表示、広告品質の維持、不正利用防止のため</li>
              <li>不具合調査、品質改善、機能改善、セキュリティ確保のため</li>
              <li>お問い合わせ対応、重要なお知らせ、規約変更などの連絡のため</li>
              <li>法令または公的機関からの正当な要請に対応するため</li>
            </ul>
          </section>

          <section>
            <h2>3. 外部サービスの利用</h2>
            <p>
              本アプリでは、認証、データ保存、画像配信、AI提案、広告配信などのため、以下の外部サービスを利用する場合があります。
              これらのサービスでは、各提供者のポリシーに基づき情報が取り扱われます。
            </p>
            <ul>
              <li>Firebase Authentication / Cloud Firestore / Firebase関連サービス</li>
              <li>Appleでサインイン、Google Sign-In</li>
              <li>Cloudflare Workers / Cloudflare R2</li>
              <li>AI提案機能を提供するためのAI API</li>
              <li>Google AdMob / Google Mobile Ads SDK</li>
            </ul>
          </section>

          <section>
            <h2>4. 第三者提供</h2>
            <p>
              運営者は、法令に基づく場合、利用者の同意がある場合、外部サービスの提供に必要な範囲で委託先に取り扱いを委託する場合を除き、利用者の個人情報を第三者に提供しません。
              チーム共有、投稿、コメント、フォローなど利用者自身が共有・公開を選択した情報は、設定された公開範囲内の他の利用者に表示される場合があります。
            </p>
          </section>

          <section>
            <h2>5. AI提案に関する情報の取り扱い</h2>
            <p>
              AI提案機能では、献立や栽培候補を生成するため、利用者が入力した条件、記録、好み、収穫物の情報などを外部のAI APIへ送信する場合があります。
              送信する情報は、提案生成に必要な範囲に限定するよう努めますが、個人を特定できる情報や機微な情報を入力しないようご注意ください。
            </p>
          </section>

          <section>
            <h2>6. 広告について</h2>
            <p>
              本アプリでは、Google AdMobなどの広告配信サービスを利用する場合があります。
              広告配信事業者は、広告表示、効果測定、不正利用防止などの目的で、端末情報、広告識別子、利用状況に関する情報を取得する場合があります。
              端末の設定により、広告トラッキングに関する選択を変更できる場合があります。
            </p>
          </section>

          <section>
            <h2>7. 情報の保存期間</h2>
            <p>
              利用者の情報は、本アプリの提供、アカウント管理、法令対応、紛争対応、セキュリティ確保に必要な期間保存します。
              アカウント削除やデータ削除の依頼があった場合、法令上または運営上保持が必要な情報を除き、合理的な期間内に削除または匿名化します。
            </p>
          </section>

          <section>
            <h2>8. 安全管理</h2>
            <p>
              運営者は、利用者情報の漏えい、滅失、毀損、不正アクセスを防止するため、合理的な安全管理措置を講じます。
              ただし、インターネット通信や外部サービスを利用する性質上、完全な安全性を保証するものではありません。
            </p>
          </section>

          <section>
            <h2>9. 国外での取り扱い</h2>
            <p>
              本アプリで利用する外部サービスの提供者は、日本国外に所在する場合があります。
              そのため、利用者情報が日本国外で保存または処理される場合があります。
            </p>
          </section>

          <section>
            <h2>10. 未成年の利用</h2>
            <p>
              未成年の利用者が本アプリを利用する場合は、保護者の同意を得たうえで利用してください。
              保護者から未成年者の情報に関するお問い合わせがあった場合、本人確認のうえ、合理的な範囲で対応します。
            </p>
          </section>

          <section>
            <h2>11. 開示・訂正・削除等の請求</h2>
            <p>
              利用者は、法令に基づき、自己の個人情報について、開示、訂正、追加、削除、利用停止、第三者提供の停止などを求めることができます。
              ご希望の場合は、お問い合わせ窓口までご連絡ください。本人確認のうえ、合理的な範囲で対応します。
            </p>
          </section>

          <section>
            <h2>12. ポリシーの変更</h2>
            <p>
              運営者は、必要に応じて本ポリシーを変更することがあります。
              重要な変更がある場合は、本ページまたは本アプリ内で通知します。
              変更後のポリシーは、本ページに掲載した時点から効力を生じます。
            </p>
          </section>

          <section>
            <h2>13. お問い合わせ</h2>
            <p>
              本ポリシーに関するお問い合わせ、データ削除の依頼、その他プライバシーに関するご相談は、
              <a href={CONTACT_FORM_URL} target="_blank" rel="noreferrer">
                お問い合わせフォーム
              </a>
              からご連絡ください。
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
