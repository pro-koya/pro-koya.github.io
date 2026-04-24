import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SubpageHeader } from '@/components/Subpage/SubpageHeader';
import { SubpageFooter } from '@/components/Subpage/SubpageFooter';
import { RevealObserver } from '@/components/RevealObserver';

export const metadata: Metadata = {
  title: 'とれたべ | case study | koya portfolio',
  description:
    'とれたべの制作実績。家庭菜園の収穫、在庫、献立提案、料理記録をつなぐiOSアプリです。',
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
                <span className="title-line">収穫後の</span>
                <span className="title-line hero-title__accent">使い切りを</span>
                <span className="title-line">支えるアプリ。</span>
              </h1>
              <p className="case-article-hero__lead">
                とれたべは、家庭菜園で採れた野菜の在庫管理、献立提案、料理記録を扱う iOS アプリです。
                アプリ本体に加えて、公開LPとポートフォリオ導線も整えました。
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
                <figcaption>実際のアプリ画面を使った公開LP。</figcaption>
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
                    栽培記録だけでなく、収穫後にどう使うかまで扱うアプリです。
                    ホーム、在庫、献立提案、料理記録が一つの流れになるように整理しました。
                  </p>
                </section>

                <section className="case-article__section">
                  <h2>収穫後の流れを設計</h2>
                  <p>
                    収穫した野菜を在庫として管理し、今ある食材から献立を考えられる構成です。
                    料理記録も残せるため、使い切りまでつながります。
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
                  <figcaption>ホーム画面。収穫予定、在庫、献立提案を確認できます。</figcaption>
                </figure>

                <section className="case-article__section">
                  <h2>公開LPも実画面ベースで作成</h2>
                  <p>
                    公開ページでは、仮の画面ではなく実際のスクリーンショットを使用しました。
                    アプリの機能と見え方がずれないよう、紹介文と導線も合わせて調整しています。
                  </p>
                  <div className="case-article__subgrid">
                    <div>
                      <h3>実装確認</h3>
                      <p>現在の機能に合わせてLPの構成を整理。</p>
                    </div>
                    <div>
                      <h3>画面差し替え</h3>
                      <p>最新のスクリーンショットをLPに反映。</p>
                    </div>
                    <div>
                      <h3>導線追加</h3>
                      <p>トップ、iOSカテゴリ、個別記事への導線を追加。</p>
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
                  <figcaption>AI献立提案。今ある野菜から料理案を表示します。</figcaption>
                </figure>

                <section className="case-article__section">
                  <h2>対応範囲</h2>
                  <p>
                    iOSアプリの機能整理、画面紹介、公開LP、ポートフォリオ掲載まで対応しました。
                    アプリ本体と紹介ページを合わせて見せた実績です。
                  </p>
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
                    <Link
                      className="button button--primary"
                      href="/toretabe/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      公開LPを見る
                    </Link>
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
