import type { Metadata, Viewport } from 'next';
import { Zen_Maru_Gothic } from 'next/font/google';
import './dogwalk.css';

const zenMaru = Zen_Maru_Gothic({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-zen-maru',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DogWalk — 毎日の散歩が、うちの子の健康記録になる。',
  description:
    'GPSでルート・距離を記録し、うんちの状態や気分までワンタップでログ。獣医さんに見せられるレポートまで作れる、犬の散歩×健康記録アプリ「DogWalk」の公式ページです。',
  icons: {
    icon: [{ url: '/assets/media/dogwalk/icon-rounded.png', type: 'image/png' }],
    apple: [{ url: '/assets/media/dogwalk/icon.png', type: 'image/png' }],
  },
  openGraph: {
    title: 'DogWalk — 毎日の散歩が、うちの子の健康記録になる。',
    description:
      'GPSルート記録 × 健康ログ × 獣医共有レポート。犬の散歩がもっと楽しく、もっと意味のある時間に。',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/assets/media/dogwalk/icon.png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFBF4',
};

export default function DogWalkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`dogwalk-root ${zenMaru.variable}`}>{children}</div>;
}
