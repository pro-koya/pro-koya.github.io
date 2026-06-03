import { BrandMark } from './BrandMark';
import { TransitionLink } from './TransitionLink';

const FOOTER_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/miyabayashi_koya' },
  { label: 'X', href: 'https://x.com/koya_1104' },
  { label: 'note', href: 'https://note.com/koyablog1104' },
  { label: 'GitHub', href: 'https://github.com/pro-koya' },
  { label: 'Booking', href: '/booking' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-display">
        MOVE.
        <br />
        EAT.
        <br />
        MAKE.
      </div>
      <div className="footer-copy">よく動き、よく食べ、よくつくる。</div>
      <div className="footer-row">
        <div>
          <div className="footer-brand">
            <BrandMark size={26} tone="paper" />
            <span>MIYABAYASI KOYA</span>
          </div>
          <div className="footer-links">
            {FOOTER_LINKS.map((link) =>
              link.href.startsWith('/') ? (
                <TransitionLink key={link.label} href={link.href}>
                  {link.label}
                </TransitionLink>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ),
            )}
          </div>
        </div>
        <div className="meta" style={{ textAlign: 'right' }}>
          © 2026 — KOYA
          <br />
          NO.001 / VOL.A
        </div>
      </div>
    </footer>
  );
}
