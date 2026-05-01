'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BrandMark } from './BrandMark';
import { TransitionLink } from './TransitionLink';

const NAV_ITEMS = [
  { label: 'About', href: '/about', n: '01' },
  { label: 'Works', href: '/works', n: '02' },
  { label: 'Journal', href: '/journal', n: '03' },
  { label: 'Contact', href: '/contact', n: '04' },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ページ遷移時はメニューを閉じる（トランジションのカーテンに隠れる間に静かに閉じる）
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <TransitionLink href="/" className="brand" aria-label="ホームへ">
            <BrandMark size={24} tone="ink" />
            <span>MIYABAYASI&nbsp;KOYA</span>
          </TransitionLink>
          <span className="nav-meta">N°001 / Personal Field</span>
        </div>
        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              <span className="num">{item.n}</span>
              {item.label}
            </TransitionLink>
          ))}
        </nav>
        <button
          className="nav-burger"
          onClick={() => setMenuOpen(true)}
          aria-label="メニューを開く"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <TransitionLink
          href="/"
          className="mobile-menu-brand"
          aria-label="ホームへ"
        >
          <BrandMark size={28} tone="ink" />
          <span>MIYABAYASI&nbsp;KOYA</span>
        </TransitionLink>
        <button
          className="mobile-menu-close"
          onClick={() => setMenuOpen(false)}
          aria-label="メニューを閉じる"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>
        <nav className="mobile-menu-nav">
          {NAV_ITEMS.map((item, i) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              className="nav-link-mobile"
              style={{ transitionDelay: menuOpen ? `${i * 0.06}s` : '0s' }}
            >
              <span className="num">{item.n}</span>
              {item.label}
            </TransitionLink>
          ))}
        </nav>
      </div>
    </>
  );
}
