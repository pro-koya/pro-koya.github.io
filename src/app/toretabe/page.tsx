import Image from 'next/image';

const STEP_ITEMS = [
  {
    title: '育てている野菜を見守る',
    body: 'ホームと栽培中一覧で、いま育てている野菜と収穫時期の見通しを把握できます。',
    image: '/assets/media/toretabe/home.png',
    alt: 'とれたべのホーム画面',
  },
  {
    title: '収穫したら、その場で記録する',
    body: '数量や単位を感覚的に選べるので、畑やベランダでの短いタイミングでも入力しやすくしています。',
    image: '/assets/media/toretabe/harvest-input.png',
    alt: 'とれたべの収穫記録画面',
  },
  {
    title: '今ある野菜から献立を決める',
    body: '収穫物と履歴をもとに、今日作る料理や買い足しの少ない候補を提案します。',
    image: '/assets/media/toretabe/meal-ai.png',
    alt: 'とれたべのAI献立提案画面',
  },
] as const;

const HOWTO_ITEMS = [
  {
    title: '1. ホームで今の状態を確認',
    body: 'もうすぐ収穫できる野菜、今ある収穫物、次の候補までをひとつの流れで見渡せます。',
  },
  {
    title: '2. 収穫を記録して在庫化',
    body: '収穫日や量を記録すると、そのまま収穫物一覧に反映され、保存や使い切りの管理につながります。',
  },
  {
    title: '3. 献立と料理実績へつなぐ',
    body: '提案された献立から作った料理を記録し、次に育てる野菜の提案にも活かせます。',
  },
] as const;

const FAQ_ITEMS = [
  {
    question: 'どんな人向けのアプリですか？',
    answer:
      '家庭菜園や市民農園で野菜を育てていて、収穫後の保存や使い切り、献立決めまで一緒に整理したい人向けです。',
  },
  {
    question: '家庭菜園初心者でも使えますか？',
    answer:
      '使えます。栽培の状態確認、収穫記録、献立提案を分けすぎず、迷わず追えるように設計しています。',
  },
  {
    question: 'AI提案は必須ですか？',
    answer:
      '必須ではありません。通常の献立提案でも使え、必要なときだけ AI に再提案してもらう使い方を想定しています。',
  },
  {
    question: 'いまはダウンロードできますか？',
    answer:
      '現在は公開準備中です。このページでは、公開前のアプリ内容を紹介しています。',
  },
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
            <a href="#steps">使い方</a>
            <a href="#howto">はじめ方</a>
            <a href="#faq">よくある質問</a>
          </nav>

          <a className="toretabe-nav__download" href="#download">ダウンロード</a>
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
              <a className="toretabe-button toretabe-button--primary" href="#download">
                ダウンロード
              </a>
              <a className="toretabe-button toretabe-button--ghost" href="#steps">
                使い方を見る
              </a>
            </div>

            <p className="toretabe-hero__note">
              現在は公開準備中です。App Store 公開後、このページからダウンロードできます。
            </p>
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
          </div>
        </div>
      </section>

      <section className="toretabe-section" id="concept">
        <div className="toretabe-shell">
          <div className="toretabe-section__heading">
            <div>
              <p className="toretabe-kicker">Concept</p>
              <h2>家庭菜園の「収穫後」を、ひとつの流れで支える。</h2>
            </div>
            <p>
              とれたべが支えるのは、育てることだけではありません。
              収穫したあとにどう保存し、何を作り、ちゃんと使い切れたかまでを自然につなげることで、
              家庭菜園を毎日の食卓まで続く体験に変えていきます。
            </p>
          </div>

          <div className="toretabe-journey">
            <article className="toretabe-journey__card">
              <div className="toretabe-journey__index">01</div>
              <h3>育てる</h3>
              <p>栽培中の野菜と収穫時期を見ながら、次の変化を待てます。</p>
            </article>
            <article className="toretabe-journey__card">
              <div className="toretabe-journey__index">02</div>
              <h3>採れる</h3>
              <p>収穫したらすぐ記録し、在庫や保存状態へつなげられます。</p>
            </article>
            <article className="toretabe-journey__card">
              <div className="toretabe-journey__index">03</div>
              <h3>食べる</h3>
              <p>今ある野菜から献立を決め、料理実績として残せます。</p>
            </article>
            <article className="toretabe-journey__card">
              <div className="toretabe-journey__index">04</div>
              <h3>使い切る</h3>
              <p>使いやすかった野菜や料理が、次に育てる提案にも活かされます。</p>
            </article>
          </div>
        </div>
      </section>

      <section className="toretabe-section toretabe-section--tinted" id="steps">
        <div className="toretabe-shell">
          <div className="toretabe-section__heading">
            <div>
              <p className="toretabe-kicker">Steps</p>
              <h2>使い方</h2>
            </div>
            <p>
              アプリの流れは、ホームで状態を把握し、収穫を記録し、今ある野菜から献立を決めること。
              その一連の動きが切れないように、画面同士のつながりを整理しています。
            </p>
          </div>

          <div className="toretabe-feature-stack">
            {STEP_ITEMS.map((item, index) => (
              <article
                className={`toretabe-feature${index % 2 === 1 ? ' is-reverse' : ''}`}
                key={item.title}
              >
                <div className="toretabe-feature__copy is-green">
                  <p className="toretabe-feature__eyebrow">Step {String(index + 1).padStart(2, '0')}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <figure className="toretabe-screen-card">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1170}
                    height={2532}
                  />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="toretabe-section" id="howto">
        <div className="toretabe-shell">
          <div className="toretabe-section__heading">
            <div>
              <p className="toretabe-kicker">How To</p>
              <h2>はじめ方</h2>
            </div>
            <p>
              はじめて使うときも、いま何ができるかが見渡せるようにしています。
              栽培、収穫、献立、料理実績の順で使うほど、提案も自分向けに育っていきます。
            </p>
          </div>

          <div className="toretabe-howto-grid">
            {HOWTO_ITEMS.map((item) => (
              <article className="toretabe-howto-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="toretabe-section toretabe-section--tinted" id="faq">
        <div className="toretabe-shell">
          <div className="toretabe-section__heading">
            <div>
              <p className="toretabe-kicker">FAQ</p>
              <h2>よくある質問</h2>
            </div>
            <p>
              公開前によく聞かれる内容をまとめています。詳しい機能紹介は、今後 App Store 公開に合わせて順次追加していきます。
            </p>
          </div>

          <div className="toretabe-faq-list">
            {FAQ_ITEMS.map((item) => (
              <article className="toretabe-faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="toretabe-section" id="download">
        <div className="toretabe-shell">
          <div className="toretabe-download">
            <div className="toretabe-download__copy">
              <p className="toretabe-kicker">Download</p>
              <h2>ダウンロード</h2>
              <p>
                とれたべは現在 App Store 公開準備中です。
                公開後はこのページからすぐにダウンロードできるようになります。
              </p>
            </div>
            <div className="toretabe-download__panel">
              <div className="toretabe-download__badge">Coming Soon</div>
              <p>App Store 公開準備中</p>
              <span>公開後にダウンロードリンクを掲載します。</span>
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
            <a href="#concept">コンセプト</a>
            <a href="#steps">使い方</a>
            <a href="#howto">はじめ方</a>
            <a href="#faq">よくある質問</a>
            <a href="#download">ダウンロード</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
