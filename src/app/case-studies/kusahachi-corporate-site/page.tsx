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
                製造業としての信頼感を伝える見せ方に加えて、会社概要、事業内容、商品一覧、お知らせ、
                お問い合わせまでを WordPress 上で整理し、公開後も運用しやすい構成にまとめました。
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
                <figcaption>トップページ。工場写真と落ち着いた配色で、製造業としての空気感と信頼感が伝わるように構成しています。</figcaption>
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
                    この実績は Web アプリ開発とは少し違い、企業サイトとして必要な情報をどう整理し、
                    どう更新しやすい形にするかが中心でした。見た目だけを整えるのではなく、
                    会社案内、事業紹介、商品情報、お知らせ、問い合わせといった基本導線を WordPress 上で
                    ひとつの運用フローにまとめています。
                  </p>
                </section>

                <section className="case-article__section">
                  <h2>最初に整えたのは、会社の全体像が伝わる情報の並びでした。</h2>
                  <p>
                    企業サイトでは、訪問した人が最初に知りたいのは「何をしている会社か」「どんな商品や設備があるか」
                    「どこに問い合わせればよいか」です。そこでトップページでは、ABOUT、事業内容、商品一覧、
                    NEWS、CONTACT、ACCESS までを順番に並べ、初見でも迷いにくい構成にしました。
                  </p>
                  <p>
                    派手な演出よりも、工場や製品写真、落ち着いたブルーグレーの配色、余白の取り方によって、
                    製造業らしい誠実さと落ち着きを前に出しています。
                  </p>
                  <ul className="case-article__list">
                    <li>トップで会社概要から問い合わせまでを一続きの導線として整理</li>
                    <li>事業内容、商品一覧、設備一覧などを固定ページで明確に分離</li>
                    <li>会社の空気感が伝わる写真と配色で、信頼感を優先した見せ方に調整</li>
                  </ul>
                </section>

                <section className="case-article__section">
                  <h2>更新しやすさのために、WordPress の使い方もシンプルにまとめました。</h2>
                  <p>
                    実装は WordPress のカスタムテーマで行い、メニュー登録、アイキャッチ画像、一覧と詳細の投稿表示、
                    お問い合わせフォームまでをテーマ内で組んでいます。投稿まわりは複雑にしすぎず、
                    お知らせと商品情報をカテゴリで分けて扱う形にし、日々の更新負荷が上がりすぎないようにしています。
                  </p>
                  <div className="case-article__subgrid">
                    <div>
                      <h3>固定ページ</h3>
                      <p>会社概要、事業内容、設備、問い合わせなど、企業サイトの基本情報を分かりやすく整理しました。</p>
                    </div>
                    <div>
                      <h3>投稿運用</h3>
                      <p>お知らせや商品一覧は投稿とカテゴリを使って一覧化し、公開後も追加しやすい流れにしています。</p>
                    </div>
                    <div>
                      <h3>問い合わせ導線</h3>
                      <p>Contact Form 7 を使った問い合わせページと、トップからの明確な導線を用意しています。</p>
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
                  <figcaption>商品一覧ページ。投稿を流用しながら一覧化することで、運用時に追加しやすい構成にしています。</figcaption>
                </figure>

                <section className="case-article__section">
                  <h2>小さな操作も、企業サイトとして自然に見える範囲で整えました。</h2>
                  <p>
                    例えば、スマートフォン向けのドロワーメニュー、スクロールに合わせた画像や見出しの表示、
                    アクセス情報の地図切り替えなど、必要な範囲の動きを JavaScript で追加しています。
                    見せ方を派手にするためではなく、情報が読まれやすく、必要な場所にたどり着きやすくするための調整です。
                  </p>
                  <blockquote className="case-article__quote">
                    企業サイトでは、複雑な機能よりも「必要な情報が迷わず届くこと」と
                    「公開後も無理なく更新できること」の両立が大切でした。
                  </blockquote>
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
