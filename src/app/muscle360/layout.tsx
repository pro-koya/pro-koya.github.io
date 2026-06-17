import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import './muscle360.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--m360-font-display',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--m360-font-mono',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--m360-font-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Muscle360 — 体づくりのすべてを、ひとつの文脈に。',
  description:
    '筋トレ・飲酒・食事・体組成を共通IDで統合。各アプリは単独でも成立し、つなぐほどパーソナライズされた解釈と行動提案が返る。Forge・Liftly・筋肉ごめんから始まる、体づくりの統合構想。',
  openGraph: {
    title: 'Muscle360 — 体づくりのすべてを、ひとつの文脈に。',
    description:
      '記録で終わらせない。筋トレ・飲酒・食事・体組成を共通IDで統合し、「今の自分への意味」と「次の一手」を返す統合構想。',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#08080b',
  width: 'device-width',
  initialScale: 1,
};

export default function Muscle360Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${jetBrainsMono.variable} ${notoSansJP.variable}`}>
      {children}
    </div>
  );
}
