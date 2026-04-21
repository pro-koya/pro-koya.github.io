import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SubpageHeader } from '@/components/Subpage/SubpageHeader';
import { SubpageFooter } from '@/components/Subpage/SubpageFooter';
import { RevealObserver } from '@/components/RevealObserver';

export const metadata: Metadata = {
  title: 'とれたべ | case study | koya portfolio',
  description:
    'とれたべのケーススタディ。家庭菜園の収穫後体験をどう整理し、実際のアプリ画面を使ったLPとポートフォリオ導線へ落とし込んだかをまとめています。',
};

const TORETABE_FOOTER_LINKS = [
  { label: 'Top', href: '/' },
  { label: 'iOS', href: '/categories/ios-apps/' },
  { label: 'LP', href: '/toretabe/' },
  { label: 'Contact', href: '/#contact' },
];

export default function ToretabeAppCaseStudyPage() {
  return (
    <>
      <SubpageHeader />
      <main>
        <section className="case-article-hero">
          <div className="container">
            <div className="case-article-hero__inner reveal is-visible">
              <div className="case-article-hero__meta">
                <Link className="text-link" href="/categories/ios-apps/">iOSカテゴリへ戻る</Link>
                <span className="case-article-hero__divider" />
                <span>iOS App Case Study</span>
              </div>
              <span className="eyebrow">とれたべ</span>
              <h1 className="hero-title case-article-hero__title">
                <span className="title-line">収穫した後の</span>
                <span className="title-line hero-title__accent">迷いまで</span>
                <span className="title-line">設計した。</span>
              </h1>
              <p className="case-article-hero__lead">
                とれたべは、家庭菜園の収穫後に生まれる「今ある野菜をどう使うか」を支える iOS アプリです。
                この実績では、SwiftUI で作られた実アプリの価値を整理し、公開LPとポートフォリオ導線まで含めて
                一つの見せ方に落とし込みました。
              </p>
              <dl className="case-article-facts">
                <div><dt>Platform</dt><dd>iOS App</dd></div>
                <div><dt>Focus</dt><dd>収穫後UX / 家庭菜園 / AI提案</dd></div>
                <div><dt>Stack</dt><dd>SwiftUI / SwiftData / Cloudflare Worker</dd></div>
                <div><dt>Output</dt><dd>アプリLP / ケーススタディ / iOS実績追加</dd></div>
              </dl>
              <figure className="case-article-hero__visual reveal reveal-delay-1">
                <Image
                  src="/assets/media/toretabe/lp-capture.png"
                  alt="とれたべのLPキャプチャ"
                  width={1440}
                  height={960}
                  style={{ width: '100%', height: 'auto' }}
                />
                <figcaption>
                  草案をそのまま使うのではなく、実際の実装画面に差し替えたうえで、家庭菜園アプリとしての価値が伝わる構成へ再整理しました。
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section case-article-section">
          <div className="container">
            <article className="case-article-sheet reveal">
              <div className="case-article">
                <section className="case-article__section case-article__section--intro">
                  <p className="case-article__intro">
                    家庭菜園アプリは「育てる記録」を中心に設計されがちですが、
                    とれたべでは収穫したあとに何を作り、どう使い切るかまでを主役として扱っています。
                    その構造が伝わるよう、LPでも単なる画面紹介ではなく、流れごと見せることを重視しました。
                  </p>
                </section>

                <section className="case-article__section">
                  <h2>差別化の芯は、収穫後の意思決定を軽くすることでした。</h2>
                  <p>
                    Harvest-Loop のコードベースを確認すると、ホーム、収穫物一覧、献立提案、料理実績、
                    次に育てる野菜の提案までが一つのループとしてつながっています。LPでもその構造を崩さず、
                    「栽培記録アプリ」ではなく「収穫後アプリ」として理解できる順番に情報を整理しました。
                  </p>
                  <ul className="case-article__list">
                    <li>栽培の見通しから収穫導線までをホームで俯瞰できる</li>
                    <li>収穫記録がそのまま在庫化され、献立提案へつながる</li>
                    <li>料理実績が、次に育てる野菜の提案にも再利用される</li>
                  </ul>
                </section>

                <figure className="case-article__figure case-article__figure--phone">
                  <Image
                    src="/assets/media/toretabe/home.png"
                    alt="とれたべのホーム画面"
                    width={1170}
                    height={2532}
                  />
                  <figcaption>
                    ホーム画面では「もうすぐ収穫」「今ある収穫物」「今日のおすすめ献立」が一続きの流れとして配置されています。
                  </figcaption>
                </figure>

                <section className="case-article__section">
                  <h2>草案と実装の差分を埋め、実画面ベースのLPへ置き換えました。</h2>
                  <p>
                    今回のLP制作では、添付された草案を参考にしつつ、実際のスクリーンショットへすべて差し替えています。
                    これにより、公開ページを見た人がダウンロード前に受ける印象と、アプリを開いた後の体験がなるべくずれない状態を目指しました。
                  </p>
                  <div className="case-article__subgrid">
                    <div>
                      <h3>実装確認</h3>
                      <p>HomeView や献立提案・収穫物一覧の実装を読み、現在の機能と文言に合わせて構成しました。</p>
                    </div>
                    <div>
                      <h3>画面差し替え</h3>
                      <p>草案上の仮画面ではなく、最新のスクリーンショットをそのままLPに反映しています。</p>
                    </div>
                    <div>
                      <h3>導線追加</h3>
                      <p>LPだけで閉じず、ポートフォリオのトップ・iOSカテゴリ・個別記事にもつながる形へ拡張しました。</p>
                    </div>
                  </div>
                </section>

                <figure className="case-article__figure case-article__figure--phone">
                  <Image
                    src="/assets/media/toretabe/meal-ai.png"
                    alt="とれたべのAI献立提案画面"
                    width={1170}
                    height={2532}
                  />
                  <figcaption>
                    献立提案は、今ある野菜を見るだけでなく、AI による再提案や買い足しの少なさまで含めて魅力として伝える必要がありました。
                  </figcaption>
                </figure>

                <section className="case-article__section">
                  <h2>この実績は、モバイル体験と公開ページを一緒に設計できることを示しています。</h2>
                  <p>
                    とれたべは、アプリの UI を整えるだけではなく、その価値を外にどう伝えるかまでをまとめて設計した実績です。
                    実装を確認しながら公開ページを作ることで、見た目だけの LP ではなく、
                    体験の芯とズレない紹介ページにできることを、この案件で示しています。
                  </p>
                  <blockquote className="case-article__quote">
                    家庭菜園の楽しさを、育てるところだけで終わらせない。<br />
                    収穫した後の迷いまで軽くすることが、とれたべの価値です。
                  </blockquote>
                </section>

                <section className="case-article__section case-article__section--summary">
                  <div className="case-article__closing">
                    <div>
                      <span className="eyebrow">Stack</span>
                      <p className="case-article__stack">SwiftUI / SwiftData / MVVM / Cloudflare Worker / AI suggestion</p>
                    </div>
                    <div>
                      <span className="eyebrow">Links</span>
                      <p className="case-article__stack">公開LP / iOS実績 / 収穫後UX / 家庭菜園アプリ</p>
                    </div>
                  </div>
                  <div className="hero__actions">
                    <Link className="button button--primary" href="/toretabe/">公開LPを見る</Link>
                    <Link className="button button--ghost" href="/#contact">この方向で相談する</Link>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SubpageFooter links={TORETABE_FOOTER_LINKS} />
      <RevealObserver />
    </>
  );
}
