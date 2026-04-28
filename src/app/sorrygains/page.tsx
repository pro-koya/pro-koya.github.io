import Image from 'next/image';
import Link from 'next/link';

const CONTACT_FORM_URL = 'https://forms.gle/7FKcm5zv6F6Ci8Wa6';

const features = [
  {
    title: '飲酒を記録',
    body: 'ビール、日本酒、ワインなどを選び、量を入れるだけ。夜の記録を短い操作で残せます。',
  },
  {
    title: '筋肉ごめん度',
    body: '飲酒量や体重などから、今日の筋肉への謝罪レベルをエンタメとして表示します。',
  },
  {
    title: '回復目安',
    body: '水分補給、睡眠、ストレッチなど、翌日に向けたリカバリー行動を静かに促します。',
  },
  {
    title: '仙人のひとこと',
    body: '説教ではなく、少しだけ刺さる言葉でトレーニングとの付き合い方を整えます。',
  },
  {
    title: 'Liftly連携',
    body: '任意でLiftlyのトレーニング要約を同期し、より状況に合った表示にできます。',
  },
  {
    title: '広告・トラッキングなし',
    body: 'データを広告やトラッキング目的で利用しない方針を、プライバシーポリシーに明記しています。',
  },
];

const steps = [
  {
    label: '01',
    title: '飲んだ内容を残す',
    body: '飲酒量、体重、トレーニング頻度などを入力。基本記録は端末内に保存されます。',
  },
  {
    label: '02',
    title: '結果を見る',
    body: '筋肉ごめん度、努力回収率、回復目安を確認。数字は医学的判定ではなく、体験演出です。',
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
    <span className={`sg-button sg-button--primary ${className}`} aria-disabled="true">
      App Store公開予定
    </span>
  );
}

function PhoneMock() {
  return (
    <div className="sg-phone" aria-label="筋肉ごめんの画面イメージ">
      <div className="sg-phone__speaker" />
      <div className="sg-phone__screen">
        <div className="sg-app-top">
          <span>今夜の謝罪</span>
          <strong>筋肉ごめん</strong>
        </div>
        <div className="sg-score">
          <span>筋肉ごめん度</span>
          <strong>74</strong>
          <small>やや深めの謝罪</small>
        </div>
        <div className="sg-meter" aria-hidden="true">
          <span style={{ width: '74%' }} />
        </div>
        <div className="sg-stat-grid">
          <div>
            <span>努力回収率</span>
            <strong>62%</strong>
          </div>
          <div>
            <span>回復目安</span>
            <strong>10h</strong>
          </div>
        </div>
        <div className="sg-sage-mini">
          <Image
            src="/assets/media/sorrygains/sage.png"
            alt=""
            width={180}
            height={225}
            aria-hidden="true"
          />
          <p>謝るだけで終わらぬ者が、明日のセットを救う。</p>
        </div>
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
          <Link href="/sorrygains/privacy/">Privacy Policy</Link>
        </div>
      </nav>

      <section className="sg-hero">
        <div className="sg-hero__copy">
          <p className="sg-eyebrow">Entertainment Fitness Log</p>
          <h1>筋肉ごめん</h1>
          <p className="sg-hero__tagline">飲んだ夜の筋肉に、そっと謝る。</p>
          <p className="sg-hero__lead">
            飲酒記録から、筋肉ごめん度・努力回収率・回復目安を楽しく表示するiOSアプリ。
            罪悪感を、少し笑える記録に変えます。
          </p>
          <div className="sg-hero__actions">
            <AppStoreButton />
            <Link className="sg-button sg-button--ghost" href="/sorrygains/privacy/">
              プライバシーポリシー
            </Link>
          </div>
        </div>
        <div className="sg-hero__visual" aria-hidden="true">
          <Image
            className="sg-hero__icon"
            src="/assets/media/sorrygains/icon.png"
            alt=""
            width={360}
            height={360}
            priority
          />
          <PhoneMock />
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
        <PhoneMock />
        <div className="sg-showcase__text">
          <p className="sg-eyebrow">App Experience</p>
          <h2>夜の静けさに合う、重めのダークUI。</h2>
          <p>
            深いネイビー、チャコール、琥珀色のアクセントで、酒の温かさと筋トレの損失感を表現。
            面白さは派手な装飾ではなく、結果の瞬間とコピーで出します。
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
          <Link href="/sorrygains/privacy/">Privacy Policy</Link>
          <a href={CONTACT_FORM_URL} target="_blank" rel="noreferrer">
            Contact
          </a>
        </div>
      </footer>
    </main>
  );
}
