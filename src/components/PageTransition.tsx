'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode, TransitionEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BrandMark } from './BrandMark';

type Phase = 'idle' | 'enter' | 'exit';

interface PageTransitionContextValue {
  readonly startTransition: (href: string) => void;
  readonly isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function usePageTransition(): PageTransitionContextValue | null {
  return useContext(PageTransitionContext);
}

// HOLD: 新ページが first paint を終えるための猶予。
// MakingParticles 等を含む重いページでも余裕を持って描画完了できるよう設定。
const HOLD_MS = 220;

// transitionend が来なかった場合のフォールバック (CSS の duration より十分長く)。
// CSS: enter panel 0.32s / exit panel 0.4s
const ENTER_FALLBACK_MS = 700;
const EXIT_FALLBACK_MS = 800;

// 最終的な安全網: 何らかの理由で全部詰まった場合にUIロックを防ぐ
const SAFETY_MS = 6000;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function PageTransitionProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>('idle');
  const pathname = usePathname();
  const router = useRouter();

  // クロージャ問題を回避するための ref 群
  const phaseRef = useRef<Phase>('idle');
  const pathnameRef = useRef<string>(pathname);

  // クリック時点の pathname (現 pathname と異なれば遷移完了)
  const startPathRef = useRef<string | null>(null);
  // 遷移先 href
  const pendingHrefRef = useRef<string | null>(null);
  // enter フェーズで router.push を一度だけ発火するためのガード
  const enterCommittedRef = useRef(false);

  // タイマー
  const enterFallbackRef = useRef<number | null>(null);
  const holdTimerRef = useRef<number | null>(null);
  const exitFallbackRef = useRef<number | null>(null);
  const safetyTimerRef = useRef<number | null>(null);

  // ref と state を同期
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const clearAllTimers = useCallback(() => {
    const refs = [
      enterFallbackRef,
      holdTimerRef,
      exitFallbackRef,
      safetyTimerRef,
    ];
    refs.forEach((ref) => {
      if (ref.current !== null) {
        window.clearTimeout(ref.current);
        ref.current = null;
      }
    });
  }, []);

  const goIdle = useCallback(() => {
    clearAllTimers();
    startPathRef.current = null;
    pendingHrefRef.current = null;
    enterCommittedRef.current = false;
    setPhase('idle');
  }, [clearAllTimers]);

  // enter 完了後の router.push を一度だけ実行
  const commitEnter = useCallback(() => {
    if (enterCommittedRef.current) return;
    if (phaseRef.current !== 'enter') return;
    if (enterFallbackRef.current !== null) {
      window.clearTimeout(enterFallbackRef.current);
      enterFallbackRef.current = null;
    }
    enterCommittedRef.current = true;

    const href = pendingHrefRef.current;
    // pathname が既に変わっている場合 (back/forward 等) は push しない
    const stillOnSourcePage =
      startPathRef.current !== null &&
      startPathRef.current === pathnameRef.current;
    if (href !== null && stillOnSourcePage) {
      router.push(href);
    } else {
      // 遷移先が無効化された場合は idle に戻す
      goIdle();
    }
  }, [router, goIdle]);

  const startTransition = useCallback(
    (href: string) => {
      if (phaseRef.current !== 'idle') return;
      const currentPath = pathnameRef.current;
      if (href === currentPath) return;
      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      // クリーンスタート
      clearAllTimers();
      enterCommittedRef.current = false;
      startPathRef.current = currentPath;
      pendingHrefRef.current = href;
      setPhase('enter');

      // transitionend が何らかの理由で発火しなかった場合のフォールバック
      enterFallbackRef.current = window.setTimeout(() => {
        commitEnter();
      }, ENTER_FALLBACK_MS);

      // 全体の安全網
      safetyTimerRef.current = window.setTimeout(() => {
        goIdle();
      }, SAFETY_MS);
    },
    [router, clearAllTimers, commitEnter, goIdle],
  );

  // pathname が変化した = 遷移完了 → HOLD 後に exit へ
  useEffect(() => {
    if (startPathRef.current === null) return;
    if (pathname === startPathRef.current) return;

    startPathRef.current = null;

    // 既存の HOLD timer があれば破棄
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    // HOLD: 新ページが first paint を終える猶予
    holdTimerRef.current = window.setTimeout(() => {
      holdTimerRef.current = null;
      // exit フェーズへ (CSS が transitionend を発火する)
      setPhase('exit');
      // exit 用フォールバック
      exitFallbackRef.current = window.setTimeout(() => {
        exitFallbackRef.current = null;
        goIdle();
      }, EXIT_FALLBACK_MS);
    }, HOLD_MS);
  }, [pathname, goIdle]);

  // panel の transitionend を主要シグナルとして使う
  // これにより main thread が詰まっても視覚的完了に同期できる
  const handlePanelTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLSpanElement>) => {
      // panel 自身の transform 完了のみ反応
      if (event.target !== event.currentTarget) return;
      if (event.propertyName !== 'transform') return;

      const currentPhase = phaseRef.current;
      if (currentPhase === 'enter') {
        commitEnter();
      } else if (currentPhase === 'exit') {
        goIdle();
      }
    },
    [commitEnter, goIdle],
  );

  // unmount cleanup
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  const value = useMemo<PageTransitionContextValue>(
    () => ({
      startTransition,
      isTransitioning: phase !== 'idle',
    }),
    [startTransition, phase],
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <div
        className={`page-transition page-transition--${phase}`}
        aria-hidden="true"
      >
        <span
          className="page-transition__panel"
          onTransitionEnd={handlePanelTransitionEnd}
        />
        <span className="page-transition__mark-wrap">
          <BrandMark size={72} tone="paper" />
          <span className="page-transition__caption">MIYABAYASI&nbsp;KOYA</span>
        </span>
      </div>
    </PageTransitionContext.Provider>
  );
}
