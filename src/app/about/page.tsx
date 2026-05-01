import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import MakingParticles from '@/components/MakingParticles';

export const metadata: Metadata = {
  title: 'About | Miyabayasi Koya',
  description:
    'Miyabayasi Koya について。運動、農業、発信、ものづくりを軸に活動しています。',
};

const ACTIVITIES = [
  {
    n: '01',
    en: 'MOVE',
    jp: '運動',
    body: '運動は、自分を整えるための習慣です。筋トレ、ランニングを軸に、これからクロスフィットやHYROXにも挑戦したいと思っています。',
  },
  {
    n: '02',
    en: 'GROW',
    jp: '農業',
    body: '農業は、食べることの根っこに近づくための学びです。自分で育て、自分で食べる暮らしに少しずつ近づきたいと思っています。',
  },
  {
    n: '03',
    en: 'SHARE',
    jp: '発信',
    body: '発信は、感じたことを残すための手段です。Instagramを中心に、日々の運動、農業、暮らし、制作のことを発信しています。',
  },
] as const;

const INTERESTS = ['Fitness', 'Farming', 'Food', 'Lifestyle', 'Web Service', 'App', 'System'] as const;

const CONCEPT_ITEMS = [
  '走ること。',
  '鍛えること。',
  '土に触れること。',
  '食べるものを育てること。',
  '自分で試して、自分の言葉で残すこと。',
] as const;

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="sec-hero">
          <div className="eyebrow" style={{ marginBottom: 36 }}>About — N°001</div>
          <h1 className="display page-title">ABOUT</h1>
          <div className="grid-4-6" style={{ marginTop: 56 }}>
            <img
              src="/assets/media/site/about-portrait.jpg"
              alt="自然の中を走る後ろ姿"
              className="reveal about-portrait-img"
            />
            <div className="reveal delay-1">
              <h2 className="display about-copy-title">
                よく動き、<br />よく食べ、<br /><span className="it">よくつくる。</span>
              </h2>
              <p className="about-copy-body">
                身体を動かし、土に触れ、日々の実感を発信しながら、ときどきWebサービスやアプリ、システムを作っています。
              </p>
            </div>
          </div>
        </section>

        {/* Concept */}
        <section className="sec-main">
          <div className="eyebrow reveal" style={{ marginBottom: 18 }}>02 — Concept</div>
          <h2 className="display reveal about-concept-title">
            実感のある<br />生き方を<br /><span className="it">大事にしたい。</span>
          </h2>
          <div className="grid-5-7" style={{ marginTop: 0 }}>
            <p className="reveal about-concept-body">
              AIやテクノロジーが進化するほど、人間が自分の身体を通して感じることの価値は大きくなると思っています。
            </p>
            <ul className="reveal delay-1" style={{ display: 'grid', gap: 0 }}>
              {CONCEPT_ITEMS.map((item, i) => (
                <li key={i} className="concept-list-item">
                  <span className="number" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.16em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="concept-list-text">{item}</span>
                </li>
              ))}
              <li style={{ borderTop: '1px solid var(--line-strong)' }} />
            </ul>
          </div>
          <p className="reveal delay-2 about-quote">
            効率だけではなく、実感のある生き方を大事にしたい。<br />
            このサイトは、その実践の記録です。
          </p>
        </section>

        <div className="rule-strong" />

        {/* Activities */}
        <section className="sec-inner">
          <div className="eyebrow reveal" style={{ marginBottom: 18 }}>03 — Activities</div>
          <h2 className="display reveal about-activities-title">日々やっていること</h2>
          <div>
            {ACTIVITIES.map((row) => (
              <div key={row.n} className="reveal activity-row">
                <div className="number" style={{ fontSize: 13 }}>{row.n}</div>
                <div className="activity-en" style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 44, letterSpacing: '-0.025em', lineHeight: 1 }}>
                  {row.en}
                  <div className="activity-jp" style={{ fontFamily: 'var(--f-jp)', fontWeight: 600, fontSize: 14, marginTop: 6, color: 'var(--ink-3)', letterSpacing: 0 }}>
                    {row.jp}
                  </div>
                </div>
                <div className="activity-body" style={{ fontSize: 14.5, lineHeight: 1.9, color: 'var(--ink-2)' }}>{row.body}</div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--ink)' }} />
          </div>
        </section>

        {/* Making */}
        <section className="sec-inner making-section" style={{ background: 'var(--ink)', color: 'var(--paper)', overflow: 'hidden' }}>
          <div className="making-layout">
            <div className="making-text-col">
              <div className="eyebrow reveal" style={{ marginBottom: 18, color: 'rgba(244,241,234,0.55)' }}>04 — Making</div>
              <h2 className="display reveal about-making-title">
                たまに、<br /><span className="it">仕組みにする。</span>
              </h2>
              <div className="reveal delay-1 making-cols">
                <p className="making-text">
                  感じた課題や面白さは、ときどきWebサービスやアプリ、システムとして形にしています。
                </p>
                <p className="making-text" style={{ color: 'rgba(244,241,234,0.78)' }}>
                  作ることは目的ではなく、実感を誰かの行動や暮らしにつなげるための手段です。
                </p>
              </div>
            </div>
            <div className="making-anim-col reveal delay-2">
              <MakingParticles />
            </div>
          </div>
        </section>

        {/* Profile */}
        <section className="sec-inner">
          <div className="eyebrow reveal" style={{ marginBottom: 18 }}>05 — Profile</div>
          <div className="profile-grid">
            <div className="display reveal profile-name">
              Miyabayasi<br /><span className="it">Koya</span>
            </div>
            <div className="reveal delay-1">
              <p className="profile-bio">
                運動、農業、発信、ものづくりを軸に活動。<br />
                Webサービス、アプリ、業務システムの設計・開発にも取り組んでいます。
              </p>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Interest</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {INTERESTS.map((tag) => (
                  <span key={tag} className="interest-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
