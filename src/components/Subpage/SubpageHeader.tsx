'use client';

import { BrandMark } from '../BrandMark';
import { TransitionLink } from '../TransitionLink';

interface NavLink {
  label: string;
  href: string;
  isAnchor?: boolean;
}

interface SubpageHeaderProps {
  navLinks?: NavLink[];
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Top', href: '/' },
  { label: 'Works', href: '/works' },
  { label: 'Contact', href: '/contact' },
];

export function SubpageHeader({ navLinks = DEFAULT_LINKS }: SubpageHeaderProps) {
  return (
    <header className="nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <TransitionLink href="/" className="brand" aria-label="ホームへ">
          <BrandMark size={24} tone="ink" />
          <span>MIYABAYASI&nbsp;KOYA</span>
        </TransitionLink>
      </div>
      <nav className="nav-links">
        {navLinks.map((link) =>
          link.isAnchor ? (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ) : (
            <TransitionLink key={link.href} href={link.href}>
              {link.label}
            </TransitionLink>
          ),
        )}
      </nav>
    </header>
  );
}
