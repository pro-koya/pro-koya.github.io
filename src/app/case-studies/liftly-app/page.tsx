import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SubpageHeader } from '@/components/Subpage/SubpageHeader';
import { SubpageFooter } from '@/components/Subpage/SubpageFooter';
import { RevealObserver } from '@/components/RevealObserver';

export const metadata: Metadata = {
  title: 'Liftly | case study | koya portfolio',
  description:
    'Liftlyのケーススタディ。筋トレ記録アプリとして、入力速度、成長グラフ、タイマー、体重管理などをどう整理して提供しているかをまとめています。',
};

const LIFTLY_FOOTER_LINKS = [
  { label: 'Top', href: '/' },
  { label: 'iOS', href: '/categories/ios-apps/' },
  { label: 'Liftly', href: '/liftly/' },
  {
    label: 'App Store',
    href: 'https://apps.apple.com/app/liftly-simple-workout-log/id6757798075',
    external: true,
  },
];

export default function LiftlyAppPage() {
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
              <span className="eyebrow">Liftly</span>
              <h1 className="hero-title case-article-hero__title">
                <span className="title-line">毎日使うからこそ、</span>
                <span className="title-line hero-title__accent">入力の軽さと</span>
                <span className="title-line">続けやすさを整えた。</span>
              </h1>
              <p className="case-article-hero__lead">
                Liftly は、シンプルで続けやすい筋トレ記録アプリです。派手な機能を増やすのではなく、
                毎日開いて記録する、その小さな行為の摩擦をどこまで減らせるかに重心を置いて設計しました。
                このページでは、公開ページの紹介ではなく、どんな体験設計を大切にしたかを記事としてまとめています。
              </p>
              <dl className="case-article-facts">
                <div><dt>Platform</dt><dd>iOS App</dd></div>
                <div><dt>Focus</dt><dd>記録導線 / 継続体験</dd></div>
                <div><dt>Stack</dt><dd>Flutter / Supabase</dd></div>
                <div><dt>Preview</dt><dd>公開ページ / App Store</dd></div>
              </dl>
              <figure className="case-article-hero__visual reveal reveal-delay-1">
                <Image
                  src="/assets/media/liftly-page.png"
                  alt="Liftlyの公開ページ"
                  width={1200}
                  height={750}
                  style={{ width: '100%', height: 'auto' }}
                />
                <figcaption>公開ページ。アプリの機能説明だけでなく、手触りを伝えるための見せ方にもAI活用。</figcaption>
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
                    記録アプリは、機能の多さよりも、開いてから入力し終えるまでの軽さが重要です。
                    Liftly では、ログ入力、グラフ確認、タイマー、体重管理といった要素をただ並べるのではなく、
                    毎日の継続を邪魔しない流れにどうまとめるかを軸に設計しました。
                  </p>
                </section>

                <section className="case-article__section">
                  <h2>大事だったのは、続けるための抵抗を減らすことでした。</h2>
                  <p>
                    トレーニング記録アプリは、一度だけ使われるものではありません。毎回の入力がわずかでも重いと、
                    すぐに使われなくなります。Liftly では、種目、重量、回数を素早く入力し、前回の記録を参照しながら
                    そのまま次のセットへ進めるような、反復に耐える設計を優先しました。
                  </p>
                  <ul className="case-article__list">
                    <li>種目、重量、回数を迷わず入れられる入力導線</li>
                    <li>前回の記録を参照しながら、継続的に使えるUI</li>
                    <li>毎日の習慣を壊さないための軽さと見通し</li>
                  </ul>
                </section>

                <section className="case-article__section">
                  <h2>「続けたくなる」より先に、「続けやすい」を作りました。</h2>
                  <p>
                    グラフや履歴は、見栄えのためではなく、成長実感を途切れさせないためにあります。
                    ただ記録を残すだけでなく、重量・回数・ボリュームの変化を見返せることで、
                    ユーザーが次のトレーニングへ自然につながる構成を意識しました。
                  </p>
                  <div className="case-article__subgrid">
                    <div>
                      <h3>入力体験</h3>
                      <p>毎回の記録が負担にならないよう、入力順序と情報の見せ方を整理しました。</p>
                    </div>
                    <div>
                      <h3>可視化</h3>
                      <p>成長グラフと履歴で、積み重ねが見える状態を維持できるようにしました。</p>
                    </div>
                    <div>
                      <h3>補助機能</h3>
                      <p>セット間タイマーや体重管理、バックアップなど、継続を支える周辺機能も切り離さず整えました。</p>
                    </div>
                  </div>
                </section>

                <figure className="case-article__figure case-article__figure--wide">
                  <Image
                    src="/assets/media/liftly-page.png"
                    alt="Liftlyの公開ページ"
                    width={1200}
                    height={750}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <figcaption>紹介ページと動画を用意することで、アプリ本体だけでなく、外からの伝わり方も営業導線として整えています。</figcaption>
                </figure>

                <section className="case-article__section">
                  <h2>この実績は、モバイルでも設計から考えられることを示しています。</h2>
                  <p>
                    Liftly は、iOSカテゴリの掲載例であると同時に、継続して使うプロダクトをどう設計するかを示す実績でもあります。
                    UIの見た目だけではなく、入力、履歴、可視化、公開導線までを一つの体験として扱えること。
                    そこがこの実績でいちばん伝えたいポイントです。
                  </p>
                  <blockquote className="case-article__quote">
                    便利そうに見えることより、毎日ちゃんと使えること。<br />
                    Liftly では、その順番を崩さないように設計しました。
                  </blockquote>
                </section>

                <section className="case-article__section case-article__section--summary">
                  <div className="case-article__closing">
                    <div>
                      <span className="eyebrow">Stack</span>
                      <p className="case-article__stack">Flutter / Riverpod / sqflite / fl_chart / Supabase / In-App Purchase / Notification</p>
                    </div>
                    <div>
                      <span className="eyebrow">Links</span>
                      <p className="case-article__stack">公開ページ / App Store / 継続体験設計 / モバイルUI</p>
                    </div>
                  </div>
                  <div className="hero__actions">
                    <Link className="button button--primary" href="/liftly/">公開ページを見る</Link>
                    <Link className="button button--ghost" href="/#contact">この方向で相談する</Link>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SubpageFooter links={LIFTLY_FOOTER_LINKS} />
      <RevealObserver />
    </>
  );
}
