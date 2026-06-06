import Image from 'next/image';
import Link from 'next/link';

// 公開後にここへ App Store のURLを入れると、CTAが自動でダウンロードボタンに変わります。
// 例: 'https://apps.apple.com/jp/app/aruki/id0000000000'
const APP_STORE_URL: string | null = null;

const SHOT = {
  width: 1284,
  height: 2778,
};

const features = [
  {
    mark: '速歩 / ゆっくり',
    title: 'インターバル速歩エンジン',
    body: '速歩3分・ゆっくり3分 ×5＝30分。音声・チャイム・触覚で次のフェーズを案内。残り3秒のカウントダウン付き。バックグラウンドやロック中も再生されます。',
  },
  {
    mark: 'Apple ヘルスケア',
    title: 'ゾーン2を見える化',
    body: '心拍を読み取りゾーン2（有酸素の最適域）を判定。完了したセッションはワークアウトとして書き込まれ、アクティビティリングに反映されます。',
  },
  {
    mark: '非懲罰ストリーク',
    title: '続いた日が、きれいに残る',
    body: '今日できなくても、昨日までの連続は消えません。直近28日のカレンダーで、自分のリズムを穏やかに見守れます。',
  },
  {
    mark: 'Swift Charts',
    title: '記録と振り返り',
    body: '週ごとの運動量・累計・最長連続を可視化。Proでは無制限の履歴と詳細な分析が見られます。',
  },
  {
    mark: 'Widget / Live Activity',
    title: 'ホームとロック画面に',
    body: '連続日数・今週の歩み・季節をウィジェットに。セッション中はDynamic Islandに残り時間と心拍を表示します。',
  },
  {
    mark: '二十四節気',
    title: '和の季節とともに',
    body: '歩みを日本の二十四節気と重ねて表示。ホームの円環とウィジェットが、季節の移ろいをそっと添えます。',
  },
];

const steps = [
  {
    label: '01',
    title: 'プランを選ぶ',
    body: 'はじめて / 標準（信州大式30分）/ 標準＋ / しっかり。Proなら自分用のカスタムプランも作れます。',
  },
  {
    label: '02',
    title: '歩きはじめる',
    body: '画面を見続ける必要はありません。耳をあずけて、リングと音声に合わせて速歩とゆっくりを繰り返すだけ。',
  },
  {
    label: '03',
    title: '記録が残る',
    body: 'セッションは端末内に保存。許可すればAppleヘルスケアにも書き込まれ、連続日数とウィジェットが更新されます。',
  },
];

const prices = [
  {
    name: '月額',
    amount: '¥980',
    unit: '／月',
    note: '価格アンカー。いつでも解約できます。',
    featured: false,
  },
  {
    name: '年額',
    amount: '¥4,800',
    unit: '／年',
    note: '7日間の無料トライアル付き。月あたり約¥400。継続課金の本命プラン。',
    featured: true,
    badge: 'おすすめ',
  },
  {
    name: '買い切り',
    amount: '¥9,800',
    unit: '',
    note: '一度の購入でずっと使えます。サブスクが苦手な方に。',
    featured: false,
  },
];

const faqs = [
  {
    q: '日本式インターバル速歩とは？',
    a: '速歩3分・ゆっくり3分を交互に5セット（計30分）繰り返す歩き方です。信州大学・能勢博教授の研究に由来する有酸素運動（Zone2）の方法として、体力づくりの観点から広く知られています。',
  },
  {
    q: 'Apple Watchがないと使えませんか？',
    a: 'いいえ。iPhone単体ですべての機能が動きます。Apple Watch / ヘルスケアの心拍連携は任意で、より正確なゾーン2判定に役立ちます。',
  },
  {
    q: '無料でどこまで使えますか？',
    a: 'インターバルタイマー・音声ガイド・基本のストリーク・直近の履歴は無料でご利用いただけます。心拍ゾーン分析・無制限履歴・カスタムプラン・季節テーマがAruki Proの機能です。',
  },
  {
    q: 'データは外部に送信されますか？',
    a: 'いいえ。健康データを含むすべての記録は端末内でのみ処理され、外部サーバーには送信しません。アカウント登録も不要です。',
  },
  {
    q: '医学的なアドバイスですか？',
    a: 'いいえ。本アプリは医療機器ではなく、表示される情報は一般的な目安です。持病がある方や運動に不安がある方は、開始前に医師にご相談ください。',
  },
  {
    q: 'サブスクリプションはいつでも解約できますか？',
    a: 'はい。「設定 App ＞ あなたの名前 ＞ サブスクリプション」からいつでも管理・解約できます。年額の無料トライアルは、終了の24時間前までに解約すれば請求されません。',
  },
];

function PrimaryCta({ className = '' }: { className?: string }) {
  if (APP_STORE_URL) {
    return (
      <a
        className={`ar-button ar-button--primary ${className}`}
        href={APP_STORE_URL}
        target="_blank"
        rel="noreferrer"
      >
        App Storeでダウンロード
      </a>
    );
  }
  return <span className="ar-soon">まもなく App Store で公開</span>;
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
      className="ar-shot"
      src={src}
      alt={alt}
      width={SHOT.width}
      height={SHOT.height}
      sizes="(max-width: 640px) 88vw, 420px"
      priority={priority}
    />
  );
}

export default function ArukiPage() {
  return (
    <main className="ar-page">
      <nav className="ar-nav" aria-label="サイトナビゲーション">
        <Link href="/aruki/" className="ar-brand">
          <Image src="/assets/media/aruki/icon.png" alt="" width={34} height={34} />
          <span>Aruki 歩</span>
        </Link>
        <div className="ar-nav__links">
          <a href="#features">機能</a>
          <a href="#price">料金</a>
          <a href="#faq">FAQ</a>
          <Link href="/aruki/privacy/">プライバシー</Link>
        </div>
      </nav>

      <section className="ar-hero">
        <div className="ar-hero__copy">
          <p className="ar-eyebrow">Japanese Interval Walking</p>
          <h1 className="ar-mincho">歩 -あるき-</h1>
          <p className="ar-hero__tagline ar-mincho">歩く。それだけで、変わる。</p>
          <p className="ar-hero__lead">
            日本式インターバル速歩（速歩3分・ゆっくり3分 ×5）を、音声ガイドに従って歩くだけ。
            画面を見続ける必要はありません。耳をあずけて、ただ歩く。禅ミニマルなウォーキングコーチです。
          </p>
          <div className="ar-hero__actions">
            <PrimaryCta />
            <Link className="ar-button ar-button--ghost" href="#features">
              機能を見る
            </Link>
          </div>
          <p className="ar-hero__note">iPhone対応 ／ アカウント登録不要 ／ 基本機能は無料</p>
        </div>
        <div className="ar-hero__visual">
          <Shot src="/assets/media/aruki/hero.png" alt="Aruki ホーム画面" priority />
        </div>
      </section>

      <section className="ar-section ar-concept" id="concept">
        <div className="ar-section__head">
          <p className="ar-eyebrow">Concept</p>
          <h2 className="ar-mincho">トレンドの、プレミアムな本拠地。</h2>
        </div>
        <p>
          世界的に広がる &quot;Japanese Walking&quot; を、安っぽいタイマーでも歩数ポイント稼ぎでもなく、
          きちんと続けられる形に。和紙白・墨黒・紅で整えた静かなUIと、信州大式30分プランで、
          「ちゃんとやりたい」という気持ちに、まっすぐ応えます。
        </p>
      </section>

      <section className="ar-section" id="features">
        <div className="ar-section__head">
          <p className="ar-eyebrow">Features</p>
          <h2 className="ar-mincho">考えなくていい。耳をあずけるだけ。</h2>
        </div>
        <div className="ar-feature-grid">
          {features.map((feature) => (
            <article className="ar-feature" key={feature.title}>
              <span className="ar-feature__mark">{feature.mark}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ar-section ar-showcase" aria-label="セッション画面">
        <div className="ar-showcase__text">
          <p className="ar-eyebrow">Session</p>
          <h2 className="ar-mincho">速歩とゆっくりを、3分ずつ。</h2>
          <p>
            大きなリングが今のフェーズと残り時間を示し、速歩への切り替えは音とチャイム、触覚で知らせます。
            等幅の大型タイマーは歩きながらでも一目で読める設計。停止・スキップも片手で完結します。
          </p>
        </div>
        <Shot src="/assets/media/aruki/session.png" alt="Aruki セッション中の画面（速歩 2:55）" />
      </section>

      <section className="ar-section ar-showcase ar-showcase--reverse" aria-label="記録画面">
        <Shot src="/assets/media/aruki/history.png" alt="Aruki 記録・カレンダー画面" />
        <div className="ar-showcase__text">
          <p className="ar-eyebrow">Streak &amp; Records</p>
          <h2 className="ar-mincho">続いた日が、きれいに残る。</h2>
          <p>
            一日休んでも、ゼロには戻りません。直近28日のカレンダーと週別の運動量で、
            自分のペースを穏やかに振り返れます。Proなら無制限の履歴と詳細分析も。
          </p>
        </div>
      </section>

      <section className="ar-section" aria-label="画面ギャラリー">
        <div className="ar-section__head">
          <p className="ar-eyebrow">Screens</p>
          <h2 className="ar-mincho">画面イメージ</h2>
        </div>
        <div className="ar-gallery">
          <Shot src="/assets/media/aruki/home.png" alt="Aruki ホーム画面（連続日数・季節・今日のプラン）" />
          <Shot src="/assets/media/aruki/complete.png" alt="Aruki セッション完了画面" />
          <Shot src="/assets/media/aruki/paywall.png" alt="Aruki Pro 案内画面" />
        </div>
      </section>

      <section className="ar-section ar-flow">
        <div className="ar-section__head">
          <p className="ar-eyebrow">How It Works</p>
          <h2 className="ar-mincho">選んで、歩いて、残るだけ。</h2>
        </div>
        <div className="ar-steps">
          {steps.map((step) => (
            <article className="ar-step" key={step.label}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ar-section" id="price">
        <div className="ar-section__head">
          <p className="ar-eyebrow">Pricing</p>
          <h2 className="ar-mincho">基本は無料。深さで、Aruki Pro。</h2>
        </div>
        <div className="ar-price-grid">
          {prices.map((price) => (
            <article
              className={`ar-price ${price.featured ? 'ar-price--featured' : ''}`}
              key={price.name}
            >
              {price.badge ? <span className="ar-price__badge">{price.badge}</span> : null}
              <h3>{price.name}</h3>
              <p className="ar-price__amount">
                {price.amount}
                {price.unit ? <small>{price.unit}</small> : null}
              </p>
              <p>{price.note}</p>
            </article>
          ))}
        </div>
        <p className="ar-price__free">
          無料: インターバルタイマー全機能・音声ガイド・基本ストリーク・直近履歴 ／
          Pro: 心拍ゾーン2分析・無制限履歴・カスタムプラン・季節テーマ
        </p>
      </section>

      <section className="ar-section" id="faq">
        <div className="ar-section__head">
          <p className="ar-eyebrow">FAQ</p>
          <h2 className="ar-mincho">よくある質問</h2>
        </div>
        <div className="ar-faq-list">
          {faqs.map((faq) => (
            <article className="ar-faq" key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ar-final">
        <h2 className="ar-mincho">今日も、ただ歩く。</h2>
        <p>速歩3分、ゆっくり3分。それだけで、明日のからだは少し変わる。</p>
        <div className="ar-final__actions">
          <PrimaryCta />
          <Link className="ar-button ar-button--ghost" href="/aruki/support/">
            サポート
          </Link>
        </div>
      </section>

      <footer className="ar-footer">
        <span>© 2026 Aruki</span>
        <div>
          <Link href="/aruki/privacy/">プライバシーポリシー</Link>
          <Link href="/aruki/terms/">利用規約</Link>
          <Link href="/aruki/support/">サポート</Link>
          <Link href="/">制作: Miyabayasi Koya</Link>
        </div>
      </footer>
    </main>
  );
}
