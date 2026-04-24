import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SubpageHeader } from '@/components/Subpage/SubpageHeader';
import { SubpageFooter } from '@/components/Subpage/SubpageFooter';
import { RevealObserver } from '@/components/RevealObserver';

export const metadata: Metadata = {
  title: '草八興業株式会社 | case study | koya portfolio',
  description:
    '草八興業株式会社のケーススタディ。WordPress カスタムテーマで、製造業の企業サイトとして会社案内・事業内容・商品一覧・お知らせ・問い合わせ導線を整理した実績です。',
};

export default function KusahachiCorporateSitePage() {
  return (
    <>
      <SubpageHeader />
      <main>
        <section className="case-article-hero">
          <div className="container">
            <div className="case-article-hero__inner reveal is-visible">
              <div className="case-article-hero__meta">
                <Link className="text-link" href="/categories/web-apps/">Webカテゴリへ戻る</Link>
                <span className="case-article-hero__divider" />
                <span>WordPress Corporate Site</span>
              </div>
              <span className="eyebrow">Kusahachi Corporate Site</span>
              <h1 className="hero-title case-article-hero__title">
                <span className="title-line">会社案内を、</span>
                <span className="title-line hero-title__accent">更新しやすい</span>
                <span className="title-line">企業サイトへ。</span>
              </h1>
              <p className="case-article-hero__lead">
                草八興業株式会社のコーポレートサイトです。
                会社概要、事業内容、商品一覧、お知らせ、お問い合わせを WordPress 上で管理できるように構築しました。
              </p>
              <dl className="case-article-facts">
                <div><dt>Product</dt><dd>製造業コーポレートサイト</dd></div>
                <div><dt>Stack</dt><dd>WordPress / PHP / CSS / jQuery</dd></div>
                <div><dt>Focus</dt><dd>固定ページ / 投稿運用 / 問い合わせ</dd></div>
                <div>
                  <dt>Live</dt>
                  <dd>
                    <a href="https://kouban.jp/" target="_blank" rel="noreferrer">kouban.jp</a>
                  </dd>
                </div>
              </dl>
              <figure className="case-article-hero__visual reveal reveal-delay-1">
                <Image
                  src="/assets/media/kouban-home.png"
                  alt="草八興業株式会社のトップページ"
                  width={1200}
                  height={750}
                  style={{ width: '100%', height: 'auto' }}
                />
                <figcaption>トップページ。会社情報と問い合わせ導線を整理しています。</figcaption>
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
                    企業サイトとして必要な情報を整理し、公開後も更新しやすい形にしました。
                    固定ページと投稿を分け、基本的な導線を WordPress で管理できる構成です。
                  </p>
                </section>

                <section className="case-article__section">
                  <h2>企業サイトの基本情報を整理</h2>
                  <p>
                    トップページには、会社概要、事業内容、商品一覧、お知らせ、問い合わせ、アクセスを配置しました。
                    初めて訪れた人が必要な情報に進みやすい構成です。
                  </p>
                  <ul className="case-article__list">
                    <li>トップで会社概要から問い合わせまでを一続きの導線として整理</li>
                    <li>事業内容、商品一覧、設備一覧などを固定ページで明確に分離</li>
                    <li>写真と配色は落ち着いた印象に調整</li>
                  </ul>
                </section>

                <section className="case-article__section">
                  <h2>WordPressで更新しやすく構築</h2>
                  <p>
                    カスタムテーマで、メニュー、アイキャッチ画像、投稿一覧、詳細ページ、お問い合わせフォームを実装しました。
                    お知らせと商品情報はカテゴリで分けて管理できます。
                  </p>
                  <div className="case-article__subgrid">
                    <div>
                      <h3>固定ページ</h3>
                      <p>会社概要、事業内容、設備、問い合わせを整理。</p>
                    </div>
                    <div>
                      <h3>投稿運用</h3>
                      <p>お知らせや商品情報を投稿で追加可能。</p>
                    </div>
                    <div>
                      <h3>問い合わせ導線</h3>
                      <p>Contact Form 7で問い合わせフォームを実装。</p>
                    </div>
                  </div>
                </section>

                <figure className="case-article__figure case-article__figure--wide">
                  <Image
                    src="/assets/media/kouban-product.png"
                    alt="草八興業株式会社の商品一覧ページ"
                    width={1200}
                    height={750}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <figcaption>商品一覧ページ。投稿から商品情報を表示します。</figcaption>
                </figure>

                <section className="case-article__section">
                  <h2>必要な動きだけを追加</h2>
                  <p>
                    スマートフォン向けメニュー、スクロール時の表示、アクセス情報の地図切り替えなどを実装しました。
                    情報を探しやすくするための範囲に絞っています。
                  </p>
                </section>

                <section className="case-article__section case-article__section--summary">
                  <div className="case-article__closing">
                    <div>
                      <span className="eyebrow">Stack</span>
                      <p className="case-article__stack">WordPress / PHP / カスタムテーマ / Contact Form 7 / WP_Query / jQuery</p>
                    </div>
                    <div>
                      <span className="eyebrow">Good For</span>
                      <p className="case-article__stack">企業サイト / WordPress 導入 / 更新しやすい情報設計 / お知らせ運用 / 問い合わせ導線</p>
                    </div>
                  </div>
                  <div className="hero__actions">
                    <Link className="button button--primary" href="/#contact">この方向で相談する</Link>
                    <a
                      className="button button--ghost"
                      href="https://kouban.jp/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      公開サイトを見る
                    </a>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SubpageFooter />
      <RevealObserver />
    </>
  );
}
