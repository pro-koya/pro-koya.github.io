'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export function SiteHeader() {
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
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      ref={headerRef}
      className={`site-header${isScrolled ? ' is-scrolled' : ''}${isOpen ? ' is-open' : ''}`}
      data-site-header=""
    >
      <div className="site-header__inner">
        <Link className="site-brand" href="/" onClick={closeMenu}>
          <span className="site-brand__text">
            <span className="site-brand__label">Portfolio</span>
            <span className="site-brand__name">Miyabayashi koya</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="サイトナビゲーション">
          <div className="site-nav__links">
            <a href="#works" onClick={closeMenu}>Works</a>
            <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>
        </nav>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setIsOpen((v) => !v)}
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
