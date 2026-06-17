'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const TRANSLATIONS = {
  ja: {
    title: 'Liftly - シンプルで続く、筋トレ記録アプリ',
    description: 'Liftly - シンプルで美しい筋トレ記録アプリ。トレーニングログ、種目別成長グラフ、体重管理を一つに。',
    nav: { features: '機能', howto: '使い方', privacy: 'プライバシー', contact: 'お問い合わせ' },
    hero: {
      badge: '筋トレ記録アプリ',
      tagline: 'シンプルで美しい。続けたくなるトレーニングログ。\n重量・回数・種目別の成長を、一つにまとめて。',
      videoTitle: 'Liftlyアプリのプロモーション動画',
      watchYoutube: 'YouTube で見る',
      appStore: 'App Store でダウンロード',
    },
    features: {
      title: 'トレーニングを、もっとシンプルに',
      desc: 'Liftlyは、記録に悩まされず本気のトレーニングに集中できるアプリです。',
      f1: { title: '直感的な記録', desc: '種目を選び、重量と回数を入力するだけ。前回の記録をワンタップで再現できるので、セット間の操作は最小限です。' },
      f2: { title: '種目別の成長グラフ', desc: '重量・回数・ボリュームの推移をグラフで確認。1M〜5Yの期間で、あなたの成長を視覚的に把握できます。' },
      f3: { title: 'セット間タイマー', desc: '休憩時間を計測。バックグラウンドでも動作するので、スマホを置いたまま次のセットに備えられます。' },
      f4: { title: '体重管理', desc: '体重の推移を記録し、月間の変化を確認。トレーニング頻度と体重の関係をインサイトで把握できます。' },
      f5: { title: 'バックアップ・復元', desc: 'JSON/CSV形式でエクスポート・インポート可能。データは端末内に保存され、あなたがコントロールできます。' },
      f6: { title: 'カスタマイズ', desc: 'テーマや単位（kg/lb）、言語（日本語/English）を切り替え。あなた好みの環境で続けられます。' },
      f7: { title: 'Muscle360 Pro', desc: 'Forge・筋肉ごめん・Liftly の Muscle360 ファミリー。Muscle360 Pro バンドルなら、1つの購読で3アプリの Pro 機能が使えます。' },
    },
    howto: {
      title: 'はじめ方',
      desc: '初回起動から最初のワークアウトまで、3ステップでスタート。',
      s1: { title: 'アプリを起動し、トレーニング開始', desc: 'ホーム画面の「トレーニング開始」をタップ。種目を追加して、重量・回数を入力します。セットを追加するときは「セット追加」ボタンで簡単に記録できます。' },
      s2: { title: '記録完了でセッションを保存', desc: 'トレーニングが終わったら「記録完了」をタップ。その日のワークアウトがカレンダーと履歴に保存されます。後から編集・削除も可能です。' },
      s3: { title: '成長をグラフで確認', desc: '種目一覧から任意の種目をタップすると、成長グラフを表示。重量・回数・ボリュームの推移を期間（1M〜5Y）で切り替えて確認できます。' },
    },
    privacy: {
      title: 'プライバシーポリシー',
      p1: '本アプリのトレーニングデータは端末内に保存されます。任意で Muscle360 Pro バンドルをご利用の場合のみ、3アプリ間で Pro を共有するために Apple / Google / Supabase 認証によりメールアドレスとユーザーIDを扱います。',
      p2: 'アプリ内課金、広告表示に関わる処理について、各サービス提供者のポリシーが適用されます。\n詳しくはアプリ内の利用規約・プライバシーポリシーをご確認ください。',
    },
    contact: { title: 'お問い合わせ', desc: 'ご質問・ご要望は以下のフォームよりお送りください。', btn: 'お問い合わせフォームを開く' },
    footer: { features: '機能', howto: '使い方', privacy: 'プライバシー', contact: 'お問い合わせ', copyright: '© Liftly - Simple Fitness Log', creator: '制作: Miyabayasi Koya' },
    lang: { ja: '日本語', en: 'English' },
    urls: {
      appStore: 'https://apps.apple.com/app/liftly-simple-workout-log/id6757798075',
      contactForm: 'https://forms.gle/kwtwF2FkEDE12ZcX8',
      youtubeShort: 'https://youtube.com/shorts/HWuYU6D3kqw?feature=share',
    },
  },
  en: {
    title: 'Liftly - Simple Workout Log',
    description: 'Liftly - A simple, beautiful workout logger. Training log, progress by exercise, and weight tracking in one app.',
    nav: { features: 'Features', howto: 'How to', privacy: 'Privacy', contact: 'Contact' },
    hero: {
      badge: 'Workout Log App',
      tagline: "Simple and clear. A training log you'll want to keep.\nTrack weight, reps, and progress by exercise in one place.",
      videoTitle: 'Liftly app promotion video',
      watchYoutube: 'Watch on YouTube',
      appStore: 'Download on the App Store',
    },
    features: {
      title: 'Training, made simpler',
      desc: "Liftly lets you focus on your workout instead of wrestling with your log.",
      f1: { title: 'Intuitive logging', desc: 'Pick an exercise, enter weight and reps. One tap to repeat your last set, so you spend less time on your phone between sets.' },
      f2: { title: 'Progress by exercise', desc: "View trends for weight, reps, and volume in graphs. Switch between 1M and 5Y to see how you're growing." },
      f3: { title: 'Rest timer', desc: 'Time your rest between sets. Runs in the background so you can put your phone down until the next set.' },
      f4: { title: 'Weight tracking', desc: 'Log your weight and see monthly changes. See how training frequency and weight relate over time.' },
      f5: { title: 'Backup & restore', desc: 'Export and import as JSON or CSV. Data stays on your device and under your control.' },
      f6: { title: 'Customization', desc: 'Switch theme, units (kg/lb), and language (Japanese/English) to match your preference.' },
      f7: { title: 'Muscle360 Pro', desc: 'Liftly is part of the Muscle360 family with Forge and SorryGains. One Muscle360 Pro subscription unlocks Pro features across all three apps.' },
    },
    howto: {
      title: 'Getting started',
      desc: 'From first launch to your first workout in three steps.',
      s1: { title: 'Start a workout', desc: 'Tap "Start workout" on the home screen. Add exercises and enter weight and reps. Use "Add set" to log each set quickly.' },
      s2: { title: 'Save your session', desc: "When you're done, tap \"Finish\". Your workout is saved to the calendar and history. You can edit or delete it later." },
      s3: { title: 'Check your progress', desc: 'Tap any exercise in the list to open its progress graph. Switch between 1M and 5Y to view weight, reps, and volume over time.' },
    },
    privacy: {
      title: 'Privacy Policy',
      p1: 'Your training data is stored on your device. Only when you use the optional Muscle360 Pro bundle, your email and user ID are handled via Apple / Google / Supabase sign-in to share Pro across the three apps.',
      p2: "In-app purchases and ads are subject to the respective service providers' policies.\nSee the in-app terms and privacy policy for details.",
    },
    contact: { title: 'Contact', desc: 'Send questions or feedback using the form below.', btn: 'Open contact form' },
    footer: { features: 'Features', howto: 'How to', privacy: 'Privacy', contact: 'Contact', copyright: '© Liftly - Simple Fitness Log', creator: 'Created by Miyabayasi Koya' },
    lang: { ja: '日本語', en: 'English' },
    urls: {
      appStore: 'https://apps.apple.com/app/liftly-simple-workout-log/id6757798075',
      contactForm: 'https://forms.gle/4xBiNdntNHTSyRWc6',
      youtubeShort: 'https://youtube.com/shorts/HWuYU6D3kqw?feature=share',
    },
  },
} as const;

type Lang = keyof typeof TRANSLATIONS;

function renderTagline(text: string) {
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>
  ));
}

function AppleSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function LiftlyContent() {
  const searchParams = useSearchParams();
  const rawLang = searchParams.get('lang')?.toLowerCase();
  const lang: Lang = rawLang === 'en' ? 'en' : 'ja';
  const t = TRANSLATIONS[lang];

  const langUrl = (l: Lang) => `/liftly/?lang=${l}`;

  return (
    <>
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo">Liftly</a>
          <span className="nav-lang">
            <a href={langUrl('ja')} className={`nav-lang-link${lang === 'ja' ? ' is-active' : ''}`}>{t.lang.ja}</a>
            <span className="nav-lang-sep" aria-hidden="true">|</span>
            <a href={langUrl('en')} className={`nav-lang-link${lang === 'en' ? ' is-active' : ''}`}>{t.lang.en}</a>
          </span>
          <div className="nav-right" id="nav-menu">
            <div className="nav-links">
              <a href="#features">{t.nav.features}</a>
              <a href="#howto">{t.nav.howto}</a>
              <a href="#privacy">{t.nav.privacy}</a>
              <a href="#contact">{t.nav.contact}</a>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content container">
          <span className="hero-badge">{t.hero.badge}</span>
          <h1>Liftly</h1>
          <p className="hero-tagline">{renderTagline(t.hero.tagline)}</p>
          <div className="hero-video-wrap">
            <iframe
              className="hero-video"
              src="https://www.youtube.com/embed/s2aB3qd8uTo"
              title={t.hero.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <a
              href={t.urls.youtubeShort}
              className="hero-video-link"
              target="_blank"
              rel="noopener"
            >
              {t.hero.watchYoutube}
            </a>
          </div>
          <div className="store-buttons">
            <a
              href={t.urls.appStore}
              className="store-btn"
              target="_blank"
              rel="noopener"
            >
              <AppleSvg />
              {t.hero.appStore}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="features" className="container">
          <div className="section-header">
            <h2>{t.features.title}</h2>
            <p>{t.features.desc}</p>
          </div>
          <div className="features-grid">
            {(
              [
                { key: 'f1', icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { key: 'f2', icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { key: 'f3', icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { key: 'f4', icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M8 21h8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M6 8h12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M9 12h6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg> },
                { key: 'f5', icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12a9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 3v6h-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { key: 'f6', icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg> },
                { key: 'f7', icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12l9 5 9-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 17l9 5 9-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              ] as { key: 'f1'|'f2'|'f3'|'f4'|'f5'|'f6'|'f7'; icon: React.ReactNode }[]
            ).map(({ key, icon }) => (
              <article className="feature-card" key={key}>
                <div className="feature-icon">{icon}</div>
                <h3>{t.features[key].title}</h3>
                <p>{t.features[key].desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="howto">
          <div className="container">
            <div className="section-header">
              <h2>{t.howto.title}</h2>
              <p>{t.howto.desc}</p>
            </div>
            <div className="howto-steps">
              {(['s1', 's2', 's3'] as const).map((key, i) => (
                <div className="howto-step" key={key}>
                  <span className="step-num">{i + 1}</span>
                  <div>
                    <h3>{t.howto[key].title}</h3>
                    <p>{t.howto[key].desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="privacy">
          <div className="container">
            <div className="section-header">
              <h2>{t.privacy.title}</h2>
            </div>
            <div className="legal-section">
              <p>{t.privacy.p1}</p>
              <p>{renderTagline(t.privacy.p2)}</p>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="contact-cta">
              <h3>{t.contact.title}</h3>
              <p>{t.contact.desc}</p>
              <a
                href={t.urls.contactForm}
                className="btn-primary"
                target="_blank"
                rel="noopener"
              >
                {t.contact.btn}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner container">
          <div className="footer-links">
            <a href="#features">{t.footer.features}</a>
            <a href="#howto">{t.footer.howto}</a>
            <a href="#privacy">{t.footer.privacy}</a>
            <a href="#contact">{t.footer.contact}</a>
          </div>
          <div className="footer-meta">
            <span className="footer-copy">{t.footer.copyright}</span>
            <a className="footer-creator" href="/">
              {t.footer.creator}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function LiftlyPage() {
  return (
    <Suspense>
      <LiftlyContent />
    </Suspense>
  );
}
