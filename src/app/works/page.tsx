import type { Metadata } from 'next';
import { TransitionLink as Link } from '@/components/TransitionLink';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import { WORKS } from '@/data/works';

export const metadata: Metadata = {
  title: 'Works | Miyabayasi Koya',
  description:
    '食、運動、地域、仕事。身近な関心や課題から、Webサービス、アプリ、システムを作っています。',
};

export default function WorksPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="sec-hero">
          <div className="sec-header">
            <div className="eyebrow">Works — Index</div>
            <div className="number" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {String(WORKS.length).padStart(2, '0')} PROJECTS
            </div>
          </div>
          <h1 className="display page-title" style={{ marginTop: 24 }}>WORKS</h1>
          <div className="grid-4-8" style={{ marginTop: 32 }}>
            <h2 className="display works-page-subtitle">つくったもの</h2>
            <p className="works-page-desc">
              食、運動、地域、仕事。<br />
              身近な関心や課題から、Webサービス、アプリ、システムを作っています。
            </p>
          </div>
        </section>

        {/* Works Cards */}
        <section className="sec-main">
          <div className="grid-2col">
            {WORKS.map((w) => (
              <Link key={w.slug} href={w.detailPath} className="reveal" style={{ display: 'block' }}>
                <div className="work-card-img-wrap">
                  <img src={w.thumbnail} alt={w.title} className="work-card-thumb" />
                  <div className="work-card-img-overlay">
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.75)' }}>
                      <span>N°{w.no} / {w.tag}</span>
                      <span>{w.year}</span>
                    </div>
                    <div className="work-card-en" style={{ color: 'var(--paper)' }}>
                      {w.en}
                    </div>
                  </div>
                </div>
                <div className="work-card-info">
                  <div>
                    <div className="work-card-title">{w.title}</div>
                    <div className="work-card-desc">{w.description}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.22em' }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
