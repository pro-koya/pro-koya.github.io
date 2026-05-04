'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const TRANSLATIONS = {
  ja: {
    metaTitle: 'Calm Blokku - 毎日届く、大人のブロックパズル',
    metaDescription: 'Calm Blokku - 落ち着いた配色の禅パズル。毎日届くデイリーパズルで頭のストレッチ。',
    nav: { features: '特長', howto: '遊び方', privacy: 'プライバシー', contact: 'お問い合わせ' },
    hero: {
      badge: 'デイリーブロックパズル',
      tagline: ['毎日届く、落ち着いた大人のためのブロックパズル。', '通勤中やリラックスタイムに、頭のストレッチを。'],
      appStore: 'App Store でダウンロード',
    },
    features: {
      title: '毎日の習慣になる、シンプルなパズル',
      desc: '派手さはいらない。静かに集中できるブロックパズルを、毎日あなたに届けます。',
      items: [
        { title: '毎日届くデイリーパズル', desc: '毎日1〜3問の新しいパズルが届きます。世界中のプレイヤーが同じ問題に挑戦。難易度はEASY・MEDIUM・HARDの3段階。' },
        { title: 'エンドレスモード', desc: 'デイリーを解き終えたら、エンドレスモードへ。失敗するまで次々と出題され、レベルが上がるほど難しくなります。' },
        { title: '落ち着いた禅デザイン', desc: '温かみのあるクリーム背景にミュートトーンの配色。大人が心地よく使える、静かで美しいデザインです。' },
        { title: 'ストリーク記録', desc: '毎日プレイして連続記録を伸ばそう。カレンダーで達成状況を一覧でき、過去1週間分の問題にも挑戦できます。' },
      ],
    },
    howto: {
      title: '遊び方',
      desc: 'シンプルなルール、奥深いパズル。',
      steps: [
        { title: 'ピースを選ぶ', desc: '画面下のピースをタップして選択するか、ドラッグしてボードに直接配置します。' },
        { title: 'ボードに置く', desc: '8×8のボードにピースを配置。有効な場所はハイライトされるので、迷いません。' },
        { title: 'ラインを消す', desc: '横一列または縦一列を埋めるとラインが消去。複数ライン同時消去でコンボボーナス。' },
        { title: '全ピースを置けばクリア', desc: 'すべてのピースを配置できればクリア。置けなくなっても、広告視聴で1回だけ復活できます。' },
      ],
    },
    privacy: {
      title: 'プライバシーポリシー',
      updated: '最終更新日: 2026年3月25日',
      overview: {
        title: '概要',
        p1: 'Calm Blokku（以下「本アプリ」）は、お客様のプライバシーを尊重し、個人情報の保護に努めます。本ポリシーでは、本アプリにおけるデータの取り扱いについて説明します。',
      },
      local: {
        title: 'ローカルデータの保存',
        p1: '本アプリは以下のデータを端末内（AsyncStorage）にのみ保存します。これらのデータは外部サーバーに送信されることはありません。',
        items: ['ゲームの進捗状況（スコア、クリア履歴）', '連続プレイ日数（ストリーク）', 'アプリ設定（バイブレーション・効果音のON/OFF）', 'エンドレスモードのスコア履歴'],
      },
      ads: {
        title: '広告配信について',
        p1: '本アプリは Google AdMob を利用して広告を表示します。AdMob は広告配信の最適化のため、以下のデータを収集する場合があります。',
        items: ['デバイスの広告識別子（IDFA）', '広告の表示・クリックに関するデータ', 'デバイス情報（OS バージョン、デバイスモデル等）'],
        p2: 'iOS では、広告トラッキングの前に App Tracking Transparency（ATT）ダイアログを表示し、お客様の同意を求めます。トラッキングを許可しない場合でも、アプリは正常にご利用いただけます。',
        p3: 'Google AdMob のプライバシーポリシーについては、以下をご参照ください。',
        link: 'Google プライバシーポリシー',
      },
      collection: {
        title: '個人情報の収集',
        p1: '本アプリはアカウント登録・ログイン機能を提供しておらず、お客様の氏名、メールアドレス、電話番号等の個人情報を収集することはありません。',
      },
      children: {
        title: '子供のプライバシー',
        p1: '本アプリは13歳未満のお子様から意図的に個人情報を収集することはありません。',
      },
      changes: {
        title: 'ポリシーの変更',
        p1: '本ポリシーは予告なく変更される場合があります。変更があった場合は、本ページにて更新日を更新します。',
      },
    },
    contact: {
      title: 'お問い合わせ',
      desc: 'ご質問・ご要望・不具合の報告は以下のフォームよりお送りください。',
      btn: 'お問い合わせフォームを開く',
    },
    footer: { features: '特長', howto: '遊び方', privacy: 'プライバシー', contact: 'お問い合わせ', copyright: '© Calm Blokku', creator: '制作: Miyabayasi Koya' },
    lang: { ja: '日本語', en: 'English' },
    urls: {
      appStore: 'https://apps.apple.com/us/app/calm-blokku/id6761009357',
      contactForm: 'https://forms.gle/kwtwF2FkEDE12ZcX8',
    },
  },
  en: {
    metaTitle: 'Calm Blokku - A Daily Block Puzzle for Adults',
    metaDescription: 'Calm Blokku - A calm, zen-themed block puzzle. Stretch your mind with daily puzzles.',
    nav: { features: 'Features', howto: 'How to Play', privacy: 'Privacy', contact: 'Contact' },
    hero: {
      badge: 'Daily Block Puzzle',
      tagline: ['A calm block puzzle for adults, delivered daily.', 'Perfect for your commute or quiet time.'],
      appStore: 'Download on the App Store',
    },
    features: {
      title: 'A simple puzzle that becomes a daily habit',
      desc: 'No flashy effects. Just a calm, focused block puzzle delivered to you every day.',
      items: [
        { title: 'Daily Puzzles', desc: '1 to 3 new puzzles every day. Everyone in the world gets the same puzzles. Three difficulty levels: Easy, Medium, and Hard.' },
        { title: 'Endless Mode', desc: "Done with today's puzzles? Try Endless Mode. Puzzles keep coming until you fail, getting harder as you level up." },
        { title: 'Calm Zen Design', desc: 'Warm cream background with muted tones. A quiet, beautiful design that adults enjoy.' },
        { title: 'Streak Tracking', desc: 'Play every day to build your streak. View your progress on the calendar and replay puzzles from the past week.' },
      ],
    },
    howto: {
      title: 'How to Play',
      desc: 'Simple rules, deep puzzles.',
      steps: [
        { title: 'Select a Piece', desc: 'Tap a piece at the bottom to select it, or drag it directly onto the board.' },
        { title: 'Place on the Board', desc: 'Place pieces on the 8×8 board. Valid positions are highlighted so you know where to go.' },
        { title: 'Clear Lines', desc: 'Fill a complete row or column to clear it. Clear multiple lines at once for combo bonuses.' },
        { title: 'Place All Pieces to Win', desc: 'Place every piece to complete the puzzle. If you get stuck, watch an ad to revive once.' },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: March 25, 2026',
      overview: {
        title: 'Overview',
        p1: 'Calm Blokku ("the App") respects your privacy and is committed to protecting your personal information. This policy explains how data is handled within the App.',
      },
      local: {
        title: 'Local Data Storage',
        p1: 'The App stores the following data only on your device (AsyncStorage). This data is never transmitted to external servers.',
        items: ['Game progress (scores, completion history)', 'Consecutive play days (streak)', 'App settings (vibration and sound on/off)', 'Endless mode score history'],
      },
      ads: {
        title: 'Advertising',
        p1: 'The App uses Google AdMob to display ads. AdMob may collect the following data to optimize ad delivery.',
        items: ['Device advertising identifier (IDFA)', 'Ad display and click data', 'Device information (OS version, device model, etc.)'],
        p2: 'On iOS, an App Tracking Transparency (ATT) dialog is shown before any ad tracking, requesting your consent. You can use the App normally even if you decline tracking.',
        p3: 'For Google AdMob\'s privacy policy, please refer to:',
        link: 'Google Privacy Policy',
      },
      collection: {
        title: 'Personal Information',
        p1: 'The App does not provide account registration or login features, and does not collect personal information such as name, email address, or phone number.',
      },
      children: {
        title: "Children's Privacy",
        p1: 'The App does not intentionally collect personal information from children under 13.',
      },
      changes: {
        title: 'Policy Changes',
        p1: 'This policy may be updated without prior notice. When changes are made, the update date on this page will be revised.',
      },
    },
    contact: {
      title: 'Contact',
      desc: 'For questions, feedback, or bug reports, please use the form below.',
      btn: 'Open contact form',
    },
    footer: { features: 'Features', howto: 'How to Play', privacy: 'Privacy', contact: 'Contact', copyright: '© Calm Blokku', creator: 'Created by Miyabayasi Koya' },
    lang: { ja: '日本語', en: 'English' },
    urls: {
      appStore: 'https://apps.apple.com/us/app/calm-blokku/id6761009357',
      contactForm: 'https://forms.gle/kwtwF2FkEDE12ZcX8',
    },
  },
} as const;

type Lang = keyof typeof TRANSLATIONS;

const FEATURE_ICONS = [
  <svg key="calendar" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/></svg>,
  <svg key="endless" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="zen" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="streak" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>,
];

function BlockzenContent() {
  const searchParams = useSearchParams();
  const langParam = searchParams.get('lang');
  const lang: Lang = langParam === 'en' ? 'en' : 'ja';
  const t = TRANSLATIONS[lang];

  const [menuOpen, setMenuOpen] = useState(false);

  const getLangUrl = (l: string) => `?lang=${l}`;

  return (
    <>
      <nav className={`nav${menuOpen ? ' is-open' : ''}`} id="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo">Calm Blokku</a>
          <span className="nav-lang">
            <a href={getLangUrl('ja')} className={`nav-lang-link${lang === 'ja' ? ' is-active' : ''}`}>{t.lang.ja}</a>
            <span className="nav-lang-sep" aria-hidden="true">|</span>
            <a href={getLangUrl('en')} className={`nav-lang-link${lang === 'en' ? ' is-active' : ''}`}>{t.lang.en}</a>
          </span>
          <button
            type="button"
            className="nav-toggle"
            id="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            aria-label={menuOpen ? (lang === 'en' ? 'Close menu' : 'メニューを閉じる') : (lang === 'en' ? 'Open menu' : 'メニューを開く')}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
          <div className="nav-right" id="nav-menu">
            <div className="nav-links">
              <a href="#features" onClick={() => setMenuOpen(false)}>{t.nav.features}</a>
              <a href="#howto" onClick={() => setMenuOpen(false)}>{t.nav.howto}</a>
              <a href="#privacy" onClick={() => setMenuOpen(false)}>{t.nav.privacy}</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content container">
          <span className="hero-badge">{t.hero.badge}</span>
          <h1>Calm Blokku</h1>
          <p className="hero-tagline">
            {t.hero.tagline[0]}<br />{t.hero.tagline[1]}
          </p>
          <div className="store-buttons">
            <a href={t.urls.appStore} className="store-btn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
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
            {t.features.items.map((item, i) => (
              <article key={i} className="feature-card">
                <div className="feature-icon">{FEATURE_ICONS[i]}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
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
              {t.howto.steps.map((step, i) => (
                <div key={i} className="howto-step">
                  <span className="step-num">{i + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
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
              <p>{t.privacy.updated}</p>
            </div>
            <div className="legal-section">
              <h3>{t.privacy.overview.title}</h3>
              <p>{t.privacy.overview.p1}</p>

              <h3>{t.privacy.local.title}</h3>
              <p>{t.privacy.local.p1}</p>
              <ul>
                {t.privacy.local.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h3>{t.privacy.ads.title}</h3>
              <p>{t.privacy.ads.p1}</p>
              <ul>
                {t.privacy.ads.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p>{t.privacy.ads.p2}</p>
              <p>{t.privacy.ads.p3}</p>
              <p>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  {t.privacy.ads.link}
                </a>
              </p>

              <h3>{t.privacy.collection.title}</h3>
              <p>{t.privacy.collection.p1}</p>

              <h3>{t.privacy.children.title}</h3>
              <p>{t.privacy.children.p1}</p>

              <h3>{t.privacy.changes.title}</h3>
              <p>{t.privacy.changes.p1}</p>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="container">
            <div className="contact-cta">
              <h3>{t.contact.title}</h3>
              <p>{t.contact.desc}</p>
              <a href={t.urls.contactForm} className="btn-primary" target="_blank" rel="noopener noreferrer">
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

export default function BlockzenPage() {
  return (
    <Suspense>
      <BlockzenContent />
    </Suspense>
  );
}
