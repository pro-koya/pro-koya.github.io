import { TransitionLink } from '../TransitionLink';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface SubpageFooterProps {
  links?: FooterLink[];
}

const DEFAULT_LINKS: FooterLink[] = [
  { label: 'Top', href: '/' },
  { label: 'Works', href: '/works' },
  { label: 'Contact', href: '/contact' },
];

export function SubpageFooter({ links = DEFAULT_LINKS }: SubpageFooterProps) {
  return (
    <footer className="footer" style={{ padding: '40px 40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div className="footer-links">
          {links.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ) : (
              <TransitionLink key={link.href} href={link.href}>
                {link.label}
              </TransitionLink>
            ),
          )}
        </div>
        <div className="meta">© {new Date().getFullYear()} MIYABAYASI KOYA</div>
      </div>
    </footer>
  );
}
