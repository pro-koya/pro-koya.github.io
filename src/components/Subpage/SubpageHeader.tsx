'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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
  { label: 'Web', href: '/categories/web-apps/' },
  { label: 'iOS', href: '/categories/ios-apps/' },
  { label: 'Contact', href: '#contact', isAnchor: true },
];

export function SubpageHeader({ navLinks = DEFAULT_LINKS }: SubpageHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 820) setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      ref={headerRef}
      className={`site-header${isScrolled ? ' is-scrolled' : ''}`}
      data-site-header
    >
      <div className="site-header__inner">
        <Link className="site-brand" href="/">
          <span className="site-brand__text">
            <span className="site-brand__label">Portfolio</span>
            <span className="site-brand__name">Miyabayashi koya</span>
          </span>
        </Link>

        <nav className={`site-nav${isOpen ? ' is-open' : ''}`} aria-label="サイトナビゲーション">
          <div className="site-nav__links">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <a key={link.href} href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </nav>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setIsOpen((v) => !v)}
          data-nav-toggle
        >
          <span className="nav-toggle__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}
