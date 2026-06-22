import type { Metadata } from 'next';
import { SubpageHeader } from '@/components/Subpage/SubpageHeader';
import { SubpageFooter } from '@/components/Subpage/SubpageFooter';
import { CategoryWorksSection } from '@/components/Category/CategoryWorksSection';
import { CategoryContactSection } from '@/components/Category/CategoryContactSection';
import { RevealObserver } from '@/components/RevealObserver';

export const metadata: Metadata = {
  title: 'iOSアプリ開発 | koya portfolio',
  description:
    'iOSアプリ開発のカテゴリページ。継続体験、入力導線、公開ページまで含めて、現在掲載している実績を一覧で整理しています。',
};

export default function IosAppsPage() {
  return (
    <>
      <SubpageHeader />
      <main>
        <section className="hero hero--category">
          <div className="hero__shell reveal is-visible">
            <div className="category-hero">
              <div className="category-hero__label">Category / iOS Apps</div>
              <div className="category-hero__grid">
                <h1 className="hero-title hero-title--category">
                  <span className="title-line">iOSアプリ</span>
                  <span className="title-line hero-title__accent">開発実績</span>
                </h1>
                <div className="category-hero__text">
                  <p className="hero-lead">
                    記録、入力導線、継続体験を中心にしたiOSアプリの実績をまとめています。
                  </p>
                  <p className="category-hero__note">
                    日常的に使うアプリや、入力のしやすさが重要な案件に対応できます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CategoryWorksSection
          category="ios"
          headingNote="アプリ本体と公開ページの実績を掲載しています。"
        />

        <CategoryContactSection
          heading={`継続体験を大事にしたい相談も、\nここから送れます。`}
          lead="Web案件が主軸ですが、iOSアプリや入力導線の改善についてもご相談ください。"
          pageContext="ios-category"
          idPrefix="ios-contact"
          inquiryTypes={[
            { value: 'iOSアプリ', label: 'iOSアプリ' },
            { value: '継続体験の改善', label: '継続体験の改善' },
            { value: '入力導線の見直し', label: '入力導線の見直し' },
            { value: '要件整理・壁打ち', label: '要件整理・壁打ち' },
            { value: 'その他', label: 'その他' },
          ]}
          messagePlaceholder="アプリの方向性、続けやすさの課題、相談したいことなどを書いてください。"
        />
      </main>
      <SubpageFooter />
      <RevealObserver />
    </>
  );
}
