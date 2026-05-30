import { TransitionLink as Link } from '@/components/TransitionLink';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Ticker from '@/components/Ticker';
import HumanLoop from '@/components/HumanLoop';
import RevealObserver from '@/components/RevealObserver';
import { WORKS } from '@/data/works';
import { SOCIAL_LINKS } from '@/data/social';

function HeroSection() {
  return (
    <section className="sec-hero">
      <div className="sec-header" style={{ marginBottom: 36 }}>
        <div className="eyebrow">Vol.01 · Personal Field</div>
        <div className="number" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          2026 / SPRING
        </div>
      </div>

      <h1 className="display reveal" style={{ fontSize: 'clamp(48px, 12vw, 160px)' }}>
        MOVE.<br />EAT.<br /><span className="it">MAKE.</span>
      </h1>

      <div className="hero-bottom" style={{ marginTop: 60 }}>
        <div className="reveal delay-1 hero-desc">
          <strong style={{ fontWeight: 700 }}>よく動き、よく食べ、よくつくる。</strong><br />
          身体を動かし、土に触れ、日々の実感を発信する。<br />
          ときどき、Webサービスやアプリに変換する。
        </div>
        <div className="reveal delay-2" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/journal" className="btn btn-fill">
            Journalを見る <span className="arrow" />
          </Link>
          <Link href="/works" className="btn">
            Worksを見る <span className="arrow" />
          </Link>
        </div>
      </div>

      <div className="reveal delay-3 grid-hero-img" style={{ marginTop: 60 }}>
        <img src="/assets/media/site/hero-running.jpg" alt="夜明けのランニング" className="hero-img-main" />
        <div className="hero-img-sub-stack">
          <img src="/assets/media/site/hero-soil.jpg" alt="土に触れる" className="hero-img-sub" />
          <img src="/assets/media/site/hero-desk.jpg" alt="制作の現場" className="hero-img-sub" />
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span className="number" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          SCROLL ↓
        </span>
        <span className="number" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          4 FIELDS · 4 PRACTICES · 1 PERSON
        </span>
      </div>
    </section>
  );
}

function ConceptSection() {
  return (
    <section className="sec-main grid-5-7">
      <div className="reveal">
        <div className="eyebrow" style={{ marginBottom: 22 }}>02 — Concept</div>
        <h2 className="display" style={{ fontSize: 'clamp(28px, 5vw, 64px)', lineHeight: 1.05 }}>
          AI時代に、身体でわかることを大事にしたい。
        </h2>
      </div>
      <div className="reveal delay-1 concept-body">
        <p style={{ marginBottom: '1.4em' }}>AIが文章を書き、コードを書き、仕事の進め方まで変えていく時代。</p>
        <p style={{ marginBottom: '1.4em' }}>
          だからこそ、走る。鍛える。土に触れる。自分で育てて、自分で食べる。
        </p>
        <p className="concept-quote">
          便利な道具は使う。<br />でも、生きる感覚までは手放さない。
        </p>
        <p>
          運動、農業、発信、開発。<br />その実践を、このサイトに残していきます。
        </p>
      </div>
    </section>
  );
}

function JournalSection() {
  return (
    <section className="sec-main">
      <div className="reveal sec-header" style={{ marginBottom: 60 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>03 — Journal</div>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 7.5vw, 96px)' }}>日々の記録</h2>
        </div>
        <p className="sec-header-note">
          運動、農業、生活、制作。感じたことを、Instagramを中心に発信しています。
        </p>
      </div>
      <div className="reveal delay-1 grid-journal">
        {/* Instagram */}
        <a href="https://www.instagram.com/miyabayashi_koya" target="_blank" rel="noopener noreferrer"
          className="ph dark journal-ig-tile">
          <div className="number" style={{ fontSize: 10, letterSpacing: '0.24em', color: 'rgba(244,241,234,0.55)' }}>
            PRIMARY · 主導線
          </div>
          <div>
            <div className="journal-ig-title">Instagram</div>
            <div className="journal-tile-desc" style={{ color: 'rgba(244,241,234,0.75)' }}>
              運動、農業、暮らし、制作のことを中心に発信しています。
            </div>
            <div style={{ marginTop: 22, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.24em', color: 'var(--rust-2)' }}>
              VIEW @KOYA →
            </div>
          </div>
        </a>
        {/* X */}
        <a href="https://x.com/koya_1104" target="_blank" rel="noopener noreferrer"
          className="ph journal-sub-tile">
          <div className="number" style={{ fontSize: 10, letterSpacing: '0.24em' }}>NOTES</div>
          <div>
            <div className="journal-sub-title">X</div>
            <div className="journal-tile-desc" style={{ color: 'var(--ink-2)' }}>短い気づき、制作ログ。</div>
            <div style={{ marginTop: 14, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 10, letterSpacing: '0.24em', color: 'var(--ink)' }}>VIEW →</div>
          </div>
        </a>
        {/* note */}
        <a href="https://note.com/koyablog1104" target="_blank" rel="noopener noreferrer"
          className="ph journal-sub-tile">
          <div className="number" style={{ fontSize: 10, letterSpacing: '0.24em' }}>ESSAYS</div>
          <div>
            <div className="journal-sub-title">note</div>
            <div className="journal-tile-desc" style={{ color: 'var(--ink-2)' }}>長く残したい考えと振り返り。</div>
            <div style={{ marginTop: 14, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 10, letterSpacing: '0.24em', color: 'var(--ink)' }}>VIEW →</div>
          </div>
        </a>
      </div>
    </section>
  );
}

function WorksSection() {
  return (
    <section className="sec-main">
      <div className="reveal sec-header" style={{ marginBottom: 60 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>04 — Works</div>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 7.5vw, 96px)' }}>つくってきたもの</h2>
        </div>
        <Link href="/works" className="btn">
          すべてのWorks <span className="arrow" />
        </Link>
      </div>
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
  );
}

function ContactPreview() {
  return (
    <section className="sec-preview" style={{ background: 'var(--paper-2)' }}>
      <div className="reveal grid-6-6">
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>05 — Contact</div>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 6.5vw, 84px)', marginBottom: 24 }}>
            関心が、<br />重なるなら。
          </h2>
          <p className="contact-preview-text">
            制作、開発、協業、取材など、お気軽にご連絡ください。<br />
            関心が重なるテーマだと、特にうれしいです。
          </p>
        </div>
        <div className="contact-cta-col">
          <Link href="/contact" className="btn btn-fill" style={{ padding: '20px 32px', fontSize: 13 }}>
            相談する <span className="arrow" />
          </Link>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.24em', color: 'var(--ink-3)', textTransform: 'uppercase', display: 'flex', gap: 18 }}>
            {SOCIAL_LINKS.map((link) => (
              <a key={link.shortLabel} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.shortLabel}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <HumanLoop />
        <ConceptSection />
        <Ticker />
        <JournalSection />
        <div className="rule-strong" />
        <WorksSection />
        <ContactPreview />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
