import Image from 'next/image';
import Link from 'next/link';

const CONTACT_FORM_URL = 'https://forms.gle/7FKcm5zv6F6Ci8Wa6';
const APP_STORE_URL = 'https://apps.apple.com/app/id6763986050';

const features = [
  {
    title: '飲酒を記録',
    body: 'ビール、日本酒、ワイン、ハイボールなどを選び、量と度数を入れるだけ。10秒で夜の記録が残せます。',
  },
  {
    title: '怒りレベル',
    body: '飲酒量に応じて筋肉キャラの怒りが5段階で変化。今日のあなたの飲み方を、表情で本音にして返します。',
  },
  {
    title: '翌日リカバリー',
    body: '筋トレ・プロテイン・ストレッチ・睡眠などのお詫び行動を記録するたび、怒りスコアが下がっていきます。',
  },
  {
    title: '筋トレ仙人',
    body: '説教ではなく、少しだけ刺さる言葉でトレーニングとの付き合い方を整える、仙人のひとこと。',
  },
  {
    title: '飲み会モード',
    body: '一晩を丸ごと記録するモード。経過時間・杯数をリアルタイム表示し、終了時にセッションレポートを生成します。',
  },
  {
    title: 'Liftly連携 & Muscle360 Pro',
    body: '任意でLiftlyのトレーニング要約を同期。筋トレした日に飲むと、ダメージ計算がよりリアルになります。Muscle360 Pro バンドルなら、1つの購読で Forge・Liftly・筋肉ごめんの Pro 機能が使えます。',
  },
];

const steps = [
  {
    label: '01',
    title: '飲んだ内容を残す',
    body: 'お酒の種類、量、度数を選んで「筋肉に報告する」。基本記録は端末内に保存されます。',
  },
  {
    label: '02',
    title: '結果を見る',
    body: '怒りレベル・筋トレ成果減少度・影響スコアを確認。数字は医学的判定ではなく、体験演出です。',
  },
  {
    label: '03',
    title: '必要ならデータ同期',
    body: 'Liftly連携を使う場合だけ、認証情報とトレーニング要約をアプリ機能のために扱います。',
  },
];

const faqs = [
  {
    q: '医学的なアドバイスですか？',
    a: 'いいえ。表示される数値や助言はエンターテインメント目的です。健康に関する判断は医師などの専門家にご相談ください。',
  },
  {
    q: '20歳未満でも使えますか？',
    a: '本アプリは20歳以上の方を対象としています。飲酒は節度を持って楽しみましょう。',
  },
  {
    q: 'Liftly連携しなくても使えますか？',
    a: 'はい。飲酒記録、結果表示、リカバリー行動などの基本機能はLiftly連携なしで利用できます。',
  },
  {
    q: 'データは外部に送信されますか？',
    a: '基本記録は端末内に保存されます。任意でLiftly連携を利用する場合のみ、認証とトレーニング要約の取得が発生します。',
  },
];

function AppStoreButton({ className = '' }: { className?: string }) {
  return (
    <a
      className={`sg-button sg-button--primary ${className}`}
      href={APP_STORE_URL}
      target="_blank"
      rel="noreferrer"
    >
      App Storeでダウンロード
    </a>
  );
}

function PhoneFrame({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="sg-phone sg-phone--photo" aria-label={alt}>
      <div className="sg-phone__speaker" />
      <div className="sg-phone__screen">
        <Image
          className="sg-phone__shot"
          src={src}
          alt={alt}
          width={1206}
          height={2622}
          sizes="(max-width: 640px) 80vw, 332px"
          priority={priority}
        />
      </div>
    </div>
  );
}

export default function SorryGainsPage() {
  return (
    <main className="sg-page">
      <nav className="sg-nav" aria-label="サイトナビゲーション">
        <Link href="/sorrygains/" className="sg-brand">
          <Image src="/assets/media/sorrygains/icon.png" alt="" width={34} height={34} />
          <span>筋肉ごめん</span>
        </Link>
        <div className="sg-nav__links">
          <a href="#features">機能</a>
          <a href="#privacy">プライバシー</a>
          <a href="#faq">FAQ</a>
          <Link href="/muscle360/">Muscle360</Link>
          <Link href="/sorrygains/privacy/">Privacy Policy</Link>
        </div>
      </nav>

      <section className="sg-hero">
        <div className="sg-hero__copy">
          <p className="sg-eyebrow">Entertainment Fitness Log</p>
          <h1>筋肉ごめん</h1>
          <p className="sg-hero__tagline">飲んだ夜の筋肉に、そっと謝る。</p>
          <p className="sg-hero__lead">
            飲酒量に応じて筋肉キャラが怒り出す、エンタメ系の飲酒記録アプリ。
            罪悪感を、少し笑える記録に変えます。App Storeで配信中。
          </p>
          <div className="sg-hero__actions">
            <AppStoreButton />
            <Link className="sg-button sg-button--ghost" href="/sorrygains/privacy/">
              プライバシーポリシー
            </Link>
          </div>
        </div>
        <div className="sg-hero__visual">
          <Image
            className="sg-hero__icon"
            src="/assets/media/sorrygains/icon.png"
            alt=""
            width={360}
            height={360}
            aria-hidden="true"
          />
          <PhoneFrame
            src="/assets/media/sorrygains/home-lv3.png"
            alt="筋肉ごめん ホーム画面 怒りレベル3"
            priority
          />
        </div>
      </section>

      <section className="sg-section sg-concept" id="concept">
        <div className="sg-section__head">
          <p className="sg-eyebrow">Concept</p>
          <h2>罪悪感を、ちょっと笑える記録に。</h2>
        </div>
        <p>
          筋肉ごめんは、飲酒とトレーニングの関係をユーモラスに表現するエンターテインメントアプリです。
          健康管理アプリのように説教するのではなく、夜の余韻と翌日のリカバリーを、静かで少し変な数字にします。
        </p>
      </section>

      <section className="sg-section" id="features">
        <div className="sg-section__head">
          <p className="sg-eyebrow">Features</p>
          <h2>まじめに記録して、まじめに謝る。</h2>
        </div>
        <div className="sg-feature-grid">
          {features.map((feature) => (
            <article className="sg-feature" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sg-section sg-flow">
        <div className="sg-section__head">
          <p className="sg-eyebrow">How It Works</p>
          <h2>記録、結果、必要なときだけ同期。</h2>
        </div>
        <div className="sg-steps">
          {steps.map((step) => (
            <article className="sg-step" key={step.label}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sg-section sg-showcase" aria-label="画面イメージ">
        <PhoneFrame
          src="/assets/media/sorrygains/input.png"
          alt="筋肉ごめん 飲酒入力画面"
        />
        <div className="sg-showcase__text">
          <p className="sg-eyebrow">App Experience</p>
          <h2>夜の静けさに合う、重めのダークUI。</h2>
          <p>
            深いネイビー、チャコール、琥珀色のアクセントで、酒の温かさと筋トレの損失感を表現。
            お酒の種類・量・度数を選んで「筋肉に報告する」だけ。面白さは派手な装飾ではなく、結果の瞬間とコピーで出します。
          </p>
        </div>
      </section>

      <section className="sg-section sg-privacy" id="privacy">
        <div>
          <p className="sg-eyebrow">Privacy</p>
          <h2>基本記録は端末内。連携は任意。</h2>
        </div>
        <div className="sg-privacy__body">
          <p>
            飲酒記録、体重、週のトレーニング回数、リカバリー行動は端末内に保存されます。
            任意でLiftly連携を利用する場合、Apple/Google/Supabase認証によりメールアドレスとユーザーIDが扱われ、
            Liftlyのトレーニング要約をアプリ機能のために取得します。
          </p>
          <p>本アプリは、ユーザーのデータを第三者広告やトラッキング目的で利用しません。</p>
          <Link className="sg-button sg-button--secondary" href="/sorrygains/privacy/">
            プライバシーポリシーを読む
          </Link>
        </div>
      </section>

      <section className="sg-section" id="faq">
        <div className="sg-section__head">
          <p className="sg-eyebrow">FAQ</p>
          <h2>よくある質問</h2>
        </div>
        <div className="sg-faq-list">
          {faqs.map((faq) => (
            <article className="sg-faq" key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sg-final">
        <h2>今日の筋肉には、今日のうちに謝っておく。</h2>
        <div className="sg-final__actions">
          <AppStoreButton />
          <a className="sg-button sg-button--ghost" href={CONTACT_FORM_URL} target="_blank" rel="noreferrer">
            お問い合わせ
          </a>
        </div>
      </section>

      <footer className="sg-footer">
        <span>© 2026 筋肉ごめん</span>
        <div>
          <Link href="/muscle360/">Muscle360</Link>
          <Link href="/sorrygains/privacy/">Privacy Policy</Link>
          <Link href="/">制作: Miyabayasi Koya</Link>
          <a href={CONTACT_FORM_URL} target="_blank" rel="noreferrer">
            Contact
          </a>
        </div>
      </footer>
    </main>
  );
}
