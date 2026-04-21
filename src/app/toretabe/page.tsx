import Image from 'next/image';
import Link from 'next/link';

const JOURNEY_STEPS = [
  {
    title: '育てる',
    body: '栽培中の野菜と収穫時期の見通しを、ホームと一覧で迷わず確認できます。',
  },
  {
    title: '収穫する',
    body: '数量は「個・本・束・袋・ふんわり」など感覚的な単位で記録でき、在庫へすぐ反映されます。',
  },
  {
    title: '献立を決める',
    body: '今ある野菜から献立を提案し、必要な買い足しや AI による再提案まで一つの画面で整理します。',
  },
  {
    title: '使い切って学ぶ',
    body: '料理実績と満足度を残すことで、次に育てる野菜の提案にもつながっていきます。',
  },
] as const;

const FEATURE_SECTIONS = [
  {
    title: '未来・現在・行動を、ホームにひとまとめ。',
    body:
      '「もうすぐ収穫」「次に育てる野菜の提案」「今ある収穫物」「今日のおすすめ献立」を同じホームに置くことで、家庭菜園の次の一手が自然に決まる構成にしています。',
    image: '/assets/media/toretabe/home.png',
    alt: 'とれたべのホーム画面',
    accent: 'green',
  },
  {
    title: '収穫記録は、思い出すより先に入力できる軽さへ。',
    body:
      '収穫日は自動で入り、数量と単位を迷わず選べる構成にすることで、畑やベランダでの短いタイミングでもそのまま記録できます。',
    image: '/assets/media/toretabe/harvest-input.png',
    alt: 'とれたべの収穫記録画面',
    accent: 'amber',
  },
  {
    title: '在庫は「保存」「一部使用」「使い切り」まで見渡せる。',
    body:
      '収穫物一覧では消費優先度と保存向きのヒントを先に見せることで、冷蔵庫の中で野菜を余らせにくい状態をつくります。',
    image: '/assets/media/toretabe/inventory.png',
    alt: 'とれたべの収穫物一覧画面',
    accent: 'blue',
  },
  {
    title: '今ある野菜から、献立を決めるところまで。',
    body:
      '通常提案だけでなく AI 提案にもつなげることで、「何を作ろう」で止まらず、買い足しの少ない献立候補まで踏み込んで支援します。',
    image: '/assets/media/toretabe/meal-ai.png',
    alt: 'とれたべのAI献立提案画面',
    accent: 'soil',
  },
  {
    title: '料理実績が、そのまま次の栽培提案の材料になる。',
    body:
      '作った料理や満足度を記録し、よく使い切れた野菜や相性の良い献立を蓄積することで、「次に育てる野菜」の提案精度も高めていきます。',
    image: '/assets/media/toretabe/crop-suggestions.png',
    alt: 'とれたべの次に育てる野菜提案画面',
    accent: 'green',
  },
] as const;

const DETAIL_SCREENS = [
  {
    name: '栽培中の野菜一覧',
    description: '収穫時期と状態を一覧で把握し、そのまま詳細や収穫導線へつなげます。',
    image: '/assets/media/toretabe/crops.png',
    alt: 'とれたべの栽培中野菜一覧画面',
  },
  {
    name: '献立提案',
    description: '履歴と収穫物からおすすめを整理し、すぐに作る料理を決められます。',
    image: '/assets/media/toretabe/meal-list.png',
    alt: 'とれたべの献立提案画面',
  },
  {
    name: '料理実績',
    description: '作った料理の履歴と評価を振り返り、使いやすい野菜を見つけやすくします。',
    image: '/assets/media/toretabe/cooking-records.png',
    alt: 'とれたべの料理実績画面',
  },
] as const;

const TECH_TAGS = [
  'iOS 17+',
  'SwiftUI',
  'SwiftData',
  'AI提案',
  '収穫後UX',
  '家庭菜園アプリ',
] as const;

export default function ToretabePage() {
  return (
    <main className="toretabe-page">
      <header className="toretabe-nav">
        <div className="toretabe-shell toretabe-nav__inner">
          <a className="toretabe-brand" href="#top" aria-label="とれたべの先頭へ移動">
            <span className="toretabe-brand__mark">
              <Image
                src="/assets/media/toretabe/icon.png"
                alt=""
                width={44}
                height={44}
              />
            </span>
            <span className="toretabe-brand__text">
              <span className="toretabe-brand__name">とれたべ</span>
              <span className="toretabe-brand__sub">Homegrown loop for everyday meals</span>
            </span>
          </a>

          <nav className="toretabe-nav__links" aria-label="とれたべLPナビゲーション">
            <a href="#concept">コンセプト</a>
            <a href="#screens">画面</a>
            <a href="#story">実績</a>
            <Link href="/case-studies/toretabe-app/">ケーススタディ</Link>
          </nav>
        </div>
      </header>

      <section className="toretabe-hero" id="top">
        <div className="toretabe-shell toretabe-hero__grid">
          <div className="toretabe-hero__copy">
            <div className="toretabe-eyebrow">
              <span className="toretabe-eyebrow__dot" />
              iOS App Landing Page
            </div>
            <div className="toretabe-hero__titleblock">
              <span className="toretabe-hero__badge">家庭菜園の収穫後アプリ</span>
              <h1>
                家庭菜園の
                <br />
                「採れた」を、
                <br />
                ちゃんと「食べた」に変える。
              </h1>
            </div>
            <p className="toretabe-hero__lead">
              とれたべは、栽培記録で終わらず、収穫した野菜の在庫整理、献立提案、料理実績、
              そして次に育てる野菜の提案までを一つの流れでつなぐ iOS アプリです。
              毎日の家庭菜園にある「採れたけど、どう使おう」を軽くするために設計しました。
            </p>

            <div className="toretabe-hero__actions">
              <a className="toretabe-button toretabe-button--primary" href="#screens">
                実際の画面を見る
              </a>
              <Link className="toretabe-button toretabe-button--ghost" href="/case-studies/toretabe-app/">
                実績記事を見る
              </Link>
              <Link className="toretabe-button toretabe-button--soft" href="/#contact">
                制作相談はこちら
              </Link>
            </div>

            <p className="toretabe-hero__note">
              App Store 公開準備中。現在はポートフォリオ掲載用の紹介ページとして先行公開しています。
            </p>

            <dl className="toretabe-facts">
              <div>
                <dt>Focus</dt>
                <dd>収穫後の意思決定</dd>
              </div>
              <div>
                <dt>For</dt>
                <dd>家庭菜園 / 市民農園</dd>
              </div>
              <div>
                <dt>Flow</dt>
                <dd>栽培 → 収穫 → 献立 → 実績</dd>
              </div>
            </dl>
          </div>

          <div className="toretabe-hero__visual">
            <div className="toretabe-glow toretabe-glow--green" />
            <div className="toretabe-glow toretabe-glow--amber" />

            <div className="toretabe-device toretabe-device--left">
              <Image
                src="/assets/media/toretabe/home.png"
                alt="とれたべのホーム画面"
                width={1170}
                height={2532}
                priority
              />
            </div>

            <div className="toretabe-device toretabe-device--center">
              <Image
                src="/assets/media/toretabe/meal-ai.png"
                alt="とれたべのAI献立提案画面"
                width={1170}
                height={2532}
                priority
              />
            </div>

            <div className="toretabe-device toretabe-device--right">
              <Image
                src="/assets/media/toretabe/crop-suggestions.png"
                alt="とれたべの次に育てる野菜提案画面"
                width={1170}
                height={2532}
                priority
              />
            </div>

            <div className="toretabe-floating-card toretabe-floating-card--top">
              <span>収穫後導線</span>
              <strong>在庫から献立へ</strong>
            </div>

            <div className="toretabe-floating-card toretabe-floating-card--bottom">
              <span>体験の芯</span>
              <strong>使い切るところまで支える</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="toretabe-section" id="concept">
        <div className="toretabe-shell">
          <div className="toretabe-section__heading">
            <div>
              <p className="toretabe-kicker">Concept</p>
              <h2>「栽培記録アプリ」で終わらせない、収穫後のループ設計。</h2>
            </div>
            <p>
              とれたべの中心にあるのは、家庭菜園の楽しさを「育てる」だけで閉じず、
              食卓につながるところまで自然に支えることです。アプリ全体も、その流れが崩れないように組み立てています。
            </p>
          </div>

          <div className="toretabe-journey">
            {JOURNEY_STEPS.map((step, index) => (
              <article className="toretabe-journey__card" key={step.title}>
                <div className="toretabe-journey__index">{String(index + 1).padStart(2, '0')}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="toretabe-section toretabe-section--tinted" id="screens">
        <div className="toretabe-shell">
          <div className="toretabe-section__heading">
            <div>
              <p className="toretabe-kicker">Screens</p>
              <h2>草案ではなく、実際のアプリ画面で価値が伝わるように。</h2>
            </div>
            <p>
              LP には現在の実装に合わせた正しい UI を掲載しています。ホームで何が見えるか、
              収穫で何を入力するか、献立や実績で何が返ってくるかが、スクロールしながらつかめる構成です。
            </p>
          </div>

          <div className="toretabe-feature-stack">
            {FEATURE_SECTIONS.map((section, index) => (
              <article
                className={`toretabe-feature${index % 2 === 1 ? ' is-reverse' : ''}`}
                key={section.title}
              >
                <div className={`toretabe-feature__copy is-${section.accent}`}>
                  <p className="toretabe-feature__eyebrow">Feature {String(index + 1).padStart(2, '0')}</p>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </div>
                <figure className="toretabe-screen-card">
                  <Image
                    src={section.image}
                    alt={section.alt}
                    width={1170}
                    height={2532}
                  />
                </figure>
              </article>
            ))}
          </div>

          <div className="toretabe-detail-grid">
            {DETAIL_SCREENS.map((screen) => (
              <article className="toretabe-detail-card" key={screen.name}>
                <figure className="toretabe-detail-card__visual">
                  <Image
                    src={screen.image}
                    alt={screen.alt}
                    width={1170}
                    height={2532}
                  />
                </figure>
                <div className="toretabe-detail-card__body">
                  <h3>{screen.name}</h3>
                  <p>{screen.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="toretabe-section" id="story">
        <div className="toretabe-shell">
          <div className="toretabe-story">
            <div className="toretabe-story__copy">
              <p className="toretabe-kicker">Portfolio Story</p>
              <h2>アプリの価値を、そのまま公開導線へ翻訳した実績です。</h2>
              <p>
                この LP は、実際の SwiftUI コードベースと最新画面を確認しながら、
                アプリの価値を外部の人にも伝わる形へ整えたものです。ポートフォリオでは、
                モバイル UI の設計だけでなく、公開ページの見せ方まで含めて一つの実績として扱っています。
              </p>
              <div className="toretabe-tag-list" aria-label="使用技術とテーマ">
                {TECH_TAGS.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="toretabe-story__panel">
              <div className="toretabe-story__panel-inner">
                <p className="toretabe-story__label">Case Study Highlights</p>
                <ul className="toretabe-story__points">
                  <li>家庭菜園アプリの差別化軸を、収穫後 UX として整理</li>
                  <li>草案と実装の差分を埋め、正しいアプリ画面に差し替え</li>
                  <li>ポートフォリオの iOS 実績一覧と個別記事にも導線を追加</li>
                </ul>
                <div className="toretabe-story__actions">
                  <Link className="toretabe-button toretabe-button--primary" href="/case-studies/toretabe-app/">
                    ケーススタディへ
                  </Link>
                  <Link className="toretabe-button toretabe-button--ghost" href="/categories/ios-apps/">
                    iOS 実績一覧へ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="toretabe-footer">
        <div className="toretabe-shell toretabe-footer__inner">
          <div>
            <p className="toretabe-footer__title">とれたべ</p>
            <p className="toretabe-footer__copy">
              家庭菜園の「採れた」を、毎日の「食べた」へつなぐ iOS アプリ。
            </p>
          </div>
          <div className="toretabe-footer__links">
            <a href="#top">Top</a>
            <a href="#concept">Concept</a>
            <a href="#screens">Screens</a>
            <Link href="/case-studies/toretabe-app/">Case Study</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
