import { TransitionLink as Link } from '@/components/TransitionLink';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CaseStudySplitFrame from '@/components/CaseStudySplitFrame';
import type { CaseStudy, CaseStudyPanel } from '@/data/case-studies';

function CaseStudyLinks({ cs }: { cs: CaseStudy }) {
  const links = cs.links ?? [];
  if (links.length === 0) return null;
  return (
    <div className="cs-links">
      {links.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn">
          {link.label} <span className="arrow" />
        </a>
      ))}
    </div>
  );
}

function SpImage({ panel }: { panel: CaseStudyPanel }) {
  if (panel.image) {
    return (
      <div className="cs-sp-img-wrap">
        <img src={panel.image} alt={panel.caption} className="cs-sp-real-img" />
        <div className="cs-sp-img-overlay">
          <span>{panel.label.toUpperCase()}</span>
          <span>{panel.caption}</span>
        </div>
      </div>
    );
  }
  return (
    <div className={`ph ${panel.bg} cs-sp-img`}>
      <span className="corner">{panel.label.toUpperCase()}</span>
      <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em' }}>{panel.caption}</span>
    </div>
  );
}

function MobileLayout({ cs }: { cs: CaseStudy }) {
  return (
    <div className="cs-sp-layout">
      <section className="cs-sp-hero">
        <div className="eyebrow">Case Study — N°{cs.no}</div>
        <h1 className="display" style={{ fontSize: 'clamp(48px, 20vw, 144px)', marginTop: 14 }}>{cs.en}</h1>
        <div style={{ marginTop: 8, fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22 }}>{cs.title}</div>
        <p style={{ marginTop: 18, fontSize: 14, lineHeight: 1.85, color: 'var(--ink-2)' }}>{cs.oneline}</p>
        <CaseStudyLinks cs={cs} />
      </section>

      <SpImage panel={cs.panels[0]} />

      <section style={{ padding: '0 18px' }}>
        <div className="cs-meta-row">
          {cs.meta.map((m) => (
            <div key={m.k} className="cs-meta-cell">
              <div className="cs-meta-k">{m.k}</div>
              <div className="cs-meta-v">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      <SpImage panel={cs.panels[1]} />

      <section className="cs-sp-section">
        <div className="eyebrow" style={{ marginBottom: 12 }}>01 — Problem</div>
        <h2 className="display cs-sp-section-title">
          {cs.problemTitle}<span className="it">{cs.problemTitleItalic}</span>
        </h2>
        <p className="cs-sp-body">{cs.problem}</p>
      </section>

      <SpImage panel={cs.panels[2]} />

      <section className="cs-sp-section">
        <div className="eyebrow" style={{ marginBottom: 12 }}>02 — Approach</div>
        <h2 className="display cs-sp-section-title">
          {cs.approachTitle}<span className="it">{cs.approachTitleItalic}</span>
        </h2>
        <p className="cs-sp-body">{cs.approach}</p>
      </section>

      <SpImage panel={cs.panels[3]} />

      <section className="cs-sp-section">
        <div className="eyebrow" style={{ marginBottom: 12 }}>03 — Credits</div>
        <h2 className="display cs-sp-section-title">{cs.creditsTitle}</h2>
        {cs.credits.map((c, i) => (
          <div key={c.role} className="cs-credit-row">
            <span className="cs-credit-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="cs-credit-role">{c.role}</span>
            <span className="cs-credit-name">{c.name}</span>
          </div>
        ))}
        <Link href={`/case-studies/${cs.next.slug}/`} className="cs-next-link" style={{ marginTop: 32 }}>
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 6 }}>
              NEXT · N°{cs.next.no}
            </div>
            <div className="cs-next-title">{cs.next.en}</div>
          </div>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, letterSpacing: '0.22em' }}>→</span>
        </Link>
      </section>
    </div>
  );
}

function DesktopSections({ cs }: { cs: CaseStudy }) {
  return (
    <>
      <section data-cs-panel="0" className="cs-section-hero">
        <div>
          <div className="eyebrow">Case Study — N°{cs.no}</div>
          <h1 className="display cs-hero-title">{cs.en}</h1>
          <div className="cs-hero-jp">{cs.title}</div>
          <p className="cs-hero-oneline">{cs.oneline}</p>
          <CaseStudyLinks cs={cs} />
        </div>
        <div className="cs-meta-row">
          {cs.meta.map((m) => (
            <div key={m.k} className="cs-meta-cell">
              <div className="cs-meta-k">{m.k}</div>
              <div className="cs-meta-v">{m.v}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>
          SCROLL ↓ · 3 SECTIONS
        </div>
      </section>

      <section data-cs-panel="1" className="cs-section">
        <div className="eyebrow reveal" style={{ marginBottom: 16 }}>01 — Problem</div>
        <h2 className="display reveal cs-section-title">
          {cs.problemTitle}<br /><span className="it">{cs.problemTitleItalic}</span>
        </h2>
        <p className="reveal cs-section-body">{cs.problem}</p>
      </section>

      <section data-cs-panel="2" className="cs-section">
        <div className="eyebrow reveal" style={{ marginBottom: 16 }}>02 — Approach</div>
        <h2 className="display reveal cs-section-title">
          {cs.approachTitle}<br /><span className="it">{cs.approachTitleItalic}</span>
        </h2>
        <p className="reveal cs-section-body">{cs.approach}</p>
      </section>

      <section data-cs-panel="3" className="cs-section">
        <div className="eyebrow reveal" style={{ marginBottom: 16 }}>03 — Credits</div>
        <h2 className="display reveal cs-credits-title">{cs.creditsTitle}</h2>
        <div className="reveal">
          {cs.credits.map((c, i) => (
            <div key={c.role} className="cs-credit-row">
              <span className="cs-credit-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="cs-credit-role">{c.role}</span>
              <span className="cs-credit-name">{c.name}</span>
            </div>
          ))}
        </div>
        <Link href={`/case-studies/${cs.next.slug}/`} className="reveal cs-next-link">
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 6 }}>
              NEXT · N°{cs.next.no}
            </div>
            <div className="cs-next-title">{cs.next.en}</div>
            <div style={{ marginTop: 6, fontWeight: 600, fontSize: 15 }}>{cs.next.subtitle}</div>
          </div>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, letterSpacing: '0.22em' }}>→</span>
        </Link>
      </section>
    </>
  );
}

export default function CaseStudyPageTemplate({ cs }: { cs: CaseStudy }) {
  return (
    <>
      <Nav />
      <main>
        <div className="cs-desktop-only">
          <CaseStudySplitFrame panels={cs.panels}>
            <DesktopSections cs={cs} />
          </CaseStudySplitFrame>
        </div>
        <div className="cs-mobile-only">
          <MobileLayout cs={cs} />
        </div>
      </main>
      <Footer />
    </>
  );
}
