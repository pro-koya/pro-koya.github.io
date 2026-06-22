import type { Metadata } from 'next';
import { SubpageHeader } from '@/components/Subpage/SubpageHeader';
import { SubpageFooter } from '@/components/Subpage/SubpageFooter';
import { CategoryWorksSection } from '@/components/Category/CategoryWorksSection';
import { CategoryContactSection } from '@/components/Category/CategoryContactSection';
import { RevealObserver } from '@/components/RevealObserver';

export const metadata: Metadata = {
  title: 'Webアプリ開発・業務システム開発 | koya portfolio',
  description:
    'Webアプリ開発・業務システム開発のカテゴリページ。運用前提のプロダクト開発として、現在掲載している実績を一覧で整理しています。',
};

export default function WebAppsPage() {
  return (
    <>
      <SubpageHeader />
      <main>
        <section className="hero hero--category">
          <div className="hero__shell reveal is-visible">
            <div className="category-hero">
              <div className="category-hero__label">Category / Web Apps</div>
              <div className="category-hero__grid">
                <h1 className="hero-title hero-title--category">
                  <span className="title-line">Webアプリ・</span>
                  <span className="title-line hero-title__accent">業務システム</span>
                </h1>
                <div className="category-hero__text">
                  <p className="hero-lead">
                    会員機能、管理画面、認証、決済、権限設計など、
                    業務で使うWebアプリの実績をまとめています。
                  </p>
                  <p className="category-hero__note">
                    既存業務のWeb化、複数ロール設計、決済や承認フローを含む案件に対応できます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CategoryWorksSection
          category="web"
          headingNote="対応範囲と実装内容が分かる実績を掲載しています。"
        />

        <CategoryContactSection
          heading={`このカテゴリに近い相談なら、\nそのまま送ってください。`}
          lead="構想段階の相談でも大丈夫です。要件を整理しながら、必要な形を一緒に考えます。"
          pageContext="web-category"
          idPrefix="web-contact"
          inquiryTypes={[
            { value: 'Webアプリ開発', label: 'Webアプリ開発' },
            { value: '業務システム改善', label: '業務システム改善' },
            { value: '管理画面・認証・決済', label: '管理画面・認証・決済' },
            { value: '要件整理・壁打ち', label: '要件整理・壁打ち' },
            { value: 'その他', label: 'その他' },
          ]}
          messagePlaceholder="やりたいこと、現状の課題、想定している導線などを書いてください。"
        />
      </main>
      <SubpageFooter />
      <RevealObserver />
    </>
  );
}
