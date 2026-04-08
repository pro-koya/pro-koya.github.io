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
  { label: 'Web', href: '/categories/web-apps/' },
  { label: 'iOS', href: '/categories/ios-apps/' },
  { label: 'Contact', href: '#contact' },
];

export function SubpageFooter({ links = DEFAULT_LINKS }: SubpageFooterProps) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__links">
          {links.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ) : (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ),
          )}
        </div>
        <div className="footer__copy">© {new Date().getFullYear()} koya portfolio</div>
      </div>
    </footer>
  );
}
