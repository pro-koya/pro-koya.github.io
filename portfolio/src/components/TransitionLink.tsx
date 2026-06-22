'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';
import { usePageTransition } from './PageTransition';

type LinkBaseProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'onClick'>;

interface TransitionLinkProps extends LinkBaseProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

function isInternalRoute(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}

export function TransitionLink({
  href,
  children,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const ctx = usePageTransition();
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button !== 0) return;
    if (!isInternalRoute(href)) return;
    if (href.includes('#')) return;
    event.preventDefault();
    if (ctx) {
      ctx.startTransition(href);
    } else {
      router.push(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
