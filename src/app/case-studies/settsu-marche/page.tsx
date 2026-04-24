import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SubpageHeader } from '@/components/Subpage/SubpageHeader';
import { SubpageFooter } from '@/components/Subpage/SubpageFooter';
import { RevealObserver } from '@/components/RevealObserver';

export const metadata: Metadata = {
  title: 'セッツマルシェ | case study | koya portfolio',
  description:
    'セッツマルシェの制作実績。食材EC、複数ロール、認証、決済、B2B承認まで含めたWebアプリです。',
};

export default function SettsuMarchePage() {
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
                <span>Web App Case Study</span>
              </div>
              <span className="eyebrow">Settsu Marche</span>
              <h1 className="hero-title case-article-hero__title">
                <span className="title-line">食材ECと</span>
                <span className="title-line hero-title__accent">B2B業務を</span>
                <span className="title-line">一つの形に。</span>
              </h1>
              <p className="case-article-hero__lead">
                セッツマルシェは、地域の農家・生産者と消費者・飲食店をつなぐ食材ECプラットフォームです。
                buyer / seller / admin の導線、B2Bの承認フロー、決済、帳票出力まで含めて設計・実装しました。
              </p>
              <dl className="case-article-facts">
                <div><dt>Product</dt><dd>食材EC + 業務システム</dd></div>
                <div><dt>Role</dt><dd>buyer / seller / admin 設計</dd></div>
                <div><dt>Stack</dt><dd>Express / PostgreSQL / Stripe</dd></div>
                <div><dt>Focus</dt><dd>認証・承認・帳票・決済</dd></div>
              </dl>
              <figure className="case-article-hero__visual reveal reveal-delay-1">
                <Image
                  src="/assets/media/settsu-home.png"
                  alt="セッツマルシェのトップ画面"
                  width={1200}
                  height={750}
                  style={{ width: '100%', height: 'auto' }}
                />
                <figcaption>トップページと購入導線の入口。</figcaption>
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
                    一般的なEC機能に加えて、法人取引や管理業務まで扱う案件でした。
                    画面、権限、承認、請求を整理し、運用しやすい構成にまとめています。
                  </p>
                </section>

                <section className="case-article__section">
                  <h2>複数ロールの運用に対応</h2>
                  <p>
                    買い手、生産者、管理者で必要な画面と操作が異なるため、
                    ロールごとの責務を分けて設計しました。
                  </p>
                  <ul className="case-article__list">
                    <li>buyer / seller / admin のロールごとに責務を明確化</li>
                    <li>発注承認や顧客別価格など、法人取引特有の要件に対応</li>
                    <li>決済、帳票、配送情報まで含めて実装</li>
                  </ul>
                </section>

                <figure className="case-article__figure case-article__figure--wide">
                  <Image
                    src="/assets/media/settsu-products.png"
                    alt="セッツマルシェの商品一覧画面"
                    width={1200}
                    height={750}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <figcaption>商品一覧。検索や条件絞り込みにも対応しています。</figcaption>
                </figure>

                <section className="case-article__section">
                  <h2>認証・決済・帳票まで実装</h2>
                  <p>
                    メール認証、2段階認証、WebAuthn / パスキー、Stripe決済、注文管理、
                    帳票出力までをまとめて扱いました。
                  </p>
                  <div className="case-article__subgrid">
                    <div>
                      <h3>認証と権限</h3>
                      <p>メール認証、2段階認証、WebAuthn / パスキーに対応。</p>
                    </div>
                    <div>
                      <h3>購入体験</h3>
                      <p>商品一覧、カート、チェックアウト、再注文を実装。</p>
                    </div>
                    <div>
                      <h3>B2B運用</h3>
                      <p>発注承認、組織管理、顧客別価格、月次請求に対応。</p>
                    </div>
                  </div>
                </section>

                <figure className="case-article__figure">
                  <Image
                    src="/assets/media/settsu-order-detail.png"
                    alt="セッツマルシェの注文詳細画面"
                    width={1200}
                    height={750}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <figcaption>注文詳細。ステータス、配送情報、帳票出力を確認できます。</figcaption>
                </figure>

                <section className="case-article__section">
                  <h2>対応範囲</h2>
                  <p>
                    ECの公開画面だけでなく、管理画面、認証、決済、承認、帳票まで含めた実装です。
                    複数ロールが関わる業務アプリの設計例として掲載しています。
                  </p>
                </section>

                <section className="case-article__section case-article__section--summary">
                  <div className="case-article__closing">
                    <div>
                      <span className="eyebrow">Stack</span>
                      <p className="case-article__stack">Node.js 20 / Express 5 / EJS / PostgreSQL / Redis / Stripe / Cloudflare R2 / Jest</p>
                    </div>
                    <div>
                      <span className="eyebrow">Good For</span>
                      <p className="case-article__stack">複数ロール設計 / B2B取引 / 決済 / 認証 / 業務システム化</p>
                    </div>
                  </div>
                  <div className="hero__actions">
                    <Link className="button button--primary" href="/#contact">この方向で相談する</Link>
                    <Link className="button button--ghost" href="/categories/web-apps/">Webカテゴリへ戻る</Link>
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
