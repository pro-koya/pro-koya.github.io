import Image from 'next/image';
import Link from 'next/link';

// 公開後にここへ App Store のURLを入れると、CTAが自動でダウンロードボタンに変わります。
// 例: 'https://apps.apple.com/jp/app/dogwalk/id0000000000'
const APP_STORE_URL: string | null = null;

const SHOT = { width: 1320, height: 2868 };

const features = [
  {
    icon: '🗺️',
    title: 'GPSルート記録',
    body: '開始ボタンひとつで、ルート・距離・時間・ペースを自動記録。画面をロックしてポケットに入れても、記録は止まりません。',
  },
  {
    icon: '💩',
    title: '健康ログ',
    body: 'うんちの状態（獣医学で使われるPurinaスケール1〜7）やおしっこ、水飲みまでワンタップ。気づきにくい変化を見逃しません。',
  },
  {
    icon: '🎙️',
    title: '声でハンズフリー記録',
    body: 'リードを持ったまま「うんちした、ちょっとゆるめ」と話すだけ。AIが内容を聞き取って、自動で記録に変換します。',
  },
  {
    icon: '📊',
    title: '統計とストリーク',
    body: '今日・今週・今月の距離やカロリーをグラフで。続いた日には肉球スタンプ。散歩の習慣が、目に見えて積み上がります。',
  },
  {
    icon: '🩺',
    title: '獣医さんに見せられるレポート',
    body: '直近90日の運動量と健康ログをまとめたPDFを生成。診察室で「最近どうですか？」に、記録で答えられます。',
  },
  {
    icon: '🎨',
    title: 'シェアカード & AI似顔絵',
    body: '今日のルートとスタッツを、SNS映えするカードに自動レイアウト。うちの子のAI似顔絵をアイコンにもできます。',
  },
];

const steps = [
  {
    title: '愛犬を登録',
    body: '名前と犬種を入れるだけ。アカウント登録は不要です。犬種から1日に必要な運動量の目安も自動で表示されます。',
  },
  {
    title: '散歩をはじめる',
    body: '大きな緑のボタンを押したら、あとは歩くだけ。記録したいことがあれば、ワンタップか声でどうぞ。',
  },
  {
    title: '振り返る',
    body: 'ルート地図・距離・消費カロリー・健康ログが自動で整理。週・月のグラフとストリークで、頑張りが見えます。',
  },
];

const prices = [
  {
    name: '無料',
    amount: '¥0',
    unit: '',
    note: 'ずっと無料。アカウント登録も不要です。',
    items: [
      'GPS散歩記録（回数無制限）',
      '健康ログ・音声記録（月10回）',
      '直近30日の履歴と統計',
      '愛犬2頭まで',
    ],
    featured: false,
  },
  {
    name: 'プレミアム',
    amount: '¥600',
    unit: '／月',
    note: '年額プラン ¥4,800（月あたり¥400）。いつでも解約できます。',
    items: [
      '全期間の履歴・統計グラフ',
      '音声記録 無制限',
      '獣医さん向けPDFレポート',
      '3頭目以降の登録・広告非表示',
    ],
    featured: true,
    badge: 'おすすめ',
  },
];

const faqs = [
  {
    q: 'アカウント登録は必要ですか？',
    a: 'いいえ。ダウンロードしてすぐ使えます。散歩や健康の記録はすべてあなたのiPhoneの中にだけ保存され、外部のサーバーには送信されません。',
  },
  {
    q: '画面をロックしても記録は続きますか？',
    a: 'はい。散歩中はポケットにしまって大丈夫です。バックグラウンドでもGPS記録が続きます（位置情報の許可が必要です）。',
  },
  {
    q: '多頭飼いでも使えますか？',
    a: 'はい。無料で2頭まで、プレミアムなら3頭以上登録できます。運動量やカロリーは、それぞれの子の体重・犬種に合わせて計算されます。',
  },
  {
    q: 'サブスクリプションの解約方法は？',
    a: 'iPhoneの「設定 ＞ あなたの名前 ＞ サブスクリプション」からいつでも解約できます。無料トライアル中に解約すれば料金はかかりません。',
  },
  {
    q: '健康に関する表示は診断ですか？',
    a: 'いいえ。本アプリの健康表示（便スコア・暑さリスク・レポート等）は記録と目安であり、獣医学的な診断ではありません。気になる症状があるときは、必ず獣医師にご相談ください。',
  },
];

function PrimaryCta({ className = '' }: { className?: string }) {
  if (APP_STORE_URL) {
    return (
      <a
        className={`dw-button dw-button--primary ${className}`}
        href={APP_STORE_URL}
        target="_blank"
        rel="noreferrer"
      >
        App Storeでダウンロード
      </a>
    );
  }
  return <span className="dw-soon">🐾 まもなく App Store で公開</span>;
}

function Shot({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={SHOT.width}
      height={SHOT.height}
      sizes="(max-width: 640px) 78vw, 310px"
      priority={priority}
    />
  );
}

export default function DogWalkPage() {
  return (
    <main className="dw-page">
      <nav className="dw-nav" aria-label="サイトナビゲーション">
        <Link href="/dogwalk/" className="dw-brand">
          <Image
            src="/assets/media/dogwalk/icon-rounded.png"
            alt=""
            width={34}
            height={34}
          />
          <span>DogWalk</span>
        </Link>
        <div className="dw-nav__links">
          <a href="#features">機能</a>
          <a href="#price">料金</a>
          <a href="#faq">FAQ</a>
          <Link href="/dogwalk/help/">ヘルプ</Link>
          <a className="dw-nav__cta" href="#download">
            ダウンロード
          </a>
        </div>
      </nav>

      <section className="dw-hero">
        <div className="dw-hero__copy">
          <p className="dw-eyebrow">Dog Walk × Health Log</p>
          <h1>
            毎日の散歩が、
            <br />
            うちの子の<em>健康記録</em>になる。
          </h1>
          <p className="dw-hero__lead">
            GPSでルートと距離を自動記録。うんちの状態も、水を飲んだことも、ワンタップか声でログ。
            散歩の積み重ねが、獣医さんに見せられる記録に変わります。
          </p>
          <div className="dw-hero__actions">
            <PrimaryCta />
            <a className="dw-button dw-button--ghost" href="#features">
              機能を見る
            </a>
          </div>
          <p className="dw-hero__note">
            iPhone対応 ／ アカウント登録不要 ／ 基本機能はずっと無料
          </p>
        </div>
        <div className="dw-hero__visual">
          <div className="dw-phone dw-phone--tilt">
            <Shot
              src="/assets/media/dogwalk/shot-home.png"
              alt="DogWalk ホーム画面 — 今日の運動量と週間ストリーク"
              priority
            />
            <span className="dw-float dw-float--paw">🐾 5日連続！</span>
            <span className="dw-float dw-float--km">📍 9.74 km / 今週</span>
          </div>
        </div>
      </section>

      <section className="dw-section">
        <div className="dw-concept">
          <p className="dw-eyebrow">Concept</p>
          <h2>
            「歩いた」だけで終わらせない。
            <br />
            散歩は、いちばん身近な健康チェック。
          </h2>
          <p>
            犬は不調を言葉にできません。だから、毎日の散歩で残せるサイン——歩いた距離、うんちの状態、
            水を飲んだ回数——が、何よりの手がかりになります。DogWalkは、リードを持つ手を止めずに
            それを残せるようにつくった、散歩のための健康記録アプリです。
          </p>
        </div>
      </section>

      <section className="dw-section" id="features">
        <div className="dw-section__head">
          <p className="dw-eyebrow">Features</p>
          <h2>散歩のじゃまをしない、6つの機能。</h2>
          <p>
            記録のための操作は最小限に。歩くこと、うちの子と過ごす時間が主役のままでいられるように設計しています。
          </p>
        </div>
        <div className="dw-features">
          {features.map((f) => (
            <article className="dw-feature" key={f.title}>
              <span className="dw-feature__icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dw-section dw-section--center" id="screens">
        <div className="dw-section__head">
          <p className="dw-eyebrow">Screens</p>
          <h2>記録は、見返したくなるかたちで。</h2>
        </div>
        <div className="dw-shots">
          <figure>
            <div className="dw-phone">
              <Shot
                src="/assets/media/dogwalk/shot-walk.png"
                alt="散歩中の画面 — 地図にルートが描かれ、ワンタップで記録"
              />
            </div>
            <figcaption>散歩中はワンタップ記録</figcaption>
          </figure>
          <figure>
            <div className="dw-phone">
              <Shot
                src="/assets/media/dogwalk/shot-detail.png"
                alt="散歩の詳細 — ルート地図・距離・消費カロリー・健康ログ"
              />
            </div>
            <figcaption>ルートとカロリーを自動整理</figcaption>
          </figure>
          <figure>
            <div className="dw-phone">
              <Shot
                src="/assets/media/dogwalk/shot-stats.png"
                alt="統計画面 — 週間の距離グラフ"
              />
            </div>
            <figcaption>週・月のグラフで振り返り</figcaption>
          </figure>
        </div>
      </section>

      <section className="dw-section" id="how">
        <div className="dw-section__head">
          <p className="dw-eyebrow">How it works</p>
          <h2>はじめかたは、3ステップ。</h2>
        </div>
        <div className="dw-steps">
          {steps.map((s, i) => (
            <article className="dw-step" key={s.title}>
              <span className="dw-step__num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dw-section">
        <div className="dw-safety">
          <div>
            <p className="dw-eyebrow">Safety</p>
            <h2 style={{ margin: '0 0 12px', fontWeight: 900, fontSize: 'clamp(24px,3vw,32px)', lineHeight: 1.45 }}>
              夏の散歩の「大丈夫？」に、
              <br />
              数字で答える。
            </h2>
            <p style={{ color: 'var(--ink-soft)', margin: 0 }}>
              散歩開始時の気温・湿度・日射から路面温度（約◯◯℃）を推定し、肉球のやけどや熱中症のリスクを3段階で表示。
              危険なときは「早朝か日没後に」といった具体的な行動と、地面に手の甲を当てる“5秒チェック”まで案内します。
              パグやフレンチブルドッグなどの短頭種は、より慎重な基準で判定します。
            </p>
            <div className="dw-safety__badges">
              <span className="dw-badge dw-badge--green">☀️ 快適</span>
              <span className="dw-badge dw-badge--sun">⚠️ 注意</span>
              <span className="dw-badge dw-badge--coral">🔥 危険</span>
              <span className="dw-badge dw-badge--sky">🐾 路面温度を数値で</span>
              <span className="dw-badge dw-badge--sky">🐶 短頭種は厳しめ判定</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="dw-phone" style={{ width: 'min(250px, 70vw)' }}>
              <Shot
                src="/assets/media/dogwalk/shot-history.png"
                alt="履歴画面 — 散歩の一覧と天気・暑さ表示"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="dw-section dw-section--center" id="price">
        <div className="dw-section__head">
          <p className="dw-eyebrow">Price</p>
          <h2>まずは無料で、ぜんぶの散歩を。</h2>
          <p>毎日の記録は無料のまま。もっと深く振り返りたくなったら、プレミアムへ。</p>
        </div>
        <div className="dw-prices">
          {prices.map((p) => (
            <article
              className={`dw-price${p.featured ? ' dw-price--featured' : ''}`}
              key={p.name}
            >
              {p.badge ? <span className="dw-price__badge">{p.badge}</span> : null}
              <h3>{p.name}</h3>
              <div className="dw-price__amount">
                {p.amount}
                <small>{p.unit}</small>
              </div>
              <p className="dw-price__note">{p.note}</p>
              <ul>
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="dw-section" id="faq">
        <div className="dw-section__head">
          <p className="dw-eyebrow">FAQ</p>
          <h2>よくある質問</h2>
        </div>
        <div className="dw-faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="dw-section" id="download">
        <div className="dw-final">
          <Image
            src="/assets/media/dogwalk/icon.png"
            alt="DogWalk アプリアイコン"
            width={96}
            height={96}
          />
          <h2>今日の散歩から、はじめよう。</h2>
          <p>アカウント登録なし。開いて、ボタンを押して、歩くだけ。</p>
          <PrimaryCta />
        </div>
      </section>

      <footer className="dw-footer">
        <span>© {new Date().getFullYear()} Miyabayasi Koya</span>
        <div className="dw-footer__links">
          <Link href="/dogwalk/help/">ヘルプ・使い方</Link>
          <Link href="/dogwalk/privacy/">プライバシーポリシー</Link>
          <Link href="/dogwalk/terms/">利用規約</Link>
          <Link href="/">制作者について</Link>
        </div>
      </footer>
    </main>
  );
}
