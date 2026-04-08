import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './liftly.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Liftly - シンプルで続く、筋トレ記録アプリ',
  description: 'Liftly - シンプルで美しい筋トレ記録アプリ。トレーニングログ、種目別成長グラフ、体重管理を一つに。',
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function LiftlyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`liftly-root ${outfit.variable}`}>
      {children}
    </div>
  );
}
