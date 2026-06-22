import type { Metadata, Viewport } from 'next';
import './aruki.css';

export const metadata: Metadata = {
  title: 'Aruki 歩 — 歩く。それだけで、変わる。',
  description:
    '日本式インターバル速歩（速歩3分・ゆっくり3分）を音声ガイドで歩くだけ。禅ミニマルなウォーキングコーチ「Aruki（歩）」の公式ページです。',
  icons: {
    icon: [{ url: '/assets/media/aruki/icon.png', type: 'image/png' }],
    apple: [{ url: '/assets/media/aruki/icon.png', type: 'image/png' }],
  },
  openGraph: {
    title: 'Aruki 歩 — 歩く。それだけで、変わる。',
    description:
      '日本式インターバル速歩を音声ガイドで。禅ミニマルなウォーキングコーチ Aruki。',
    locale: 'ja_JP',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#f4f3ec',
};

export default function ArukiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="aruki-root">{children}</div>;
}
