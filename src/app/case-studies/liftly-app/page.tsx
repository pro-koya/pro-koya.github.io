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
                <span className="title-line">筋トレ記録を</span>
                <span className="title-line hero-title__accent">続けやすくする</span>
                <span className="title-line">iOSアプリ。</span>
              </h1>
              <p className="case-article-hero__lead">
                Liftly は、トレーニング内容を素早く記録できる iOS アプリです。
                入力、履歴、グラフ、タイマーなど、日々使う機能をシンプルにまとめています。
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
                <figcaption>Liftlyの公開ページ。</figcaption>
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
                    毎回使う記録アプリなので、入力のしやすさを重視しました。
                    ログ入力、グラフ確認、タイマー、体重管理を一つの流れで扱えます。
                  </p>
                </section>

                <section className="case-article__section">
                  <h2>記録を素早く残せる設計</h2>
                  <p>
                    種目、重量、回数を迷わず入力でき、前回の記録も確認できます。
                    トレーニング中でも使いやすいことを優先しました。
                  </p>
                  <ul className="case-article__list">
                    <li>種目、重量、回数を迷わず入れられる入力導線</li>
                    <li>前回の記録を参照しながら、継続的に使えるUI</li>
                    <li>タイマーや履歴確認まで含めた記録体験</li>
                  </ul>
                </section>

                <section className="case-article__section">
                  <h2>成長を見返せる構成</h2>
                  <p>
                    重量、回数、ボリュームの変化をグラフで確認できます。
                    記録を残すだけでなく、次のトレーニングに活かせる形にしています。
                  </p>
                  <div className="case-article__subgrid">
                    <div>
                      <h3>入力体験</h3>
                      <p>入力順序と表示する情報を整理。</p>
                    </div>
                    <div>
                      <h3>可視化</h3>
                      <p>グラフと履歴で変化を確認可能。</p>
                    </div>
                    <div>
                      <h3>補助機能</h3>
                      <p>タイマー、体重管理、バックアップにも対応。</p>
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
                  <figcaption>公開ページ。アプリの概要と導線を整理しています。</figcaption>
                </figure>

                <section className="case-article__section">
                  <h2>対応範囲</h2>
                  <p>
                    アプリの機能設計、記録UI、グラフ表示、公開ページまで対応しました。
                    継続して使うモバイルアプリの実績として掲載しています。
                  </p>
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
                    <Link
                      className="button button--primary"
                      href="/liftly/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      公開ページを見る
                    </Link>
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
