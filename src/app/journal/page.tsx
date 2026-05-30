import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';

export const metadata: Metadata = {
  title: 'Journal | Miyabayasi Koya',
  description:
    '運動、農業、暮らし、制作の記録。日々の実践で感じたことを、Instagramを中心に発信しています。',
};

const SNS_CARDS = [
  { name: 'X', label: 'NOTES', description: '短い気づき、制作ログ、考えたことを投稿しています。', cta: 'Xを見る', href: 'https://x.com/koya_1104' },
  { name: 'note', label: 'ESSAYS', description: '長く残したい考えや制作の振り返りをまとめています。', cta: 'noteを見る', href: 'https://note.com/koyablog1104' },
] as const;

export default function JournalPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="sec-hero">
          <div className="eyebrow">Journal — Feed</div>
          <h1 className="display page-title" style={{ marginTop: 18 }}>JOURNAL</h1>
          <h2 className="display journal-page-subtitle">
            動いた日、育てた野菜、考えた言葉。
          </h2>
          <p className="journal-page-desc">
            運動、農業、暮らし、制作の記録。<br />
            日々の実践で感じたことを、Instagramを中心に発信しています。
          </p>
        </section>

        {/* Instagram feature */}
        <section className="journal-featured-section">
          <div className="reveal journal-featured-block">
            <div>
              <div className="eyebrow" style={{ color: 'rgba(244,241,234,0.55)', marginBottom: 16 }}>Primary · 主導線</div>
              <div className="journal-featured-title">Instagram</div>
              <p className="journal-featured-desc">
                日々の記録。<br />運動、農業、暮らし、制作のことを中心に発信しています。
              </p>
              <a href="https://www.instagram.com/miyabayashi_koya" target="_blank" rel="noopener noreferrer"
                className="btn" style={{ marginTop: 32, color: 'var(--paper)', borderColor: 'var(--paper)' }}>
                Instagramを見る <span className="arrow" />
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="ph" style={{ aspectRatio: '1/1', padding: 8 }}>
                  <span style={{ fontSize: 9 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 9 }}>IG</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* X / note cards */}
        <section className="journal-cards-section">
          <div className="journal-cards">
            {SNS_CARDS.map((card) => (
              <a key={card.name} href={card.href} target="_blank" rel="noopener noreferrer"
                className="reveal journal-card-item">
                <div className="eyebrow">{card.label}</div>
                <div>
                  <div className="journal-card-title">{card.name}</div>
                  <p className="journal-card-desc">{card.description}</p>
                  <span className="number" style={{ fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
                    {card.cta} →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div style={{ height: 100 }} className="page-spacer" />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
